"use client"
import "./booking.css"
import React, { useState } from 'react'
import { CircleX } from 'lucide-react'
import { formatDate } from "@/utils/date"
import { titlize } from "@/utils/string"
import { cancelUserBooking } from "@/app/actions/booking"
import { bookingToColor } from "@/utils/funcs"

export default function Booking({ booking }: { booking: Booking }) {
   const { date_booked, created_at, time_booked, status, user_id, booking_id } = booking;
   let createdAtDate = new Date(parseInt(created_at));
   const [bookingStatus, setBookingStatus] = useState(status)

   const cancelBookingBtn = async () => {
      let result = await cancelUserBooking(booking_id, user_id);
      alert(result ? "Booking cancelled" : "Failed to cancel booking. Please try again.");
      if (result) setBookingStatus("cancelled");
   }

   return (
      <div className='booking-box'>
         <div className="details">
            <div className="date-booked text-c-sm"><b>Booked Date:</b> {date_booked}</div>
            <div className="time-slot text-c-sm"><b>Time slot booked:</b> {time_booked}</div>
            <div className="booking-date text-c-sm bold-300">
               You made this booking on <b>{formatDate(createdAtDate.getDate(), createdAtDate.getMonth()+1, createdAtDate.getFullYear())}</b>
            </div><br />

            <div className="status text-c-sm bold-600" style={{ color: bookingToColor(bookingStatus) }}>
               <b style={{color:"black"}}>Booking Status:</b> {titlize(bookingStatus)}   
            </div>
            <div className="actions">
               <button onClick={cancelBookingBtn}><CircleX /> Cancel Booking</button>
            </div>
         </div>
      </div>
   )
}