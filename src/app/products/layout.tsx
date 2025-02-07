import CategoriesTabs from "@/components/client-components/categories-swiper/categories-tab/categories-tab";
import { Separator } from "@/components/ui/separator";
import React, { Suspense } from "react";
import Loading from "./loading";

const ProductsLayout = () => {
  return (
    <React.Fragment>
      <div className="grid grid-flow-col grid-cols-5">
        <div className="border col-span-1">
          <h1>Product Categories</h1>
          <Separator />
          <Suspense fallback={<Loading />}>
            <CategoriesTabs />
          </Suspense>
        </div>
        <div className="border col-span-4">all products</div>
      </div>
    </React.Fragment>
  );
};

export default ProductsLayout;
