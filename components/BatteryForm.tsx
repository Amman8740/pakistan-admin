"use client";
import { useEffect, useState } from "react";
import { getBrandsByAdmin } from "@/app/hooks/useBrands";
import { getAllLocations } from "@/app/hooks/useLocations";
import { createPost } from "@/app/hooks/usePanel"; // reuse createPost

type BrandWithModels = {
  _id: string;
  brandName: string;
  category: string;
  models: { modelName: string; modelDetail: string[] }[];
};

const BatteryForm = ({category}: {category: string}) => {
  const [brands, setBrands] = useState<BrandWithModels[]>([]);
  const [modelNames, setModelNames] = useState<string[]>([]);
  const [modelVariants, setModelVariants] = useState<string[]>([]);
  const [allModels, setAllModels] = useState<BrandWithModels[0]["models"]>([]);
  const [locations, setLocations] = useState<{ _id: string; location: string }[]>([]);

  const [form, setForm] = useState({
    type: "seller",
    brand: "",
    name: "",
    variant: "",
    quantity: "",
    priceRange: "",
    location: "",
    availability: "",
    deliveryDate: "",
  });

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const allBrands = await getBrandsByAdmin();
        setBrands(allBrands.filter((b) => b.category === "batteries"));
        const locs = await getAllLocations();
        setLocations(locs);
      } catch (err) {
        console.error("Init fetch error:", err);
      }
    };
    fetchInitialData();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));

    if (name === "brand") {
      const selectedBrand = brands.find((b) => b.brandName === value);
      const models = selectedBrand?.models || [];

      const uniqueNames = [...new Set(models.map((m) => m.modelName))];
      setAllModels(models);
      setModelNames(uniqueNames);
      setModelVariants([]);
      setForm((prev) => ({ ...prev, name: "", variant: "" }));
    }

  if (name === "name") {
  const variants: string[] = Array.from(
    new Set(
      allModels
        .filter((m) => m.modelName === value)
        .flatMap((m) => Array.isArray(m.modelDetail) ? m.modelDetail : []) // guard if optional
        .map((v) => v.trim())
        .filter(Boolean)
    )
  );

  setModelVariants(variants);
  setForm((prev) => ({
    ...prev,
    variant: variants[0] ?? "",
  }));
}
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const [min, max] = form.priceRange.split("-").map((v) => Number(v.trim()));

    try {
      await createPost({
        type: form.type,
        brand: form.brand,
        category: category,
        name: form.name,
        variant: form.variant,
        quantity: Number(form.quantity),
        priceMin: min,
        priceMax: max,
        location: form.location,
        availability: form.availability,
        deliveryDate: form.availability === "Delivery" ? form.deliveryDate : undefined,
      });
      alert("Battery post created!");
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
        <label className="block font-medium mb-1">Battery Name</label>
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

      <div>
        <label className="block font-medium mb-1">Quantity</label>
        <input
          type="number"
          name="quantity"
          value={form.quantity}
          onChange={handleChange}
          placeholder="e.g. 500"
          className="w-full border rounded-2xl p-2"
        />
      </div>

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
          className="w-full bg-green-600 text-white py-2 rounded-2xl hover:bg-green-700 transition-all"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default BatteryForm;
