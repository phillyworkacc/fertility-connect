"use client"
import "@/styles/main.css"
import "@/styles/ovu-calc.css"
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import DatePicker from "@/components/date-picker/date-picker";
import ovulationCalculator from "@/utils/ovulation";
import AppWrapper from "@/components/app-wrapper/app-wrapper";
import BackToHome from "@/components/back-to-home/back-to-home";
import wait from "@/lib/wait";
import CycleCalendar from "./cycle-calendar";

type TrackerResults = {
   ovulation: string;
   fertileStart: string;
   fertileEnd: string;
}

export default function OvulationCalculatorForm() {
   const { data: session } = useSession();
   const date = new Date();
   const router = useRouter();

   const [lastPeriodDate, setLastPeriodDate] = useState(`${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`)
   const [cycleLength, setCycleLength] = useState("")
   const [periodLength, setPeriodLength] = useState("")
   const [trackerResults, setTrackerResults] = useState<TrackerResults | string | null>(null)

   const trackOvulation = async () => {
      setTrackerResults(null)
      await wait(0.4);

      if (cycleLength == "" || (parseInt(cycleLength) < 21) || (parseInt(cycleLength) > 35)) {
         setTrackerResults("Cycle length should be between 21 and 35 days.")
         return;
      }

      const periodLengthInt = parseInt(periodLength)
      if (periodLength !== "" && (periodLengthInt < 3 || periodLengthInt > 7)) {
         setTrackerResults("Period length should be between 3 and 7 days.")
         return;
      }

      const start = new Date(lastPeriodDate);
      const ovulation = new Date(start);
      ovulation.setDate(start.getDate() + (parseInt(cycleLength) - 14));

      const fertileStart = new Date(ovulation);
      fertileStart.setDate(ovulation.getDate() - 2);
      const fertileEnd = new Date(ovulation);
      fertileEnd.setDate(ovulation.getDate() + 2);

      setTrackerResults({
         ovulation: ovulation.toDateString(),
         fertileStart: fertileStart.toDateString(),
         fertileEnd: fertileEnd.toDateString(),
      });
   }

	return (
      <AppWrapper username={session?.user?.name!}>
         <div className="ovu-calculator">
            <BackToHome />

            <div className="title">Ovulation Tracker</div>

            <h3>Choose Last Period Date</h3>
            <div className="form-content">
               <DatePicker onChange={(date: string) => setLastPeriodDate(date)} />
            </div>

            <div className="form-content cycle-length">
               <input 
                  type="number" 
                  name="cycle-length" 
                  value={cycleLength} 
                  onChange={(e) => setCycleLength(e.target.value)} />
            </div>

            <div className="form-content period-length">
               <input 
                  type="number" 
                  name="period-length" 
                  value={periodLength} 
                  onChange={(e) => setPeriodLength(e.target.value)} />
            </div>

            {(trackerResults == null) ? <></> : (typeof trackerResults == "string") ? <>
               <h2>{trackerResults}</h2>
            </> : <>
               <br />
               <div className="text-c-sm pd-1"><b>Ovulation Day:</b> {trackerResults.ovulation}</div>
               <div className="text-c-sm pd-1"><b>Fertile Window:</b> {trackerResults.fertileStart} to {trackerResults.fertileEnd}</div>

               <CycleCalendar
                  startDate={lastPeriodDate}
                  cycleLength={parseInt(cycleLength)}
                  periodLength={parseInt(periodLength) || 5}
               />
            </>}

            <div className="form-content">
               <button onClick={trackOvulation}>Track Ovulation</button>
            </div>

         </div>
      </AppWrapper>
	)
}
