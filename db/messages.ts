import { db } from "@/db";
import { messagesTable } from "@/db/schemas";
import { uuid } from "@/lib/uui";
import { and, eq, or } from "drizzle-orm";

export const consultantUserId = "fc_user_Da1r8dme3hehDDn";

export const MessagesDB = {
   sendMessage: async (userid: string, message: string): Promise<boolean> => {
      const date = Date.now().toString()
      const res = await db.insert(messagesTable).values({
         messageid: uuid.messageid(),
         to: consultantUserId, from: userid,
         message, date
      });
      return (res.rowCount === 1);
   },

   sendConsultantMessage: async (userid: string, message: string): Promise <boolean> => {
      const date = Date.now().toString()
      const res = await db.insert(messagesTable).values({
         messageid: uuid.messageid(),
         from: consultantUserId, to: userid,
         message, date
      });
      return (res.rowCount === 1);
   },

   loadMessages: async (userid: string): Promise<any[]> => {
      const res = await db.select().from(messagesTable)
         .where(or(
            eq(messagesTable.from, userid),
            eq(messagesTable.to, userid)
         ));
      return res;
   },

   loadConsultantMessages: async (contactId: string): Promise<any[]> => {
      const res = await db.select().from(messagesTable)
         .where(or(
            and(eq(messagesTable.from, consultantUserId), eq(messagesTable.to, contactId)),
            and(eq(messagesTable.to, consultantUserId), eq(messagesTable.from, contactId))
         ));
      return res;
   }
};