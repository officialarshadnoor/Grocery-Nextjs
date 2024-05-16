import GlobalApi from "@/app/_utils/GlobalApi";
import React from "react";
import TopCategoryList from "../_components/TopCategoryList";
import ProductList from "@/app/_components/ProductList";

async function ProductCategory({ params }) {
  const catProductList = await GlobalApi.getProductsByCategory(
    params?.categoryName
  );
  const categoryList = await GlobalApi.getCategoryList();
  return (
    <div>
      <h2 className="p-4 bg-primary text-white font-bold text-3xl text-center">
        {decodeURIComponent(params.categoryName)}
      </h2>
      <TopCategoryList categoryList={categoryList} />
      <div className="p-5 md:p-10">
        <ProductList productList={catProductList} />
      </div>
    </div>
  );
}

export default ProductCategory;
