"use client";
import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

type PostPageLayoutProps = {
    title: string;
    children: React.ReactNode;
  };
export default function PostPageLayout({title, children}: PostPageLayoutProps) {
    const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("low-to-high");
  const [activeTab, setActiveTab] = useState<"active" | "inactive">("active");
    return (
        <div className="p-4 space-y-4">
      {/* Title */}
      <h1 className="text-xl font-semibold">{title}</h1>

      {/* Search + Filter Row */}
      <div className="w-full flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <Input
          type="text"
          placeholder="Search posts..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:w-1/2"
        />
        <div className="flex items-center gap-2">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="border px-3 py-1 rounded-md"
          >
            <option value="low-to-high">Low to High</option>
            <option value="high-to-low">High to Low</option>
          </select>
        </div>
      </div>

      {/* Active / Inactive Toggle */}
      <div className="grid grid-cols-2 gap-2">
        <Button
          className={`rounded-full w-full ${
            activeTab === "active" ? "bg-green-600 text-white" : "bg-gray-200"
          }`}
          onClick={() => setActiveTab("active")}
        >
          Active Posts
        </Button>
        <Button
          className={`rounded-full w-full ${
            activeTab === "inactive" ? "bg-green-600 text-white" : "bg-gray-200"
          }`}
          onClick={() => setActiveTab("inactive")}
        >
          Inactive Posts
        </Button>
      </div>

      {/* Posts */}
      <div className="space-y-3">
        {children}
      </div>
    </div>
    )
}