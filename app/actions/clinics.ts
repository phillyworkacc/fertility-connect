"use server"
import { ClinicsDB } from "@/db/clinics";
import FertilityInstitutionApprovedEmail from "@/emails/fertilityInstitutionApproved";
import FertilityInstitutionFormEmail from "@/emails/fertilityInstitutionForm";
import { render } from "@react-email/components";
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY);

export async function getApprovedClinics () {
   try {
      const res = await ClinicsDB.approvedClinics();
      return res;
   } catch (err: any) {
      return false;
   }
}

export async function insertClinic (addClinicParams: AddClinicParams) {
   try {
      const res = await ClinicsDB.addClinic(addClinicParams);
      return res;
   } catch (err) {
      return false;
   }
}

export async function sendFertilityInstitutionFormConfirmationEmail (name: string, email: string) {
   try {
      const emailBody = await render(FertilityInstitutionFormEmail({ name }))
   
      const { data, error } = await resend.emails.send({
         from: "Fertility Connect <fertilityconnect@thefertilityconnect.com>",
         to: [email],
         subject: "Thank You for Registering — Review in Progress",
         html: emailBody
      })
   
      if (error) {
         return false;
      } else {
         return true;
      }
   } catch (err) {
      return false;
   }
}


export async function sendFertilityInstitutionApprovalEmail (name: string, email: string) {
   try {
      const emailBody = await render(FertilityInstitutionApprovedEmail({ name }))
   
      const { data, error } = await resend.emails.send({
         from: "Fertility Connect <fertilityconnect@thefertilityconnect.com>",
         to: [email],
         subject: "Thank You for Registering — Review in Progress",
         html: emailBody
      })
   
      if (error) {
         return false;
      } else {
         return true;
      }
   } catch (err) {
      return false;
   }
}