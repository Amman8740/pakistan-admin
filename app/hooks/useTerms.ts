"use client";

import { getToken } from "@/lib/api";

const BASE_URL = "https://pmssolar-production.up.railway.app";

export const getTerms = async () => {
  const token = getToken();
  if (!token) throw new Error("No auth token found");

  const res = await fetch(`${BASE_URL}/app/terms`, {
    method: "GET",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
  });

  const json = await res.json();
  if (!res.ok) throw new Error(json.message || "Failed to fetch terms");

  return json.data;
};

export const updateTerms = async (content: string) => {
  const token = getToken();
  if (!token) throw new Error("No auth token found");

  const res = await fetch(`${BASE_URL}/app/terms`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    body: JSON.stringify({ content }),
  });

  const json = await res.json();
  if (!res.ok) throw new Error(json.message || "Failed to update terms");

  return json.data;
};
