"use client";
import PostPageLayout from "@/components/PostPageLayout";
import PostCard from "@/components/PostCard";
// Dummy Data
const posts = [
  { id: 1, title: "Panel 1", description: "Details here..." },
  { id: 2, title: "Panel 2", description: "Details here..." },
];

export default function PanelPostsPage() {
  return (
    <PostPageLayout title="Panel Posts">
      {posts.map((post) => (
       <PostCard
       id={post.id}
       key={post.id}
       title={post.title}
       price={4500}
       category="panels"
       isPriceValid={true}
       onEdit={() => console.log("Edit clicked")}
       onDelete={() => console.log("Delete clicked")}
     />
      ))}
    </PostPageLayout>
  );
}