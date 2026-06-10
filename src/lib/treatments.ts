/**
 * Catálogo estático de tratamientos.
 * Espejo de los procedimientos de facelab.cl (referencia), reagrupados en la
 * clasificación de Omiya (Glow / Smooth / Lift), más la línea dental propia
 * en Smile. Sin precios: la reserva en Dentalink es por categoría o por hora
 * de diagnóstico, y el detalle se ve en consulta. Editar aquí para cambiar
 * servicios.
 */
import type { Category, Treatment } from "@/lib/treatments-shared";

// Re-export shared bits so existing server-side imports keep working.
export { CATEGORIES, formatCLP } from "@/lib/treatments-shared";
export type { Category, Treatment } from "@/lib/treatments-shared";

const TREATMENTS: Treatment[] = [
  // ── GLOW · Calidad y luminosidad de la piel ──────────────────────────────
  {
    slug: "limpieza-facial",
    name: "Limpieza facial",
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
    slug: "rellenos-acido-hialuronico",
    name: "Rellenos de ácido hialurónico",
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

  // ── LIFT · Firmeza y soporte facial ──────────────────────────────────────
  {
    slug: "bioestimulacion",
    name: "Bioestimulación",
    shortDescription:
      "Radiesse®, Sculptra® e hilos PDO: firmeza estimulando tu propio colágeno.",
    longDescription:
      "Tratamientos inyectables que estimulan la producción natural de colágeno y elastina para tratar la flacidez del rostro, cuello y escote: hidroxiapatita de calcio (Radiesse®), ácido poli-L-láctico (Sculptra®) e hilos revitalizantes de polidioxanona (PDO). Firmeza progresiva y natural, con resultados que duran entre 6 y 24 meses según la técnica.",
    includes: [
      "Evaluación médica y elección de técnica",
      "Aplicación",
      "Control post-tratamiento",
    ],
    contraindications: [
      "Embarazo y lactancia",
      "Alergia al producto o lidocaína",
      "Enfermedades autoinmunes",
      "Queloides",
      "Rellenos permanentes previos",
    ],
    category: "lift",
    duration: "Resultados de 6–24 meses según técnica",
  },
  {
    slug: "endymed-pro",
    name: "Endymed PRO™",
    shortDescription:
      "Radiofrecuencia 3DEEP™: calor profundo controlado que reafirma la piel.",
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
    slug: "lipopapadas",
    name: "Lipopapadas",
    shortDescription:
      "Reducción de la grasa submentoniana para un contorno más definido.",
    longDescription:
      "Procedimiento que reduce el exceso de grasa localizada bajo el mentón, disminuyendo el volumen y aumentando la definición del contorno facial. El paciente vuelve a casa el mismo día; los resultados finales se aprecian de forma progresiva en los meses siguientes.",
    includes: ["Evaluación médica", "Procedimiento ambulatorio", "Controles"],
    contraindications: ["Embarazo y lactancia", "Trastornos de coagulación"],
    category: "lift",
    duration: "Ambulatorio · mismo día",
  },

  // ── SMILE · Salud y estética dental (línea propia de Omiya) ──────────────
  {
    slug: "limpieza-dental",
    name: "Limpieza dental",
    shortDescription:
      "Higiene profesional: destartraje y pulido para encías y dientes sanos.",
    longDescription:
      "Higiene dental profesional que elimina placa bacteriana y sarro mediante destartraje y pulido coronario. Previene caries y enfermedad de las encías, y mantiene la salud y frescura de tu sonrisa. Recomendada cada 6 meses.",
    includes: ["Evaluación de salud oral", "Destartraje", "Pulido coronario"],
    contraindications: [],
    category: "smile",
    duration: "30–45 min",
  },
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
