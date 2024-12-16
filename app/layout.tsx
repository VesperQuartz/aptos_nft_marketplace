import React from "react";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import type { Metadata } from "next";
import "./globals.css";
import { Space_Grotesk } from "next/font/google";
import { WalletProvider } from "./providers/wallet-provider";
import { Navbar } from "@/components/navbar";
import { AsyncProvider } from "./providers/query-provider";
import { BarProviders } from "./providers/loader";

export const metadata: Metadata = {
  title: "marketplace",
  description: "NFT marketplace",
};

const font = Space_Grotesk({ subsets: ["latin"] });
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className={`${font.className} antialiased`}>
        <AsyncProvider>
          <WalletProvider>
            <NuqsAdapter>
              <BarProviders>
                <Navbar />
                {children}
              </BarProviders>
            </NuqsAdapter>
          </WalletProvider>
        </AsyncProvider>
      </body>
    </html>
  );
}
