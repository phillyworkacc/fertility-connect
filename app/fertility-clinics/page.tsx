import AppWrapper from "@/components/app-wrapper/app-wrapper";
import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { getApprovedClinics } from "../actions/clinics";
import Clinic from "@/components/clinic/clinic";
import BackToHome from "@/components/back-to-home/back-to-home";
import React from "react";

export default async function Home() {
   const session = await getServerSession(authOptions);
   if (!session) {
      redirect("/login");
   }

   const approvedClinics = await getApprovedClinics();
   if (approvedClinics == false) {
      redirect("/home")
   }

   return (
      <AppWrapper username={session?.user?.name || 'No Session'}>
         <div>
            <BackToHome />
            <div className="text-c-xl bold-600">Fertility Clinics</div><br /><br />
            {approvedClinics.map((approvedClinic: Clinic, index: number) => {
               return <Clinic key={index} clinic={approvedClinic} />
            })}
         </div>
      </AppWrapper>
   )
}