"use server"
import { getCurrentUser } from "./user";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { CourseOwnersDB } from "@/db/course_owners";


export async function isCourseOwner (): Promise<Course | false> {
   try {
      const session = await getServerSession(authOptions);
      if (!session) return false;
      if (!session.user) return false;

      const user = await getCurrentUser(session.user.email!);
      if (user == false) return false;

      const result = await CourseOwnersDB.checkCourse(user.userid);
      if (result == false) return false;

      return result;
   } catch (err) {
      return false;
   }
}