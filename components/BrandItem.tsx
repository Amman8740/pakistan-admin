"use client";
import { useEffect, useState } from "react";
import { Trash2, Edit, Plus, ListFilter, ChevronDown, ChevronUp } from "lucide-react";

type Entry = {
  name: string;
  models: string[];
};

type BrandItemProps = {
  data: {
    brand: string;
    entries?: Entry[]; // optional for safety
  };
  onDelete: () => void;
};

export default function BrandItem({ data, onDelete }: BrandItemProps) {
  const [expanded, setExpanded] = useState(false);
  const [entries, setEntries] = useState<Entry[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [newName, setNewName] = useState("");
  const [newModels, setNewModels] = useState("");

  // ✅ Ensure correct entries load initially (even if entries is missing)
  useEffect(() => {
    if (Array.isArray(data.entries)) {
      setEntries(data.entries);
    }
  }, [data.entries]);

  const handleAddEntry = () => {
    if (!newName || !newModels) return;

    const entry: Entry = {
      name: newName,
      models: newModels.split(",").map((m) => m.trim()).filter(Boolean),
    };

    setEntries((prev) => [...prev, entry]);
    setShowForm(false);
    setNewName("");
    setNewModels("");
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
        <div className="font-semibold">{data.brand}</div>
        <span className="text-xl">
          {expanded ? <ChevronDown size={16} /> : <ChevronUp size={16} />}
        </span>
      </div>

      {/* Expanded Details */}
      {expanded && (
        <div className="mt-2 text-sm text-gray-700">
          {/* Brand Entries */}
          {entries.map((entry, idx) => (
            <div key={idx} className="flex justify-between items-start mb-2">
              <div>
                <p className="font-medium">{entry.name}</p>
                <p className="text-gray-600">{entry.models.join(", ")}</p>
              </div>
              <div className="flex gap-2">
                <button className="text-green-600">
                  <Edit size={16} />
                </button>
                <button className="text-red-500" onClick={() => handleDeleteEntry(idx)}>
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
            <button className="text-green-600" onClick={() => setShowForm(true)}>
              <Plus size={16} />
            </button>
            <button className="text-green-600">
              <ListFilter size={16} />
            </button>
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
                <button className="text-green-600 font-semibold" onClick={handleAddEntry}>
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
