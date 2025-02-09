import { Separator } from "@/components/ui/separator";
import React from "react";

import { ReactNode } from "react";

const DashboardLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <React.Fragment>
      <div className="grid grid-cols-4 gap-3">
        <div className="border col-span-1">
          <h1>Dashboard</h1>
          <Separator />
          <ul className="mt-5">
            <li>Dashboard</li>
            <li>New Products</li>
            <li>Orders</li>
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
