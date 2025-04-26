import "./globals.css";
import type { Metadata } from "next";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
	title: "AI QnA",
	description: "AI powered QnA platform",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`antialiased font-montserrat`}>
				{children}
				<Toaster />
			</body>
		</html>
	);
}
