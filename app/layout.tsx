import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { ZenModeProvider } from "@/lib/ZenModeContext";
import { SmoothScrollProvider } from "./SmoothScrollProvider";
import { Analytics } from "@vercel/analytics/react";
import { personalInfo } from '@/data';

const poppins = Poppins({ subsets: ["latin"], weight: ["300", "400", "600", "700", '800'] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className={`${poppins.className} bg-black-100`}>
        <ZenModeProvider>
          <SmoothScrollProvider>
            {children}
          </SmoothScrollProvider>
        </ZenModeProvider>
        <Analytics />
      </body>
    </html>
  );
}

export const metadata: Metadata = {
  title: {
    default: 'Pratik Gajanan ✷ Analytics Portfolio',
    template: '%s - Pratik Gajanan',
  },
  description:
    'Pratik Gajanan — Analytics Strategist & Data Scientist. Six years turning numbers into decisions across five industries. Predictive modelling, ML, NLP, and AI-augmented workflows.',
  icons: {
    icon: '/favicon.ico',
  },
  applicationName: 'Pratik Gajanan Portfolio',
  authors: [
    {
      name: 'Pratik Gajanan',
      url: `https://www.linkedin.com/in/${personalInfo.linkedin}/`,
    },
  ],
  generator: 'Next.js',
  referrer: 'origin',
  creator: 'Pratik Gajanan',
  publisher: 'Pratik Gajanan',
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  colorScheme: 'dark',
  themeColor: '#4A4F54',
};
