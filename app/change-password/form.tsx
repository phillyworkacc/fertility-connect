"use client"
import "@/styles/main.css"
import "@/styles/my-account.css"
import AppWrapper from "@/components/app-wrapper/app-wrapper"
import { useSession } from 'next-auth/react'
import React, { useState } from 'react'
import { Lock } from "lucide-react"
import ExtraSpacing from "@/components/extra-spacing/extra-spacing"
import wait from "@/lib/wait"
import LoadingAction from "@/components/loading-action/loading-action"
import { validatePassword } from "@/utils/validation"
import { changeUserAccountPassword } from "../actions/user"
import { redirect } from "next/navigation"
import { mainUserHomeUrl } from "@/utils/constants"
import Link from "next/link"

export default function ChangePasswordPageForm() {
   const { data: session } = useSession();
   const [error, setError] = useState("" as string | React.ReactNode);
   const [loadingAction, setLoadingAction] = useState("")
   const [password1, setPassword1] = useState("")
   const [password2, setPassword2] = useState("")

   const onSubmit = async () => {
      setError("");
      await wait(0.2);
      if (!validatePassword(password1)) {
         setError(`Password must contain at least one digit or special character ( !@#$%^&*(),.?":{}|<> )`);
         return;
      }
      
      if (password1 !== password2) {
         setError(`Passwords don't match`);
         return;
      }
      
      setLoadingAction("Changing Password");
      await wait(0.5);

      const result = await changeUserAccountPassword(session?.user?.email!, password1)
      if (result) redirect(mainUserHomeUrl); else {
         setError(<>Failed to change your password. Try again or <Link href={mainUserHomeUrl}>Go to Home</Link></>)
         setLoadingAction("");
      }
   }

   return (
      <AppWrapper username={session?.user?.name!}>
         {loadingAction !== "" ? <LoadingAction actionText={loadingAction} /> : <></>}

         <div>
            <div className="text-c-xl bold-900">Change Password</div>
            {(error !== "" || error !== undefined) ? (<>
               <div className="ma-form-content">
                  <div className="text-c-m bold-600 error">{error}</div>
               </div>
            </>) : (<></>)}
            <div className="ma-form-content">
               <div className="label">New Password</div>
               <input type="password" name="password1" id="password1" value={password1} onChange={(e) => setPassword1(e.target.value)} />
            </div>
            <div className="ma-form-content">
               <div className="label">New Password (again)</div>
               <input type="password" name="password2" id="password2" value={password2} onChange={(e) => setPassword2(e.target.value)} />
            </div>
            <div className="ma-form-content">
               <button onClick={onSubmit}><Lock /> Change Password</button>
            </div>
         </div>
         
         <ExtraSpacing />
      </AppWrapper>
   )
}
