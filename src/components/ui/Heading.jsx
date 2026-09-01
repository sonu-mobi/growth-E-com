import { cn } from "../../lib/cn.js";

const VARIANTS = {
  logo: "text-[19px] font-bold tracking-tight",
  hero: "text-[48px] tablet:text-[72px] laptop:text-[96px] font-thin leading-none tracking-[-0.96px] text-white",
  section: "text-[24px] font-medium leading-8 text-black",
  bento: "text-[34px] font-light leading-10 text-black",
  bentoPs5: "text-[34px] desktop:text-[49px] font-light leading-tight text-black",
  bentoMac: "text-[34px] desktop:text-[64px] font-light leading-tight text-black",
  product: "text-[16px] font-medium leading-6 text-black text-center",
  pdp: "text-[32px] laptop:text-[40px] font-medium leading-tight text-black",
  popular: "text-[32px] tablet:text-[33px] font-light leading-10",
  sale: "text-[48px] tablet:text-[72px] font-thin leading-tight tracking-[-0.48px] text-white text-center",
  footer: "text-[16px] font-semibold text-white",
};

export default function Heading({
  as: Tag = "h2",
  variant = "section",
  className = "",
  children,
}) {
  return <Tag className={cn(VARIANTS[variant], className)}>{children}</Tag>;
}
