import { Button } from "@nextui-org/react";
import Link from "next/link";
import React from "react";
import { MdDownload } from "react-icons/md";

async function fetcher() {
  const res = await fetch(
    "https://api.github.com/repos/maxrave-dev/SimpMusic/releases"
  );
  if (!res.ok) {
    throw new Error(res.statusText);
  }
  return res.json();
}
const awaitFetcher = await fetcher();
const version = awaitFetcher[0].tag_name;

const HomeHeading = () => {
  return (
    <div>
      <h2 className="scroll-m-20 text-4xl font-bold tracking-tight lg:text-5xl pb-8 bg-clip-text text-transparent bg-gradient-to-r from-gradientstart/60 to-50% to-gradientend/60">
        A simple music app using YouTube Music for backend
      </h2>
      <h4 className="scroll-m-20 text-xl font-semibold tracking-tight blink">
        Stream your favorite music, videos, podcasts, radio and more from
        YouTube Music with SimpMusic for free.
      </h4>
      <div className="flex items-center justify-start mt-8">
        <Button
          color="primary"
          size="lg"
          radius="lg"
          endContent={<MdDownload />}
        >
          <Link href="/download">
            <p className="font-semibold">Download</p>
          </Link>
        </Button>
        <p className="px-4 text-sm text-gray-500/80">
          Latest version: {version}
        </p>
      </div>
      <p className="py-4 text-sm text-gray-500/80">
        Support Android Devices and Android Auto only
      </p>
    </div>
  );
};

export default HomeHeading;
