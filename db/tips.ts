import { pool } from './db';

export const DietTipsDB = {
   insert: async (title: string, text: string, date: string, image?: string) => {
      const data: any = await pool.query(
         "INSERT INTO diet_tips (`title`, `text`, `image`, `date`) VALUES (?, ?, ?, ?); ", 
         [ title, text, image || '', date ]
      );
      return (data[0].affectedRows == 1);
   },
   all: async (): Promise<any[] | false> => {
      const [tips]: any = await pool.query(
         "SELECT title, text, image, date FROM diet_tips ORDER BY id DESC"
      );
      tips as any[];
      return tips.length > 0 ? tips : false;
   }
}

export const LifestyleTipsDB = {
   insert: async (title: string, text: string, date: string, image?: string) => {
      const data: any = await pool.query(
         "INSERT INTO lifestyle_tips (`title`, `text`, `image`, `date`) VALUES (?, ?, ?, ?); ", 
         [ title, text, image || '', date ]
      );
      return (data[0].affectedRows == 1);
   },
   all: async (): Promise<any[] | false> => {
      const [tips]: any = await pool.query(
         "SELECT title, text, image, date FROM lifestyle_tips ORDER BY id DESC"
      );
      tips as any[];
      return tips.length > 0 ? tips : false;
   }
}

export const FertilityTipsDB = {
   insert: async (title: string, text: string, date: string, image?: string) => {
      const data: any = await pool.query(
         "INSERT INTO fertility_tips (`title`, `text`, `image`, `date`) VALUES (?, ?, ?, ?); ", 
         [ title, text, image || '', date ]
      );
      return (data[0].affectedRows == 1);
   },
   all: async (): Promise<any[] | false> => {
      const [tips]: any = await pool.query(
         "SELECT title, text, image, date FROM fertility_tips ORDER BY id DESC"
      );
      tips as any[];
      return tips.length > 0 ? tips : false;
   }
}