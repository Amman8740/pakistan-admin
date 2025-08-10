"use client";

import { getToken } from "@/lib/api"; // util to get token from localStorage

const BASE_URL = "https://pmssolar-production.up.railway.app"; // or your production URL

export const getAllUsers = async () => {
  const token = getToken();
  console.log("Using token:", token);
  if (!token) throw new Error("No auth token found");

  try {
    const response = await fetch(`${BASE_URL}/api/admin/getusers`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const json = await response.json();
    console.log("Get users response:", json);

    if (!response.ok) {
      console.log("Get users error:");
    }
    return json.data as any[];
  } catch (err) {
    console.error("Get users error:", err);
    throw err;
  }
};
export const getActiveUsers = async () => {
  const token = getToken();
  if (!token) throw new Error("No auth token found");

  try {
    const response = await fetch(`${BASE_URL}/api/admin/getactiveusers`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const json = await response.json();

    if (!response.ok) {
      throw new Error(json.message || "Failed to fetch active users");
    }
    return json;
  } catch (err) {
    console.error("Get active users error:", err);
    throw err;
  }
}