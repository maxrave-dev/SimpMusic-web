"use client";

import { Button } from "@nextui-org/react";
import { TbBrandGithub } from "react-icons/tb";
import { SiBuymeacoffee, SiLiberapay } from "react-icons/si";
import Link from "next/link";

export default function EmptyDonorsState() {
  return (
    <div className="mx-auto max-w-2xl py-10 text-center">
      <div className="mb-8">
        <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gradientstart to-gradientend mb-4">
          Be the first to support SimpMusic! 🎵
        </h3>
        <p className="text-lg text-default-600">
          Help us keep SimpMusic free, ad-free, and continuously improving.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
        <Button
          as={Link}
          href="https://github.com/sponsors/maxrave-dev"
          target="_blank"
          rel="noopener noreferrer"
          color="primary"
          size="lg"
          radius="md"
          endContent={<TbBrandGithub className="text-xl" />}
        >
          <span className="font-semibold">GitHub Sponsors</span>
        </Button>

        <Button
          as={Link}
          href="https://www.buymeacoffee.com/maxrave"
          target="_blank"
          rel="noopener noreferrer"
          color="primary"
          size="lg"
          radius="md"
          endContent={<SiBuymeacoffee className="text-xl" />}
        >
          <span className="font-semibold">Buy Me a Coffee</span>
        </Button>

        <Button
          as={Link}
          href="https://liberapay.com/maxrave-dev"
          target="_blank"
          rel="noopener noreferrer"
          color="primary"
          size="lg"
          radius="md"
          endContent={<SiLiberapay className="text-xl" />}
        >
          <span className="font-semibold">Liberapay</span>
        </Button>
      </div>
    </div>
  );
}
