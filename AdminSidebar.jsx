import { NavLink } from "react-router-dom";
import {
  FaTachometerAlt,
  FaUsers,
  FaChartLine,
  FaChartBar,
  FaMoneyBillWave,
  FaMapMarkedAlt,
  FaNetworkWired,
  FaBox,
  FaSignOutAlt
} from "react-icons/fa";
import React from "react";

const AdminSidebar = () => {
  return (
    <div className="w-64 z-50 bg-blue-900 text-white h-screen p-6 fixed left-0 top-0">
      {/* Logo */}
      <div className="flex items-center gap-3 mb-8">
        <img src="/src/images/dummy logo.png" alt="Logo" className="h-10 w-10" />
        <h1 className="text-lg font-bold">Admin</h1>
      </div>

      {/* Navigation Links */}
      <ul className="space-y-4">
        <NavItem to="/admin-dashboard" icon={<FaTachometerAlt />} label="Dashboard" />
        <NavItem to="/admin-dashboard/sales-reports" icon={<FaChartBar />} label="Sales Report" />
        <NavItem to="/admin-dashboard/taxation-details" icon={<FaMoneyBillWave />} label="Taxation Details" />
        <NavItem to="/admin-dashboard/currency-revenue" icon={<FaChartLine />} label="Currency & Revenue Management" />
        <NavItem to="/admin-dashboard/buyer-density-map" icon={<FaMapMarkedAlt />} label="Buyers' Density Map" />
        <NavItem to="/admin-dashboard/referral-tracking" icon={<FaNetworkWired />} label="Referral Sales Tracking" />
        <NavItem to="/admin-dashboard/product-analytics" icon={<FaBox />} label="Product Performance" />
        <NavItem to="/login" icon={<FaSignOutAlt />} label="Logout" />
      </ul>
    </div>
  );
};

const NavItem = ({ to, icon, label }) => {
  return (
    <li>
      <NavLink
        to={to}
        className={({ isActive }) =>
          `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-white ${
            isActive ? "bg-blue-400 font-semibold" : "hover:bg-blue-700"
          }`
        }
      >
        {icon} <span>{label}</span>
      </NavLink>
    </li>
  );
};

export default AdminSidebar;


