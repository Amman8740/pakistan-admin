"use client";

import { sendBroadcastNotification } from "@/app/hooks/useNotification";
import { useState } from "react";


export default function NotificationsPage() {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleSend(e: React.FormEvent) {
    e.preventDefault();
    setSuccess(null);
    setError(null);

    if (!title.trim() || !message.trim()) {
      setError("Please fill in both title and message.");
      return;
    }

    try {
      setSubmitting(true);
      await sendBroadcastNotification({ title: title.trim(), message: message.trim() });
      setSuccess("Notification sent to all users.");
      setTitle("");
      setMessage("");
    } catch (err: any) {
      setError(err.message || "Failed to send notification");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="w-full mx-auto max-w-2xl p-4 sm:p-6">
      <h1 className="text-2xl font-bold mb-2">Send Notification</h1>
      <p className="text-sm text-gray-500 mb-6">
        Broadcast a message to all users. (Admins only)
      </p>

      {success && (
        <div className="mb-4 rounded-lg bg-green-50 border border-green-200 text-green-700 px-3 py-2 text-sm">
          {success}
        </div>
      )}
      {error && (
        <div className="mb-4 rounded-lg bg-red-50 border border-red-200 text-red-700 px-3 py-2 text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSend} className="space-y-4">
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-700">Title</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. System Maintenance"
            className="w-full border rounded-lg px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-green-500"
            maxLength={100}
          />
          <div className="text-xs text-gray-400 text-right">{title.length}/100</div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-700">Message</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Your message to all users…"
            className="w-full min-h-[120px] border rounded-lg px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-green-500"
            maxLength={500}
          />
          <div className="text-xs text-gray-400 text-right">{message.length}/500</div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-end gap-3">
          <button
            type="submit"
            disabled={submitting}
            className="inline-flex justify-center items-center gap-2 px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 disabled:opacity-50"
          >
            {submitting ? "Sending…" : "Send Notification"}
          </button>
        </div>
      </form>
    </div>
  );
}
