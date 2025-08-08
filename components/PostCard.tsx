"use client";
import { useState } from "react";
import { MoreVertical, Edit, Trash } from "lucide-react";
import Link from "next/link";
import EditPostModal from "./EditPostModal";
import { deletePost, updatePost } from "@/app/hooks/usePanel";

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
  const [showEditModal, setShowEditModal] = useState(false)
  const [deleting, setDeleting] = useState(false);
    const initialData = {
    price: price || 0,
    tokenMoney: "",
    location: "",
    type: "",
    quantity: "",
    availability: "",
  };
    const handleSave = async (updatedData: any) => {
    try {
    const result = await updatePost(id.toString(), updatedData);
    console.log("Updated successfully:", result);
    setShowEditModal(false);
    onEdit(); // optional if needed to refresh
  } catch (error) {
    console.error("Update failed:", error);
    alert("Failed to update post");
  }
  };
    const handleDelete = async () => {
    const confirmed = window.confirm("Are you sure you want to delete this post?");
    if (!confirmed) return;

    try {
      setDeleting(true);
      await deletePost(id);
      onDelete(); // Optional: triggers parent state update
    } catch (error: any) {
      alert(error.message || "Failed to delete post");
    } finally {
      setDeleting(false);
    }
  };

  return (
<div className="w-full bg-gray-100 p-4 rounded shadow-sm flex justify-between items-start relative">
  {/* Clickable area only for title */}
  <Link href={`/posts/${category}/${id}`} className="block flex-1">
    <div>
      <p className="font-semibold text-lg">{title}</p>
      <div className="flex items-center gap-2 mt-2">
        <span className="w-3 h-3 bg-blue-500 rounded-full" title="null"></span>
        <span className="w-3 h-3 border border-green-500 rounded-full"></span>
        <span className="w-3 h-3 border border-red-500 rounded-full"></span>
      </div>
    </div>
  </Link>

  {/* Price and Status Dot */}
  <div className="text-right mr-5">
    <p className="font-semibold text-gray-800">{price}</p>
    <span
      className={`inline-block w-3 h-3 mt-2 rounded-full ${
        isPriceValid ? "bg-green-500" : "bg-red-500"
      }`}
    ></span>
  </div>

  {/* Menu Icon */}
  <div className="absolute top-4 right-4 z-10">
    <button
      onClick={(e) => {
        e.stopPropagation(); // ⛔ prevent bubbling to Link
        setShowMenu(!showMenu);
      }}
    >
      <MoreVertical size={20} />
    </button>

    {showMenu && (
      <div className="absolute right-0 mt-2 w-24 bg-white border rounded shadow-lg z-10">
        <button
          onClick={(e) => {
            e.stopPropagation();
            setShowMenu(false);
            setShowEditModal(true);
          }}
          className="flex items-center px-3 py-2 text-sm hover:bg-gray-100 w-full"
        >
          <Edit size={14} className="mr-2" /> Edit
        </button>
             <button
                  onClick={(e) => {
                    e.preventDefault();
                    setShowMenu(false);
                    handleDelete();
                  }}
                  className="flex items-center px-3 py-2 text-sm hover:bg-gray-100 text-red-500 w-full"
                  disabled={deleting}
                >
                  <Trash size={14} className="mr-2" /> {deleting ? "..." : "Delete"}
                </button>
      </div>
    )}
  </div>

  {/* Modal */}
  <EditPostModal
    isOpen={showEditModal}
    onClose={() => setShowEditModal(false)}
    initialData={initialData}
    onSave={handleSave}
  />
</div>

  );
}
