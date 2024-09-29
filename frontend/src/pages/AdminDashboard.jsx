import React, { useState, useEffect } from "react";

// Admin Dashboard component
const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [roleFilter, setRoleFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [error, setError] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [productToUpdate, setProductToUpdate] = useState(null);
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: 0,
    category: "",
    image: "",
  });

  // Fetch users from MongoDB
  const fetchUsers = async () => {
    try {
      const response = await fetch(`/api/users`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
      setError("Error fetching users");
    }
  };

  // Fetch products from MongoDB
  const fetchProducts = async () => {
    try {
      const response = await fetch(`/api/products`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
      setError("Error fetching products");
    }
  };

  // Delete Product
  const handleDeleteProduct = async (productId) => {
    try {
      await fetch(`/api/products/${productId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setProducts(products.filter((product) => product._id !== productId));
    } catch (error) {
      console.error("Error deleting product:", error);
      setError("Error deleting product");
    }
  };

  // Delete User
  const handleDeleteUser = async (userId) => {
    try {
      await fetch(`/api/users/${userId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setUsers(users.filter((user) => user._id !== userId));
    } catch (error) {
      console.error("Error deleting user:", error);
      setError("Error deleting user");
    }
  };

  const handleAddProduct = async () => {
    try {
      const response = await fetch(`/api/products`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(newProduct),
      });

      const createdProduct = await response.json();
      setProducts([...products, createdProduct]);
      setShowAddForm(false);
    } catch (error) {
      console.error("Error adding product", error);
    }
  };

  // Update product
  const handleUpdateProduct = (productId) => {
    const product = products.find((p) => p._id === productId);
    setProductToUpdate(product);
    setShowUpdateForm(true);
  };

  const handleSubmitUpdate = async (updatedProduct) => {
    try {
      const response = await fetch(`/api/products/${updatedProduct._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(updatedProduct),
      });

      if (response.ok) {
        setProducts(
          products.map((product) =>
            product._id === updatedProduct._id ? updatedProduct : product
          )
        );
        setShowUpdateForm(false);
      } else {
        console.error("Failed to update product");
      }
    } catch (error) {
      console.error("Error updating product", error);
    }
  };

  // Fetch users and products on component mount
  useEffect(() => {
    fetchUsers();
    fetchProducts();
  }, []);

  // Filter users by role
  const handleRoleChange = (e) => {
    setRoleFilter(e.target.value);
  };

  // Filter products by category
  const handleCategoryChange = (e) => {
    setCategoryFilter(e.target.value);
  };

  const filteredUsers = users.filter((user) => {
    if (roleFilter === "all") return true;
    return user.role === roleFilter;
  });

  const filteredProducts = products.filter((product) => {
    if (categoryFilter === "all") return true;
    return product.category === categoryFilter;
  });

  // Categories including Watches and Accessories
  const categories = ["all", "watches", "accessories"];

  return (
    <div className="container mx-auto px-4">
      <h2 className="text-3xl font-bold mb-6">Admin Dashboard</h2>

      {error && <div className="text-red-500 mb-4">{error}</div>}

      {/* Flexbox Container for Managing Products and Users */}
      <div className="flex space-x-4">
        {/* Manage Products Section */}
        <div className="flex-1 bg-white shadow-lg rounded-lg p-6">
          <h3 className="text-2xl font-semibold mb-4">Manage Products</h3>
          <button
            onClick={() => setShowAddForm(true)}
            className="text-white bg-blue-500 px-4 py-2 rounded-md hover:bg-blue-600 mb-4"
          >
            Add New Product
          </button>

          {/* Category Filter */}
          <div className="mb-4 flex items-center">
            <label htmlFor="categoryFilter" className="mr-2 font-semibold">
              Filter by Category:
            </label>
            <select
              value={categoryFilter}
              onChange={handleCategoryChange}
              className="border border-gray-300 rounded-md px-4 py-2"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          {showAddForm && (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleAddProduct();
              }}
              className="mb-8 bg-gray-100 p-4 rounded-md"
            >
              <h3 className="text-xl font-semibold mb-4">Add New Product</h3>
              <div className="mb-4">
                <label className="block text-sm font-semibold mb-1">
                  Product Name
                </label>
                <input
                  type="text"
                  value={newProduct.name}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, name: e.target.value })
                  }
                  className="border px-4 py-2 rounded-md w-full"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-semibold mb-1">
                  Price
                </label>
                <input
                  type="number"
                  value={newProduct.price}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, price: e.target.value })
                  }
                  className="border px-4 py-2 rounded-md w-full"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-semibold mb-1">
                  Category
                </label>
                <input
                  type="text"
                  value={newProduct.category}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, category: e.target.value })
                  }
                  className="border px-4 py-2 rounded-md w-full"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-semibold mb-1">
                  Image URL
                </label>
                <input
                  type="text"
                  value={newProduct.image}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, image: e.target.value })
                  }
                  className="border px-4 py-2 rounded-md w-full"
                />
              </div>
              <button
                type="submit"
                className="text-white bg-blue-500 px-4 py-2 rounded-md"
              >
                Save Product
              </button>
            </form>
          )}

          <table className="min-w-full bg-white border border-gray-200 mb-6">
            <thead className="bg-gray-200">
              <tr>
                <th className="py-2 px-4 text-left font-semibold">
                  Product Image and Name
                </th>
                <th className="py-2 px-4 text-left font-semibold">Price</th>
                <th className="py-2 px-4 text-left font-semibold">Category</th>
                <th className="py-2 px-4 text-left font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product) => (
                <tr
                  key={product._id}
                  className="border-t border-gray-200 hover:bg-gray-50"
                >
                  <td className="py-2 px-4 flex items-center">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-16 h-16 object-cover mr-4"
                    />
                    {product.name}
                  </td>
                  <td className="py-2 px-4">{product.price}</td>
                  <td className="py-2 px-4">{product.category}</td>
                  <td className="py-2 px-4">
                    <button
                      onClick={() => handleUpdateProduct(product._id)}
                      className="text-white bg-green-500 px-4 py-2 rounded-md hover:bg-green-600"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDeleteProduct(product._id)}
                      className="text-white bg-red-500 px-4 py-2 rounded-md hover:bg-red-600 ml-2"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {showUpdateForm && productToUpdate && (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmitUpdate(productToUpdate);
              }}
              className="mb-8 bg-gray-100 p-4 rounded-md"
            >
              <h3 className="text-xl font-semibold mb-4">Update Product</h3>
              <div className="mb-4">
                <label className="block text-sm font-semibold mb-1">
                  Product Name
                </label>
                <input
                  type="text"
                  value={productToUpdate.name}
                  onChange={(e) =>
                    setProductToUpdate({
                      ...productToUpdate,
                      name: e.target.value,
                    })
                  }
                  className="border px-4 py-2 rounded-md w-full"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-semibold mb-1">
                  Price
                </label>
                <input
                  type="number"
                  value={productToUpdate.price}
                  onChange={(e) =>
                    setProductToUpdate({
                      ...productToUpdate,
                      price: e.target.value,
                    })
                  }
                  className="border px-4 py-2 rounded-md w-full"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-semibold mb-1">
                  Category
                </label>
                <input
                  type="text"
                  value={productToUpdate.category}
                  onChange={(e) =>
                    setProductToUpdate({
                      ...productToUpdate,
                      category: e.target.value,
                    })
                  }
                  className="border px-4 py-2 rounded-md w-full"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-semibold mb-1">
                  Image URL
                </label>
                <input
                  type="text"
                  value={productToUpdate.image}
                  onChange={(e) =>
                    setProductToUpdate({
                      ...productToUpdate,
                      image: e.target.value,
                    })
                  }
                  className="border px-4 py-2 rounded-md w-full"
                />
              </div>
              <button
                type="submit"
                className="text-white bg-blue-500 px-4 py-2 rounded-md"
              >
                Save Changes
              </button>
              <button
                type="button"
                onClick={() => setShowUpdateForm(false)}
                className="text-white bg-gray-500 px-4 py-2 rounded-md ml-2"
              >
                Cancel
              </button>
            </form>
          )}
        </div>

        {/* Manage Users Section */}
        <div className="flex-1 bg-white shadow-lg rounded-lg p-6">
          <h3 className="text-2xl font-semibold mb-4">Manage Users</h3>

          {/* Filter dropdown for roles */}
          <div className="mb-4 flex items-center">
            <label htmlFor="roleFilter" className="mr-2 font-semibold">
              Filter by Role:
            </label>
            <select
              value={roleFilter}
              onChange={handleRoleChange}
              className="border border-gray-300 rounded-md px-4 py-2"
            >
              <option value="all">All</option>
              <option value="admin">Admin</option>
              <option value="user">User</option>
            </select>
          </div>

          <table className="min-w-full bg-white border border-gray-200">
            <thead className="bg-gray-200">
              <tr>
                <th className="py-2 px-4 text-left font-semibold">Name</th>
                <th className="py-2 px-4 text-left font-semibold">Email</th>
                <th className="py-2 px-4 text-left font-semibold">Role</th>
                <th className="py-2 px-4 text-left font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr
                  key={user._id}
                  className="border-t border-gray-200 hover:bg-gray-50"
                >
                  <td className="py-2 px-4">{user.name}</td>
                  <td className="py-2 px-4">{user.email}</td>
                  <td className="py-2 px-4 capitalize">{user.role}</td>
                  <td className="py-2 px-4">
                    <button
                      onClick={() => handleDeleteUser(user._id)}
                      className="text-white bg-red-500 px-4 py-2 rounded-md hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
