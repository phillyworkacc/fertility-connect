"use client"
import "@/styles/landingpage.css"
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { subscribeToFertilityConnect, subscribeToFertilityConnectFullCourse } from "@/app/actions/payments";
import { useEffect, useState } from "react";
import { checkSubscribed, getCurrentUser } from "@/app/actions/user";

export default function PricingPage() {
   const { data: session } = useSession();
	const router = useRouter();
	const [userIsSubscribed, setUserIsSubscribed] = useState(false as "subbed" | "not-subbed" | false);

	const checkUserIsSubscribed = async () => {
		const user = await getCurrentUser(session?.user?.email!);
		if (user == false) { setUserIsSubscribed("not-subbed"); return; }
		const isSubscribed = await checkSubscribed(user.userid);
		setUserIsSubscribed(isSubscribed ? "subbed" : "not-subbed");
	}

	const subscribeToFCBtn = async () => {
		const result = await subscribeToFertilityConnect('/');
		if (result !== "Payment failed" && result !== "User does not exist") {
			router.push(result);
		} else if (result == "User does not exist") {
			router.push('/signup')
		} else {
			alert(result);
		}
	}

	useEffect(() => { checkUserIsSubscribed(); }, [])

   const subscribeToFCCourseBtn = async () => {
		const result = await subscribeToFertilityConnectFullCourse();
		if (result !== "Payment failed" && result !== "User does not exist") {
			router.push(result);
		} else if (result == "User does not exist") {
			router.push('/signup')
		} else {
			alert(result);
		}
	}

   return (
		<div className="landing-page">
         <header className="landing">
				<div className="page-container-landing">
               <div className="pricing-page-logo" onClick={() => router.push("/")}>
                  <img src="./logo.landing.png" alt="logo" />
               </div>
            </div>
         </header>
         <main className="content">
            <section className="pricing">
					<div className="page-container-landing">
						<div className="section-title text-c-xxl bold-800">Pricing</div>
						<div className="pricing-tiers">
							<div className="pricing-tier">
								<div className="pricing-tier-container">
									<div className="name text-c-s">Free</div>
									<div className="price text-c-xxl">$0</div>
									<span className="text-c-m">Features</span>
									<ul className="text-c-s">
										<li>BMI Calculator</li>
										<li>Ovulation Calculator</li>
									</ul>
								</div>
							</div>

							<div className="pricing-tier">
								<div className="pricing-tier-container">
									<div className="name text-c-s">Full App Access</div>
									<div className="price text-c-xxl">$25 / ₦37500</div>
									<span className="text-c-m">Features</span>
									<ul className="text-c-s">
										<li>Booking Calendar</li>
										<li>Book consultations</li>
										<li>Fertility Tips</li>
										<li>Lifestyle Tips</li>
										<li>Diet Tips</li>
									</ul>
								</div>
								{(userIsSubscribed == "not-subbed") && <button onClick={subscribeToFCBtn}>Subscribe</button>}
								{(userIsSubscribed == "subbed") && <button onClick={() => router.push('/home')}>Go to Home</button>}
								{(!userIsSubscribed) && <button disabled>Loading...</button>}
							</div>

							<div className="pricing-tier">
								<div className="pricing-tier-container">
									<div className="name text-c-s">Fertility Roadmaps</div>
									<div className="price text-c-xxl">$25 / ₦37500</div>
									<span className="text-c-m">Features</span>
									<ul className="text-c-s">
										<li>From conception to parenthood</li>
									</ul>
								</div>
								<button onClick={subscribeToFCCourseBtn}>Subscribe</button>
							</div>
						</div>
					</div>
            </section>
         </main>
      </div>
   )
}
