"use client";
import PostPageLayout from "@/components/PostPageLayout";
import PostCard from "@/components/PostCard";
import { useEffect, useState } from "react";
import { getAllPosts } from "@/app/hooks/usePanel";
// Dummy Data
// const posts = [
//   { id: 1, title: "Inverter 1", description: "Details here..." },
//   { id: 2, title: "Inverter 2", description: "Details here..." },
// ];

export default function PanelPostsPage() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
     const fetchPosts = async () => {
      try {
        const {posts} = await getAllPosts({type: "inverters"});
        setPosts(posts);
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      } finally {
        setLoading(false);
      }
    }
  useEffect(()=>{
    fetchPosts();
  },[])
  return (
     <PostPageLayout title="Inverter Posts">
      {loading ? (
        <p>Loading...</p>
      ) : posts.length === 0 ? (
        <p>No posts found.</p>
      ) : (
        posts.map((p) => (
          <PostCard
           key={p._id}
    id={p._id}
    category={p.category}              // "panels" | "inverters" | "batteries"
    title={p.name}                     // e.g., "Tiger Neo"
    price={p.price}                    // 200000

    container={p.container}            // "container" | "pallet"
    quantity={p.quantity}              // 5
    location={p.location}              // e.g., "EX-LHR" / "seller"
    availability={p.availability}      // "Ready Stock" | "Delivery"
    type={p.type}                      // "seller" | "buyer"
    deliveryDate={p.deliveryDate}      // ISO string or ""

    isActive={p.isShowing === true}    // green dot

    onEdit={fetchPosts}
    onDelete={fetchPosts}
          />
        ))
      )}
    </PostPageLayout>
  );
}