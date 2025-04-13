import { redirect } from 'next/navigation';
import { verifyPayment } from '../actions/payments';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import { getCurrentUser, sendPurchasedFullCourseEmail } from '../actions/user';
import CustomPage from '@/components/custom-page/custom-page';
import { CourseOwnersDB } from '@/db/course_owners';

export default async function ValidateSubscriptionPage ({ searchParams }: { searchParams: any }) {
   const transactionId = searchParams.transaction_id;
   const verifySubscription = await verifyPayment(transactionId);
   if (verifySubscription) {
      const session = await getServerSession(authOptions);
      if (!session) return <CustomPage str="User does not exist" />;
      if (!session.user) return <CustomPage str="User does not exist" />;

      const user = await getCurrentUser(session.user.email!);
      if (user == false) return <CustomPage str="User does not exist" />;

      const modules: CourseModules[] = ["Module 1", "Module 2", "Module 3", "Module 4", "Module 5"];
      const addUserToCourseOwners = await CourseOwnersDB.addCourseOwner(user.userid, modules.join(","), `${Date.now()}`);
      if (addUserToCourseOwners) {
         let sendMail = await sendPurchasedFullCourseEmail();
         if (sendMail) {
            redirect("/courses");
         } else {
            return <CustomPage str={`Failed to send mail to ${user.email} but user has been given the full Fertility Connect Course`} />;
         }
      } else {
         return <CustomPage str={`Failed to give ${user.username} the full Fertility Connect Course`} />;
      }
   }
}
