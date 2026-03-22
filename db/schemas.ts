import { boolean, pgTable, serial, text } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
   id: serial("id").primaryKey(),
   userid: text("userid"),
   username: text("username"),
   email: text("email"),
   password: text("password"),
   subscribed: text("subscribed"),
   created_at: text("created_at")
});

export const adminsTable = pgTable("admins", {
   id: serial("id").primaryKey(),
   userid: text("userid")
});

export const clinicsTable = pgTable("clinics", {
   id: serial("id").primaryKey(),
   clinic_id: text("clinic_id"),
   name: text("name"),
   type: text("type"),
   email: text("email"),
   address: text("address"),
   telephone: text("telephone"),
   website: text("website"),
   instagram: text("instagram"),
   facebook: text("facebook"),
   tiktok: text("tiktok"),
   date_joined: text("date_joined"),
   clinic_code: text("clinic_code"),
   approved: boolean("approved")
});

export const courseOwnersTable = pgTable("course_owners", {
   id: serial("id").primaryKey(),
   userid: text("userid"),
   modules: text("modules"),
   date: text("date")
})

export const dietTipsTable = pgTable("diet_tips", {
   id: serial("id").primaryKey(),
   title: text("title"),
   text: text("text"),
   image: text("image"),
   date: text("date")
})

export const fertilityTipsTable = pgTable("fertility_tips", {
   id: serial("id").primaryKey(),
   title: text("title"),
   text: text("text"),
   image: text("image"),
   date: text("date")
})

export const lifestyleTipsTable = pgTable("lifestyle_tips", {
   id: serial("id").primaryKey(),
   title: text("title"),
   text: text("text"),
   image: text("image"),
   date: text("date")
})

export const postsTable = pgTable("posts", {
   id: serial("id").primaryKey(),
   postid: text("postid"),
   userid: text("userid"),
   message: text("message"),
   date: text("date")
});

export const repliesTable = pgTable("replies", {
   id: serial("id").primaryKey(),
   replyid: text("replyid"),
   userid: text("userid"),
   postid: text("postid"),
   message: text("message"),
   date: text("date")
});

export const ebookTable = pgTable("ebook", {
   id: serial("id").primaryKey(),
   userid: text("userid"),
   transactionId: text("transactionId"),
});

export const bookingsTable = pgTable("bookings", {
   id: serial("id").primaryKey(),
   booking_id: text("booking_id"),
   user_id: text("user_id"),
   date_booked: text("date_booked"),
   time_booked: text("time_booked"),
   status: text("status"),
   created_at: text("created_at")
});

export const messagesTable = pgTable("messages", {
   id: serial("id").primaryKey(),
   messageid: text("messageid"),
   to: text("to"),
   from: text("from"),
   message: text("message"),
   date: text("date")
});