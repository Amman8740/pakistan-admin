"use client";
import { useState } from "react";
import BrandFormModal from "./BrandFormodal";
import BrandItem from "./BrandItem";

type Brand = {
  brand: string;
  entries: {
    name: string;
    models: string[];
  }[];
};

type BrandManagerProps = {
  category: "panels" | "inverters" | "batteries";
};

export default function BrandManager({ category }: BrandManagerProps) {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [showForm, setShowForm] = useState(false);

  const addBrand = (newBrand: Brand) => {
    setBrands((prev) => [...prev, newBrand]);
    setShowForm(false);
  };

  return (
    <div className="p-4 bg-gray-100 rounded-xl">
      <h2 className="text-xl font-semibold text-center mb-4 capitalize">
        {category} Brands
      </h2>

      {brands.map((brand, idx) => (
        <BrandItem
          key={idx}
          data={brand}
          onDelete={() => setBrands((prev) => prev.filter((_, i) => i !== idx))}
        />
      ))}

      <div className="flex justify-center mt-6">
        <button
          onClick={() => setShowForm(true)}
          className="bg-green-500 text-white px-6 py-1 rounded-full"
        >
          Add New Brand
        </button>
      </div>

      {showForm && (
        <BrandFormModal
          onClose={() => setShowForm(false)}
          onSave={addBrand}
          category={category}
        />
      )}
    </div>
  );
}
