"use client";

import { getTerms, updateTerms } from "@/app/hooks/useTerms";
import { useState, useEffect } from "react";

export default function TermsPage() {
  const [terms, setTerms] = useState("");
  const [editedTerm, setEditedTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTerms = async () => {
      try {
        setLoading(true);
        const data = await getTerms();
        setTerms(data.content);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchTerms();
  }, []);

  const handleUpdate = async () => {
    if (!editedTerm.trim()) return;

    try {
      const updated = await updateTerms(editedTerm);
      setTerms(updated.content);
      setEditedTerm("");
      alert("Terms & Conditions updated successfully!");
    } catch (error) {
      console.error(error);
      alert("Failed to update terms");
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  return (
    <div className="relative h-screen flex flex-col">
      <div className="p-2">
        <h1 className="text-xl font-bold text-center">Terms & Conditions</h1>
      </div>

      <div className="sticky top-[64px] z-20 p-4">
        <h2 className="text-xl font-semibold mb-2">Current Terms & Conditions</h2>
      </div>

      <div
        className="text-gray-800 bg-gray-100 m-2 p-4 rounded-lg overflow-y-auto"
        dangerouslySetInnerHTML={{ __html: terms }}
      />

      <div className="sticky bottom-0 z-30 p-4">
        <h3 className="text-xl font-semibold mb-2">Edit Terms & Conditions</h3>
        <textarea
          value={editedTerm}
          onChange={(e) => setEditedTerm(e.target.value)}
          rows={4}
          placeholder="Enter updated terms here..."
          className="w-full border border-gray-300 rounded-lg p-2 mb-3 resize-none focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <button
          onClick={handleUpdate}
          className="w-full bg-green-500 text-white py-2 rounded-2xl font-semibold hover:bg-green-600"
        >
          Update Terms & Conditions
        </button>
      </div>
    </div>
  );
}
