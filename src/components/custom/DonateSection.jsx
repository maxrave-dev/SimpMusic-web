import React from "react";
import { Image, Button } from "@nextui-org/react";
import { TbBrandPaypalFilled } from "react-icons/tb";
import Link from "next/link";
import { SiBuymeacoffee } from "react-icons/si";

const DonateSection = () => {
  return (
    <section className="download-section ">
      <div className="relative isolate px-6 py-28 lg:px-8">
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
        <div className="mx-auto place-items-center py-21 sm:py-35 lg:py-42 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          <div className="sm:mx-7 lg:mx-20">
            <h2 className="scroll-m-20 text-4xl font-bold tracking-tight lg:text-5xl pb-8 bg-clip-text text-transparent bg-gradient-to-r from-gradientstart/60 to-50% to-gradientend/60">
              Keep SimpMusic always free and no-ads!
            </h2>
            <h4 className="scroll-m-20 text-xl font-semibold tracking-tight blink">
              Help us to keep energy and time to develop SimpMusic
            </h4>
          </div>
          <div className="grid grid-cols-1 justify-center">
            <Button
              rel="noopener noreferrer"
              target="_blank"
              href="https://paypal.me/maxraveofficial"
              as={Link}
              color="primary"
              size="lg"
              radius="md"
              endContent={<TbBrandPaypalFilled />}
              className="mb-7"
            >
              <p className="font-semibold">Donate via PayPal </p>
            </Button>
            <Button
              rel="noopener noreferrer"
              target="_blank"
              href="https://www.buymeacoffee.com/maxrave"
              as={Link}
              color="primary"
              size="lg"
              radius="md"
              endContent={<SiBuymeacoffee />}
            >
              <p className="font-semibold">Buy Me A Coffee </p>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DonateSection;
