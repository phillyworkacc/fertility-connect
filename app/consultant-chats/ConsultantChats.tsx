"use client"
import BackToHome from "@/components/back-to-home/back-to-home";
import "@/styles/consultant-chats.css"
import { formatMilliseconds } from "@/utils/date";
import { useRouter } from "next/navigation";

type UserConversation = {
   userid: string;
   from: string;
   message: string;
   user: {
      userid: string;
      username: string;
   };
   lastMessageDate: string;
}

type ConsultantChatsProps = {
   userConversations: UserConversation[];
}

export default function ConsultantChats ({ userConversations }: ConsultantChatsProps) {
   return (
      <div className="consultant-chats">
         <div className="consultant-chats-container">
            
            <div className="consultant-chats-header">
               <div className="logo">
                  <img src="./logo.png" alt="logo" />
               </div>
               <span className="text-c-xl bold-800 full">All Chats</span>
            </div>
                        
            <BackToHome>Back to Home</BackToHome>

            <div className="consultant-chats-conversations">
               {userConversations.map(userConversation => (
                  <ConversationLink key={userConversation.from} userConversation={userConversation} />
               ))}
            </div>
         
         </div>
      </div>
   )
}

function ConversationLink ({ userConversation }: { userConversation: UserConversation }) {
   const router = useRouter();
   return (
      <div className="conversation" onClick={() => router.push(`/consultant-chats/${userConversation.userid}`)}>
         <div className="contact-name">{userConversation.user.username}</div>
         <div className="contact-date">
            {userConversation.message.substring(0,30)}{userConversation.message.length >= 30 && '...'} - {formatMilliseconds(parseInt(userConversation.lastMessageDate), true, true)}
         </div>
      </div>
   )
}