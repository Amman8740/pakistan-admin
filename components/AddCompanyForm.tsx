"use client";
import { useState } from "react";
import { CompanyFormData } from "@/types";
type Props = {
    onSubmit: (data: CompanyFormData) => void;
    onCancel: () => void;
}
export default function AddCompanyForm({ onSubmit, onCancel }: Props) {
  const [company, setCompany] = useState("");
  const [director, setDirector] = useState("");
  const [phone, setPhone] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ company, director, phone, description });
    setCompany(""); setDirector(""); setPhone(""); setDescription("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <input
        value={company}
        onChange={(e) => setCompany(e.target.value)}
        placeholder="Company Name"
        className="w-full border rounded-2xl px-3 py-2 text-black"
        required
      />
      <input
        value={director}
        onChange={(e) => setDirector(e.target.value)}
        placeholder="Director Name"
        className="w-full border rounded-2xl px-3 py-2 text-black"
        required
      />
      <input
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        placeholder="Phone"
        className="w-full border rounded-2xl px-3 py-2 text-black"
        required
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
        className="w-full border rounded-2xl px-3 py-2 text-black"
        required
      ></textarea>
      <div className="flex justify-end gap-2">
        <button type="button" onClick={onCancel} className="text-gray-500 hover:underline">
          Cancel
        </button>
        <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
          Add
        </button>
      </div>
    </form>
  );
}
