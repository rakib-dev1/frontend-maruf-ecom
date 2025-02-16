"use client";
import React from "react";
const FilterBySize = () => {
  return (
    <React.Fragment>
      <h1>Filter By Size</h1>
      <ul>
        <li>
          <input
            type="checkbox"
            id="extra-small"
            name="size"
            value="extra-small"
          />
          <label htmlFor="extra-small">32</label>
        </li>
        <li>
          <input
            type="checkbox"
            id="extra-small"
            name="size"
            value="extra-small"
          />
          <label htmlFor="extra-small">34</label>
        </li>
        <li>
          <input
            type="checkbox"
            id="extra-small"
            name="size"
            value="extra-small"
          />
          <label htmlFor="extra-small">36</label>
        </li>
        <li>
          <input type="checkbox" id="small" name="size" value="small" />
          <label htmlFor="small">Small</label>
        </li>
        <li>
          <input type="checkbox" id="medium" name="size" value="medium" />
          <label htmlFor="medium">Medium</label>
        </li>
        <li>
          <input type="checkbox" id="large" name="size" value="large" />
          <label htmlFor="large">Large</label>
        </li>
      </ul>
    </React.Fragment>
  );
};

export default FilterBySize;
