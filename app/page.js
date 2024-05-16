import Image from "next/image";
import Sliders from "./_components/Sliders";
import GlobalApi from "./_utils/GlobalApi";
import CategoryList from "./_components/CategoryList";
import Footer from "./_components/Footer";
import HomeProductList from "./_components/HomeProductList";

export default async function Home() {
  const sliderList = await GlobalApi.getSliders();
  const categoryList = await GlobalApi.getCategoryList();

  const productsList = await GlobalApi.getAllProducts();
  return (
    <div className="p-5 md:p-10 px-16">
      {/* Sliders  */}
      <Sliders sliderList={sliderList} />
      <CategoryList categoryList={categoryList} />

      {/* Product List  */}
      <HomeProductList productsList={productsList} />

      {/* Banner  */}
      <Image
        src="/banner.jpg"
        width={1000}
        height={300}
        alt="Banner"
        className="w-full h-[400px] object-contain"
      />

      {/* Footer  */}

      <Footer />
    </div>
  );
}
