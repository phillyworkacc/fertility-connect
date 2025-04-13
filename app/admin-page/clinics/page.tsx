import "@/styles/main.css"
import "@/styles/admin.css"
import { authOptions } from '@/lib/authOptions'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation';
import { checkAdminUser } from "@/app/actions/user"; 
import ClinicsRequestsClientPage from "./client-side";

export default async function AccountPage() {
   const session = await getServerSession(authOptions);
   
   if (!session) {
      redirect("/login");
   }

   const isUserAdmin = await checkAdminUser();
   if (!isUserAdmin) {
      redirect("/home");
   }

   return <ClinicsRequestsClientPage />
}
