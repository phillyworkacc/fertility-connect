"use client"
import "@/styles/landingpage.css"
import { useSession } from "next-auth/react"
import React, { useState } from 'react'

// import { UserDB } from "@/db/user"

export default function MailTestPage() {
   const { data: session } = useSession();
   const [email, setEmail] = useState(session?.user?.email!);
   const [firstName, setFirstName] = useState("")

   const sendMail = async () => {
      let result = await fetch("/api/mail/welcome", {
         method: "POST",
         body: JSON.stringify({
            email: email,
            firstName: firstName
         })
      }).then((res) => res.json());
      console.log(result);
   }

   return (
      <div>
         <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="First Name" />
         <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
         <button onClick={sendMail}>Send Mail</button>
      </div>
   )
}

// export default async function AllUsers() {
//    const users = await UserDB.getAllUsers();
//    console.log(users);

//    return (
//       <div>users: {users[0].username}</div>
//    )
// }

