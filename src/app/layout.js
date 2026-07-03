import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: {
    default: "SportNest | Sports Facility Booking Platform",
    template: "%s | SportNest",
  },
  description:
    "SportNest is a modern sports facility booking platform where users can explore turfs, courts, swimming lanes and reserve time slots online.",
  keywords: [
    "SportNest",
    "sports booking",
    "facility booking",
    "football turf booking",
    "badminton court booking",
    "MERN project",
    "Next.js project",
  ],
  authors: [{ name: "Md Ismail" }],
  creator: "Md Ismail",
  openGraph: {
    title: "SportNest | Sports Facility Booking Platform",
    description:
      "Explore sports facilities, book time slots and manage facility listings with SportNest.",
    type: "website",
    siteName: "SportNest",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-base-100">
        <Navbar />

        <main className="flex-1">{children}</main>

        <Toaster position="top-right" />

        <Footer />
      </body>
    </html>
  );
}