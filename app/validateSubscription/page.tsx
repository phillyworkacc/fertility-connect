import { redirect } from 'next/navigation';
import { verifyPayment } from '../actions/payments';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import { getCurrentUser, sendSubscribedUserEmail } from '../actions/user';
import { UserDB } from '@/db/user';
import CustomPage from '@/components/custom-page/custom-page';

export default async function ValidateSubscriptionPage ({ searchParams }: { searchParams: any }) {
   const transactionId = searchParams.transaction_id;
   const verifySubscription = await verifyPayment(transactionId);
   if (verifySubscription) {
      const session = await getServerSession(authOptions);
      if (!session) return <CustomPage str="User does not exist" />;
      if (!session.user) return <CustomPage str="User does not exist" />;

      const user = await getCurrentUser(session.user.email!);
      if (user == false) return <CustomPage str="User does not exist" />;

      const makeSubscribed = await UserDB.subscribeUser(user.userid);
      if (makeSubscribed) {
         let sendMail = await sendSubscribedUserEmail();
         if (sendMail) {
            redirect("/home");
         } else {
            return <CustomPage str={`Failed to send mail to ${user.email} but user has been subscribed`} />;
         }
      } else {
         return <CustomPage str={`Failed to subscribe ${user.username}`} />;
      }
   }
}
