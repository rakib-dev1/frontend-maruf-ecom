import { Button } from "@/components/ui/button";
import { Badge, Eye, Heart, ShoppingCart, Star } from "lucide-react";
import Image from "next/image";
import React from "react";

interface Product {
  // Define the properties of the product here
  id: number;
  title: string;
  name: string;
  price: number;
  image: string;
}

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  console.log(product);
  const { title, image, price } = product;

  return (
    <div className="group relative w-[250px] border  h-[278px] bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 mt-5">
      {/* Image Container */}
      <div className="relative h-[170px]  overflow-hidden">
        <Image
          src={image}
          alt={title}
          width="0"
          height="0"
          sizes="100vw"
          className="object-cover w-full h-auto  transition-transform duration-700 group-hover:scale-110"
        />

        {/* Featured Badge */}

        <Badge className="absolute top-3 left-3 bg-orange-500 hover:bg-orange-600">
          FEATURED
        </Badge>

        {/* Wishlist Button */}
        <button className="absolute top-3 right-3 p-2 rounded-full bg-white opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
          <Heart className="w-4 h-4 text-gray-600 hover:text-red-500 transition-colors" />
        </button>

        {/* Quick Actions */}
        <div className="absolute bottom-0 left-0 right-0 flex items-center justify-center gap-2 p-3 bg-white/95 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-1.5 text-xs hover:bg-black hover:text-white transition-colors"
          >
            <Eye className="w-3.5 h-3.5" />
            Quick View
          </Button>
          <Button
            size="sm"
            className="flex items-center gap-1.5 text-xs bg-black hover:bg-gray-800"
          >
            <ShoppingCart className="w-3.5 h-3.5" />
            Add to Cart
          </Button>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4">
        <h3 className="mt-1 text-sm font-medium text-gray-900 line-clamp-1">
          {title}
        </h3>

        {/* Rating */}
        <div className="mt-1.5 flex items-center gap-1">
          <div className="flex items-center">
            <Star className="w-4" />
          </div>
          <span className="text-xs text-gray-500">({3})</span>
        </div>

        {/* Price */}
        <div className="mt-2 text-base font-bold text-gray-900">
          ${price?.toFixed(2)}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
