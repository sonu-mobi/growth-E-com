import Container from "../Container.jsx";
import Heading from "../ui/Heading.jsx";
import ProductCard from "../ProductCard.jsx";
import { PRODUCTS } from "../../data/home.js";

export default function DiscountProducts() {
  const items = PRODUCTS.filter((p) => p.oldPrice).slice(0, 4);

  return (
    <section>
      <Container>
        <Heading as="h2" variant="section" className="mb-8">
          Discounts up to -50%
        </Heading>
        <div className="grid gap-4 tablet:grid-cols-2 laptop:grid-cols-4">
          {items.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </Container>
    </section>
  );
}
