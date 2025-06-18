import AppWrapper from "@/components/app-wrapper/app-wrapper";
import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { getApprovedClinics } from "../actions/clinics";
import Clinic from "@/components/clinic/clinic";
import BackToHome from "@/components/back-to-home/back-to-home";
import React from "react";

export default async function FertilityClinics () {
   const session = await getServerSession(authOptions);
   if (!session) {
      redirect("/login");
   }
   
   let approvedClinics = await getApprovedClinics();
   if (approvedClinics == false) approvedClinics = [];

   return (
      <AppWrapper username={session?.user?.name || 'No Session'} page="clinics">
         <div>
            <BackToHome />
            <div className="text-c-xl bold-600">Fertility Institutions</div><br />
            <div className="clinics">
               {approvedClinics.length > 0 ? <>
                  <br />
                  {approvedClinics.map((approvedClinic: Clinic, index: number) => {
                     return <Clinic key={index} clinic={approvedClinic} />
                  })}
               </> : <>
                  <div className="text-c-sm">No fertility institutions</div>
               </>}
            </div>
         </div>
      </AppWrapper>
   )
}