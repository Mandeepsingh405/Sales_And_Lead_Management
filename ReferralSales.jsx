import { useState, useEffect } from "react";
import API from "../../api/axios"; // Import configured Axios instance
import { FaUser, FaChartLine, FaUsers } from "react-icons/fa";
import React from "react";

const ReferralSalesTracking = () => {
  const [data, setData] = useState([]);
  const [totalReferrals, setTotalReferrals] = useState(0);
  const [totalSales, setTotalSales] = useState(0);
  const [topReferrer, setTopReferrer] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch Referral Sales Data
  useEffect(() => {
    const fetchReferralSales = async () => {
      try {
        const response = await API.get("/referral-sales");
        const salesData = response.data;

        // Calculate totals
        const totalReferrals = salesData.length;
        const totalSales = salesData.reduce((sum, item) => sum + item.totalSales, 0);
        const topReferrer = salesData.reduce((top, item) =>
          item.totalSales > (top.totalSales || 0) ? item : top, {}).referralSource || "N/A";

        setData(salesData);
        setTotalReferrals(totalReferrals);
        setTotalSales(totalSales);
        setTopReferrer(topReferrer);
      } catch (error) {
        console.error("Error fetching referral sales data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReferralSales();
  }, []);

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-blue-900 mb-4 flex items-center gap-2">
        <FaUsers /> Referral Sales Tracking
      </h2>

      {/* Referral Summary */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="p-4 bg-blue-100 border-l-4 border-blue-500 rounded-lg flex items-center gap-3">
          <FaUser className="text-blue-600 text-2xl" />
          <div>
            <p className="text-lg font-semibold">Total Referrals</p>
            <p className="text-xl font-bold">{totalReferrals}</p>
          </div>
        </div>
        <div className="p-4 bg-green-100 border-l-4 border-green-500 rounded-lg flex items-center gap-3">
          <FaChartLine className="text-green-600 text-2xl" />
          <div>
            <p className="text-lg font-semibold">Total Sales</p>
            <p className="text-xl font-bold">${totalSales.toLocaleString()}</p>
          </div>
        </div>
        <div className="p-4 bg-yellow-100 border-l-4 border-yellow-500 rounded-lg flex items-center gap-3">
          <FaUsers className="text-yellow-600 text-2xl" />
          <div>
            <p className="text-lg font-semibold">Top Referrer</p>
            <p className="text-xl font-bold">{topReferrer}</p>
          </div>
        </div>
      </div>

      {/* Referral Table */}
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-blue-900 text-white">
            <th className="p-3 border">Referrer</th>
            <th className="p-3 border">Total Sales ($)</th>
            <th className="p-3 border">Commission (%)</th>
            <th className="p-3 border">Commission Paid ($)</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index} className="text-center bg-gray-100 hover:bg-gray-200">
              <td className="p-3 border">{item.referralSource}</td>
              <td className="p-3 border">${item.totalSales.toLocaleString()}</td>
              <td className="p-3 border">{item.commissionPercentage}%</td>
              <td className="p-3 border">${item.commissionPaid.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReferralSalesTracking;
