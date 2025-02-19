import { Quicksand } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Providers from "./providers";
import Header from "@/components/custom/header/Header";
import Footer from "@/components/custom/footer/Footer";
import AdSense from "@/components/custom/ads/Adsense";

const quicksand = Quicksand({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

export const metadata = {
  title: "SimpMusic",
  description: "A simple music app using YouTube Music for backend",
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en" className="dark">
        <head>
            <AdSense pId="ca-pub-4666740922614578" />
        </head>
        <body
            className={cn(
                "min-h-screen bg-background quicksand antialiased",
                quicksand.variable
            )}
        >
        <Providers>
            <Header/>
            {children}
            <Footer/>
            <div itemScope itemType="https://schema.org/WebSite">
                <link itemProp="url" href="https://simpmusic.org"/>
                <meta itemProp="name" content="SimpMusic"/>
            </div>
        </Providers>
        </body>
    </html>
  );
};
export default RootLayout;
