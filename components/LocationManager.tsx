"use client";

import { Check, Pencil, Trash2, X } from "lucide-react";
import { useState } from "react";

export default function LocationManager() {
    const [location, setLocation] = useState("")
    const [locations, setLocations] = useState([
        "EX-KHI",
        "EX-CHISTIYA",
        "EX-ISL",
        "EX-MTN",
        "EX-LHR",
        "EX-DADU",
        "EX-OKR",
        "EX-FSD",
        "EX-GRWL",
    ])
    const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editedLocation, setEditedLocation] = useState("");
    const handleAdd = () => {
        if(location.trim()){
            setLocations((prev) => [...prev, location.trim()]);
            setLocation("");
        }
    }
    const handleDelete = (index:number) => {
        setLocations((prev)=> prev.filter((_, i)=> i !== index));
    }
    const handleEditClick = (index: number) => {
        setEditIndex(index);
        setEditedLocation(locations[index]);
      };
      const handleEditSave = () => {
        if (editedLocation.trim()) {
          const updated = [...locations];
          updated[editIndex!] = editedLocation.trim();
          setLocations(updated);
          setEditIndex(null);
          setEditedLocation("");
        }
      };
      const handleCancelEdit = () => {
        setEditIndex(null);
        setEditedLocation("");
      };
    
  return (
<div className="w-full min-h-screen flex flex-col items-center p-6 bg-white">
      <h1 className="text-2xl font-bold my-4">Admin Panel</h1>

      <div className="w-[80%] md:w-[100%] mb-6">
        <label htmlFor="location" className="block font-semibold mb-2">
          Location
        </label>
        <div className="flex gap-2">
          <input
            id="location"
            type="text"
            placeholder="Add Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="flex-1 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <button
            onClick={handleAdd}
            className="bg-green-500 hover:bg-green-600 text-white font-semibold px-4 py-2 rounded"
          >
            Add
          </button>
        </div>
      </div>

      <div className="w-[80%] md:w-[100%] space-y-2">
        {locations.map((loc, index) => (
          <div
            key={index}
            className="flex justify-between items-center bg-gray-100 px-4 py-3 rounded shadow-sm"
          >
            {editIndex === index ? (
              <div className="flex-1 flex gap-2">
                <input
                  type="text"
                  value={editedLocation}
                  onChange={(e) => setEditedLocation(e.target.value)}
                  className="w-full border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={handleEditSave}
                  className="text-green-600 hover:text-green-800"
                >
                  <Check />
                </button>
                <button
                  onClick={handleCancelEdit}
                  className="text-red-600 hover:text-red-800"
                >
                  <X />
                </button>
              </div>
            ) : (
              <>
                <span className="font-medium">{loc}</span>
                <div className="flex items-center gap-3">
                  <Pencil
                    className="text-green-600 cursor-pointer"
                    onClick={() => handleEditClick(index)}
                  />
                  <Trash2
                    className="text-red-500 cursor-pointer"
                    onClick={() => handleDelete(index)}
                  />
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>

  );
}