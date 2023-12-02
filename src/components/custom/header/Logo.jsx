import React from "react";
import Image from "next/image";

const Logo = () => {
  return (
    <Image
      className="mx-2"
      src="/logo.png"
      height={36}
      width={36}
      loading="lazy"
      alt="SimpMusic"
    />
  );
};

export default Logo;
