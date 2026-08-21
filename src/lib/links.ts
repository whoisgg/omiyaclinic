/**
 * External links — agenda y pago se manejan fuera del sitio.
 * Agenda online: Dentalink (cuenta de la Dra. Antonieta Ortega).
 * Link de pago: HealthAtom (se envía al paciente, independiente de la agenda).
 */
export const BOOKING_URL =
  "https://cfef9477a3f223017832f99a2e8d7eda04b5fb18.agenda.softwaredentalink.com/agenda?modalidad=1";

/**
 * Link de pago de HealthAtom.
 *
 * **Hoy no lo enlaza ninguna página, a propósito.** Estuvo un tiempo en
 * Contacto y salió el 2026-08-21: el link se le envía al paciente cuando
 * corresponde, no es una puerta pública. Se conserva acá porque es un dato del
 * negocio que no se puede reconstruir, no porque esté en uso.
 */
export const PAYMENT_URL = "https://ff.healthatom.io/txzPhD";

/**
 * Instagram de la **clínica**. Es la cuenta que se muestra en la sección
 * social del landing y a la que apunta el enlace del footer.
 *
 * El handle es `@omiyaclinic`, confirmado por el usuario. El wireframe 50 decía
 * `@omiya.clinica`, que no existe.
 */
export const INSTAGRAM_CLINICA_URL = "https://www.instagram.com/omiyaclinic/";

/**
 * Instagram de la Dra. Antonieta Ortega. Es su cuenta personal-profesional,
 * no la de la clínica: hoy es el único lugar donde su trayectoria sigue
 * actualizándose, así que es a donde apunta el enlace de la sección 05 de
 * Acerca de. No confundir con la de arriba.
 */
export const INSTAGRAM_URL =
  "https://www.instagram.com/dra.antonietaortegamunoz/";


/**
 * La clínica en Google Maps. Vive acá y no en el footer porque la usan los
 * dos: el enlace del footer y el mapa de la página de contacto.
 */
export const MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=Del%20Pucar%C3%A1%2050%2C%20Oficina%20410%2C%20Edificio%20Don%20Octavio%2C%20Machal%C3%AD";

/**
 * La misma dirección, en la forma que acepta el iframe de Google Maps.
 *
 * `output=embed` es lo que permite incrustar sin clave de API. La otra vía
 * —`/maps/embed?pb=…`— necesita que alguien entre a Google y copie el bloque
 * `pb`, que es una cadena opaca imposible de mantener a mano.
 */
export const MAPS_EMBED_URL =
  "https://www.google.com/maps?q=Del+Pucar%C3%A1+50,+Oficina+410,+Machal%C3%AD,+Chile&output=embed";

export const DIRECCION = "Del Pucará 50, Of. 410 — Machalí";
