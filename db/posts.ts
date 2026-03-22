import { db } from "@/db";
import { postsTable } from "@/db/schemas";
import { eq, desc } from "drizzle-orm";
import { uuid } from "@/lib/uui";

export const PostsDB = {
   getAllPosts: async (): Promise<Post[] | false> => {
      const res: any = await db
         .select()
         .from(postsTable)
         .orderBy(desc(postsTable.id));

      return res.length > 0 ? res : false;
   },

   getPost: async (postid: string) => {
      const res = await db
         .select()
         .from(postsTable)
         .where(eq(postsTable.postid, postid))
         .limit(1);

      return res.length > 0 ? res[0] : false;
   },

   addPost: async (userid: string, message: string, date: string) => {
      const postid = uuid.postid();

      const res = await db
         .insert(postsTable)
         .values({
            postid,
            userid,
            message,
            date
         })
         .returning();

      return res.length === 1;
   },
};