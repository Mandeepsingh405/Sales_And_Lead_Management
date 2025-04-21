import { useState, useEffect } from "react";
import API from "../../api/axios"; // Import Axios instance
import React from "react";

const ProductPerformance = () => {
  const [products, setProducts] = useState([]);
  const [topProducts, setTopProducts] = useState([]);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch all product performance data
        const productsResponse = await API.get("/product-performance");
        setProducts(productsResponse.data);

        // Fetch top products
        const topProductsResponse = await API.get("/product-performance/top-products");
        setTopProducts(topProductsResponse.data);

        // Fetch total revenue
        const revenueResponse = await API.get("/product-performance/total-revenue");
        setTotalRevenue(revenueResponse.data.totalRevenueGenerated);
      } catch (err) {
        setError("Error fetching product performance data");
        console.error("Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-blue-900 mb-4">Product Performance</h2>
      <p className="text-gray-600 mb-4">
        Track sales, revenue, and customer ratings of top-performing products.
      </p>

      {/* Total Revenue */}
      <div className="mb-4 p-4 bg-blue-100 rounded-lg text-blue-900 font-medium">
        <h3 className="text-lg">Total Revenue Generated: <span className="text-blue-700">${totalRevenue.toLocaleString()}</span></h3>
      </div>

      {/* Product Performance Table */}
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-blue-900 text-white">
            <th className="p-3 border">Product</th>
            <th className="p-3 border">Category</th>
            <th className="p-3 border">Units Sold</th>
            <th className="p-3 border">Revenue ($)</th>
            <th className="p-3 border">Customer Rating</th>
          </tr>
        </thead>
        <tbody>
          {products.map((item, index) => (
            <tr key={index} className="text-center bg-gray-100 hover:bg-gray-200">
              <td className="p-3 border">{item.productName}</td>
              <td className="p-3 border">{item.category}</td>
              <td className="p-3 border">{item.totalSales.toLocaleString()}</td>
              <td className="p-3 border">${item.revenueGenerated.toLocaleString()}</td>
              <td className="p-3 border">{item.averageRating} ⭐</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Top 5 Products */}
      <div className="mt-6">
        <h3 className="text-xl font-semibold text-blue-900 mb-2">Top 5 Best-Performing Products</h3>
        <ul className="list-disc list-inside text-gray-700">
          {topProducts.map((product, index) => (
            <li key={index}>
              <span className="font-medium">{product.productName}</span> - ${product.revenueGenerated.toLocaleString()} in revenue
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProductPerformance;

