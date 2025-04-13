import SignUpForm from "./form"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/authOptions";
import { mainUserHomeUrl } from "@/utils/constants";

export default async function SignUpPage() {
   const session = await getServerSession(authOptions);

   if (session) {
      redirect(mainUserHomeUrl);
   }

   return <SignUpForm />;
}