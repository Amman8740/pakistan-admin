import { getToken } from "@/lib/api";
const BASE_URL = "http://localhost:8001"

export const createPost = async (payload: {
  type: string;
  category: string;
  brand: string;
  name: string;
  variant: string;
  container?: string;
  quantity: number;
  priceMin: number;
  priceMax: number;
  location: string;
  availability: string;
  deliveryDate?: string;
}) => {
  const token = getToken();
  const res = await fetch(`${BASE_URL}/api/app/post`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const json = await res.json();
  if (!res.ok) throw new Error(json.message || "Failed to post panel");
  return json.data;
};
export const getAllPosts = async ({
  page = 1,
  limit = 10,
  type = "",
}: {
  page?: number;
  limit?: number;
  type?: string;
}) => {
  const token = getToken();
  if (!token) throw new Error("No token provided");

  const url = new URL(`${BASE_URL}/api/app/getAllPosts`);
  url.searchParams.append("page", page.toString());
  url.searchParams.append("limit", limit.toString());
  if (type) url.searchParams.append("type", type);

  const res = await fetch(url.toString(), {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const json = await res.json();
  if (!res.ok) throw new Error(json.message || "Failed to fetch posts");

  return {
    posts: json.data,
    meta: json.meta,
  };
};