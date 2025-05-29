import { uuid } from "@/lib/uui";
import { pool } from "./db";

export const RepliesDB = {
   getPostReplies: async (postid: string): Promise<Reply[] | false> => {
      const res = await pool.query("SELECT * FROM replies WHERE postid = $1", [postid]);
      return res.rows.length > 0 ? res.rows : false;
   },

   addPostReply: async (userid: string, postid: string, message: string, date: string) => {
      const replyid = uuid.replyid();
      const res = await pool.query(
         "INSERT INTO replies (replyid, userid, message, date, postid) VALUES ($1, $2, $3, $4, $5)",
         [replyid, userid, message, date, postid]
      );
      return res.rowCount === 1;
   }
};
 