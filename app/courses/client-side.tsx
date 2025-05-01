"use client"
import "@/styles/booking.css"
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function CoursesClientSide({ courseInfo }: { courseInfo: Course }) {
   const mainModules: CourseModules[] = ["Module 1", "Module 2", "Module 3", "Module 4", "Module 5"];
   let modules: CourseModules[] = courseInfo.modules.split(",") as any[];

   return (<>
      <div className="body-section">
         <div className="body-section-title">Your Course Modules</div>
         <div className="body-section-content">
            {modules.map((moduleName, index) => {
               return <Link href={`/course-${moduleName.toLowerCase().replace(" ", "-")}`} key={index}>
                  <div className="body-section-content-card">
                     <div className="image"><img src="./assets/course.png" alt="course image" /></div>
                     <div className="name">{moduleName}</div>
                     <div className="open-arrow-i"><ArrowRight /></div>
                  </div>
               </Link>
            })}
         </div>
      </div>

      {(mainModules.filter((courseModule) => !modules.includes(courseModule)).length > 0) ? (<>
         <div className="body-section">
            <div className="body-section-title">Buy Other Course Modules</div>
            <div className="wrap-section-content">
               {mainModules.filter((courseModule) => {
                  return !modules.includes(courseModule);
               }).map((moduleName, index) => {
                  return <div className="course-card" key={index}>
                     <div className="image"><img src="./assets/course.png" alt="course image" /></div>
                     <div className="name">{moduleName}</div>
                     <button>Buy {moduleName} $15.00</button>
                  </div>
               })}
            </div>
         </div>
      </>) : (<></>)}

   </>)
}
