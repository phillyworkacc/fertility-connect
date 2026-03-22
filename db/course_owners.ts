import { db } from "@/db";
import { courseOwnersTable } from "./schemas";
import { eq } from "drizzle-orm";

export const CourseOwnersDB = {
   checkCourse: async (userid: string): Promise<Course | false> => {
      const res = await db
         .select()
         .from(courseOwnersTable)
         .where(eq(courseOwnersTable.userid, userid))
         .limit(1);

      return res.length > 0 ? res[0] as any : false;
   },

   addCourseOwner: async (userid: string, modules: string, date: string) => {
      const res = await db
         .insert(courseOwnersTable)
         .values({
            userid,
            modules,
            date
         })
         .returning();

      return res.length === 1;
   },

   updateCourseOwner: async (userid: string, modules: string) => {
      const res = await db
         .update(courseOwnersTable)
         .set({ modules })
         .where(eq(courseOwnersTable.userid, userid))
         .returning();

      return res.length === 1;
   }
};