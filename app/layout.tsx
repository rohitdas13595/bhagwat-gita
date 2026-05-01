import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/Sidebar";
import { TopBar } from "@/components/TopBar";
import { MobileNav } from "@/components/MobileNav";
import { ThemeProvider } from "@/components/ThemeProvider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Bhagavad Gita - Precision in Wisdom",
  description: "Experience the profound teachings of the Bhagavad Gita.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} scroll-smooth antialiased`}
      suppressHydrationWarning
    >
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
        >
          <div className="flex min-h-[100dvh] bg-white dark:bg-[#0A0A0A] text-black dark:text-white transition-colors duration-300">
            {/* Sidebar Desktop */}
            <div className="hidden md:block">
              <Sidebar />
            </div>

            {/* Main Layout Area */}
            <div className="flex-1 md:ml-[280px] flex flex-col min-h-[100dvh]">
              <TopBar />

              <main className="flex-1 w-full bg-zinc-50 dark:bg-[#0F0F0F] p-4 md:p-8 lg:p-12 overflow-y-auto mt-20 md:mt-0 transition-colors duration-300">
                <div className="max-w-6xl mx-auto pb-24 md:pb-0">
                  {children}
                </div>
              </main>
            </div>

            {/* Mobile Bottom Navigation */}
            <div className="md:hidden fixed bottom-0 left-0 right-0 z-50">
              <MobileNav />
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
