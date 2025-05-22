"use client"
import "@/styles/landingpage.css"
import Link from "next/link";
import { BookText, Facebook, Instagram, Phone } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { subscribeToRegisterClinic } from "./actions/payments";
import { useEffect, useState } from "react";
import { checkSubscribed, getCurrentUser } from "./actions/user";
import TiktokIcon from "@/components/tiktok/tiktok";

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

	useEffect(() => { checkUserIsSubscribed(); }, [])

	const registerFertilityInstitution = async () => {
		const result = await subscribeToRegisterClinic();
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
					<div className="logo" onClick={() => router.push("/")}>
						<img src="./landing.logo.png" alt="logo" />
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
								{(userIsSubscribed == "not-subbed") && <button onClick={() => router.push('/pricing')}>Subscribe</button>}
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
								<button onClick={() => router.push('/pricing')}>Subscribe</button>
							</div>
						</div>
					</div>
				</section>
				
				<section className="register-fertility">
					<div className="page-container-landing">
						<div className="section-title text-c-xxl bold-800">Register Fertility Centers on The Fertility Connect app</div>
						<div className="content text-c-sm dfbc text-center">
							<span>
								You could be a fertility clinic, fertility expert, diagonistic laboratory, or other fertility related centers.
							</span>
							<b>Click below to register for $100 / ₦150000</b><br />
							<button onClick={registerFertilityInstitution}>Register your Fertility Center</button>
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
									<div className="text-c-l bold-700 price">$5.00 / ₦7500</div><br />
									<button onClick={() => router.push("/journey-to-parah")}>View E-Book</button>
								</div>
							</div>
						</div>
					</div>
				</section>
				<br /><br /><br />
			</main>

			<footer>
				<div className="page-container-landing">
					<div>
						<div className="footer">
							<div className="footer-section">
								<div className="footer-section-title">Contact Us</div>
								<div className="footer-section-content">
									<div className="text-c-sm dfb"><Phone /> +234 8077 590836</div>
									<div className="text-c-sm dfb"><Phone /> +234 8023 128366 (WhatsApp ONLY)</div>
									<div className="socials-content">
										<div className="name">@thefertilityconnect</div>
										<Link href='https://www.instagram.com/thefertilityconnect' target="_blank">
											<div className="text-c-sm" style={{
												display: "flex",
												alignItems: "center",
												gap: "8px"
											}}><Instagram /></div>
										</Link>
										<Link href='https://www.facebook.com/share/1ASC1rQprB/' target="_blank">
											<div className="text-c-sm" style={{
												display: "flex",
												alignItems: "center",
												gap: "8px"
											}}><Facebook /></div>
										</Link>
										<Link href='https://www.tiktok.com/@thefertilityconnect' target="_blank">
											<div className="text-c-sm" style={{
												display: "flex",
												alignItems: "center",
												gap: "8px"
											}}><TiktokIcon color="#fff" /></div>
										</Link>
									</div>
								</div>
							</div>
							
							<div className="footer-section">
								<div className="footer-section-title">Others</div>
								<div className="footer-section-content">
									<Link href='/terms-and-conditions' target="_blank">
										<div className="text-c-s" style={{
											display: "flex",
											alignItems: "center",
											gap: "8px"
										}}>Terms and Conditions</div>
									</Link>
									<Link href='/privacy-policy' target="_blank">
										<div className="text-c-s" style={{
											display: "flex",
											alignItems: "center",
											gap: "8px"
										}}>Privacy Policy</div>
									</Link>
									<Link href='/contact-form' target="_blank">
										<div className="text-c-s" style={{
											display: "flex",
											alignItems: "center",
											gap: "8px"
										}}><BookText size={20} /> Contact Us Form</div>
									</Link>
								</div>
							</div>

						</div>
					</div><br /><br />
					<div className="text-c-m">&copy; {new Date().getFullYear()} Fertility Connect. All rights reserved.</div>
				</div>
			</footer>
		</div>
	)
}
