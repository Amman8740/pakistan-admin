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
  useEffect(()=>{
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
    fetchPosts();
  },[])
  return (
     <PostPageLayout title="Inverter Posts">
      {loading ? (
        <p>Loading...</p>
      ) : posts.length === 0 ? (
        <p>No posts found.</p>
      ) : (
        posts.map((post) => (
          <PostCard
            key={post._id}
            id={post._id}
            title={post.name}
            price={post.price?.min || 0}
            category="inverters"
            isPriceValid={!!post.price}
            onEdit={() => console.log("Edit", post._id)}
            onDelete={() => console.log("Delete", post._id)}
          />
        ))
      )}
    </PostPageLayout>
  );
}