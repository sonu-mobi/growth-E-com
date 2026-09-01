import { cn } from "../../lib/cn.js";

const VARIANTS = {
  body: "text-[16px] font-medium leading-6 text-black",
  muted: "text-[14px] tablet:text-[16px] font-medium leading-6 text-[#909090]",
  eyebrow: "text-[18px] tablet:text-[25px] font-semibold leading-8 text-white/40",
  heroSub: "text-[18px] font-medium leading-6 text-[#909090] max-w-[420px]",
  nav: "text-[16px] font-medium",
  category: "text-[16px] font-medium leading-none text-center text-black",
  price: "text-[24px] font-semibold leading-6 text-black",
  oldPrice: "text-[18px] font-medium text-[#909090] line-through",
  footer: "text-[14px] font-medium leading-6 text-[#CFCFCF]",
  copyright: "text-[13px] text-[#CFCFCF]",
  button: "text-[16px] font-medium leading-6",
  search: "text-[14px] text-[#656565]",
};

export default function Paragraph({
  as: Tag = "p",
  variant = "body",
  className = "",
  children,
  ...props
}) {
  return (
    <Tag className={cn(VARIANTS[variant], className)} {...props}>
      {children}
    </Tag>
  );
}
