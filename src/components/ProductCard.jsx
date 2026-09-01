"use client";

import { useState } from "react";
import Link from "next/link";
import Heading from "./ui/Heading.jsx";
import Paragraph from "./ui/Paragraph.jsx";
import Button from "./ui/Button.jsx";
import { HeartIcon } from "./icons/Icons.jsx";

export default function ProductCard({ product }) {
  const [liked, setLiked] = useState(false);

  return (
    <article className="relative flex h-full flex-col items-center rounded-[9px] bg-[#F6F6F6] px-4 pb-6 pt-6">
      <button
        className={`absolute right-4 top-4 z-10 ${liked ? "text-black" : "text-[#909090]"}`}
        aria-label="Add to favorites"
        onClick={() => setLiked((v) => !v)}
      >
        <HeartIcon filled={liked} />
      </button>
      <Link href={`/products/${product.id}`} className="mb-6 flex w-full flex-1 flex-col items-center">
        <img
          src={product.image}
          alt={product.name}
          className="mb-4 h-[160px] w-auto object-contain"
        />
        {product.rating ? (
          <Paragraph as="span" variant="muted" className="mb-2 text-[12px]">
            ★ {product.rating}
          </Paragraph>
        ) : null}
        <Heading as="h3" variant="product" className="mb-4 min-h-12">
          {product.name}
        </Heading>
        <div className="flex items-center gap-2">
          {product.oldPrice ? (
            <Paragraph as="span" variant="oldPrice">
              ${product.oldPrice}
            </Paragraph>
          ) : null}
          <Paragraph as="span" variant="price">
            ${product.price}
          </Paragraph>
        </div>
      </Link>
      <Button size="sm" href={`/products/${product.id}`} className="mt-auto w-full max-w-[184px]">
        Buy Now
      </Button>
    </article>
  );
}
