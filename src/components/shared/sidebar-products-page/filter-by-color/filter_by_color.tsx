"use client";
import React, { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

const colors = [
  { label: "Red", value: "red" },
  { label: "Green", value: "green" },
  { label: "Blue", value: "blue" },
];

export default function FilterByColor() {
  const [checkedColors, setCheckedColors] = useState<string[]>([]);

  const toggleColor = (color: string) => {
    setCheckedColors((prev) =>
      prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color]
    );
  };

  return (
    <React.Fragment>
      <h1>Filter By Color</h1>
      <div className="">
        {colors.map((color) => (
          <div key={color.value} className="flex items-center space-x-2">
            <Checkbox
              id={color.value}
              checked={checkedColors.includes(color.value)}
              onCheckedChange={() => toggleColor(color.value)}
            />
            <div
              className="w-6 h-6 rounded-full border border-gray-300"
              style={{ backgroundColor: color.value }}
            ></div>
            <Label
              htmlFor={color.value}
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {color.label}
            </Label>
          </div>
        ))}
      </div>
    </React.Fragment>
  );
}
