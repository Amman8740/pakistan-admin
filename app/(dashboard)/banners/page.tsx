"use client";
import BannerCard from "@/components/BannerCard";
import { useState } from "react";
type Banner = {
    title: string;
    image: string;
  };
export default function BannersPage() {
    const [panelBanners, setPanelBanners] = useState<Banner[]>([]);
    const [inverterBanners, setInverterBanners] = useState<Banner[]>([]);
    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, type: "panel" | "inverter")=>{
        const file = e.target.files ? e.target.files[0] : null;
        if (!file) return;
        const newBanner:Banner ={
            title: `Banner ${type === "panel" ? panelBanners.length + 1 : inverterBanners.length + 1}`,
            image: URL.createObjectURL(file),
        };
        if (type === "panel")
            setPanelBanners([...panelBanners, newBanner]);
        else setInverterBanners([...inverterBanners, newBanner]);
    }
  return (
    <div className="w-full mx-auto py-10">
      <h2 className="text-xl font-bold text-center mb-4">Banners</h2>

      {/* Panel Banners */}
      <section className="mb-8 bg-gray-200 rounded-2xl p-4">
        <h3 className="text-center font-semibold mb-4">Panel Banners</h3>
        <div className="space-y-4">
          {panelBanners.map((banner, idx) => (
            <BannerCard
              key={idx}
              banner={banner}
              onEdit={() => {}}
              onDelete={() =>
                setPanelBanners(panelBanners.filter((_, i) => i !== idx))
              }
            />
          ))}
        </div>
        <div className="text-center mt-4">
          <label className="inline-block bg-green-500 text-white px-4 py-2 rounded cursor-pointer">
            + Add New Banner
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleFileUpload(e, "panel")}
              className="hidden"
            />
          </label>
        </div>
      </section>

      {/* Inverter Banners */}
      <section className="mb-8 bg-gray-200 rounded-2xl p-4">
        <h3 className="text-center font-semibold mb-4">Inverter Banners</h3>
        <div className="space-y-4">
          {inverterBanners.map((banner, idx) => (
            <BannerCard
              key={idx}
              banner={banner}
              onEdit={() => {}}
              onDelete={() =>
                setInverterBanners(inverterBanners.filter((_, i) => i !== idx))
              }
            />
          ))}
        </div>
        <div className="text-center mt-4">
          <label className="inline-block bg-green-500 text-white px-4 py-2 rounded cursor-pointer">
            + Add New Banner
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleFileUpload(e, "inverter")}
              className="hidden"
            />
          </label>
        </div>
      </section>
    </div>
  );
}
