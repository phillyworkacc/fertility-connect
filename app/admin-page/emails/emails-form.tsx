"use client"
import "@/styles/tip-form.css"
import { useSession } from 'next-auth/react';
import { useState } from 'react'
import { SendHorizontal } from "lucide-react";
import { sendMassEmailToAllUsers } from "@/app/actions/admin";
import AdminWrapper from '@/components/admin-wrapper/admin-wrapper';

export default function EmailsForm () {
   const { data: session } = useSession();
   const [allCustomEmails, setAllCustomEmails] = useState("");
   const [subject, setSubject] = useState("");
   const [emailContent, setEmailContent] = useState("");
   const [allUsersEmail, setAllUsersEmail] = useState(true);

   const sendEmails = async () => {
      const sentEmails = await sendMassEmailToAllUsers(subject, emailContent, allUsersEmail ? undefined : allCustomEmails);
      if (sentEmails) {
         alert("Emails Sent Successfully!");
         setSubject("");
         setEmailContent("");
      } else {
         alert("Failed to send emails");
      }
   }

   return (
      <AdminWrapper username={session?.user?.name!} page="tips">
         <div className="text-c-l bold-600 pd-1">Send Emails to Fertility Connect App Users</div>
         <div className="text-c-sm bold-700 pd-1">Email Audience</div>
         <div className="selector">
            <div className={`select-option ${allUsersEmail && "selected"}`} onClick={() => setAllUsersEmail(true)}>
               All Fertility Connect Users
            </div>
            <div className={`select-option ${!allUsersEmail && "selected"}`} onClick={() => setAllUsersEmail(false)}>
               Custom Emails
            </div>
         </div>

         {(!allUsersEmail) && (<>
            <div className="form-content">
               <div className="text-c-s pd-1">Separate each email with a comma (,)</div>
               <div className="form-content">
                  <textarea 
                     placeholder='All Emails' 
                     style={{ height: "15vh" }}
                     value={allCustomEmails} 
                     onChange={e => setAllCustomEmails(e.target.value)}
                  />
               </div>
            </div>
         </>)}

         <div className="form-content">
            <div className="form-content">
               <input 
                  type="text" 
                  placeholder='Subject' 
                  value={subject} 
                  onChange={e => setSubject(e.target.value)}
                  style={{ width: "100%", maxWidth: "500px" }}
               />
            </div>
         </div>

         <div className="form-content">
            <div className="form-content">
               <textarea
                  placeholder='Email Body' 
                  value={emailContent} 
                  onChange={e => setEmailContent(e.target.value)}
               />
            </div>
         </div>
         
         <div style={{ width: "100%", maxWidth: "500px" }}>
            <button onClick={sendEmails}><SendHorizontal size={16} /> Send to all users</button>
         </div>

         <br /><br /><br />
         <br /><br /><br />
      </AdminWrapper>
   )
}
