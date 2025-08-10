"use client";
import { useEffect, useState, useRef } from "react";
import BannerCard from "@/components/BannerCard";
import { createBanner, deleteBanner, getBanners } from "@/app/hooks/useBanner";

type BannerView = { _id: string; title: string; imageUrl: string };

export default function BannersPage() {
  const [panelBanners, setPanelBanners] = useState<BannerView[]>([]);
  const [batteryBanners, setBatteryBanners] = useState<BannerView[]>([]);
  const [inverterBanners, setInverterBanners] = useState<BannerView[]>([]);

  const addPanelInput = useRef<HTMLInputElement>(null);
  const addBatteryInput = useRef<HTMLInputElement>(null);
  const addInverterInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    (async () => {
      const [panels, batteries, inverters] = await Promise.all([
        getBanners("panels"),
        getBanners("batteries"),
        getBanners("inverters"),
      ]);
      setPanelBanners(panels.items.map(b => ({ _id: b._id, title: b.title, imageUrl: b.imageUrl })));
      setBatteryBanners(batteries.items.map(b => ({ _id: b._id, title: b.title, imageUrl: b.imageUrl })));
      setInverterBanners(inverters.items.map(b => ({ _id: b._id, title: b.title, imageUrl: b.imageUrl })));
    })().catch(e => console.error("Load banners failed:", e));
  }, []);

  const onAdd = async (file: File, category: "panels" | "batteries" | "inverters") => {
    try {
      const created = await createBanner({ category, image: file, title: `Banner ${category}` });
      const view = { _id: created._id, title: created.title, imageUrl: created.imageUrl };
      if (category === "panels") setPanelBanners(prev => [...prev, view]);
      else if (category === "batteries") setBatteryBanners(prev => [...prev, view]);
      else setInverterBanners(prev => [...prev, view]);
    } catch (e: any) {
      alert(e.message || "Failed to add banner");
    }
  };

  const onDelete = async (id: string, category: string) => {
    await deleteBanner(id);
    if (category === "panels") setPanelBanners(prev => prev.filter(b => b._id !== id));
    else if (category === "batteries") setBatteryBanners(prev => prev.filter(b => b._id !== id));
    else setInverterBanners(prev => prev.filter(b => b._id !== id));
  };

  return (
    <div className="w-full mx-auto py-10">
      <h2 className="text-xl font-bold text-center mb-4">Banners</h2>

      {[
        { label: "Panel Banners",   cat: "panels" as const,    data: panelBanners,   ref: addPanelInput },
        { label: "Battery Banners", cat: "batteries" as const, data: batteryBanners, ref: addBatteryInput },
        { label: "Inverter Banners",cat: "inverters" as const, data: inverterBanners,ref: addInverterInput },
      ].map((block) => (
        <section key={block.cat} className="mb-8 bg-gray-200 rounded-2xl p-4">
          <h3 className="text-center font-semibold mb-4">{block.label}</h3>

          <div className="space-y-4">
            {block.data.map((banner) => (
              <BannerCard
                key={banner._id}
                banner={{ title: banner.title, image: banner.imageUrl }}
                onEdit={() => {}}
                onDelete={() => onDelete(banner._id, block.cat)}
              />
            ))}
          </div>

          <div className="text-center mt-4">
            <label className="inline-block bg-green-500 text-white px-4 py-2 rounded cursor-pointer">
              + Add New Banner
              <input
                ref={block.ref}
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f) onAdd(f, block.cat);
                  e.currentTarget.value = "";
                }}
                className="hidden"
              />
            </label>
          </div>
        </section>
      ))}
    </div>
  );
}
