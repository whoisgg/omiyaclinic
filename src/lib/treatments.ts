/**
 * Catálogo estático de tratamientos.
 * Basado en los procedimientos de facelab.cl, reagrupados en la clasificación
 * de Omiya (Glow / Smooth / Lift / Smile). Sin precios: la reserva en Dentalink
 * es por categoría o por hora de diagnóstico, y el detalle se ve en consulta.
 * Editar aquí para cambiar servicios.
 */
import type { Category, Treatment } from "@/lib/treatments-shared";

// Re-export shared bits so existing server-side imports keep working.
export { CATEGORIES, formatCLP } from "@/lib/treatments-shared";
export type { Category, Treatment } from "@/lib/treatments-shared";

const TREATMENTS: Treatment[] = [
  // ── GLOW · Calidad y luminosidad de la piel ──────────────────────────────
  {
    slug: "limpieza-facial-profunda",
    name: "Limpieza facial profunda",
    shortDescription:
      "Elimina impurezas, exfolia y revitaliza la piel para una apariencia saludable y radiante.",
    longDescription:
      "Procedimiento no invasivo que elimina impurezas, exfolia y revitaliza la piel. Mejora la textura y el tono, previene brotes de acné y es el complemento ideal antes y después de otros procedimientos estéticos.",
    includes: [
      "Limpieza profunda de poros",
      "Eliminación de células muertas",
      "Aplicación de productos hidratantes y nutritivos",
    ],
    contraindications: ["Acné inflamatorio severo", "Rosácea en brote"],
    category: "glow",
    duration: "45–90 min",
  },
  {
    slug: "mesoterapia",
    name: "Mesoterapia",
    shortDescription:
      "Microinyecciones de vitaminas y compuestos esenciales directamente en la dermis.",
    longDescription:
      "Tratamiento no quirúrgico que utiliza microinyecciones para administrar pequeñas dosis de vitaminas, minerales, aminoácidos y otros compuestos esenciales directamente en la dermis. Rejuvenece la piel y mejora su calidad de forma progresiva, con sesiones personalizadas según las necesidades de cada paciente.",
    includes: [
      "Evaluación y plan personalizado",
      "Anestésico tópico para minimizar molestias",
      "Sesiones de mantención según resultados",
    ],
    contraindications: ["Embarazo y lactancia", "Infección activa en la zona"],
    category: "glow",
    duration: "30–60 min",
  },

  // ── SMOOTH · Arrugas y líneas de expresión ───────────────────────────────
  {
    slug: "relleno-acido-hialuronico",
    name: "Relleno de ácido hialurónico",
    shortDescription:
      "Hidratación y volumen natural para pómulos, ojeras, labios, mentón y contorno.",
    longDescription:
      "El ácido hialurónico es una sustancia presente de forma natural en casi todos los tejidos del cuerpo, capaz de atraer agua hasta 1000 veces su volumen. Aporta hidratación y volumen natural en pómulos, ojeras, nariz, labios, contorno mandibular y mentón, suavizando líneas y armonizando el rostro.",
    includes: ["Evaluación médica", "Aplicación con cánula o aguja", "Control"],
    contraindications: [
      "Embarazo y lactancia",
      "Alergias previas al producto",
      "Enfermedades autoinmunes",
      "Infección en el sitio de inyección",
      "Rellenos permanentes previos",
    ],
    category: "smooth",
    duration: "Resultados de 6–18 meses según la zona",
  },
  {
    slug: "hilos-revitalizantes-pdo",
    name: "Hilos revitalizantes PDO",
    shortDescription:
      "Hebras finas de polidioxanona que reafirman la piel y estimulan colágeno y elastina.",
    longDescription:
      "Hebras finas de polidioxanona (PDO), un material biocompatible y reabsorbible usado hace décadas en cirugía. Reafirman la piel y estimulan la síntesis natural de colágeno y elastina, suavizando la textura y mejorando la calidad de la piel.",
    includes: ["Evaluación médica", "Aplicación", "Control post-tratamiento"],
    contraindications: [
      "Embarazo y lactancia",
      "Enfermedades autoinmunes",
      "Tratamiento con isotretinoína",
      "Infección en la zona",
    ],
    category: "smooth",
    duration: "Resultados de 6–8 meses",
  },

  // ── LIFT · Firmeza y soporte facial ──────────────────────────────────────
  {
    slug: "bioestimuladores",
    name: "Bioestimuladores de colágeno",
    shortDescription:
      "Radiesse® y Sculptra®: volumen inmediato y estímulo del colágeno propio.",
    longDescription:
      "Bioestimuladores dérmicos inyectables — hidroxiapatita de calcio (Radiesse®) o ácido poli-L-láctico (Sculptra®) — que tratan la flacidez del rostro, cuello y escote con doble efecto: volumen inmediato y estimulación progresiva del colágeno natural, para una firmeza que dura entre 12 y 24 meses.",
    includes: ["Evaluación médica", "Aplicación", "Plan de sesiones"],
    contraindications: [
      "Embarazo y lactancia",
      "Alergia al producto o lidocaína",
      "Enfermedades autoinmunes",
      "Queloides",
      "Rellenos permanentes previos",
    ],
    category: "lift",
    duration: "Resultados de 12–24 meses",
  },
  {
    slug: "radiofrecuencia-endymed",
    name: "Radiofrecuencia Endymed PRO™",
    shortDescription:
      "Calor profundo controlado que reestructura el colágeno y reafirma la piel.",
    longDescription:
      "Plataforma de radiofrecuencia con tecnología 3DEEP™ que genera un calentamiento cutáneo y subcutáneo profundo, estimulando la circulación, la oxigenación y la regeneración de las fibras de colágeno. Trata flacidez, líneas de expresión, poros dilatados y cicatrices, con retorno inmediato a la actividad diaria.",
    includes: [
      "Plan de 6–8 sesiones según evaluación",
      "Cambios visibles desde la segunda sesión",
      "Sin tiempo de recuperación",
    ],
    contraindications: ["Embarazo", "Dispositivos electrónicos implantados"],
    category: "lift",
    duration: "30–45 min por sesión",
  },
  {
    slug: "lipopapada",
    name: "Lipopapada",
    shortDescription:
      "Reducción de la grasa submentoniana para un contorno más definido.",
    longDescription:
      "Procedimiento que reduce el exceso de grasa localizada bajo el mentón, disminuyendo el volumen y aumentando la definición del contorno facial. El paciente vuelve a casa el mismo día; los resultados finales se aprecian de forma progresiva en los meses siguientes.",
    includes: ["Evaluación médica", "Procedimiento ambulatorio", "Controles"],
    contraindications: ["Embarazo y lactancia", "Trastornos de coagulación"],
    category: "lift",
    duration: "Ambulatorio · mismo día",
  },

  // ── SMILE · Salud y estética dental ──────────────────────────────────────
  {
    slug: "endodoncia",
    name: "Endodoncia",
    shortDescription:
      "Tratamiento de conducto especializado que conserva tu diente natural.",
    longDescription:
      "Tratamiento de conducto realizado por especialista, orientado a conservar el diente natural eliminando la infección o inflamación del tejido interno. Con técnica moderna y control del dolor, en una o pocas sesiones.",
    includes: ["Diagnóstico con imagenología", "Tratamiento de conducto", "Control"],
    contraindications: [],
    category: "smile",
    duration: "Según diagnóstico",
  },
  {
    slug: "blanqueamiento-dental",
    name: "Blanqueamiento dental",
    shortDescription: "Sonrisa más blanca con sensibilidad controlada.",
    longDescription:
      "Blanqueamiento dental clínico con protocolo de sensibilidad controlada para un resultado visible y natural, cuidando la salud del esmalte.",
    includes: ["Evaluación dental", "Sesión de blanqueamiento", "Indicaciones de mantención"],
    contraindications: ["Caries activas", "Embarazo"],
    category: "smile",
    duration: "60 min",
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
