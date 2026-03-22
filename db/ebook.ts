import { db } from "@/db";
import { ebookTable } from "@/db/schemas";
import { eq, and } from "drizzle-orm";

export const EBookDB = {
   insert: async (userid: string, transactionId: string): Promise<boolean> => {
      const res = await db.insert(ebookTable).values({
         userid,
         transactionId
      });
      return (res.rowCount === 1);
   },

   checkForPreviousTransaction: async (
      userid: string,
      transactionId: string
   ): Promise<boolean> => {
      const res = await db
         .select()
         .from(ebookTable)
         .where(
            and(
               eq(ebookTable.userid, userid),
               eq(ebookTable.transactionId, transactionId)
            )
         )
         .limit(1);

      return res.length > 0;
   }
};