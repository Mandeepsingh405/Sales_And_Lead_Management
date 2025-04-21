import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import React, { useState, useEffect, lazy, Suspense } from "react";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import ForgotPassword from "./pages/ForgotPassword";
import CustomerSidebar from "./components/CustomerSidebar";
import AdminSidebar from "./components/AdminSidebar";
import BuyersDensityMap from "./pages/adminDashboard/BuyersDensityMap";
import CurrencyRevenueManagement from "./pages/adminDashboard/RevenueManagment";
import ReferralSalesTracking from "./pages/adminDashboard/ReferralSales";
import ProductPerformance from "./pages/adminDashboard/ProductPerformance";

// Lazy loaded components for better performance
const CustomerDashboard = lazy(() => import("./pages/CustomerDashboard"));
const LeadManagement = lazy(() => import("./pages/LeadManagement"));
const ProductManagement = lazy(() => import("./pages/ProductManagement"));
const SalesManagement = lazy(() => import("./pages/salesManagement/SalesEntry"));
const SalesReport = lazy(() => import("./pages/salesManagement/SalesReport"));
const SalesReports = lazy(() => import("./pages/adminDashboard/SalesReports"));
const TaxationDetails = lazy(() => import("./pages/adminDashboard/TaxationDetails"));
const Dashboard = lazy(() => import("./pages/adminDashboard/Dashboard"));

// Layout Component for Customer Dashboard
const CustomerLayout = ({ logout }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex">
      {/* Hamburger Button for Mobile */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 bg-gray-800 text-white p-2 rounded"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        ☰
      </button>

      {/* Sidebar - Always Visible on Desktop */}
      <CustomerSidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />

      {/* Main Content Area */}
      <div className="flex-1 p-6 md:ml-64">
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route index element={<CustomerDashboard />} />
            <Route path="lead-management" element={<LeadManagement />} />
            <Route path="product-management" element={<ProductManagement />} />
            <Route path="sales-management" element={<SalesManagement />} />
            <Route path="sales-report" element={<SalesReport />} />
          </Routes>
        </Suspense>
      </div>
    </div>
  );
};




// Layout Component for Admin Dashboard
const AdminLayout = ({ logout }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex">
      {/* Hamburger Button for Mobile */}
      <button
        className="md:hidden absolute top-4 left-4 z-50 bg-gray-800 text-white p-2 rounded"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        ☰
      </button>

      {/* Sidebar - Visible on Desktop, Toggleable on Mobile */}
      <div className={`${isSidebarOpen ? "block" : "hidden"} md:block fixed md:relative`}>
        <AdminSidebar logout={logout} />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-6 md:ml-64">
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route index element={<Dashboard />} />
            <Route path="sales-reports" element={<SalesReports />} />
            <Route path="taxation-details" element={<TaxationDetails />} />
            <Route path="buyer-density-map" element={<BuyersDensityMap />} />
            <Route path="currency-revenue" element={<CurrencyRevenueManagement/>} />
            <Route path="referral-tracking" element={<ReferralSalesTracking/>} />
            <Route path="product-analytics" element={<ProductPerformance/>} />
          </Routes>
        </Suspense>
      </div>
    </div>
  );
};

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem("isAuthenticated") === "true");
  const [userRole, setUserRole] = useState(localStorage.getItem("userRole") || null);

  const login = (role) => {
    setIsAuthenticated(true);
    setUserRole(role);
    localStorage.setItem("isAuthenticated", "true");
    localStorage.setItem("userRole", role);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUserRole(null);
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userRole");
  };

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<SignIn onLogin={login} />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* Customer Dashboard Layout */}
        <Route
          path="/customer-dashboard/*"
          element={isAuthenticated && userRole === "customer" ? <CustomerLayout logout={logout} /> : <Navigate to="/signin" />}
        />

        {/* Admin Dashboard Layout */}
        <Route
          path="/admin-dashboard/*"
          element={isAuthenticated && userRole === "admin" ? <AdminLayout logout={logout} /> : <Navigate to="/signin" />}
        />

        {/* Redirect to Home if No Matching Route */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;

