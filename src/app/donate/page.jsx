import DonateSection from "@/components/custom/DonateSection";
import React from "react";

export const metadata = {
  title: "Donate to SimpMusic",
  description: "Support the development of SimpMusic - A simple music app using YouTube Music for backend",
  openGraph: {
    title: "Donate to SimpMusic",
    description: "Support the development of SimpMusic - A simple music app using YouTube Music for backend",
    images: [
      {
        url: "/images/blog/feature.jpg",
        width: 1200,
        height: 630,
        alt: "SimpMusic - Feel free when playing music",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Donate to SimpMusic",
    description: "Support the development of SimpMusic - A simple music app using YouTube Music for backend",
    images: ["/images/blog/feature.jpg"],
  },
};

const Donate = () => {
  return (
    <div className="lg:px-16 md:px-16 sm:px-10">
      <DonateSection />
    </div>
  );
};

export default Donate;
