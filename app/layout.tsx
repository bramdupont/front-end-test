import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { ToastProvider } from "@/components/ToastProvider";

const inter = Inter({
	variable: "--font-inter",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Climatest",
	description: "Climatest application",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="nl">
			<body className={`${inter.variable} antialiased`}>
				<ToastProvider>
					<Header />
					{children}
				</ToastProvider>
			</body>
		</html>
	);
}
