"use client";

import { useState } from "react";
import { BsWhatsapp } from "react-icons/bs";
import { FaPhoneAlt } from "react-icons/fa";
import { HiOutlineDotsVertical } from "react-icons/hi";

type PostDetailsPageProps = {
    post: {
        title: string;
        power?: string;
        tags: string[];
        tokenMoney: number;
        hoursInactive: number;
        buyerType: string;
        status: string;
    };
    user: {
        name: string;
        code: string;
        role: string;
    }
    category: "panels" | "inverters" | "batteries";

}
export default function PostDetailsPage({post, user, category}: PostDetailsPageProps) {
    const [activeTab, setActiveTab] = useState("panels");
    return (
        <div className="w-full">
      {/* Top Section - Black Background */}
      <div className="bg-white text-black p-6 text-center rounded-2xl">
        <div className="w-24 h-24 mx-auto rounded-full bg-blue-300 relative">
          <span className="absolute top-2/3 left-2/3 w-5 h-5 bg-gray-500 rounded-full"></span>
        </div>
        <h2 className="mt-4 text-xl font-semibold">Azeema</h2>
        <p className="text-sm">{user.code} ({user.role})</p>

        {/* Buttons */}
        <div className="flex justify-center gap-3 mt-4 flex-wrap">
          <button className="bg-green-300 text-black px-4 py-2 rounded-2xl flex items-center gap-2">
            <FaPhoneAlt /> Call us
          </button>
          <button className="bg-green-500 text-white px-4 py-2 rounded-2xl flex items-center gap-2">
            <BsWhatsapp /> Whatsapp
          </button>
          <button className="bg-red-500 text-white px-4 py-2 rounded-2xl">See report</button>
        </div>

        {/* Tag Selector */}
        <div className="flex justify-center mt-4">
  <div className="flex items-center gap-2 bg-gray-400 rounded-2xl px-4 py-2 w-fit">
    <label className="text-white">Assign Tag:</label>
    <select className="px-3 py-1 rounded text-white bg-gray-400">
      <option value="user">user</option>
      <option value="dealer">dealer</option>
      <option value="verified">verified</option>
    </select>
  </div>
</div>
      </div>

      {/* Tabs */}
      <div className="grid grid-cols-3 text-center">
        {["PANELS", "INVERTERS", "BATTERIES"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab.toLowerCase())}
            className={`m-1 py-3 text-sm font-medium rounded-2xl ${
              activeTab === tab.toLowerCase()
                ? "bg-green-500 text-white"
                : "bg-gray-200"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Post Card */}
      <div className="p-4">
        <div className="bg-gray-100 p-4 rounded-xl flex justify-between items-center relative">
          {/* Left */}
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-300 rounded-full" />
            <div>
              <p className="font-semibold">{post.title}</p>
              <div className="flex gap-2 mt-1 flex-wrap">
                {post.tags.map((tag, i) => {
                  const colors: Record<string, string> = {
                    "1 Container": "bg-blue-500",
                    "EX-PWR": "bg-green-500",
                    "Ready Stock": "bg-red-500",
                  };
                  return (
                    <span
                      key={i}
                      className={`text-xs text-white px-2 py-1 rounded ${
                        colors[tag] || "bg-gray-500"
                      }`}
                    >
                      {tag}
                    </span>
                  );
                })}
              </div>
              <p className="text-sm mt-1 text-gray-600">
                Token Money: {post.tokenMoney}
              </p>
            </div>
          </div>

          {/* Right */}
          <div className="text-righ m-4">
            <p className="text-lg font-semibold">{post.hoursInactive}</p>
            <p className="text-xs text-red-500">{post.buyerType}</p>
            <p className="text-sm text-green-500">{post.status}</p>
          </div>

          {/* Menu */}
          <button className="absolute right-4 top-4">
            <HiOutlineDotsVertical />
          </button>
        </div>
      </div>
    </div>
    )
}