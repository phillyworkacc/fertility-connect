"use server"
import { BookingDB } from "@/db/booking";
import { checkUserLoggedIn, getCurrentUser } from "./user";
import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import ConfirmBookingEmail from "@/emails/madeBooking";
import { render } from "@react-email/components";
import { Resend } from "resend"
import CancelBookingEmail from "@/emails/cancelBooking";
import CancelBookingEmailAdmin from "@/emails/cancelBookingAdmin";
import { UserDB } from "@/db/user";

const resend = new Resend(process.env.RESEND_API_KEY);


async function sendConfirmBookingEmail (user: User, date: string, timeSlot: string): Promise<boolean> {
   const emailBody = await render(ConfirmBookingEmail({
      meetingDate: date,
      username: user.username,
      timeSlot
   }))

   const { data, error } = await resend.emails.send({
      from: "Fertility Connect <fertilityconnect@thefertilityconnect.com>",
      to: [user.email],
      subject: "Meeting Confirmation",
      html: emailBody
   })

   if (error) {
      return false;
   } else {
      return true;
   }
}

async function sendCancelledBookingEmail (user: User, date: string, timeSlot: string): Promise<boolean> {
   const emailBody = await render(CancelBookingEmail({
      meetingDate: date,
      username: user.username,
      timeSlot
   }))

   const { data, error } = await resend.emails.send({
      from: "Fertility Connect <fertilityconnect@thefertilityconnect.com>",
      to: [user.email],
      subject: "Meeting Cancellation Notice",
      html: emailBody
   })

   if (error) {
      return false;
   } else {
      return true;
   }
}

async function sendCancelledBookingAdminEmail (user: User, date: string, timeSlot: string): Promise<boolean> {
   const emailBody = await render(CancelBookingEmailAdmin({
      meetingDate: date,
      username: user.username,
      timeSlot
   }))

   const { data, error } = await resend.emails.send({
      from: "Fertility Connect <fertilityconnect@thefertilityconnect.com>",
      to: [user.email],
      subject: "Meeting Cancellation Notice",
      html: emailBody
   })

   if (error) {
      return false;
   } else {
      return true;
   }
}

export async function requestBooking (dateStr: string, timeSlotStr: string): Promise<boolean | "exists"> {
   const userLoggedIn = await checkUserLoggedIn();
   if (userLoggedIn) {
      const session = await getServerSession(authOptions);
      if (!session) return false;
      if (!session.user) return false;

      const user = await getCurrentUser(session.user.email!);
      if (user == false) return false;

      try {
         let bookingExists = await BookingDB.checkBookingExists({ date_booked: dateStr, time_booked: timeSlotStr });
         if (bookingExists) {
            return "exists";
         } else {
            let sendConfirmationEmail = await sendConfirmBookingEmail(user, dateStr, timeSlotStr);
            let result = await BookingDB.makeBooking({
               user_id: user.userid,
               date_booked: dateStr,
               time_booked: timeSlotStr,
               created_at: `${Date.now()}`
            })
            return (result && sendConfirmationEmail);
         }
      } catch (err) {
         return false;
      }
   } else {
      return false;
   }
}

export async function getUserBookings (): Promise<Booking[] | false> {
   const userLoggedIn = await checkUserLoggedIn();
   if (userLoggedIn) {
      const session = await getServerSession(authOptions);
      if (!session) return false;
      if (!session.user) return false;

      const user = await getCurrentUser(session.user.email!);
      if (user == false) return false;

      try {
         let result = await BookingDB.getAllUserBookings(user.userid)
         return result;
      } catch (err) {
         return false;
      }
   } else {
      return false;
   }
}

export async function cancelUserBooking (bookingId: string, userId: string, admin?: boolean): Promise<boolean> {
   try {
      const user = await UserDB.getUserById(userId);
      if (user == false) return false;

      const bookingInfo = await BookingDB.getBookingInfo(bookingId);
      if (bookingInfo == false) return false;

      if (admin) {
         // send admin style cancelled booking email
         let sendCancellationEmail = await sendCancelledBookingAdminEmail(user, bookingInfo.date_booked, bookingInfo.time_booked);
         let result = await BookingDB.cancelBooking(bookingId, userId);
         return (result && sendCancellationEmail);
      } else {
         // send user style cancelled booking email
         let sendCancellationEmail = await sendCancelledBookingEmail(user, bookingInfo.date_booked, bookingInfo.time_booked);
         let result = await BookingDB.cancelBooking(bookingId, userId);
         return (result && sendCancellationEmail);
      }
   } catch (err) {
      return false;
   }
}

export async function completeUserBooking (bookingId: string, userId: string): Promise<boolean> {
   try {
      let result = await BookingDB.completeBooking(bookingId, userId);
      return result;
   } catch (err) {
      return false;
   }
}