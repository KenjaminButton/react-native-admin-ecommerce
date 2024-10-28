import type { Metadata } from "next";
import "@/styles/globals.css";
import { Inter } from 'next/font/google';
import { ThemeProvider } from "@/providers/theme-provider";
import { Toaster } from "@/components/ui/sonner"



const inter = Inter({subsets: ['latin']})

// const geistSans = localFont({
//   src: "./fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
//   weight: "100 900",
// });
// const geistMono = localFont({
//   src: "./fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
//   weight: "100 900",
// });

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


