import "@/styles/global.css";
import type { Metadata } from "next";
import { MyraidProFont } from "@/font/fonts";
import SessionWrapper from "@/components/session-wrapper/session-wrapper";

export const metadata: Metadata = {
	title: "Fertility Connect App",
	description: "Empowering Your Fertility Journey - Track your cycle, understand your body, and take control of your fertility journey with consultations from experts.",
	keywords: [
		"fertility app",
		"cycle tracking",
		"women's health",
		"fertility journey",
		"ovulation tracker",
		"fertility consultations",
		"reproductive health",
		"pregnancy planning",
		"menstrual health",
	],
	authors: [{ name: "Fertility Connect Team", url: "https://thefertilityconnect.com" }],
	creator: "Fertility Connect",
	publisher: "Fertility Connect",
	openGraph: {
		title: "Fertility Connect App",
		description:
			"Take control of your fertility journey with expert consultations, ovulation tracking, and personalized insights.",
		url: "https://thefertilityconnect.com",
		siteName: "Fertility Connect",
		images: [
			{
				url: "https://thefertilityconnect.com/logo.landing.png",
				width: 1208,
				height: 697,
				alt: "Fertility Connect App - Empowering Your Fertility Journey",
			},
		],
		locale: "en_US",
		type: "website",
	},
	twitter: {
		card: "summary_large_image",
		title: "Fertility Connect App",
		description:
			"Track your ovulation, understand your body, and connect with fertility experts to guide your journey.",
		creator: "@FertilityConnect",
		images: ["https://thefertilityconnect.com/logo.landing.png"],
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<SessionWrapper>
			<html lang="en">
				<head>
					<link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />
					<link rel="manifest" href="/manifest.json" />
					<link rel="apple-touch-icon" href="/favicon.ico" />
				</head>
				<body className={MyraidProFont.className}>
					{children}
				</body>
			</html>
		</SessionWrapper>
	);
}
