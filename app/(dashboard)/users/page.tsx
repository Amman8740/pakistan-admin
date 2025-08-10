"use client";

import { banUser, getAllUsers } from "@/app/hooks/useAdmin";
import UserCard from "@/components/UserCard";
import { useEffect, useState } from "react";
type User = {
  _id: string;
  name: string;
  phone: string;
  status: "active" | "banned";
};
// const initialActiveUsers: User[] = [
//     { name: "Shujaat Ali", phone: "+923454897189" },
//     { name: "Zeeshan Ahmed", phone: "+923454897189" },
//     { name: "vikesh kumar", phone: "+923008307770" },
//   ];

//   const initialBannedUsers: User[] = [
//     { name: "Shahheryar Nawab", phone: "+923006617464" },
//     { name: "Natasha Rehman", phone: "+923224453734" },
//     { name: "Antonio Marrazzo", phone: "+923369171247" },
//   ];
export default function UserPage() {
  const [activeTab, setActiveTab] = useState<"active" | "banned">("active");
  const [search, setSearch] = useState("");
  const [activeUsers, setActiveUsers] = useState<User[]>([]);
  const [bannedUsers, setBannedUsers] = useState<User[]>([]);
  useEffect(() => {
    getAllUsers()
      .then((data) => {
        const active = data.filter((user: User) => user.status === "active");
        const banned = data.filter((user: User) => user.status === "banned");
        setActiveUsers(active);
        setBannedUsers(banned);
      })
      .catch((err) => {
        console.error("Failed to load users:", err);
      });
  }, []);
  const handleBan = async (user: User) => {
    try {
      await banUser(user._id);
      setActiveUsers((prev) => prev.filter((u) => u._id !== user._id));
      setBannedUsers((prev) => [...prev, { ...user, status: "banned" }]);
    } catch (err: any) {
      console.error("Ban failed:", err);
      alert(err.message || "Failed to ban user");
    }
  };
  const handleUnban = (user: User) => {
    setBannedUsers((prev) => prev.filter((u) => u._id !== user._id));
    setActiveUsers((prev) => [...prev, { ...user, status: "active" }]);
  };

  const displayedUsers = activeTab === "active" ? activeUsers : bannedUsers;

  const filteredUsers = displayedUsers.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <div className="w-full mx-auto p-6">
      <h1 className="text-xl font-bold mb-4">All Users</h1>

      {/* Tabs */}
      <div className="flex border-b border-gray-300 mb-4">
        <button
          onClick={() => setActiveTab("active")}
          className={`px-4 py-2 font-semibold ${
            activeTab === "active"
              ? "border-b-2 border-green-500 text-green-600"
              : "text-gray-500"
          }`}
        >
          Active Users
        </button>
        <button
          onClick={() => setActiveTab("banned")}
          className={`px-4 py-2 font-semibold ${
            activeTab === "banned"
              ? "border-b-2 border-red-500 text-red-600"
              : "text-gray-500"
          }`}
        >
          Banned Users
        </button>
      </div>

      {/* Search */}
      <input
        type="text"
        placeholder="Search users..."
        className="w-full mb-4 px-4 py-2 border rounded"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* User List */}
      <div className="space-y-4">
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user, index) => (
            <UserCard
              key={user._id}
              name={user.name}
              phone={user.phone}
              onBan={() =>
                activeTab === "active" ? handleBan(user) : handleUnban(user)
              }
              isBanned={activeTab === "banned"}
            />
          ))
        ) : (
          <p className="text-gray-400 text-sm text-center">No users found.</p>
        )}
      </div>
    </div>
  );
}
