import { Montserrat } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({ subsets: ["latin"] });
import Image from "next/image";

export const metadata = {
  title: "🌟 City Gazer - By Alexandru Stelea",
  description: "A web application to explore various cities around the world.",
};

export default function RootLayout({ children }) {
  return (
    <>
      <html lang="en">
        <body className={montserrat.className}>
          {children}
          <div className="footer">Developed by Alexandru-Vasile Stelea</div>
        </body>
      </html>
    </>
  );
}
