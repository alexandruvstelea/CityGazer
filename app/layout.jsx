import { Montserrat } from "next/font/google";
import Footer from "./components/Footer.jsx";
import "./globals.css";
import { CityProvider } from "./components/CityContext.js";

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata = {
  title: "City Gazer - By Alexandru Stelea",
  description: "A web application to explore various cities around the world.",
};

export default function RootLayout({ children }) {
  return (
    <>
      <html lang="en">
        <CityProvider>
          <body className={montserrat.className}>
            {children}
            <Footer text="Developed by Alexandru Stelea" />
          </body>
        </CityProvider>
      </html>
    </>
  );
}
