import CategoriesTabs from "@/components/client-components/categories-swiper/categories-tab/categories-tab";
import FilterByColor from "@/components/shared/sidebar-products-page/filter-by-color/filter_by_color";
import FilterByPrice from "@/components/shared/sidebar-products-page/filter-by-price/filter_by_price";
import FilterBySize from "@/components/shared/sidebar-products-page/filter_by_size/filter_by_size";
import { Separator } from "@/components/ui/separator";
import React, { Suspense } from "react";

const ProductsLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <React.Fragment>
      <div className="grid-cols-none lg:grid lg:grid-cols-5 gap-3">
        {/* Left Section */}
        <div className="hidden lg:block col-span-1 mx-4 sticky top-24 ">
          <Separator />
          <Suspense fallback={<p>Loading...</p>}>
            <CategoriesTabs />
            <FilterByPrice />
            <FilterByColor />
            <FilterBySize />
          </Suspense>
        </div>

        {/* Main Content */}
        <div className="border col-span-4">{children}</div>
      </div>
    </React.Fragment>
  );
};

export default ProductsLayout;
