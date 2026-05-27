/**
 * Server-only data access for treatments.
 * Client components should import types/helpers from "@/lib/treatments-shared".
 */
import { createClient } from "@/lib/supabase/server";
import type { Category, Treatment } from "@/lib/treatments-shared";

// Re-export shared bits so existing server-side imports keep working.
export { CATEGORIES, formatCLP } from "@/lib/treatments-shared";
export type { Category, Treatment } from "@/lib/treatments-shared";

type ServiciosRow = {
  slug: string;
  name: string;
  short_description: string;
  long_description: string;
  includes: string[];
  contraindications: string[];
  category: Category;
  duration_min: number;
  price_clp: number;
  deposit_clp: number;
};

function rowToTreatment(r: ServiciosRow): Treatment {
  return {
    slug: r.slug,
    name: r.name,
    shortDescription: r.short_description,
    longDescription: r.long_description,
    includes: r.includes ?? [],
    contraindications: r.contraindications ?? [],
    category: r.category,
    durationMin: r.duration_min,
    price: r.price_clp,
    deposit: r.deposit_clp,
  };
}

const SELECT_COLUMNS =
  "slug, name, short_description, long_description, includes, contraindications, category, duration_min, price_clp, deposit_clp";

export async function getTreatments(category?: Category): Promise<Treatment[]> {
  const supabase = await createClient();
  let q = supabase
    .from("servicios")
    .select(SELECT_COLUMNS)
    .eq("active", true)
    .order("sort_order", { ascending: true });
  if (category) q = q.eq("category", category);
  const { data, error } = await q;
  if (error) {
    console.error("[getTreatments]", error);
    return [];
  }
  return (data as ServiciosRow[] | null)?.map(rowToTreatment) ?? [];
}

export async function getTreatmentBySlug(slug: string): Promise<Treatment | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("servicios")
    .select(SELECT_COLUMNS)
    .eq("slug", slug)
    .eq("active", true)
    .maybeSingle();
  if (error) {
    console.error("[getTreatmentBySlug]", error);
    return null;
  }
  if (!data) return null;
  return rowToTreatment(data as ServiciosRow);
}

export async function getFeaturedTreatments(limit = 3): Promise<Treatment[]> {
  const all = await getTreatments();
  return all.slice(0, limit);
}
