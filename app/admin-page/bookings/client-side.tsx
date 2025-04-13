"use client"
import AdminWrapper from '@/components/admin-wrapper/admin-wrapper';
import AdminBooking from '@/components/booking/admin-booking';
import { titlize } from '@/utils/string';
import { useSession } from 'next-auth/react';
import React, { useState } from 'react'


export default function ClinicsRequestsClientPage({
   pendingBookings, cancelledBookings, completedBookings
}: { pendingBookings: Booking[], cancelledBookings: Booking[], completedBookings: Booking[] }) {
   const { data: session } = useSession();
   const [selectedTab, setSelectedTab] = useState("pending" as BookingStatus)
   const tabs: BookingStatus[] = ["pending", "completed", "cancelled"]

   return (
      <>
         <AdminWrapper username={session?.user?.name!} page="bookings">
            <div>
               <div className="selector">
                  {tabs.map((tab, index) => {
                     return <div 
                        key={index}
                        className={`select-option ${selectedTab == tab ? "selected" : ""}`}
                        onClick={() => setSelectedTab(tab)}
                     >{titlize(tab)}</div>
                  })}
               </div>
               <br />

               <div className="bookings">
                  
                  {(selectedTab == "cancelled") ? <>
                     {(cancelledBookings.length < 1) ? <div className='text-c-sm'>No Cancelled Bookings</div> : ""}
                     {cancelledBookings.map((cancelledBooking, index) => {
                        return (<>
                           <AdminBooking key={index} userId={cancelledBooking.user_id} booking={cancelledBooking} />
                           <br />
                        </>)
                     })}
                  </> : <></>}
                  
                  {(selectedTab == "completed") ? <>
                     {(completedBookings.length < 1) ? <div className='text-c-sm'>No Completed Bookings</div> : ""}
                     {completedBookings.map((completedBooking, index) => {
                        return (<>
                           <AdminBooking key={index} userId={completedBooking.user_id} booking={completedBooking} />
                        </>)
                     })}
                  </> : <></>}

                  
                  {(selectedTab == "pending") ? <>
                     {(pendingBookings.length < 1) ? <div className='text-c-sm'>No Pending Bookings</div> : ""}
                     {pendingBookings.map((pendingBooking, index) => {
                        return (<>
                           <AdminBooking key={index} userId={pendingBooking.user_id} booking={pendingBooking} />
                        </>)
                     })}
                  </> : <></>}
               </div>
            </div>
         </AdminWrapper>
      </>
   )
}
