"use client";

import { useEffect, useMemo, useState } from "react";
import PostCard from "@/components/PostCard";
import { getAllPosts } from "@/app/hooks/usePanel";

type Cat = "panels" | "inverters" | "batteries";

export default function AllPostsPage() {
  const [tab, setTab] = useState<Cat>("panels");
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState("");

  const fetchPosts = async (category: Cat) => {
    setLoading(true);
    try {
      // your hook already supports filtering by type via { type: "panels" }
      const { posts } = await getAllPosts({ type: category });
      setPosts(posts ?? []);
    } catch (e) {
      console.error("Failed to fetch posts:", e);
      setPosts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts(tab);
  }, [tab]);

  const refetch = () => fetchPosts(tab);

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    if (!needle) return posts;
    return posts.filter((p) =>
      [p.name, p.brand, p.location, p.availability, p.type]
        .filter(Boolean)
        .some((v: string) => v.toLowerCase().includes(needle))
    );
  }, [posts, q]);

  return (
    <main className="w-[100%] mx-auto px-4 py-6">
      <h1 className="text-xl font-bold mb-4">All Posts</h1>

      {/* Tabs */}
      <div className="flex rounded-xl overflow-hidden bg-gray-100 mb-4">
        {(["panels", "inverters", "batteries"] as Cat[]).map((c) => {
          const isActive = tab === c;
          return (
            <button
              key={c}
              onClick={() => setTab(c)}
              className={`flex-1 py-2 text-sm font-medium transition-colors ${
                isActive
                  ? "bg-green-600 text-white"
                  : "text-gray-700 hover:bg-gray-200"
              }`}
            >
              {c.charAt(0).toUpperCase() + c.slice(1)}
            </button>
          );
        })}
      </div>

      {/* Search */}
      <input
        type="text"
        placeholder="Search posts…"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        className="w-full mb-4 px-4 py-2 border rounded-2xl"
      />

      {/* List */}
      {loading ? (
        <p>Loading…</p>
      ) : filtered.length === 0 ? (
        <p className="text-gray-400 text-sm">No posts found.</p>
      ) : (
        <div className="space-y-4">
          {filtered.map((p: any) => (
            <PostCard
              key={p._id}
              id={p._id}
              category={p.category}              // "panels" | "inverters" | "batteries"
              title={p.name}                     // e.g., "Tiger Neo"
              price={p.price}                    // number

              container={p.container}            // "container" | "pallet"
              quantity={p.quantity}              // number
              location={p.location}              // e.g., "EX-LHR"
              availability={p.availability}      // "Ready Stock" | "Delivery"
              type={p.type}                      // "seller" | "buyer"
              deliveryDate={p.deliveryDate}      // ISO | ""

              isActive={p.isShowing === true}
              onEdit={refetch}
              onDelete={refetch}
            />
          ))}
        </div>
      )}
    </main>
  );
}
