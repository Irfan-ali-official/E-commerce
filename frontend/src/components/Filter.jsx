import React, { useState, useEffect } from "react";

const Filter = ({ onFilter, products }) => {
  const [category, setCategory] = useState(""); // Default category filter
  const [price, setPrice] = useState(0); // Default price filter

  // Get the maximum price from products to set as the max range
  const maxPrice = Math.max(...products.map((product) => product.price));

  useEffect(() => {
    setPrice(maxPrice); // Set the initial value of the price filter to the max price
  }, [maxPrice]);

  // Handle category change from the dropdown
  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
    onFilter({ price, category: event.target.value });
  };

  // Handle price filter when the button is clicked
  const handlePriceFilterClick = () => {
    onFilter({ price, category });
  };

  return (
    <div className="p-4 bg-gray-100 rounded-lg mb-4 w-64">
      {" "}
      {/* Fixed width for sidebar */}
      <h2 className="text-xl font-bold mb-4">Filter Products</h2>
      {/* Category Filter */}
      <div className="mb-4">
        <label className="block text-lg">Category:</label>
        <select
          value={category}
          onChange={handleCategoryChange}
          className="w-full p-2 border rounded-lg"
        >
          <option value="">All Categories</option>
          <option value="watches">Watches</option>

          <option value="accessories">Accessories</option>
        </select>
      </div>
      {/* Price Filter */}
      <div className="mb-4">
        <label className="block text-lg">Price:</label>
        <input
          type="range"
          min="0"
          max={maxPrice}
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full"
        />
        <span>Max Price: ${price}</span>
      </div>
      {/* Apply Filter Button */}
      <div>
        <button
          onClick={handlePriceFilterClick}
          className="bg-blue-500 w-full text-white px-4 py-2 rounded"
        >
          Apply Filters
        </button>
      </div>
    </div>
  );
};

export default Filter;
