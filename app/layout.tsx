import type { Metadata } from "next";
import { Vazirmatn } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "sonner";

import "./globals.css";

const vazirmatn = Vazirmatn({
  variable: "--font-vazirmatn",
  subsets: ["latin"],
});

/**
 * Metadata information for the application.
 *
 * Includes the title and description used for SEO and display purposes.
 */
export const metadata: Metadata = {
  title: "پرسشنامه مشاغل آشنایان",
  description: "پرسشنامه مشاغل آشنایان",
};

/**
 * Root layout component for the Next.js application.
 *
 * Wraps the application content with HTML structure, font styling,
 * theme provider, and a toast notification system.
 *
 * @param props - The component props.
 * @param props.children - The React nodes to be rendered inside the layout.
 * @returns The root HTML structure with theme and toaster.
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl" suppressHydrationWarning>
      <body className={`${vazirmatn.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster richColors closeButton position="top-center" />
        </ThemeProvider>
      </body>
    </html>
  );
}
