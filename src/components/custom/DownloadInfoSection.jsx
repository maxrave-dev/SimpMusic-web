"use client";
import React, { useRef, useEffect } from "react";
import { animate } from "framer-motion";
import useSWR from "swr";
import Image from "next/image";
import Link from "next/link";
import { Button, Progress, Spinner } from "@nextui-org/react";
import { MdDownload } from "react-icons/md";
import Download from "./Download";

const DownloadInfoSection = () => {
  return (
    // <section className="download-section">
    //   <div className="relative isolate pt-14">
    //     <Download />
    //     <h3 className="text-center scroll-m-20 text-4xl font-bold tracking-tight lg:text-5xl bg-clip-text py-10 text-transparent bg-gradient-to-r from-gradientstart/60 to-50% to-gradientend/60">
    //       Download SimpMusic to your Android Device now to get the best
    //       experience for streaming music now!
    //     </h3>
    //   </div>
    //   </section>
    <section className="download-section">
      <div className="relative isolate px-6 py-28 lg:px-8">
        <div
          className="absolute inset-x-0 -z-10 transform-gpu overflow-hidden blur-3xl"
          aria-hidden="true"
        >
          <div
            className="relative right-[calc(50%-15rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-br from-[#80e6ff] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                "polygon(57% 25%, 70% 31%, 77% 45%, 66% 56%, 43% 55%, 35% 41%, 41% 29%)",
            }}
          ></div>
        </div>
        <div className="mx-auto place-items-center py-14 sm:py-21 lg:py-28 grid gap-7 grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
          <div>
            <Download />
          </div>
          <div className="flex flex-col justify-center">
            <div>
              <h2 className="scroll-m-20 text-4xl font-bold tracking-tight lg:text-5xl pb-8 bg-clip-text text-transparent bg-gradient-to-r from-gradientstart/60 to-50% to-gradientend/60">
                Be a SimpMusic-er
              </h2>
              <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
                Download SimpMusic to your Android Device now to get the best
                experience for streaming music now!
              </h4>
            </div>
            <div className="pt-8">
              <Button
                color="primary"
                size="lg"
                href="/download"
                as={Link}
                radius="lg"
                endContent={<MdDownload />}
              >
                <p className="font-semibold">Download</p>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DownloadInfoSection;
