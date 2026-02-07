"use client";

import { Card, CardBody, Avatar } from "@nextui-org/react";
import { motion } from "framer-motion";
import { TbBrandGithub } from "react-icons/tb";
import { SiBuymeacoffee, SiLiberapay } from "react-icons/si";

const platformIcons = {
  github: TbBrandGithub,
  buymeacoffee: SiBuymeacoffee,
  liberapay: SiLiberapay,
};

const platformColors = {
  github: "text-purple-500",
  buymeacoffee: "text-yellow-500",
  liberapay: "text-yellow-600",
};

const platformNames = {
  github: "GitHub Sponsors",
  buymeacoffee: "Buy Me a Coffee",
  liberapay: "Liberapay",
};

export default function DonorCard({ donor, index }) {
  const PlatformIcon = platformIcons[donor.platform];
  const platformColor = platformColors[donor.platform];
  const platformName = platformNames[donor.platform];

  // Format amount
  const formattedAmount = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: donor.currency || 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(donor.amount);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
    >
      <Card
        isBlurred
        className="border-none bg-background/60 dark:bg-default-100/50 w-[220px] min-w-[220px] overflow-hidden"
        shadow="sm"
      >
        <CardBody className="p-4">
          <div className="flex flex-col items-center text-center gap-3">
            {/* Avatar */}
            {donor.avatarUrl ? (
              <Avatar
                src={donor.avatarUrl}
                alt={donor.name}
                className="w-12 h-12"
                isBordered
              />
            ) : (
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-gradientstart/60 to-gradientend/60 flex items-center justify-center text-xl font-bold text-white">
                {donor.name.charAt(0).toUpperCase()}
              </div>
            )}

            {/* Name */}
            <div className="w-full">
              <h4 className="font-semibold text-base leading-none text-default-900 truncate w-full px-2" title={donor.name}>
                {donor.name}
              </h4>
            </div>

            {/* Amount */}
            <div className="flex items-baseline justify-center">
              <p className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gradientstart to-gradientend">
                {formattedAmount}
              </p>
            </div>

            {/* Platform Badge */}
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-default-100">
              {PlatformIcon && <PlatformIcon className={`text-sm ${platformColor}`} />}
              <span className="text-xs font-medium text-default-700">
                {platformName}
              </span>
            </div>
          </div>
        </CardBody>
      </Card>
    </motion.div>
  );
}
