import { authOptions } from '@/lib/authOptions'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation';
import ChangePasswordPageForm from "./form";

export default async function ChangePasswordPage() {
   const session = await getServerSession(authOptions);
   
   if (!session) {
      redirect("/login");
   }

   return <ChangePasswordPageForm />
}
