"use client";
import React, { useEffect, useState } from "react";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";

const ProductFilter = ({ onFilterChange, filters }) => {
  const [sortBy, setSortBy] = useState(""); // Ensure consistent type
  const [size, setSelectedSize] = useState(""); 
  const [brand, setSelectedBrand] = useState(""); 
  const [color, setSelectedColor] = useState(""); 
  const [showSort, setShowSort] = useState(true);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);

  // 🔥 Fix: Ensure consistent initial state when resetting filters
  // useEffect(() => {
  //   if (Object.keys(filters).length === 0) {
  //     setMinPrice(0);
  //     setMaxPrice(0);
  //     setSelectedBrand(""); 
  //     setSelectedColor(""); 
  //     setSelectedSize(""); 
  //     setSortBy("");
  //   }
  // }, [filters]);

  useEffect(() => {
    if (filters && Object.keys(filters).length === 0) {
      setMinPrice(0);
      setMaxPrice(0);
      setSelectedBrand([]);
      setSelectedColor([]);
      setSelectedSize([]);
      setSortBy("");
    }
  }, [filters]);

  const handleSortChange = (sort) => {
    setSortBy(sort);
    triggerFilterChange({ sortBy: sort });
  };

  const handleBrandChange = (selectedBrand) => {
    setSelectedBrand([selectedBrand]);
    triggerFilterChange({ brand: selectedBrand });
  };

  const handleColorChange = (selectedColor) => {
    setSelectedColor([selectedColor]);
    triggerFilterChange({ color: selectedColor });
  };

  const handleSizeChange = (selectedSize) => {
    setSelectedSize([selectedSize]);
    triggerFilterChange({ size: selectedSize });
  };

  const handleMinPriceChange = (min) => {
    setMinPrice(Number(min));
    triggerFilterChange({ minPrice: Number(min) });
  };

  const handleMaxPriceChange = (max) => {
    setMaxPrice(Number(max));
    triggerFilterChange({ maxPrice: Number(max) });
  };

  const triggerFilterChange = (updateFilter) => {
    onFilterChange({
      sortBy,
      size,
      brand,
      color,
      minPrice,
      maxPrice,
      ...updateFilter,
    });
  };

  return (
    <div className="p-4 bg-white shadow rounded-lg">
      {/* Sort Section */}
      <div className="mb-4 border-b">
        <div
          className="flex items-center justify-between cursor-pointer"
          onClick={() => setShowSort(!showSort)}
        >
          <h1 className="font-semibold mb-2">Sort By</h1>
          {showSort ? <MdKeyboardArrowDown /> : <MdKeyboardArrowUp />}
        </div>
        {showSort && (
          <div className="mb-4">
            {["newest", "price-low-to-high", "price-high-to-low"].map((item) => (
              <label key={item} htmlFor={`sort-${item}`} className="flex items-center mb-2 gap-3">
                <input
                  type="radio"
                  id={`sort-${item}`} 
                  name="sort"
                  onChange={() => handleSortChange(item)}
                  checked={sortBy === item}
                />
                {item.replace("-", " ")}
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Price Section */}
      <div className="mb-4 border-b">
        <h1 className="font-semibold mb-2">Price</h1>
        <div className="flex items-center mb-2 gap-3">
          <input
            type="number"
            className="w-1/2 p-1 border rounded mr-2"
            value={minPrice || ""}
            onChange={(e) => handleMinPriceChange(e.target.value)}
          />
          <input
            type="number"
            className="w-1/2 p-1 border rounded"
            value={maxPrice || ""}
            onChange={(e) => handleMaxPriceChange(e.target.value)}
          />
        </div>
      </div>

      {/* Brand Section */}
      <div className="mb-4 border-b">
        <h1 className="font-semibold mb-2">Brand</h1>
        {["Reebok", "Levis", "Puma"].map((item) => (
          <label key={item} htmlFor={`brand-${item}`} className="flex items-center mb-2 gap-3">
            <input
              type="radio"
              id={`brand-${item}`} 
              name="brand"
              onChange={() => handleBrandChange(item)}
              checked={brand?.includes(item)} // 🔥 Fix: Ensure array consistency
            />
            {item}
          </label>
        ))}
      </div>

      {/* Size Section */}
      <div className="mb-4 border-b">
        <h1 className="font-semibold mb-2">Size</h1>
        {["S", "M", "L"].map((item) => (
          <label key={item} htmlFor={`size-${item}`} className="flex items-center mb-2 gap-3">
            <input
              type="radio"
              id={`size-${item}`} 
              name="size"
              onChange={() => handleSizeChange(item)}
              checked={size?.includes(item)} // 🔥 Fix: Ensure array consistency
            />
            {item}
          </label>
        ))}
      </div>

      {/* Color Section */}
      <div className="mb-4">
        <h1 className="font-semibold mb-2">Color</h1>
        {["Red", "White", "Blue"].map((item) => (
          <label key={item} htmlFor={`color-${item}`} className="flex items-center mb-2 gap-3">
            <input
              type="radio"
              id={`color-${item}`} 
              name="color"
              onChange={() => handleColorChange(item)}
              checked={color?.includes(item)} // 🔥 Fix: Ensure array consistency
            />
            {item}
          </label>
        ))}
      </div>
    </div>
  );
};

export default ProductFilter;
