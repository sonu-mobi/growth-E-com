"use client";

import { useLayoutEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "@store/index";
import { hydrateProductDetail, mapProductDetail } from "@store/slices/productDetailSlice";
import { mapProduct } from "@store/slices/productListSlice";
import Container from "../Container.jsx";
import Heading from "../ui/Heading.jsx";
import Paragraph from "../ui/Paragraph.jsx";
import Button from "../ui/Button.jsx";
import ProductCard from "../ProductCard.jsx";
import { HeartIcon } from "../icons/Icons.jsx";

export default function ProductDetail({ initialProduct, initialRelated = [] }) {
  const dispatch = useDispatch();
  const { product: storeProduct, related: storeRelated } = useSelector(
    (state) => state.productDetail
  );
  const [activeImage, setActiveImage] = useState(0);
  const [qty, setQty] = useState(1);
  const [liked, setLiked] = useState(false);

  useLayoutEffect(() => {
    if (initialProduct?.id) {
      dispatch(
        hydrateProductDetail({
          product: initialProduct,
          related: initialRelated,
        })
      );
      setActiveImage(0);
      setQty(1);
    }
  }, [dispatch, initialProduct, initialRelated]);

  const product = storeProduct || (initialProduct ? mapProductDetail(initialProduct) : null);
  const related = storeRelated.length
    ? storeRelated
    : initialRelated.filter((item) => item.id !== initialProduct?.id).slice(0, 4).map(mapProduct);

  const images = product?.images?.length ? product.images : [product?.image].filter(Boolean);

  const specs = useMemo(() => {
    if (!product) return [];
    return [
      { label: "Brand", value: product.brand },
      { label: "SKU", value: product.sku },
      { label: "Stock", value: product.stock },
      { label: "Weight", value: product.weight ? `${product.weight} g` : null },
      {
        label: "Dimensions",
        value: product.dimensions
          ? `${product.dimensions.width} × ${product.dimensions.height} × ${product.dimensions.depth}`
          : null,
      },
      { label: "Warranty", value: product.warrantyInformation },
      { label: "Shipping", value: product.shippingInformation },
      { label: "Returns", value: product.returnPolicy },
    ].filter((item) => item.value);
  }, [product]);

  if (!product) {
    return (
      <Container>
        <Paragraph variant="muted">Product not found.</Paragraph>
      </Container>
    );
  }

  return (
    <section>
      <Container>
        <div className="mb-8 flex flex-wrap items-center gap-2">
          <Link href="/">
            <Paragraph as="span" variant="muted">
              Home
            </Paragraph>
          </Link>
          <Paragraph as="span" variant="muted">
            /
          </Paragraph>
          <Paragraph as="span" variant="muted" className="capitalize">
            {product.category}
          </Paragraph>
          <Paragraph as="span" variant="muted">
            /
          </Paragraph>
          <Paragraph as="span" variant="body">
            {product.name}
          </Paragraph>
        </div>

        <div className="grid gap-10 laptop:grid-cols-2 laptop:gap-16">
          <div>
            <div className="relative mb-4 flex min-h-[360px] items-center justify-center rounded-[12px] bg-[#F6F6F6] p-8">
              <button
                className={`absolute right-4 top-4 ${liked ? "text-black" : "text-[#909090]"}`}
                aria-label="Add to favorites"
                onClick={() => setLiked((v) => !v)}
              >
                <HeartIcon filled={liked} />
              </button>
              <img
                src={images[activeImage]}
                alt={product.name}
                className="max-h-[420px] w-auto object-contain"
              />
            </div>
            {images.length > 1 ? (
              <div className="flex gap-3 overflow-x-auto">
                {images.map((src, index) => (
                  <button
                    key={src}
                    onClick={() => setActiveImage(index)}
                    className={`flex h-20 w-20 shrink-0 items-center justify-center rounded-[8px] bg-[#F6F6F6] p-2 ${
                      index === activeImage ? "ring-2 ring-black" : ""
                    }`}
                  >
                    <img src={src} alt="" className="max-h-full object-contain" />
                  </button>
                ))}
              </div>
            ) : null}
          </div>

          <div className="flex flex-col">
            <Paragraph variant="muted" className="mb-2 capitalize">
              {product.brand || product.category}
            </Paragraph>
            <Heading as="h1" variant="pdp" className="mb-4">
              {product.name}
            </Heading>
            {product.rating ? (
              <Paragraph variant="body" className="mb-4">
                ★ {product.rating}{" "}
                <Paragraph as="span" variant="muted">
                  ({product.reviews?.length || 0} reviews)
                </Paragraph>
              </Paragraph>
            ) : null}
            <div className="mb-6 flex items-center gap-3">
              {product.oldPrice ? (
                <Paragraph as="span" variant="oldPrice">
                  ${product.oldPrice}
                </Paragraph>
              ) : null}
              <Paragraph as="span" variant="price" className="text-[32px]">
                ${product.price}
              </Paragraph>
              {product.discountPercentage ? (
                <Paragraph as="span" variant="muted">
                  -{Math.round(product.discountPercentage)}%
                </Paragraph>
              ) : null}
            </div>
            <Paragraph variant="muted" className="mb-6">
              {product.description}
            </Paragraph>
            {product.tags?.length ? (
              <div className="mb-6 flex flex-wrap gap-2">
                {product.tags.map((tag) => (
                  <Paragraph
                    as="span"
                    key={tag}
                    variant="category"
                    className="rounded-full bg-[#F6F6F6] px-3 py-2 capitalize"
                  >
                    {tag}
                  </Paragraph>
                ))}
              </div>
            ) : null}
            <Paragraph variant="body" className="mb-6">
              {product.availabilityStatus || "In Stock"}
              {product.stock ? ` · ${product.stock} left` : ""}
            </Paragraph>
            <div className="mb-8 flex items-center gap-4">
              <div className="flex items-center rounded-[8px] border border-black">
                <button
                  className="px-4 py-3"
                  onClick={() => setQty((v) => Math.max(1, v - 1))}
                  aria-label="Decrease quantity"
                >
                  <Paragraph as="span" variant="button">
                    −
                  </Paragraph>
                </button>
                <Paragraph as="span" variant="body" className="min-w-8 text-center">
                  {qty}
                </Paragraph>
                <button
                  className="px-4 py-3"
                  onClick={() => setQty((v) => v + 1)}
                  aria-label="Increase quantity"
                >
                  <Paragraph as="span" variant="button">
                    +
                  </Paragraph>
                </button>
              </div>
              <Button className="flex-1">Add to cart</Button>
            </div>
            <Button variant="secondary" className="w-full">
              Buy Now
            </Button>
          </div>
        </div>

        {specs.length ? (
          <div className="mt-16">
            <Heading as="h2" variant="section" className="mb-6">
              Specifications
            </Heading>
            <div className="divide-y divide-[#E5E5E5] rounded-[12px] border border-[#E5E5E5]">
              {specs.map((spec) => (
                <div key={spec.label} className="grid grid-cols-2 gap-4 px-5 py-4 laptop:grid-cols-3">
                  <Paragraph variant="muted">{spec.label}</Paragraph>
                  <Paragraph variant="body" className="laptop:col-span-2">
                    {spec.value}
                  </Paragraph>
                </div>
              ))}
            </div>
          </div>
        ) : null}

        {product.reviews?.length ? (
          <div className="mt-16">
            <Heading as="h2" variant="section" className="mb-6">
              Reviews
            </Heading>
            <div className="grid gap-4 laptop:grid-cols-2">
              {product.reviews.map((review, index) => (
                <article key={`${review.reviewerEmail}-${index}`} className="rounded-[12px] bg-[#F6F6F6] p-5">
                  <div className="mb-2 flex items-center justify-between gap-3">
                    <Paragraph variant="body">{review.reviewerName}</Paragraph>
                    <Paragraph as="span" variant="muted">
                      ★ {review.rating}
                    </Paragraph>
                  </div>
                  <Paragraph variant="muted">{review.comment}</Paragraph>
                </article>
              ))}
            </div>
          </div>
        ) : null}

        {related.length ? (
          <div className="mt-16">
            <Heading as="h2" variant="section" className="mb-6">
              Related products
            </Heading>
            <div className="grid gap-4 tablet:grid-cols-2 laptop:grid-cols-4">
              {related.map((item) => (
                <ProductCard key={item.id} product={item} />
              ))}
            </div>
          </div>
        ) : null}
      </Container>
    </section>
  );
}
