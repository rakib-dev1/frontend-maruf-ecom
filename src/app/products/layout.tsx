import CategoriesTabs from "@/components/client-components/categories-swiper/categories-tab/categories-tab";
import { Separator } from "@/components/ui/separator";
import React, { Suspense } from "react";

const ProductsLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <React.Fragment>
      <div className="grid-cols-none lg:grid lg:grid-cols-5 gap-3">
        <div className="hidden lg:block border col-span-1">
          <h1>Product Categories</h1>
          <Separator />
          <Suspense fallback={<p>Loading...</p>}>
            <CategoriesTabs />
          </Suspense>
        </div>
        <div className="border col-span-4">{children}</div>
      </div>
    </React.Fragment>
  );
};

export default ProductsLayout;
