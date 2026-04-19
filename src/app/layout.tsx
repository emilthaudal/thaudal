import type { Metadata } from "next";
import { Geist_Mono, Noto_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

const playfairDisplayHeading = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-heading",
});

const notoSans = Noto_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Emil Thaudal Bønnerup",
  description:
    "Backend engineer building event-driven systems, cloud migrations, and payment infrastructure. Based in Aalborg, Denmark.",
  metadataBase: new URL("https://thaudal.com"),
  openGraph: {
    title: "Emil Thaudal Bønnerup",
    description: "Backend engineer. Event-driven. Based in Aalborg.",
    url: "https://thaudal.com",
    siteName: "thaudal.com",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Emil Thaudal Bønnerup",
    description: "Backend engineer. Event-driven. Based in Aalborg.",
    creator: "@emilthaudal",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "h-full antialiased",
        notoSans.variable,
        playfairDisplayHeading.variable,
        geistMono.variable
      )}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <TooltipProvider>{children}</TooltipProvider>
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
