import type { Metadata } from "next";
import Navbar from "@/lib/commons/navBar/navbar";
import "@/lib/styles/globals.css";
import Footer from "@/lib/commons/footer/footer";
import { ThemeContextProvider } from "@/lib/commons/context/theme_context";
import ThemeProvider from "@/lib/commons/theme/theme_provider";

export const metadata: Metadata = {
  title: "My Tech Blog",
  description: "A blog to share articles about tech, software, and more.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-circuit-pattern">
        <ThemeContextProvider>
          <ThemeProvider>
            <div className="container">
              <div className="wrapper">
                <Navbar />
                {children}
                <Footer />
              </div>
            </div>
          </ThemeProvider>
        </ThemeContextProvider>
      </body>
    </html>
  );
}
