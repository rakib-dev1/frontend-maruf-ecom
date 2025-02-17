import { Button } from "@/components/ui/button";

import Image from "next/image";
import Link from "next/link";
import React from "react";

interface Product {
  _id: string;
  title: string;
  image: string;
  price: number;
}

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const { title, image, price } = product;

  return (
    <React.Fragment>
      <Link href={`/products/${product._id}`}>
        <div className="p-3 mt-2 mb-2 mx-auto relative h-[278px] w-[185px]   border border-transparent hover:border-blue-600  transition-transform duration-300 ease">
          <Image
            priority
            className="w-full h-[185px] object-contain repeat-0 m-auto"
            src={image}
            alt={title}
            width={200}
            height={100}
          />
          <h1 className="mt-3 text-sm">
            {title.replace(/-/g, " ").replace(/\s+/g, " ")}
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
