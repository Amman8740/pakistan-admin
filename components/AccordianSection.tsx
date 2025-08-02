"use client";
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import CompanyCard from "./CompanyCard";
import AddCompanyForm from "./AddCompanyForm";
import { CompanyFormData } from "@/types";

type Company = {
  id: number;
  company: string;
  director: string;
  phone: string;
  description: string;
};

export default function AccordionSection({ title }: { title: string }) {
  const [open, setOpen] = useState(false);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [showForm, setShowForm] = useState(false);

  const handleAdd = (data: CompanyFormData) => {
    const newCompany = {...data, id: Date.now()};
    setCompanies((prev) => [...prev, newCompany]);
    setShowForm(false);
  };

  const handleDelete = (id: number) => {
    setCompanies((prev) => prev.filter((c) => c.id !== id));
  };

  return (
    <div className="mb-4 bg-gray-100 rounded-lg">
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-black px-4 py-3 flex justify-between items-center font-semibold"
      >
        {title}
        {open ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </button>

      {open && (
        <div className="px-4 pb-4 space-y-4">
          {companies.map((c) => (
            <CompanyCard key={c.id} data={c} onDelete={() => handleDelete(c.id)} />
          ))}

          {showForm ? (
            <AddCompanyForm onSubmit={handleAdd} onCancel={() => setShowForm(false)} />
          ) : (
            <button
              onClick={() => setShowForm(true)}
              className="mt-4 text-sm px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Add New
            </button>
          )}
        </div>
      )}
    </div>
  );
}
