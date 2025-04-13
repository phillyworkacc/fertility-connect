import { pool } from "./db";

export const CourseOwnersDB = {
   checkCourse: async (userid: string): Promise<Course | false> => {
     const res = await pool.query(
       "SELECT * FROM course_owners WHERE userid = $1 LIMIT 1",
       [userid]
     );
     return res.rows.length > 0 ? res.rows[0] : false;
   },
 
   addCourseOwner: async (userid: string, modules: string, date: string) => {
     const res = await pool.query(
       "INSERT INTO course_owners (userid, modules, date) VALUES ($1, $2, $3)",
       [userid, modules, date]
     );
     return res.rowCount === 1;
   },
 
   updateCourseOwner: async (userid: string, modules: string) => {
     const res = await pool.query(
       "UPDATE course_owners SET modules = $1 WHERE userid = $2",
       [modules, userid]
     );
     return res.rowCount === 1;
   }
 };
 