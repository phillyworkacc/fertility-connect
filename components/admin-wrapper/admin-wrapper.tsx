'use client'
import "@/styles/main.css"
import Link from 'next/link'
import React from 'react'

type Page = "admin-home" | "clinics" | "tips" | "bookings"

export default function AdminWrapper({ 
   username, 
   children, 
   page
}: { children:React.ReactNode, username: string, page?: Page }) {
   return (<>
      <div className="body-container">
			<div className="page-container">
            <header>
               <div className="greeting">Hello {username}</div>
               <div className="header-dropdown">
                  <Link href="/admin-page" className={`pages-link ${page == "admin-home" ? "selected" : ""}`}>Admin Home</Link>
                  <Link href="/admin-page/clinics" className={`pages-link ${page == "clinics" ? "selected" : ""}`}>Clinics</Link>
                  <Link href="/admin-page/bookings" className={`pages-link ${page == "bookings" ? "selected" : ""}`}>Bookings</Link>
                  <Link href="/admin-page/tips" className={`pages-link ${page == "tips" ? "selected" : ""}`}>Tips</Link>
               </div>
            </header>

            <section className="body">
               {children}
            </section>
			</div>
		</div>
   </>)
}
