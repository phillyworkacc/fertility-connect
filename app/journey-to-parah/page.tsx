"use client"
import { useEffect, useState } from 'react'
import "@/styles/landingpage.css"
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { buyEbookPayment, verifyPayment } from '../actions/payments';
import { useRouter } from 'next/navigation';
import { getFluttterwaveSearchParams } from '@/utils/getFlutterwaveSearchParams';
import { sendJourneyToParahEbookEmail } from '../actions/user';

export default function JourneyToParahEBook() {
	const { data: session } = useSession();
   const [email, setEmail] = useState(session?.user?.email || "");
   const [name, setName] = useState(session?.user?.name || "");
   const [error, setError] = useState({ status: false, text: "" });
   const [paidForBook, setPaidForBook] = useState(undefined as boolean | undefined | "loading");
   const router = useRouter();


   const buyButton = async () => {
      const result = await buyEbookPayment({ name, email });
      if (result !== "Missing fields" && result !== "Payment failed") {
         router.push(result);
      } else {
         setError({ status: true, text: result });
      }
   }

   const verifyPaymentEBook = async (status: string, transactionId: string, txRef: string) => {
      if (status == undefined || transactionId == undefined || txRef == undefined) return false;
      if (status !== "successful") return false;
      setPaidForBook("loading");
      let result = await verifyPayment(transactionId);
      if (result) {
         let sentEmail = await sendJourneyToParahEbookEmail(transactionId);
         if (typeof sentEmail == "string") {
            setPaidForBook(false);
            setError({ status: true, text: sentEmail })
         } else {
            setPaidForBook((result && sentEmail));
         }
      }
   }

   useEffect(() => {
      const { status, transactionId, txRef } = getFluttterwaveSearchParams(window);
      if (status !== "" && transactionId !== "" && txRef !== "") {
         verifyPaymentEBook(status, transactionId, txRef);
      }
   }, []);
   
   return (
		<div className="landing-page">
			<header className="landing">
				<div className="page-container-landing">
					<div className="logo">
						<img src="./logo.landing.png" alt="logo" />
					</div>
					<div className="actions">
						{session ? <>
							<Link href='/my-account'><div className="user-name">{session.user?.name?.substring(0,1)}</div></Link>
						</> : <>
							<Link href='/signup'><button>Sign Up !</button></Link>
						</>}
					</div>
				</div>
			</header>

			<main className="content">

            {(paidForBook == undefined) ? <></> : <>
               <section className="e-book-payment-info">
                  <div className="page-container">
                     {(paidForBook == "loading") ? <>
                        <div className="success-payment">
                           <div className="text-c-l bold-600">Processing Payment...</div>
                           <div className="text-c-sm">{session?.user?.name}, please be patient this will take a moment</div>
                        </div>
                     </> : <></>}

                     {(paidForBook == true) ? <>
                        <div className="success-payment">
                           <div className="text-c-l bold-600 success">Payment Successfull</div>
                           <div className="text-c-sm">{session?.user?.name}, your payment for the Journey To Parah E-Book was successful, you should receive an email with the book shortly.</div>
                        </div>
                     </> : <></>}

                     {(paidForBook == false) ? <>
                        <div className="failed-payment">
                           <div className="text-c-l bold-600 error">Payment Failed</div>
                           <div className="text-c-sm">{session?.user?.name}, your payment for the Journey To Parah E-Book failed.</div>
                           <div className="text-c-sm">{error.text}</div>
                        </div>
                     </> : <></>}
                  </div>
               </section>
            </>}

            <section className="e-book">
               <div className="page-container">
                  <div className="content">
                     <div className="e-book-container">
                        <div className="image">
                           <img src="./assets/ebook-cover-image.jpg" alt="e book image" />
                        </div>
                        <div className="details">
                           <div className="text-c-xl bold-600 name">Journey To Parah</div>
                           <div className="text-c-sm type">E Book</div>
                           <div className="text-c-l bold-700 price">$5.00</div><br />

                           {(error.status) ? <div className='error text-c-sm bold-600'>{error.text}</div> : <></>}
                           {(session?.user?.email) ? <>
                              <button onClick={buyButton}>Buy Now</button>
                           </>: <>
                              <button onClick={() => signUp()}>Sign Up to Buy eBook</button>
                           </>}

                        </div>
                     </div>
                  </div>
               </div>
            </section>
         </main>

      </div>
   )
}
