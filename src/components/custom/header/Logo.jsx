import React from "react";
import Image from "next/image";
import { Link } from "@nextui-org/react";

const Logo = () => {
  return (
    <Link href="/">
      <Image
        className="mx-2"
        src="/logo.png"
        height={36}
        width={36}
        loading="lazy"
        alt="SimpMusic"
      />
    </Link>
  );
};

export default Logo;
