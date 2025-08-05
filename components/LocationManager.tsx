"use client";

import { createLocation, getAllLocations } from "@/app/hooks/useLocations";
import { Check, Pencil, Trash2, X } from "lucide-react";
import { useEffect, useState } from "react";

export default function LocationManager() {
    const [location, setLocation] = useState("")
    const [locations, setLocations] = useState<{ _id: string; location: string }[]>([]);
    const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editedLocation, setEditedLocation] = useState("");
  useEffect(()=>{
    const fetch = async () => {
      try {
        const loc = await getAllLocations();
        setLocations(loc);
      } catch (error) {
        console.error("Error fetching locations:", error);
      }
    };
    fetch();
  },[]);
      const handleAdd = async () => {
    if (!location.trim()) return;
    try {
      const added = await createLocation(location.trim());
      setLocations((prev) => [...prev, added]);
      setLocation("");
    } catch (err: any) {
      alert(err.message || "Failed to add");
    }
  };
    const handleDelete = (index:number) => {
        setLocations((prev)=> prev.filter((_, i)=> i !== index));
    }
    const handleEditClick = (index: number) => {
        setEditIndex(index);
        setEditedLocation(locations[index].location);
      };
   const handleEditSave = () => {
    if (!editedLocation.trim()) return;
    const updated = [...locations];
    updated[editIndex!] = { ...updated[editIndex!], location: editedLocation.trim() };
    setLocations(updated); // optionally send to backend
    setEditIndex(null);
    setEditedLocation("");
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
            key={loc._id}
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
                <span className="font-medium">{loc.location}</span>
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