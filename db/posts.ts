import { uuid } from "@/lib/uui";
import { pool } from "./db";

export const PostsDB = {
   getAllPosts: async (): Promise<Post[] | false> => {
      const res = await pool.query("SELECT * FROM posts ORDER BY id DESC");
      return res.rows.length > 0 ? res.rows : false;
   },

   getPost: async (postid: string) => {
      const res = await pool.query("SELECT * FROM posts WHERE postid = $1 LIMIT 1", [postid]);
      return res.rows.length > 0 ? res.rows[0] : false;
   },

   addPost: async (userid: string, message: string, date: string) => {
      const postid = uuid.postid();
      const res = await pool.query(
         "INSERT INTO posts (postid, userid, message, date) VALUES ($1, $2, $3, $4)",
         [postid, userid, message, date]
      );
      return res.rowCount === 1;
   },
};
 