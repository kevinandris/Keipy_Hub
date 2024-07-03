import type { Metadata } from "next";
import { DynaPuff } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import ToasterProvider from "@/components/providers/ToasterProvider";
import ContextProvider from "@/components/providers/ContextProvider";

const dynaPuff = DynaPuff({ weight: "400", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Keipy Hub",
  description:
    "The most trusted education hub for a convenient progression of study.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={dynaPuff.className}>
          <ContextProvider>{children}</ContextProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
