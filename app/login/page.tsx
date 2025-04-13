import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import LoginForm from "./form";
import { mainUserHomeUrl } from "@/utils/constants";

export default async function LoginPage() {
   const session = await getServerSession(authOptions);

   if (session) {
      redirect(mainUserHomeUrl);
   }

   return <LoginForm />
}
