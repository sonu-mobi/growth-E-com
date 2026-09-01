import Header from "@/components/layout/Header.jsx";
import Footer from "@/components/layout/Footer.jsx";
import Shop from "@/components/Sections/Shop.jsx";
import { CategoriesApi } from "@api/modules/categorie.api";
import { loadShopProducts, parseBrandParam, parseCategoryParam } from "@store/slices/shopSlice";
import { SHOP_PAGE_LIMIT } from "@config/apiConfig";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Shop — cyber",
};

export default async function CategoriePage({ searchParams }) {
  const params = await searchParams;
  const selectedCategories = parseCategoryParam(params.category);
  const selectedBrands = parseBrandParam(params.brand);

  const [categoriesResponse, productsResponse] = await Promise.all([
    CategoriesApi.getCategories(),
    loadShopProducts(selectedCategories, { limit: SHOP_PAGE_LIMIT, skip: 0 }),
  ]);

  const productData = productsResponse.status
    ? productsResponse.data
    : { products: [], total: 0, skip: 0, limit: SHOP_PAGE_LIMIT };

  const initialData = {
    categories: categoriesResponse.status ? categoriesResponse.data : [],
    selectedCategories,
    selectedBrands,
    products: productData.products || [],
    total: productData.total || 0,
    skip: productData.skip || 0,
    limit: productData.limit || SHOP_PAGE_LIMIT,
  };

  console.log("initialData", initialData);
  return (
    <>
      <Header />
      <main>
        <Shop initialData={initialData} />
      </main>
      <Footer />
    </>
  );
}
