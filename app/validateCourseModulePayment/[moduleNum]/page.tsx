import { redirect } from 'next/navigation';
import { verifyPayment } from '../../actions/payments';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import { getCurrentUser, sendPurchasedFullCourseEmail } from '../../actions/user';
import CustomPage from '@/components/custom-page/custom-page';
import { CourseOwnersDB } from '@/db/course_owners';

interface PageParamsProps {
   moduleNum: string;
}

export default async function ValidateCourseModulePage ({ searchParams, params }: { searchParams: any, params: Promise<PageParamsProps> }) {
   const { moduleNum } = await params;

   const transactionId = searchParams.transaction_id;
   const verifySubscription = await verifyPayment(transactionId);

   if (verifySubscription) {
      const session = await getServerSession(authOptions);
      if (!session) return <CustomPage str="User does not exist" />;
      if (!session.user) return <CustomPage str="User does not exist" />;

      const user = await getCurrentUser(session.user.email!);
      if (user == false) return <CustomPage str="User does not exist" />;

      const moduleName = `Module ${moduleNum}`;
      const userCourse = await CourseOwnersDB.checkCourse(user.userid);
      let updatedCourseOwners = false;

      if (userCourse == false) {
         updatedCourseOwners = await CourseOwnersDB.addCourseOwner(user.userid, moduleName, `${Date.now()}`);
      } else {
         const modules = [ ...userCourse.modules.split(","), moduleName ];
         modules.sort();
         updatedCourseOwners = await CourseOwnersDB.updateCourseOwner(user.userid, modules.join(","));
      }

      if (updatedCourseOwners) {
         let sendMail = await sendPurchasedFullCourseEmail();
         if (sendMail) {
            redirect("/courses");
         } else {
            return <CustomPage str={`Failed to send mail to ${user.email} but user has been given ${moduleName} of the Fertility Connect Course`} />;
         }
      } else {
         return <CustomPage str={`Failed to give ${user.username} ${moduleName} of the full Fertility Connect Course`} />;
      }
   }
}
