"use client";
import { useState } from "react";

type Props = {
  onSubmit: (min: number, max: number) => void;
};

export default function PriceCard({ onSubmit }: Props) {
  const [minPrice, setMinPrice] = useState<number | "">("");
  const [maxPrice, setMaxPrice] = useState<number | "">("");

  const handleSubmit = () => {
    if (minPrice !== "" && maxPrice !== "") {
      onSubmit(Number(minPrice), Number(maxPrice));
      setMinPrice("");
      setMaxPrice("");
    }
  };

  return (
    <div className="bg-gray-100 p-6 rounded-lg w-full mx-auto">
      <div className="flex flex-col gap-3 mb-4">
        <input
          type="number"
          placeholder="Minimum Price"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value === "" ? "" : Number(e.target.value))}
          className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="number"
          placeholder="Maximum Price"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value === "" ? "" : Number(e.target.value))}
          className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <button
        onClick={handleSubmit}
        className="bg-green-600 text-white px-6 py-2 rounded-xl hover:bg-green-700 transition-all block mx-auto"
      >
        Submit
      </button>
    </div>
  );
}
