"use server"
import { Resend } from "resend"


export async function contactUs (name: string, email: string, message: string) {
   const resend = new Resend(process.env.RESEND_API_KEY);

   const htmlBody = `<p style="font-size: 18px;">
      <span>You have received a message from <b>${name}</b>, <b>${email}</b>.</span><br /><br />
      <span><b>To:</b> Fertility Connect</span><br />
      <span><b>From:</b> ${name}, ${email}</span><br /><br />
      <span><b>Message:</b> ${message}</span><br />
   </p>`

   const { data, error } = await resend.emails.send({
      from: "Fertility Connect <fertilityconnect@thefertilityconnect.com>",
      to: ["philkef120@gmail.com"],
      subject: "Message from Contact Form",
      html: htmlBody
   })

   if (error) {
      return false;
   }
   return true;
}