"use client";

import { getToken } from "@/lib/api"; // util to get token from localStorage

const BASE_URL = "https://pmssolar-production.up.railway.app"; // or your production URL

export const getAllBrands = async () => {
    const token = getToken();
    if (!token) throw new Error("No auth token found");

    try {
        const response = await fetch(`${BASE_URL}/api/app/getBrandsByAdmin`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        const json = await response.json();

        if (!response.ok) {
            throw new Error(json.message || "Failed to fetch brands");
        }
        console.log("Get brands response:", json);
        return json.data;
    } catch (err) {
        console.error("Get brands error:", err);
        throw err;
    }
}
type BrandModel = {
  modelName: string;
  modelDetail: string;
};

type AddBrandPayload = {
  brandName: string;
  models: BrandModel[];
  category: "panels" | "inverters" | "batteries";
  brandNumber: number;
};

export const addBrand = async (payload: AddBrandPayload) => {
  const token = getToken();
  if (!token) throw new Error("No auth token found");

  try {
    const response = await fetch(`${BASE_URL}/api/app/addBrand`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    const json = await response.json();

    if (!response.ok) {
      throw new Error(json.message || "Failed to add brand");
    }

    // The backend wraps `data` inside another `data`
    return json.data?.data || null; // safely return created brand
  } catch (err) {
    console.error("Add brand error:", err);
    throw err;
  }
};
export const updateBrandModel = async ({
  brandId,
  models,
}: {
  brandId: string;
  models: { modelName: string; modelDetail: string }[];
}) => {
  const token = getToken();
  if (!token) throw new Error("No auth token found");
  console.log("Sending to updateBrandModel:", {
  brandId,
  models,
});
  const response = await fetch(`${BASE_URL}/api/app/updateBrandModel`, {
    method: "PUT", // or POST based on backend (yours is PATCH)
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ brandId, models }),
  });

  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.message || "Failed to update models");
  }

  return json.data; // updated brand
};
export const updateBrandModelSpecific = async ({
  brandId,
  index,
  newModel,
}: {
  brandId: string;
  index: number;
  newModel: { modelName: string; modelDetail: string };
}) => {
  const token = getToken();
  if (!token) throw new Error("No auth token found");

  const response = await fetch(`${BASE_URL}/api/app/updateBrandModelSpecific`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ brandId, index, newModel }),
  });

  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.message || "Failed to update model");
  }

  return json.data;
};

export const updateBrandNumber = async ({
  brandId,
  brandNumber,
}: {
  brandId: string;
  brandNumber: number;
}) => {
  const token = getToken(); // assuming you have this util
  if (!token) throw new Error("No auth token found");

  const response = await fetch(`${BASE_URL}/api/app/updateBrandNumber`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ brandId, brandNumber }),
  });

  const json = await response.json();
  if (!response.ok) {
    throw new Error(json.message || "Failed to update brand number");
  }

  return json.data; // updated brand
};
type Brand = {
  _id: string;
  brandName: string;
  category: "panels" | "inverters" | "batteries";
};
export const getBrandsByAdmin = async (category?: string) => {
  const token = getToken();
  if (!token) throw new Error("No auth token");

  const res = await fetch(`${BASE_URL}/api/app/getBrandsByAdmin`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const json = await res.json();
  if (!res.ok) throw new Error(json.message || "Failed to fetch brands");

  return category
    ? json.data.filter((b: Brand) => b.category === category)
    : json.data;
};