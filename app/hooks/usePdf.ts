"use client";
import { getToken } from "@/lib/api";

const BASE_URL = "http://localhost:8001";

export const getPdfs = async (params?: { page?: number; limit?: number; userId?: string }) => {
  const token = getToken();
  if (!token) throw new Error("No auth token found");

  const qs = new URLSearchParams();
  if (params?.page)  qs.set("page", String(params.page));
  if (params?.limit) qs.set("limit", String(params.limit));
  if (params?.userId) qs.set("userId", params.userId);

  const res = await fetch(`${BASE_URL}/api/app/getpdfs?${qs.toString()}`, {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  });

  const json = await res.json();
  if (!res.ok) throw new Error(json.message || "Failed to fetch PDFs");

  return {
    items: json.data as Array<{ _id: string; name: string; url: string; size: number; mime: string }>,
    meta: json.meta,
  };
};

export const uploadPdf = async (file: File) => {
  const token = getToken();
  if (!token) throw new Error("No auth token found");

  const fd = new FormData();
  fd.append("file", file);

  const res = await fetch(`${BASE_URL}/api/app/uploadpdf`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
    body: fd,
  });

  const json = await res.json();
  if (!res.ok) throw new Error(json.message || "Failed to upload PDF");
  return json.data;
};

export const replacePdf = async (id: string, file: File) => {
  const token = getToken();
  if (!token) throw new Error("No auth token found");

  const fd = new FormData();
  fd.append("file", file);

  const res = await fetch(`${BASE_URL}/api/app/replacepdf/${id}`, {
    method: "PUT",
    headers: { Authorization: `Bearer ${token}` },
    body: fd,
  });

  const json = await res.json();
  if (!res.ok) throw new Error(json.message || "Failed to replace PDF");
  return json.data;
};

export const deletePdf = async (id: string) => {
  const token = getToken();
  if (!token) throw new Error("No auth token found");

  const res = await fetch(`${BASE_URL}/api/app/deletepdf/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });

  const json = await res.json();
  if (!res.ok) throw new Error(json.message || "Failed to delete PDF");
  return json.data;
};
