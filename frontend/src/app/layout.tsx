import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import './globals.css';
import Header from '../components/Header';

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: 'News Categorizer',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className={`${montserrat.variable} antialiased bg-gray-900 text-white min-h-screen`}>
        <Header />
        <main className="container mx-auto px-20 py-8">{children}</main>
      </body>
    </html>
  );
}

