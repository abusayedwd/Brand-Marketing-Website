import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "@/redux/Providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Brivio — Brand & Creator Campaigns",
  description:
    "Brivio connects brands with content creators for campaigns, draft approval, Stripe payments, and payouts.",
  icons: {
    icon: "/images/logo.png",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#0b1f17",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-dvh overflow-x-hidden antialiased`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
