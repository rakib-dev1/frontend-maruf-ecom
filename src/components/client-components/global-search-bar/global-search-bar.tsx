"use client";

import { Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function GlobalSearchBar() {
  return (
    <div className="w-full p-2">
      <div className="mx-auto flex max-w-3xl items-center ">
        <div className="relative flex-1">
          <Input
            type="search"
            placeholder="Search for products, categories, brands, sku..."
            className=" h-11  rounded-l-full rounded-r-full bg-white"
          />
          <div className="absolute right-0 top-0 h-full flex items-center">
            <Select>
              <SelectTrigger className="h-11 hidden md:flex w-[140px] rounded-none border-0 border-l border-r bg-white hover:bg-gray-50">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="electronics">Electronics</SelectItem>
                <SelectItem value="clothing">Clothing</SelectItem>
                <SelectItem value="books">Books</SelectItem>
                <SelectItem value="home">Home & Garden</SelectItem>
              </SelectContent>
            </Select>
            <Button
              size="icon"
              className="h-11 w-10 md:w-16 rounded-r-full bg-white hover:bg-gray-50"
            >
              <Search className="h-5 w-5 text-gray-500" />
              <span className="sr-only">Search</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
