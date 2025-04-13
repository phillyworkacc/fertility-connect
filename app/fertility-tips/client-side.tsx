"use client"
import "@/styles/main.css"
import "@/styles/diet-tips.css"
import AppWrapper from "@/components/app-wrapper/app-wrapper"
import ErrorBlock from "@/components/error-block/error-block"
import ExtraSpacing from "@/components/extra-spacing/extra-spacing"
import LoadingAction from "@/components/loading-action/loading-action"
import { useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'
import { fetchAllFertilityTips } from "./scraper"
import DietTip from "@/components/diet-tip/diet-tip"
import wait from "@/lib/wait"
import BackToHome from "@/components/back-to-home/back-to-home"

export default function FertilityTipsClient() {
   const { data: session } = useSession();
   const [loadingAction, setLoadingAction] = useState("Getting Fertility Tips");
   const [dataFertilityTips, setDataFertilityTips] = useState([] as DietTip[])
   const [scrapeFailure, setScrapeFailure] = useState("")

   useEffect(() => {
      const loadFertilityTips = async () => {
         await wait(1);
         const data = await fetchAllFertilityTips();
         if (data == "failed") {
            setScrapeFailure("Failed to load fertility tips")
         } else {
            setDataFertilityTips((prev) => [...data]);
            console.log(data)
         }
         setLoadingAction("");
      }
      loadFertilityTips();
   }, [])

   return (
      <AppWrapper username={session?.user?.name!}>
         {loadingAction !== "" ? <LoadingAction actionText={loadingAction} /> : <></>}
         <div>
            <BackToHome />
            <div className="text-c-xxl bold-800">Fertility Tips</div>
            {(scrapeFailure == "") ? <>
               <div className="diet-tips">
                  {dataFertilityTips.map((ferilityTip, index) => {
                     return <DietTip key={index} dietTip={ferilityTip} />
                  })}
               </div>
            </> : <><ErrorBlock>{scrapeFailure}</ErrorBlock></>}
         </div>

         <ExtraSpacing />
      </AppWrapper>
   )
}
