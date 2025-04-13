import { pool } from './db';

export const DietTipsDB = {
   insert: async (title: string, text: string, date: string, image?: string) => {
     const res = await pool.query(
       "INSERT INTO diet_tips (title, text, image, date) VALUES ($1, $2, $3, $4)",
       [title, text, image || '', date]
     );
     return res.rowCount === 1;
   },
 
   all: async (): Promise<any[] | false> => {
     const res = await pool.query(
       "SELECT title, text, image, date FROM diet_tips ORDER BY id DESC"
     );
     return res.rows.length > 0 ? res.rows : false;
   }
 };
 
 export const LifestyleTipsDB = {
   insert: async (title: string, text: string, date: string, image?: string) => {
     const res = await pool.query(
       "INSERT INTO lifestyle_tips (title, text, image, date) VALUES ($1, $2, $3, $4)",
       [title, text, image || '', date]
     );
     return res.rowCount === 1;
   },
 
   all: async (): Promise<any[] | false> => {
     const res = await pool.query(
       "SELECT title, text, image, date FROM lifestyle_tips ORDER BY id DESC"
     );
     return res.rows.length > 0 ? res.rows : false;
   }
 };
 
 export const FertilityTipsDB = {
   insert: async (title: string, text: string, date: string, image?: string) => {
     const res = await pool.query(
       "INSERT INTO fertility_tips (title, text, image, date) VALUES ($1, $2, $3, $4)",
       [title, text, image || '', date]
     );
     return res.rowCount === 1;
   },
 
   all: async (): Promise<any[] | false> => {
     const res = await pool.query(
       "SELECT title, text, image, date FROM fertility_tips ORDER BY id DESC"
     );
     return res.rows.length > 0 ? res.rows : false;
   }
 };