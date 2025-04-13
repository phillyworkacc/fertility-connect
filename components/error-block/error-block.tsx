"use client"
import { AlertTriangle } from "lucide-react"
import "./error-block.css"
import React from 'react'

export default function ErrorBlock({ children }: { children: React.ReactNode }) {
   return (
      <div className='error-block'>
         <div className="icon"><AlertTriangle /></div>
         <div className="error">{children}</div>
      </div>
   )
}
