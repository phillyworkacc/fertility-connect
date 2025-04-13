"use server"
import { UserDB } from "@/db/user";
import { AdminDB } from "@/db/admin";
import { authOptions } from "@/lib/authOptions";
import { hashPasswordT } from "@/utils/hash";
import { getServerSession } from "next-auth";
import { appUrl } from "@/utils/constants";
import { reverseString } from "@/utils/string";
import { render } from "@react-email/components";
import { ResetPasswordEmail } from "@/emails/forgotPwd";
import { Resend } from "resend"
import JourneyToParahEBookEmail from "@/emails/eBookEmail";
import { EBookDB } from "@/db/ebook";
import fs from "fs";
import path from "path";
import SubscribedUserEmail from "@/emails/subscribedEmail";
import PurchasedCourseEmail from "@/emails/purchasedCourse";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendJourneyToParahEbookEmail (transactionId: string): Promise<string | boolean> {
   try {
      const session = await getServerSession(authOptions);
      if (!session) return "User does not exist";
      if (!session.user) return "User does not exist";

      const user = await getCurrentUser(session.user.email!);
      if (user == false) return "User does not exist";

      const checkForPrevPaymentForEbook = await EBookDB.checkForPreviousTransaction(user.userid, transactionId);
      if (checkForPrevPaymentForEbook) {
         return true;
      } else {
         let addedTransaction = await EBookDB.insert(user.userid, transactionId);
         if (addedTransaction) {
            const emailBody = await render(JourneyToParahEBookEmail({
               username: user.username
            }))
         
            const { data, error } = await resend.emails.send({
               from: "Fertility Connect <fertilityconnect@thefertilityconnect.com>",
               to: [user.email],
               subject: "Your Journey to Parah eBook Purchase",
               html: emailBody,
               attachments: [{
                  filename: "ebook.pdf",
                  content: fs.readFileSync(path.join("public", "assets", "Okadaepub.pdf"))
               }]
            })
         
            if (error) {
               return "Failed to send email";
            } else {
               return true;
            }
         } else {
            return "Failed to process payment";
         }
      }
   } catch (err) {
      return "Failed to send email";
   }
}

export async function checkUserLoggedIn (): Promise<boolean> {
   return new Promise (async (resolve) => {
      const session = await getServerSession(authOptions);
      resolve((session && session.user) ? true : false)
   })
}

export async function createUserAccount (signUpFormData: SignUpFormData) {
   try {
      const { name, email, password } = signUpFormData;
      const result = await UserDB.insert({
         username: name,
         email: email,
         password: hashPasswordT(password),
         created_at: `${Date.now()}`
      })
      return result;
   } catch (error: any ) {
      console.log("sign up error - ", error.message);
      return false;
   }
}

export async function updateUserAccount (email: string, newEmail: string, newUserName: string) {
   try {

      return true;
   } catch (error: any) {
      console.log("update user account error - ", error);
      return false;
   }
}

export async function deleteUserAccount (email: string) {
   try {
      const result = await UserDB.delete(email);
      return result;
   } catch (error: any) {
      console.log("delete account error - ", error);
      return false;
   }
}

export async function changeUserAccountPassword (email: string, newPwd: string) {
   try {
      const result = await UserDB.changePwd(email, hashPasswordT(newPwd));
      return result;
   } catch (error: any) {
      console.log("change password error - ", error);
      return false;
   }
}

export async function getCurrentUser (sessionEmail: string): Promise<false | User> {
   try {
      const user = await UserDB.getUser(sessionEmail);
      return user;
   } catch (error: any) {
      return false;
   }
}

export async function checkSubscribed (userid: string): Promise<false | User> {
   try {
      const user = await UserDB.isSubscribed(userid);
      return user;
   } catch (error: any) {
      return false;
   }
}

export async function checkAdminUser () {
   const session = await getServerSession(authOptions);
   if (!session) return false;
   if (!session.user) return false;

   const currentUser = await getCurrentUser(session.user.email!);
   if (currentUser == false) return false;
   
   try {
      const result = await AdminDB.checkAdmin(currentUser.userid);
      return result;
   } catch (err: any) {
      return false;
   }
}

export async function forgotPassword (email: string) {
   const checkUserExists = await UserDB.getUser(email);
   if (checkUserExists == false) return {
      result: false,
      msg: "No user with that email exists."
   };

   const emailBody = await render(ResetPasswordEmail({
      updatedDate: new Date(),
      username: checkUserExists.username,
      resetLink: appUrl + "/reset-pwd/" + reverseString(checkUserExists.userid.split("_")[2])
   }))

   const { data, error } = await resend.emails.send({
      from: "Fertility Connect <fertilityconnect@thefertilityconnect.com>",
      to: [email],
      subject: "Reset Password for Your Fertility Connect Account",
      html: emailBody
   })

   if (error) {
      console.log(error);
      return { result: false, msg: "" };
   } else {
      console.log("reset password link sent: " + checkUserExists.username);
      return {
         result: true,
         msg: ""
      };
   }
}

export async function resetUserPassword (reversedUserId: string, password: string) {
   try {
      const actualUserId = "fc_user_" + reverseString(reversedUserId);
      const changePwd = await UserDB.resetPwd(actualUserId, hashPasswordT(password));
      return changePwd;
   } catch (error) {
      return false;
   }
}

export async function sendSubscribedUserEmail (): Promise<string | boolean> {
   try {
      const session = await getServerSession(authOptions);
      if (!session) return "User does not exist";
      if (!session.user) return "User does not exist";

      const user = await getCurrentUser(session.user.email!);
      if (user == false) return "User does not exist";

      const emailBody = await render(SubscribedUserEmail({
         username: user.username
      }))
      
      const { data, error } = await resend.emails.send({
         from: "Fertility Connect <fertilityconnect@thefertilityconnect.com>",
         to: [user.email],
         subject: "🎉 Welcome to Fertility Connect - You're a Subscriber!",
         html: emailBody
      })
   
      if (error) {
         return "Failed to send email";
      } else {
         return true;
      }
   } catch (err) {
      return "Failed to send email";
   }
}

export async function sendPurchasedFullCourseEmail (): Promise<string | boolean> {
   try {
      const session = await getServerSession(authOptions);
      if (!session) return "User does not exist";
      if (!session.user) return "User does not exist";

      const user = await getCurrentUser(session.user.email!);
      if (user == false) return "User does not exist";

      const emailBody = await render(PurchasedCourseEmail({
         username: user.username
      }))
      
      const { data, error } = await resend.emails.send({
         from: "Fertility Connect <fertilityconnect@thefertilityconnect.com>",
         to: [user.email],
         subject: "You've Got Full Access to the Fertility Connect Course !",
         html: emailBody
      })
   
      if (error) {
         return "Failed to send email";
      } else {
         return true;
      }
   } catch (err) {
      return "Failed to send email";
   }
}