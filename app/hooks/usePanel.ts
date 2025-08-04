import { getToken } from "@/lib/api";

export const createPanelPost = async (payload: {
  type: string;
  brand: string;
  name: string;
  container: string;
  quantity: number;
  priceMin: number;
  priceMax: number;
  location: string;
  availability: string;
}) => {
  const token = getToken();
  const res = await fetch("http://localhost:8001/api/app/panelPost", {
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