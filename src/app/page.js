import Header from "../components/layout/Header.jsx";
import Footer from "../components/layout/Footer.jsx";
import HomePageBanner from "../components/Sections/HomePageBanner.jsx";
import FeaturedBanners from "../components/Sections/FeaturedBanners.jsx";
import BrowseCategory from "../components/Sections/BrowseCategory.jsx";
import ProductTabs from "../components/Sections/ProductTabs.jsx";
import PopularProducts from "../components/Sections/PopularProducts.jsx";
import DiscountProducts from "../components/Sections/DiscountProducts.jsx";
import SummerSale from "../components/Sections/SummerSale.jsx";
import { ProductsApi } from "@api/modules/products.api";
import { PRODUCT_PAGE_LIMIT } from "@config/apiConfig";

export const dynamic = "force-dynamic";

export default async function HomePage() {
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
        <HomePageBanner />
        <FeaturedBanners />
        <BrowseCategory />
        <ProductTabs initialData={initialData} />
        <PopularProducts />
        <DiscountProducts />
        <SummerSale />
      </main>
      <Footer />
    </>
  );
}
