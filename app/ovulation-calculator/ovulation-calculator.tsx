"use client"
import "@/styles/main.css"
import "@/styles/ovu-calc.css"
import { useState } from "react";
import DatePicker from "@/components/date-picker/date-picker";
import ovulationCalculator from "@/utils/ovulation";
import AppWrapper from "@/components/app-wrapper/app-wrapper";
import { useSession } from "next-auth/react";
import BackToHome from "@/components/back-to-home/back-to-home";
import React from "react";

export default function OvulationCalculatorForm() {
   const { data: session } = useSession();
   const date = new Date();
   const [lastPeriodDate, setLastPeriodDate] = useState(`${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`)
   const [cycleLength, setCycleLength] = useState("")
   const [results, setResults] = useState("")

   const calculateUserOvulation = () => {
      if (cycleLength == "") {
         setResults("Cycle length should be between 21 and 35 days.")
      } else {
         setResults(ovulationCalculator(lastPeriodDate, parseInt(cycleLength)));
      }
   }

	return (
      <AppWrapper username={session?.user?.name!}>
         <div className="ovu-calculator">
            <BackToHome />

            <div className="title">Ovulation Calculator</div>

            <h3>Choose Last Period Date</h3>
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
               <br />
               <h2>{results}</h2>
            </>) : (<></>)}

            <div className="form-content">
               <button onClick={() => calculateUserOvulation()}>Calculate Ovulation</button>
            </div>
         </div>
      </AppWrapper>
	)
}
