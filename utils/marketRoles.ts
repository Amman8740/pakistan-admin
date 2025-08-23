export type MarketRole = "importer" | "EPC" | "chinese";

export function titleToRole(title: string): MarketRole {
  const t = title.trim().toLowerCase();
  switch (t) {
    case "importers":
      return "importer";
    case "epc": // <- lowercase match, return exact backend role
      return "EPC";
    case "china rates":
      return "chinese";
    default:
      throw new Error(`Unknown market section: "${title}"`);
  }
}

// (optional) the other way around, if you ever need it:
export function roleToTitle(role: MarketRole): string {
  switch (role) {
    case "importer":
      return "Importers";
    case "EPC":
      return "EPC";
    case "chinese":
      return "China Rates";
  }
}