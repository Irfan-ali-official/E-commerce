import React, { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import Filter from "../components/Filter"; // Import the filter component

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch products from MongoDB on component mount
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/api/products"); // Ensure this matches your actual endpoint
        const data = await response.json();
        setProducts(data);
        setFilteredProducts(data); // Set both initial and filtered products
        setLoading(false); // Stop the loading spinner once products are fetched
      } catch (err) {
        setError("Failed to fetch products");
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Filter products based on price and category
  const handleFilter = (filters) => {
    const { price, category } = filters;

    const filtered = products.filter((product) => {
      const priceMatch = product.price <= price;
      const categoryMatch = category === "" || product.category === category;
      return priceMatch && categoryMatch;
    });

    setFilteredProducts(filtered);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Products</h1>

      <div className="flex">
        {/* Sidebar filter */}
        <div>
          <Filter onFilter={handleFilter} products={products} />
        </div>

        {/* Product List */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ml-4">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))
          ) : (
            <div>No products found</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
