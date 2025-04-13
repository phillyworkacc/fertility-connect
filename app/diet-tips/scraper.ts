"use server"

import { DietTipsDB } from "@/db/tips";

export async function fetchAllDietTips (): Promise<DietTip[] | "failed"> {
   try {
      const dietTips = await DietTipsDB.all();
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
      console.log("error loading diet tips", error);
      return "failed";
   }
}