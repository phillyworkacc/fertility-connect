"use client"
import "@/styles/main.css"
import "@/styles/ovu-calc.css"
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { getCurrentUser } from "../actions/user";
import DatePicker from "@/components/date-picker/date-picker";
import ovulationCalculator from "@/utils/ovulation";
import AppWrapper from "@/components/app-wrapper/app-wrapper";
import BackToHome from "@/components/back-to-home/back-to-home";
import isSubscribed from "@/utils/checkSubscription";
import wait from "@/lib/wait";
import Link from "next/link";

export default function OvulationCalculatorForm() {
   const { data: session } = useSession();
   const date = new Date();
   const router = useRouter();

   const [lastPeriodDate, setLastPeriodDate] = useState(`${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`)
   const [cycleLength, setCycleLength] = useState("")
   const [results, setResults] = useState("")
   const [userIsSubscribed, setUserIsSubscribed] = useState<boolean | null>(null)

   const calculateUserOvulation = async () => {
      setResults("")
      await wait(0.4);
      if (cycleLength == "") {
         setResults("Cycle length should be between 21 and 35 days.")
      } else {
         setResults(ovulationCalculator(lastPeriodDate, parseInt(cycleLength)));
      }
   }

   const checkUserSubscription = async () => {
      const user = await getCurrentUser(session?.user?.email!);
      if (!user) {
         setUserIsSubscribed(false);
         return;
      }
      setUserIsSubscribed(isSubscribed(user.subscribed));
   }

   useEffect(() => {
      checkUserSubscription();
   }, [])

	return (
      <AppWrapper username={session?.user?.name!}>
         <div className="ovu-calculator">
            <BackToHome />

            <div className="title">Ovulation Calculator</div>

            <h3>Choose First Day of Last Period Date</h3>
            <div className="form-content">
               <DatePicker onChange={(date: string) => setLastPeriodDate(date)} />
            </div><br /><br />

            <div className="form-content cycle-length">
               <input 
                  type="number" 
                  name="cycle-length" 
                  value={cycleLength} 
                  onChange={(e) => setCycleLength(e.target.value)} />
            </div>

            {results !== "" ? (<>
               <h2>{results}</h2>
            </>) : (<></>)}

            <div className="form-content">
               <button onClick={calculateUserOvulation}>Calculate Ovulation</button>
            </div>
            
            <br />
            {(userIsSubscribed == null) ? <>
               <div className="text-c-s">Loading Ovulation Tracker...</div>
            </> : (userIsSubscribed == false) ? <>
               <div className="text-c-m bold-500">Want to track your ovulation dates and know when you're most fertile ?</div>
               <div className="text-c-m bold-500">Subscribe to FertilityConnect to access the Ovulation Tracker</div>
               <button onClick={() => router.push("/pricing")}>Subscribe Now</button>
            </> : <>
               <div className="form-content">
                  <Link href='/ovulation-tracker' className="visible-link sc text-c-sm">Use Ovulation Tracker</Link>
               </div>
            </>}

         </div>
      </AppWrapper>
	)
}
