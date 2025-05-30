'use client'
import "@/styles/auth.css"
import { useEffect, useState } from "react"
import { getClinicFromCode } from "../actions/clinics"
import wait from "@/lib/wait"

export default function ClinicManagerIdentifier ({ onCorrectClinicCode }: { onCorrectClinicCode: (clinic: Clinic) => void }) {
   const [clinicCode, setClinicCode] = useState("");
   const [buttonLoading, setButtonLoading] = useState(false)
   const [error, setError] = useState<string | null>(null)

   const verifyClinicCode = async () => {
      setButtonLoading(true)
      setError(null)
      await wait(0.4);
      if (clinicCode == "") {
         setError("Please enter a clinic code")
         return;
      }
      const clinic = await getClinicFromCode(clinicCode);
      if (!clinic) {
         setError("Incorrect clinic code")
         return;
      }
      localStorage.setItem("fertility_connect_clinic_code_id", clinicCode);
      onCorrectClinicCode(clinic);
      setButtonLoading(false);
   }

   const verifyClinicCodeThroughLS = async () => {
      setButtonLoading(true)
      const clinicCodeSaved = localStorage.getItem("fertility_connect_clinic_code_id")
      const clinic = await getClinicFromCode(clinicCodeSaved!);
      if (!clinic) {
         setButtonLoading(false)
         localStorage.removeItem("fertility_connect_clinic_code_id")
         return;
      }
      onCorrectClinicCode(clinic);
   }

   useEffect(() => {
      if (localStorage.getItem("fertility_connect_clinic_code_id")) {
         verifyClinicCodeThroughLS();
      }
   }, [])

   return (
      <div className="auth-container">
         <div className="auth-box">
            <div className="auth-logo">
               <img src="./logo.png" alt="logo" />
            </div>
            <div className="text-c-xl bold-600">Clinic Manager</div>
            <div className="text-c-sm pd-1">Please enter your clinic code provided in your approval email to login to the clinic manager.</div>
            {(error !== "" && error !== null) && <div className="text-c-sm error pd-1">{error}</div>}
            <div className="form-content">
               <input type="text" placeholder="Clinic Code" value={clinicCode} onChange={(e) => setClinicCode(e.target.value)} />
            </div>
            <div className="form-content">
               <button onClick={verifyClinicCode} disabled={buttonLoading}>{buttonLoading ? 'Loading...' : 'Continue'}</button>
            </div>
         </div>
      </div>
   )
}
