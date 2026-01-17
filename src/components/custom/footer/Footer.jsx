"use client";
import { Card, CardBody, CardHeader, Image, Link } from "@nextui-org/react";
import React from "react";
import { TbBrandNextjs } from "react-icons/tb";
import NextLink from "next/link";

const communities = [
  {
    title: "Discord",
    description: "Join our Discord server to get in touch with the community.",
    thumbnail:
      "https://assets-global.website-files.com/6257adef93867e50d84d30e2/636e0a69f118df70ad7828d4_icon_clyde_blurple_RGB.svg",
    url: "https://discord.gg/Rq5tWVM9Hg",
  },
  {
    title: "GitHub",
    description: "Contribute to the project on GitHub or create an issue.",
    thumbnail:
      "https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png",
    url: "https://github.com/maxrave-dev/SimpMusic",
  },
  {
    title: "Crowdin",
    description: "Help us translate the app into your language.",
    thumbnail:
      "https://support.crowdin.com/assets/logos/symbol/svg/crowdin-symbol-cDark.svg",
    url: "https://crowdin.com/project/simpmusic",
  },
];
const Footer = () => {
  return (
    <div className="relative isolate px-6 py-28 lg:px-8">
      <div
        className="absolute inset-x-0 -z-10 transform-gpu overflow-hidden blur-3xl"
        aria-hidden="true"
      >
        <div
          className="relative left-[50%] aspect-[3/1] w-full -translate-x-1/2 rotate-[30deg] bg-gradient-to-r from-gradientstart/60 to-gradientend/60 opacity-30"
          style={{
            clipPath:
              "polygon(45% 55%, 61% 46%, 69% 55%, 78% 66%, 61% 81%, 35% 82%, 20% 75%, 24% 49%)",
          }}
        ></div>
      </div>
      <div className="py-20">
        <h2 className="scroll-m-20 text-center text-4xl font-bold tracking-tight lg:text-5xl pb-8 bg-clip-text text-transparent bg-gradient-to-r from-gradientstart/60 to-50% to-gradientend/60">
          Community
        </h2>
        <h4 className="scroll-m-20 text-xl text-center font-semibold tracking-tight">
          Get involved in our community. Everyone is welcome!
        </h4>
      </div>
      <div className="mx-21 my-10 flex flex-wrap justify-center justify-items-center gap-12">
        {communities.map((item, key) => (
          <Card
            key={key}
            isBlurred
            isPressable
            onPress={() => window.open(item.url, "_blank")}
            className="text-center shrink py-7 px-10 hover:shadow-2xl transition-all duration-300 ease-in-out w-96"
          >
            <CardHeader className="flex gap-3">
              <Image
                alt="logo"
                height={40}
                radius="sm"
                src={item.thumbnail}
                width={40}
              />
              <div className="flex flex-col">
                <h3 className="text-center text-xl font-bold tracking-tight lg:text-2xl bg-clip-text py-2 text-transparent bg-gradient-to-r from-gradientstart/60 to-50% to-gradientend/60">
                  {item.title}
                </h3>
              </div>
            </CardHeader>
            <CardBody>
              <h3 className="text-md">{item.description}</h3>
            </CardBody>
          </Card>
        ))}
      </div>
      <div className="py-10 text-center">
        <h2 className="scroll-m-20 text-3xl font-bold tracking-tight lg:text-4xl pb-8 bg-clip-text text-transparent bg-gradient-to-r from-gradientstart/60 to-50% to-gradientend/60">
          SimpMusic is sponsored by:
        </h2>
        <div className="flex flex-col items-center justify-center gap-8 my-8">
          <a href="https://vercel.com/oss">
            <img alt="Vercel OSS Program" src="https://vercel.com/oss/program-badge.svg" />
          </a>
          <a href="https://www.digitalocean.com/?refcode=d7f6eedfb9a9&utm_campaign=Referral_Invite&utm_medium=Referral_Program&utm_source=badge" target="_blank" rel="noopener noreferrer">
            <Image src="https://web-platforms.sfo2.cdn.digitaloceanspaces.com/WWW/Badge%201.svg" width={300} alt="DigitalOcean Referral Badge" />
          </a>
          <a href="https://crowdin.com" target="_blank" rel="noopener noreferrer">
            <Image src="https://support.crowdin.com/assets/logos/plate/png/crowdin-logo-with-plate.png" width={300} alt="Crowdin" />
          </a>
          <a href="https://sentry.io" target="_blank" rel="noopener noreferrer">
            <Image src="https://github.com/maxrave-dev/SimpMusic/blob/dev/asset/sentry.svg?raw=true" width={300} alt="Sentry" />
          </a>
          <a href="https://termius.com" target="_blank" rel="noopener noreferrer">
            <Image src="/images/blog/termius-logo.svg" width={300} alt="Termius" />
          </a>
        </div>
        <p className="text-center text-gray-400/80 mb-4">
          <Link isExternal showAnchorIcon href="https://termius.com" color="primary">Termius</Link> provides a secure, reliable, and collaborative SSH client.
        </p>
        <div className="text-center text-gray-400/80">
          <p className="mt-4">
            Get free $200 credit over 60 days on DigitalOcean: <Link isExternal showAnchorIcon href="https://www.digitalocean.com/?refcode=d7f6eedfb9a9&utm_campaign=Referral_Invite&utm_medium=Referral_Program&utm_source=badge" color="primary">GET NOW</Link>
          </p>
          <p className="mt-4">
            Crowdin and Sentry both have a free enterprise plan for Open-source projects. Follow the URLs:
          </p>
          <ul className="list-none mt-2">
            <li>
              <Link isExternal showAnchorIcon href="https://crowdin.com/page/open-source-project-setup-request" color="primary">Open Source License Request Form | Crowdin</Link>
            </li>
            <li>
              <Link isExternal showAnchorIcon href="https://sentry.io/for/open-source/" color="primary">Sentry for Open Source | Sentry</Link>
            </li>
          </ul>
          <p className="mt-4">
            Check out the <Link isExternal showAnchorIcon href="https://vercel.com/open-source-program" color="primary">Vercel open-source program</Link>
          </p>
        </div>
      </div>
      <div className="pt-20 grid grid-cols-1 justify-items-center gap-2">
        <p className="text-center text-gray-400/80 text-md">
          SimpMusic app is FOSS and under GPL-3.0 license.
        </p>
        <p className="text-center text-gray-400/80 text-md">
          © 2023-2025 SimpMusic - @maxrave-dev
        </p>
        <div className="flex gap-4 items-center">
          <NextLink href="/privacy-policy" passHref>
            <span className="text-center text-gray-400/80 text-md hover:text-gray-300 cursor-pointer">
              Privacy Policy
            </span>
          </NextLink>
          <Link
            className="text-center text-gray-400/80 text-md"
            isExternal
            showAnchorIcon
            href="https://nextjs.org/"
            color="foreground"
            anchorIcon={<TbBrandNextjs />}
          >
            Build with Next.js
          </Link>
        </div>
        <p className="pt-2 text-center text-gray-600/80 text-sm">
          I use AdSense to insert ads in simpmusic.org. <br />The revenue from ads is help me to maintain the website and the app. Thanks for your support!
        </p>
      </div>
    </div>
  );
};

export default Footer;
