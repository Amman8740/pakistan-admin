"use client";

import AccordionSection from "@/components/AccordianSection";

export default function MarketPage() {
  return (
    <div className="w-full mx-auto py-6 px-4">
      <h1 className="text-2xl text-black font-bold text-center mb-6">Market</h1>
      <AccordionSection title="Importers" />
      <AccordionSection title="EPC" />
      <AccordionSection title="China Rates" />
    </div>
  );
}
