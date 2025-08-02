"use client";
import PostPageLayout from "@/components/PostPageLayout";
import PostCard from "@/components/PostCard";
// Dummy Data
const posts = [
  { id: 1, title: "Inverter 1", description: "Details here..." },
  { id: 2, title: "Inverter 2", description: "Details here..." },
];

export default function PanelPostsPage() {
  return (
    <PostPageLayout title="Inverter Posts">
      {posts.map((post) => (
       <PostCard
       id={post.id}
       key={post.id}
       title={post.title}
       category="inverters"
       price={4500}
       isPriceValid={true}
       onEdit={() => console.log("Edit clicked")}
       onDelete={() => console.log("Delete clicked")}
     />
      ))}
    </PostPageLayout>
  );
}