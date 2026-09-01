import { Inter } from "next/font/google";
import { Providers } from "@store/provider";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700"],
});

export const metadata = {
  title: "cyber — E-Store",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen bg-white text-black`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
