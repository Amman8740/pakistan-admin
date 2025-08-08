// components/EditPostModal.tsx
"use client";

import { Dialog } from "@headlessui/react";
import { useState } from "react";

type EditPostModalProps = {
  isOpen: boolean;
  onClose: () => void;
  initialData: {
    price: number;
    tokenMoney: number;
    location: string;
    type: string;
    quantity: string;
    availability: string;
    deliveryDate: "";
  };
  onSave: (updatedData: any) => void;
};

export default function EditPostModal({
  isOpen,
  onClose,
  initialData,
  onSave,
}: EditPostModalProps) {
  const [form, setForm] = useState({
  ...initialData,
  deliveryDate: initialData.deliveryDate || "",  // ensures it's not undefined
});


  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    onSave(form); // Call API here or in parent
    onClose();
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/20" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="mx-auto max-w-md w-full bg-white rounded-2xl p-6">
          <Dialog.Title className="text-lg font-semibold mb-4">
            Edit Post
          </Dialog.Title>

          <div className="space-y-4">
            <label htmlFor="">Price in RS K</label>
            <input
              name="price"
              value={form.price}
              onChange={handleChange}
              placeholder="Price in RS k"
              className="w-full border px-4 py-2 rounded"
            />
            <input
              name="tokenMoney"
              type="number"
              value={form.tokenMoney}
              onChange={handleChange}
              placeholder="Token Price"
              className="w-full border px-4 py-2 rounded"
            />
            <select
              name="location"
              value={form.location}
              className="w-full border px-4 py-2 rounded"
              onChange={handleChange}
            >
              Location
              <option value="">Select Location</option>
              <option value="seller">KHI-SD</option>
              <option value="buyer">ISLB</option>
            </select>
            <select
              name="type"
              value={form.type}
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded"
            >
              <option value="">Select Type</option>
              <option value="seller">Container</option>
              <option value="buyer">Pallet</option>
            </select>
            <select
              name="quantity"
              value={form.quantity}
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded"
            >
              <option value="">Select Quantity</option>
              {[1, 2, 3, 4, 5].map((qty) => (
                <option key={qty} value={qty}>
                  {qty}
                </option>
              ))}
            </select>
            <select
              name="availability"
              value={form.availability}
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded"
            >
              <option value="">Availability</option>
              <option value="Delivery">Delivery</option>
              <option value="Ready Stock">Ready Stock</option>
            </select>
            {form.availability === "Delivery" && (
              <input
                type="date"
                name="deliveryDate"
                value={form.deliveryDate}
                onChange={handleChange}
                className="w-full border px-4 py-2 rounded"
              />
            )}
          </div>

          <button
            onClick={handleSubmit}
            className="mt-6 w-full bg-green-500 text-white py-2 rounded font-semibold"
          >
            Save
          </button>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
