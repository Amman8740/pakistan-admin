"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { getToken, saveToken } from "@/lib/api";
const BASE_URL = "https://pmssolar-production.up.railway.app"; // Update with your actual API base URL

export const useAdminLogin = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const login = async (email: string, password: string) => {
        setLoading(true);
        setError(null);

        try {
            const res = await fetch(`${BASE_URL}/api/admin/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();
console.log("Login response:", data );

            if (!res.ok) {
                throw new Error(data.message || "Login failed");
            }
            if (res.ok) {
                console.log("Login successful, redirecting...");
                const token = data.data.token;
                if (!token){
                    throw new Error("No token received from server");
                }
                saveToken(token);
                console.log(token);
                console.log(getToken());
                router.push("/");
            }
        } catch (err: any) {
            console.error("Login error:", err);
            setError(err.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return { login, loading, error };
};