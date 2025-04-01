'use client'
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";
import { usePathname } from "next/navigation";
import CustomToast from "@/components/CustomToast";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export default function RootLayout({ children }) {
  const pathname = usePathname()
  return (
    <html lang="en">
    <Elements stripe={stripePromise}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
      {pathname.startsWith('/dashboard') ? '' : <Header />}
      
      {children}
      <CustomToast />
      {pathname.startsWith('/dashboard') ? '' : <Footer />}
      </body>
      </Elements>
    </html>
  );
}
