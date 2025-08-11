import "./globals.css";
import { cn } from "@/lib/utils";
import Providers from "./providers";
import Header from "@/components/custom/header/Header";
import Footer from "@/components/custom/footer/Footer";
import Script from "next/script";
import localFont from 'next/font/local'

const poppins = localFont({
  src: [
    {
      path: '../../public/fonts/poppins/Poppins-Regular.ttf',
      weight: '400'
    },
    {
      path: '../../public/fonts/poppins/Poppins-SemiBold.ttf',
      weight: '600'
    },
    {
      path: '../../public/fonts/poppins/Poppins-Bold.ttf',
      weight: '700'
    }
  ],
  variable: '--font-poppins'
})

export const metadata = {
  title: "SimpMusic",
  description: "A simple music app using YouTube Music for backend",
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en" className="dark">
      <head>
        <Script
          id="adsense-script"
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-${process.env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID}`}
          crossorigin="anonymous"
          strategy="lazyOnload">
        </Script>
      </head>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          poppins.variable,
        )} suppressHydrationWarning
      >
        <Providers>
          <Header />
          {children}
          <Footer />
          <div itemScope itemType="https://schema.org/WebSite">
            <link itemProp="url" href="https://simpmusic.org" />
            <meta itemProp="name" content="SimpMusic" />
          </div>
        </Providers>
      </body>
    </html>
  );
};
export default RootLayout;
