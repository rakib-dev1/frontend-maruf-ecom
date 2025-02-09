"use client";
import GetCategories from "@/lib/get_categories";
import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const AddNewProducts = () => {
  interface Category {
    _id: string;
    label: string;
    subcategories: { href: string; label: string }[];
  }

  const [categories, setCategories] = React.useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = React.useState("");
  const [selectedSubCategory, setSelectedSubCategory] = React.useState("");
  React.useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await GetCategories();
        setCategories(response);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCategories();
  }, []);
  console.log(selectedSubCategory);
  return (
    <div className="grid grid-cols-2 gap-3 mt-5">
      <div>
        <Select onValueChange={(value) => setSelectedCategory(value)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select Main Categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Select Categories</SelectLabel>
              {categories.map((category) => (
                <SelectItem key={category._id} value={category.label}>
                  {category.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div>
        {selectedCategory && (
          <Select onValueChange={(value) => setSelectedSubCategory(value)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Sub Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Select Sub Categories</SelectLabel>
                {categories
                  .find((c) => c.label === selectedCategory)
                  ?.subcategories.map((subCategory) => (
                    <SelectItem
                      key={subCategory.href}
                      value={subCategory.label}
                    >
                      {subCategory.label}
                    </SelectItem>
                  ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        )}
      </div>
      
    </div>
  );
};

export default AddNewProducts;
