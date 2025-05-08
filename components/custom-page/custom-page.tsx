"use client"
import "@/styles/auth.css"
import Link from 'next/link'

export default function CustomPage({ str, backUrl }: { str: string, backUrl?: string }) {
   return <div className="auth-container">
      <div className="auth-box">
         <div className="auth-logo">
            <img src="./logo.png" alt="logo" />
         </div>
         <div className="text-c-l bold-600">{str}</div><br />
         <div className="text-c-sm"><Link href={backUrl || "/"} style={{
            display: "flex", alignItems: "center", width: "100%",
            justifyContent: "center", padding: "20px 0"
         }}>
            <button>{backUrl ? 'Go back' : 'Go back to Home'}</button>
         </Link></div>
         <br /><br />
      </div>
   </div>
}