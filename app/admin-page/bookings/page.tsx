import "@/styles/main.css"
import "@/styles/admin.css"
import { authOptions } from '@/lib/authOptions'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation';
import { checkAdminUser } from "@/app/actions/user"; 
import BookingsClientPage from "./client-side";
import { BookingDB } from "@/db/booking";

export default async function AccountPage() {
   const session = await getServerSession(authOptions);
   
   if (!session) {
      redirect("/login");
   }

   const isUserAdmin = await checkAdminUser();
   if (!isUserAdmin) {
      redirect("/home");
   }

   const pendingBookings = await BookingDB.getAllPendingBookings();
   const completedBookings = await BookingDB.getAllCompletedBookings();
   const cancelledBookings = await BookingDB.getAllCancelledBookings();

   return <BookingsClientPage
      pendingBookings={pendingBookings}
      completedBookings={completedBookings}
      cancelledBookings={cancelledBookings}
   />
}
