import { uuid } from '@/lib/uui';
import { pool } from './db';

export const UserDB = {
   login: async (email: string, password: string) => {
      const [users]: any = await pool.query(
         "SELECT * FROM users WHERE `email` = ? AND `password` = ? LIMIT 1",
         [ email, password ]
      );
      users as User[];
      return users.length > 0 ? users[0] : false;
   },

   getUser: async (email: string) => {
      const [users]: any = await pool.query("SELECT * FROM users WHERE email = ?", [email]);
      return users.length > 0 ? users[0] as User : false;
   },

   getUserById: async (userid: string) => {
      const [users]: any = await pool.query("SELECT * FROM users WHERE userid = ?", [userid]);
      return users.length > 0 ? users[0] as User : false;
   },

   isSubscribed: async (userid: string) => {
      const [users]: any = await pool.query("SELECT * FROM users WHERE userid = ?", [userid]);
      users as User[];
      return users[0].subscribed;
   },

   insert: async (user: Omit<User, 'subscribed' | 'userid'>) => {
      const data: any = await pool.query(
         "INSERT INTO users (`userid`, `username`, `email`, `password`, `subscribed`, `created_at`) VALUES (?, ?, ?, ?, ?, ?); ", 
         [ uuid.userid(), user.username, user.email, user.password, '0', user.created_at ]
      );
      return (data[0].affectedRows == 1);
   },

   subscribeUser: async (userid: string) => {
      const data: any = await pool.query("UPDATE users SET `subscribed` = ? WHERE `userid` = ?; ", ['1', userid]);
      return (data[0].affectedRows == 1 || data[0].changedRows == 1);
   },

   changePwd: async (email: string, newPassword: string) => {
      const data: any = await pool.query("UPDATE users SET `password` = ? WHERE `email` = ?; ", [newPassword, email]);
      return (data[0].affectedRows == 1 || data[0].changedRows == 1);
   },

   resetPwd: async (userid: string, newPassword: string) => {
      const data: any = await pool.query("UPDATE users SET `password` = ? WHERE `userid` = ?; ", [newPassword, userid]);
      return (data[0].affectedRows == 1 || data[0].changedRows == 1);
   },
   
   delete: async (email: string) => {
      const data: any = await pool.query("DELETE FROM users WHERE `email` = ?; ", [email]);
      return (data[0].affectedRows == 1);
   }
}