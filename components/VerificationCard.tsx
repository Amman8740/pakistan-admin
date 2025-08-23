"use client";

import Image from "next/image";
import { CheckCircle2, XCircle, Clock, Building2, User2 } from "lucide-react";
import { ProfileVerification } from "@/app/hooks/useVerification";

export default function VerificationCard({
  v,
  onApprove,
  onReject,
}: {
  v: ProfileVerification;
  onApprove?: () => void;
  onReject?: () => void;
}) {
  const status = v.status ?? (v.verified ? "verified" : "pending");
  const badge =
    status === "verified"
      ? { text: "Verified", className: "bg-emerald-50 text-emerald-700" }
      : status === "rejected"
      ? { text: "Rejected", className: "bg-rose-50 text-rose-700" }
      : { text: "Pending", className: "bg-amber-50 text-amber-700" };

  return (
    <div className="rounded-2xl border border-gray-200 p-4 bg-white shadow-sm">
      <div className="flex items-start gap-3">
        <div className="relative h-12 w-12 rounded-xl overflow-hidden bg-gray-100 shrink-0">
          {v.companyLogo ? (
            <Image src={v.companyLogo} alt="logo" fill className="object-cover" />
          ) : (
            <div className="h-full w-full grid place-items-center text-gray-400">
              <Building2 size={20} />
            </div>
          )}
        </div>
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-black truncate">{v.companyName ?? "—"}</h3>
            <span className={`text-xs px-2 py-0.5 rounded-full ${badge.className}`}>
              {badge.text}
            </span>
          </div>
          <div className="text-xs text-gray-500 mt-0.5 truncate">
            {v.companyLocation ?? v.address ?? "—"}
          </div>
          <div className="flex items-center gap-3 text-xs text-gray-600 mt-1">
            <span className="inline-flex items-center gap-1">
              <User2 size={14} /> {v.ownerName ?? "—"}
            </span>
            {v.designation && (
              <span className="inline-flex items-center gap-1">
                <Clock size={14} /> {v.designation}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="mt-3 grid grid-cols-2 gap-2 text-xs text-gray-600">
        <div><span className="text-gray-400">NTN:</span> {v.companyNTN ?? "—"}</div>
        <div><span className="text-gray-400">Bank:</span> {v.bankName ?? "—"}</div>
        <div><span className="text-gray-400">Account #:</span> {v.accountNumber ?? "—"}</div>
        <div><span className="text-gray-400">TID:</span> {v.TID ?? "—"}</div>
      </div>

      {/* proofs */}
      <div className="mt-3 flex flex-wrap gap-2">
        {v.cnicFront && (
          <a
            href={v.cnicFront}
            target="_blank"
            className="text-xs px-2 py-1 rounded-lg bg-gray-100 hover:bg-gray-200"
          >
            CNIC Front
          </a>
        )}
        {v.cnicBack && (
          <a
            href={v.cnicBack}
            target="_blank"
            className="text-xs px-2 py-1 rounded-lg bg-gray-100 hover:bg-gray-200"
          >
            CNIC Back
          </a>
        )}
        {v.bankDepositSlip && (
          <a
            href={v.bankDepositSlip}
            target="_blank"
            className="text-xs px-2 py-1 rounded-lg bg-gray-100 hover:bg-gray-200"
          >
            Deposit Slip
          </a>
        )}
      </div>

      {/* actions */}
      {status === "pending" && (
        <div className="mt-4 flex gap-2">
          <button
            onClick={onApprove}
            className="inline-flex items-center justify-center gap-2 rounded-xl px-3 py-2 text-sm bg-emerald-600 text-white hover:bg-emerald-700 w-full"
          >
            <CheckCircle2 size={16} /> Approve
          </button>
          <button
            onClick={onReject}
            className="inline-flex items-center justify-center gap-2 rounded-xl px-3 py-2 text-sm bg-rose-600 text-white hover:bg-rose-700 w-full"
          >
            <XCircle size={16} /> Reject
          </button>
        </div>
      )}
    </div>
  );
}
