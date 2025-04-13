import "@/styles/main.css"
import { authOptions } from '@/lib/authOptions'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation';
import { checkAdminUser } from '../actions/user';
import AdminPageClientPage from "./client-side";

export default async function AccountPage() {
   const session = await getServerSession(authOptions);
   
   if (!session) {
      redirect("/login");
   }

   const isUserAdmin = await checkAdminUser();
   if (!isUserAdmin) {
      redirect("/home");
   }

   return <AdminPageClientPage />
}
