"use client"
import "@/styles/main.css"
import "@/styles/diet-tips.css"
import AppWrapper from "@/components/app-wrapper/app-wrapper"
import ErrorBlock from "@/components/error-block/error-block"
import ExtraSpacing from "@/components/extra-spacing/extra-spacing"
import LoadingAction from "@/components/loading-action/loading-action"
import { useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'
import { fetchAllDietTips } from "./scraper"
import DietTip from "@/components/diet-tip/diet-tip"
import wait from "@/lib/wait"
import BackToHome from "@/components/back-to-home/back-to-home"

export default function DietTipsClient() {
   const { data: session } = useSession();
   const [loadingAction, setLoadingAction] = useState("Getting Diet Tips");
   const [dataDietTips, setDataDietTips] = useState([] as DietTip[])
   const [scrapeFailure, setScrapeFailure] = useState("")

   useEffect(() => {
      const loadDietTips = async () => {
         await wait(1);
         const data = await fetchAllDietTips();
         if (data == "failed") {
            setScrapeFailure("Failed to load diet tips")
         } else {
            setDataDietTips((prev) => [...data]);
         }
         setLoadingAction("");
      }
      loadDietTips();
   }, [])

   return (
      <AppWrapper username={session?.user?.name!}>
         {loadingAction !== "" ? <LoadingAction actionText={loadingAction} /> : <></>}
         <div>
            <BackToHome />
            <div className="text-c-xxl bold-800">Diet Tips</div>
            {(scrapeFailure == "") ? <>
               <div className="diet-tips">
                  {dataDietTips.map((dietTip, index) => {
                     return <DietTip key={index} dietTip={dietTip} />
                  })}
               </div>
            </> : <><ErrorBlock>{scrapeFailure}</ErrorBlock></>}
         </div>

         <ExtraSpacing />
      </AppWrapper>
   )
}
