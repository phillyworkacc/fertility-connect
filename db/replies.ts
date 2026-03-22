import { db } from "@/db";
import { repliesTable } from "@/db/schemas";
import { eq } from "drizzle-orm";
import { uuid } from "@/lib/uui";

export const RepliesDB = {
   getPostReplies: async (postid: string): Promise<Reply[] | false> => {
      const res: any[] = await db
         .select()
         .from(repliesTable)
         .where(eq(repliesTable.postid, postid));

      return res.length > 0 ? res : false;
   },

   addPostReply: async (
      userid: string,
      postid: string,
      message: string,
      date: string
   ) => {
      const replyid = uuid.replyid();

      const res = await db
         .insert(repliesTable)
         .values({
            replyid,
            userid,
            message,
            date,
            postid
         })
         .returning();

      return res.length === 1;
   },

   getAll: async () => {
      return await db.select().from(repliesTable);
   }
};