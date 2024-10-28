import type { Metadata } from "next";
import "@/styles/globals.css";
import { Inter } from 'next/font/google';
import { ThemeProvider } from "@/providers/theme-provider";
import { Toaster } from "@/components/ui/sonner"



const inter = Inter({subsets: ['latin']})

export const metadata: Metadata = {
  title: "react native shop",
  description: "Kenjamin Button's E-Commerce React Native Site",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
        <main>
          {children}
        </main>

        <Toaster richColors />
      </ThemeProvider>
      </body>
    </html>
  );
}


