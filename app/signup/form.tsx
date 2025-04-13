"use client"
import "@/styles/auth.css"
import Link from "next/link"
import React, { useState } from 'react'
import { createUserAccount } from "../actions/user";
import { mainUserHomeUrl } from "@/utils/constants";
import { useRouter } from "next/navigation";
import wait from "@/lib/wait";
import { validateEmail, validatePassword } from "@/utils/validation";
import { Eye, EyeOff } from "lucide-react";

export default function SignUpForm() {
   const [formData, setFormData] = useState({ name: "", email: "", password: "" } as SignUpFormData);
   const [showPassword, setShowPassword] = useState(false);
   const [error, setError] = useState("");
   const [signUpLoading, setSignUpLoading] = useState(false);
   const router = useRouter();

   const onSubmitForm = async () => {
      setError("");
      setSignUpLoading(true);
      await wait(1);

      if (formData.name == "") {
         setError("Please enter a name");
         setSignUpLoading(false);
         return;
      }

      if (!validateEmail(formData.email)) {
         setError("Please enter a valid email");
         setSignUpLoading(false);
         return;
      }

      if (!validatePassword(formData.password)) {
         setError(`Password must contain at least one digit or special character ( !@#$%^&*(),.?":{}|<> )`);
         setSignUpLoading(false);
         return;
      }

      console.log(formData);
      const response = await createUserAccount(formData);
      console.log(response);
      if (response) {
         router.push(mainUserHomeUrl);
      } else {
         setError("Failed to create account. Try Again.");
         setSignUpLoading(false);
         return;
      }
   }

   return (
      <div className="auth-container">
         <div className="auth-box">
            <div className="auth-logo">
               <img src="./logo.png" alt="logo" />
            </div>
            <div className="text-c-xl bold-600">Sign Up to Fertility Connect</div><br />
            {(error !== "") ? (<>
               <div className="text-c-m bold-600 error">{error}</div>
               <br />
            </>) : (<></>)}
            <div className="form-content">
               <div className="label">Name</div>
               <input type="name" name="name" value={formData.name} onChange={(e) => setFormData((prv) => ({ ...prv, name: e.target.value }))} />
            </div>
            <div className="form-content">
               <div className="label">Email</div>
               <input type="email" name="email" value={formData.email} onChange={(e) => setFormData((prv) => ({ ...prv, email: e.target.value }))} />
            </div>
            <div className="form-content">
               <div className="label">Password</div>
               <input type={showPassword ? "text" : "password"} name="password" value={formData.password} onChange={(e) => setFormData((prv) => ({ ...prv, password: e.target.value }))} />
               <div className="password-hide-toggle" onClick={() => setShowPassword((prev) => !prev)}>
                  {showPassword ? <Eye /> : <EyeOff />}
               </div>
            </div>
            <div className="form-content">
               <button onClick={() => onSubmitForm()} disabled={signUpLoading}>
                  {signUpLoading ? 'Loading...' : 'Create Account'}
               </button>
            </div>
            <div className="break-line"></div>
            <div className="form-content">
               <div className="text-c-s">Already have an account? <Link href="/login">Login Here</Link></div>
            </div>
         </div>
      </div>
   )
}
