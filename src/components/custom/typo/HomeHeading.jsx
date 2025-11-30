"use client";

import { Button } from "@nextui-org/react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { MdDownload } from "react-icons/md";
import Announcement from "../Announcement";

async function fetcher() {
  const res = await fetch(
    "https://api.github.com/repos/maxrave-dev/SimpMusic/releases"
  );
  if (!res.ok) {
    throw new Error(res.statusText);
  }
  return res.json();
}

const HomeHeading = () => {
  const [version, setVersion] = useState("N/A");
  useEffect(() => {
    fetcher().then((data) => {
      setVersion(data[0].tag_name);
    });
  }, [version]);

  return (
    <div>
      <Announcement />
      <h2 className="scroll-m-20 text-4xl font-bold tracking-tight lg:text-5xl pb-8 bg-clip-text text-transparent bg-gradient-to-r from-gradientstart/60 to-50% to-gradientend/60">
        A simple music app using YouTube Music for backend
      </h2>
      <h4 className="scroll-m-20 text-xl font-semibold tracking-tight blink">
        Stream your favorite music, videos, podcasts, radio and more from
        YouTube Music with SimpMusic for free.
      </h4>
      <div className="flex flex-col items-start gap-8 mt-8">
        <a href="https://trendshift.io/repositories/13482" target="_blank" rel="noopener noreferrer">
          <img src="https://trendshift.io/api/badge/repositories/13482" alt="maxrave-dev%2FSimpMusic | Trendshift" style={{ width: "250px", height: "55px" }} width="250" height="55" />
        </a>
        <div className="flex items-center">
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
      </div>
      <p className="py-4 text-sm text-gray-500/80">
        Support Android Devices, Android Auto and Desktop (Windows, macOS, Linux)
      </p>
    </div>
  );
};

export default HomeHeading;
