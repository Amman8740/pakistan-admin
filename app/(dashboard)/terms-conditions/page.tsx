"use client";
import { useState } from "react";

export default function PrivacyPolicyPage() {
    const [terms, setTerms] = useState(`
        <p>At Pakistan Solar Market (PSM), we are committed to protecting your privacy...</p>
      
        <h3><strong>Information We Collect</strong></h3>
        <p>We may collect the following types of information:</p>
      
        <strong>Personal Information:</strong>
        <p>When you register or create an account...</p>
      
        <strong>Device and Usage Data:</strong>
        <p>We automatically collect information about devices...</p>
               <p>At Pakistan Solar Market (PSM), we are committed to protecting your privacy...</p>
      
        <h3><strong>Information We Collect</strong></h3>
        <p>We may collect the following types of information:</p>
      
        <strong>Personal Information:</strong>
        <p>When you register or create an account...</p>
      
        <strong>Device and Usage Data:</strong>
        <p>We automatically collect information about devices...</p>
      `);

  const [editedTerm, setEditedTerm] = useState("");

  const handleUpdate = () => {
    if (editedTerm.trim()) {
      setTerms(editedTerm);
      setEditedTerm("");
      alert("Privacy policy updated!");
    }
  };

  return (
    <div className="relative h-screen flex flex-col">
      {/* Header */}
      <div className="p-2">
        <h1 className="text-xl font-bold text-center">Terms & Conditions</h1>
      </div>

      {/* Fixed Current Policy Section */}
      <div className="sticky top-[64px] z-20 p-4">
        <h2 className="text-xl font-semibold mb-2">Current Terms & Conditions</h2>
      </div>
      <div
          className="text-gray-800 bg-gray-100 m-2 p-4 rounded-lg overflow-y-auto"
          dangerouslySetInnerHTML={{ __html: terms }}/>
      {/* Fixed Edit Section */}
      <div className="sticky bottom-0 z-30 p-4">
        <h3 className="text-xl font-semibold mb-2">Edit Terms & Conditions</h3>
        <textarea
          value={editedTerm}
          onChange={(e) => setEditedTerm(e.target.value)}
          rows={4}
          placeholder="Enter updated privacy policy here..."
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
