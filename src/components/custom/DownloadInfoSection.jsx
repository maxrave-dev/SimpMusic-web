"use client";
import React, { useRef, useEffect } from "react";
import { animate } from "framer-motion";
import useSWR from "swr";
import Image from "next/image";
import Link from "next/link";
import { Button, Progress, Spinner } from "@nextui-org/react";
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
function Download() {
  const { data, error, isLoading } = useSWR(
    `https://api.github.com/repos/maxrave-dev/SimpMusic/releases`,
    fetcher
  );
  const nodeRef = useRef();

  useEffect(() => {
    if (Array.isArray(data)) {
      let sum = 0;
      data.forEach((release) => {
        sum += release.assets[0].download_count;
      });
      console.log(sum);
      const node = nodeRef.current;

      const controls = animate(0, sum, {
        duration: 1,
        onUpdate(value) {
          node.textContent = Intl.NumberFormat("en-US").format(
            value.toFixed(1)
          );
        },
      });

      return () => controls.stop();
    }
  });

  if (isLoading)
    return <Spinner className="self-center" color="default" size="md" />;
  if (error) return <p className="text-center">An error has occurred.</p>;
  if (Array.isArray(data)) {
    return (
      <>
        <h1
          className="text-center scroll-m-20 text-4xl font-bold tracking-tight lg:text-5xl bg-clip-text py-10 text-transparent bg-gradient-to-r from-gradientstart/60 to-50% to-gradientend/60"
          ref={nodeRef}
        />
        <h1 className="text-center text-2xl font-semibold tracking-tight lg:text-3xl bg-clip-text py-2 text-transparent bg-gradient-to-r from-gradientstart/60 to-50% to-gradientend/60">
          Downloads
        </h1>
      </>
    );
  }
}
function Counter({ from, to }) {
  const nodeRef = useRef();

  useEffect(() => {
    const node = nodeRef.current;

    const controls = animate(from, to, {
      duration: 1,
      onUpdate(value) {
        node.textContent = value.toFixed(2);
      },
    });

    return () => controls.stop();
  }, [from, to]);

  return (
    <h1
      className="text-center scroll-m-20 text-4xl font-bold tracking-tight lg:text-5xl bg-clip-text py-10 text-transparent bg-gradient-to-r from-gradientstart/60 to-50% to-gradientend/60"
      ref={nodeRef}
    />
  );
}

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
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          aria-hidden="true"
        >
          <div
            className="relative right-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-br from-[#80e6ff] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                "polygon(65% 66%, 73% 77%, 84% 69%, 93% 80%, 88% 95%, 71% 97%, 57% 92%, 51% 81%, 54% 67%)",
            }}
          ></div>
        </div>
        <div className="mx-auto place-items-center py-14 sm:py-21 lg:py-28 grid gap-7 grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
          <div>
            <Download />
          </div>
          <div>
            <h2 className="scroll-m-20 text-4xl font-bold tracking-tight lg:text-5xl pb-8 bg-clip-text text-transparent bg-gradient-to-r from-gradientstart/60 to-50% to-gradientend/60">
              Be a SimpMusic-er
            </h2>
            <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
              Download SimpMusic to your Android Device now to get the best
              experience for streaming music now!
            </h4>
            <Button
              className="mt-8"
              color="primary"
              size="lg"
              radius="lg"
              endContent={<MdDownload />}
            >
              <Link href="/download">
                <p className="font-semibold">Download</p>
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DownloadInfoSection;
