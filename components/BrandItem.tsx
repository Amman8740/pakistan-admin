"use client";
import { useEffect, useState } from "react";
import {
  Trash2,
  Edit,
  Plus,
  ListFilter,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import {
  updateBrandModel,
  updateBrandModelSpecific,
  updateBrandNumber,
} from "@/app/hooks/useBrands";

type Entry = {
  name: string;
  models: string[];
};

type BrandItemProps = {
  data: {
    _id: string;
    brandNumber: number;
    brandName: string;
    models: { modelName: string; modelDetail: string }[];
  };
  onDelete: () => void;
};

export default function BrandItem({ data, onDelete }: BrandItemProps) {
  const [expanded, setExpanded] = useState(false);
  const [entries, setEntries] = useState<Entry[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [newName, setNewName] = useState("");
  const [newModels, setNewModels] = useState("");
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editName, setEditName] = useState("");
  const [editModels, setEditModels] = useState("");
  const [brandNumber, setBrandNumber] = useState<number | "">("");
  const [showNumberForm, setShowNumberForm] = useState(false);

  // ✅ Ensure correct entries load initially (even if entries is missing)
  useEffect(() => {
    if (Array.isArray(data.models)) {
      const mapped = data.models.map((m) => ({
        name: m.modelName,
        models: [m.modelDetail],
      }));
      setEntries(mapped);
    }
  }, [data.models]);

  const handleAddEntry = async () => {
    if (!newName || !newModels) return;

    const modelsArray = newModels
      .split(",")
      .map((model) => ({
        modelName: newName.trim(),
        modelDetail: model.trim(), // optional detail, or use a separate field
      }))
      .filter((m) => m.modelName);

    try {
      const updatedBrand = await updateBrandModel({
        brandId: data._id,
        models: modelsArray,
      });

      // Update entries from updated brand
      setEntries(updatedBrand.models || []);
      setShowForm(false);
      setNewName("");
      setNewModels("");
    } catch (error: any) {
      console.error("Add model error:", error);
      alert(error.message);
    }
  };
  const handleUpdateModel = async (idx: number) => {
    try {
      const updated = await updateBrandModelSpecific({
        brandId: data._id, // passed from BrandItem props
        index: idx, // index of model to update
        newModel: {
          modelName: editName,
          modelDetail: editModels,
        },
      });

      const updatedEntries = updated.models.map((m: any) => ({
        name: m.modelName,
        models: [m.modelDetail],
      }));
      setEntries(updatedEntries); // update frontend state
      setEditIndex(null); // clo edit UI
    } catch (error: any) {
      console.error("Model update error:", error.message);
      alert("Failed to update model.");
    }
  };
  const handleBrandNumberUpdate = async () => {
  try {
    const updated = await updateBrandNumber({
      brandId: data._id,
      brandNumber: Number(brandNumber),
    });
    alert("Brand number updated!");
    setShowNumberForm(false);
  } catch (err: any) {
    alert(err.message || "Update failed");
  }
};

  const handleDeleteEntry = (idx: number) => {
    setEntries((prev) => prev.filter((_, i) => i !== idx));
  };

  return (
    <div className="border-b py-4 px-2">
      {/* Header */}
      <div
        className="flex justify-between items-center cursor-pointer"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="font-semibold">{data.brandName}</div>
        <span className="text-xl">
          {expanded ? <ChevronDown size={16} /> : <ChevronUp size={16} />}
        </span>
      </div>

      {/* Expanded Details */}
      {expanded && (
        <div className="mt-2 text-sm text-gray-700">
          {/* Brand Entries */}
          {entries.map((model, idx) => (
            <div key={idx} className="flex justify-between items-start mb-2">
              <div>
                <p className="font-medium">{model.name || "Unknown Model"}</p>
                <p className="text-gray-600">
                  {model.models.join(", ") || "No details available"}
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  className="text-green-600"
                  onClick={() => {
                    setEditIndex(idx);
                    setEditName(model.name);
                    setEditModels(model.models.join(", "));
                  }}
                >
                  <Edit size={16} />
                </button>
                {editIndex === idx && (
                  <div className="mt-4 bg-gray-50 p-4 rounded-lg">
                    <input
                      type="text"
                      placeholder="Edit name"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      className="w-full border p-2 mb-2 rounded"
                    />
                    <input
                      type="text"
                      placeholder="Edit models (comma-separated)"
                      value={editModels}
                      onChange={(e) => setEditModels(e.target.value)}
                      className="w-full border p-2 mb-2 rounded"
                    />
                    <div className="flex justify-end gap-2">
                      <button
                        className="text-gray-500 font-semibold"
                        onClick={() => {
                          setEditIndex(null);
                          setEditName("");
                          setEditModels("");
                        }}
                      >
                        Cancel
                      </button>
                      <button
                        className="text-green-600 font-semibold"
                        onClick={() => handleUpdateModel(editIndex)}
                      >
                        Update
                      </button>
                    </div>
                  </div>
                )}
                <button
                  className="text-red-500"
                  onClick={() => handleDeleteEntry(idx)}
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}

          {/* Global Actions */}
          <div className="flex gap-3 justify-end mt-2">
            <button className="text-red-500" onClick={onDelete}>
              <Trash2 size={16} />
            </button>
            <button
              className="text-green-600"
              onClick={() => setShowForm(true)}
            >
              <Plus size={16} />
            </button>
            <button
              className="text-green-600"
              onClick={() => {
                setBrandNumber(data.brandNumber || "");
                setShowNumberForm(true);
              }}
            >
              <ListFilter size={16} />
            </button>
            {showNumberForm && (
              <div className="mt-4 bg-gray-50 p-4 rounded-lg">
                <label className="text-sm font-semibold text-gray-600 mb-1 block">
                  Update Brand Number
                </label>
                <input
                  type="number"
                  placeholder="Enter brand number"
                  value={brandNumber}
                  onChange={(e) => setBrandNumber(Number(e.target.value))}
                  className="bg-white w-full border p-2 rounded mb-2"
                />
                <div className="flex justify-end gap-2">
                  <button
                    className="text-gray-500 font-semibold"
                    onClick={() => {
                      setShowNumberForm(false);
                      setBrandNumber("");
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    className="text-green-600 font-semibold"
                  onClick={handleBrandNumberUpdate}
                  >
                    Update
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Add Form */}
          {showForm && (
            <div className="mt-4">
              <input
                type="text"
                placeholder="Enter name"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className="bg-white w-full border p-2 rounded mb-2"
              />
              <input
                type="text"
                placeholder="Enter comma-separated models"
                value={newModels}
                onChange={(e) => setNewModels(e.target.value)}
                className="bg-white w-full border p-2 rounded mb-2"
              />
              <div className="flex justify-end gap-2">
                <button
                  className="text-gray-500 font-semibold"
                  onClick={() => {
                    setShowForm(false);
                    setNewName("");
                    setNewModels("");
                  }}
                >
                  Cancel
                </button>
                <button
                  className="text-green-600 font-semibold"
                  onClick={handleAddEntry}
                >
                  Add
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
