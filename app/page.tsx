"use client"
import "@/styles/landingpage.css"
import Link from "next/link";
import { BookText, Facebook, Instagram } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { subscribeToFertilityConnect, subscribeToFertilityConnectFullCourse, subscribeToRegisterClinic } from "./actions/payments";
import { useEffect, useState } from "react";
import { checkSubscribed, getCurrentUser } from "./actions/user";

export default function Home() {
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
		const result = await subscribeToFertilityConnect();
		if (result !== "Payment failed") {
			router.push(result);
		} else {
			alert(result);
		}
	}

	useEffect(() => { checkUserIsSubscribed(); }, [])
	
	const subscribeToFCCourseBtn = async () => {
		const result = await subscribeToFertilityConnectFullCourse();
		if (result !== "Payment failed") {
			router.push(result);
		} else {
			alert(result);
		}
	}

	const registerFertilityInstitution = async () => {
		const result = await subscribeToRegisterClinic();
		if (result !== "Payment failed") {
			router.push(result);
		} else {
			alert(result);
		}
	}

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
				<section className="hero-section">
					<div className="page-container-landing">
						<div className="left-side">
							<div className="hero-image">
								<img src="./assets/hero-image.jpg" alt="hero image" />
								<div className="text-c-l bold-800">'Dayo Odukoya FCA</div>
							</div>
						</div>
						<div className="right-side">
							<div className="main-text text-c-b bold-800">Empowering Your Fertility Journey</div>
							<div className="secondary-text text-c-m">Track your cycle, understand your body, and take control of your fertility journey with consultations from experts.</div><br />
							<div className="cta">
								<Link href={session ? '/home' : '/signup'}><button>Get Started</button></Link>
							</div>
						</div>
					</div>
				</section>

				<section className="about-us">
					<div className="page-container-landing">
						<div className="section-title text-c-xxl bold-800">About Us</div>
						<div className="content text-c-sm">
							<span>
								FertilityConnect is a fertility counseling consulting service that provides support to families before, during, and after their fertility journey. The services are provided by Certified Holistic Fertility Counselors who have prerequisite experience having had the same challenge and have the pedigree to support couples throughout the journey by providing emotional, psychological, and faith-based support.
							</span><br />
							<span>
								Infertility is a major challenge affecting 1 in 5 newly married couples and unfortunately many are either ignorant or confuse about what to do and the few who visit the hospitals do so very late, hence the need to have right and timely counsel, guidance and support throughout the journey.
							</span><br />
							<span>
								Fertility Connect was established by Princess Dayo Odukoya FCA, out of her personal experience and training on counseling, especially to couples who have fertility challenges. She is the Visioner and Vice President, Board of Trustees of Parah Family Foundation, a Non-for-Profit Organisation. The vision was birthed after her family's 8 years of infertility out of passion and a divine mandate to support families undergoing infertility challenges.
							</span><br />
							<span>
								She has authored a book titled "Journey to Parah," where she shared her personal experiences and those of others with various options available to tackle infertility. She is happily married, a great mother, and a homemaker.
							</span><br />
						</div>
					</div>
				</section>

				<section className="register-fertility">
					<div className="page-container-landing">
						<div className="section-title text-c-xxl bold-800">Register Fertility Institutions on The Fertility Connect app</div>
						<div className="content text-c-sm dfbc text-center">
							<span>
								You could be a fertility clinic, fertility expert, diagonistic laboratory, or other fertility related institution.
							</span>
							<b>Click below to register for $100</b><br />
							<button onClick={registerFertilityInstitution}>Register your Fertility Institution</button>
						</div>
					</div>
				</section>

				<section className="e-book">
					<div className="page-container-landing">
						<div className="section-title text-c-xxl bold-800">Purchase our E-Book</div>
						<div className="content">
							<div className="e-book-container">
								<div className="image">
									<img src="./assets/ebook-cover-image.jpg" alt="e book image" />
								</div>
								<div className="details">
									<div className="text-c-xl bold-600 name">Journey To Parah</div>
									<div className="text-c-sm type">E Book</div>
									<div className="text-c-l bold-700 price">$5.00</div><br />
									<button onClick={() => router.push("/journey-to-parah")}>View E-Book</button>
								</div>
							</div>
						</div>
					</div>
				</section>

				<section className="features">
					<div className="page-container-landing">
						<div className="section-title text-c-xxl bold-800">Main Features</div>
						<div className="feature-list">
							<div className="feature">
								<div className="image">
									<img src="./assets/bmi-calc.png" alt="" />
								</div>
								<div className="name text-c-m bold-600">BMI Calculator</div>
								<div className="info text-c-s">Easily calculate your Body Mass Index (BMI) to understand your weight category and its impact on fertility health. Get instant insights and personalized recommendations.</div>
							</div>

							<div className="feature">
								<div className="image">
									<img src="./assets/ovulation-calc.png" alt="" />
								</div>
								<div className="name text-c-m bold-600">Ovulation Calculator</div>
								<div className="info text-c-s">Track your cycle and predict your most fertile days with accuracy. Use our ovulation calculator to optimize your chances of conception and better understand your reproductive health.</div>
							</div>

							<div className="feature">
								<div className="image">
									<img src="./assets/booking.png" alt="" />
								</div>
								<div className="name text-c-m bold-600">Booking Consultations</div>
								<div className="info text-c-s">Connect with fertility experts for personalized guidance. Schedule consultations with specialists to discuss your fertility journey, ask questions, and explore tailored solutions.</div>
							</div>
						</div>
					</div>
				</section>

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
									<div className="price text-c-xxl">$50</div>
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
							</div>

							<div className="pricing-tier">
								<div className="pricing-tier-container">
									<div className="name text-c-s">Courses</div>
									<div className="price text-c-xxl">$100</div>
									<span className="text-c-m">Features</span>
									<ul className="text-c-s">
										<li>Access courses on fertility</li>
									</ul>
								</div>
								<button onClick={subscribeToFCCourseBtn}>Subscribe</button>
							</div>
						</div>
					</div>
				</section>
				<br /><br /><br />
			</main>
			<footer>
				<div className="page-container-landing">
					<div>
						<div className="text-c-xl bold-700">Contact Us (WhatsApp ONLY)</div>
						<div className="text-c-m">+234 8077 590836</div>
						<div className="text-c-m">+234 8023 128366</div>

						<br /><br />
						<Link href='https://www.instagram.com/thefertilityconnect' target="_blank">
							<div className="text-c-m" style={{
								display: "flex",
								alignItems: "center",
								gap: "8px"
							}}><Instagram /> Instagram</div>
						</Link><br />
						<Link href='https://www.facebook.com/share/1ASC1rQprB/' target="_blank">
							<div className="text-c-m" style={{
								display: "flex",
								alignItems: "center",
								gap: "8px"
							}}><Facebook /> Facebook</div>
						</Link><br />
						<Link href='/contact-form' target="_blank">
							<div className="text-c-m" style={{
								display: "flex",
								alignItems: "center",
								gap: "8px"
							}}><BookText /> Contact Us</div>
						</Link>
					</div><br /><br />
					<div className="text-c-m">&copy; {new Date().getFullYear()} Fertility Connect. All rights reserved.</div>
				</div>
			</footer>
		</div>
	)
}
