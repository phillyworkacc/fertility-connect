import { uuid } from "@/lib/uui";
import { pool } from "./db";

export const BookingDB = {
   getBookingInfo: async (bookingId: string): Promise<Booking | false> => {
     const res = await pool.query(
       "SELECT * FROM bookings WHERE booking_id = $1",
       [bookingId]
     );
     return res.rows.length > 0 ? res.rows[0] : false;
   },
 
   getAllBookings: async () => {
     const res = await pool.query("SELECT * FROM bookings");
     return res.rows as Booking[];
   },
 
   getAllPendingBookings: async () => {
     const res = await pool.query(
       "SELECT * FROM bookings WHERE status = $1",
       ["pending"]
     );
     return res.rows as Booking[];
   },
 
   getAllCompletedBookings: async () => {
     const res = await pool.query(
       "SELECT * FROM bookings WHERE status = $1",
       ["completed"]
     );
     return res.rows as Booking[];
   },
 
   getAllCancelledBookings: async () => {
     const res = await pool.query(
       "SELECT * FROM bookings WHERE status = $1",
       ["cancelled"]
     );
     return res.rows as Booking[];
   },
 
   getAllUserBookings: async (userid: string) => {
     const res = await pool.query(
       "SELECT * FROM bookings WHERE user_id = $1",
       [userid]
     );
     return res.rows as Booking[];
   },
 
   makeBooking: async (addBookingParams: AddBookingParams) => {
     let { user_id, date_booked, time_booked, created_at } = addBookingParams;
     let bookingId = uuid.bookingid();
     let bookingStatus: BookingStatus = "pending";
     const res = await pool.query(
       "INSERT INTO bookings (booking_id, user_id, date_booked, time_booked, status, created_at) VALUES ($1, $2, $3, $4, $5, $6)",
       [bookingId, user_id, date_booked, time_booked, bookingStatus, created_at]
     );
     return res.rowCount === 1;
   },
 
   cancelBooking: async (bookingId: string, userId: string) => {
     const res = await pool.query(
       "UPDATE bookings SET status = $1 WHERE booking_id = $2 AND user_id = $3",
       ["cancelled", bookingId, userId]
     );
     return res.rowCount === 1;
   },
 
   completeBooking: async (bookingId: string, userId: string) => {
     const res = await pool.query(
       "UPDATE bookings SET status = $1 WHERE booking_id = $2 AND user_id = $3",
       ["completed", bookingId, userId]
     );
     return res.rowCount === 1;
   },
 
   checkBookingExists: async (params: Omit<AddBookingParams, "user_id" | "created_at">) => {
     const res = await pool.query(
       "SELECT * FROM bookings WHERE date_booked = $1 AND time_booked = $2 AND status = $3",
       [params.date_booked, params.time_booked, "pending"]
     );
     return res.rows.length > 0;
   }
 };
 