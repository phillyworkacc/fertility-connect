import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { mainUserHomeUrl } from "@/utils/constants";
import ForgotPasswordForm from "./form";

export default async function LoginPage() {
   const session = await getServerSession(authOptions);

   if (session) {
      redirect(mainUserHomeUrl);
   }

   return <ForgotPasswordForm />
}
