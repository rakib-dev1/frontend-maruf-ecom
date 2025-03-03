"use client";
import ProductImageViewer from "@/components/client-components/product_image_viewer/product_image_viewer";
import AxiosPublic from "@/services/axios-public";
import { useParams } from "next/navigation";
import React, { useEffect, useMemo } from "react";
import { Rating } from "@smastrom/react-rating";

import "@smastrom/react-rating/style.css";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
type Product = {
  sizes: string;
  description: string;
  title: string;
  price: number;
  images: string[];
};

const SingleProducts = () => {
  const axiosPublic = AxiosPublic();
  const params = useParams();
  const title = useMemo(() => {
    const id = params?.id;
    return Array.isArray(id) ? id[0] : id;
  }, [params]);

  const [product, setProduct] = React.useState<Product[]>([]);
  console.log(product[0]?.description);

  useEffect(() => {
    if (!title) return; // Prevent fetching if title is not available

    const fetchSingleProduct = async () => {
      try {
        const res = await axiosPublic.get(
          `/products/${encodeURIComponent(title)}`
        );
        setProduct(res?.data);
      } catch (error) {
        console.error("Error fetching single product:", error);
      }
    };

    fetchSingleProduct();
  }, [axiosPublic, title]);

  return (
    <React.Fragment>
      <div className="mx-3 lg:mx-auto lg:max-w-7xl  md:p-6 lg:p-8">
        <div className="grid gap-8 md:grid-cols-2">
          {/* Product images */}
          <div>
            <ProductImageViewer images={product[0]?.images} />
          </div>
          {/* Product details */}
          <div className="space-y-4">
            <h1 className="text-3xl font-bold capitalize">
              {product[0]?.title &&
                product[0]?.title.replace(/-/g, " ").replace(/\s+/g, " ")}
            </h1>
            <Rating style={{ maxWidth: 120 }} value={3} readOnly />
            <p className="text-2xl font-semibold">${product[0]?.price}</p>
            {product[0] &&
              JSON.parse(product[0]?.sizes || "[]").map(
                (s: string, index: number) => (
                  <label key={index}>
                    <Checkbox value={s} />
                    {s}
                  </label>
                )
              )}

            <div className="prose">
              <p>
                This is an example product description. The product image viewer
                component allows customers to see different angles and details
                of the product by hovering over the thumbnails.
              </p>
            </div>
            <div className="flex gap-3">
              <Button className="bg-[#ef6322]">Buy Now</Button>
              <Button>Add to Cart</Button>
            </div>
          </div>
          <p>{product[0]?.description}</p>
        </div>
      </div>
    </React.Fragment>
  );
};

export default SingleProducts;
