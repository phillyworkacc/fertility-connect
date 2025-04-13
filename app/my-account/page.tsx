import { authOptions } from '@/lib/authOptions'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation';
import AccountPageClient from "./client-side";
import { checkAdminUser } from '../actions/user';

export default async function AccountPage() {
   const session = await getServerSession(authOptions);
   
   if (!session) {
      redirect("/login");
   }

   const isUserAdmin = await checkAdminUser();

   return <AccountPageClient isAdmin={isUserAdmin} />
}
