"use client";

import { getPrivacyPolicy, updatePrivacyPolicy } from "@/app/hooks/usePrivacyPolicy";
import { useState, useEffect } from "react";


export default function PrivacyPolicyPage() {
  const [policy, setPolicy] = useState("");
  const [editedPolicy, setEditedPolicy] = useState("");
  const [loading, setLoading] = useState(true);

  // Load policy from backend on mount
  useEffect(() => {
    const fetchPolicy = async () => {
      try {
        setLoading(true);
        const data = await getPrivacyPolicy();
        setPolicy(data.content);
      } catch (error) {
        console.error("Error fetching privacy policy:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPolicy();
  }, []);

  const handleUpdate = async () => {
    if (!editedPolicy.trim()) return;

    try {
      const updated = await updatePrivacyPolicy(editedPolicy);
      setPolicy(updated.content);
      setEditedPolicy("");
      alert("Privacy policy updated successfully!");
    } catch (error) {
      console.error("Error updating privacy policy:", error);
      alert("Failed to update privacy policy.");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-600">Loading Privacy Policy...</p>
      </div>
    );
  }

  return (
    <div className="relative h-screen flex flex-col">
      {/* Header */}
      <div className="p-2">
        <h1 className="text-xl font-bold text-center">Privacy Policy</h1>
      </div>

      {/* Fixed Current Policy Section */}
      <div className="sticky top-[64px] z-20 p-4">
        <h2 className="text-xl font-semibold mb-2">Current Privacy Policy</h2>
      </div>

      {/* Current Policy */}
      <div
        className="text-gray-800 bg-gray-100 m-2 p-4 rounded-lg overflow-y-auto"
        dangerouslySetInnerHTML={{ __html: policy }}
      />

      {/* Edit Section */}
      <div className="sticky bottom-0 z-30 p-4">
        <h3 className="text-xl font-semibold mb-2">Edit Privacy Policy</h3>
        <textarea
          value={editedPolicy}
          onChange={(e) => setEditedPolicy(e.target.value)}
          rows={4}
          placeholder="Enter updated privacy policy here..."
          className="w-full border border-gray-300 rounded-lg p-2 mb-3 resize-none focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <button
          onClick={handleUpdate}
          className="w-full bg-green-500 text-white py-2 rounded-2xl font-semibold hover:bg-green-600"
        >
          Update Privacy Policy
        </button>
      </div>
    </div>
  );
}
