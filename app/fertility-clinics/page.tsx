import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { getApprovedClinics } from "../actions/clinics";
import { getCurrentUser } from "../actions/user";
import { signOut } from "next-auth/react";
import AppWrapper from "@/components/app-wrapper/app-wrapper";
import Clinic from "@/components/clinic/clinic";
import BackToHome from "@/components/back-to-home/back-to-home";
import React from "react";
import isSubscribed from "@/utils/checkSubscription";
import Link from "next/link";

export default async function FertilityClinics () {
   const session = await getServerSession(authOptions);
   if (!session) {
      redirect("/login");
   }
   
   let approvedClinics = await getApprovedClinics();
   if (approvedClinics == false) approvedClinics = [];

   const current_user = await getCurrentUser(session.user?.email!);
   if (!current_user) {
      signOut();
   } else {
      return (
         <AppWrapper username={session?.user?.name || 'No Session'} page="clinics">
            {(isSubscribed(current_user.subscribed)) ? (<>            
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
            </>) : (<>
               <div className="text-c s" style={{padding:"30px 0"}}>
                  <div className="text-c-m bold-700">You don't have access to any bookings <br /> Subscribe to Fertility Connect to continue</div><br />
                  <Link href={'/pricing'}><button>Subscribe</button></Link>
               </div>   
            </>)}
         </AppWrapper>
      )
   }
}