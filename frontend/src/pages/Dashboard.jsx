import React from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-100">

      {/* Header */}
      <div className="bg-black text-white px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-semibold">Edu Prompt AI</h1>
        <button
          onClick={handleLogout}
          className="bg-white text-black px-4 py-1 rounded hover:bg-gray-200 transition"
        >
          Logout
        </button>
      </div>

      {/* Content */}
      <div className="p-8">

        <div className="bg-white shadow-md rounded-xl p-6">
          <h2 className="text-2xl font-bold mb-4">
            Welcome to Dashboard
          </h2>

          <p className="text-gray-600">
            Your authentication system is working correctly.
          </p>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
              <h3 className="font-semibold">AI Prompt Runner</h3>
              <p className="text-sm text-gray-500 mt-2">
                Generate smart AI prompts.
              </p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
              <h3 className="font-semibold">User Profile</h3>
              <p className="text-sm text-gray-500 mt-2">
                Manage account details.
              </p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
              <h3 className="font-semibold">Analytics</h3>
              <p className="text-sm text-gray-500 mt-2">
                Track usage & activity.
              </p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}

export default Dashboard;