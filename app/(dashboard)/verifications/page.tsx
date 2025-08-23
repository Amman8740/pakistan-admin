"use client";

import { useEffect, useMemo, useState } from "react";
import {
  getAllVerifications,
  setVerificationDecision,
  type ProfileVerification,
  type VerificationStatus,
} from "@/app/hooks/useVerification";
import VerificationCard from "@/components/VerificationCard";

export default function VerificationsPage() {
  const [active, setActive] = useState<VerificationStatus>("pending");
  const [list, setList] = useState<ProfileVerification[]>([]);
  const [q, setQ] = useState("");
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  async function load() {
    try {
      setLoading(true);
      setErr(null);
      const res = await getAllVerifications({ page: 1, limit: 50, status: active });
      setList(res.data);
    } catch (e: any) {
      setErr(e.message || "Failed to load");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return list;
    return list.filter((v) =>
      [v.companyName, v.ownerName, v.companyNTN, v.companyLocation, v.address]
        .filter(Boolean)
        .some((x) => String(x).toLowerCase().includes(s))
    );
  }, [q, list]);

  async function handleApprove(v: ProfileVerification) {
    await setVerificationDecision(v._id, true);
    await load();
  }
  async function handleReject(v: ProfileVerification) {
    await setVerificationDecision(v._id, false);
    await load();
  }

  return (
    <div className="min-h-[100dvh] bg-white">
      {/* Sticky header/filters */}
      <div className="sticky top-0 z-10 bg-white/90 backdrop-blur border-b border-gray-100 px-4 pt-[env(safe-area-inset-top)] sm:px-6">
        <div className="py-3">
          <h1 className="text-xl sm:text-2xl font-bold">Profile Verifications</h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Review, approve, or reject company verification requests.
          </p>
        </div>

        {/* Tabs + Search */}
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between pb-3">
          <div className="flex gap-2">
            {(["pending", "verified", "rejected"] as VerificationStatus[]).map((t) => (
              <button
                key={t}
                onClick={() => setActive(t)}
                className={`px-3 py-2 rounded-xl text-sm ${
                  active === t
                    ? "bg-emerald-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {t[0].toUpperCase() + t.slice(1)}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search company, owner, NTN…"
              className="h-11 w-full sm:w-80 rounded-xl border border-gray-200 px-3 text-[15px] text-black placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500"
            />
            <span className="hidden sm:inline text-xs text-gray-500">
              {filtered.length}/{list.length}
            </span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 sm:px-6 py-4 pb-[env(safe-area-inset-bottom)]">
        {loading && (
          <div className="grid gap-3 sm:gap-4 md:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-36 rounded-2xl bg-gray-100 animate-pulse" />
            ))}
          </div>
        )}

        {err && (
          <div className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-xl p-3">
            {err}
          </div>
        )}

        {!loading && !err && (
          <>
            {filtered.length ? (
              <div className="grid gap-3 sm:gap-4 md:grid-cols-2 xl:grid-cols-3">
                {filtered.map((v) => (
                  <VerificationCard
                    key={v._id}
                    v={v}
                    onApprove={active === "pending" ? () => handleApprove(v) : undefined}
                    onReject={active === "pending" ? () => handleReject(v) : undefined}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center text-gray-500 text-sm mt-10">
                No verifications found.
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
