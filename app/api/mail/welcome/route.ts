import { Resend } from "resend"
import { render } from "@react-email/render"
import WelcomeEmail from "@/emails/welcome"

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
   const { email, userName } = await request.json();
   const emailBody = await render(WelcomeEmail({ userFirstname: userName }))

   const { data, error } = await resend.emails.send({
      from: "Fertility Connect <fertilityconnect@thefertilityconnect.com>",
      to: [email],
      subject: "Welcome to Fertility Connect",
      html: emailBody
   })

   if (error) {
      return Response.json(error);
   }

   return Response.json({
      message: "Email Sent Successfully",
      sent: true
   });
}