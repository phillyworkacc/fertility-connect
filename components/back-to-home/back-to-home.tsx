"use cliet"
import "./back-to-home.css"
import Link from "next/link"
import React from 'react'
import { mainUserHomeUrl } from "@/utils/constants"
import { ArrowLeft } from "lucide-react"

export default function BackToHome() {
   return (
      <Link href={mainUserHomeUrl}>
         <div className="back-to-home"><ArrowLeft size={30} /></div>
      </Link>
   )
}
