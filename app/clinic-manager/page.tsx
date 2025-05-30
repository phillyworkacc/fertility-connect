'use client'
import { useState } from "react"
import ClinicManagerIdentifier from "./identifier"
import ClinicManagerForm from "./manager"

export default function ClinicManager () {
   const [clinicInfo, setClinicInfo] = useState<Clinic | null>(null)
   
   return (
      <>
         {(clinicInfo !== null) ? <>
            <ClinicManagerForm clinic={clinicInfo} logOutAction={() => setClinicInfo(null)} />
         </> : <>
            <ClinicManagerIdentifier onCorrectClinicCode={(clinic) => setClinicInfo(clinic)} />
         </>}
      </>
   )
}
