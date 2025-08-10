"use client"
import { Replace, Trash2 } from "lucide-react";
import { useRef } from "react";

export function PdfCard({
  item,
  onReplace,
  onRemove,
  onOpen,
}: {
  item: { id: string; name: string; url: string };
  onOpen: () => void; 
  onReplace: (file: File) => void;
  onRemove: () => void;
}) {
  const replaceInputRef = useRef<HTMLInputElement>(null);
  const openReplacePicker = () => replaceInputRef.current?.click();

  const onReplaceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) onReplace(file);
    e.currentTarget.value = "";
  };

  return (
       <div className="relative w-full rounded-2xl bg-gray-100 shadow-sm border border-gray-200 overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
        <div className="text-sm font-semibold text-gray-800 truncate" title={item.name}>
          {item.name}
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              openReplacePicker();
            }}
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs bg-gray-200 text-gray-800 hover:bg-gray-300"
            title="Replace PDF"
          >
            <Replace className="w-4 h-4" /> Replace
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onRemove();
            }}
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs bg-red-500 text-white hover:bg-red-600"
            title="Remove PDF"
          >
            <Trash2 className="w-4 h-4" /> Remove
          </button>
        </div>
      </div>

      {/* Click body to open viewer */}
      <button onClick={onOpen} className="block w-full h-[180px] bg-white text-left" title="Open PDF">
        <iframe src={item.url} className="w-full h-full pointer-events-none" />
      </button>

      <input
        ref={replaceInputRef}
        type="file"
        accept="application/pdf"
        onChange={onReplaceChange}
        className="hidden"
      />
    </div>
  );
}
