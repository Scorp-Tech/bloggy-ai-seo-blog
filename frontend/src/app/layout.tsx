import type { Metadata } from "next";
import { Geist, Geist_Mono, Poppins, Public_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import dynamic from 'next/dynamic'
import { SessionProvider } from '@/contexts/session-context';

export const metadata: Metadata = {
  title: 'BlogAI - AI-Powered Blog Writing Platform',
  description: 'Create SEO-optimized content with AI assistance',
};

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const publicSans = Public_Sans({
  variable: '--font-public-sans',
  subsets: ['latin'],
  // weight: ['100', '200', '300',]
})
const poppins= Poppins({
  variable: "--font-poppins",
  weight: ["400", "500","800"],
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const CrispWithNoSSR = dynamic(
    () => import('../components/chat/crisp-chat')
  )
  return (
    <html lang="en" suppressHydrationWarning>
      <CrispWithNoSSR />
      <body className={`${geistSans.variable} ${geistMono.variable} ${publicSans.variable} ${poppins.variable} antialiased`}>
        <SessionProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
            storageKey="blog-theme"
          >
            <TooltipProvider>
              <main>{children}</main>
              <Toaster />
            </TooltipProvider>
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
