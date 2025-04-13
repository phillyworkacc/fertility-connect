"use client"
import wait from "@/lib/wait"
import "@/styles/auth.css"
import { mainUserHomeUrl } from "@/utils/constants"
import { Eye, EyeClosed, EyeOff } from "lucide-react"
import { signIn } from "next-auth/react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import React, { useState } from 'react'
import { forgotPassword } from "../actions/user"

export default function ForgotPasswordForm() {
   const [error, setError] = useState("");
   const [signUpLoading, setSignUpLoading] = useState(false);
   const [complete, setComplete] = useState(false);
   const [email, setEmail] = useState("");

   const onSubmitForm = async () => {
      setError("");
      setSignUpLoading(true);
      await wait(1);

      const res = await forgotPassword(email);
      setSignUpLoading(false);
      if (res.result) {
         setComplete(true);
      } else {
         setError(res.msg)
      }
   }

   return (
      <div className="auth-container">
         <div className="auth-box">
            <div className="auth-logo">
               <img src="./logo.png" alt="logo" />
            </div>
            <div className="text-c-xl bold-600">Forgot Password</div><br />
            {(error !== "") ? (<>
               <div className="text-c-m bold-600 error">{error}</div>
               <br />
            </>) : (<></>)}
            {complete ? <>
               <div className="form-content">
                  <div className="text-c-sm bold-600">We've sent a password reset link. Please check your inbox and spam folder.</div>
                  <div className="text-c-s">You can close this page or <Link href='/login'>login here</Link>.</div>
               </div>
               <br /><br />
            </> : <>
               <div className="text-c-sm">Enter your email and we'll send you a link to reset your password.</div><br />
               <div className="form-content">
                  <div className="label">Email</div>
                  <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
               </div>
               <div className="form-content">
                  <button onClick={() => onSubmitForm()} disabled={signUpLoading}>
                     {signUpLoading ? 'Loading...' : 'Send Reset Password Link'}
                  </button>
               </div>
               <div className="break-line"></div>
               <div className="form-content">
                  <div className="text-c-s">Remebered your password? <Link href="/login">Login Here</Link></div>
               </div>
            </>}
         </div>
      </div>
   )
}
