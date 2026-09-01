"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Container from "../Container.jsx";
import Heading from "../ui/Heading.jsx";
import Paragraph from "../ui/Paragraph.jsx";
import {
  CartIcon,
  CloseIcon,
  HeartIcon,
  LogoMark,
  MenuIcon,
  SearchIcon,
  UserIcon,
} from "../icons/Icons.jsx";
import { NAV_LINKS } from "../../data/home.js";

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-20 bg-white">
      <Container padded={false} className="flex h-[88px] items-center justify-between gap-4 laptop:gap-8">
        <Link href="/" className="flex items-center gap-2 text-black">
          <LogoMark />
          <Heading as="p" variant="logo">
            cyber
          </Heading>
        </Link>

        <label className="relative hidden min-w-[280px] flex-1 laptop:block desktop:max-w-[370px]">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#656565]">
            <SearchIcon />
          </span>
          <input
            className="h-14 w-full rounded-[8px] bg-[#F5F5F5] pl-12 pr-4 text-[14px] text-black outline-none placeholder:text-[#656565]"
            placeholder="Search"
          />
        </label>

        <nav className="hidden items-center gap-5 desktop:flex desktop:gap-11">
          {NAV_LINKS.map((link) => {
            const active =
              link.href === "/"
                ? pathname === "/"
                : pathname === link.href || pathname.startsWith(`${link.href}/`);
            return (
              <Link key={link.label} href={link.href}>
                <Paragraph
                  as="span"
                  variant="nav"
                  className={active ? "text-black" : "text-black/30 hover:text-black"}
                >
                  {link.label}
                </Paragraph>
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-4 tablet:gap-6">
          <button className="hidden text-black tablet:block" aria-label="Favorites">
            <HeartIcon />
          </button>
          <button className="text-black" aria-label="Cart">
            <CartIcon />
          </button>
          <button className="hidden text-black tablet:block" aria-label="Account">
            <UserIcon />
          </button>
          <button className="text-black desktop:hidden" aria-label="Menu" onClick={() => setOpen((v) => !v)}>
            {open ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </Container>

      {open && (
        <div className="border-t border-black/5 bg-white desktop:hidden">
          <Container padded={false} className="flex flex-col gap-4 py-6">
            {NAV_LINKS.map((link) => (
              <Link key={link.label} href={link.href} onClick={() => setOpen(false)}>
                <Paragraph as="span" variant="nav">
                  {link.label}
                </Paragraph>
              </Link>
            ))}
          </Container>
        </div>
      )}
    </header>
  );
}
