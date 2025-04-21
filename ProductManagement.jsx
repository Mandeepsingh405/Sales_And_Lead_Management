import { useState } from "react";
import { FaTrashAlt, FaEdit } from "react-icons/fa";
import React from "react";

const ProductManagement = () => {
  const [products, setProducts] = useState([
    { id: 1, name: "Product A", description: "color/fabric", price: 1500, status: "sell", rating: "★★★★★" },
    { id: 2, name: "Product B", description: "color/fabric", price: 200, status: "pending", rating: "★★★★" },
    { id: 3, name: "Product C", description: "color/fabric", price: 3000, status: "pending", rating: "★★★" },
    { id: 4, name: "Product D", description: "color/fabric", price: 2000, status: "sell", rating: "★★★" },
    { id: 5, name: "Product A", description: "color/fabric", price: 1500, status: "sell", rating: "★★★★★" },
    { id: 6, name: "Product B", description: "color/fabric", price: 200, status: "pending", rating: "★★★★" },
    { id: 7, name: "Product C", description: "color/fabric", price: 3000, status: "pending", rating: "★★★" },
    { id: 8, name: "Product D", description: "color/fabric", price: 2000, status: "sell", rating: "★★★" },
    { id: 9, name: "Product A", description: "color/fabric", price: 1500, status: "sell", rating: "★★★★★" },
    { id: 10, name: "Product B", description: "color/fabric", price: 200, status: "pending", rating: "★★★★" },
    { id: 11, name: "Product C", description: "color/fabric", price: 3000, status: "pending", rating: "★★★" },
    { id: 12, name: "Product D", description: "color/fabric", price: 2000, status: "sell", rating: "★★★" },
  ]);

  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
    status: "sell",
    rating: "",
  });

  const [editProduct, setEditProduct] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("Newest");
  const [currentPage, setCurrentPage] = useState(1);
  const entriesPerPage = 5;

  const totalEntries = products.length;
  const totalPages = Math.ceil(totalEntries / entriesPerPage);
  const startEntry = (currentPage - 1) * entriesPerPage;
  const endEntry = Math.min(startEntry + entriesPerPage, totalEntries);

  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const goToPrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleInputChange = (e) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };

  const handleEditChange = (e) => {
    setEditProduct({ ...editProduct, [e.target.name]: e.target.value });
  };

  const addProduct = () => {
    if (newProduct.name && newProduct.description && newProduct.price && newProduct.rating) {
      setProducts([...products, { ...newProduct, id: products.length + 1 }]);
      setNewProduct({ name: "", description: "", price: "", status: "sell", rating: "" });
      setShowForm(false);
    } else {
      alert("Please fill all fields!");
    }
  };

  const openEditBox = (product) => {
    setEditProduct(product);
    setShowForm(true);
  };

  const saveEditedProduct = () => {
    setProducts(products.map((p) => (p.id === editProduct.id ? editProduct : p)));
    setEditProduct(null);
    setShowForm(false);
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const displayedProducts = filteredProducts.slice(startEntry, endEntry);

  return (
    <div className="bg-white rounded-lg shadow-lg w-full">
      {/* Header */}
      <div className="flex justify-between items-center bg-blue-900 mb-6 border-b p-8">
        <h2 className="text-2xl text-white">Product Management</h2>
      </div>

      {/* Search Bar */}
      <div className="flex justify-between items-center mb-4 px-4">
        <input
          type="text"
          placeholder="Search product..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border p-2 rounded w-1/3"
        />
        <button onClick={() => setShowForm(true)} className="bg-blue-900 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
          ➕ Add Product
        </button>
      </div>

      {/* Product Table */}
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-300 rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-blue-900 text-white text-left">
              <th className="p-6 border">Product</th>
              <th className="p-6 border">Description</th>
              <th className="p-6 border">Price</th>
              <th className="p-6 border">Status</th>
              <th className="p-6 border">Rating</th>
              <th className="p-6 border text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {displayedProducts.map((product) => (
              <tr key={product.id} className="text-center text-gray-800 hover:bg-gray-200">
                <td className="p-6 border">{product.name}</td>
                <td className="p-6 border">{product.description}</td>
                <td className="p-6 border">${product.price}</td>
                <td className="p-6 border">{product.status}</td>
                <td className="p-6 border">{product.rating}</td>
                <td className="p-6 border flex justify-center space-x-3">
                  <button
                    className="text-blue-500 mr-2 hover:text-blue-700 transition"
                    onClick={() => openEditBox(product)}
                  >
                    ✏ Edit
                  </button>
                  <button className="text-red-500 hover:text-red-700 transition">🗑 Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4 px-4">
        <span>Showing {startEntry + 1} to {endEntry} of {totalEntries} entries</span>
        <div>
          <button onClick={goToPrevPage} disabled={currentPage === 1} className="px-4 py-2 bg-blue-600 text-white rounded-md">
            Prev
          </button>
          <span className="px-4">{currentPage} / {totalPages}</span>
          <button onClick={goToNextPage} disabled={currentPage === totalPages} className="px-4 py-2 bg-blue-600 text-white rounded-md">
            Next
          </button>
        </div>
      </div>

      {/* Add/Edit Product Form Modal */}
      {showForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="p-6 bg-white rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">
              {editProduct ? "Edit Product" : "Add Product"}
            </h2>
            <input
              type="text"
              name="name"
              placeholder="Product Name"
              value={editProduct ? editProduct.name : newProduct.name}
              onChange={editProduct ? handleEditChange : handleInputChange}
              className="border p-2 rounded w-full mb-2"
            />
            <input
              type="text"
              name="description"
              placeholder="Description"
              value={editProduct ? editProduct.description : newProduct.description}
              onChange={editProduct ? handleEditChange : handleInputChange}
              className="border p-2 rounded w-full mb-2"
            />
            <input
              type="number"
              name="price"
              placeholder="Price"
              value={editProduct ? editProduct.price : newProduct.price}
              onChange={editProduct ? handleEditChange : handleInputChange}
              className="border p-2 rounded w-full mb-2"
            />
            <input
              type="text"
              name="rating"
              placeholder="Rating (e.g. ★★★★★)"
              value={editProduct ? editProduct.rating : newProduct.rating}
              onChange={editProduct ? handleEditChange : handleInputChange}
              className="border p-2 rounded w-full mb-2"
            />
            <div className="flex justify-between">
              <button onClick={editProduct ? saveEditedProduct : addProduct} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
                Save
              </button>
              <button onClick={() => setShowForm(false)} className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductManagement;


