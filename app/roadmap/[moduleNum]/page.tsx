import "@/styles/roadmap.css"
import { getCurrentUser } from "@/app/actions/user";
import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { isCourseOwner } from "@/app/actions/courses";

type CourseModuleProps = {
   params: Promise<{
      moduleNum: string;
   }>
}

export default async function CourseModule ({ params }: CourseModuleProps) {
   const { moduleNum } = await params;
   const session = await getServerSession(authOptions);
   if (!session) {
      redirect("/login");
   }
   const user = await getCurrentUser(session.user?.email!);
   if (user == false) {
      redirect("/login");
   }
   const userCourses = await isCourseOwner();

   if (userCourses == false) redirect("/courses");
   if (!parseInt(moduleNum) || isNaN(parseInt(moduleNum))) redirect("/courses");
   if (parseInt(moduleNum) > 1) redirect("/home");

   return (
      <div className="roadmap-container">
         <h1>Fertility Connect Roadmap Module {parseInt(moduleNum)}</h1>
         <iframe
            src={`/rm/${moduleNum}.pdf`}
            width="100%"
            height="100%"
            style={{ border: 'none' }}
         ></iframe>
      </div>
   )
}
