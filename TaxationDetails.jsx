import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { Plus, Edit, Trash2, Download, Info, AlertTriangle } from "lucide-react";

const TaxationDetails = () => {
  const [taxData, setTaxData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showTaxInfo, setShowTaxInfo] = useState(false);

  useEffect(() => {
    const fetchTaxData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/taxation");
        setTaxData(response.data);
      } catch (err) {
        console.error("Error fetching taxation data:", err);
        setError("Failed to load taxation details.");
      } finally {
        setLoading(false);
      }
    };

    fetchTaxData();
  }, []);

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  // Prepare data for charts
  const pieData = taxData.map((item) => ({
    name: item.country,
    value: item.taxCollected,
  }));

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-800">Taxation Details</h1>
        <div className="flex flex-wrap gap-2">
          <button
            className="flex items-center gap-1 border border-gray-300 rounded-md px-3 py-1.5 bg-white text-sm hover:bg-gray-50"
            onClick={() => setShowTaxInfo(!showTaxInfo)}
          >
            <Info size={16} />
            Tax Guidelines
          </button>
          <button className="flex items-center gap-1 border border-gray-300 rounded-md px-3 py-1.5 bg-white text-sm hover:bg-gray-50">
            <Download size={16} />
            Export
          </button>
          <button
            className="flex items-center gap-1 bg-indigo-600 text-white px-3 py-1.5 rounded-md text-sm hover:bg-indigo-700 transition-colors"
            onClick={() => setShowAddForm(!showAddForm)}
          >
            <Plus size={16} />
            Add Tax Rate
          </button>
        </div>
      </div>

      {/* Tax Guidelines Info */}
      {showTaxInfo && (
        <div className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded-md">
          <div className="flex">
            <div className="flex-shrink-0">
              <AlertTriangle className="h-5 w-5 text-amber-400" />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-amber-800">
                Tax Compliance Information
              </h3>
              <div className="mt-2 text-sm text-amber-700">
                <p>Ensure compliance with local tax regulations.</p>
                <p className="mt-2">
                  Consult a tax advisor before making changes.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Tax Collection by Country</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={taxData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="country" />
                <YAxis />
                <Tooltip
                  formatter={(value) =>
                    `$${Number(value).toLocaleString(undefined, {
                      maximumFractionDigits: 2,
                    })}`
                  }
                />
                <Legend />
                <Bar dataKey="taxCollected" name="Tax Collected" fill="#6366F1" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Tax Distribution</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                >
                  {pieData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value) =>
                    `$${Number(value).toLocaleString(undefined, {
                      maximumFractionDigits: 2,
                    })}`
                  }
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaxationDetails;

