import Link from "next/link";
import { TbSparkles } from "react-icons/tb";
import AnimatedShinyText from "./AnimatedShinyText";

const Announcement = () => {
  return (
    <div className="flex justify-start items-center py-4">
      <Link
        href="/blogs/en/simpmusic-desktop-alpha"
        className="group inline-flex items-center gap-2 rounded-full border border-white/20 dark:border-white/10 bg-white/10 dark:bg-white/5 backdrop-blur-md px-3 py-2 text-sm transition-all hover:bg-white/20 dark:hover:bg-white/10 shadow-lg"
      >
        <TbSparkles className="text-lg" />
        <AnimatedShinyText className="inline-flex items-center justify-center max-w-none">
          <span className="font-medium">Desktop app is now available (alpha)</span>
          <span className="ml-1 transition-transform group-hover:translate-x-0.5">→</span>
        </AnimatedShinyText>
      </Link>
    </div>
  );
};

export default Announcement;

