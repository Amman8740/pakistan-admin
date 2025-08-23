// app/hooks/useMarket.ts
import { getToken } from "@/lib/api";

const BASE_URL = "https://pmssolar-production.up.railway.app"; // set to prod when deploying

// UI-facing shape (clean, camelCase, lowercase)
export type MarketRole = "importer" | "EPC" | "chinese";

export interface MarketerEntryUI {
  companyName: string;
  directorName?: string;
  phone: string;
  number_index?: number;
  description?: string;
  rate?: number;
  mq?: number;
  landedCost?: number;
  timeframe?: string;      // String to match DB (timeFrame)
  profitMargin?: number;   // maps to profieMargin in DB
}

export interface MarketDocUI {
  _id: string;
  adminId: string;
  role: MarketRole;
  marketer_Data: MarketerEntryUI[];
  createdAt: string;
  updatedAt: string;
}

type GetAllMarketsResRaw = {
  status: number;
  message: string;
  data: any[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

// ─── helpers ─────────────────────────────────────────────────────────────────
function authHeaders() {
  const token = getToken();
  if (!token) throw new Error("No token provided");
  return {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
}

async function parseJsonSafe(res: Response) {
  const text = await res.text();
  if (!text) return {}; // tolerate 204 / empty
  try {
    return JSON.parse(text);
  } catch {
    throw new Error(`Non-JSON ${res.status} ${res.statusText} :: ${text.slice(0, 200)}`);
  }
}

// Small util: remove keys with undefined (avoid writing undefineds)
function compact<T extends Record<string, any>>(obj: T): Partial<T> {
  const out: Record<string, any> = {};
  for (const k in obj) if (obj[k] !== undefined) out[k] = obj[k];
  return out as Partial<T>;
}

// DB → UI mapping (matches your current model)
function mapSubdocDBtoUI(m: any): MarketerEntryUI {
  return {
    companyName: m.companyName,
    directorName: m.directorName,
    phone: m.Phone,                 // DB: Phone
    number_index: m.number_index,
    description: m.description,
    rate: m.rate,
    mq: m.mq,
    landedCost: m.landedCost,
    timeframe: m.timeFrame,         // DB: timeFrame (String)
    profitMargin: m.profieMargin,   // DB: profieMargin
  };
}

// UI → DB mapping (keep only provided fields)
function mapSubdocUItoDB(m: MarketerEntryUI) {
  return compact({
    companyName: m.companyName,
    directorName: m.directorName,
    Phone: m.phone,
    number_index: m.number_index,
    description: m.description,
    rate: m.rate,
    mq: m.mq,
    landedCost: m.landedCost,
    timeFrame: m.timeframe,       // String
    profieMargin: m.profitMargin,
  });
}

function mapDocDBtoUI(d: any): MarketDocUI {
  return {
    _id: d._id,
    adminId: d.adminId,
    role: d.role,
    marketer_Data: (d.marketer_Data ?? []).map(mapSubdocDBtoUI),
    createdAt: d.createdAt,
    updatedAt: d.updatedAt,
  };
}

// ─── API ─────────────────────────────────────────────────────────────────────

// Get FIRST bucket for a role
export async function getMarketByRole(
  role: MarketRole,
  { page = 1, limit = 1000 }: { page?: number; limit?: number } = {}
): Promise<MarketDocUI | null> {
  const url = new URL(`${BASE_URL}/api/app/getAllMarkets`);
  url.searchParams.append("page", String(page));
  url.searchParams.append("limit", String(limit));
  url.searchParams.append("role", role);

  const res = await fetch(url.toString(), {
    headers: { Authorization: `Bearer ${getToken()}` },
    cache: "no-store",
  });
  const json = (await parseJsonSafe(res)) as GetAllMarketsResRaw;
  if (!res.ok) throw new Error((json as any).message || "Failed to fetch markets");

  const first = json.data?.[0];
  return first ? mapDocDBtoUI(first) : null;
}

// Create empty bucket for a role (if needed)
export async function createMarket(role: MarketRole): Promise<MarketDocUI> {
  const res = await fetch(`${BASE_URL}/api/app/createMarket`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify({ role, marketer_Data: [] }),
  });
  const json = await parseJsonSafe(res);
  if (!res.ok) throw new Error(json.message || "Failed to create market");
  return mapDocDBtoUI(json.data);
}

// Convenience: get existing bucket id or create then return id
export async function getOrCreateMarketId(role: MarketRole): Promise<string> {
  const existing = await getMarketByRole(role);
  if (existing?._id) return existing._id;
  const created = await createMarket(role);
  return created._id;
}

// Append ONE marketer to bucket via PUT /updateMarketData/:id (server pushes when marketer_Data present)
export async function addMarketEntryByMarketId(
  marketId: string,
  entry: MarketerEntryUI
): Promise<MarketDocUI> {
  const payload = { marketer_Data: mapSubdocUItoDB(entry) };
  const res = await fetch(`${BASE_URL}/api/app/updateMarketData/${marketId}`, {
    method: "PUT",
    headers: authHeaders(),
    body: JSON.stringify(payload),
  });
  const json = await parseJsonSafe(res);
  if (!res.ok) throw new Error(json.message || "Failed to add market entry");
  return mapDocDBtoUI(json.data);
}

// Edit one marketer by array index via PUT /updateMarketData/:id/:index
export async function updateMarketEntryByIndexForMarketId(
  marketId: string,
  index: number,
  partial: Partial<MarketerEntryUI>
): Promise<MarketDocUI> {
  const res = await fetch(`${BASE_URL}/api/app/updateMarketData/${marketId}/${index}`, {
    method: "PUT",
    headers: authHeaders(),
    body: JSON.stringify(mapSubdocUItoDB(partial as MarketerEntryUI)),
  });
  const json = await parseJsonSafe(res);
  if (!res.ok) throw new Error(json.message || "Failed to update market entry");
  return mapDocDBtoUI(json.market);
}
export async function deleteMarketById(marketId: string): Promise<void> {
  const res = await fetch(`${BASE_URL}/api/app/deleteMarket/${marketId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${getToken()}`, // no content-type needed
    },
  });
  const text = await res.text();
  let json: any = {};
  try {
    json = text ? JSON.parse(text) : {};
  } catch {
    // non-JSON error body
  }
  if (!res.ok) {
    throw new Error(json.message || `Failed to delete market (${res.status})`);
  }
}

// Convenience: delete by role (fetch first, then delete)
export async function deleteMarketByRole(role: MarketRole): Promise<void> {
  const bucket = await getMarketByRole(role);
  if (!bucket?._id) {
    // nothing to delete; treat as success
    return;
  }
  await deleteMarketById(bucket._id);
}

export async function deleteMarketEntryByIndexForMarketId(
  marketId: string,
  index: number
): Promise<MarketDocUI> {
  const res = await fetch(`${BASE_URL}/api/app/updateMarketData/${marketId}/${index}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${getToken()}` },
  });
  const json = await parseJsonSafe(res);
  if (!res.ok) throw new Error(json.message || "Failed to delete market entry");
  return mapDocDBtoUI(json.market);
}
