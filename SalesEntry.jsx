import { useState } from "react";
import { Search, Plus, Edit, Trash2 } from "react-feather";
import React from "react";

const SalesEntry = () => {
  const [items, setItems] = useState([
    { id: 101, title: "XYZ", type: "Oil", price: 150.0, stock: 81 },
    { id: 102, title: "ABC", type: "Biscuits", price: 2.0, stock: 12 },
    { id: 103, title: "XYZ", type: "Noodles", price: 50.0, stock: 5 },
    { id: 104, title: "ABC", type: "Oil", price: 150.0, stock: 45 },
    { id: 105, title: "XYZ", type: "Noodles", price: 50.0, stock: 58 },
    { id: 106, title: "XYZ", type: "Oil", price: 150.0, stock: 81 },
    { id: 107, title: "ABC", type: "Biscuits", price: 2.0, stock: 12 },
    { id: 108, title: "XYZ", type: "Oil", price: 150.0, stock: 81 },
    { id: 109, title: "ABC", type: "Biscuits", price: 2.0, stock: 12 },
    { id: 110, title: "XYZ", type: "Noodles", price: 50.0, stock: 5 },
    { id: 111, title: "ABC", type: "Oil", price: 150.0, stock: 45 },
    { id: 112, title: "XYZ", type: "Noodles", price: 50.0, stock: 58 },
    { id: 113, title: "XYZ", type: "Oil", price: 150.0, stock: 81 },
    { id: 114, title: "ABC", type: "Biscuits", price: 2.0, stock: 12 }
  ]);

  const [newItem, setNewItem] = useState({ title: "", type: "", price: "", stock: "" });
  const [editItem, setEditItem] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // Pagination states
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(items.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const visibleItems = items.slice(startIndex, startIndex + itemsPerPage);

  // Handle input changes for modal
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (isEditing) {
      setEditItem((prev) => ({ ...prev, [name]: value }));
    } else {
      setNewItem((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Open Add Item Modal
  const handleOpenAddModal = () => {
    setNewItem({ title: "", type: "", price: "", stock: "" });
    setIsEditing(false);
    setShowModal(true);
  };

  // Open Edit Item Modal
  const handleOpenEditModal = (item) => {
    setEditItem(item);
    setIsEditing(true);
    setShowModal(true);
  };

  // Add New Item
  const handleAddItem = (e) => {
    e.preventDefault();
    const id = items.length > 0 ? Math.max(...items.map((item) => item.id)) + 1 : 1;
    const itemToAdd = { id, ...newItem };

    setItems([...items, itemToAdd]);
    setShowModal(false);
  };

  // Save Edited Item
  const handleSaveEdit = (e) => {
    e.preventDefault();
    setItems(items.map((item) => (item.id === editItem.id ? editItem : item)));
    setShowModal(false);
  };

  // Delete Item
  const handleDelete = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  // Pagination Functions
  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const goToPrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Page Header */}
      <div className="bg-blue-900 text-white py-6 px-8 shadow-lg w-full">
        <h1 className="text-2xl font-bold">Sales Entry</h1>
        <p className="text-lg opacity-90">Manage your sales records efficiently</p>
      </div>

      {/* Main Content */}
      <div className="bg-white shadow-lg rounded-lg p-8">
        {/* Toolbar */}
        <div className="flex flex-wrap justify-between items-center mb-6">
          {/* Search Box */}
          <div className="relative w-80">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
            <input
              type="text"
              placeholder="Search items..."
              className="pl-12 pr-4 py-3 border rounded-md focus:ring focus:ring-blue-300 outline-none w-full text-gray-700 text-lg"
            />
          </div>

          {/* Add New Item Button */}
          <button
            className="flex items-center bg-blue-900 text-white px-6 py-3 rounded-md hover:bg-[#4338CA] transition text-lg font-semibold"
            onClick={handleOpenAddModal}
          >
            Add New Item <Plus size={20} className="ml-2" />
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse bg-white shadow-md rounded-lg">
            <thead className="bg-blue-900 text-white text-lg">
              <tr className="text-left">
                <th className="p-6">Item ID</th>
                <th className="p-6">Title</th>
                <th className="p-6">Type</th>
                <th className="p-6">Price</th>
                <th className="p-6">Stock</th>
                <th className="p-6">Actions</th>
              </tr>
            </thead>
            <tbody className="text-lg text-gray-800">
              {visibleItems.map((item) => (
                <tr key={item.id} className="border-t hover:bg-gray-100">
                  <td className="p-6">{item.id}</td>
                  <td className="p-6">{item.title}</td>
                  <td className="p-6">{item.type}</td>
                  <td className="p-6">{item.price}</td>
                  <td className="p-6">{item.stock}</td>
                  <td className="p-6 flex gap-4">
                    <button className="text-blue-500" onClick={() => handleOpenEditModal(item)}>✏ Edit</button>
                    <button className="text-red-500" onClick={() => handleDelete(item.id)}>🗑 Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-between items-center mt-5 p-3 bg-gray-200 rounded-lg">
          <p className="text-gray-700 text-sm">Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, items.length)} of {items.length} items</p>
          <div className="flex space-x-3">
            <button onClick={goToPrevPage} disabled={currentPage === 1} className="px-4 py-2 bg-blue-600 text-white rounded-md">Prev</button>
            <span>{currentPage} / {totalPages}</span>
            <button onClick={goToNextPage} disabled={currentPage === totalPages} className="px-4 py-2 bg-blue-600 text-white rounded-md">Next</button>
          </div>
        </div>
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-2xl font-bold mb-4">{isEditing ? "Edit Item" : "Add New Item"}</h2>
            <form onSubmit={isEditing ? handleSaveEdit : handleAddItem} className="space-y-4">
              <input type="text" name="title" placeholder="Title" required value={isEditing ? editItem.title : newItem.title} onChange={handleInputChange} className="w-full p-2 border rounded" />
              <input type="text" name="type" placeholder="Type" required value={isEditing ? editItem.type : newItem.type} onChange={handleInputChange} className="w-full p-2 border rounded" />
              <input type="number" name="price" placeholder="Price" required value={isEditing ? editItem.price : newItem.price} onChange={handleInputChange} className="w-full p-2 border rounded" />
              <input type="number" name="stock" placeholder="Stock" required value={isEditing ? editItem.stock : newItem.stock} onChange={handleInputChange} className="w-full p-2 border rounded" />
              <div className="flex justify-end space-x-3">
                <button type="button" className="bg-gray-400 px-4 py-2 rounded" onClick={() => setShowModal(false)}>Cancel</button>
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">{isEditing ? "Save Changes" : "Add Item"}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SalesEntry;

