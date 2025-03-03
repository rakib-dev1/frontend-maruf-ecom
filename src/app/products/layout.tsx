import Image from "next/image";
import React from "react";
import darazImg from "@/assets/darazimg.png";
const ProductsLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <React.Fragment>
      <div className="flex lg:px-10">
        <div>{children}</div>
        <div className="hidden lg:block">
          <Image src={darazImg} alt="image" />
        </div>
      </div>
    </React.Fragment>
  );
};

export default ProductsLayout;
