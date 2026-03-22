import { db } from "@/db";
import { eq } from "drizzle-orm";
import { adminsTable } from "./schemas";

export const AdminDB = {
   checkAdmin: async (userid: string) => {
      const res = await db
         .select()
         .from(adminsTable)
         .where(eq(adminsTable.userid, userid))
         .limit(1);

      return res.length > 0;
   }
};