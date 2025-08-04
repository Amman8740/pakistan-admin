"use client";
import { getBrandsByAdmin } from "@/app/hooks/useBrands";
import { createPanelPost } from "@/app/hooks/usePanel";
import { useEffect, useState } from "react";
type BrandWithModels = {
  _id: string;
  brandName: string;
  category: string;
  models: { modelName: string; modelDetail?: string }[];
};
const PanelForm = () => {
  const [brands, setBrands] = useState<BrandWithModels[]>([]);
  const [modelOptions, setModelOptions] = useState<string[]>([]);
  const [form, setForm] = useState({
    type: "seller",
    brand: "",
    name: "",
    container: "container",
    quantity: "",
    priceRange: "",
    location: "",
    availability: "",
  });
  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const allBrands = await getBrandsByAdmin();
        setBrands(allBrands);
      } catch (error) {
        console.error("Failed to fetch brands:", error);
      }
    };
    fetchBrands();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (name === "brand") {
      const selectedBrand = brands.find((b) => b.brandName === value);
      const models = selectedBrand?.models?.map((m) => m.modelName) || [];
      setModelOptions(models);
      setForm((prev) => ({ ...prev, name: "" })); // reset selected model
    }
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const [min, max] = form.priceRange.split("-").map((v) => Number(v.trim()));
    try {
      await createPanelPost({
        type: form.type,
        brand: form.brand,
        name: form.name,
        container: form.container,
        quantity: Number(form.quantity),
        priceMin: min,
        priceMax: max,
        location: form.location,
        availability: form.availability,
      });
      alert("Panel post created!");
    } catch (err: any) {
      alert(err.message || "Submission failed");
    }
  };
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block font-medium mb-1">Type</label>
        <select
          name="type"
          value={form.type}
          onChange={handleChange}
          className="w-full border rounded-2xl p-2"
        >
          <option value="seller">Seller</option>
          <option value="buyer">Buyer</option>
        </select>
      </div>
      <div>
        <label className="block font-medium mb-1">Brand</label>
        <select
          name="brand"
          value={form.brand}
          onChange={handleChange}
          className="w-full border rounded-2xl p-2"
        >
          <option value="">Select brand</option>
          {brands.map((b) => (
            <option key={b._id} value={b.brandName}>
              {b.brandName}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="block font-medium mb-1">Panel Name</label>
        <select
          name="name"
          value={form.name}
          onChange={handleChange}
          className="w-full border rounded-2xl p-2"
        >
          <option value="">Select Model</option>
          {modelOptions.map((model, idx) => (
            <option key={idx} value={model}>
              {model}
            </option>
          ))}
        </select>
      </div>
      {/* container/pallet and quality/pieces */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block font-medium mb-1">Container / Pallet</label>
          <select
            name="container"
            value={form.container}
            onChange={handleChange}
            className="w-full border rounded-2xl p-2"
          >
            <option value="container">Container</option>
            <option value="pallet">Pallet</option>
          </select>
        </div>
        <div>
          <label className="block font-medium mb-1">Quantity / Pieces</label>
          <input
            type="number"
            name="quantity"
            value={form.quantity}
            onChange={handleChange}
            placeholder="e.g. 500"
            className="w-full border rounded-2xl p-2"
          />
        </div>
      </div>
      {/* Price range and location */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block font-medium mb-1">Price Range</label>
          <input
            type="text"
            name="priceRange"
            value={form.priceRange}
            onChange={handleChange}
            placeholder="e.g. 20-40"
            className="w-full border rounded-2xl p-2"
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Location</label>
          <input
            type="text"
            name="location"
            value={form.location}
            onChange={handleChange}
            placeholder="e.g. Karachi"
            className="w-full border rounded-2xl p-2"
          />
        </div>
      </div>
   <div>
  <label className="block font-medium mb-1">Availability</label>
  <select
    name="availability"
    value={form.availability}
    onChange={handleChange}
    className="w-full border rounded-2xl p-2"
  >
    <option value="">Select availability</option>
    <option value="Ready Stock">Ready Stock</option>
    <option value="Delivery">Delivery</option>
  </select>
</div>
      <div>
        <button
          type="submit"
          className="w-full rounded-2xl bg-green-600 text-white py-2  hover:bg-green-700 transition-all"
        >
          Submit
        </button>
      </div>
    </form>
  );
};
export default PanelForm;
