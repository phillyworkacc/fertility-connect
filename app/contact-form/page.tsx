"use client"
import React, { useState } from 'react'
import "@/styles/main.css"
import "@/styles/clinic-form.css"
import wait from '@/lib/wait'
import { contactUs } from '../actions/contact'

export default function ContactFormPage() {
   const [name, setName] = useState("")
   const [email, setEmail] = useState("")
   const [message, setMessage] = useState("")
   const [buttonLoading, setButtonLoading] = useState(false);
   const [formCompleted, setFormCompleted] = useState(false);

   const submitForm = async () => {
      setButtonLoading(true);
      await wait(1);

      const res = await contactUs(name, email, message);

      if (res) {
         setFormCompleted(true);
      } else {
         alert("An error occurred. Please try again!");
         setButtonLoading(false);
      }
   }

   return (
      <div className='body-container'>
         <div className="clinic-form">
            <div className="logo">
               <img src="./logo.png" alt="logo" />
            </div><br />

            {formCompleted ? <>
               <div className="text-c-xl bold-700">Success</div>
               <div className="text-c-m">Your message has been sent, you should receive a response in your inbox in 48 hours.</div><br />
            </> : <>
               <div className="text-c-xl bold-700">Fertility Connect Contact Form</div><br /><br />

               <div className="form-content">
                  <input type="text" name="name" placeholder='Name' value={name} onChange={(e) => setName(e.target.value)} />
               </div><br />

               <div className="form-content">
                  <input type="email" name="email" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
               </div><br />

               <div className="form-content">
                  <textarea placeholder='Message' value={message} onChange={(e) => setMessage(e.target.value)}></textarea>
               </div><br />

               <button onClick={submitForm} disabled={buttonLoading}>{buttonLoading ? 'Loading...' : 'Send Message'}</button>
            </>}

         </div>
      </div>
   )
}
