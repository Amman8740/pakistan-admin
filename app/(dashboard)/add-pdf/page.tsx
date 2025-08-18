"use client";

import { useEffect, useRef, useState } from "react";
import { Plus, X } from "lucide-react";
import { PdfCard } from "@/components/PdfCard";
import { getPdfs, uploadPdf, replacePdf, deletePdf } from "@/app/hooks/usePdf";

type PdfItem = { id: string; name: string; url: string };
const BACKEND_BASE =
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8001";

// make absolute and collapse extra slashes but keep protocol slashes
const abs = (u: string) => {
  if (!u) return u;
  if (/^https?:\/\//i.test(u)) return u;
  const joined = `${BACKEND_BASE}${u.startsWith("/") ? "" : "/"}${u}`;
  return joined
    .replace("://", "__PROTO__")
    .replace(/\/{2,}/g, "/")
    .replace("__PROTO__", "://");
};
export default function AddPdfPage() {
  const [items, setItems] = useState<PdfItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewer, setViewer] = useState<{ open: boolean; item?: PdfItem }>({ open: false });
  const addInputRef = useRef<HTMLInputElement>(null);

  // Fetch from API on mount
  useEffect(() => {
    (async () => {
      try {
        const { items } = await getPdfs({ page: 1, limit: 24 });
        setItems(items.map(i => ({ id: i._id, name: i.name, url: abs(i.url) })));
      } catch (err) {
        console.error("Failed to load PDFs:", err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const openAddPicker = () => addInputRef.current?.click();

  // Upload selected files to backend
  const handleAddFiles = async (files: FileList) => {
    const toUpload = Array.from(files).filter(f => f.type === "application/pdf");
    if (toUpload.length === 0) return;

    try {
      // upload in parallel
      const created = await Promise.all(toUpload.map(file => uploadPdf(file)));
      setItems(prev => [
        ...prev,
        ...created.map((d: any) => ({ id: d._id, name: d.name, url: abs(d.url) })),
      ]);
    } catch (err: any) {
      console.error("Upload failed:", err);
      alert(err.message || "Failed to upload PDF");
    }
  };

  const onAddChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) handleAddFiles(e.target.files);
    e.currentTarget.value = ""; // allow reselecting the same file
  };

  const doReplace = async (id: string, file: File) => {
    if (file.type !== "application/pdf") return;
    try {
      const updated = await replacePdf(id, file);
      setItems(prev => prev.map(it => (it.id === id ? { id, name: updated.name, url: abs(updated.url) } : it)));
    } catch (err: any) {
      console.error("Replace failed:", err);
      alert(err.message || "Failed to replace PDF");
    }
  };

  const doRemove = async (id: string) => {
    try {
      await deletePdf(id);
      setItems(prev => prev.filter(x => x.id !== id));
      if (viewer.item?.id === id) setViewer({ open: false });
    } catch (err: any) {
      console.error("Delete failed:", err);
      alert(err.message || "Failed to delete PDF");
    }
  };

  const openViewer = (item: PdfItem) => setViewer({ open: true, item });
  const closeViewer = () => setViewer({ open: false });

  // Close viewer on ESC
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && closeViewer();
    if (viewer.open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [viewer.open]);

  return (
    <main className="px-4 md:px-8 py-6">
      <h1 className="text-center text-green-600 font-semibold mb-6">Admin</h1>

      <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {loading && (
          <div className="col-span-full text-center text-gray-500 py-10">Loading PDFs…</div>
        )}

        {!loading && items.length === 0 && (
          <div className="col-span-full rounded-2xl bg-gray-100 border border-dashed border-gray-300 p-10 text-center text-gray-500">
            No PDFs yet. Use the green plus button to add one.
          </div>
        )}

        {items.map(item => (
          <PdfCard
            key={item.id}
            item={item}
            onOpen={() => openViewer(item)}
            onReplace={(file) => doReplace(item.id, file)}
            onRemove={() => doRemove(item.id)}
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

      {/* Hidden input for adding */}
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
              <iframe src={abs(viewer.item.url)} title={viewer.item.name} className="w-full h-full" />
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
