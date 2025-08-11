"use client";
import { useMemo, useState } from "react";
import { MoreVertical, Edit, Trash, Clock } from "lucide-react";
import Link from "next/link";
import EditPostModal from "./EditPostModal";
import { deletePost, updatePost } from "@/app/hooks/usePanel";

type PostCardProps = {
  id: string;
  category: "panels" | "inverters" | "batteries";
  title: string;
  price: number;
  container: "container" | "pallet" | string;
  quantity: number;
  location: string;
  availability: string;
  type: "seller" | "buyer";
  deliveryDate?: string;
  isActive?: boolean;
  onEdit: () => void;
  onDelete: () => void;
};

export default function PostCard(props: PostCardProps) {
  const {
    id, category, title, price,
    container, quantity, location, availability,
    type, deliveryDate, isActive = true,
    onEdit, onDelete,
  } = props;

  const [showMenu, setShowMenu] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const containerLabel = useMemo(() => {
    const base = container?.toLowerCase() === "pallet" ? "Pallet" : "Container";
    const q = Number.isFinite(quantity) ? quantity : 0;
    return `${q} ${base}${q === 1 ? "" : "s"}`;
  }, [container, quantity]);

  const daysLeft = useMemo(() => {
    if (!deliveryDate) return null;
    const target = new Date(deliveryDate);
    if (isNaN(+target)) return null;
    const d = Math.ceil((target.getTime() - Date.now()) / 86400000);
    return d;
  }, [deliveryDate]);

  const priceShort = useMemo(() => (price >= 1000 ? Math.round(price / 1000) : price), [price]);

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
    } catch (e) {
      console.error("Update failed:", e);
      alert("Failed to update post");
    }
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this post?")) return;
    try {
      setDeleting(true);
      await deletePost(id);
      onDelete();
    } catch (e: any) {
      alert(e.message || "Failed to delete post");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="w-full bg-gray-100 p-4 rounded-xl shadow-sm relative">
      {/* Top row: title + price/kebab (stacks nicely on mobile) */}
      <div className="flex items-start justify-between gap-3">
        <Link href={`/posts/${category}/${id}`} className="min-w-0">
          <p className="font-semibold text-base sm:text-lg truncate">{title}</p>
        </Link>

        <div className="flex items-start gap-3">
          {/* price + pills */}
          <div className="text-right">
            <p className="font-semibold text-gray-800 leading-none">{priceShort}</p>

            <div className="mt-1 flex items-center justify-end gap-2 text-[11px] sm:text-xs">
              <span className="px-2 py-0.5 rounded-full bg-emerald-500 text-white capitalize">
                {type}
              </span>

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

          {/* kebab */}
          <div className="relative">
            <button
              onClick={() => setShowMenu((v) => !v)}
              aria-label="More actions"
              className="p-1.5 rounded-md hover:bg-white/60"
            >
              <MoreVertical size={18} />
            </button>

            {showMenu && (
              <div className="absolute right-0 mt-1 w-28 bg-white border rounded-md shadow-lg z-10">
                <button
                  onClick={() => {
                    setShowMenu(false);
                    setShowEditModal(true);
                  }}
                  className="flex items-center px-3 py-2 text-sm hover:bg-gray-100 w-full"
                >
                  <Edit size={14} className="mr-2" /> Edit
                </button>
                <button
                  onClick={() => {
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
        </div>
      </div>

      {/* Badges row (wrap on mobile) */}
      <div className="mt-2 flex flex-wrap items-center gap-2 text-[11px] sm:text-xs font-medium">
        <span className="px-2 py-0.5 rounded-full bg-blue-500 text-white">
          {containerLabel}
        </span>

        {location && (
          <span className="px-2 py-0.5 rounded-full bg-green-500 text-white uppercase">
            {location}
          </span>
        )}

        {availability && (
          <span className="px-2 py-0.5 rounded-full bg-red-500 text-white">
            {availability}
          </span>
        )}
      </div>

      {/* Edit modal */}
      <EditPostModal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        initialData={initialData}
        onSave={handleSave}
      />
    </div>
  );
}
