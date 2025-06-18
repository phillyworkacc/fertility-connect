'use client'
import "@/styles/main.css"
import Link from 'next/link'
import React from 'react'

type Page = "home" | "bookings" | "courses" | "my-account" | "clinics"

export default function AppWrapper({ 
   username, 
   children, 
   page
}: { children:React.ReactNode, username: string, page?: Page }) {
   return (<>
      <div className="body-container">
			<div className="page-container">
            <header>
               <div className="logo">
                  <img src="./logo.png" alt="logo" />
               </div>
               <div className="greeting">Hello {username}</div>
               <div className="header-dropdown">
                  <Link href="/home" className={`pages-link ${page == "home" ? "selected" : ""}`}>Home</Link>
                  <Link href="/bookings" className={`pages-link ${page == "bookings" ? "selected" : ""}`}>Bookings</Link>
                  <Link href="/fertility-clinics" className={`pages-link ${page == "clinics" ? "selected" : ""}`}>Fertility Clinics</Link>
                  <Link href="/courses" className={`pages-link ${page == "courses" ? "selected" : ""}`}>Fertility Roadmap</Link>
                  <Link href="/my-account" className={`pages-link ${page == "my-account" ? "selected" : ""}`}>My Account</Link>
               </div>
            </header>

            <section className="body">
               {children}
            </section>
			</div>
		</div>
   </>)
}
