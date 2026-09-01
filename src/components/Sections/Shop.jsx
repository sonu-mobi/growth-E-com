"use client";

import { useLayoutEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "@store/index";
import { mapProduct } from "@store/slices/productListSlice";
import {
  buildShopQuery,
  fetchShopProducts,
  hydrateShop,
  parseBrandParam,
  parseCategoryParam,
  setSelectedBrands,
} from "@store/slices/shopSlice";
import Container from "../Container.jsx";
import Heading from "../ui/Heading.jsx";
import Paragraph from "../ui/Paragraph.jsx";
import ProductGrid from "../ProductGrid.jsx";
import { ArrowIcon, FilterIcon } from "../icons/Icons.jsx";

const SORT_OPTIONS = [
  { id: "low", label: "Price: low to high" },
  { id: "high", label: "Price: high to low" },
];

const SHOP_BRANDS = [{ slug: "apple", name: "Apple" },
  { slug: "samsung", name: "Samsung" },
  { slug: "google", name: "Google" },
  { slug: "microsoft", name: "Microsoft" },
  { slug: "amazon", name: "Amazon" },
  { slug: "facebook", name: "Facebook" },
  { slug: "twitter", name: "Twitter" },
  { slug: "instagram", name: "Instagram" },
  { slug: "linkedin", name: "LinkedIn" },
  { slug: "youtube", name: "YouTube" },
];

export default function Shop({ initialData = null }) {
  const dispatch = useDispatch();
  const {
    categories,
    selectedCategories,
    selectedBrands,
    products,
    paging,
    loading,
    loadingMore,
    error,
  } = useSelector((state) => state.shop);
  const [sort, setSort] = useState("low");
  const [sortOpen, setSortOpen] = useState(false);
  const [categoryOpen, setCategoryOpen] = useState(true);
  const [brandOpen, setBrandOpen] = useState(true);
  const [ready, setReady] = useState(false);

  useLayoutEffect(() => {
    if (initialData) dispatch(hydrateShop(initialData));
    setReady(true);
  }, [dispatch, initialData]);

  useLayoutEffect(() => {
    function onPopState() {
      const params = new URLSearchParams(window.location.search);
      const slugs = parseCategoryParam(params.get("category"));
      const brands = parseBrandParam(params.get("brand"));
      dispatch(setSelectedBrands(brands));
      dispatch(fetchShopProducts({ categories: slugs }));
    }

    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, [dispatch]);

  const fallbackItems = (initialData?.products || []).map(mapProduct);
  const visibleItems = products.length ? products : loading ? [] : fallbackItems;
  const visibleCategories = categories.length ? categories : initialData?.categories || [];
  const activeSlugs = ready
    ? selectedCategories
    : initialData?.selectedCategories || [];
  const activeBrands = ready ? selectedBrands : initialData?.selectedBrands || [];
  const total = paging.total || initialData?.total || 0;
  const hasMore = !activeSlugs.length && visibleItems.length < total;

  const sortedItems = useMemo(() => {
    const list = [...visibleItems];
    list.sort((a, b) =>
      sort === "high" ? (b.price || 0) - (a.price || 0) : (a.price || 0) - (b.price || 0)
    );
    return list;
  }, [visibleItems, sort]);
  console.log('sortedItems',sortedItems)

  const title = useMemo(() => {
    if (!activeSlugs.length) return "Shop";
    const names = activeSlugs.map((slug) => {
      const match = visibleCategories.find((item) => item.slug === slug);
      return match?.name || slug;
    });
    return names.join(", ");
  }, [activeSlugs, visibleCategories]);

  function toggleCategory(slug) {
    const next = activeSlugs[0] === slug ? [] : [slug];
    window.history.pushState(null, "", buildShopQuery({ categories: next, brands: activeBrands }));
    dispatch(fetchShopProducts({ categories: next }));
  }

  function toggleBrand(slug) {
    const next = activeBrands.includes(slug)
      ? activeBrands.filter((item) => item !== slug)
      : [...activeBrands, slug];
    dispatch(setSelectedBrands(next));
    window.history.pushState(null, "", buildShopQuery({ categories: activeSlugs, brands: next }));
  }

  return (
    <section>
      <Container>
        <div className="mb-6 flex flex-wrap items-center gap-2">
          <Link href="/">
            <Paragraph as="span" variant="muted">
              Home
            </Paragraph>
          </Link>
          <Paragraph as="span" variant="muted">
            /
          </Paragraph>
          <Paragraph as="span" variant="body">
            Shop
          </Paragraph>
        </div>

        <div className="grid gap-8 laptop:grid-cols-[280px_minmax(0,1fr)]">
          <aside className="h-fit rounded-[12px] border border-black/10 p-5">
            <div className="mb-5 flex items-center justify-between">
              <Heading as="h2" variant="product" className="text-left uppercase tracking-wide">
                Filters
              </Heading>
              <FilterIcon className="h-5 w-5 text-black" />
            </div>

            <div className="border-t border-black/10 pt-4">
              <button
                type="button"
                className="mb-3 flex w-full items-center justify-between"
                onClick={() => setCategoryOpen((open) => !open)}
              >
                <Paragraph as="span" variant="body">
                  Category
                </Paragraph>
                <ArrowIcon className={categoryOpen ? "-rotate-90" : "rotate-90"} />
              </button>

              {categoryOpen ? (
                <div className="flex max-h-[280px] flex-col gap-3 overflow-y-auto pr-1">
                  {visibleCategories.map((category) => {
                    const checked = activeSlugs.includes(category.slug);
                    return (
                      <label
                        key={category.slug}
                        className="flex cursor-pointer items-center gap-3"
                      >
                        <input
                          type="radio"
                          name="shop-category"
                          checked={checked}
                          onChange={() => {
                            if (activeSlugs[0] !== category.slug) {
                              toggleCategory(category.slug);
                            }
                          }}
                          onClick={() => {
                            if (activeSlugs[0] === category.slug) {
                              toggleCategory(category.slug);
                            }
                          }}
                          className="h-4 w-4 accent-black"
                        />
                        <Paragraph as="span" variant="body">
                          {category.name}
                        </Paragraph>
                      </label>
                    );
                  })}
                </div>
              ) : null}
            </div>

            <div className="mt-4 border-t border-black/10 pt-4">
              <button
                type="button"
                className="mb-3 flex w-full items-center justify-between"
                onClick={() => setBrandOpen((open) => !open)}
              >
                <Paragraph as="span" variant="body">
                  Brand
                </Paragraph>
                <ArrowIcon className={brandOpen ? "-rotate-90" : "rotate-90"} />
              </button>

              {brandOpen ? (
                <div className="flex flex-col gap-3">
                  {SHOP_BRANDS.map((brand) => {
                    const checked = activeBrands.includes(brand.slug);
                    return (
                      <label
                        key={brand.slug}
                        className="flex cursor-pointer items-center gap-3"
                      >
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() => toggleBrand(brand.slug)}
                          className="h-4 w-4 accent-black"
                        />
                        <Paragraph as="span" variant="body">
                          {brand.name}
                        </Paragraph>
                      </label>
                    );
                  })}
                </div>
              ) : null}
            </div>
          </aside>

          <div>
            <div className="mb-6 flex flex-col gap-4 tablet:flex-row tablet:items-center tablet:justify-between">
              <Heading as="h1" variant="section" className="uppercase">
                {title}
              </Heading>
              <div className="flex flex-wrap items-center gap-4">
                <Paragraph variant="muted">
                  Showing {sortedItems.length} out of {total || sortedItems.length}
                </Paragraph>
                <div className="relative">
                  <button
                    type="button"
                    className="flex min-w-[180px] items-center justify-between gap-3 rounded-[8px] border border-black/15 px-4 py-2"
                    onClick={() => setSortOpen((open) => !open)}
                  >
                    <Paragraph as="span" variant="body">
                      {SORT_OPTIONS.find((option) => option.id === sort)?.label}
                    </Paragraph>
                    <ArrowIcon className={sortOpen ? "-rotate-90" : "rotate-90"} />
                  </button>
                  {sortOpen ? (
                    <div className="absolute right-0 z-10 mt-1 min-w-full overflow-hidden rounded-[8px] border border-black/15 bg-white shadow-sm">
                      {SORT_OPTIONS.map((option) => (
                        <button
                          key={option.id}
                          type="button"
                          className="block w-full px-4 py-2 text-left hover:bg-[#F6F6F6]"
                          onClick={() => {
                            setSort(option.id);
                            setSortOpen(false);
                          }}
                        >
                          <Paragraph as="span" variant="body">
                            {option.label}
                          </Paragraph>
                        </button>
                      ))}
                    </div>
                  ) : null}
                </div>
              </div>
            </div>

            <ProductGrid
              items={sortedItems}
              loading={loading}
              loadingMore={loadingMore}
              hasMore={hasMore}
              error={error}
              onLoadMore={() => dispatch(fetchShopProducts({ append: true, categories: [] }))}
              gridClassName="grid gap-4 tablet:grid-cols-2 laptop:grid-cols-3"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
