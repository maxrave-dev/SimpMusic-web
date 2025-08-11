import "./globals.css";
import { cn } from "@/lib/utils";
import Providers from "./providers";
import Header from "@/components/custom/header/Header";
import Footer from "@/components/custom/footer/Footer";
import localFont from 'next/font/local'
import Head from "next/head";

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
      <Head>
        <script async src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-${process.env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID}`}
          crossorigin="anonymous"
          strategy="beforeInteractive">
        </script>
      </Head>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          poppins.variable,
        )}
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
