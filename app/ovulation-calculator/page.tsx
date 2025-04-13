import { authOptions } from '@/lib/authOptions'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation';
import OvulationCalculatorForm from './ovulation-calculator';

export default async function AccountPage() {
   const session = await getServerSession(authOptions);
   
   if (!session) {
      redirect("/login");
   }

   return <OvulationCalculatorForm />;
}
