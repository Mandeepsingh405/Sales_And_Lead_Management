import { useState, useEffect } from "react";
import API from "../../api/axios"; // Importing the configured axios instance
import React from "react";

const CurrencyRevenueManagement = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCurrencyRevenue = async () => {
      try {
        const response = await API.get("/currency-revenue"); // API call to backend
        setData(response.data);
      } catch (err) {
        setError("Failed to fetch currency revenue data.");
        console.error("Error fetching currency revenue:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCurrencyRevenue();
  }, []);

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-blue-900 mb-4">
        Currency & Revenue Management
      </h2>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-blue-900 text-white">
            <th className="p-3 border">Currency</th>
            <th className="p-3 border">Revenue ($)</th>
            <th className="p-3 border">Exchange Rate</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index} className="text-center bg-gray-100 hover:bg-gray-200">
              <td className="p-3 border">{item.currency}</td>
              <td className="p-3 border">${item.totalRevenue.toLocaleString()}</td>
              <td className="p-3 border">{item.exchangeRate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CurrencyRevenueManagement;

