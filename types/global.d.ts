type BMICategory = "Underweight" | "Normal Weight" | "Overweight" | "Obesity Class I" | "Obesity Class II" | "Obesity Class III";
type BMIResults = {
   category: BMICategory,
   bmi: string,
   error: string | undefined
}

type LoginFormData = {
   email: string;
   password: string;
}

type SignUpFormData = {
   name: string;
   email: string;
   password: string;
}

type User = {
   userid: string;
   username: string;
   email: string;
   password: string;
   subscribed: string;
   created_at: string;
}

type DietTip = {
   title: string;
   text: string;
   image?: string;
   pubDate: string;
}

type ClinicType = "Fertility Laboratory" | "Fertility Clinic" | "Fertility Expert" | "Fertility Hospital" | "Other"
type Clinic = {
   clinic_id: string;
   name: string;
   type: ClinicType;
   email: string;
   address: string;
   telephone: string;
   website: string;
   instagram: string;
   facebook: string;
   tiktok: string;
   date_joined: string;
   approved: boolean;
   clinic_code: string;
}

type AddClinicParams = {
   name: string;
   type: ClinicType;
   email: string;
   telephone: string;
   address: string;
   date: string;
   website?: string;
   instagram?: string;
   facebook?: string;
   tiktok?: string;
   clinic_code: string;
}

type BookingStatus = "pending" | "cancelled" | "completed"
type Booking = {
   booking_id: string;
   user_id: string;
   date_booked: string;
   time_booked: string;
   status: BookingStatus;
   created_at: string;
}

type AddBookingParams = {
   user_id: string;
   date_booked: string;
   time_booked: string;
   created_at: string;
}


type CourseModules = "Module 1" | "Module 2" | "Module 3" | "Module 4" | "Module 5"
type Course = {
   userid: string;
   modules: string;
   date: string;
}

type Post = {
   postid: string;
   message: string;
   userid: string;
   date: string;
}

type Reply = {
   postid: string;
   replyid: string;
   message: string;
   userid: string;
   date: string;
}

type CommunityPost = {
   postid: string;
   message: string;
   username: string;
   isSubscribed: boolean;
   date: string;
   replies: CommunityReply[];
}

type CommunityReply = {
   replyid: string;
   message: string;
   username: string;
   isSubscribed: boolean;
   date: string;
}