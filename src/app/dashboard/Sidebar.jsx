"use client";
import React, { useState } from "react";
import Link from "next/link";
import Logout from "@/app/auth/logout/Logout";
import Session from "@/app/auth/session";
const Sidebar = () => {
  const [activeMenu, setActiveMenu] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleMenu = (menu) => {
    setActiveMenu(activeMenu === menu ? null : menu);
  };
  return (
    <aside className="w-full md:w-64 bg-red-600 text-white p-4 flex flex-col">
      {/* Toggle Button */}
      <button
        className=" bg-black text-white p-2 m-2 rounded-md shadow"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? "Hide Sidebar" : "Show Sidebar"}
      </button>

      <Logout />

      <h1 className="text-3xl my-2">Welcome, {Session}</h1>

      {isSidebarOpen && (
        <aside className="w-full md:w-60 bg-red-600 text-white p-4 flex flex-col">
          <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
          <nav className="space-y-2">
            {[
              {
                name: "Orders",
                url: `/dashboard/orders`,
                items: [
                  {
                    name: "All Orders",
                    url: `/dashboard/orders`,
                  },
                  {
                    name: "processing",
                    url: `/dashboard/orders/processing`,
                  },
                  {
                    name: "Delivered",
                    url: `/dashboard/orders/delivered`,
                  },
                ],
              },
              {
                name: "Users",
                url: "/dashboard/users",
                items: [
                  {
                    name: "All users",
                    url: `/dashboard/users`,
                  },
                  {
                    name: "Admins",
                    url: `/dashboard/users/admins`,
                  },
                  {
                    name: "Customers",
                    url: `/dashboard/users/customers`,
                  },
                ],
              },
              {
                name: "Settings",
                url: "/dashboard/settins",

                items: [
                  {
                    name: "General",
                    url: `/dashboard/settins`,
                  },
                  {
                    name: "Notifications",
                    url: `/dashboard/settins/notifications`,
                  },
                  {
                    name: "Profile",
                    url: `/dashboard/settins/profile`,
                  },
                ],
              },
            ].map((menu, index) => (
              <div key={index}>
                <button
                  className="w-full text-left p-2 rounded-md hover:bg-red-700"
                  onClick={() => toggleMenu(menu.name)}
                >
                  {menu.name}
                </button>

                {activeMenu === menu.name && (
                  <div className="pl-4 space-y-1">
                    {menu.items.map((item, subIdx) => (
                      <Link href={`${item.url}`} key={subIdx}>
                        <button
                          // key={subIdx}
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
    </aside>
  );
};

export default Sidebar;
