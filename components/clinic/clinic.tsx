"use client"
import "./clinic.css"
import React from 'react'
import { appUrl } from '@/utils/constants'
import { Facebook, Instagram, Mail, Phone } from 'lucide-react'
import Link from 'next/link'
import TiktokIcon from "../tiktok/tiktok"

export default function Clinic({ clinic }: { clinic: Clinic }) {
   const { name, telephone, email, address, website, instagram, facebook, tiktok } = clinic;
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
               <div className="address text-c-m">
                  Website: <Link href={website} target="_blank" className="visible-link sc">Click here</Link>
               </div><br /><br />
            </> : <><br /></>}

            <div className="actions">
               <Link href={`tel:${telephone}`}><button><Phone /> Call</button></Link>
               <Link href={`mailto:${email}`}><button><Mail /> Email</button></Link>
            </div>
         </div>
      </div>
   )
}