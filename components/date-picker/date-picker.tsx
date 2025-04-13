"use client"
import "./date-picker.css"
import { formatDate } from "@/utils/date"
import { ChevronDown, ChevronUp } from 'lucide-react'
import React, { useState } from 'react'

export default function DatePicker({ onChange }: { onChange: Function }) {
   const formatDayMonth = (dayOrMonth: string | number) => {
      return parseInt(`${dayOrMonth}`) < 10 ? `0${dayOrMonth}` : `${dayOrMonth}`
   }
   
   const [day, setDay] = useState(`${formatDayMonth(new Date(Date.now()).getDate())}` as string)
   const [month, setMonth] = useState(`${formatDayMonth(new Date(Date.now()).getMonth() + 1)}` as string)
   const [year, setYear] = useState(`${new Date(Date.now()).getFullYear()}` as string)

   return (
      <div className="date-picker-container">
         <div className='date-picker'>
            <div className="section">
               <span onClick={() => {
                  setDay(formatDayMonth(parseInt(day) + 1))
                  onChange(`${year}-${month}-${formatDayMonth(parseInt(day) + 1)}`)
               }}><ChevronUp /></span>
               <input 
                  type="number" 
                  name="day"
                  value={day} 
                  onChange={(e) => setDay(formatDayMonth(e.target.value))} />
               <span onClick={() => {
                  setDay(formatDayMonth(parseInt(day) - 1))
                  onChange(`${year}-${month}-${formatDayMonth(parseInt(day) - 1)}`)
               }}><ChevronDown /></span>
            </div>

            <div className="section">
               <span onClick={() => {
                  setMonth(formatDayMonth(parseInt(month) + 1))
                  onChange(`${year}-${formatDayMonth(parseInt(month) + 1)}-${day}`)
               }}><ChevronUp /></span>
               <input 
                  type="number" 
                  name="month" 
                  value={month} 
                  onChange={(e) => setMonth(formatDayMonth(e.target.value))} />

               <span onClick={() => {
                  setMonth(formatDayMonth(parseInt(month) - 1))
                  onChange(`${year}-${formatDayMonth(parseInt(month) - 1)}-${day}`)
               }}><ChevronDown /></span>
            </div>

            <div className="section">
               <span onClick={() => {
                  setYear(`${parseInt(year) + 1}`)
                  onChange(`${parseInt(year) + 1}-${month}-${day}`)
               }}><ChevronUp /></span>

               <input 
                  type="number" 
                  name="year" 
                  value={year} 
                  onChange={(e) => setYear(e.target.value)} />

               <span onClick={() => {
                  setYear(`${parseInt(year) - 1}`)
                  onChange(`${parseInt(year) - 1}-${month}-${day}`)
               }}><ChevronDown /></span>
            </div>
         </div>

         <div className="full-date">{formatDate(
            parseInt(day),
            parseInt(month),
            parseInt(year)
         )}</div>
      </div>
   )
}
