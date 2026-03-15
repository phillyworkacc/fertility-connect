"use server"
import CustomEmail from "@/emails/customEmail";
import { render } from "@react-email/components";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmailUsingResend (email: string, subject: string, body: string) {
   try {
      const emailBody = await render(CustomEmail({ content: body }))
   
      const { data, error } = await resend.emails.send({
         from: "Fertility Connect <fertilityconnect@thefertilityconnect.com>",
         to: [email],
         subject: subject,
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