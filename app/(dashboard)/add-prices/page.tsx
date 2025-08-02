"use client";
import PriceCard from "@/components/PriceCard";

export default function AddPricesPage() {
  const handleAddPrice = (min: number, max: number) => {
    console.log("New Price Range:", { min, max });
    // You can push to API or update state here
  };

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-1 gap-6">
      <div className="bg-gray-100 items-center p-6 rounded-lg">
        <h2 className="text-lg font-semibold mb-3 text-center text-green-500">Panel Price</h2>
        <PriceCard onSubmit={handleAddPrice} />
      </div>

      <div className="bg-gray-100 items-center p-6 rounded-lg">
        <h2 className="text-lg font-semibold mb-3 text-center text-green-500">Bids Price</h2>
        <PriceCard onSubmit={handleAddPrice} />
      </div>
    </div>
  );
}
