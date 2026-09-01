"use client";

import Container from "../Container.jsx";
import Heading from "../ui/Heading.jsx";
import Paragraph from "../ui/Paragraph.jsx";
import Button from "../ui/Button.jsx";
import {
  FacebookIcon,
  InstagramIcon,
  LogoMark,
  TikTokIcon,
  TwitterIcon,
} from "../icons/Icons.jsx";
import { FOOTER_ASSISTANCE, FOOTER_SERVICES } from "../../data/home.js";

export default function Footer() {
  return (
    <footer className="bg-black">
      <Container padded={false} className="grid gap-10 py-12 laptop:grid-cols-4 laptop:gap-8 laptop:py-[104px]">
        <div className="flex flex-col items-center gap-6 laptop:items-start">
          <a href="#home" className="flex items-center gap-2 text-white">
            <LogoMark />
            <Heading as="h2" variant="logo" className="text-white">
              cyber
            </Heading>
          </a>
          <Paragraph variant="footer" className="max-w-[384px] text-center laptop:text-left">
            We are a residential interior design firm located in Portland. Our boutique-studio offers more than
          </Paragraph>
        </div>

        <FooterColumn title="Services" items={FOOTER_SERVICES} />
        <FooterColumn title="Assistance to the buyer" items={FOOTER_ASSISTANCE} />

        <form className="flex flex-col items-center gap-4 laptop:items-start" onSubmit={(e) => e.preventDefault()}>
          <Heading as="h3" variant="footer">
            Newsletter
          </Heading>
          <input
            type="email"
            placeholder="Email"
            className="h-12 w-full max-w-[384px] rounded-[8px] border border-white/20 bg-transparent px-4 text-white outline-none placeholder:text-[#CFCFCF]"
          />
          <Button variant="ghost" size="sm" className="w-full max-w-[384px]">
            Subscribe
          </Button>
        </form>
      </Container>

      <Container padded={false} className="flex flex-col items-center justify-between gap-6 border-t border-white/10 py-8 laptop:flex-row">
        <div className="flex items-center gap-4 text-white">
          <a href="#home" aria-label="Twitter"><TwitterIcon /></a>
          <a href="#home" aria-label="Facebook"><FacebookIcon /></a>
          <a href="#home" aria-label="TikTok"><TikTokIcon /></a>
          <a href="#home" aria-label="Instagram"><InstagramIcon /></a>
        </div>
        <Paragraph variant="copyright">
          Copyright © 2026 cyber
        </Paragraph>
      </Container>
    </footer>
  );
}

function FooterColumn({ title, items }) {
  return (
    <div className="flex flex-col items-center gap-4 laptop:items-start">
      <Heading as="h3" variant="footer">
        {title}
      </Heading>
      {items.map((item) => (
        <a key={item} href="#home">
          <Paragraph as="span" variant="footer">
            {item}
          </Paragraph>
        </a>
      ))}
    </div>
  );
}
