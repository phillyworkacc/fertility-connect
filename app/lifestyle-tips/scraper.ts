"use server"

import { LifestyleTipsDB } from "@/db/tips";

export async function fetchAllLifestyleTips (): Promise<DietTip[] | "failed"> {
   try {
      const dietTips = await LifestyleTipsDB.all();
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
      console.log("error loading lifestyle tips", error);
      return "failed";
   }
}