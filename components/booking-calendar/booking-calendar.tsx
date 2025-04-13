"use client"
import { ChevronLeft, ChevronRight } from "lucide-react";
import "./booking-calendar.css"
import React, { useState } from 'react'
import { zeroNumber } from "@/utils/funcs";

export default function BookingCalendar({ onChange }: { onChange: Function }) {
   const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
   const monthsOfYear = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
   const daysThatCantBeBooked = [];


   const date = new Date();
   
   const [currentMonth, setCurrentMonth] = useState(date.getMonth());
   const [currentYear, setCurrentYear] = useState(date.getFullYear());
   const [currentDay, setCurrentDay] = useState(date.getDate());

   const controlDay = (change: number) => {
      setCurrentDay(change);
      onChange(
         `${daysOfWeek[new Date(currentYear, currentMonth, change).getDay()]} ${zeroNumber(change)} ${monthsOfYear[currentMonth]} ${currentYear}`,
         new Date(currentYear, currentMonth, change+1)
      );
   }

   const controlYear = (changer: number) => {
      if ((currentYear+changer) < date.getFullYear()) return;
      setCurrentYear((prev) => prev + changer);
      onChange(
         `${daysOfWeek[new Date(currentYear + changer, currentMonth, currentDay).getDay()]} ${zeroNumber(currentDay)} ${monthsOfYear[currentMonth]} ${currentYear + changer}`, 
         new Date(currentYear + changer, currentMonth, currentDay+1)
      );
   }

   const controlMonth = (changer: number) => {
      if ((currentYear+changer) < date.getFullYear()  &&  (currentMonth+changer) < date.getMonth()) return;
      setCurrentMonth((prev) => {
         let newMonth = prev + changer;
         let final = (newMonth < 0) ? 0 : (newMonth > 11) ? 11 : newMonth;
         onChange(
            `${daysOfWeek[new Date(currentYear, final, currentDay).getDay()]} ${zeroNumber(currentDay)} ${monthsOfYear[final]} ${currentYear}`, 
            new Date(currentYear, final, currentDay+1)
         );
         return final;
      });
   };

   return (
      <div className="booking-calendar">
         <div className="year-control">
            <div className="prev" onClick={() => controlYear(-1)}><ChevronLeft strokeWidth={3} /></div>
            <div className="current">{currentYear}</div>
            <div className="next" onClick={() => controlYear(1)}><ChevronRight strokeWidth={3} /></div>
         </div>
         <div className="month-control">
            <div className="prev" onClick={() => controlMonth(-1)}><ChevronLeft strokeWidth={3} /></div>
            <div className="current">{monthsOfYear[currentMonth]}</div>
            <div className="next" onClick={() => controlMonth(1)}><ChevronRight strokeWidth={3} /></div>
         </div>
         <div className="days">
            {Array.from({ length: new Date(currentYear, currentMonth + 1, 0).getDate() }, (i, j) => j + 1).map((number, index) => {
               return <div 
                  key={index} 
                  onClick={() => controlDay(number)}
                  className={`day ${number == currentDay && 'selected'}`}>{number}</div>
            })}
         </div>
         <div className="full-date">{daysOfWeek[new Date(currentYear, currentMonth, currentDay).getDay()]} {zeroNumber(currentDay)} {monthsOfYear[currentMonth]} {currentYear}</div>
      </div>
   )
}
