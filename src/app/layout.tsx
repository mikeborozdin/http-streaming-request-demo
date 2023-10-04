import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "http-streaming-request demo",
  description: "http-streaming-request demo",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="p-3 w-full md:w-3/4 m-auto space-y-6">
          <div className="flex flex-row justify-between">
            <Link
              href="/"
              className="text-[#1e56a0] font-extrabold hover:underline"
            >
              Basic example
            </Link>
            <Link
              href="/hooks"
              className="text-[#1e56a0] font-extrabold hover:underline"
            >
              React hooks example
            </Link>
            <Link
              href="https://github.com/mikeborozdin/http-streaming-request"
              className="text-[#1e56a0] font-extrabold hover:underline"
            >
              GitHub
            </Link>
          </div>
          {children}
        </div>
      </body>
    </html>
  );
}
