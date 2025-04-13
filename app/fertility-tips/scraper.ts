"use server"

import { FertilityTipsDB } from "@/db/tips";

export async function fetchAllFertilityTips (): Promise<DietTip[] | "failed"> {
   try {
      const dietTips = await FertilityTipsDB.all();
      if (dietTips == false) {
         return "failed";
      } else {
         return dietTips.map((dt: any) => {
            return {
               title: dt.title,
               text: dt.text,
               image: dt.image,
               pubDate: dt.date
            } as DietTip
         })
      }
   } catch (error) {
      console.log("error loading fertility tips", error);
      return "failed";
   }
}