const BASE_URL = "http://localhost:8001"; // Update with your actual API base URL

export const saveToken = (token: string) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("token", token);
    localStorage.setItem("psm-auth", "true");
  }
};

// Retrieve token
export const getToken = (): string | null => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("token");
};

// export const adminLogin = async (email: string, password: string) => {
//   const res = await fetch(`${BASE_URL}/api/admin/login`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ email, password }),
//   });

//   const data = await res.json();

//   if (!res.ok) {
//     throw new Error(data.message || "Login failed");
//   }

//   return data; // should contain token and admin info
// };

// export const getAllUsers = async () => {
//   // ✅ This must only run client-side (because of localStorage)
//   if (typeof window === "undefined") return [];

//   const token = localStorage.getItem("token");

//   try {
//     const response = await fetch(`${BASE_URL}/api/admin/getusers`, {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//         ...(token && { Authorization: `Bearer ${token}` }),
//       },
//     });

//     if (!response.ok) {
//       const error = await response.json();
//       throw new Error(error.message || "Failed to fetch users");
//     }

//     const data = await response.json();
//     return data;
//   } catch (err) {
//     console.error("Get users error:", err);
//     throw err;
//   }
// };

