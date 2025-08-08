"use client";
import { getBrandsByAdmin } from "@/app/hooks/useBrands";
import { getAllLocations } from "@/app/hooks/useLocations";
import { createPost } from "@/app/hooks/usePanel";

import { useEffect, useState } from "react";
type BrandWithModels = {
  _id: string;
  brandName: string;
  category: string;
  models: { modelName: string; modelDetail?: string }[];
};
const PanelForm = ({category}:{category: string}) => {
  const [modelNames, setModelNames] = useState<string[]>([]);
  const [modelVariants, setModelVariants] = useState<string[]>([]);
  const [allModels, setAllModels] = useState<BrandWithModels[0]["models"]>([]);
  const [brands, setBrands] = useState<BrandWithModels[]>([]);
  const [locations, setLocations] = useState<{ _id: string; location: string }[]>(
    []
  );
  const [form, setForm] = useState({
    type: "seller",
    category: category,
    brand: "",
    name: "",
    variant: "",
    container: "container",
    quantity: "",
    priceRange: "",
    location: "",
    availability: "",
    deliveryDate: "",
  });
  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const result = await getAllLocations();
        setLocations(result); // assuming data is [{ _id, name }]
      } catch (err) {
        console.error("Error loading locations:", err);
      }
    };
    const fetchBrands = async () => {
      try {
        const allBrands = await getBrandsByAdmin();
        setBrands(allBrands);
      } catch (error) {
        console.error("Failed to fetch brands:", error);
      }
    };
    fetchLocations();
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
      const models = selectedBrand?.models || [];

      const uniqueModelNames = [...new Set(models.map((m) => m.modelName))];

      setAllModels(models); // store all models
      setModelNames(uniqueModelNames); // show distinct modelNames
      setModelVariants([]); // clear previous variants
      setForm((prev) => ({ ...prev, name: "", variant: "" }));
    }
    if (name === "name") {
      const variants = allModels
        .filter((m) => m.modelName === value)
        .map((m) => m.modelDetail || "");

      setModelVariants(variants);
      setForm((prev) => ({
        ...prev,
        variant: variants[0] || "", // optional: auto-select first
      }));
    }
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const [min, max] = form.priceRange.split("-").map((v) => Number(v.trim()));
    try {
      await createPost({
        type: form.type,
        category: category,
        brand: form.brand,
        name: form.name,
        container: form.container,
        variant: form.variant,
        quantity: Number(form.quantity),
        priceMin: min,
        priceMax: max,
        location: form.location,
        availability: form.availability,
        deliveryDate: form.availability === "Delivery" ? form.deliveryDate : undefined,
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
          {modelNames.map((name, idx) => (
            <option key={idx} value={name}>
              {name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="block font-medium mb-1">Model Variant</label>
        <select
          name="variant"
          value={form.variant}
          onChange={handleChange}
          className="w-full border rounded-2xl p-2"
        >
          <option value="">Select Variant</option>
          {modelVariants.map((variant, idx) => (
            <option key={idx} value={variant}>
              {variant}
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
          <select
            name="location"
            value={form.location}
            onChange={handleChange}
            className="w-full border rounded-2xl p-2"
          >
            <option value="">Select location</option>
            {locations.map((loc) => (
              <option key={loc._id} value={loc.location}>
                {loc.location}
              </option>
            ))}
          </select>
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

      {form.availability === "Delivery" && (
        <div>
          <label className="block font-medium mb-1">
            Expected Delivery Date
          </label>
          <input
            type="date"
            name="deliveryDate"
            value={form.deliveryDate}
            onChange={handleChange}
            className="w-full border rounded-2xl p-2"
          />
        </div>
      )}
      <div className="mt-6">
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
