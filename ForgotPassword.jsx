import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import back from "../assets/left-arrow.png";
// import axios from "axios"; // Uncomment when integrating API

function ForgotPassword() {
  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("A password reset link has been sent to your email.");

    // Example API call (uncomment when backend is ready)
    // try {
    //   const response = await axios.post("https://api.example.com/forgot-password", { emailOrUsername });
    //   setMessage(response.data.message);
    // } catch (error) {
    //   setMessage("Error sending reset link. Please try again.");
    // }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#CAE8E9]">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
        <div className="mb-4">
          <Link to="/signin">
            <img
              src={back}
              alt="Back"
              className="h-8 p-2 bg-purple-400 rounded-md transition hover:bg-purple-500"
            />
          </Link>
        </div>

        <form onSubmit={handleSubmit}>
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
            Forgot Password
          </h2>

          <div className="relative flex items-center border border-purple-500 rounded-md p-3">
            <FontAwesomeIcon icon={faUser} className="text-purple-700 mr-3" />
            <input
              type="text"
              placeholder="Email or Username"
              name="emailOrUsername"
              value={emailOrUsername}
              onChange={(e) => setEmailOrUsername(e.target.value)}
              className="w-full focus:outline-none bg-transparent"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-purple-500 text-white py-3 rounded-md mt-5 transition hover:bg-purple-600"
          >
            Send
          </button>
        </form>

        {message && (
          <p className="text-center text-green-600 mt-4">{message}</p>
        )}
      </div>
    </div>
  );
}

export default ForgotPassword;

