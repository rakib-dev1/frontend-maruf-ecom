"use client";

import Link from "next/link";
import { Home, Menu, MessageSquare, ShoppingCart, User } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function BottomNav() {
  return (
    <div className="fixed bottom-0 left-0 right-0 sm:block md:hidden">
      <nav className="flex h-16 items-center justify-between border-t bg-background px-4">
        <Button
          variant="ghost"
          size="sm"
          className="flex flex-col items-center gap-1 h-full"
          asChild
        >
          <Link href="#">
            <Menu className="h-5 w-5" />
            <span className="text-xs">Category</span>
          </Link>
        </Button>

        <Button
          variant="ghost"
          size="sm"
          className="flex flex-col items-center gap-1 h-full"
          asChild
        >
          <Link href="#">
            <MessageSquare className="h-5 w-5" />
            <span className="text-xs">Message</span>
          </Link>
        </Button>

        <Button
          variant="ghost"
          size="sm"
          className="flex flex-col items-center gap-1 h-full"
          asChild
        >
          <Link href="#">
            <div className="rounded-full bg-orange-500 p-3 -mt-8">
              <Home className="h-5 w-5 text-white" />
            </div>
            <span className="text-xs mt-1">Home</span>
          </Link>
        </Button>

        <Button
          variant="ghost"
          size="sm"
          className="flex flex-col items-center gap-1 h-full"
          asChild
        >
          <Link href="#">
            <ShoppingCart className="h-5 w-5" />
            <span className="text-xs">Cart (0)</span>
          </Link>
        </Button>

        <Button
          variant="ghost"
          size="sm"
          className="flex flex-col items-center gap-1 h-full"
          asChild
        >
          <Link href="#">
            <User className="h-5 w-5" />
            <span className="text-xs">Login</span>
          </Link>
        </Button>
      </nav>
    </div>
  );
}
