"use client"
import React, { useEffect, useState } from 'react'
import "@/styles/main.css"
import "@/styles/clinic-form.css"
import wait from '@/lib/wait'
import { insertClinic, sendFertilityInstitutionFormConfirmationEmail } from '../actions/clinics'
import { getFluttterwaveSearchParams } from '@/utils/getFlutterwaveSearchParams'
import { useRouter } from 'next/navigation'
import { verifyPayment } from '../actions/payments'

export default function ClinicFormPage() {
   const clinicTypes: any[] = ["Fertility Clinics", "Fertility Expert", "Diagosnistic Laboratory", "Other"]
   const [name, setName] = useState("")
   const [type, setType] = useState("Fertility Clinic" as ClinicType)
   const [email, setEmail] = useState("")
   const [telephone, setTelephone] = useState("")
   const [address, setAddress] = useState("")
   const [website, setWebsite] = useState("")
   const [instagram, setInstagram] = useState("")
   const [facebook, setFacebook] = useState("")
   const [tiktok, setTiktok] = useState("")
   const [buttonLoading, setButtonLoading] = useState(false);
   const [formCompleted, setFormCompleted] = useState(false);
   const [render, setRender] = useState(false)
   const router = useRouter();

   const submitForm = async () => {
      setButtonLoading(true);
      await wait(1);
      const res = await insertClinic({ 
         name, email, telephone, address, type,
         date: `${Date.now()}`,
         website, instagram, facebook, tiktok
      });
      if (res) {
         let sendMail = await sendFertilityInstitutionFormConfirmationEmail(name, email);
         if (sendMail) {
            setFormCompleted(true);
         } else {
            setButtonLoading(false);
         }
      } else {
         alert("An error occurred. Please try again!");
         setButtonLoading(false);
      }
   }

   const verifyPaymentForClinic = async (transactionId: string) => {
      let verified = await verifyPayment(transactionId);
      if (!verified) {
         router.push("/");
      } else {
         setRender(verified);
      }
   }

   useEffect(() => {
      const { transactionId } = getFluttterwaveSearchParams(window);
      if (transactionId !== "") {
         verifyPaymentForClinic(transactionId);
      } else {
         router.push("/");
      }

      const handleBeforeUnload = (e: BeforeUnloadEvent) => {
         e.preventDefault();
         e.returnValue = ''; // Required for Chrome to show the prompt
      };

      window.addEventListener('beforeunload', handleBeforeUnload);

      return () => {
         window.removeEventListener('beforeunload', handleBeforeUnload);
      };
   }, [])

   if (render) {
      return (
         <div className='body-container'>
            <div className="clinic-form">
               <div className="logo">
                  <img src="./logo.png" alt="logo" />
               </div><br />
   
               {formCompleted ? <>
                  <div className="text-c-xl bold-700">Success</div>
                  <div className="text-c-m">Your clinic form has been submitted and will be approved within 48 hours.</div><br />
               </> : <>
                  <div className="text-c-xl bold-700">Fertility Connect Form</div><br /><br />
                  <div className="text-c-m bold-600">Do not close this page, as you will not be able to access this form again.</div><br />
                  <div className="text-c-m">Please fill out the form below.</div><br /><br />
                  <div className="form-content">
                     <input type="text" name="name" placeholder='Name' value={name} onChange={(e) => setName(e.target.value)} />
                  </div><br />
   
                  <div className="form-content">
                     <div className="selector">
                        {clinicTypes.map((clinicType, index) => {
                           return <div 
                              key={index} 
                              className={`select-option ${clinicType == type ? "selected" : ""}`}
                              onClick={() => setType(clinicType)}
                           >{clinicType}</div>
                        })}
                     </div>
                  </div><br />
   
                  <div className="form-content">
                     <input type="email" name="email" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
                  </div><br />
   
                  <div className="form-content">
                     <input type="text" name="telephone" placeholder='Telephone' value={telephone} onChange={(e) => setTelephone(e.target.value)} />
                  </div><br />
   
                  <div className="form-content">
                     <textarea placeholder='Address' value={address} onChange={(e) => setAddress(e.target.value)}></textarea>
                  </div><br />
   
                  <div className="form-content">
                     <input type="text" name="website" placeholder='Website (OPTIONAL)' value={website} onChange={(e) => setWebsite(e.target.value)} />
                  </div><br />
   
                  <div className="form-content">
                     <input type="text" name="instagram" placeholder='Instagram Link (OPTIONAL)' value={instagram} onChange={(e) => setInstagram(e.target.value)} />
                  </div><br />
   
                  <div className="form-content">
                     <input type="text" name="facebook" placeholder='Facebook Link (OPTIONAL)' value={facebook} onChange={(e) => setFacebook(e.target.value)} />
                  </div><br />
   
                  <div className="form-content">
                     <input type="text" name="tiktok" placeholder='Tiktok Link (OPTIONAL)' value={tiktok} onChange={(e) => setTiktok(e.target.value)} />
                  </div><br />
   
                  <button onClick={submitForm} disabled={buttonLoading}>{buttonLoading ? 'Loading...' : 'Submit'}</button>
               </>}
   
            </div>
         </div>
      )
   } else {
      return (
         <div className='body-container'>
            <div className="clinic-form">
               <div className="logo">
                  <img src="./logo.png" alt="logo" />
               </div><br />
               <div className="text-c-xl bold-700">Loading...</div>
            </div>
         </div>
      )
   }
}
