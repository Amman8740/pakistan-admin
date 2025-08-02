"use client";
import { useRouter } from "next/navigation";
import PostDetailsPage from "@/components/PostDetailsPage";

export default function PostPage({params}: { params: { id: string } }) {
    const dummyPost = {
        id: params.id,
        title: "TRINA P TYPE (550W)",
        tokenMoney: 0,
        tags: ["1 Container", "EX-PWR", "Ready Stock"],
        hoursInactive: 20,
        buyerType: "Buyer",
        status: "Inactive",
        bidders: [],
      };
      const dummyUser = {
        name: "Azeema",
        code: "PSM-00745",
        role: "user",
      };
  const router = useRouter();
  const postId = params.id;

  if (!postId) return <p>Loading...</p>;

  return <PostDetailsPage post={dummyPost} user={dummyUser} category="batteries"/>;
}
