import ProductCard from "./ProductCard.jsx";
import Paragraph from "./ui/Paragraph.jsx";
import Button from "./ui/Button.jsx";

export default function ProductGrid({
  items = [],
  loading = false,
  loadingMore = false,
  hasMore = false,
  error = null,
  onLoadMore,
  gridClassName = "grid gap-4 tablet:grid-cols-2 laptop:grid-cols-3 desktop:grid-cols-4",
}) {
  return (
    <>
      {error ? (
        <Paragraph variant="muted" className="mb-6 text-red-500">
          {error}
        </Paragraph>
      ) : null}

      <div className={gridClassName}>
        {loading && !items.length
          ? Array.from({ length: 8 }).map((_, index) => (
              <div
                key={`skeleton-${index}`}
                className="h-[360px] animate-pulse rounded-[9px] bg-[#F6F6F6]"
              />
            ))
          : items.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
      </div>

      {hasMore ? (
        <div className="mt-10 flex justify-center">
          <Button
            variant="secondary"
            onClick={onLoadMore}
            disabled={loadingMore}
            className="min-w-[220px]"
          >
            {loadingMore ? "Loading..." : "More products"}
          </Button>
        </div>
      ) : null}
    </>
  );
}
