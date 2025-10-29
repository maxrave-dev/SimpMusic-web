import AboutSection from "@/components/custom/AboutSection";
import React from "react";

export const metadata = {
  title: "About SimpMusic",
  description: "Learn more about SimpMusic - A simple music app using YouTube Music for backend",
  openGraph: {
    title: "About SimpMusic",
    description: "Learn more about SimpMusic - A simple music app using YouTube Music for backend",
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
    title: "About SimpMusic",
    description: "Learn more about SimpMusic - A simple music app using YouTube Music for backend",
    images: ["/images/blog/feature.jpg"],
  },
};

const About = () => {
  return (
    <div className="lg:px-16 md:px-16 sm:px-10">
      <AboutSection />
    </div>
  );
};

export default About;
