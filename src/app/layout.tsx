import LeftSidebar from "@/components/shared/LeftSidebar";
import { NavBar } from "@/components/shared/navbar/NavBar";
import { ThemeProvider } from "@/components/theme-provider";
import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "react-toastify/dist/ReactToastify.css";
import "./globals.scss";
import "./nord.css";

const inter = DM_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Hipnode",
  description: "NextJS Forum",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <NavBar />
            <div className="max-w-[1440px] mx-auto grid lg:grid-cols-[260px_minmax(0,1fr)] gap-5 min-h-screen items-start">
              <LeftSidebar></LeftSidebar>
              {children}
            </div>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
