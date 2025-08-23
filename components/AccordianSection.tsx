// components/AccordionSection.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import { ChevronDown, ChevronUp, Trash2 } from "lucide-react";
import AddCompanyForm from "./AddCompanyForm";
import AddChinaRatesForm from "./AddChinaRatesForm";
import { titleToRole } from "@/utils/marketRoles";
import {
  getMarketByRole,
  createMarket,
  getOrCreateMarketId,
  addMarketEntryByMarketId,
  updateMarketEntryByIndexForMarketId,
  deleteMarketEntryByIndexForMarketId,
  deleteMarketById,
  type MarketerEntryUI,
  type MarketRole,
} from "@/app/hooks/useMarket";

/* ----------------------- QuickEdit inline form ----------------------- */
function QuickEditInline({
  role,
  draft,
  onChange,
  onCancel,
  onSave,
  saving,
}: {
  role: MarketRole;
  draft: MarketerEntryUI;
  onChange: (next: Partial<MarketerEntryUI>) => void;
  onCancel: () => void;
  onSave: () => void;
  saving?: boolean;
}) {
  // tiny helpers
  const set = <K extends keyof MarketerEntryUI>(k: K) => (v: any) =>
    onChange({ [k]: v } as Partial<MarketerEntryUI>);
  const num = (s: string) => (s.trim() === "" ? undefined : Number(s));
  const str = (s: string) => s;

  return (
    <div className="mt-3 rounded-lg border border-gray-200 bg-gray-50 p-3">
      {/* common */}
      <div className="grid gap-3 md:grid-cols-2">
        <input
          className="w-full rounded-md border px-3 py-2 text-black"
          placeholder="Company Name"
          value={draft.companyName ?? ""}
          onChange={(e) => set("companyName")(str(e.target.value))}
        />
        <input
          className="w-full rounded-md border px-3 py-2 text-black"
          placeholder="Phone"
          value={draft.phone ?? ""}
          onChange={(e) => set("phone")(str(e.target.value))}
        />

        {role !== "chinese" ? (
          <>
            <input
              className="w-full rounded-md border px-3 py-2 text-black"
              placeholder="Director Name"
              value={draft.directorName ?? ""}
              onChange={(e) => set("directorName")(str(e.target.value))}
            />
            <input
              className="w-full rounded-md border px-3 py-2 text-black"
              placeholder="Index (optional)"
              value={draft.number_index ?? ""}
              onChange={(e) =>
                set("number_index")(
                  e.target.value.trim() === "" ? undefined : Number(e.target.value)
                )
              }
            />
            <div className="md:col-span-2">
              <textarea
                className="w-full rounded-md border px-3 py-2 text-black"
                placeholder="Description"
                value={draft.description ?? ""}
                onChange={(e) => set("description")(str(e.target.value))}
              />
            </div>
          </>
        ) : (
          <>
            <input
              className="w-full rounded-md border px-3 py-2 text-black"
              placeholder="Rate"
              value={draft.rate ?? ""}
              onChange={(e) => set("rate")(num(e.target.value))}
            />
            <input
              className="w-full rounded-md border px-3 py-2 text-black"
              placeholder="MQ"
              value={draft.mq ?? ""}
              onChange={(e) => set("mq")(num(e.target.value))}
            />
            <input
              className="w-full rounded-md border px-3 py-2 text-black"
              placeholder="Landed Cost"
              value={draft.landedCost ?? ""}
              onChange={(e) => set("landedCost")(num(e.target.value))}
            />
            <input
              className="w-full rounded-md border px-3 py-2 text-black"
              placeholder="Timeframe (e.g., 40 days)"
              value={draft.timeframe ?? ""}
              onChange={(e) => set("timeframe")(str(e.target.value))}
            />
            <input
              className="w-full rounded-md border px-3 py-2 text-black"
              placeholder="Profit Margin"
              value={draft.profitMargin ?? ""}
              onChange={(e) => set("profitMargin")(num(e.target.value))}
            />
          </>
        )}
      </div>

      <div className="mt-3 flex items-center justify-end gap-2">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-md px-3 py-1.5 text-xs font-medium text-gray-600 hover:underline"
          disabled={!!saving}
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={onSave}
          disabled={!!saving}
          className="rounded-md bg-emerald-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-emerald-700 disabled:opacity-50"
        >
          {saving ? "Saving…" : "Save"}
        </button>
      </div>
    </div>
  );
}
/* -------------------------------------------------------------------- */

type Props = { title: string };

