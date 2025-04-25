import "@/styles/main.css"
import "@/styles/cer.css"
import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { getCurrentUser } from "../actions/user";
import { signOut } from "next-auth/react";
import AppWrapper from "@/components/app-wrapper/app-wrapper";
import BackToHome from '@/components/back-to-home/back-to-home';

export default async function CommonEmotionalReactionsPage() {
   const modules: CourseModules[] = ["Module 1", "Module 2", "Module 3", "Module 4", "Module 5"];
   
   const session = await getServerSession(authOptions);
   if (!session) {
      redirect("/login");
   }

   const current_user = await getCurrentUser(session.user?.email!);
   if (!current_user) {
      signOut();
   } else {
      return <>
         <AppWrapper username={session.user?.name!}>
            <div className="cer">
               <BackToHome /><br />
               <div className="text-c-xl bold-600">4 Common Emotional Reactions to 2 weeks wait after IVF Procedure You Need to Avoid</div><br />
               <div className="images">
                  <img src="./assets/common-emotional-reactions-imgs/img1.jpg" />
                  <img src="./assets/common-emotional-reactions-imgs/img2.jpg" />
                  <img src="./assets/common-emotional-reactions-imgs/img3.jpg" />
                  <img src="./assets/common-emotional-reactions-imgs/img4.jpg" />
                  <img src="./assets/common-emotional-reactions-imgs/img5.jpg" />
                  <img src="./assets/common-emotional-reactions-imgs/img6.jpg" />
               </div>
            </div>
         </AppWrapper>
      </>
   }
}

