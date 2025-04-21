import { useState } from "react";
import React from "react";
// import axios from "axios"; // Uncomment when using API

const LeadManagement = () => {
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [leads, setLeads] = useState([
    { id: 1, name: "John Doe", product: "Laptop", assignedTo: "xyz", status: "New", dateAdded: "22-2-2025", source: "xxxx" },
    { id: 2, name: "Jane Smith", product: "Smartphone", assignedTo: "abcd", status: "In Progress", dateAdded: "22-2-2025", source: "xxxx" },
    { id: 3, name: "Michael Black", product: "Headphones", assignedTo: "Charlie", status: "Closed", dateAdded: "22-2-2025", source: "xxxx" },
    { id: 4, name: "Micky", product: "Headphones", assignedTo: "Charlie", status: "Closed", dateAdded: "22-2-2025", source: "xxxx" },
    { id: 5, name: "John Doe", product: "Laptop", assignedTo: "xyz", status: "New", dateAdded: "22-2-2025", source: "xxxx" },
    { id: 6, name: "Jane Smith", product: "Smartphone", assignedTo: "abcd", status: "In Progress", dateAdded: "22-2-2025", source: "xxxx" },
    { id: 7, name: "Michael Black", product: "Headphones", assignedTo: "Charlie", status: "Closed", dateAdded: "22-2-2025", source: "xxxx" },
    { id: 8, name: "Micky", product: "Headphones", assignedTo: "Charlie", status: "Closed", dateAdded: "22-2-2025", source: "xxxx" },
    { id: 9, name: "John Doe", product: "Laptop", assignedTo: "xyz", status: "New", dateAdded: "22-2-2025", source: "xxxx" },
    { id: 10, name: "Jane Smith", product: "Smartphone", assignedTo: "abcd", status: "In Progress", dateAdded: "22-2-2025", source: "xxxx" },
    { id: 11, name: "Michael Black", product: "Headphones", assignedTo: "Charlie", status: "Closed", dateAdded: "22-2-2025", source: "xxxx" },
    { id: 12, name: "Micky", product: "Headphones", assignedTo: "Charlie", status: "Closed", dateAdded: "22-2-2025", source: "xxxx" },
  ]);

  const [newLead, setNewLead] = useState({ name: "", product: "", assignedTo: "", status: "", dateAdded: "", source: "" });
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("Newest");
  const [currentPage, setCurrentPage] = useState(1);
  const entriesPerPage = 5;

  const totalEntries = leads.length;
  const totalPages = Math.ceil(totalEntries / entriesPerPage);
  const startEntry = (currentPage - 1) * entriesPerPage;
  const endEntry = Math.min(startEntry + entriesPerPage, totalEntries);

  const displayedLeads = leads.slice(startEntry, endEntry);

  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const goToPrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const filteredLeads = displayedLeads.filter((lead) =>
    lead.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddOrUpdateLead = (e) => {
    e.preventDefault();
    if (editingId) {
      setLeads(leads.map(lead => lead.id === editingId ? { ...lead, ...newLead } : lead));
    } else {
      const id = leads.length > 0 ? Math.max(...leads.map((l) => l.id)) + 1 : 1;
      setLeads([...leads, { id, ...newLead }]);
    }
    setNewLead({ name: "", product: "", assignedTo: "", status: "", dateAdded: "", source: "" });
    setEditingId(null);
    setShowModal(false);
  };

  const handleDelete = (id) => {
    setLeads(leads.filter((lead) => lead.id !== id));
  };

  const handleEdit = (id) => {
    const editedLead = leads.find(lead => lead.id === id);
    setNewLead(editedLead);
    setEditingId(id);
    setShowModal(true);
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="bg-blue-900 p-8 text-white text-2xl font-semibold">Lead Management</div>
      <div className="flex-1 p-6 bg-gray-100 text-gray-800">
        <div className="flex justify-between items-center mb-4">
          <input
            type="text"
            className="px-4 py-2 border border-gray-300 rounded-md w-1/3 focus:outline-none focus:ring-2 focus:ring-blue-900"
            placeholder="🔍 Search Leads"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            className="px-4 py-2 bg-blue-900 text-white rounded-md hover:bg-blue-700 transition"
            onClick={() => { setShowModal(true); setEditingId(null); setNewLead({ name: "", product: "", assignedTo: "", status: "", dateAdded: "", source: "" }); }}
          >
            ➕ Add Lead
          </button>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-4">
          <table className="w-full border-collapse text-gray-700">
            <thead>
              <tr className="bg-blue-900 text-white text-left">
                <th className="p-6">Lead Name</th>
                <th className="p-6">Product</th>
                <th className="px-6">Assigned To</th>
                <th className="px-6">Status</th>
                <th className="px-6">Date Added</th>
                <th className="px-6">Lead Source</th>
                <th className="p-6 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredLeads.map((lead) => (
                <tr key={lead.id} className="border-t hover:bg-gray-100 transition">
                  <td className="p-6">{lead.name}</td>
                  <td className="p-6">{lead.product}</td>
                  <td className="p-6">{lead.assignedTo}</td>
                  <td className="p-6">{lead.status}</td>
                  <td className="p-6">{lead.dateAdded}</td>
                  <td className="p-6">{lead.source}</td>
                  <td className="p-6 text-center">
                    <button className="text-blue-500 mr-2 hover:text-blue-700 transition" onClick={() => handleEdit(lead.id)}>✏ Edit</button>
                    <button className="text-red-500 hover:text-red-700 transition" onClick={() => handleDelete(lead.id)}>🗑 Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-between items-center mt-4">
          <span>Showing {startEntry + 1} to {endEntry} of {totalEntries} entries</span>
          <div>
            <button onClick={goToPrevPage} disabled={currentPage === 1} className="px-4 py-2 bg-blue-600 text-white rounded-md">Prev</button>
            <span className="px-4">{currentPage} / {totalPages}</span>
            <button onClick={goToNextPage} disabled={currentPage === totalPages} className="px-4 py-2 bg-blue-600 text-white rounded-md">Next</button>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg w-1/3">
            <h2 className="text-xl font-bold mb-4">{editingId ? "Edit Lead" : "Add New Lead"}</h2>
            <form onSubmit={handleAddOrUpdateLead}>
              {Object.keys(newLead).map((key) => (
                <input
                  key={key}
                  className="w-full p-2 border rounded mb-2"
                  placeholder={key}
                  value={newLead[key]}
                  onChange={(e) => setNewLead({ ...newLead, [key]: e.target.value })}
                  required
                />
              ))}
              <div className="flex justify-between mt-4">
                <button type="button" className="w-1/2 bg-gray-400 text-white p-2 rounded mr-2 hover:bg-gray-500 transition" onClick={() => setShowModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="w-1/2 bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default LeadManagement;