export default function AccordionSection({ title }: Props) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [marketId, setMarketId] = useState<string | null>(null);
  const [items, setItems] = useState<MarketerEntryUI[]>([]);
  const [error, setError] = useState<string | null>(null);

  // quick edit state
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [draft, setDraft] = useState<MarketerEntryUI | null>(null);
  const [saving, setSaving] = useState(false);

  const role = useMemo<MarketRole>(() => titleToRole(title), [title]);

  useEffect(() => {
    if (!open) return;
    let mounted = true;
    (async () => {
      try {
        setLoading(true);
        setError(null);

        const bucket = await getMarketByRole(role);
        if (bucket && mounted) {
          setMarketId(bucket._id);
          setItems(bucket.marketer_Data ?? []);
          return;
        }
        // auto-create if missing
        const created = await createMarket(role);
        if (mounted) {
          setMarketId(created._id);
          setItems(created.marketer_Data ?? []);
        }
      } catch (e: any) {
        if (mounted) setError(e.message || "Failed to load");
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, [open, role]);

  async function ensureId(): Promise<string> {
    return marketId ?? (await getOrCreateMarketId(role));
  }

  async function handleAddCompany(d: {
    company: string;
    director: string;
    phone: string;
    description: string;
  }) {
    try {
      setError(null);
      const id = await ensureId();
      const entry: MarketerEntryUI = {
        companyName: d.company,
        directorName: d.director,
        phone: d.phone,
        description: d.description,
      };
      const updated = await addMarketEntryByMarketId(id, entry);
      setMarketId(updated._id);
      setItems(updated.marketer_Data);
    } catch (e: any) {
      setError(e.message || "Add failed");
    }
  }

  async function handleAddChina(payload: MarketerEntryUI) {
    try {
      setError(null);
      const id = await ensureId();
      const updated = await addMarketEntryByMarketId(id, {
        ...payload,
        timeframe: (payload.timeframe ?? "").toString().trim(),
      });
      setMarketId(updated._id);
      setItems(updated.marketer_Data);
    } catch (e: any) {
      setError(e.message || "Add failed");
    }
  }

  function startEdit(idx: number) {
    setEditingIndex(idx);
    setDraft({ ...items[idx] }); // prefill
  }

  function cancelEdit() {
    setEditingIndex(null);
    setDraft(null);
  }

  async function saveEdit() {
    if (editingIndex == null || !draft) return;
    try {
      setSaving(true);
      setError(null);
      const id = await ensureId();
      // Ensure timeframe is string for chinese
      if (draft.timeframe !== undefined && draft.timeframe !== null) {
        draft.timeframe = String(draft.timeframe);
      }
      const updated = await updateMarketEntryByIndexForMarketId(id, editingIndex, draft);
      setItems(updated.marketer_Data);
      setEditingIndex(null);
      setDraft(null);
    } catch (e: any) {
      setError(e.message || "Update failed");
    } finally {
      setSaving(false);
    }
  }

  async function handleDeleteItem(idx: number) {
    try {
      setError(null);
      if (marketId == null) throw new Error("No market bucket found for this role");
      const ok = confirm("Delete this entry? This cannot be undone.");
      if (!ok) return;
      const updated = await deleteMarketEntryByIndexForMarketId(marketId, idx);
      setItems(updated.marketer_Data);
    } catch (e: any) {
      setError(e.message || "Delete failed");
    }
  }

  async function handleDeleteBucket() {
    if (!marketId) {
      setError("No bucket to delete for this role.");
      return;
    }
    const ok = confirm(`Delete the entire "${title}" market? This cannot be undone.`);
    if (!ok) return;

    try {
      setError(null);
      await deleteMarketById(marketId);
      setMarketId(null);
      setItems([]);
    } catch (e: any) {
      setError(e.message || "Delete failed");
    }
  }

  return (
    <div className="mb-4 rounded-lg border border-gray-200 bg-white shadow-sm">
      {/* header bar */}
      <div className="flex items-center justify-between px-4 py-3">
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center gap-2 text-black font-semibold"
        >
          <span>{title}</span>
          {open ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </button>

        <button
          onClick={handleDeleteBucket}
          disabled={!marketId}
          className="inline-flex items-center gap-2 rounded-md bg-red-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-red-700 disabled:opacity-50"
          title="Delete this entire market bucket"
        >
          <Trash2 size={14} />
          Delete Bucket
        </button>
      </div>

      {open && (
        <div className="px-4 pb-4">
          {(loading || error) && (
            <div className="mb-3">
              {loading && <div className="text-sm text-gray-500">Loading…</div>}
              {error && <div className="text-sm text-red-600">{error}</div>}
            </div>
          )}

          {/* list */}
          <div className="space-y-4">
            {items.map((item, idx) => (
              <div key={idx} className="rounded-lg border border-gray-200 p-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <div className="font-semibold text-black">{item.companyName}</div>
                    <div className="text-green-700">Number: {item.phone}</div>

                    {role === "chinese" ? (
                      <>
                        <div>Rate: {item.rate ?? "-"}</div>
                        <div>MQ: {item.mq ?? "-"}</div>
                        <div>Landed Cost: {item.landedCost ?? "-"}</div>
                        <div>Timeframe: {item.timeframe ?? "-"}</div>
                        <div className="text-rose-600">
                          Profit Margin: {item.profitMargin ?? "-"}
                        </div>
                      </>
                    ) : (
                      <>
                        {item.directorName && <div>Director: {item.directorName}</div>}
                        {item.description && (
                          <div className="text-gray-700">Description: {item.description}</div>
                        )}
                      </>
                    )}
                  </div>

                  {/* row actions */}
                  <div className="flex shrink-0 items-center gap-2">
                    {editingIndex === idx ? null : (
                      <>
                        <button
                          className="rounded-md bg-emerald-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-emerald-700"
                          onClick={() => startEdit(idx)}
                        >
                          Quick Edit
                        </button>
                        <button
                          className="inline-flex items-center gap-1 rounded-md bg-red-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-red-700"
                          onClick={() => handleDeleteItem(idx)}
                          title="Delete this entry"
                        >
                          <Trash2 size={14} />
                          Delete
                        </button>
                      </>
                    )}
                  </div>
                </div>

                {/* inline edit form */}
                {editingIndex === idx && draft && (
                  <QuickEditInline
                    role={role}
                    draft={draft}
                    onChange={(p) => setDraft({ ...draft, ...p })}
                    onCancel={cancelEdit}
                    onSave={saveEdit}
                    saving={saving}
                  />
                )}
              </div>
            ))}
          </div>

          {/* forms */}
          <div className="mt-4">
            {role === "chinese" ? (
              <AddChinaRatesForm onSubmit={handleAddChina} onCancel={() => undefined} />
            ) : (
              <AddCompanyForm onSubmit={handleAddCompany} onCancel={() => undefined} />
            )}
          </div>
        </div>
      )}
    </div>
  );
}
