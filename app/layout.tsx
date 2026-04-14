import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Footer from '@/components/Footer';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "UptimeFlow",
  description: "Sistem erişilebilirliğini ve SSL durumlarını izle.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr" className="bg-[#050505]">
      <body className={`${inter.className} bg-[#050505] text-neutral-100 antialiased flex flex-col min-h-screen`}>
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}