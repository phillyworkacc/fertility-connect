import { authOptions } from '@/lib/authOptions'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation';
import OvulationTrackerForm from './ovulation-tracker';
import { getCurrentUser } from '../actions/user';
import isSubscribed from '@/utils/checkSubscription';

export default async function OvulationTrackerPage() {
   const session = await getServerSession(authOptions);
   if (!session) {
      redirect("/login");
   }

   const user = await getCurrentUser(session?.user?.email!);
   if (!user) {
      redirect("/login");
   }
   
   if (!isSubscribed(user.subscribed)) {
      redirect("/home");
   }

   return <OvulationTrackerForm />;
}
