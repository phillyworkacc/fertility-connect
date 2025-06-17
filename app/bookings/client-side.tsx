"use client"
import "@/styles/booking.css"
import BookingCalendar from '@/components/booking-calendar/booking-calendar'
import React, { useEffect, useState } from 'react'
import { zeroNumber } from "@/utils/funcs"
import { ArrowLeft } from "lucide-react"
import wait from "@/lib/wait"
import { getUserBookings, requestBooking } from "../actions/booking"
import Booking from "@/components/booking/booking"
import ExtraSpacing from "@/components/extra-spacing/extra-spacing"

type Tabs = "bookings" | "form";

const date = new Date();
const currentMonth = date.getMonth();
const currentYear = date.getFullYear();
const currentDay = date.getDate();
const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const monthsOfYear = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const defaultDateChosen = `${daysOfWeek[new Date(currentYear, currentMonth, 1).getDay()]} ${zeroNumber(currentDay)} ${monthsOfYear[currentMonth]} ${currentYear}`;


export default function BookingsClientSide() {
   const [tabs, setTabs] = useState("bookings" as Tabs)
   const [confirmBookingForm, setConfirmBookingForm] = useState(false)
   const [bookings, setBookings] = useState([] as Booking[]);
   const [buttonLoading, setButtonLoading] = useState(false);
   const [buttonLoading2, setButtonLoading2] = useState(false);

   const currentTime = new Date();
   const [dateChosen, setDateChosen] = useState(defaultDateChosen)
   const [timeSlot, setTimeSlot] = useState("12:00 pm - 12:15 pm")
   const [error, setError] = useState({ status: false, text: "", preventButton: false })
   const [error2, setError2] = useState({ status: false, text: "" })

   const loadBookings = async () => {
      let result = await getUserBookings();
      setBookings(result == false ? [] : result);
   }
   useEffect(() => {
      loadBookings();
   }, [])


   const goBackToBookingFormButton = () => {
      setDateChosen(defaultDateChosen);
      setConfirmBookingForm(false);
   }

   const resetError = () => setError((prev) => ({ status: false, text: "", preventButton: false }));
   const confirmBookingTimeToday = () => {
      resetError();
      const [startTimeStr, endTimeStr] = timeSlot.split(" - ");
      
      const today = currentTime.toISOString().split("T")[0]; // Get YYYY-MM-DD

      const startTime = new Date(`${today} ${startTimeStr}`);
      
      const diffInMs = startTime.getTime() - currentTime.getTime();
      const diffInMinutes = diffInMs / (1000 * 60);

      let result = diffInMinutes >= 60;

      if (!result) {
         setError((prev) => ({ ...prev, status: true, text: "You must book a consultations an hour or earlier before the chosen timeslot." }))
      }

      return result;
   }
   const checkIfToday = () => {
      return (dateChosen === defaultDateChosen);
   }
   const checkIfBeforeToday = (timeInMs: number) => {
      resetError();
      let result = (currentTime.getTime() > timeInMs);
      if (result) {
         setError((prev) => ({ ...prev, status: true, text: "Date cannot be in the past", preventButton: true }))
      }
      return result;
   }


   const submitForm = async () => {
      setError2((prev) => ({ status: false, text: "" }))
      setButtonLoading(true);
      await wait(1);
      
      // meaning that the date set is before the current day for the user (today)
      if (error.preventButton) { setButtonLoading(false); return;}
      
      // reset errors to prevent misinformation
      resetError();

      // check if the day chosen is the current day for the user (today)
      let isToday = checkIfToday();

      let validTimeSlotToday = false;
      if (isToday) {
         validTimeSlotToday = confirmBookingTimeToday();
      }

      if (validTimeSlotToday == false && isToday) { setButtonLoading(false); return;}

      setButtonLoading(false);
      setConfirmBookingForm(true);
   }
   const fullfuilSendBookingForm = async () => {
      setError2({ status: false, text: "" });
      setButtonLoading2(true);
      await wait(1);
      let result = await requestBooking(dateChosen, timeSlot);
      if (result == "exists") {
         setButtonLoading2(false);
         setError2({ status: true, text: "That date and time slot has already been booked. Please select a different date or time slot." });
      } else if (result == true) {
         alert("Booking successful!")
         await loadBookings();
         setTabs("bookings");
         setButtonLoading(false);
         setButtonLoading2(false);
         setError({ status: false, text: "", preventButton: false });
         setError2({ status: false, text: "" });
         setDateChosen(defaultDateChosen)
         setConfirmBookingForm(false)
         setTimeSlot("12:00 pm - 12:15 pm")
      } else {
         setButtonLoading2(false);
         setError2({ status: true, text: "Your booking failed to process. Please try again." });
      }
   }

   return (
      <>
         <br />
         <div className="selector">
            <div 
               className={`select-option ${tabs == "bookings" ? "selected" : ""}`}
               onClick={() => setTabs("bookings")}
            >Bookings</div>
            <div 
               className={`select-option ${tabs == "form" ? "selected" : ""}`}
               onClick={() => setTabs("form")}
            >Book a consultation</div>
         </div><br />

         {(tabs == "bookings") ? <>
            {(bookings.length > 0) ? <>
               {bookings.map((booking, index) => {
                  return (<><Booking key={index} booking={booking}></Booking><br /></>)
               })}
            </> : <>
               <div className="text-c-sm">You have no bookings</div>
            </>}
         </> : <>
            {(confirmBookingForm) ? <>
               <div className="text-c-l bold-700 pd-1">Confirm your booking</div>
               <div className="text-c-sm"><b>Date:</b> {dateChosen}</div>
               <div className="text-c-sm"><b>Time Slot:</b> {timeSlot}</div><br />

               {(error2.status) ? (<><br /><div className="text-c-sm error bold-600">{error2.text}</div></>) : (<></>)}
               <div className="text-c-sm dfb">
                  <button className="outline" onClick={goBackToBookingFormButton}><ArrowLeft /> Go Back</button>
                  <button onClick={fullfuilSendBookingForm} disabled={buttonLoading2}>{buttonLoading2 ? "Loading..." : "Confirm Booking"}</button>
               </div>
            </> : <>
               <div className="text-c-m bold-700 pd-1">Choose a Date</div>
               <BookingCalendar onChange={(date: string, rawDate: Date) => {
                  console.log(`date: ${date}, rawUtc: ${rawDate.toUTCString()}`)
                  setDateChosen(date);
                  checkIfBeforeToday(rawDate.getTime());
               }} /><br /><br />
               
               <div className="text-c-m bold-700">Choose a Time</div>
               <div className="text-c-sm bold-300 pd-1">You must choose a time slot <b>an hour or earlier</b> before the time</div>
               <select onChange={(e) => setTimeSlot(e.target.value)}>
                  <option value="12:00 pm - 12:15 pm">12:00 pm - 12:15 pm</option>
                  <option value="12:25 pm - 12:40 pm">12:25 pm - 12:40 pm</option>
                  <option value="12:50 pm - 1:05 pm">12:50 pm - 1:05 pm</option>
                  <option value="1:15 pm - 1:30 pm">1:15 pm - 1:30 pm</option>
                  <option value="1:40 pm - 1:55 pm">1:40 pm - 1:55 pm</option>
               </select><br /><br />

               {(error.status) ? (<><br /><div className="text-c-sm error bold-600">{error.text}</div></>) : (<></>)}
               <button onClick={submitForm} disabled={buttonLoading}>{buttonLoading ? "Loading..." : "Book Consultation"}</button>

               <ExtraSpacing />
            </>}
         </>}
      </>
   )
}
