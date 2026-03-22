"use server"
import { MessagesDB } from "@/db/messages";
import { checkAdminUser, checkUserLoggedIn } from "./user";
import { UserDB } from "@/db/user";
import sendMail from "@/lib/sendMail";

export async function notifyConsultantChatMessage (userid: string) {
   const user = await UserDB.getUserById(userid);
   if (!user) return;

   await sendMail(
      "odukoyadayo23@gmail.com",
      `New Message from ${user.username} - Consultant Chat`,
      `You have received a new message from ${user.username} <br />
      Open it here: <a href='https://thefertilityconnect/consultant-chats/${user.userid}'>View Message from ${user.username}</a> `
   );
}

export async function sendMessageToConsultant (message: string, userid: string) {
   try {
      const userLoggedIn = await checkUserLoggedIn();
      if (userLoggedIn) {
         const sent = await MessagesDB.sendMessage(userid, message);
         if (sent) {
            await notifyConsultantChatMessage(userid);
         }
         return sent;
      } else {
         return false;
      }
   } catch (e) {
      return false;
   }
}

export async function sendMessageToUserContact (message: string, contactId: string) {
   try {
      const userLoggedIn = await checkUserLoggedIn();
      if (userLoggedIn) {
         const isAdmin = await checkAdminUser();
         if (isAdmin) {
            const sent = await MessagesDB.sendConsultantMessage(contactId, message);
            return sent;
         } else {
            return false;
         }
      } else {
         return false;
      }
   } catch (e) {
      return false;
   }
}