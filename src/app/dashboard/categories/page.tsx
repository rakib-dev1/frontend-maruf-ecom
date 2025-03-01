"use client";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import GetCategories from "@/lib/get_categories";
import React from "react";
interface Category {
  _id: string;
  label: string;
  subcategories: { href: string; label: string }[];
}
const Categories = () => {
  const [categories, setCategories] = React.useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = React.useState("");
  const [selectedSubCategory, setSelectedSubCategory] = React.useState("");
  console.log(selectedSubCategory);
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

  return (
    <React.Fragment>
      <h1 className="text-xl">Mange Categories</h1>
      <div className="grid grid-row-2 gap-3 ">
        <div>
          <h1>Categories:</h1>
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
                    ?.subcategories?.map((subCategory) => (
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
    </React.Fragment>
  );
};

export default Categories;
