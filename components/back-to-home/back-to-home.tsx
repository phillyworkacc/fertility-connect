"use client"
import "./back-to-home.css"
import Link from "next/link"
import { ReactNode } from 'react'
import { mainUserHomeUrl } from "@/utils/constants"
import { ArrowLeft } from "lucide-react"

export default function BackToHome({ children, url }: { children?: ReactNode, url?: string }) {
   return (
      <Link href={url || mainUserHomeUrl}>
         <div className="back-to-home"><ArrowLeft size={30} /> {children ? <div className="text-c-m">{children}</div> : ''}</div>
      </Link>
   )
}
