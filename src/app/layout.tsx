import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Emil Thaudal Bønnerup",
  description:
    "Tech lead and backend engineer working agent-first: event-driven systems, and the Claude Code tooling that lets agents ship them safely. Based in Ugelbølle, Denmark.",
  metadataBase: new URL("https://thaudal.com"),
  openGraph: {
    title: "Emil Thaudal Bønnerup",
    description:
      "Tech lead. Agentic engineering with Claude Code. Event-driven backends.",
    url: "https://thaudal.com",
    siteName: "thaudal.com",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Emil Thaudal Bønnerup",
    description:
      "Tech lead. Agentic engineering with Claude Code. Event-driven backends.",
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
        geistSans.variable,
        geistMono.variable
      )}
    >
      <body className="min-h-full bg-background text-foreground">
        {/* No theme toggle any more: always follow the OS. The new storage key
            ignores a light/dark choice saved by the old toggle. */}
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
          storageKey="theme-system"
        >
          {children}
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
