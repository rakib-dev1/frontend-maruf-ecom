"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";

const FilterByPrice = () => {
  const [minPrice, setMinPrice] = React.useState<string>("");
  const [maxPrice, setMaxPrice] = React.useState<string>("");
  console.log(minPrice, maxPrice);

  return (
    <React.Fragment>
      <div className="">
        <h2 className="text-2xl ">Filter By Price</h2>

        <div className="flex justify-between my-2 gap-3">
          <Input
            onChange={(e) => setMinPrice(e.target.value)}
            type="number"
            placeholder="$Min "
          />
          <Input
            onChange={(e) => setMaxPrice(e.target.value)}
            type="number"
            placeholder="$Max "
          />
          <Button>Filter</Button>
        </div>
      </div>
    </React.Fragment>
  );
};

export default FilterByPrice;
