"use client";

import { useLayoutEffect } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "@store/index";
import { fetchProducts, hydrateProducts, mapProduct } from "@store/slices/productListSlice";
import Container from "../Container.jsx";
import Heading from "../ui/Heading.jsx";
import Paragraph from "../ui/Paragraph.jsx";
import ProductGrid from "../ProductGrid.jsx";

export default function AllProducts({ initialData = null }) {
  const dispatch = useDispatch();
  const { products, paging, loading, loadingMore, error } = useSelector(
    (state) => state.productList
  );

  useLayoutEffect(() => {
    if (initialData?.products?.length) {
      dispatch(hydrateProducts(initialData));
    }
  }, [dispatch, initialData]);

  const fallbackItems = (initialData?.products || []).map(mapProduct);
  const visibleItems = products.length ? products : fallbackItems;
  const total = paging.total || initialData?.total || 0;
  const hasMore = visibleItems.length < total;

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
            All Products
          </Paragraph>
        </div>

        <div className="mb-8 flex flex-col gap-3 tablet:flex-row tablet:items-end tablet:justify-between">
          <Heading as="h1" variant="section">
            All Products
          </Heading>
          <Paragraph variant="muted">
            Showing {visibleItems.length} of {total || visibleItems.length} products
          </Paragraph>
        </div>

        <ProductGrid
          items={visibleItems}
          loading={loading}
          loadingMore={loadingMore}
          hasMore={hasMore}
          error={error}
          onLoadMore={() => dispatch(fetchProducts({ append: true }))}
        />
      </Container>
    </section>
  );
}
