'use server';
import { authOptions } from '@/lib/authOptions';
import { appUrl } from '@/utils/constants';
import axios from 'axios';
import { getServerSession } from 'next-auth';
import { getCurrentUser } from './user';

type PaymentProps = {
   name: string;
   email: string;
}

export async function buyEbookPayment({ name, email }: PaymentProps): Promise<string> {
   const amount = 5;
   if (!email || !name) return 'Missing fields';

   console.log("requesting ebook: ", name, email);

   try {
      const response = await axios.post('https://api.flutterwave.com/v3/payments', {
         tx_ref: `TX-${Date.now()}`,
         amount,
         currency: 'USD',
         redirect_url: `${appUrl}/journey-to-parah`,
         customer: { email, name },
         customizations: {
            title: 'Journey to Parah E-Book',
            description: 'One-time payment',
         },
      }, {
         headers: {
            Authorization: `Bearer ${process.env.FLUTTERWAVE_SECRET_KEY}`,
            'Content-Type': 'application/json',
         },
      });

      return response.data.data.link;
   } catch (err: any) {
      console.error("payment error: " + err);
      return 'Payment failed';
   }
}


export async function subscribeToFertilityConnect(): Promise<string> {
   try {
      const amount = 25;
      const session = await getServerSession(authOptions);
      if (!session) return "User does not exist";
      if (!session.user) return "User does not exist";

      const user = await getCurrentUser(session.user.email!);
      if (user == false) return "User does not exist";

      const { email, username: name } = user;

      const response = await axios.post('https://api.flutterwave.com/v3/payments', {
         tx_ref: `TX-${Date.now()}`,
         amount,
         currency: 'USD',
         redirect_url: `${appUrl}/validateSubscription`,
         customer: { email, name },
         customizations: {
            title: 'Subscribe to Fertility Connect',
            description: 'One-time payment',
         },
      }, {
         headers: {
            Authorization: `Bearer ${process.env.FLUTTERWAVE_SECRET_KEY}`,
            'Content-Type': 'application/json',
         },
      });

      return response.data.data.link;
   } catch (err: any) {
      console.error("payment error: " + err);
      return 'Payment failed';
   }
}


export async function subscribeToFertilityConnectFullCourse(): Promise<string> {
   try {
      const amount = 100;
      const session = await getServerSession(authOptions);
      if (!session) return "User does not exist";
      if (!session.user) return "User does not exist";

      const user = await getCurrentUser(session.user.email!);
      if (user == false) return "User does not exist";

      const { email, username: name } = user;

      const response = await axios.post('https://api.flutterwave.com/v3/payments', {
         tx_ref: `TX-${Date.now()}`,
         amount,
         currency: 'USD',
         redirect_url: `${appUrl}/validateFullCoursePayment`,
         customer: { email, name },
         customizations: {
            title: 'Purchase the Fertility Connect Full Course',
            description: 'One-time payment',
         },
      }, {
         headers: {
            Authorization: `Bearer ${process.env.FLUTTERWAVE_SECRET_KEY}`,
            'Content-Type': 'application/json',
         },
      });

      return response.data.data.link;
   } catch (err: any) {
      console.error("payment error: " + err);
      return 'Payment failed';
   }
}


export async function subscribeToFertilityConnectCourseModule(module: number): Promise<string> {
   try {
      const amount = 25;
      const session = await getServerSession(authOptions);
      if (!session) return "User does not exist";
      if (!session.user) return "User does not exist";

      const user = await getCurrentUser(session.user.email!);
      if (user == false) return "User does not exist";

      const { email, username: name } = user;

      const response = await axios.post('https://api.flutterwave.com/v3/payments', {
         tx_ref: `TX-${Date.now()}`,
         amount,
         currency: 'USD',
         redirect_url: `${appUrl}/validateCourseModulePayment/${module}`,
         customer: { email, name },
         customizations: {
            title: 'Purchase the Fertility Connect Module ' + module,
            description: 'One-time payment',
         },
      }, {
         headers: {
            Authorization: `Bearer ${process.env.FLUTTERWAVE_SECRET_KEY}`,
            'Content-Type': 'application/json',
         },
      });

      return response.data.data.link;
   } catch (err: any) {
      console.error("payment error: " + err);
      return 'Payment failed';
   }
}

export async function subscribeToFertilityConnectCourseModule1() {
   return await subscribeToFertilityConnectCourseModule(1);
}
export async function subscribeToFertilityConnectCourseModule2() {
   return await subscribeToFertilityConnectCourseModule(2);
}
export async function subscribeToFertilityConnectCourseModule3() {
   return await subscribeToFertilityConnectCourseModule(3);
}
export async function subscribeToFertilityConnectCourseModule4() {
   return await subscribeToFertilityConnectCourseModule(4);
}
export async function subscribeToFertilityConnectCourseModule5() {
   return await subscribeToFertilityConnectCourseModule(5);
}


export async function verifyPayment (transactionId: string) {
   const response = await axios.get(`https://api.flutterwave.com/v3/transactions/${transactionId}/verify`,
      {
         headers: {
            Authorization: `Bearer ${process.env.FLUTTERWAVE_SECRET_KEY}`,
         },
      }
   );
   return (response.data.data.status === 'successful') ? true : false;
}


export async function subscribeToRegisterClinic (): Promise<string> {
   try {
      const amount = 100;
      const session = await getServerSession(authOptions);
      if (!session) return "User does not exist";
      if (!session.user) return "User does not exist";

      const user = await getCurrentUser(session.user.email!);
      if (user == false) return "User does not exist";

      const { email, username: name } = user;

      const response = await axios.post('https://api.flutterwave.com/v3/payments', {
         tx_ref: `TX-${Date.now()}`,
         amount,
         currency: 'USD',
         redirect_url: `${appUrl}/clinic-form`,
         customer: { email, name },
         customizations: {
            title: 'Register Fertility Institution on The Fertility Connect app',
            description: 'One-time payment',
         },
      }, {
         headers: {
            Authorization: `Bearer ${process.env.FLUTTERWAVE_SECRET_KEY}`,
            'Content-Type': 'application/json',
         },
      });

      return response.data.data.link;
   } catch (err: any) {
      console.error("payment error: " + err);
      return 'Payment failed';
   }
}
