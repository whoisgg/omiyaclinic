/**
 * Catálogo estático de tratamientos.
 * La agenda y el pago se manejan fuera del sitio (ver "@/lib/links"),
 * así que el catálogo vive en código — editar aquí para cambiar servicios.
 * ⚠️ Datos placeholder: falta la lista real de servicios, duraciones y precios.
 */
import type { Category, Treatment } from "@/lib/treatments-shared";

// Re-export shared bits so existing server-side imports keep working.
export { CATEGORIES, formatCLP } from "@/lib/treatments-shared";
export type { Category, Treatment } from "@/lib/treatments-shared";

const TREATMENTS: Treatment[] = [
  {
    slug: "limpieza-facial-profunda",
    name: "Limpieza facial profunda",
    shortDescription: "Higiene profunda con extracción e hidratación.",
    longDescription:
      "Limpieza facial médica con vapor ozonizado, extracción de comedones, exfoliación enzimática y máscara hidratante según tipo de piel.",
    includes: ["Diagnóstico de piel", "Extracción", "Máscara hidratante"],
    contraindications: ["Acné inflamatorio severo", "Rosácea en brote"],
    category: "glow",
    durationMin: 60,
    price: 45000,
  },
  {
    slug: "peeling-quimico",
    name: "Peeling químico",
    shortDescription: "Renovación celular para luminosidad y textura.",
    longDescription:
      "Aplicación de ácidos de grado médico para mejorar textura, manchas y luminosidad. Intensidad ajustada a cada piel.",
    includes: ["Evaluación previa", "Peeling", "Protocolo post-tratamiento"],
    contraindications: ["Embarazo", "Piel fotosensibilizada"],
    category: "glow",
    durationMin: 45,
    price: 60000,
  },
  {
    slug: "toxina-botulinica",
    name: "Toxina botulínica",
    shortDescription: "Suaviza arrugas de expresión de forma natural.",
    longDescription:
      "Tratamiento de arrugas dinámicas en tercio superior del rostro. Resultado natural que respeta la expresión.",
    includes: ["Evaluación médica", "Aplicación", "Control a los 15 días"],
    contraindications: ["Embarazo y lactancia", "Enfermedades neuromusculares"],
    category: "smooth",
    durationMin: 30,
    price: 180000,
  },
  {
    slug: "acido-hialuronico",
    name: "Ácido hialurónico",
    shortDescription: "Hidratación profunda y reposición de volumen.",
    longDescription:
      "Relleno con ácido hialurónico para hidratar, perfilar y reponer volumen perdido, con resultado armónico.",
    includes: ["Evaluación médica", "Aplicación con cánula o aguja", "Control"],
    contraindications: ["Embarazo y lactancia", "Infección activa en la zona"],
    category: "smooth",
    durationMin: 45,
    price: 250000,
  },
  {
    slug: "bioestimuladores",
    name: "Bioestimuladores de colágeno",
    shortDescription: "Firmeza progresiva estimulando tu propio colágeno.",
    longDescription:
      "Inducción de colágeno propio para mejorar firmeza y calidad de piel de forma progresiva y duradera.",
    includes: ["Evaluación médica", "Aplicación", "Plan de sesiones"],
    contraindications: ["Embarazo y lactancia", "Enfermedades autoinmunes activas"],
    category: "lift",
    durationMin: 60,
    price: 350000,
  },
  {
    slug: "hilos-tensores",
    name: "Hilos tensores",
    shortDescription: "Efecto lifting sin cirugía.",
    longDescription:
      "Reposicionamiento de tejidos con hilos reabsorbibles PDO para un efecto tensor inmediato y estímulo de colágeno.",
    includes: ["Evaluación médica", "Procedimiento", "Control post-tratamiento"],
    contraindications: ["Infección activa", "Trastornos de coagulación"],
    category: "lift",
    durationMin: 90,
    price: 450000,
  },
  {
    slug: "blanqueamiento-dental",
    name: "Blanqueamiento dental",
    shortDescription: "Sonrisa más blanca en una sesión.",
    longDescription:
      "Blanqueamiento dental clínico con protocolo de sensibilidad controlada para un resultado visible en una sola sesión.",
    includes: ["Evaluación dental", "Sesión de blanqueamiento", "Kit de mantención"],
    contraindications: ["Caries activas", "Embarazo"],
    category: "smile",
    durationMin: 60,
    price: 150000,
  },
  {
    slug: "diseno-de-sonrisa",
    name: "Diseño de sonrisa",
    shortDescription: "Armonización integral de tu sonrisa.",
    longDescription:
      "Plan integral que combina estética dental y armonización facial para una sonrisa natural y proporcionada.",
    includes: ["Estudio digital", "Plan de tratamiento", "Seguimiento"],
    contraindications: ["Enfermedad periodontal no tratada"],
    category: "smile",
    durationMin: 60,
    price: 90000,
  },
];

export async function getTreatments(category?: Category): Promise<Treatment[]> {
  if (category) return TREATMENTS.filter((t) => t.category === category);
  return TREATMENTS;
}

export async function getTreatmentBySlug(slug: string): Promise<Treatment | null> {
  return TREATMENTS.find((t) => t.slug === slug) ?? null;
}

export async function getFeaturedTreatments(limit = 3): Promise<Treatment[]> {
  return TREATMENTS.slice(0, limit);
}
