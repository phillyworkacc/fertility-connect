"use client"
import "@/styles/consultant-chat.css"
import { sendMessageToUserContact } from "@/app/actions/consultantChat";
import { BackToAction } from "@/components/back-to-home/back-to-home";
import { formatMilliseconds } from "@/utils/date"
import { SendHorizontal } from "lucide-react"
import { useRouter } from "next/navigation";
import { useState } from "react";

type ConsultantChatProps = {
   messages: Message[];
   userid: string;
   user: User;
}

export default function ConsultantChat ({ messages, userid, user }: ConsultantChatProps) {
   const router = useRouter();
   const [messageText, setMessageText] = useState("");
   const [allMessages, setAllMessages] = useState<Message[]>(messages);

   const sendMessageBtn = async () => {
      if (messageText.trim() == "") return;
      setAllMessages(prev => ([ ...prev, {
         id: Date.now(),
         messageid: Date.now().toString(),
         message: messageText,
         to: '', from: userid, date: Date.now().toString()
      } ]));
      const sentMessage = await sendMessageToUserContact(messageText, user.userid);
      if (sentMessage) {
         setMessageText("");
      } else {
         alert("Failed to send message, please try again.")
      }
   }

   return (
      <div className="consultant-chat">
         <div className="consultant-chat-container">
            
            <div className="consultant-chat-header">
               <div className="logo">
                  <img src="/logo.png" alt="logo" />
               </div>
               <span className="text-c-xl bold-800">{user.username}</span>
            </div>

            <BackToAction 
               action={() => router.push("/consultant-chats")}
            >Back to All Chats</BackToAction>

            <div className="text-c-xs text-center">
               Your messages are sent directly to {user.username}, maintaining a secure and private one-to-one conversation.
            </div>

            <div className="consultant-chat-area">
               <div className="chat-messages">
                  {allMessages.length > 0 ? (<>
                     {allMessages.map(message => (
                        <div key={message.messageid} className={`chat-message-${message.from == userid ? "mine" : "cc"}`}>
                           <div className="message">{message.message}</div>
                           <div className="date-time">{formatMilliseconds(parseInt(message.date), false, true)}</div>
                        </div>
                     ))}
                  </>) : (<>
                     <br /><br />
                     <div className="text-c-s text-center">
                        No Message. Start The Conversation
                     </div>
                  </>)}
               </div>
               <div className="chat-input-form">
                  <input 
                     type="text" name="message" id="message"
                     placeholder="Type a message"
                     value={messageText}
                     onChange={e => setMessageText(e.target.value)}
                  />
                  <button onClick={sendMessageBtn}><SendHorizontal size={18} /></button>
               </div> 
            </div>

         </div>
      </div>
   )
}
