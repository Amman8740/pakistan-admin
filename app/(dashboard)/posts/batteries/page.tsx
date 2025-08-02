"use client";
import PostPageLayout from "@/components/PostPageLayout";
import PostCard from "@/components/PostCard";
// Dummy Data
const posts = [
  { id: 1, title: "Battery 1", description: "Details here..." },
  { id: 2, title: "Battery 2", description: "Details here..." },
];

export default function BatteriesPostsPage() {
  return (
    <PostPageLayout title="Battery Posts">
      {posts.map((post) => (
       <PostCard
       id={post.id}
       key={post.id}
       title={post.title}
       category="batteries"
       price={4500}
       isPriceValid={false}
       onEdit={() => console.log("Edit clicked")}
       onDelete={() => console.log("Delete clicked")}
     />
      ))}
    </PostPageLayout>
  );
}