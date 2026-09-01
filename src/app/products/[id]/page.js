import { notFound } from "next/navigation";
import Header from "@/components/layout/Header.jsx";
import Footer from "@/components/layout/Footer.jsx";
import ProductDetail from "@/components/Sections/ProductDetail.jsx";
import { ProductsApi } from "@api/modules/products.api";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }) {
  const { id } = await params;
  const response = await ProductsApi.getProduct(id);
  const title = response.status ? response.data.title : "Product";
  return { title: `${title} — cyber` };
}

export default async function ProductPage({ params }) {
  const { id } = await params;
  const productResponse = await ProductsApi.getProduct(id);

  if (!productResponse.status || !productResponse.data?.id) {
    notFound();
  }

  const relatedResponse = await ProductsApi.getProductsByCategory(
    productResponse.data.category,
    { limit: 5 }
  );

  return (
    <>
      <Header />
      <main>
        <ProductDetail
          initialProduct={productResponse.data}
          initialRelated={relatedResponse.status ? relatedResponse.data.products : []}
        />
      </main>
      <Footer />
    </>
  );
}
