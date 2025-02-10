"use client";

import { Button } from "@/components/ui/button";
import GetCategories from "@/lib/get_categories";
import { ChevronDown, ChevronUp } from "lucide-react";
import Link from "next/link";
import React from "react";

interface Category {
  _id: string;
  label: string;
  href: string;
  subcategories: {
    href: string;
    label: string;
  }[];
}

const CategoriesTabs = () => {
  const [categories, setCategories] = React.useState<Category[]>([]);
  const [expandedCategory, setExpandedCategory] = React.useState<string | null>(
    null
  );

  const toggleCategory = (label: string) => {
    setExpandedCategory((prev) => (prev === label ? null : label));
  };

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
    <div className="w-64 border-r p-4">
      <h2 className="text-lg font-bold mb-3">Categories</h2>
      <ul>
        {categories?.map((c) => (
          <div key={c.label}>
            <Button
              variant="ghost"
              className="w-full text-left lowercase flex justify-between items-center"
              onClick={() => toggleCategory(c.label)}
            >
              <Link href={`/products${c.href}`}>{c.label}</Link>
              {expandedCategory === c.label ? (
                <ChevronUp className="w-5 h-5" />
              ) : (
                <ChevronDown className="w-5 h-5" />
              )}
            </Button>

            {/* Subcategories */}
            <ul
              className={`${
                expandedCategory === c.label ? "block" : "hidden"
              } ml-4`}
            >
              {c.subcategories?.map((subcategory) => (
                <li key={subcategory.label} className="text-left  my-2">
                  <Link
                    href={`/products${c.href}/${subcategory.label}`}
                    className="text-blue-500  hover:underline"
                  >
                    {subcategory.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default CategoriesTabs;
