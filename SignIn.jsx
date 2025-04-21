import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock } from "@fortawesome/free-solid-svg-icons";

const SignIn = ({ onLogin }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("Admin"); // Role selection
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        setError("");

        // Hardcoded credentials for testing
        if (role === "Admin" && email === "admin@example.com" && password === "12345678") {
            localStorage.setItem("isAuthenticated", "true");
            localStorage.setItem("userRole", "admin");
            onLogin("admin");
            navigate("/admin-dashboard");
        } else if (role === "Customer" && email === "customer@example.com" && password === "12345678") {
            localStorage.setItem("isAuthenticated", "true");
            localStorage.setItem("userRole", "customer");
            onLogin("customer");
            navigate("/customer-dashboard");
        } else {
            setError("Invalid credentials. Try again.");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-[#CAE8E9]">
            <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-3xl font-bold mb-8 text-[#BA60C8] text-center">Sign In</h2>
                {error && <p className="text-red-500 text-center">{error}</p>}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="flex items-center border border-[#9747FF] p-2 rounded-md">
                        <FontAwesomeIcon icon={faUser} className="text-[#471AA0]" />
                        <input
                            type="text"
                            placeholder="Email"
                            className="w-full outline-none text-black ml-2"
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="flex items-center border border-[#9747FF] p-2 rounded-md">
                        <FontAwesomeIcon icon={faLock} className="text-[#471AA0]" />
                        <input
                            type="password"
                            placeholder="Password"
                            className="w-full outline-none text-black ml-2"
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    {/* Role Selection */}
                    <div className="flex justify-between items-center">
                        <label className="text-[#471AA0] font-semibold">Login as:</label>
                        <select
                            className="border border-[#9747FF] bg-[#BB84E8] text-white p-2 rounded-md"
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                        >
                            <option>Admin</option>
                            <option>Customer</option>
                        </select>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-[#BB84E8] text-white rounded-md py-2 hover:bg-[#a866df]"
                    >
                        Log In
                    </button>
                </form>

                <p className="text-center text-[#BA60C8] mt-4">
                    Don't have an account?
                    <Link to="/register" className="font-bold ml-1">
                        Register
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default SignIn;
