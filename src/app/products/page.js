import Header from "@/components/layout/Header.jsx";
import Footer from "@/components/layout/Footer.jsx";
import AllProducts from "@/components/Sections/AllProducts.jsx";
import { ProductsApi } from "@api/modules/products.api";
import { PRODUCT_PAGE_LIMIT } from "@config/apiConfig";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "All Products — cyber",
};

export default async function ProductsPage() {
  const response = await ProductsApi.getProducts({
    limit: PRODUCT_PAGE_LIMIT,
    skip: 0,
  });

  const initialData = response.status
    ? response.data
    : { products: [], total: 0, skip: 0, limit: PRODUCT_PAGE_LIMIT };

  return (
    <>
      <Header />
      <main>
        <AllProducts initialData={initialData} />
      </main>
      <Footer />
    </>
  );
}
