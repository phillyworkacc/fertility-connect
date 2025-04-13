import { UserDB } from "@/db/user";
import { hashPasswordT } from "@/utils/hash";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
	session: {
		strategy: "jwt"
	},
	providers: [
		CredentialsProvider({
			name: "Credentials",
			credentials: {
				email: {},
				password: {}
			},

			async authorize (credentials, req) {
				if (credentials?.email == "" || credentials?.password == "") {
					return null;
				} else {
					const result: User | boolean = await UserDB.login(credentials?.email!, hashPasswordT(credentials?.password!));
					if (result !== false && typeof result !== "boolean") {
						return {
							id: result.userid,
							email: result.email,
							name: result.username,
						}	
					} else {
						return null;
					}
				}
			},
		})
	],
	callbacks: {
		jwt: async ({ user, token, trigger, session }) => {
			if (trigger == "update") {
				return {
					...token,
					...session.user
				}
			}
			return { ...token, ...user }
		}
	}
}