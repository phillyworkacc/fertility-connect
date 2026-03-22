import { getCurrentUser, checkAdminUser } from '@/app/actions/user';
import { UserDB } from '@/db/user';
import { authOptions } from '@/lib/authOptions';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import ConsultantChat from './ConsultantChat';
import { MessagesDB } from '@/db/messages';

type ConversationChatPageProps = {
   params: Promise<{
      userid: string;
   }>
}

export default async function ConversationChatPage ({ params }: ConversationChatPageProps) {
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
   
   const { userid } = await params;
   const userContact = await UserDB.getUserById(userid);
   if (!userContact) redirect("/consultant-chats");
   
   const messages = await MessagesDB.loadConsultantMessages(userid);
   
   return <ConsultantChat 
      userid={user.userid} 
      user={JSON.parse(JSON.stringify(userContact))} 
      messages={JSON.parse(JSON.stringify(messages))}
   />
}
