import { pool } from "./db";

export const AdminDB = {
   checkAdmin: async (userid: string) => {
      const res = await pool.query(
         "SELECT * FROM admins WHERE userid = $1 LIMIT 1",
         [userid]
      );
      return res.rows.length > 0;
   }
}