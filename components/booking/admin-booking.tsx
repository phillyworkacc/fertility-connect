"use client"
import "./booking.css"
import React, { useEffect, useState } from 'react'
import { CircleCheck, CircleX } from 'lucide-react'
import { formatDate } from "@/utils/date"
import { titlize } from "@/utils/string"
import { cancelUserBooking, completeUserBooking } from "@/app/actions/booking"
import { bookingToColor } from "@/utils/funcs"
import { getUserFromUserId } from "@/app/actions/admin"

export default function Booking({ booking, userId }: { booking: Booking, userId: string }) {
   const { date_booked, created_at, time_booked, status, user_id, booking_id } = booking;
   let createdAtDate = new Date(parseInt(created_at));
   const [bookingStatus, setBookingStatus] = useState(status)
   const [display, setDisplay] = useState(true)
   const [user, setUser] = useState({} as User)

   useEffect(() => { getUser(); }, [])

   const getUser = async () => {
      let user = await getUserFromUserId(userId);
      if (user == false) {
         setDisplay(true);
      } else {
         setUser((prev) => ({ ...user }))
      }
   } 

   const cancelBookingBtn = async () => {
      let result = await cancelUserBooking(booking_id, user_id, true);
      alert(result ? "Booking cancelled" : "Failed to cancel booking. Please try again.");
      if (result) setBookingStatus("cancelled");
   }

   const completeBookingBtn = async () => {
      let result = await completeUserBooking(booking_id, user_id);
      alert(result ? "Booking completed" : "Failed to compelte booking. Please try again.");
      if (result) setBookingStatus("completed");
   }

   if (!display) return null;

   return (
      <div className='booking-box'>
         <div className="details">
            <div className="text-c-m bold-800">User Details</div>
            <div className="date-booked text-c-sm"><b>Username:</b> {user.username}</div>
            <div className="time-slot text-c-sm"><b>Email:</b> {user.email}</div>

            <div className="date-booked text-c-sm"><b>Booked Date:</b> {date_booked}</div>
            <div className="time-slot text-c-sm"><b>Time slot booked:</b> {time_booked}</div>
            <div className="booking-date text-c-sm bold-300">
               {user.username} made this booking on <b>{formatDate(createdAtDate.getDate(), createdAtDate.getMonth()+1, createdAtDate.getFullYear())}</b>
            </div><br />

            <div className="status text-c-sm bold-600" style={{ color: bookingToColor(bookingStatus) }}>
               <b style={{color:"black"}}>Booking Status:</b> {titlize(bookingStatus)}   
            </div>
            <div className="actions">
               <button onClick={completeBookingBtn}><CircleCheck /> Complete Booking</button>
               <button onClick={cancelBookingBtn}><CircleX /> Cancel Booking</button>
            </div>
         </div>
      </div>
   )
}