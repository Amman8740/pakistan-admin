import { getToken } from "@/lib/api";
const BASE_URL = "https://pmssolar-production.up.railway.app"; // Update with your actual API base URL

export const getAllLocations = async () => {
    const token = getToken();
    if (!token) throw new Error("No auth token found");

    try {
        const response = await fetch(`${BASE_URL}/api/app/getlocations`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        const json = await response.json();

        if (!response.ok) {
            throw new Error(json.message || "Failed to fetch locations");
        }
        console.log("Get locations response:", json);
        return json.data;
    } catch (err) {
        console.error("Get locations error:", err);
        throw err;
    }
}
export const createLocation = async (location: string) => {
  const token = getToken();
  if (!token) throw new Error("No auth token found");

  const res = await fetch(`${BASE_URL}/api/app/location`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ location }),
  });

  const json = await res.json();
  if (!res.ok) throw new Error(json.message || "Failed to create location");

  return json.data;
};