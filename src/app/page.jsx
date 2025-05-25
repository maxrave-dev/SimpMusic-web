import HomeHeading from "@/components/custom/typo/HomeHeading";
import Image from "next/image";
import IntroSection from "@/components/custom/IntroSection";
import DescriptionSection from "@/components/custom/DescriptionSection";
import FeatureSection from "@/components/custom/FeatureSection";
import ScreenshotSection from "@/components/custom/ScreenshotSection";
import DownloadInfoSection from "@/components/custom/DownloadInfoSection";
import AdSense from "@/components/custom/AdSense";

export default function Home() {
  return (
    <>
      <div className="lg:px-16 md:px-16 sm:px-10">
        <IntroSection />
        <AdSense className="my-8" />
        <DescriptionSection />
        <FeatureSection />
      </div>
      <ScreenshotSection />
      <div className="lg:px-16 md:px-16 sm:px-10">
        <DownloadInfoSection />
        <AdSense adFormat="rectangle" className="my-8" />
      </div>
    </>
  );
}
