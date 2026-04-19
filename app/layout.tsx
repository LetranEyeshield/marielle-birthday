import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "./responsive.css";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

//USE FOR SEO
export const metadata: Metadata = {
  title: "Marielle's 7th Birthday",
  description: "7th Birthday, Celebration, Birthday, Party, Occassion",
  keywords: "birthday, 7th birthday, party, occassion, event",
  openGraph: {
    title: "MARIELLE'S 7TH BIRTHDAY",
    description: "7th Birthday, Celebration, Birthday, Party, Occassion",
    url: "https://marielle-birthday.vercel.app/",
    siteName: "MARIELLE'S 7TH BIRTHDAY",
    images: [
      {
        url: "/banner.png", // Make sure this is a real image path
        width: 1200,
        height: 630,
        alt: "Debutant Banner",
      },
    ],
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <style>
          @import
          url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400..700&family=Great+Vibes&display=swap');
        </style>
      </head>
      <body className="min-h-full flex flex-col">
        {" "}
        <Toaster position="top-center" />
        {children}
      </body>
    </html>
  );
}
