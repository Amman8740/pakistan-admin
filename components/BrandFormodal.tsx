import { useState } from "react";
type BrandFormModalProps = {
  onClose: () => void;
  onSave: (data: { brand: string; entries: { name: string; models: string[] }[] }) => void;
};

export default function BrandFormModal({ onClose, onSave }: BrandFormModalProps) {
  const [brand, setBrand] = useState("");
  const [name, setName] = useState("");
  const [models, setModels] = useState("");

  const handleSubmit = () => {
    onSave({
        brand,
  entries: [
    {
      name,
      models: models.split(",").map(m => m.trim()).filter(Boolean)
    }
  ]
    });
  };

  return (
    <div className="fixed inset-0 bg-[rgba(0,0,0,0.4)] flex items-center justify-center z-50">
      <div className="bg-white rounded-3xl p-6 w-[60%] mt-10 max-w-sm">
        <h2 className="text-xl font-semibold mb-4">Add New Brand</h2>
        <label className="text-sm font-bold text-gray-500 m-2">Brand</label>
        <input
          type="text"
          placeholder="Enter Brand"
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
          className="w-full border p-2 mb-3 rounded"
        />
        <label className="text-sm font-bold text-gray-500 m-2">Name</label>
        <input
          type="text"
          placeholder="Enter Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border p-2 mb-3 rounded"
        />
        <label className="text-sm font-bold text-gray-500 m-2">Models comma saperated</label>
        <input
          type="text"
          placeholder="Enter comma-separated models"
          value={models}
          onChange={(e) => setModels(e.target.value)}
          className="w-full border p-2 mb-3 rounded"
        />

        <div className="flex justify-around">
          <button onClick={onClose} className="text-red-500 font-semibold">
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="text-green-600 font-semibold"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}