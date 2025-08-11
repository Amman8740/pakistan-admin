"use client";
import React from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

type PostPageLayoutProps = {
  title: string;
  children: React.ReactNode;

  // NEW (controlled search)
  search: string;
  onSearchChange: (v: string) => void;
};

export default function PostPageLayout({
  title,
  children,
  search,
  onSearchChange,
}: PostPageLayoutProps) {
  const [activeTab, setActiveTab] = React.useState<"active" | "inactive">(
    "active"
  );

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-xl font-semibold">{title}</h1>

      {/* Search bar — 80% on desktop */}
      <div className="w-full flex justify-start">
        <Input
          type="text"
          placeholder="Search posts..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full sm:w-2/3 md:w-5/5"
        />
      </div>

      {/* Active / Inactive Toggle */}
      <div className="grid grid-cols-2 gap-2">
        <Button
          className={`rounded-full w-full transition-colors ${
            activeTab === "active"
              ? "bg-green-600 text-white hover:bg-green-700"
              : "bg-gray-200 hover:bg-gray-300"
          }`}
          onClick={() => setActiveTab("active")}
        >
          Active Posts
        </Button>
        <Button
          className={`rounded-full w-full transition-colors ${
            activeTab === "inactive"
              ? "bg-green-600 text-white hover:bg-green-700"
              : "bg-gray-200 hover:bg-gray-300"
          }`}
          onClick={() => setActiveTab("inactive")}
        >
          Inactive Posts
        </Button>
      </div>

      <div className="space-y-3">{children}</div>
    </div>
  );
}
