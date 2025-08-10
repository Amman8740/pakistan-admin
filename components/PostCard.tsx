"use client";
import { useMemo, useState } from "react";
import { MoreVertical, Edit, Trash, Clock } from "lucide-react";
import Link from "next/link";
import EditPostModal from "./EditPostModal";
import { deletePost, updatePost } from "@/app/hooks/usePanel";

type PostCardProps = {
  // ids in your DB are strings
  id: string;
  category: "panels" | "inverters" | "batteries";

  title: string;          // name (e.g., "Tiger Neo")
  price: number;          // e.g., 200000

  // new fields you want to show
  container: "container" | "pallet" | string;
  quantity: number;       // number of containers/pallets
  location: string;       // e.g., "EX-LHR" or "seller"
  availability: string;   // e.g., "Ready Stock" | "Delivery"
  type: "seller" | "buyer";
  deliveryDate?: string;  // ISO date string or ""

  // status dot on the right (green if active)
  isActive?: boolean;

  // edit/delete handlers
  onEdit: () => void;
  onDelete: () => void;
};

export default function PostCard({
  id,
  category,
  title,
  price,
  container,
  quantity,
  location,
  availability,
  type,
  deliveryDate,
  isActive = true,
  onEdit,
  onDelete,
}: PostCardProps) {
  const [showMenu, setShowMenu] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [deleting, setDeleting] = useState(false);

  // helpers
  const containerLabel = useMemo(() => {
    const base = container?.toLowerCase() === "pallet" ? "Pallet" : "Container";
    const q = Number.isFinite(quantity) ? quantity : 0;
    return `${q} ${base}${q === 1 ? "" : "s"}`;
  }, [container, quantity]);

  const daysLeft = useMemo(() => {
    if (!deliveryDate) return null;
    const target = new Date(deliveryDate);
    if (isNaN(+target)) return null;
    const diffMs = target.getTime() - Date.now();
    // round up so future same-day shows 0D -> 0
    const d = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
    return d;
  }, [deliveryDate]);

  const priceShort = useMemo(() => {
    // show “20” like the mobile UI (likely in “K” or “per piece”)
    // tweak as you prefer; here we convert to thousands if >= 1000
    if (price >= 1000) return Math.round(price / 1000);
    return price;
  }, [price]);

  const initialData = {
    price,
    tokenMoney: "",
    location,
    type,
    quantity: String(quantity ?? ""),
    availability,
  };

  const handleSave = async (updatedData: any) => {
    try {
      await updatePost(id, updatedData);
      setShowEditModal(false);
      onEdit();
    } catch (error) {
      console.error("Update failed:", error);
      alert("Failed to update post");
    }
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this post?")) return;
    try {
      setDeleting(true);
      await deletePost(id);
      onDelete();
    } catch (error: any) {
      alert(error.message || "Failed to delete post");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="w-full bg-gray-100 p-4 rounded shadow-sm flex justify-between items-start relative">
      {/* left: title + badges */}
      <Link href={`/posts/${category}/${id}`} className="block flex-1">
        <div>
          <p className="font-semibold text-lg">{title}</p>

          {/* badges row */}
          <div className="flex items-center gap-2 mt-2 text-xs font-medium">
            {/* Blue: containers */}
            <span className="px-2 py-0.5 rounded-full bg-blue-500 text-white">
              {containerLabel}
            </span>

            {/* Green: location */}
            {location && (
              <span className="px-2 py-0.5 rounded-full bg-green-500 text-white uppercase">
                {location}
              </span>
            )}

            {/* Red: availability */}
            {availability && (
              <span className="px-2 py-0.5 rounded-full bg-red-500 text-white">
                {availability}
              </span>
            )}
          </div>
        </div>
      </Link>

      {/* right: price + type + delivery days + status dot */}
      <div className="text-right mr-5">
        <p className="font-semibold text-gray-800">{priceShort}</p>

        <div className="mt-1 flex items-center justify-end gap-2 text-xs">
          {/* type pill */}
          <span className="px-2 py-0.5 rounded-full bg-emerald-500 text-white capitalize">
            {type}
          </span>

          {/* delivery date (days) */}
          {availability === "Delivery" && daysLeft !== null && (
            <span className="px-2 py-0.5 rounded-full bg-gray-200 text-gray-800 flex items-center gap-1">
              <Clock size={14} /> {Math.max(daysLeft, 0)}D
            </span>
          )}
        </div>

        {/* active dot */}
        <span
          className={`inline-block w-3 h-3 mt-2 rounded-full ${
            isActive ? "bg-green-500" : "bg-red-500"
          }`}
        />
      </div>

      {/* menu */}
      <div className="absolute top-4 right-4 z-10">
        <button
          onClick={(e) => {
            e.stopPropagation();
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

      {/* modal */}
      <EditPostModal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        initialData={initialData}
        onSave={handleSave}
      />
    </div>
  );
}
