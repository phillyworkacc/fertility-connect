"use client"
import "@/styles/main.css"
import "@/styles/diet-tips.css"
import AppWrapper from "@/components/app-wrapper/app-wrapper"
import ErrorBlock from "@/components/error-block/error-block"
import ExtraSpacing from "@/components/extra-spacing/extra-spacing"
import LoadingAction from "@/components/loading-action/loading-action"
import { useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'
import { fetchAllLifestyleTips } from "./scraper"
import DietTip from "@/components/diet-tip/diet-tip"
import wait from "@/lib/wait"
import BackToHome from "@/components/back-to-home/back-to-home"

export default function LifestyleTipsClient() {
   const { data: session } = useSession();
   const [loadingAction, setLoadingAction] = useState("Getting Lifestyle Tips");
   const [dataLifestyleTips, setDataLifestyleTips] = useState([] as DietTip[])
   const [scrapeFailure, setScrapeFailure] = useState("")

   useEffect(() => {
      const loadLifestyleTips = async () => {
         await wait(1);
         const data = await fetchAllLifestyleTips();
         if (data == "failed") {
            setScrapeFailure("Failed to load lifestyle tips")
         } else {
            setDataLifestyleTips((prev) => [...data]);
         }
         setLoadingAction("");
      }
      loadLifestyleTips();
   }, [])

   return (
      <AppWrapper username={session?.user?.name!}>
         {loadingAction !== "" ? <LoadingAction actionText={loadingAction} /> : <></>}
         <div>
            <BackToHome />
            <div className="text-c-xxl bold-800">Lifestyle Tips</div>
            {(scrapeFailure == "") ? <>
               <div className="diet-tips">
                  {dataLifestyleTips.map((lifestyleTip, index) => {
                     return <DietTip key={index} dietTip={lifestyleTip} />
                  })}
               </div>
            </> : <><ErrorBlock>{scrapeFailure}</ErrorBlock></>}
         </div>

         <ExtraSpacing />
      </AppWrapper>
   )
}
