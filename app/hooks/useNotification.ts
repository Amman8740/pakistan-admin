"use client";

import { getToken } from "@/lib/api";

const BASE_URL = "https://pmssolar-production.up.railway.app";

function authHeaders() {
  const token = getToken();
  if (!token) throw new Error("No auth token found");
  return {
    Authorization: `Bearer ${token}`,
    // NOTE: this endpoint expects JSON unless you're uploading files
    "Content-Type": "application/json",
  };
}

async function parseJsonSafe(res: Response) {
  const text = await res.text();
  try {
    return text ? JSON.parse(text) : {};
  } catch {
    throw new Error(
      `Non-JSON ${res.status} ${res.statusText} :: ${text.slice(0, 200)}`
    );
  }
}

/** Send a broadcast notification (admin) */
export async function sendBroadcastNotification(payload: {
  title: string;
  message: string;
}) {
  const res = await fetch(`${BASE_URL}/api/app/notifications`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify({
      title: payload.title,
      message: payload.message,
      // do NOT send user_id to make it a broadcast
      // backend should treat missing user_id as isBroadcast
    }),
  });

  const json = await parseJsonSafe(res);
  if (!res.ok) throw new Error(json.message || "Failed to send notification");
  return json;
}

/** (Optional) Load my notifications (admin/user) */
export async function getMyNotifications() {
  const res = await fetch(`${BASE_URL}/api/app/notifications`, {
    method: "GET",
    headers: authHeaders(),
    cache: "no-store",
  });
  const json = await parseJsonSafe(res);
  if (!res.ok) throw new Error(json.message || "Failed to fetch notifications");
  return json.data as any[];
}

/** (Optional) Delete a notification by id */
export async function deleteNotification(id: string) {
  const res = await fetch(`${BASE_URL}/api/app/notifications/${id}`, {
    method: "DELETE",
    headers: authHeaders(),
  });
  const json = await parseJsonSafe(res);
  if (!res.ok) throw new Error(json.message || "Failed to delete notification");
  return json;
}
