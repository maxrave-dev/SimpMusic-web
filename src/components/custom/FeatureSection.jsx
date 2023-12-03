import React from "react";
import { MdLibraryMusic, MdLyrics, MdFeaturedPlayList } from "react-icons/md";
import { FaSearch } from "react-icons/fa";
import { TbAnalyze } from "react-icons/tb";
import { IoCloudOffline } from "react-icons/io5";
import { Card, CardBody, CardHeader, CardTitle } from "@nextui-org/react";
const features = [
  {
    title: "Streaming Music",
    descriptions:
      "Play music from YouTube Music or YouTube free without ads in the background",
    image: MdLibraryMusic,
  },
  {
    title: "Browsing",
    descriptions:
      "Browsing Home, Charts, Podcast, Moods & Genre with YouTube Music data at high speed",
    image: FaSearch,
  },
  {
    title: "Personalized",
    descriptions:
      "Analyze your playing data, create custom playlists, and sync with YouTube Music",
    image: TbAnalyze,
  },
  {
    title: "Offline Playing",
    descriptions: "Caching and can save data for offline playback",
    image: IoCloudOffline,
  },
  {
    title: "Synced lyrics",
    descriptions:
      "Synced lyrics from Musixmatch and YouTube Transcript and translated lyrics from Musixmatch",
    image: MdLyrics,
  },
  {
    title: "Many more",
    descriptions:
      "Many more features like SponsorBlock, Sleep Timer, Android Auto, Video Option, etc",
    image: MdFeaturedPlayList,
  },
];
const FeatureSection = () => {
  return (
    <div className="py-4">
      <h1 className="text-center scroll-m-20 text-4xl font-bold tracking-tight lg:text-5xl bg-clip-text py-10 text-transparent bg-gradient-to-r from-gradientstart/60 to-50% to-gradientend/60">
        Feature
      </h1>
      <div className="grid grid-cols-1 mx-14 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-items-start">
        {features.map((feature, index) => (
          <Card
            key={index}
            isBlurred
            className="text-center justify-self-stretch py-7 hover:shadow-2xl transition-all duration-300 ease-in-out"
          >
            <CardHeader className="flex justify-center">
              <feature.image className="py-2" size={42} />
            </CardHeader>
            <CardBody>
              <h1 className="text-center text-2xl font-bold tracking-tight lg:text-3xl bg-clip-text py-2 text-transparent bg-gradient-to-r from-gradientstart/60 to-50% to-gradientend/60">
                {feature.title}
              </h1>
            </CardBody>
            <CardBody className="lg:px-24 md:px-12 px-10 py-2">
              <p className="text-center">{feature.descriptions}</p>
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default FeatureSection;
