"use client";
import { getToken } from "@/lib/api";

const BASE_URL = "https://pmssolar-production.up.railway.app"

export type BannerDTO = {
  _id: string;
  title: string;
  imageUrl: string; // should already be absolute from server; if relative, prefix with BASE_URL
  category: "panels" | "inverters" | "batteries";
  order: number;
  isActive: boolean;
};

const absolutize = (u: string) => (u?.startsWith("http") ? u : `${BASE_URL}${u}`);

export const getBanners = async (category?: string) => {
  const token = getToken();
  if (!token) throw new Error("No auth token");

  const url = new URL(`${BASE_URL}/api/app/banners`);
  if (category) url.searchParams.set("category", category);

  const res = await fetch(url.toString(), { headers: { Authorization: `Bearer ${token}` } });
  const json = await res.json();
  if (!res.ok) throw new Error(json.message || "Failed to fetch banners");

  const items = (json.data as BannerDTO[]).map(b => ({ ...b, imageUrl: absolutize(b.imageUrl) }));
  return { items, meta: json.meta };
};

export const createBanner = async (payload: {
  category: "panels" | "inverters" | "batteries";
  title?: string;
  order?: number;
  isActive?: boolean;
  image: File;
}) => {
  const token = getToken();
  if (!token) throw new Error("No auth token");

  const fd = new FormData();
  fd.append("category", payload.category);
  if (payload.title) fd.append("title", payload.title);
  if (payload.order !== undefined) fd.append("order", String(payload.order));
  if (payload.isActive !== undefined) fd.append("isActive", String(payload.isActive));
  fd.append("image", payload.image);

  const res = await fetch(`${BASE_URL}/api/app/banner`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
    body: fd,
  });

  const json = await res.json();
  if (!res.ok) throw new Error(json.message || "Failed to create banner");
  const b = json.data as BannerDTO;
  return { ...b, imageUrl: absolutize(b.imageUrl) };
};

export const updateBanner = async (id: string, data: Partial<Omit<BannerDTO, "_id" | "imageUrl" | "category">> & { image?: File }) => {
  const token = getToken();
  if (!token) throw new Error("No auth token");

  const isMultipart = data.image instanceof File;
  let body: BodyInit;
  const headers: any = { Authorization: `Bearer ${token}` };

  if (isMultipart) {
    const fd = new FormData();
    Object.entries(data).forEach(([k, v]) => {
      if (k === "image" && v instanceof File) fd.append("image", v);
      else if (v !== undefined) fd.append(k, String(v));
    });
    body = fd;
  } else {
    headers["Content-Type"] = "application/json";
    body = JSON.stringify(data);
  }

  const res = await fetch(`${BASE_URL}/api/app/banner/${id}`, { method: "PUT", headers, body });
  const json = await res.json();
  if (!res.ok) throw new Error(json.message || "Failed to update banner");
  const b = json.data as BannerDTO;
  return { ...b, imageUrl: absolutize(b.imageUrl) };
};

export const deleteBanner = async (id: string) => {
  const token = getToken();
  if (!token) throw new Error("No auth token");
  const res = await fetch(`${BASE_URL}/api/app/banner/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.message || "Failed to delete banner");
  return json.data;
};
