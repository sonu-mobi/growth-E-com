import { cn } from "../lib/cn.js";

// max-width = breakpoint, px = (breakpoint - content) / 2
// 1440 - 160 - 160 = 1120, and same pattern at every breakpoint
const SHELL =
  "mx-auto box-border w-full px-4 " +
  "tablet:max-w-[640px] tablet:px-4 " +
  "tablet-lg:max-w-[768px] tablet-lg:px-6 " +
  "laptop:max-w-[1024px] laptop:px-8 " +
  "desktop:max-w-[1280px] desktop:px-[40px] " +
  "desktop-lg:max-w-[1440px] desktop-lg:px-[140px] " +
  "desktop-xl:max-w-[1600px] desktop-xl:px-[240px] " +
  "desktop-2xl:max-w-[1920px] desktop-2xl:px-[400px]";

const PADDING_Y = "tablet:py-[60px] laptop:py-[70px] desktop:py-[80px]";

export default function Container({ children, className = "", padded = true }) {
  return (
    <div className={cn(SHELL, padded && PADDING_Y, className)}>{children}</div>
  );
}
