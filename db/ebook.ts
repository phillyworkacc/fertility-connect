import { pool } from './db';

export const EBookDB = {
   insert: async (userid: string, transactionId: string): Promise<boolean> => {
     const res = await pool.query(
       "INSERT INTO ebook (userid, transactionId) VALUES ($1, $2)",
       [userid, transactionId]
     );
     return res.rowCount === 1;
   },
 
   checkForPreviousTransaction: async (userid: string, transactionId: string): Promise<boolean> => {
     const res = await pool.query(
       "SELECT * FROM ebook WHERE userid = $1 AND transactionId = $2",
       [userid, transactionId]
     );
     return res.rows.length > 0;
   }
 };
 