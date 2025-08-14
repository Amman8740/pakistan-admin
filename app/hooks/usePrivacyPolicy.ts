"use client";

import { getToken } from "@/lib/api"; // util to get token from localStorage

const BASE_URL = "https://pmssolar-production.up.railway.app"; // change if needed

/**
 * Fetch the current privacy policy
 */
export const getPrivacyPolicy = async () => {
  const token = getToken();
  if (!token) throw new Error("No auth token found");

  try {
    const res = await fetch(`${BASE_URL}/api/app/privacy-policy`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const json = await res.json();

    if (!res.ok) {
      throw new Error(json.message || "Failed to fetch privacy policy");
    }

    // The API returns: { data: { content: string } }
    return json.data;
  } catch (err) {
    console.error("Get privacy policy error:", err);
    throw err;
  }
};

/**
 * Update the privacy policy content
 * @param content HTML string of the updated policy
 */
export const updatePrivacyPolicy = async (content: string) => {
  const token = getToken();
  if (!token) throw new Error("No auth token found");

  try {
    const res = await fetch(`${BASE_URL}/api/app/privacy-policy`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ content }),
    });

    const json = await res.json();

    if (!res.ok) {
      throw new Error(json.message || "Failed to update privacy policy");
    }

    return json.data;
  } catch (err) {
    console.error("Update privacy policy error:", err);
    throw err;
  }
};
