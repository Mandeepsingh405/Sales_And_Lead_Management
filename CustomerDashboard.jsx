import { useState } from "react";
import React from "react";

const CustomerDashboard = () => {
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [customers, setCustomers] = useState([
    { id: 1, name: "Satyam Rao", preferences: "xyz", phone: "9876543210", purchase: "xyz", nominee: "Father" },
    { id: 2, name: "Ankit Yadav", preferences: "xyz", phone: "9876543211", purchase: "xyz", nominee: "Mother" },
    { id: 3, name: "Amartya Rai", preferences: "xyz", phone: "9876543212", purchase: "xyz", nominee: "Father" },
    { id: 4, name: "Madhur Drivedi", preferences: "xyz", phone: "9876543213", purchase: "xyz", nominee: "Sister" },
    { id: 5, name: "Saurabh Jha", preferences: "xyz", phone: "9876543214", purchase: "xyz", nominee: "Father" },
    { id: 6, name: "Satyam Rao", preferences: "xyz", phone: "9876543210", purchase: "xyz", nominee: "Father" },
    { id: 7, name: "Ankit Yadav", preferences: "xyz", phone: "9876543211", purchase: "xyz", nominee: "Mother" },
    { id: 8, name: "Amartya Rai", preferences: "xyz", phone: "9876543212", purchase: "xyz", nominee: "Father" },
    { id: 9, name: "Madhur Drivedi", preferences: "xyz", phone: "9876543213", purchase: "xyz", nominee: "Sister" },
    { id: 10, name: "Saurabh Jha", preferences: "xyz", phone: "9876543214", purchase: "xyz", nominee: "Father" },
  ]);

  const [newCustomer, setNewCustomer] = useState({ name: "", preferences: "", phone: "", purchase: "", nominee: "" });
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const entriesPerPage = 5;

  const filteredCustomers = customers.filter((customer) =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalEntries = filteredCustomers.length;
  const totalPages = Math.ceil(totalEntries / entriesPerPage);
  const startEntry = (currentPage - 1) * entriesPerPage;
  const displayedCustomers = filteredCustomers.slice(startEntry, startEntry + entriesPerPage);

  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const goToPrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleOpenAddModal = () => {
    setNewCustomer({ name: "", preferences: "", phone: "", purchase: "", nominee: "" });
    setIsEditing(false);
    setShowModal(true);
  };

  const handleOpenEditModal = (customer) => {
    setNewCustomer(customer);
    setIsEditing(true);
    setShowModal(true);
  };

  const handleSaveCustomer = (e) => {
    e.preventDefault();
    if (newCustomer.phone.length !== 10) {
      alert("Phone number must be 10 digits!");
      return;
    }
    if (isEditing) {
      setCustomers(customers.map((c) => (c.id === newCustomer.id ? newCustomer : c)));
    } else {
      const id = customers.length > 0 ? Math.max(...customers.map((c) => c.id)) + 1 : 1;
      setCustomers([...customers, { id, ...newCustomer }]);
    }
    setShowModal(false);
  };

  const handleDelete = (id) => {
    setCustomers(customers.filter((customer) => customer.id !== id));
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="bg-blue-900 p-6 text-white text-2xl font-semibold">Customer Dashboard</div>
      <div className="flex-1 p-6 bg-gray-100 text-gray-800">
        
        <div className="flex justify-between items-center mb-4">
          <input
            type="text"
            className="px-4 py-2 border border-gray-300 rounded-md w-1/3 focus:outline-none focus:ring-2 focus:ring-blue-900"
            placeholder="🔍 Search Customers"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            className="px-4 py-2 bg-blue-900 text-white rounded-md hover:bg-blue-700 transition"
            onClick={handleOpenAddModal}
          >
            ➕ Add Customer
          </button>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-4">
          <table className="w-full border-collapse text-gray-700">
            <thead>
              <tr className="bg-blue-900 text-white text-left">
                <th className="p-6">Customer Name</th>
                <th className="p-6">Preferences</th>
                <th className="p-6">Phone Number</th>
                <th className="p-6">Purchase History</th>
                <th className="p-6">Nominee</th>
                <th className="p-6 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {displayedCustomers.map((customer) => (
                <tr key={customer.id} className="border-t hover:bg-gray-100 transition">
                  <td className="p-6">{customer.name}</td>
                  <td className="p-6">{customer.preferences}</td>
                  <td className="p-6">{customer.phone}</td>
                  <td className="p-6">{customer.purchase}</td>
                  <td className="p-6">{customer.nominee}</td>
                  <td className="p-6 text-center">
                    <button className="text-blue-500 mr-2 hover:text-blue-700 transition" onClick={() => handleOpenEditModal(customer)}>✏ Edit</button>
                    <button className="text-red-500 hover:text-red-700 transition" onClick={() => handleDelete(customer.id)}>🗑 Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-between items-center mt-4">
          <span>Showing {startEntry + 1} to {Math.min(startEntry + entriesPerPage, totalEntries)} of {totalEntries} entries</span>
          <div>
            <button onClick={goToPrevPage} disabled={currentPage === 1} className="px-4 py-2 bg-blue-600 text-white rounded-md">Prev</button>
            <span className="px-4">{currentPage} / {totalPages}</span>
            <button onClick={goToNextPage} disabled={currentPage === totalPages} className="px-4 py-2 bg-blue-600 text-white rounded-md">Next</button>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">{isEditing ? "Edit Customer" : "Add New Customer"}</h2>
            <form onSubmit={handleSaveCustomer} className="space-y-4">
              {["name", "preferences", "purchase", "nominee"].map((field) => (
                <input
                  key={field}
                  type="text"
                  placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                  value={newCustomer[field]}
                  onChange={(e) => setNewCustomer({ ...newCustomer, [field]: e.target.value })}
                  className="w-full p-2 border rounded"
                  required
                />
              ))}
              <input
                type="text"
                placeholder="Phone Number"
                value={newCustomer.phone}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, "");
                  if (value.length <= 10) {
                    setNewCustomer({ ...newCustomer, phone: value });
                  }
                }}
                className="w-full p-2 border rounded"
                required
              />
              <div className="flex justify-between">
                <button type="button" onClick={() => setShowModal(false)} className="bg-gray-400 text-white px-4 py-2 rounded">Cancel</button>
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">{isEditing ? "Update" : "Save"}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerDashboard;
