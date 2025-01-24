"use client";
import logo from "@/assets/logo/logo.webp";
import GlobalSearchBar from "@/components/client-components/global-search-bar/global-search-bar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import AxiosPublic from "@/services/axios-public";
import { ChevronDown, ChevronUp, Menu, ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { Url } from "url";
const Navbar = () => {
  const axiosPublic = AxiosPublic();
  interface NavItem {
    label: string;
    subcategories: {
      href: Url;
      label: string;
    }[];
  }
  const [navItems, setNavItems] = React.useState<NavItem[]>([]);
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const toggleCategory = (label: string) => {
    setExpandedCategory((prev) => (prev === label ? null : label));
  };
  React.useEffect(() => {
    const fetchNavItems = async () => {
      try {
        const response = await axiosPublic.get("/categories");
        setNavItems(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchNavItems();
  }, [axiosPublic]);
  console.log(navItems);

  return (
    <div className="bg-[#ed6212] py-3 sticky top-0 z-50">
      <nav className="flex items-center justify-between  px-8">
        {/* Left Side: Logo or Menu */}
        <div className="flex items-center ">
          <div className="hidden md:block text-lg font-bold">
            <Image width={120} height={100} src={logo} alt="FMLIO" />
          </div>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" className="md:hidden p-2">
                <Menu className="w-6 h-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <SheetHeader>
                <SheetTitle>
                  <Image width={120} height={100} src={logo} alt="FMLIO" />
                </SheetTitle>
              </SheetHeader>
              <SheetDescription />
              <Separator />
              <div>
                {navItems.map((item) => (
                  <div key={item.label}>
                    {/* Category Label */}
                    <Button
                      variant="ghost"
                      className="w-full text-left flex justify-between items-center"
                      onClick={() => toggleCategory(item.label)}
                    >
                      <span>{item.label}</span>
                      {expandedCategory === item.label ? (
                        <ChevronUp className="w-5 h-5" />
                      ) : (
                        <ChevronDown className="w-5 h-5" />
                      )}
                    </Button>

                    {/* Subcategories (Toggle Visibility) */}
                    <ul
                      className={`ml-4 overflow-hidden  transition-max-height duration-300 ease-in-out ${
                        expandedCategory === item.label
                          ? "max-h-screen"
                          : "max-h-0"
                      }`}
                    >
                      {item.subcategories.map((subcategory) => (
                        <li key={subcategory.label} className="text-left  my-2">
                          <Link href={subcategory.href}>
                            {subcategory.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Global Search bar */}
        <GlobalSearchBar />

        {/* Right Side: Cart Button and Login/Signup */}
        <Button variant="outline" className="hidden md:block mr-2">
          Login/Signup
        </Button>
        <div className="flex items-center space-x-2">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" className="p-2">
                <ShoppingCart className="w-6 h-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <SheetHeader>
                <SheetTitle>Cart</SheetTitle>
                <SheetDescription>
                  Review the items in your cart.
                </SheetDescription>
              </SheetHeader>
              <div className="space-y-2 mt-4">
                <p>Your cart is currently empty.</p>
              </div>
            </SheetContent>
          </Sheet>
        </div>
        {/* Secondary Navigation Bar */}
      </nav>

      <div className="hidden py-5 md:flex justify-center space-x-4 mt-2 bg-[#00A600]">
        {navItems.map((item) => (
          <div key={item.label} className="relative group">
            <button
              className="text-left  text-white flex justify-between items-center"
              onClick={() => toggleCategory(item.label)}
            >
              <span>{item.label}</span>
              {expandedCategory === item.label ? (
                <ChevronUp className="w-5 h-5" />
              ) : (
                <ChevronDown className="w-5 h-5" />
              )}
            </button>

            {/* Subcategories (Toggle Visibility) */}
            <ul
              className={`absolute left-0 top-full mt-5 text-black shadow-lg rounded-md overflow-hidden transition-max-height duration-300 ease-in-out ${
                expandedCategory === item.label ? "max-h-screen" : "max-h-0"
              }`}
            >
              {item.subcategories.map((subcategory) => (
                <li
                  key={subcategory.label}
                  className="text-left my-2 px-4 py-2 hover:bg-gray-100"
                >
                  <Link href={subcategory.href}>{subcategory.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Navbar;
