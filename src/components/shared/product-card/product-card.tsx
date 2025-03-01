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
      <Link href={`/products/${product._id}`}>
        <div className="p-3 mt-2 mb-2 mx-auto relative h-[278px] w-[185px]   border border-transparent hover:border-blue-600  transition-transform duration-300 ease">
          <Image
            priority
            className="w-full h-[185px] object-contain repeat-0 m-auto"
            src={firstImage || "/path/to/default/image.jpg"}
            alt={title}
            width={200}
            height={100}
          />
          <h1 className="mt-3 text-sm capitalize">
            {replaceTitle.length > 20
              ? `${replaceTitle.slice(0, 25)}...`
              : replaceTitle}
          </h1>
          <p>Rating: 43</p>

          <p>${price}</p>
          <Button className="absolute bottom-1 right-3" size="sm">
            Buy Now
          </Button>
        </div>
      </Link>
    </React.Fragment>
  );
};

export default ProductCard;
