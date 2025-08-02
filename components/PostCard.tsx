"use client";
import { useState } from "react";
import { MoreVertical, Edit, Trash } from "lucide-react";
import Link from "next/link";

type PostCardProps = {
    id: number;
  title: string;
  price: number;
  category: "panels" | "inverters" | "batteries";
  isPriceValid: boolean;
  onEdit: () => void;
  onDelete: () => void;
};

export default function PostCard({
    id,
  title,
  price,
  category,
  isPriceValid,
  onEdit,
  onDelete,
}: PostCardProps) {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <Link href={`/posts/${category}/${id}`} className="block">
    <div className="w-full bg-gray-100 p-4 rounded shadow-sm flex justify-between items-start relative">
      {/* Left Side - Title and Dots */}
      <div>
        <p className="font-semibold text-lg">{title}</p>
        <div className="flex items-center gap-2 mt-2">
          <span className="w-3 h-3 bg-blue-500 rounded-full" title="null"></span>
          <span className="w-3 h-3 border border-green-500 rounded-full"></span>
          <span className="w-3 h-3 border border-red-500 rounded-full"></span>
        </div>
      </div>

      {/* Right Side - Price and Status Dot */}
      <div className="text-right mr-5">
        <p className="font-semibold text-gray-800">{price}</p>
        <span
          className={`inline-block w-3 h-3 mt-2 rounded-full ${
            isPriceValid ? "bg-green-500" : "bg-red-500"
          }`}
        ></span>
      </div>

      {/* Menu Icon */}
      <div className="absolute top-4 right-4">
        <button onClick={() => setShowMenu(!showMenu)}>
          <MoreVertical size={20} />
        </button>

        {showMenu && (
          <div className="absolute right-0 mt-2 w-24 bg-white border rounded shadow-lg z-10">
            <button
              onClick={() => {
                setShowMenu(false);
                onEdit();
              }}
              className="flex items-center px-3 py-2 text-sm hover:bg-gray-100 w-full"
            >
              <Edit size={14} className="mr-2" /> Edit
            </button>
            <button
              onClick={() => {
                setShowMenu(false);
                onDelete();
              }}
              className="flex items-center px-3 py-2 text-sm hover:bg-gray-100 text-red-500 w-full"
            >
              <Trash size={14} className="mr-2" /> Delete
            </button>
          </div>
        )}
      </div>
    </div>
    </Link>
  );
}
