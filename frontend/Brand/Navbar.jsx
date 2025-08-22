import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar= () => {

  let navigate=useNavigate()
  const logout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <header className="w-full bg-white shadow-md py-4 px-6 flex items-center justify-between">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/96ed444f12f2297ccd4006841bd1831940e6f23d36396492d16831d2cdf15c29?apiKey=5b7d47d822c447fbbf3f0faf7f51790e&"
          alt="Logo"
          className="w-10 h-10"
        />
        <span className="text-xl font-bold text-gray-800">Brand Monitor</span>
      </div>

      {/* Navigation Links */}
      <nav className="flex gap-4">
        <Link
          to="/DashBoard"
          className="px-4 py-2 rounded-md bg-gray-100 hover:bg-gray-200 text-sm font-medium text-gray-800 transition duration-200"
        >
          Home
        </Link>
        <Link
          to="/chart"
          className="px-4 py-2 rounded-md bg-gray-100 hover:bg-gray-200 text-sm font-medium text-gray-800 transition duration-200"
        >
          Review Comparison
        </Link>
        <Link
          to="/aihelp"
          className="px-4 py-2 rounded-md bg-gray-100 hover:bg-gray-200 text-sm font-medium text-gray-800 transition duration-200"
        >
          AI Help
        </Link>
      </nav>

      {/* Action Buttons */}
      <div className="flex gap-3">
        <button
          onClick={logout}
          className="px-4 py-2 rounded-md bg-red-500 hover:bg-red-600 text-white text-sm font-medium transition duration-200"
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default Navbar;