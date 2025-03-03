import { Button } from "@/components/ui/button";

import Image from "next/image";
import Link from "next/link";
import React from "react";

interface Product {
  _id: string;
  title: string;
  images: Array<string>;
  price: number;
}

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const { title, images, price } = product;
  const firstImage = Array.isArray(images) && images[0];
  const replaceTitle = title.replace(/-/g, " ").replace(/\s+/g, " ");

  return (
    <React.Fragment>
      <div className="mt-4">
        <Link href={`/products/${product.title}`}>
          <div className="mx-auto relative h-[278px] w-[185px]  border border-transparent hover:border-blue-600  transition-transform duration-300 ease">
            <Image
              priority
              className="w-full h-[185px] object-contain repeat-0 m-auto"
              src={firstImage || "/path/to/default/image.jpg"}
              alt={title}
              width={200}
              height={100}
            />
            <div className="p-1">
              <h1 className="text-sm capitalize">
                {replaceTitle.length > 20
                  ? `${replaceTitle.slice(0, 20)}...`
                  : replaceTitle}
              </h1>
              <p className="text-sm">Rating: 43</p>

              <p>${price}</p>
              <Button className="absolute bottom-1 right-3" size="sm">
                Buy Now
              </Button>
            </div>
          </div>
        </Link>
      </div>
    </React.Fragment>
  );
};

export default ProductCard;
