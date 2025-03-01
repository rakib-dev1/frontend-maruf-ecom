import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import React from "react";

import { ReactNode } from "react";

const DashboardLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <React.Fragment>
      <div className="grid grid-cols-4 gap-3">
        <div className="border col-span-1  min-h-screen p-5">
          <h1>Dashboard</h1>
          <Separator />
          <ul className="mt-5">
            <li className="hover:text-blue-600 hover:font-bold">
              {" "}
              <Link href="/dashboard/add-new-products">Add Products</Link>
            </li>
            <li className="hover:text-blue-600 hover:font-bold">
              {" "}
              <Link href="/dashboard/categories">Categories</Link>
            </li>
            <li>Customers</li>
            <li>Settings</li>
          </ul>
        </div>
        <div className="col-span-3">{children}</div>
      </div>
    </React.Fragment>
  );
};

export default DashboardLayout;
