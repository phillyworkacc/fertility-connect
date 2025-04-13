import { pool } from "./db";

export const CourseOwnersDB = {
   checkCourse: async (userid: string): Promise<Course | false> => {
      const [course_owners]: any = await pool.query(
         "SELECT * FROM course_owners WHERE `userid` = ? LIMIT 1",
         [ userid ]
      );
      course_owners as Course[];
      return course_owners.length > 0 ? course_owners[0] : false;
   },

   addCourseOwner: async (userid: string, modules: string, date: string) => {
      const data: any = await pool.query(
         "INSERT INTO course_owners (`userid`, `modules`, `date`) VALUES (?, ?, ?); ", 
         [ userid, modules, date ]
      );
      return (data[0].affectedRows == 1);
   },

   updateCourseOwner: async (userid: string, modules: string) => {
      const data: any = await pool.query("UPDATE course_owners SET `modules` = ? WHERE `userid` = ?; ", [modules, userid]);
      return (data[0].affectedRows == 1 || data[0].changedRows == 1);
   },
}