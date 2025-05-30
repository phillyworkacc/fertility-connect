'use client'
import "@/styles/main.css"
import "@/styles/clinic-form.css"
import wait from "@/lib/wait"
import { useState } from 'react'
import { updateClinic } from "../actions/clinics"

export default function ClinicManagerForm ({ clinic, logOutAction }: { clinic: Clinic, logOutAction: Function }) {
   const clinicTypes: any[] = ["Fertility Clinics", "Fertility Expert", "Diagnostic Laboratory", "Other"]
   const [name, setName] = useState(clinic.name)
   const [type, setType] = useState(clinicTypes[clinicTypes.indexOf(clinic.type)] as ClinicType)
   const [email, setEmail] = useState(clinic.email)
   const [telephone, setTelephone] = useState(clinic.telephone)
   const [address, setAddress] = useState(clinic.address)
   const [website, setWebsite] = useState(clinic.website)
   const [instagram, setInstagram] = useState(clinic.instagram)
   const [facebook, setFacebook] = useState(clinic.facebook)
   const [tiktok, setTiktok] = useState(clinic.tiktok)

   const [buttonLoading, setButtonLoading] = useState(false);

   const updateClinicForm = async () => {
      setButtonLoading(true);
      await wait(1);
      const res = await updateClinic({ 
         name, email, telephone, address, type,
         date: `${Date.now()}`,
         website, instagram, facebook, tiktok,
         clinic_code: `${crypto.randomUUID().replaceAll("-","")}`
      });
      if (res) {
         alert("Clinic Details Updated")
      } else {
         alert("An error occurred. Please try again!");
      }
      setButtonLoading(false);
   }

   return (
      <div className='body-container'>
         <div className="clinic-form">
            <div className="logo">
               <img src="./logo.png" alt="logo" />
            </div><br />

            <div className="text-c-xl bold-700">Manage your Fertility Institution</div>
            <div className="text-c-sm pd-2"><b>Clinic Code: </b> {clinic.clinic_code}</div>

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

            <button onClick={updateClinicForm} disabled={buttonLoading}>{buttonLoading ? 'Loading...' : 'Update'}</button>
            <div className="text-c-s full pd-1">
               <button className="outline" onClick={() => {
                  localStorage.removeItem("fertility_connect_clinic_code_id")
                  logOutAction()
               }}>Log Out</button>
            </div>
            <br /><br />
         </div>
      </div>
   )
}
