import { uuid } from "@/lib/uui";
import { pool } from "./db";

export const BookingDB = {
   getBookingInfo: async (bookingId: string): Promise<Booking | false> => {
      const [bookings]: any = await pool.query("SELECT * FROM bookings WHERE `booking_id` = ?", [bookingId]);
      bookings as Booking[];
      return bookings.length > 0 ? bookings[0] : false;
   },

   getAllBookings: async () => {
      const [bookings]: any = await pool.query("SELECT * FROM bookings");
      bookings as Booking[];
      return bookings;
   },

   getAllPendingBookings: async () => {
      const [bookings]: any = await pool.query("SELECT * FROM bookings WHERE `status` = ?", ["pending"]);
      bookings as Booking[];
      return bookings;
   },

   getAllCompletedBookings: async () => {
      const [bookings]: any = await pool.query("SELECT * FROM bookings WHERE `status` = ?", ["completed"]);
      bookings as Booking[];
      return bookings;
   },

   getAllCancelledBookings: async () => {
      const [bookings]: any = await pool.query("SELECT * FROM bookings WHERE `status` = ?", ["cancelled"]);
      bookings as Booking[];
      return bookings;
   },

   getAllUserBookings: async (userid: string) => {
      const [bookings]: any = await pool.query("SELECT * FROM bookings WHERE `user_id` = ?", [userid]);
      bookings as Booking[];
      return bookings;
   },

   makeBooking: async (addBookingParams: AddBookingParams) => {
      let { user_id, date_booked, time_booked, created_at } = addBookingParams;
      let bookingId = uuid.bookingid();
      let bookingStatus: BookingStatus = "pending"
      const data: any = await pool.query(
         "INSERT INTO bookings (`booking_id`,`user_id`,`date_booked`,`time_booked`,`status`,`created_at`) VALUES (?, ?, ?, ?, ?, ?)",
         [ bookingId, user_id, date_booked, time_booked, bookingStatus, created_at ]
      );
      return (data[0].affectedRows == 1);
   },

   cancelBooking: async (bookingId: string, userId: string) => {
      const data: any = await pool.query("UPDATE bookings SET `status` = ? WHERE `booking_id` = ? AND `user_id` = ?; ", [ "cancelled", bookingId, userId ]);
      return (data[0].affectedRows == 1 || data[0].changedRows == 1);
   },

   completeBooking: async (bookingId: string, userId: string) => {
      const data: any = await pool.query("UPDATE bookings SET `status` = ? WHERE `booking_id` = ? AND `user_id` = ?; ", [ "completed", bookingId, userId ]);
      return (data[0].affectedRows == 1 || data[0].changedRows == 1);
   },

   checkBookingExists: async (params: Omit<AddBookingParams, "user_id" | "created_at">) => {
      const [data]: any = await pool.query("SELECT * FROM bookings WHERE `date_booked` = ? AND `time_booked` = ? AND `status` = ?; ", [ params.date_booked, params.time_booked, "pending" ]);
      return data.length > 0 ? true : false;
   }
}