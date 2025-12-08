import type { Metadata } from "next";
import { Inter, Orbitron, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

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
  title: "UMBRAI - Privacy-First Web3 Platform",
  description: "Experience the future of decentralized privacy with UMBRAI. Zero-knowledge proofs, secure swaps, and private DeFi solutions.",
  keywords: ["UMBRAI", "Web3", "Privacy", "ZK-SNARKs", "DeFi", "Zero Knowledge", "Crypto", "Blockchain", "Privacy Swap"],
  authors: [{ name: "UMBRAI Team" }],
  icons: {
    icon: "/umbrai.png",
  },
  openGraph: {
    title: "UMBRAI - Privacy-First Web3 Platform",
    description: "Experience the future of decentralized privacy with UMBRAI. Zero-knowledge proofs, secure swaps, and private DeFi solutions.",
    url: "https://umbrai.dev",
    siteName: "UMBRAI",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "UMBRAI - Privacy-First Web3 Platform",
    description: "Experience the future of decentralized privacy with UMBRAI. Zero-knowledge proofs, secure swaps, and private DeFi solutions.",
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
      </body>
    </html>
  );
}
