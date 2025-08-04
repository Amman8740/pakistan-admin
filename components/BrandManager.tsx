"use client";
import { useEffect, useState } from "react";
import BrandFormModal from "./BrandFormodal";
import BrandItem from "./BrandItem";
import { getAllBrands } from "@/app/hooks/useBrands";

type Brand = {
  _id: string;
  brandName: string;
  models: {
    modelName: string;
    modelDetail: string;
  }[];
};

type BrandManagerProps = {
  category: "panels" | "inverters" | "batteries";
};

export default function BrandManager({ category }: BrandManagerProps) {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [showForm, setShowForm] = useState(false);

    useEffect(() => {
    getAllBrands()
      .then((res) => {
        const filtered = res.filter((b) => b.category === category);
        setBrands(filtered);
      })
      .catch((err) => {
        console.error("Failed to load brands:", err);
      });
  }, [category]);
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
          key={brand._id}
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
