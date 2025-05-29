"use client"
import "./back-to-home.css"
import Link from "next/link"
import { ReactNode } from 'react'
import { mainUserHomeUrl } from "@/utils/constants"
import { ArrowLeft } from "lucide-react"

export default function BackToHome({ children, url, icon }: { children?: ReactNode, url?: string, icon?: ReactNode }) {
   return (
      <Link href={url || mainUserHomeUrl}>
         <div className="back-to-home">{icon || <ArrowLeft size={30} />} {children ? <div className="text-c-m">{children}</div> : ''}</div>
      </Link>
   )
}

export function BackToAction ({ children, action, icon }: { children: ReactNode, action: Function, icon?: ReactNode }) {
   return (
      <div className="back-to-action" onClick={() => action()}>
         {icon || <ArrowLeft size={30} />} {<div className="text-c-m">{children}</div>}
      </div>
   )
}
