import { uuid } from '@/lib/uui';
import { pool } from './db';

export const UserDB = {
   login: async (email: string, password: string) => {
     const res = await pool.query(
       "SELECT * FROM users WHERE email = $1 AND password = $2 LIMIT 1",
       [email, password]
     );
     return res.rows.length > 0 ? res.rows[0] as User : false;
   },
 
   getAllUsers: async (): Promise<User[]> => {
     const res = await pool.query("SELECT * FROM users");
     return res.rows as User[];
   },
 
   getUser: async (email: string) => {
     const res = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
     return res.rows.length > 0 ? res.rows[0] as User : false;
   },
 
   getUserById: async (userid: string) => {
     const res = await pool.query("SELECT * FROM users WHERE userid = $1", [userid]);
     return res.rows.length > 0 ? res.rows[0] as User : false;
   },
 
   isSubscribed: async (userid: string) => {
     const res = await pool.query("SELECT subscribed FROM users WHERE userid = $1", [userid]);
     return res.rows.length > 0 ? res.rows[0].subscribed : null;
   },
 
   insert: async (user: Omit<User, 'subscribed' | 'userid'>) => {
     const userid = uuid.userid();
     const res = await pool.query(
       "INSERT INTO users (userid, username, email, password, subscribed, created_at) VALUES ($1, $2, $3, $4, $5, $6)",
       [userid, user.username, user.email, user.password, '0', user.created_at]
     );
     return res.rowCount === 1;
   },
 
   subscribeUser: async (userid: string) => {
     const res = await pool.query(
       "UPDATE users SET subscribed = $1 WHERE userid = $2",
       ['1', userid]
     );
     return res.rowCount === 1;
   },
 
   changePwd: async (email: string, newPassword: string) => {
     const res = await pool.query(
       "UPDATE users SET password = $1 WHERE email = $2",
       [newPassword, email]
     );
     return res.rowCount === 1;
   },
 
   updateName: async (email: string, newName: string) => {
     const res = await pool.query(
       "UPDATE users SET username = $1 WHERE email = $2",
       [newName, email]
     );
     return res.rowCount === 1;
   },
 
   updateEmail: async (email: string, newEmail: string) => {
     const res = await pool.query(
       "UPDATE users SET email = $1 WHERE email = $2",
       [newEmail, email]
     );
     return res.rowCount === 1;
   },
 
   resetPwd: async (userid: string, newPassword: string) => {
     const res = await pool.query(
       "UPDATE users SET password = $1 WHERE userid = $2",
       [newPassword, userid]
     );
     return res.rowCount === 1;
   },
 
   delete: async (email: string) => {
     const res = await pool.query(
       "DELETE FROM users WHERE email = $1",
       [email]
     );
     return res.rowCount === 1;
   }
 };