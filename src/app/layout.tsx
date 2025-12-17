import type { Metadata } from "next";
import { Inter, Orbitron, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as SonnerToaster } from "@/components/ui/sonner";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
  weight: ["400", "700", "900"]
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"]
});

export const metadata: Metadata = {
  title: "PrivacySwap - Privacy-First Web3 Platform",
  description: "Experience the future of decentralized privacy with PrivacySwap. Zero-knowledge proofs, secure swaps, and private DeFi solutions.",
  keywords: ["PrivacySwap", "Web3", "Privacy", "ZK-SNARKs", "DeFi", "Zero Knowledge", "Crypto", "Blockchain", "Privacy Swap"],
  authors: [{ name: "PrivacySwap Team" }],
  icons: {
    icon: "/privacyswap.png",
  },
  openGraph: {
    title: "PrivacySwap - Privacy-First Web3 Platform",
    description: "Experience the future of decentralized privacy with PrivacySwap. Zero-knowledge proofs, secure swaps, and private DeFi solutions.",
    url: "https://privacyswap.dev",
    siteName: "PrivacySwap",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "PrivacySwap - Privacy-First Web3 Platform",
    description: "Experience the future of decentralized privacy with PrivacySwap. Zero-knowledge proofs, secure swaps, and private DeFi solutions.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${orbitron.variable} ${spaceGrotesk.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
        <SonnerToaster />
      </body>
    </html>
  );
}
