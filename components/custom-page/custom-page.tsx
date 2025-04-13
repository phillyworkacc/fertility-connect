"use client"
import Link from 'next/link'
import "@/styles/auth.css"

export default function CustomPage({ str }: { str: string }) {
   return <div className="auth-container">
      <div className="auth-box">
         <div className="auth-logo">
            <img src="./logo.png" alt="logo" />
         </div>
         <div className="text-c-l bold-600">{str}</div><br />
         <div className="text-c-sm"><Link href="/" style={{
            display: "flex", alignItems: "center", width: "100%",
            justifyContent: "center", padding: "20px 0"
         }}>
            <button>Go back to Home</button>
         </Link></div>
         <br /><br />
      </div>
   </div>
}