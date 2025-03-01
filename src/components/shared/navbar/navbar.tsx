"use client";
import logo from "@/assets/logo/logo.png";
import ProfileSection from "@/components/admin/shared/profile_section/profile_section";
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
import GetCategories from "@/lib/get_categories";
import { ChevronDown, ChevronUp, Menu, ShoppingCart } from "lucide-react";
import { useSession } from "next-auth/react";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { Url } from "url";
interface NavItem {
  href: string;
  label: string;
  subcategories: {
    href: Url;
    label: string;
  }[];
}
const Navbar = () => {
  const { data: session, status } = useSession();

  const [navItems, setNavItems] = React.useState<NavItem[]>([]);
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const toggleCategory = (label: string) => {
    setExpandedCategory((prev) => (prev === label ? null : label));
  };
  React.useEffect(() => {
    const fetchNavItems = async () => {
      try {
        const response = await GetCategories();
        setNavItems(response);
      } catch (error) {
        console.error(error);
      }
    };
    fetchNavItems();
  }, []);

  return (
    <div className="bg-[#EF6322] h-[80px] md:h-[110px] py-3 px-1 sticky top-0 z-50">
      <nav className="flex items-center justify-between  px-4">
        {/* Left Side: Logo or Menu */}
        <div className="flex items-center ">
          <div className="hidden md:block text-lg font-bold">
            {/* <Image priority width={120} height={100} src={logo} alt="FMLIO" /> */}
            <Link href="/">
              <h1 className="text-4xl text-white ">FMLIO</h1>
            </Link>
          </div>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" className="md:hidden text-white p-2">
                <Menu className="w-6 h-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <SheetHeader>
                <SheetTitle>
                  <Link href="/">
                    {" "}
                    <Image
                      priority
                      width={120}
                      height={100}
                      src={logo}
                      alt="FMLIO"
                    />
                  </Link>
                </SheetTitle>
              </SheetHeader>
              <SheetDescription />
              <Separator />
              <div>
                {navItems?.map((item) => (
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
                      className={`ml-4 overflow-hidden   transition-max-height duration-300 ease-in-out ${
                        expandedCategory === item.label
                          ? "max-h-screen"
                          : "max-h-0"
                      }`}
                    >
                      {item?.subcategories?.map((subcategory) => (
                        <li key={subcategory.label} className="text-left  my-2">
                          <Link
                            href={`/products/${item.href}/${subcategory.label}`}
                          >
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

        <div className="flex items-center space-x-2">
          <div className="hidden md:block">
            {status === "loading" ? (
              <p>Loading...</p>
            ) : session ? (
              <ProfileSection />
            ) : (
              <Link href="/auth/login">
                <Button variant="outline" className="hidden md:block ">
                  Login/Signup
                </Button>
              </Link>
            )}
          </div>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" className="p-2 text-white">
                <ShoppingCart className="w-8 h-8" />
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
      </nav>
      {/* Secondary Navigation Bar */}

      <div className="hidden py-2  md:flex justify-center space-x-4 ">
        {navItems?.map((item) => (
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
              className={`absolute left-0 top-full mt-2 w-52 bg-white text-black shadow-lg rounded-b-xl overflow-hidden transition-max-height duration-300 ease-in-out ${
                expandedCategory === item.label ? "max-h-screen" : "max-h-0"
              }`}
            >
              {item?.subcategories?.map((subcategory) => (
                <li
                  key={subcategory.label}
                  className="text-left hover:text-white  px-4 py-2 hover:bg-[#EF6322]"
                >
                  <Link href={`/products${item.href}/${subcategory.label}`}>
                    {subcategory.label}
                  </Link>
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
