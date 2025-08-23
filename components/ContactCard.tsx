"use client";

import { Phone, Copy, MessageCircle } from "lucide-react";

export type ContactUser = {
  _id: string;
  name: string;
  phone: string;
  email?: string;
  status?: "active" | "banned";
};

export default function ContactCard({ user }: { user: ContactUser }) {
  const tel = user.phone?.trim() || "";
  const wa = tel.replace(/[^\d+]/g, ""); // keep digits/+ for wa.me

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(tel);
    } catch {}
  };

  return (
    <div className="rounded-lg border border-gray-200 p-4 bg-white shadow-sm flex items-center justify-between gap-3">
      <div>
        <div className="font-semibold text-black">{user.name || "—"}</div>
        {user.email ? (
          <div className="text-xs text-gray-500">{user.email}</div>
        ) : null}
        <div className="text-green-700 text-sm">{tel || "No number"}</div>
        {user.status === "banned" && (
          <div className="mt-1 inline-block text-[10px] px-2 py-0.5 rounded bg-red-50 text-red-600">
            Banned
          </div>
        )}
      </div>

      <div className="flex items-center gap-2 shrink-0">
        <a
          href={tel ? `tel:${tel}` : undefined}
          className="rounded-md bg-emerald-600 text-white px-3 py-1.5 text-xs inline-flex items-center gap-1 hover:bg-emerald-700 disabled:opacity-50"
          aria-disabled={!tel}
          onClick={(e) => !tel && e.preventDefault()}
        >
          <Phone size={14} />
          Call
        </a>
        <a
          href={wa ? `https://wa.me/${wa}` : undefined}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-md bg-green-600 text-white px-3 py-1.5 text-xs inline-flex items-center gap-1 hover:bg-green-700 disabled:opacity-50"
          aria-disabled={!wa}
          onClick={(e) => !wa && e.preventDefault()}
        >
          <MessageCircle size={14} />
          WhatsApp
        </a>
        <button
          onClick={copy}
          className="rounded-md bg-gray-100 text-gray-700 px-3 py-1.5 text-xs inline-flex items-center gap-1 hover:bg-gray-200"
          title="Copy number"
        >
          <Copy size={14} />
          Copy
        </button>
      </div>
    </div>
  );
}
