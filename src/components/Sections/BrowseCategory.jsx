"use client";

import { useRef } from "react";
import Container from "../Container.jsx";
import Heading from "../ui/Heading.jsx";
import Paragraph from "../ui/Paragraph.jsx";
import { ArrowIcon } from "../icons/Icons.jsx";
import { CATEGORIES } from "../../data/home.js";

export default function BrowseCategory() {
  const scroller = useRef(null);

  function scrollByDir(dir) {
    scroller.current?.scrollBy({ left: dir * 200, behavior: "smooth" });
  }

  return (
    <section className="bg-[#FAFAFA]">
      <Container>
        <div className="mb-8 flex items-center justify-between">
          <Heading as="h2" variant="section">
            Browse By Category
          </Heading>
          <div className="flex gap-4">
            <button aria-label="Previous categories" onClick={() => scrollByDir(-1)}>
              <ArrowIcon className="rotate-180" />
            </button>
            <button aria-label="Next categories" onClick={() => scrollByDir(1)}>
              <ArrowIcon />
            </button>
          </div>
        </div>
        <div ref={scroller} className="flex gap-4 desktop:gap-8 overflow-x-auto pb-2 laptop:grid laptop:grid-cols-6 laptop:overflow-visible">
          {CATEGORIES.map(({ name, image }) => (
            <button
              key={name}
              className="flex min-w-[160px] flex-col items-center justify-center gap-2 rounded-[15px] bg-[#EDEDED] px-4 py-6 transition-colors hover:bg-[#E0E0E0] laptop:min-w-0"
            >
              <img src={image} alt="" className="h-12 w-12 object-contain" />
              <Paragraph as="span" variant="category">
                {name}
              </Paragraph>
            </button>
          ))}
        </div>
      </Container>
    </section>
  );
}
