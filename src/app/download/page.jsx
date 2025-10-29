import DownloadSection from "@/components/custom/DownloadSection";
import React from "react";

export const metadata = {
  title: "Download SimpMusic",
  description: "Download SimpMusic - A simple music app using YouTube Music for backend",
  openGraph: {
    title: "Download SimpMusic",
    description: "Download SimpMusic - A simple music app using YouTube Music for backend",
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
    title: "Download SimpMusic",
    description: "Download SimpMusic - A simple music app using YouTube Music for backend",
    images: ["/images/blog/feature.jpg"],
  },
};

export default function Download() {
  return (
    <>
      <div className="lg:px-16 md:px-16 sm:px-10">
        <DownloadSection />
      </div>
    </>
  );
}
