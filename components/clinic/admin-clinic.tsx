"use client"
import "./clinic.css"
import React from 'react'
import { appUrl } from '@/utils/constants'
import { Facebook, Instagram, Mail, Phone } from 'lucide-react'
import Link from 'next/link'
import { approveClinic } from "@/app/actions/admin"
import TiktokIcon from "../tiktok/tiktok"
import { sendFertilityInstitutionApprovalEmail } from "@/app/actions/clinics"

export default function AdminClinic({ clinic }: { clinic: Clinic }) {
   const { clinic_id: clinicId, name, telephone, email, address, website, instagram, tiktok, facebook, approved } = clinic;
   const approveClinicBtn = async () => {
      const result = await approveClinic(clinicId);
      if (result) {
         let sendMail = await sendFertilityInstitutionApprovalEmail(name, email, clinic.clinic_code);
         if (sendMail) {
            alert('Clinic Approved');
         } else {
            alert('An error occured. Please try again.');
         }
      } else {
         alert('An error occured. Please try again.');
      }
   }

   return (
      <div className='clinic'>
         <div className="logo">
            <img src={appUrl + "/assets/clinic-logo.png"} />
         </div>
         <div className="details">
            <div className="name text-c-xl bold-700 mc">{name}</div><br />
            <div className="email text-c-m">{email}</div>
            <div className="telephone text-c-m">{telephone}</div><br />
            <div className="address text-c-m">{address}</div><br />

            {(instagram) ? <>
               <div className="name text-c-m dfb"><Instagram /> <Link href={instagram} target="_blank">{name}</Link></div>
            </> : <></>}
            {(tiktok) ? <>
               <div className="name text-c-m dfb"><TiktokIcon /> <Link href={tiktok} target="_blank">{name}</Link></div>
            </> : <></>}
            {(facebook) ? <>
               <div className="name text-c-m dfb"><Facebook /> <Link href={facebook} target="_blank">{name}</Link></div>
            </> : <></>}

            {(website) ? <>
               <br />
               <div className="website text-c-m">
                  Website: <Link href={website} target="_blank" className="visible-link sc">Click here</Link>
               </div><br /><br />
            </> : <><br /></>}
            
            <div className="actions">
               {approved ? <>
                  <Link href={`tel:${telephone}`}><button><Phone /> Call</button></Link>
                  <Link href={`mailto:${email}`}><button><Mail /> Email</button></Link>
               </> : <>
                  <button onClick={approveClinicBtn}>Approve</button>
               </>}
            </div>
         </div>
      </div>
   )
}