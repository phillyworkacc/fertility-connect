import { pool } from './db';

export const EBookDB = {
   insert: async (userid: string, transactionId: string): Promise<boolean> => {
      const data: any = await pool.query(
         "INSERT INTO ebook (`userid`, `transactionId`) VALUES (?, ?); ", 
         [ userid, transactionId ]
      );
      return (data[0].affectedRows == 1);
   },
   checkForPreviousTransaction: async (userid: string, transactionId: string): Promise<boolean> => {
      const [tips]: any = await pool.query(
         "SELECT * FROM ebook WHERE `userid` = ? AND `transactionId` = ?",
         [ userid, transactionId ]
      );
      tips as any[];
      return tips.length > 0 ? true : false;
   }
}