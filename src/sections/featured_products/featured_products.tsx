import LatestProducts from "@/components/client-components/latest_products/latest_products";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import React from "react";

const LatestProductsSection = () => {
  return (
    <React.Fragment>
      <div className="flex justify-between items-center my-3">
        <div>
          <h1 className="text-2xl font-bold">Latest Products</h1>
        </div>
        <div>
          <Link href="/products">
            <Button>View All</Button>
          </Link>
        </div>
      </div>
      <Separator />
      <div>
        <LatestProducts />
      </div>
    </React.Fragment>
  );
};

export default LatestProductsSection;
