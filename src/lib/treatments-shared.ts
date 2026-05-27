/**
 * Pure shared types + UI helpers for treatments.
 * No server-only imports — safe for client components.
 */

export type Category = "glow" | "smooth" | "lift" | "smile" | "general";

export type Treatment = {
  slug: string;
  name: string;
  shortDescription: string;
  longDescription: string;
  includes: string[];
  contraindications: string[];
  category: Category;
  durationMin: number;
  price: number;
  deposit: number;
};

export const CATEGORIES: { id: Category; label: string; tagline: string }[] = [
  { id: "glow", label: "Glow", tagline: "Luminosidad" },
  { id: "smooth", label: "Smooth", tagline: "Arrugas" },
  { id: "lift", label: "Lift", tagline: "Firmeza" },
  { id: "smile", label: "Smile", tagline: "Dental" },
];

export function formatCLP(n: number) {
  return "$" + n.toLocaleString("es-CL");
}
