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
};

export const CATEGORIES: {
  id: Category;
  label: string;
  tagline: string;
  subtitle: string;
  description: string;
}[] = [
  {
    id: "glow",
    label: "Glow",
    tagline: "Luminosidad",
    subtitle: "Calidad y luminosidad de la piel",
    description:
      "Tratamientos enfocados en mejorar la calidad de la piel mediante hidratación profunda, regeneración celular y estímulo de colágeno, logrando una piel luminosa, saludable y naturalmente revitalizada.",
  },
  {
    id: "smooth",
    label: "Smooth",
    tagline: "Arrugas",
    subtitle: "Arrugas y líneas de expresión",
    description:
      "Tratamientos diseñados para suavizar líneas de expresión y relajar la musculatura facial, preservando la naturalidad del rostro y manteniendo una expresión fresca y armónica.",
  },
  {
    id: "lift",
    label: "Lift",
    tagline: "Firmeza",
    subtitle: "Firmeza y soporte facial",
    description:
      "Tratamientos que estimulan la producción de colágeno, restauran soporte estructural y mejoran la firmeza del rostro, logrando un efecto lifting progresivo y natural.",
  },
  {
    id: "smile",
    label: "Smile",
    tagline: "Dental",
    subtitle: "Salud y estética dental",
    description:
      "Tratamientos orientados a la salud oral, estética dental y endodoncia, combinando funcionalidad, armonía y bienestar para una sonrisa saludable y equilibrada.",
  },
];

export function formatCLP(n: number) {
  return "$" + n.toLocaleString("es-CL");
}
