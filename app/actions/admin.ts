"use server"
import { DietTipsDB, FertilityTipsDB, LifestyleTipsDB } from "@/db/tips";
import { checkAdminUser } from "./user";
import { ClinicsDB } from "@/db/clinics";
import { saveTipImage } from "@/lib/tipImage";
import { UserDB } from "@/db/user";


function formatTipTitle (title: string) {
   return title.replace(" ", "-").replace("/", "-").replace(/\\/g, "").replace(":", "-").replace("<", "-").replace(">", "-").replace("?", "-").replace('"', "-").replace("|", "-")
}

export async function insertDietTip (title: string, text: string, image: string, date: string) {
   const result = await checkAdminUser();
   let tipImageUrl = "";

   if (image !== "") {
      try {
         let res = await saveTipImage(image, formatTipTitle(title));
         if (res == false) return false;
         tipImageUrl = res;
      } catch (err) { return false; }
   }

   if (result) {
      const res = await DietTipsDB.insert(title, text, date, tipImageUrl);
      return res;
   } else {
      return "Invalid Admin"
   }
}

export async function insertLifestyleTip (title: string, text: string, image: string, date: string) {
   const result = await checkAdminUser();
   let tipImageUrl = "";

   if (image !== "") {
      try {
         let res = await saveTipImage(image, formatTipTitle(title));
         if (res == false) return false;
         tipImageUrl = res;
      } catch (err) { return false; }
   }

   if (result) {
      const res = await LifestyleTipsDB.insert(title, text, date, tipImageUrl);
      return res;
   } else {
      return "Invalid Admin"
   }
}

export async function getUserFromUserId (userId: string) {
   const result = await checkAdminUser();
   if (result) {
      const res = await UserDB.getUserById(userId);
      return res;
   } else {
      return false;
   }
}

export async function insertFertilityTip (title: string, text: string, image: string, date: string) {
   const result = await checkAdminUser();
   let tipImageUrl = "";

   if (image !== "") {
      try {
         let res = await saveTipImage(image, formatTipTitle(title));
         if (res == false) return false;
         tipImageUrl = res;
      } catch (err) { return false; }
   }
   
   if (result) {
      const res = await FertilityTipsDB.insert(title, text, date, tipImageUrl);
      return res;
   } else {
      return "Invalid Admin"
   }
}

export async function approveClinic (clinicId: string) {
   const result = await checkAdminUser();
   if (result) {
      const res = await ClinicsDB.approveClinic(clinicId);
      return res;
   } else {
      return false;
   }
}

export async function getPendingClinics () {
   const result = await checkAdminUser();
   if (result) {
      try {
         const res = await ClinicsDB.unApprovedClinics();
         return res;
      } catch (err: any) {
         return false;
      }
   } else {
      return false;
   }
}