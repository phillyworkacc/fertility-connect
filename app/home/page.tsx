import "@/styles/main.css"
import Link from "next/link";
import AppWrapper from "@/components/app-wrapper/app-wrapper";
import { authOptions } from "@/lib/authOptions";
import { ArrowRight } from "lucide-react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import isSubscribed from "@/utils/checkSubscription";
import { getCurrentUser } from "../actions/user";
import { subscribeToFertilityConnect } from "../actions/payments";

export default async function Home() {
	const session = await getServerSession(authOptions);
	if (!session) {
		redirect("/login");
	}
	const user = await getCurrentUser(session.user?.email!);
	if (user == false) {
		redirect("/login");
	}
	const isUserSubscribed = await isSubscribed(user.subscribed);
	let subscriptionPaymentLink = "";
	if (!isUserSubscribed) {
		subscriptionPaymentLink = await subscribeToFertilityConnect();
	}

	return (
		<AppWrapper username={session?.user?.name || 'No Session'} page="home">
			<div className="body-section">
				<div className="body-section-title">My Tools</div>
				<div className="body-section-content">
					<Link href='/bmi-calculator'>
						<div className="body-section-content-card">
							<div className="image"><img src="./assets/bmi-calc.png" alt="card-image" /></div>
							<div className="name">BMI Calculator</div>
							<div className="open-arrow-i"><ArrowRight /></div>
						</div>
					</Link>
					<Link href='/ovulation-calculator'>
						<div className="body-section-content-card">
							<div className="image"><img src="./assets/ovulation-calc.png" alt="card-image" /></div>
							<div className="name">Ovulation Calculator</div>
							<div className="open-arrow-i"><ArrowRight /></div>
						</div>
					</Link>
				</div>
			</div>
			
			{(isUserSubscribed) ? <>
				<div className="body-section">
					<div className="body-section-title">Everyday Tips</div>
					<div className="body-section-content">
						<Link href='/fertility-tips'>							
							<div className="body-section-content-card">
								<div className="image"><img src="./assets/fertility-tips.png" alt="card-image" /></div>
								<div className="name">Fertility Tips</div>
								<div className="open-arrow-i"><ArrowRight /></div>
							</div>
						</Link>
						<Link href='/lifestyle-tips'>
							<div className="body-section-content-card">
								<div className="image"><img src="./assets/lifestyle-tips.png" alt="card-image" /></div>
								<div className="name">Lifestyle Tips</div>
								<div className="open-arrow-i"><ArrowRight /></div>
							</div>
						</Link>
						<Link href='/diet-tips'>
							<div className="body-section-content-card">
								<div className="image"><img src="./assets/diet-tips.png" alt="card-image" /></div>
								<div className="name">Diet Tips</div>
								<div className="open-arrow-i"><ArrowRight /></div>
							</div>
						</Link>
						<Link href='/common-emotional-reactions'>
							<div className="body-section-content-card">
								<div className="image"><img src="./assets/common-emotional-reactions-imgs/img1.jpg" alt="card-image" /></div>
								<div className="name">Fertility Carousel</div>
								<div className="open-arrow-i"><ArrowRight /></div>
							</div>
						</Link>
					</div>
				</div>
			</> : <></>}
			
			<div className="body-section">
				<div className="body-section-title">More</div>
				<div className="body-section-content">
					<Link href='/journey-to-parah'>
						<div className="body-section-content-card">
							<div className="image"><img src="./assets/ebook-cover-image.jpg" alt="card-image" /></div>
							<div className="name">Journey to Parah EBook</div>
							<div className="open-arrow-i"><ArrowRight /></div>
						</div>
					</Link>
					<Link href='/fertility-clinics'>
						<div className="body-section-content-card">
							<div className="image"><img src="./assets/clinic-logo.png" alt="card-image" /></div>
							<div className="name">Fertility Clinics</div>
							<div className="open-arrow-i"><ArrowRight /></div>
						</div>
					</Link>
				</div>
			</div>

			{(!isUserSubscribed) ? <>
				<div className="text-c-l">Subscribe Now to get exclusive access to fertility tips, diet tips, lifestyle tips and more</div>
				<Link href={subscriptionPaymentLink}><button>Subscribe Now</button></Link>
			</> : <></>}
		</AppWrapper>
	)
}
