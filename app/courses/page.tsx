import "@/styles/main.css"
import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import AppWrapper from "@/components/app-wrapper/app-wrapper";
import { getCurrentUser } from "../actions/user";
import { signOut } from "next-auth/react";
import CoursesClientSide from "./client-side";
import { isCourseOwner } from "../actions/courses";
import { subscribeToFertilityConnectCourseModule1, subscribeToFertilityConnectCourseModule2, subscribeToFertilityConnectCourseModule3, subscribeToFertilityConnectCourseModule4, subscribeToFertilityConnectCourseModule5, subscribeToFertilityConnectFullCourse } from "../actions/payments";
import Link from "next/link";

export default async function LoginPage() {
   const modules: CourseModules[] = ["Module 1", "Module 2", "Module 3", "Module 4", "Module 5"];
   
   const session = await getServerSession(authOptions);
   if (!session) {
      redirect("/login");
   }

   const current_user = await getCurrentUser(session.user?.email!);
   if (!current_user) {
      signOut();
   } else {
      const isCourseOwnerRes = await isCourseOwner();
      const buyFullCourseLink = await subscribeToFertilityConnectFullCourse();
      const module1PaymentLinks = await subscribeToFertilityConnectCourseModule1();
      const module2PaymentLinks = await subscribeToFertilityConnectCourseModule2();
      const module3PaymentLinks = await subscribeToFertilityConnectCourseModule3();
      const module4PaymentLinks = await subscribeToFertilityConnectCourseModule4();
      const module5PaymentLinks = await subscribeToFertilityConnectCourseModule5();
      const modulePaymentLinks: any[] = [module1PaymentLinks, module2PaymentLinks, module3PaymentLinks, module4PaymentLinks, module5PaymentLinks ];
      
      return <>
         <AppWrapper username={session.user?.name!} page="courses">
            {(isCourseOwnerRes !== false) ? <>
               <CoursesClientSide courseInfo={isCourseOwnerRes} />
            </> : <>
               <div className="text-c-sm bold-600">
                  You don't have access to any courses <br /> Buy the Fertility Connect Courses to continue
               </div>

               <div className="body-section">
                  <div className="body-section-title">Buy Full Course</div>
                  <div className="wrap-section-content">
                     <div className="sta course-card">
                        <div className="image"><img src="./assets/course.png" alt="course image" /></div>
                        <div className="name">Full Fertility Connect Course</div>
                        <Link href={buyFullCourseLink}><button>Buy $100.00</button></Link>
                     </div>
                  </div>
               </div><br /><br /><br /><br /><br /><br />

               <div className="body-section">
                  <div className="body-section-title">Buy Each Module</div>
                  <div className="wrap-section-content">
                     {modules.map((moduleName, index) => {
                        return <div className="course-card" key={index}>
                           <div className="image"><img src="./assets/course.png" alt="course image" /></div>
                           <div className="name">{moduleName}</div>
                           <Link href={modulePaymentLinks[index]}><button>Buy {moduleName} $15.00</button></Link>
                        </div>
                     })}
                  </div>
               </div>
            </>}
         </AppWrapper>
      </>
   }
}
