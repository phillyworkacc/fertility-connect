"use client"
import "@/styles/main.css"
import "@/styles/my-account.css"
import AppWrapper from "@/components/app-wrapper/app-wrapper"
import ExtraSpacing from "@/components/extra-spacing/extra-spacing"
import wait from "@/lib/wait"
import LoadingAction from "@/components/loading-action/loading-action"
import Link from "next/link"
import UpdateEmail from "./UpdateEmail"
import { signOut, useSession } from 'next-auth/react'
import { useState } from 'react'
import { KeyRound, LogOut, Trash2, UserRoundCog } from "lucide-react"
import { deleteUserAccount, updateUserAccountName } from "../actions/user"
import { reloadSession } from "@/lib/reloadSession"
import { useRouter } from "next/navigation"

export default function AccountPageClient({ isAdmin }: { isAdmin: boolean }) {
   const { data: session, update } = useSession();
   const [loadingAction, setLoadingAction] = useState("");
   const [userName, setUserName] = useState(session?.user?.name as string);
   const router = useRouter();

   const onSubmitDelete = async () => {
      if (confirm("Are you sure you want to delete your account ?")) {
         setLoadingAction("Deleting Account");
         await wait(0.8);
         const result = await deleteUserAccount(session?.user?.email!);
         if (result) {
            signOut();
         } else {
            alert("Failed to delete your account. Try Again.");
         }
      }
   }

   const onUpdateUserName = async () => {
      const updatedUserName = await updateUserAccountName(session?.user?.email!, userName);
      if (!updatedUserName) {
         alert('Failed to update your username');
         return;
      }
      update({
         ...session,
         user: {
            ...session?.user,
            name: userName
         }
      })
      reloadSession();
      alert('Updated user name');
   }

   return (
      <AppWrapper username={session?.user?.name!} page="my-account">
         {loadingAction !== "" ? <LoadingAction actionText={loadingAction} /> : <></>}
         <br />
         <div className="ma-card">
            <div className="text-c-xl bold-900">Account Info</div>
            <div className="text-c-m">{session?.user?.name}</div>
            <div className="text-c-m">{session?.user?.email}</div><br />
            <div className="ma-form-content">
               <input type="text" name="name" id="name" placeholder="Name" value={userName} onChange={(e) => setUserName(e.target.value)} />
               <button disabled={session?.user?.name! === userName} onClick={onUpdateUserName}>Change Name</button>
            </div><br />
            <UpdateEmail />
         </div>

         {isAdmin ? <>
            <div className="ma-card">
               <div className="text-c-xl bold-900">Admin Account</div>
               <div className="ma-form-content">
                  <button onClick={() => router.push("/admin-page")}><UserRoundCog /> Go to Admin Dashboard</button>
               </div>
            </div>  
         </> : <></>}
         
         <div className="ma-card">
            <div className="text-c-xl bold-900">Change your password</div>
            <div className="ma-form-content">
               <div className="label">For security reasons, we recommend updating your password periodically.</div>
               <Link href={"/change-password"}><button><KeyRound /> Change Password</button></Link>
            </div>
         </div>

         <div className="ma-card">
            <div className="text-c-xl bold-900">My Account Security</div>
            <div className="ma-form-content">
               <button onClick={() => signOut()}><LogOut /> Sign Out</button>
               <button className="delete" onClick={onSubmitDelete}><Trash2 /> Delete Account</button>
            </div>
         </div>

         <ExtraSpacing />
      </AppWrapper>
   )
}
