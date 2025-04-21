import React, { useState } from 'react';
import { 
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, 
  PieChart, Pie, Cell 
} from 'recharts';
import { Download, Filter } from 'lucide-react';

// Mock Data (Replace with actual API data)
const salesData = [
  { id: 1, date: '2024-02-25', product: 'Laptop', category: 'Electronics', customer: 'John Doe', region: 'North America', amount: 1200 },
  { id: 2, date: '2024-02-24', product: 'Smartphone', category: 'Electronics', customer: 'Jane Smith', region: 'Europe', amount: 800 },
  { id: 3, date: '2024-02-23', product: 'Headphones', category: 'Accessories', customer: 'Mark Brown', region: 'Asia', amount: 150 },
  // Add more data...
];

const SalesReports = () => {
  const [timeRange, setTimeRange] = useState('30days');
  const [filterOpen, setFilterOpen] = useState(false);

  // Process data for charts
  const salesByDate = salesData.reduce((acc, sale) => {
    acc[sale.date] = (acc[sale.date] || 0) + sale.amount;
    return acc;
  }, {});
   
  const lineChartData = Object.entries(salesByDate)
    .map(([date, amount]) => ({ date, amount }))
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  const salesByRegion = salesData.reduce((acc, sale) => {
    acc[sale.region] = (acc[sale.region] || 0) + sale.amount;
    return acc;
  }, {});

  const regionChartData = Object.entries(salesByRegion).map(([region, amount]) => ({ region, amount }));

  const salesByProduct = salesData.reduce((acc, sale) => {
    acc[sale.product] = (acc[sale.product] || 0) + sale.amount;
    return acc;
  }, {});

  const productChartData = Object.entries(salesByProduct)
    .map(([product, amount]) => ({ product, amount }))
    .sort((a, b) => b.amount - a.amount);

  const salesByCategory = salesData.reduce((acc, sale) => {
    acc[sale.category] = (acc[sale.category] || 0) + sale.amount;
    return acc;
  }, {});

  const pieChartData = Object.entries(salesByCategory).map(([name, value]) => ({ name, value }));
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

  // Calculate total sales
  const totalSales = salesData.reduce((sum, sale) => sum + sale.amount, 0);

  // Recent sales for table
  const recentSales = [...salesData]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 10);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-800">Sales Reports</h1>
        <div className="flex flex-wrap gap-2">
          <select 
            className="border border-gray-300 rounded-md px-3 py-1.5 bg-white text-sm"
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
          >
            <option value="7days">Last 7 Days</option>
            <option value="30days">Last 30 Days</option>
            <option value="90days">Last 90 Days</option>
            <option value="year">This Year</option>
          </select>
          <button 
            className="flex items-center gap-1 border border-gray-300 rounded-md px-3 py-1.5 bg-white text-sm hover:bg-gray-50"
            onClick={() => setFilterOpen(!filterOpen)}
          >
            <Filter size={16} />
            Filters
          </button>
          <button className="flex items-center gap-1 bg-indigo-600 text-white px-3 py-1.5 rounded-md text-sm hover:bg-indigo-700 transition-colors">
            <Download size={16} />
            Export
          </button>
        </div>
      </div>

      {/* Sales Trend Chart */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold mb-4">Sales Trend</h2>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={lineChartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="amount" stroke="#6366F1" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Sales by Region */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold mb-4">Sales by Region</h2>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={regionChartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="region" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="amount" fill="#6366F1" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Sales by Category Pie Chart */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold mb-4">Sales by Category</h2>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieChartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {pieChartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default SalesReports;
