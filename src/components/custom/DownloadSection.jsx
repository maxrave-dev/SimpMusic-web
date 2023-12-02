import { Image, Link } from "@nextui-org/react";
import React from "react";
const store = [
  {
    name: "Fdroid",
    url: "https://f-droid.org/packages/com.maxrave.simpmusic/",
    thumbnail: "https://fdroid.gitlab.io/artwork/badge/get-it-on.png",
  },
  {
    name: "IzzyOnDroid",
    url: "https://apt.izzysoft.de/fdroid/index/apk/com.maxrave.simpmusic",
    thumbnail:
      "https://gitlab.com/IzzyOnDroid/repo/-/raw/master/assets/IzzyOnDroid.png",
  },
  {
    name: "Github",
    url: "https://github.com/maxrave-dev/SimpMusic/releases",
    thumbnail:
      "https://github.com/machiav3lli/oandbackupx/blob/034b226cea5c1b30eb4f6a6f313e4dadcbb0ece4/badge_github.png",
  },
];
const DownloadSection = () => {
  return (
    <section className="download-section ">
      <div className="relative isolate px-6 py-14 lg:px-8">
        <div
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#80e6ff] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          ></div>
        </div>
        <div className="mx-auto place-items-center py-21 sm:py-35 lg:py-42 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
          <div>
            <h2 className="scroll-m-20 text-4xl font-bold tracking-tight lg:text-5xl pb-8 bg-clip-text text-transparent bg-gradient-to-r from-gradientstart/60 to-50% to-gradientend/60">
              Get SimpMusic now!
            </h2>
            <h4 className="scroll-m-20 text-xl font-semibold tracking-tight blink">
              SimpMusic is available on Android. Download it now!
            </h4>
          </div>
          <div className="grid grid-cols-1 justify-center">
            {store.map((item, key) => (
              <Image key={key} width={80} alt={item.name} src={item.thumbnail}>
                <Link href={item.url}></Link>
              </Image>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DownloadSection;
