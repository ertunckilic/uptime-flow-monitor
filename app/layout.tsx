import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "UptimeFlow",
  description: "Sistem erişilebilirliğini ve SSL durumlarını izle.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className="bg-[#050505]">
      <body className={`${inter.className} bg-[#050505] text-neutral-100 antialiased`}>
        {children}
      </body>
    </html>
  );
}