import "@/styles/global.css";
import type { Metadata } from "next";
import { MyraidProFont } from "@/font/fonts";
import SessionWrapper from "@/components/session-wrapper/session-wrapper";

export const metadata: Metadata = {
	title: "Fertility Connect App",
	description: "Empowering Your Fertility Journey - Track your cycle, understand your body, and take control of your fertility journey with consultations from experts.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<SessionWrapper>
			<html lang="en">
				<body className={MyraidProFont.className}>
					{children}
				</body>
			</html>
		</SessionWrapper>
	);
}
