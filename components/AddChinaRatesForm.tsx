// components/AddChinaRatesForm.tsx
"use client";

import { MarketerEntryUI } from "@/app/hooks/useMarket";
import { useState } from "react";

type Props = {
  onSubmit: (data: MarketerEntryUI) => void;
  onCancel: () => void;
};

export default function AddChinaRatesForm({ onSubmit, onCancel }: Props) {
  const [companyName, setCompanyName] = useState("");
  const [phone, setPhone] = useState("");
  const [rate, setRate] = useState("");
  const [mq, setMq] = useState("");
  const [landedCost, setLandedCost] = useState("");
  const [timeframe, setTimeframe] = useState(""); // free text like "2 weeks"
  const [profitMargin, setProfitMargin] = useState("");

  function toNum(v: string) {
    if (v.trim() === "") return undefined;
    const n = Number(v);
    return Number.isFinite(n) ? n : undefined;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // build payload in UI shape; hooks will map to DB keys
    const payload: MarketerEntryUI = {
      companyName: companyName.trim(),
      phone: phone.trim(),
      rate: toNum(rate),
      mq: toNum(mq),
      landedCost: toNum(landedCost),
      timeframe: timeframe.trim(), // string per DB
      profitMargin: toNum(profitMargin),
      description: undefined, // not used for chinese block
    };

    // required checks
    if (
      !payload.companyName ||
      !payload.phone ||
      payload.rate == null ||
      payload.landedCost == null ||
      !payload.timeframe
    ) {
      alert("Please fill Company, Phone, Rate, Landed Cost and Timeframe.");
      return;
    }

    onSubmit(payload);

    // reset
    setCompanyName("");
    setPhone("");
    setRate("");
    setMq("");
    setLandedCost("");
    setTimeframe("");
    setProfitMargin("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <input
        value={companyName}
        onChange={(e) => setCompanyName(e.target.value)}
        placeholder="Company"
        className="w-full border rounded-2xl px-3 py-2 text-black"
        required
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <input
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Phone Number"
          className="w-full border rounded-2xl px-3 py-2 text-black"
          required
        />

        <input
          value={rate}
          onChange={(e) => setRate(e.target.value)}
          placeholder="Rate (e.g., 0.085 or 5.5)"
          inputMode="decimal"
          className="w-full border rounded-2xl px-3 py-2 text-black"
          required
        />

        <input
          value={mq}
          onChange={(e) => setMq(e.target.value)}
          placeholder="MQ (optional)"
          inputMode="numeric"
          className="w-full border rounded-2xl px-3 py-2 text-black"
        />

        <input
          value={landedCost}
          onChange={(e) => setLandedCost(e.target.value)}
          placeholder="Landed Cost"
          inputMode="decimal"
          className="w-full border rounded-2xl px-3 py-2 text-black"
          required
        />

        {/* timeframe is free text, not numeric */}
        <input
          value={timeframe}
          onChange={(e) => setTimeframe(e.target.value)}
          placeholder="Timeframe (e.g., '2 weeks', '1 month')"
          className="w-full border rounded-2xl px-3 py-2 text-black"
          required
        />

        <input
          value={profitMargin}
          onChange={(e) => setProfitMargin(e.target.value)}
          placeholder="Profit Margin (e.g., 2 or -5)"
          inputMode="decimal"
          className="w-full border rounded-2xl px-3 py-2 text-black"
        />
      </div>

      <div className="flex justify-end gap-2">
        <button type="button" onClick={onCancel} className="text-gray-500 hover:underline">
          Cancel
        </button>
        <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
          Save
        </button>
      </div>
    </form>
  );
}
