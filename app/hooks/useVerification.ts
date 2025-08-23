"use client";

import { getToken } from "@/lib/api";

const BASE_URL = "https://pmssolar-production.up.railway.app";

export type VerificationStatus = "pending" | "verified" | "rejected";

export interface ProfileVerification {
  _id: string;
  companyName?: string;
  companyNTN?: string;
  companyLocation?: string;
  address?: string;
  designation?: string;
  ownerName?: string;
  userId?: string;
  companyLogo?: string;
  bankName?: string;
  accountNumber?: string;
  cnicFront?: string;
  cnicBack?: string;
  TID?: string;
  bankDepositSlip?: string;
  verified: boolean;                 // boolean flag from backend
  status?: VerificationStatus;       // may exist; fallback to derived
  createdAt: string;
  updatedAt: string;
}

type GetAllRes = {
  status: number;
  message: string;
  data: ProfileVerification[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

function authHeaders() {
  const token = getToken();
  if (!token) throw new Error("No auth token found");
  return {
    Authorization: `Bearer ${token}`,
  };
}

async function parseJsonSafe(res: Response) {
  const text = await res.text();
  try {
    return JSON.parse(text);
  } catch {
    throw new Error(
      `Non-JSON ${res.status} ${res.statusText} :: ${text.slice(0, 150)}`
    );
  }
}

// ADMIN: list all verifications (optional status filter + pagination)
export async function getAllVerifications(opts: {
  page?: number;
  limit?: number;
  status?: VerificationStatus; // backend supports ?status=
} = {}) {
  const { page = 1, limit = 12, status } = opts;
  const url = new URL(`${BASE_URL}/api/app/getAllVerifications`);
  url.searchParams.set("page", String(page));
  url.searchParams.set("limit", String(limit));
  if (status) url.searchParams.set("status", status);

  const res = await fetch(url.toString(), { headers: authHeaders(), cache: "no-store" });
  const json = (await parseJsonSafe(res)) as GetAllRes;
  if (!res.ok) throw new Error((json as any)?.message || "Failed to fetch verifications");

  // Normalize status if backend hasn’t updated it
  const normalized = json.data.map((v) => ({
    ...v,
    status: v.status ?? (v.verified ? "verified" : "pending"),
  })) as ProfileVerification[];

  return { ...json, data: normalized };
}

// ADMIN: approve or reject (PATCH /app/updateVerificationStatus/:id { verified: boolean })
export async function setVerificationDecision(id: string, verified: boolean) {
  const res = await fetch(
    `${BASE_URL}/api/app/updateVerificationStatus/${id}`,
    {
      method: "PUT",
      headers: {
        ...authHeaders(),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ verified }),
    }
  );
  const json = await parseJsonSafe(res);
  if (!res.ok) throw new Error(json.message || "Failed to update verification");
  return json.data as ProfileVerification;
}
