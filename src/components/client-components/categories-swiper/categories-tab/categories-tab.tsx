"use client";
import { Button } from "@/components/ui/button";
import GetCategories from "@/lib/get_categories";
import { ChevronDown, ChevronUp } from "lucide-react";
import Link from "next/link";
import React from "react";

interface Category {
  _id: string;
  label: string;
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
    <React.Fragment>
      <ul>
        {categories?.map((c) => (
          <div key={c.label}>
            {/* Category Label */}
            <Button
              variant="ghost"
              className="w-full text-left flex justify-between items-center"
              onClick={() => {
                toggleCategory(c.label);
              }}
            >
              <Link href={`/products?category=${encodeURIComponent(c.label)}`}>
                {c.label}
              </Link>
              {expandedCategory === c.label ? (
                <ChevronUp className="w-5 h-5" />
              ) : (
                <ChevronDown className="w-5 h-5" />
              )}
            </Button>

            {/* Subcategories (Toggle Visibility) */}
            <ul
              className={`ml-4 overflow-hidden transition-max-height duration-300 ease-in-out ${
                expandedCategory === c.label ? "max-h-screen" : "max-h-0"
              }`}
            >
              {c.subcategories?.map((subcategory) => (
                <li key={subcategory.label} className="text-left my-2">
                  <Link
                    href={`/products?category=${encodeURIComponent(
                      subcategory.label
                    )}`}
                  >
                    {subcategory.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </ul>
    </React.Fragment>
  );
};

export default CategoriesTabs;
