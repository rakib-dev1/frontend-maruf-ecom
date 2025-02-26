"use client";

import Link from "next/link";
import {
  User,
  ShoppingBag,
  Heart,
  Star,
  RotateCcw,
  LogOut,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { signOut, useSession } from "next-auth/react";

export default function ProfileSection() {
  const { data: session, status } = useSession();
  if (status === "loading") return <div>Loading...</div>;

  const menuItems = [
    {
      icon: <User className="h-4 w-4" />,
      label: "Manage My Account",
      href: "/account",
    },
    {
      icon: <ShoppingBag className="h-4 w-4" />,
      label: "My Orders",
      href: "/orders",
    },
    {
      icon: <Heart className="h-4 w-4" />,
      label: "My Wishlist & Followed Stores",
      href: "/wishlist",
    },
    {
      icon: <Star className="h-4 w-4" />,
      label: "My Reviews",
      href: "/reviews",
    },
    {
      icon: <RotateCcw className="h-4 w-4" />,
      label: "My Returns & Cancellations",
      href: "/returns",
    },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full">
          <Avatar className="h-10 w-10">
            <AvatarImage src="https://github.com/shadcn.png" alt="Profile" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-80" align="end">
        <div className="flex items-center gap-4 p-4">
          <Avatar className="h-12 w-12">
            <AvatarImage src="https://github.com/shadcn.png" alt="Profile" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {session?.user?.name}
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              {session?.user?.email}
            </p>
          </div>
        </div>
        <DropdownMenuSeparator />
        <div className="p-2">
          {menuItems.map((item) => (
            <DropdownMenuItem key={item.label} asChild>
              <Link
                href={item.href}
                className="flex items-center gap-3 px-3 py-2"
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            </DropdownMenuItem>
          ))}

          <DropdownMenuItem asChild>
            <Button
              onClick={() => signOut()}
              variant="ghost"
              className=" w-full justify-start cursor-pointer border border-red-600 flex items-center gap-3 px-3 py-2"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
