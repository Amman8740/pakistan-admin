import { useState } from "react";

const PanelForm = () => {
    const [form, setForm] = useState({
        type: "seller",
        brand: "",
        name: "",
        unitType: "container",
        quantity: "",
        priceRange: "",
        location: "",
        avability: "",
    })
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: value,
        }))};
        const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            // Here you would typically handle form submission, e.g., send data to an API
            console.log("Form submitted:", form);
        }
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block font-medium mb-1">Type</label>
        <select name="type" value={form.type} onChange={handleChange} className="w-full border rounded-2xl p-2">
          <option value="seller">Seller</option>
          <option value="buyer">Buyer</option>
        </select>
      </div>
      <div>
        <label className="block font-medium mb-1">Brand</label>
        <input type="text" name="brand" value={form.brand} onChange={handleChange} placeholder="Enter Brand Name" className="w-full border rounded-2xl p-2"/>
      </div>
      <div>
        <label className="block font-medium mb-1">Name</label>
        <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="Enter Panel Name" className="w-full border rounded-2xl p-2"/>
      </div>
      {/* container/pallet and quality/pieces */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block font-medium mb-1">Container / Pallet</label>
          <select name="unitType" value={form.unitType} onChange={handleChange} className="w-full border rounded-2xl p-2">
            <option value="container">Container</option>
            <option value="pallet">Pallet</option>
          </select>
        </div>
        <div>
          <label className="block font-medium mb-1">Quantity / Pieces</label>
          <input type="number" name="quantity" value={form.quantity} onChange={handleChange} placeholder="e.g. 500" className="w-full border rounded-2xl p-2"/>
        </div>
      </div>
      {/* Price range and location */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block font-medium mb-1">Price Range</label>
          <input type="text" name="priceRange" value={form.priceRange} onChange={handleChange} placeholder="e.g. 20-40" className="w-full border rounded-2xl p-2"/>
        </div>
        <div>
          <label className="block font-medium mb-1">Location</label>
          <input type="text" name="location" value={form.location} onChange={handleChange} placeholder="e.g. Karachi" className="w-full border rounded-2xl p-2"/>
        </div>
      </div>
      <div>
        <label className="block font-medium mb-1">Avability</label>
        <input type="text" name="avaibility" value={form.avability} onChange={handleChange} placeholder="" className="w-full border rounded-2xl p-2"/>
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
