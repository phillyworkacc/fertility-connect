import { authOptions } from '@/lib/authOptions'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation';
import FertilityTipsClient from './client-side';

export default async function FertilityTipsPage() {
   const session = await getServerSession(authOptions);
   
   if (!session) {
      redirect("/login");
   }

   return <FertilityTipsClient />
}
