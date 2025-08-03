"use client";

import { useState } from "react";

const dummyUsers = [
  {
    id: 1,
    name: "Ajmal Khan - Zarghoon Energy Solutions",
    phone: "+923313688836",
    status: "pending",
  },
  { id: 2, name: "Murtaza", phone: "+923218270451", status: "pending" },
  { id: 3, name: "Zeeshan", phone: "+923100112233", status: "verified" },
  { id: 4, name: "Ahmed", phone: "+923004445566", status: "rejected" },
];
export default function VerificationPage() {
  const TABS = ["pending", "verified", "rejected"] as const;
  type TabType = (typeof TABS)[number];
  const [activeTab, setActiveTab] = useState<TabType>("pending");
  const filteredUser = dummyUsers.filter((user) => user.status === activeTab);
  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-lg font-semibold text-center mb-4">
        Profile Verification
      </h1>
      <div className="flex justify-around border-b mb-4">
        {TABS.map((tab) => (
          <button
            key={tab}
            className={`py-2 text-sm font-medium ${
              activeTab === tab
                ? "border-b-2 border-green-500 text-green-600"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>
      <div className="space-y-3">
        {filteredUser.length === 0 ? (
          <p>No user found in this category</p>
        ) : (
          filteredUser.map((user) => (
            <div
              key={user.id}
              className="bg-gray-100 rounded-xl px-4 py-3 flex justify-between items-center shadow-sm"
            >
              <div>
                <p className="font-medium">{user.name}</p>
                <p className="text-sm text-gray-600">{user.phone}</p>
              </div>
              <span className="text-green-600 text-sm font-semibold capitalize">
                {user.status}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
