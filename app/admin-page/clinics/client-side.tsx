"use client"
import { getPendingClinics } from '@/app/actions/admin';
import { getApprovedClinics } from '@/app/actions/clinics';
import AdminWrapper from '@/components/admin-wrapper/admin-wrapper';
import AdminClinic from '@/components/clinic/admin-clinic';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react'

type ClinicApprovalType = "approved" | "pending"

export default function ClinicsRequestsClientPage() {
   const { data: session } = useSession();
   const [filter, setFilter] = useState("pending" as ClinicApprovalType)
   const [displayClinics, setDisplayClinics] = useState([] as Clinic[])

   const showPendingClinics = async () => {
      setFilter("pending");
      setDisplayClinics([]);
      const pendingClinics = await getPendingClinics();
      if (pendingClinics == false) return;
      setDisplayClinics((prev) => [...pendingClinics]);
   }

   const showApprovedClinics = async () => {
      setFilter("approved");
      setDisplayClinics([]);
      const approvedClinics = await getApprovedClinics();
      if (approvedClinics == false) return;
      setDisplayClinics((prev) => [...approvedClinics]);
   }

   useEffect(() => {
      const loadPendingClinics = () => showPendingClinics();
      loadPendingClinics();
   }, [])

   return (
      <>
         <AdminWrapper username={session?.user?.name!} page="clinics">
            <div>
               <div className="selector">
                  <div className={`select-option ${filter == "pending" ? "selected" : ""}`} onClick={showPendingClinics}>
                     Pending
                  </div>
                  <div className={`select-option ${filter == "approved" ? "selected" : ""}`} onClick={showApprovedClinics}>Approved Clinics</div>
               </div>
               <br />

               <div className="clinics">
                  <div className="text-c-m">
                     {displayClinics.length < 1 && `No ${filter} clinics`}
                  </div>
                  {displayClinics.map((clinic: Clinic, index: number) => {
                     return <AdminClinic key={index} clinic={clinic} />
                  })}
               </div>
            </div>
         </AdminWrapper>
      </>
   )
}
