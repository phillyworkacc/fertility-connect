'use client'
import { useSession } from "next-auth/react";
import "./community-post.css"
import { useRouter } from "next/navigation";
import { useState } from "react";
import { addUserReplyToCommunityPost } from "@/app/actions/community";
import { getCurrentUser } from "@/app/actions/user";

type CommunityPostProps = {
   showFullReplies?: boolean;
} & CommunityPost

function formatTimestamp(ms: number): string {
   const now = new Date();
   const date = new Date(ms);

   const oneDay = 24 * 60 * 60 * 1000;
   const diffDays = Math.floor((now.getTime() - date.getTime()) / oneDay);

   const formatTime = (d: Date): string => {
      const hours = d.getHours();
      const minutes = d.getMinutes().toString().padStart(2, '0');
      const ampm = hours >= 12 ? 'pm' : 'am';
      const formattedHour = hours % 12 || 12;
      return `${formattedHour}:${minutes}${ampm}`;
   };

   const formatDate = (d: Date): string => {
      const day = d.getDate();
      const month = d.toLocaleString('default', { month: 'long' });
      const year = d.getFullYear();
      return `${day} ${month} ${year}`;
   };

   if (diffDays === 0) {
      return `today, ${formatTime(date)}`;
   } else if (diffDays === 1) {
      return 'yesterday';
   } else if (diffDays <= 7) {
      return `${diffDays} days ago`;
   } else {
      return formatDate(date);
   }
}

export default function CommunityPost ({ username, message, postid, replies, date, isSubscribed, showFullReplies  }: CommunityPostProps) {
   const { data: session } = useSession();
   const router = useRouter();
   const [reply, setReply] = useState("");
   const [postReplies, setPostReplies] = useState<CommunityReply[]>(replies)

   const sendReply = async () => {
      if (reply == "") return;
      const user = await getCurrentUser(session?.user?.email!);
      if (!user) return;
      const dateStr = `${Date.now()}`
      const response = await addUserReplyToCommunityPost(postid, reply, dateStr);

      if (response) {
         const newReply: CommunityReply = {
            replyid: crypto.randomUUID(),
            message: reply,
            username: user.username,
            isSubscribed: (parseInt(user.subscribed) === 1),
            date: dateStr
         }
         setPostReplies((prev) => [newReply, ...prev])
         setReply("");
      }
   }

   return (
      <div className="community-message">
         <div className="user">
            <div className="name text-c-s bold-600">{username}</div>
            {isSubscribed && <div className="tag-sub">subscribed</div>}
            <div className="date">{formatTimestamp(parseInt(date))}</div>
         </div>

         <div className="message text-c-sm">{message}</div><br />
         
         {(postReplies.length > 0) &&<>
            <div className="break-line"></div>
            <div className="text-c-s bold-600 pd-1">Replies ({replies.length} {replies.length > 1 ? 'replies' : 'reply'})</div>
         </>}

         {showFullReplies ? <>
            {!session?.user && <div className="text-c-s full dfb">
               Create an account or sign in to reply to this post.
               <button style={{ fontSize: "1rem", padding: "7px 10px", whiteSpace: "nowrap" }} onClick={() => router.push('/login')}>Sign In</button>
            </div>}
            <div className="message-actions">
               {session?.user && <div className="text-c-s dfb full">
                  <input type="text" className="full" placeholder="Reply" value={reply} onChange={(e) => setReply(e.target.value)} />
                  <button style={{ whiteSpace: "nowrap" }} onClick={sendReply}>Add</button>
               </div>}
            </div>   
         </> : <>      
            <div className="message-actions">
               {(postReplies.length < 1) && <>
                  <div className="btn-reply sc" onClick={() => router.push(`/community/${postid}`)}>Add a reply</div>
               </>}
            </div>
         </>}


         {postReplies.length > 0 ? <>
            <div className="replies">
               {(showFullReplies ? postReplies : postReplies.slice(-2)).map((reply, index) => {
                  return <div key={index} className="reply">
                     <div className="user">
                        <div className="name text-c-xs bold-600">{reply.username}</div>
                        {reply.isSubscribed && <div className="tag-sub">subscribed</div>}
                        <div className="date">{formatTimestamp(parseInt(reply.date))}</div>
                     </div>
                     <div className="message">{reply.message}</div>
                  </div>
               })}

               {!showFullReplies && <div className="text-c-xs bold-600 pd-1">
                  <div className="smr sc" onClick={() => router.push(`/community/${postid}`)}>Show More Replies</div>
               </div>}
            </div>
            {showFullReplies && <br />}
         </> : <></>}
      </div>
   )
}
