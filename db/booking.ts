import { db } from "@/db";
import { bookingsTable } from "@/db/schemas";
import { eq, and } from "drizzle-orm";
import { uuid } from "@/lib/uui";

export const BookingDB = {
   getBookingInfo: async (bookingId: string): Promise<Booking | false> => {
      const res = await db
         .select()
         .from(bookingsTable)
         .where(eq(bookingsTable.booking_id, bookingId))
         .limit(1);

      return res.length > 0 ? res[0] as any : false;
   },

   getAllBookings: async (): Promise<Booking[]> => {
      return (await db.select().from(bookingsTable)) as any[];
   },

   getAllPendingBookings: async (): Promise<Booking[]> => {
      return (await db
         .select()
         .from(bookingsTable)
         .where(eq(bookingsTable.status, "pending"))) as any[];
   },

   getAllCompletedBookings: async (): Promise<Booking[]> => {
      return (await db
         .select()
         .from(bookingsTable)
         .where(eq(bookingsTable.status, "completed"))) as any[];
   },

   getAllCancelledBookings: async (): Promise<Booking[]> => {
      return (await db
         .select()
         .from(bookingsTable)
         .where(eq(bookingsTable.status, "cancelled"))) as any[];
   },

   getAllUserBookings: async (userid: string): Promise<Booking[]> => {
      return (await db
         .select()
         .from(bookingsTable)
         .where(eq(bookingsTable.user_id, userid))) as any[];
   },

   makeBooking: async (params: AddBookingParams) => {
      const { user_id, date_booked, time_booked, created_at } = params;

      const res = await db
         .insert(bookingsTable)
         .values({
            booking_id: uuid.bookingid(),
            user_id,
            date_booked,
            time_booked,
            status: "pending",
            created_at
         })
         .returning();

      return res.length === 1;
   },

   cancelBooking: async (bookingId: string, userId: string) => {
      const res = await db
         .update(bookingsTable)
         .set({ status: "cancelled" })
         .where(
            and(
               eq(bookingsTable.booking_id, bookingId),
               eq(bookingsTable.user_id, userId)
            )
         )
         .returning();

      return res.length === 1;
   },

   completeBooking: async (bookingId: string, userId: string) => {
      const res = await db
         .update(bookingsTable)
         .set({ status: "completed" })
         .where(
            and(
               eq(bookingsTable.booking_id, bookingId),
               eq(bookingsTable.user_id, userId)
            )
         )
         .returning();

      return res.length === 1;
   },

   checkBookingExists: async (
      params: Omit<AddBookingParams, "user_id" | "created_at">
   ) => {
      const res = await db
         .select()
         .from(bookingsTable)
         .where(
            and(
               eq(bookingsTable.date_booked, params.date_booked),
               eq(bookingsTable.time_booked, params.time_booked),
               eq(bookingsTable.status, "pending")
            )
         )
         .limit(1);

      return res.length > 0;
   }
};