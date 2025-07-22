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
export default function Download() {
  const { data, error, isLoading } = useSWR(
    `https://api.github.com/repos/maxrave-dev/SimpMusic/releases`,
    fetcher
  );
  const nodeRef = useRef();

  useEffect(() => {
    if (Array.isArray(data)) {
      let sum = 0;
      data.forEach((release) => {
        if (release.assets && release.assets.length > 0 && release.assets[0].download_count) {
          sum += release.assets[0].download_count;
        }
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
      <div>
        <h1
          className="text-center scroll-m-20 text-4xl font-bold tracking-tight lg:text-5xl bg-clip-text py-10 text-transparent bg-gradient-to-r from-gradientstart/60 to-50% to-gradientend/60"
          ref={nodeRef}
        />
        <h1 className="text-center text-2xl font-semibold tracking-tight lg:text-3xl bg-clip-text py-2 text-transparent bg-gradient-to-r from-gradientstart/60 to-50% to-gradientend/60">
          Downloads
        </h1>
      </div>
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
