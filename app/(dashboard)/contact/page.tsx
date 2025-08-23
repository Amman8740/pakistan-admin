"use client";

import { useEffect, useMemo, useState } from "react";
import { getAllUsers } from "@/app/hooks/useAdmin";
import ContactCard, { ContactUser } from "@/components/ContactCard";

export default function ContactPage() {
  const [allUsers, setAllUsers] = useState<ContactUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [q, setQ] = useState("");

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const data = await getAllUsers();
        const normalized: ContactUser[] = (data || []).map((u: any) => ({
          _id: u._id,
          name: u.name ?? "—",
          phone: u.phone ?? "",
          status: (u.status as "active" | "banned") ?? "active",
          email: u.email ?? "",
        }));
        setAllUsers(normalized);
      } catch (e: any) {
        setError(e?.message || "Failed to load users");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return allUsers;
    return allUsers.filter(
      (u) =>
        u.name?.toLowerCase().includes(s) ||
        u.phone?.toLowerCase().includes(s) ||
        u.email?.toLowerCase().includes(s)
    );
  }, [q, allUsers]);

  return (
    <div className="min-h-[100dvh] bg-white">
      {/* Sticky header + search (mobile-first) */}
      <div className="sticky top-0 z-10 bg-white/90 backdrop-blur border-b border-gray-100 px-4 pt-[env(safe-area-inset-top)] sm:px-6">
        <div className="py-3">
          <h1 className="text-xl sm:text-2xl font-bold">Contact Us</h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Quick access to your users’ contact info.
          </p>
        </div>

        <div className="pb-3 flex items-center gap-2">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search by name, phone, or email"
            className="flex-1 h-11 rounded-xl border border-gray-200 px-3 text-[15px] text-black placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500"
          />
          <span className="shrink-0 px-2 py-1 text-xs rounded-lg bg-gray-100 text-gray-600">
            {filtered.length}/{allUsers.length}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 sm:px-6 py-4 pb-[env(safe-area-inset-bottom)]">
        {loading && (
          <div className="space-y-3">
            <div className="h-20 rounded-2xl bg-gray-100 animate-pulse" />
            <div className="h-20 rounded-2xl bg-gray-100 animate-pulse" />
            <div className="h-20 rounded-2xl bg-gray-100 animate-pulse" />
          </div>
        )}

        {error && (
          <div className="text-red-600 text-sm bg-red-50 border border-red-100 rounded-xl p-3">
            {error}
          </div>
        )}

        {!loading && !error && (
          <>
            {filtered.length ? (
              <div className="grid gap-3 sm:gap-4 md:grid-cols-2 xl:grid-cols-3">
                {filtered.map((u) => (
                  <ContactCard key={u._id} user={u} />
                ))}
              </div>
            ) : (
              <div className="text-center text-gray-500 text-sm mt-10">
                No users found.
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
