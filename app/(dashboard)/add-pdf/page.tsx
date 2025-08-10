"use client";

import { useEffect, useRef, useState } from "react";
import { Plus, X } from "lucide-react";
import { PdfCard } from "@/components/PdfCard";

type PdfItem = { id: string; name: string; url: string };

export default function AddPdfPage() {
  const [items, setItems] = useState<PdfItem[]>([]);
  const [viewer, setViewer] = useState<{ open: boolean; item?: PdfItem }>({
    open: false,
  });
  const addInputRef = useRef<HTMLInputElement>(null);

  // cleanup object URLs on unmount
  useEffect(() => {
    return () => items.forEach((i) => URL.revokeObjectURL(i.url));
  }, [items]);

  const openAddPicker = () => addInputRef.current?.click();

  const handleAddFiles = (files: FileList) => {
    const next: PdfItem[] = [];
    Array.from(files).forEach((file) => {
      if (file.type !== "application/pdf") return;
      next.push({
        id:
          typeof crypto !== "undefined" && "randomUUID" in crypto
            ? crypto.randomUUID()
            : Math.random().toString(36).slice(2),
        name: file.name,
        url: URL.createObjectURL(file),
      });
    });
    if (next.length) setItems((prev) => [...prev, ...next]);
  };

  const onAddChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) handleAddFiles(e.target.files);
    e.currentTarget.value = "";
  };

  const replaceFile = (id: string, file: File) => {
    if (file.type !== "application/pdf") return;
    setItems((prev) =>
      prev.map((it) => {
        if (it.id !== id) return it;
        URL.revokeObjectURL(it.url);
        return { ...it, name: file.name, url: URL.createObjectURL(file) };
      })
    );
  };

  const removeItem = (id: string) => {
    setItems((prev) => {
      const target = prev.find((x) => x.id === id);
      if (target) URL.revokeObjectURL(target.url);
      return prev.filter((x) => x.id !== id);
    });
    if (viewer.item?.id === id) setViewer({ open: false });
  };

  const openViewer = (item: PdfItem) => setViewer({ open: true, item });
  const closeViewer = () => setViewer({ open: false });

  // close on ESC
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeViewer();
    };
    if (viewer.open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [viewer.open]);

  return (
    <main className="px-4 md:px-8 py-6">
      <h1 className="text-center text-green-600 font-semibold mb-6">Admin</h1>

      {/* Grid of compact PDF cards */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.length === 0 && (
          <div className="col-span-full rounded-2xl bg-gray-100 border border-dashed border-gray-300 p-10 text-center text-gray-500">
            No PDFs yet. Use the green plus button to add one.
          </div>
        )}

        {items.map((item) => (
          <PdfCard
            key={item.id}
            item={item}
            onOpen={() => openViewer(item)}
            onReplace={(file) => replaceFile(item.id, file)}
            onRemove={() => removeItem(item.id)}
          />
        ))}
      </div>

      {/* Floating Add button */}
      <button
        onClick={openAddPicker}
        className="fixed left-1/2 -translate-x-1/2 bottom-6 z-40 flex items-center justify-center w-14 h-14 rounded-full bg-green-600 text-white shadow-xl hover:bg-green-700"
        aria-label="Add PDF"
        title="Add PDF"
      >
        <Plus className="w-7 h-7" />
      </button>

      {/* hidden input for adding */}
      <input
        ref={addInputRef}
        type="file"
        accept="application/pdf"
        multiple
        onChange={onAddChange}
        className="hidden"
      />

      {/* Fullscreen Viewer Modal */}
      {viewer.open && viewer.item && (
        <div
          className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4"
          onClick={closeViewer}
        >
          <div
            className="relative bg-white w-full max-w-6xl rounded-2xl shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-4 py-3 border-b">
              <div className="text-sm font-semibold truncate pr-6">
                {viewer.item.name}
              </div>
              <button
                onClick={closeViewer}
                className="p-2 rounded-full hover:bg-gray-100"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="h-[80vh]">
              <iframe
                src={viewer.item.url}
                title={viewer.item.name}
                className="w-full h-full"
              />
            </div>
          </div>
        </div>
      )}
    </main>
  );
}