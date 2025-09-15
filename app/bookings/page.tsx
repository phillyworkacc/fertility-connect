import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import AppWrapper from "@/components/app-wrapper/app-wrapper";
import { getCurrentUser } from "../actions/user";
import { signOut } from "next-auth/react";
import isSubscribed from "@/utils/checkSubscription";
import BookingsClientSide from "./client-side";
import { subscribeToFertilityConnect } from "../actions/payments";
import Link from "next/link";

export default async function LoginPage() {
   const session = await getServerSession(authOptions);

   if (!session) {
      redirect("/login");
   }

   const current_user = await getCurrentUser(session.user?.email!);

   if (!current_user) {
      signOut();
   } else {
      // const isUserSubscribed = await isSubscribed(current_user.subscribed);
      // let subscriptionPaymentLink = "";
      // if (!isUserSubscribed) {
      //    subscriptionPaymentLink = await subscribeToFertilityConnect('/home');
      // }

      return <>
         <AppWrapper username={session.user?.name!} page="bookings">
            <div className="section-body-container">
               {isSubscribed(current_user.subscribed) ? <>
                  <BookingsClientSide />
               </> : <>
                  <div className="text-c s" style={{padding:"30px 0"}}>
                     <div className="text-c-m bold-700">You don't have access to any bookings <br /> Subscribe to Fertility Connect to continue</div><br />
                     <Link href={'/pricing'}><button>Subscribe</button></Link>
                  </div>
               </>}
            </div>
         </AppWrapper>
      </>
   }
}
