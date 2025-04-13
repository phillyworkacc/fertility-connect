"use client"
import wait from "@/lib/wait"
import "@/styles/auth.css"
import { mainUserHomeUrl } from "@/utils/constants"
import { Eye, EyeClosed, EyeOff } from "lucide-react"
import { signIn } from "next-auth/react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import React, { useState } from 'react'

export default function LoginForm() {
   const [formData, setFormData] = useState({ email: "", password: "" } as LoginFormData);
   const [error, setError] = useState("");
   const [signUpLoading, setSignUpLoading] = useState(false);
   const [showPassword, setShowPassword] = useState(false);
   const router = useRouter();

   const onSubmitForm = async () => {
      setError("");
      setSignUpLoading(true);
      await wait(1);

      if (formData.email == "" || formData.password == "") {
         setError("Please fill all the fields");
         setSignUpLoading(false);
         return;
      }

      const response = await signIn("credentials", {
         email: formData.email,
         password: formData.password,
         redirect: false
      })

      if (!response?.error) { router.push(mainUserHomeUrl) } else {
         setError("Incorrect email or password.")
         setSignUpLoading(false);
         return;
      };
   }

   return (
      <div className="auth-container">
         <div className="auth-box">
            <div className="auth-logo">
               <img src="./logo.png" alt="logo" />
            </div>
            <div className="text-c-xl bold-600">Login to Fertility Connect</div><br />
            {(error !== "") ? (<>
               <div className="text-c-m bold-600 error">{error}</div>
               <br />
            </>) : (<></>)}
            <div className="form-content">
               <div className="label">Email</div>
               <input type="email" name="email" value={formData.email} onChange={(e) => setFormData((prv) => ({ ...prv, email: e.target.value }))} />
            </div>
            <div className="form-content">
               <div className="label">Password</div>
               <input type={showPassword ? "text" : "password"} name="password"  value={formData.password} onChange={(e) => setFormData((prv) => ({ ...prv, password: e.target.value }))} />
               <div className="password-hide-toggle" onClick={() => setShowPassword((prev) => !prev)}>
                  {showPassword ? <Eye /> : <EyeOff />}
               </div>
            </div>
            <div className="form-content">
               <div className="text-c-s"><Link href="/forgot-password">Forgot Password</Link></div>
            </div>
            <div className="form-content">
               <button onClick={() => onSubmitForm()} disabled={signUpLoading}>
                  {signUpLoading ? 'Loading...' : 'Login'}
               </button>
            </div>
            <div className="break-line"></div>
            <div className="form-content">
               <div className="text-c-s">Don't have an account? <Link href="/signup">Sign Up Here</Link></div>
            </div>
         </div>
      </div>
   )
}
