"use client"
import { reverseString } from '@/utils/string';
import React, { useState } from 'react'
import "@/styles/auth.css"
import { Eye, EyeOff } from 'lucide-react';
import wait from '@/lib/wait';
import { resetUserPassword } from '@/app/actions/user';
import { redirect } from 'next/navigation';

export default function ResetPasswordPage() {
   const [password1, setPassword1] = useState("")
   const [password2, setPassword2] = useState("")
   
   const [showPassword1, setShowPassword1] = useState(false)
   const [showPassword2, setShowPassword2] = useState(false)
   
   const [btnLoading, setBtnLoading] = useState(false)
   const [error, setError] = useState("")

   let url = window.location.href.split("/");
   let userIdReversed = window.location.href.split("/")[url.length-1];

   const onSubmitForm = async () => {
      setError("");
      setBtnLoading(true);
      await wait(1);

      if (password1 !== password2) {
         setError("Passwords do not match");
         setBtnLoading(false);
         return;
      }

      const result = await resetUserPassword(userIdReversed, password1);
      if (result) {
         redirect("/login");
      } else {
         setBtnLoading(false);
         setError("An error occurred. Please try again.")
      }
   }

   return (
      <div className='auth-container'>
         <div className="auth-box">
            <div className="auth-logo">
               <img src="../logo.png" alt="logo" />
            </div>
            <div className="text-c-xl bold-600">Create a New Password</div>

            {(error !== "") ? (<>
               <div className="text-c-m bold-600 error">{error}</div>
               <br />
            </>) : (<></>)}
            
            <div className="form-content">
               <div className="label">New Password</div>
               <input type={showPassword1 ? "text" : "password"} name="password"  value={password1} onChange={(e) => setPassword1(e.target.value)} />
               <div className="password-hide-toggle" onClick={() => setShowPassword1((prev) => !prev)}>
                  {showPassword1 ? <Eye /> : <EyeOff />}
               </div>
            </div>

            <div className="form-content">
               <div className="label">Confirm New Password</div>
               <input type={showPassword2 ? "text" : "password"} name="password"  value={password2} onChange={(e) => setPassword2(e.target.value)} />
               <div className="password-hide-toggle" onClick={() => setShowPassword2((prev) => !prev)}>
                  {showPassword2 ? <Eye /> : <EyeOff />}
               </div>
            </div>

            
            <div className="form-content">
               <button onClick={() => onSubmitForm()} disabled={btnLoading}>
                  {btnLoading ? 'Loading...' : 'Change Password'}
               </button>
            </div>
         </div>
      </div>
   )
}
