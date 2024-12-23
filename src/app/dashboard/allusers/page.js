"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { fetchUsers, setPage } from "../../redux/slice";

const Dashboard = () => {
  const [activeMenu, setActiveMenu] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null); // To track the order being viewed
  const [orders, setOrders] = useState([
    {
      id: 1,
      name: "Order #1",
      status: "Pending",
      details: "Details of Order #1",
    },
    {
      id: 2,
      name: "Order #2",
      status: "Delivered",
      details: "Details of Order #2",
    },
    {
      id: 3,
      name: "Order #3",
      status: "Processing",
      details: "Details of Order #3",
    },
  ]);

  const dispatch = useDispatch();
  const { users, status, error, currentPage, totalPages } = useSelector(
    (state) => state.users
  );

  useEffect(() => {
    dispatch(fetchUsers(currentPage)); // Fetch users based on current page
  }, [currentPage, dispatch]);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      dispatch(setPage(currentPage - 1)); // Navigate to previous page
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      dispatch(setPage(currentPage + 1)); // Navigate to next page
    }
  };

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-xl font-bold animate-pulse text-blue-500">
          Loading...
        </div>
      </div>
    );
  }

  if (status === "failed") {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-red-500">Error: {error}</div>
      </div>
    );
  }

  const toggleMenu = (menu) => {
    setActiveMenu(activeMenu === menu ? null : menu);
  };

  const changeStatus = (id, newStatus) => {
    if (window.confirm("Are you sure you want to change the order status?")) {
      setOrders(
        orders.map((order) =>
          order.id === id ? { ...order, status: newStatus } : order
        )
      );
    }
  };

  const viewDetails = (order) => {
    setSelectedOrder(order); // Set the selected order to show details
  };

  const closeDialog = () => {
    setSelectedOrder(null); // Close the dialog by clearing the selected order
  };

  return (
    <div className="min-h-screen bg-red-50 flex flex-col md:flex-row">
      {/* Toggle Button */}
      <button
        className="md:hidden bg-red-600 text-white p-2 m-2 rounded-md shadow"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? "Hide Sidebar" : "Show Sidebar"}
      </button>

      {/* Sidebar */}
      {isSidebarOpen && (
        <aside className="w-full md:w-64 bg-red-600 text-white p-4 flex flex-col">
          <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
          <nav className="space-y-2">
            {[
              {
                name: "Orders",
                url: `/dashboard/allorders`,
                items: [
                  {
                    name: "All Orders",
                    url: `/dashboard/allorders`,
                  },
                  {
                    name: "New Orders",
                    url: `/dashboard/neworders`,
                  },
                  {
                    name: "Delivered",
                    url: `/dashboard/delivered`,
                  },
                ],
              },
              {
                name: "Users",
                url: "http://localhost:3000/dashboard/allusers",
                items: [
                  {
                    name: "All users",
                    url: `/dashboard/allusers`,
                  },
                  {
                    name: "Admins",
                    url: `/dashboard/admins`,
                  },
                  {
                    name: "Customers",
                    url: `/dashboard/customers`,
                  },
                ],
              },
              {
                name: "Settings",
                url: "http://localhost:3000/dashboard/settins",

                items: [
                  {
                    name: "General",
                    url: `/dashboard/settins`,
                  },
                  {
                    name: "Notifications",
                    url: `/dashboard/settins`,
                  },
                  {
                    name: "Profile",
                    url: `/dashboard/settins`,
                  },
                ],
              },
            ].map((menu, idx) => (
              <div key={idx}>
                <button
                  className="w-full text-left p-2 rounded-md hover:bg-red-700"
                  onClick={() => toggleMenu(menu.name)}
                >
                  {menu.name}
                </button>

                {activeMenu === menu.name && (
                  <div className="pl-4 space-y-1">
                    {menu.items.map((item, subIdx) => (
                      <Link href={`${item.url}`}>
                        <button
                          key={subIdx}
                          className="w-full text-left text-sm p-1 rounded-md hover:bg-red-800"
                        >
                          {item.name}
                        </button>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
        </aside>
      )}

      {/* Main Content */}
      <main className="flex-1 p-6">
        <h1 className="text-3xl font-bold text-red-700 mb-4">Manage Users</h1>
        <div className="bg-white rounded-lg shadow p-4">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="border-b p-2 text-left">Name</th>
                <th className="border-b p-2 text-left">Email</th>
                <th className="border-b p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((order) => (
                <tr key={order._id}>
                  <td className="border-b p-2">{order.name} </td>
                  <td className="border-b p-2">{order.email}</td>
                  <td className="border-b p-2 flex space-x-2">
                    <select
                      className="border p-1 rounded-md"
                      value={order.email}
                      onChange={(e) => changeStatus(order._id, e.target.value)}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Processing">Processing</option>
                      <option value="Delivered">Delivered</option>
                    </select>
                    <button
                      className="bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700"
                      onClick={() => viewDetails(order)}
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-between items-center mt-8">
          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            className={`px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200 ${
              currentPage === 1 && "opacity-50 cursor-not-allowed"
            }`}
          >
            Previous
          </button>

          <span className="text-lg">
            Page {currentPage} of {totalPages}
          </span>

          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200 ${
              currentPage === totalPages && "opacity-50 cursor-not-allowed"
            }`}
          >
            Next
          </button>
        </div>
      </main>

      {/* user Details Dialog */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg p-6 w-3/4 max-w-lg">
            <h2 className="text-2xl font-bold mb-4">user Details</h2>
            <p className="mb-4">
              <strong>user Name:</strong> {selectedOrder.name}
            </p>
            <p className="mb-4">
              <strong>email:</strong> {selectedOrder.email}
            </p>
            <p className="mb-4">
              <strong>password:</strong> {selectedOrder.password}
            </p>
            <button
              className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
              onClick={closeDialog}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
