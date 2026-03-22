import "@/styles/main.css"
import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { checkAdminUser, getCurrentUser } from "../actions/user";
import { consultantUserId, MessagesDB } from "@/db/messages";
import isSubscribed from "@/utils/checkSubscription";
import AppWrapper from "@/components/app-wrapper/app-wrapper";
import Link from "next/link";
import { db } from "@/db";
import { messagesTable, usersTable } from "@/db/schemas";
import { and, desc, eq, sql } from "drizzle-orm";
import ConsultantChats from "./ConsultantChats";

export default async function Home() {
	const session = await getServerSession(authOptions);
	if (!session) {
		redirect("/login");
	}
	const user = await getCurrentUser(session.user?.email!);
	if (user == false) {
		redirect("/login");
	}

   const isAdmin = await checkAdminUser();
   if (!isAdmin) redirect("/consultant-chat");

	const latestMessages = db
		.select({
			from: messagesTable.from,
			maxDate: sql`MAX(${messagesTable.date})`.as('maxDate')
		})
		.from(messagesTable)
		.where(eq(messagesTable.to, consultantUserId))
		.groupBy(messagesTable.from)
		.as('latest');

	const userConversations = await db
		.select({
			userid: messagesTable.from,
			from: messagesTable.from,
			message: messagesTable.message,
			user: {
				userid: usersTable.userid,
				username: usersTable.username
			},
			lastMessageDate: messagesTable.date
		})
		.from(messagesTable)
		.innerJoin(
			latestMessages,
			and(
				eq(messagesTable.from, latestMessages.from),
				eq(messagesTable.date, latestMessages.maxDate)
			)
		)
		.innerJoin(usersTable, eq(messagesTable.from, usersTable.userid))
		.orderBy(desc(messagesTable.date));
	
	return <ConsultantChats userConversations={JSON.parse(JSON.stringify(userConversations))} />
}
