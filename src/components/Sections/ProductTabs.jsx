"use client";

import { useLayoutEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "@store/index";
import { hydrateProducts, mapProduct } from "@store/slices/productListSlice";
import Container from "../Container.jsx";
import Paragraph from "../ui/Paragraph.jsx";
import Button from "../ui/Button.jsx";
import ProductGrid from "../ProductGrid.jsx";

const TABS = [
  { id: "new", label: "New Arrival" },
  { id: "bestseller", label: "Bestseller" },
  { id: "featured", label: "Featured Products" },
];

export default function ProductTabs({ initialData = null }) {
  const dispatch = useDispatch();
  const { products, paging, loading, error } = useSelector((state) => state.productList);
  const [tab, setTab] = useState("new");

  useLayoutEffect(() => {
    if (initialData?.products?.length) {
      dispatch(hydrateProducts(initialData));
    }
  }, [dispatch, initialData]);

  const items = useMemo(() => {
    const list = [...products];
    if (tab === "bestseller") {
      return list.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    }
    if (tab === "featured") {
      return list.sort((a, b) => (b.discountPercentage || 0) - (a.discountPercentage || 0));
    }
    return list;
  }, [products, tab]);

  const fallbackItems = (initialData?.products || []).map(mapProduct);
  const visibleItems = items.length ? items : fallbackItems;

  return (
    <section>
      <Container>
        <div className="mb-8 flex flex-col gap-4 tablet:flex-row tablet:items-end tablet:justify-between">
          <div className="flex flex-wrap gap-6">
            {TABS.map((item) => (
              <button key={item.id} onClick={() => setTab(item.id)} className="relative pb-1">
                <Paragraph
                  as="span"
                  variant="nav"
                  className={tab === item.id ? "text-black" : "text-[#8B8B8B]"}
                >
                  {item.label}
                </Paragraph>
                {tab === item.id ? (
                  <span className="absolute inset-x-0 -bottom-0.5 h-0.5 bg-black" />
                ) : null}
              </button>
            ))}
          </div>
          <Paragraph variant="muted">
            Showing {visibleItems.length} of {paging.total || visibleItems.length} products
          </Paragraph>
        </div>

        <ProductGrid items={visibleItems} loading={loading} error={error} />

        <div className="mt-10 flex justify-center">
          <Button variant="secondary" href="/products" className="min-w-[220px]">
            View all products
          </Button>
        </div>
      </Container>
    </section>
  );
}
