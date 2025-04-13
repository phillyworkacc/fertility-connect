import { pool } from "./db";

export const AdminDB = {
   checkAdmin: async (userid: string) => {
      const [users]: any = await pool.query(
         "SELECT * FROM admins WHERE `userid` = ? LIMIT 1",
         [ userid ]
      );
      users as any[];
      return users.length > 0 ? true : false;
   }
}