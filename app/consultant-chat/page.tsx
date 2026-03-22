import "@/styles/main.css"
import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { checkAdminUser, getCurrentUser } from "../actions/user";
import isSubscribed from "@/utils/checkSubscription";
import ConsultantChat from "./ConsultantChat";
import AppWrapper from "@/components/app-wrapper/app-wrapper";
import Link from "next/link";
import { MessagesDB } from "@/db/messages";

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
   if (isAdmin) redirect("/consultant-chats");

	const isUserSubscribed = isSubscribed(user.subscribed);
   const messages = await MessagesDB.loadMessages(user.userid);

   if (isUserSubscribed) {
      return <ConsultantChat messages={JSON.parse(JSON.stringify(messages))} userid={user.userid} />
   } else {
      return <AppWrapper username={session.user?.name!}>
         <div className="text-c-l">
            Subscribe Now to get exclusive access to the <b>Consultant Chat</b>
         </div>
         <Link href='/pricing'><button>Subscribe Now</button></Link>
      </AppWrapper>
   }

}
