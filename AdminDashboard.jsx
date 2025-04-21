import {
    BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
    LineChart, Line, CartesianGrid, Legend
} from "recharts";
import { MapPin, TrendingUp, DollarSign, Users, Wallet, Gift } from "lucide-react";
import BuyersDensityMap from "./BuyersDensityMap";
import { useState } from "react";
import React from "react";


const salesData = [
    { name: "Jan", sales: 4000 },
    { name: "Feb", sales: 3200 },
    { name: "Mar", sales: 2500 },
    { name: "Apr", sales: 3800 },
    { name: "May", sales: 5200 },
    { name: "Jun", sales: 1000 },
    { name: "Jul", sales: 3200 },
    { name: "Aug", sales: 4500 },
    { name: "Sept", sales: 3800 },
    { name: "Oct", sales: 5200 },
    { name: "Nov", sales: 4000 },
    { name: "Dec", sales: 6200 },
];

const productPerformance = [
    { name: "Product A", sales: 2400 },
    { name: "Product B", sales: 3300 },
    { name: "Product C", sales: 2800 },
];

// Referral Sales Data with Performance
const referralSales = [
    { program: "Referral Program A", sales: 1200, percentage: 50 },
    { program: "Referral Program B", sales: 800, percentage: 30 },
    { program: "Referral Program C", sales: 650, percentage: 20 },
];

// Dummy exchange rates
const exchangeRates = {
    USD: 1,
    EUR: 0.92,
    GBP: 0.79,
    INR: 83.15,
};

export default function AdminDashboard() {
    const [currency, setCurrency] = useState("USD");

    const convertCurrency = (amount) => (amount * exchangeRates[currency]).toFixed(2);

    return (
        <div className="flex bg-gray-100 min-h-screen">

            
            <main className="flex-1 p-6">
                <h1 className="text-3xl font-bold mb-6 text-gray-800">Admin Dashboard</h1>

              
                <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                    <h2 className="text-lg font-semibold text-gray-800 mb-4">Currency & Revenue Management</h2>
                    <div className="flex items-center space-x-4">
                        <select
                            value={currency}
                            onChange={(e) => setCurrency(e.target.value)}
                            className="border border-gray-300 rounded-md px-4 py-2"
                        >
                            <option value="USD">USD ($)</option>
                            <option value="EUR">EUR (€)</option>
                            <option value="GBP">GBP (£)</option>
                            <option value="INR">INR (₹)</option>
                        </select>
                        <p className="text-gray-600">Exchange Rate: 1 USD = {exchangeRates[currency]} {currency}</p>
                    </div>
                </div>

               
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                    <div className="bg-white p-6 rounded-lg shadow-md flex items-center">
                        <DollarSign className="text-green-500 mr-3" size={30} />
                        <div>
                            <p className="text-gray-600">Total Revenue</p>
                            <p className="text-xl font-bold">{convertCurrency(1230000)} {currency}</p>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-md flex items-center">
                        <TrendingUp className="text-blue-500 mr-3" size={30} />
                        <div>
                            <p className="text-gray-600">Taxation Collected</p>
                            <p className="text-xl font-bold">{convertCurrency(230000)} {currency}</p>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-md flex items-center">
                        <Users className="text-purple-500 mr-3" size={30} />
                        <div>
                            <p className="text-gray-600">Active Buyers</p>
                            <p className="text-xl font-bold">12,500</p>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-md flex items-center">
                        <Wallet className="text-red-500 mr-3" size={30} />
                        <div>
                            <p className="text-gray-600">Total Orders</p>
                            <p className="text-xl font-bold">8,450</p>
                        </div>
                    </div>
                </div>

                
                <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
                    <h2 className="text-lg font-semibold mb-4 text-gray-800">Sales Reports</h2>
                    <ResponsiveContainer width="100%" height={350}>
                        <LineChart data={salesData}>
                            <XAxis dataKey="name" stroke="#374151" />
                            <YAxis stroke="#374151" />
                            <CartesianGrid strokeDasharray="3 3" />
                            <Tooltip contentStyle={{ backgroundColor: "#f9fafb", borderRadius: "8px" }} />
                            <Legend />
                            <Line
                                type="monotone"
                                dataKey="sales"
                                stroke="url(#salesGradient)"
                                strokeWidth={3}
                                dot={{ stroke: "#2563eb", strokeWidth: 3 }}
                                activeDot={{ r: 8 }}
                            />
                            <defs>
                                <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#2563eb" stopOpacity={1} />
                                    <stop offset="100%" stopColor="#60a5fa" stopOpacity={0.3} />
                                </linearGradient>
                            </defs>
                        </LineChart>
                    </ResponsiveContainer>
                </div>

        
                <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
                    <BuyersDensityMap />
                </div>

          
                <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
                    <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                        <Gift className="text-yellow-500 mr-2" size={24} />
                        Referral Sales Tracking
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {referralSales.map((ref, index) => (
                            <div key={index} className="bg-gray-100 p-4 rounded-lg shadow-sm">
                                <div className="flex justify-between items-center mb-2">
                                    <p className="text-gray-700 font-medium">{ref.program}</p>
                                    <p className="text-gray-600 font-semibold">{ref.sales} Sales</p>
                                </div>
                                <div className="w-full bg-gray-300 rounded-full h-3">
                                    <div className="h-3 rounded-full transition-all duration-300"
                                        style={{
                                            width: `${ref.percentage}%`,
                                            background: ref.percentage >= 50 ? "#16a34a" : ref.percentage >= 30 ? "#facc15" : "#ef4444",
                                        }}>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
}
