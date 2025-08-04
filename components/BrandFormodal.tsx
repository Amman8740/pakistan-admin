import { addBrand } from "@/app/hooks/useBrands";
import { useState } from "react";

type BrandFormModalProps = {
  onClose: () => void;
  onSave: (data: {
    _id: string;
    brandName: string;
    models: { modelName: string; modelDetail: string }[];
    category: "panels" | "inverters" | "batteries";
    brandNumber: number;
  }) => void;
  category: "panels" | "inverters" | "batteries";
  brandNumber?: number;
};

export default function BrandFormModal({
  onClose,
  onSave,
  category,
  brandNumber = 1,
}: BrandFormModalProps) {
  const [brand, setBrand] = useState("");
  const [modelName, setModelName] = useState("");
  const [modelDetails, setModelDetails] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!brand || !modelName || !modelDetails) {
      return alert("All fields are required");
    }

    const parsedModels = modelDetails
      .split(",")
      .map((detail) => ({
        modelName: modelName.trim(),
        modelDetail: detail.trim(),
      }))
      .filter((m) => m.modelName && m.modelDetail);

    const payload = {
      brandName: brand.trim(),
      models: parsedModels,
      category,
      brandNumber,
    };

    try {
      setLoading(true);
      const created = await addBrand(payload);
      onSave(created);
      onClose();
    } catch (err: any) {
      alert(err.message || "Failed to add brand");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-[rgba(0,0,0,0.4)] flex items-center justify-center z-50">
      <div className="bg-white rounded-3xl p-6 w-[60%] mt-10 max-w-sm">
        <h2 className="text-xl font-semibold mb-4">Add New Brand</h2>

        <label className="text-sm font-bold text-gray-500 m-2">Brand Name</label>
        <input
          type="text"
          placeholder="Enter brand name"
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
          className="w-full border p-2 mb-3 rounded"
        />

        <label className="text-sm font-bold text-gray-500 m-2">Model Name</label>
        <input
          type="text"
          placeholder="Enter model name"
          value={modelName}
          onChange={(e) => setModelName(e.target.value)}
          className="w-full border p-2 mb-3 rounded"
        />

        <label className="text-sm font-bold text-gray-500 m-2">Model Details (comma-separated)</label>
        <input
          type="text"
          placeholder="e.g. 550W, 600W, 650W"
          value={modelDetails}
          onChange={(e) => setModelDetails(e.target.value)}
          className="w-full border p-2 mb-3 rounded"
        />

        <div className="flex justify-around mt-4">
          <button onClick={onClose} className="text-red-500 font-semibold">
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="text-green-600 font-semibold"
            disabled={loading}
          >
            {loading ? "Adding..." : "Add Brand"}
          </button>
        </div>
      </div>
    </div>
  );
}
