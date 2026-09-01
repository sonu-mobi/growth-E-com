import Link from "next/link";
import { cn } from "../../lib/cn.js";
import Paragraph from "./Paragraph.jsx";

const VARIANTS = {
  primary:
    "bg-black text-white border border-black hover:opacity-75",
  secondary:
    "bg-transparent text-black border border-black hover:opacity-75",
  ghost:
    "bg-transparent text-white border border-white hover:opacity-75",
};

const SIZES = {
  sm: "px-4 py-3 min-w-[160px] rounded-[8px]",
  md: "px-14 py-4 rounded-[6px]",
};

export default function Button({
  variant = "primary",
  size = "md",
  className = "",
  children,
  type = "button",
  href,
  ...props
}) {
  const classes = cn(
    "inline-flex items-center justify-center transition-opacity",
    VARIANTS[variant],
    SIZES[size],
    className
  );
  const content = (
    <Paragraph as="span" variant="button" className="text-inherit">
      {children}
    </Paragraph>
  );

  if (href) {
    return (
      <Link href={href} className={classes} {...props}>
        {content}
      </Link>
    );
  }

  return (
    <button type={type} className={classes} {...props}>
      {content}
    </button>
  );
}
