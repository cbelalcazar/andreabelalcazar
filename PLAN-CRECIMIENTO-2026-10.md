# Plan de crecimiento orgánico · andreabelalcazar.com

> **Versión:** 2026-10-09 · **Base:** Google Search Console, 2026-09-09 → 2026-10-06 (primer mes con contenido indexado).
> **Cómo usar este documento:** cada tarea tiene un ID (`G-xx`), un responsable (**Código** = la IA implementadora, **Andrea**, **Carlos**), los archivos exactos que se tocan y un criterio de aceptación. Las fases se ejecutan en orden; dentro de una fase, las tareas son independientes salvo que se indique.
> **Regla de oro (heredada de la auditoría 2026-09):** no se inventan datos de Andrea. Lo que dependa de su experiencia lleva `TODO(andrea)` y no se publica hasta que ella lo valide.

---

## 0. Resumen ejecutivo

| Métrica (28 días) | Valor | Lectura |
|---|---|---|
| Impresiones | ~10.170 | Arranque muy bueno para un dominio de 4 semanas |
| Clics | 64 | Bajo: el CTR medio es 0,63 % |
| Páginas con impresiones | 39 de 89 | Google aún no muestra la mitad del sitio |
| Clics desde Colombia | 4 (6 %) | El público que llega no es el público que compra |
| Clics a páginas de servicio | 1 | El embudo comercial no existe todavía |

**Diagnóstico en una frase:** el glosario funciona como imán de tráfico informativo panhispánico, pero las páginas son demasiado cortas para ganar el clic, no llevan a ningún sitio y el sitio no tiene presencia en búsquedas comerciales o locales.

**Tres apuestas del plan:**

1. **Ganar el clic que ya tenemos** (fase 1). Hay ~6.000 impresiones en 8 términos con 0–3 clics. Si se reescriben las fichas y se cambian títulos y descripciones, el objetivo es pasar de 64 a 250–400 clics al mes sin crear ni una URL nueva.
2. **Convertir lectores en autoridad y conversaciones** (fase 2). Cada visita debe pasar por la secuencia definición → guía práctica → servicio → WhatsApp, y debe quedar medido en GA4.
3. **Abrir el canal comercial y local** (fase 3). Las búsquedas tipo "jefe de prensa en Cali" o "asesora de comunicación política Valle del Cauca" necesitan páginas y señales locales que hoy no existen.

**Objetivos a 90 días (2027-01-06)**, medidos con la misma ventana de 28 días:

| KPI | Base | Objetivo |
|---|---|---|
| Clics orgánicos | 64 | **≥ 400** |
| CTR medio | 0,63 % | **≥ 2,0 %** |
| Clics en /glosario/vocero | 0 | **≥ 60** |
| Clics desde Colombia | 4 | **≥ 40** |
| Impresiones en páginas de servicio | 38 | **≥ 500** |
| Conversaciones atribuidas al sitio (WhatsApp + formulario) | sin medir | **medido, ≥ 3/mes** |

---

## 1. Lectura de los datos

### 1.1 De dónde salen los clics y dónde se pierden

| Página | Impr. | Clics | CTR | Diagnóstico |
|---|---|---|---|---|
| /glosario/vocero | 3.473 | 0 | 0 % | Primera en impresiones, cero clics. Ficha de 210 palabras que no responde a lo que se busca (ortografía, funciones, femenino) |
| /glosario/agenda-setting | 2.144 | 27 | 1,26 % | La única que funciona. Público estudiantil; le falta profundidad académica |
| /glosario/off-the-record | 866 | 3 | 0,35 % | Muchas búsquedas mal escritas ("off de record", "of de record") y de "qué significa en periodismo" |
| /blog/que-hace-un-jefe-de-prensa | 745 | 6 | 0,8 % | Le gana a su ficha del glosario (172 / 0) |
| /glosario/rueda-de-prensa | 595 | 5 | 0,84 % | Compite con /blog/como-organizar-una-rueda-de-prensa (150 / 3) |
| /glosario/media-training | 379 | 0 | 0 % | Ficha corta; hay demanda desde España ("media training madrid") |
| /glosario/mensaje-clave | 255 | 0 | 0 % | Ficha corta |
| /glosario/framing | 243 | 0 | 0 % | Ficha corta; también la buscan estudiantes |
| /glosario/boletin-de-prensa + /glosario/comunicado-de-prensa + /blog/como-escribir-un-comunicado-de-prensa | 482 | 4 | 0,8 % | Tres URL para la misma intención de búsqueda |
| /glosario/kpi-de-comunicacion | 73 | 4 | **5,5 %** | Buen CTR: búsqueda nicho y profesional |
| /glosario/reputacion-institucional | 41 | 3 | **7,3 %** | Ídem |
| 4 páginas de /servicios | 38 | 1 | — | No aparecen en búsquedas comerciales |

**Patrón clave:** los términos de nicho profesional (KPI, reputación institucional) convierten 10 veces mejor que los genéricos. Además, ese público se parece al cliente: comunicadores y funcionarios.

### 1.2 Qué busca la gente (consultas agrupadas por intención)

| Grupo | Consultas de ejemplo | Impr. aprox. | Página destino |
|---|---|---|---|
| Definición de vocero | que es un vocero, vocero, que es vocero, vocero significado | ~1.400 | /glosario/vocero |
| **Duda ortográfica** | bocero o vocero, vocero o bocero, vosero, que es un bosero, que es bocero | ~300 | /glosario/vocero (sección propia) |
| Femenino | que es vocera, que es una vocera, vocera significado, que es ser vocera | ~230 | /glosario/vocero |
| Funciones | que hace un vocero, funciones de un vocero, que es ser vocero | ~120 | /glosario/vocero |
| Agenda setting | agenda setting, que es la agenda setting, agenda setting definicion | ~1.900 | /glosario/agenda-setting |
| Off the record | off de record, off the record que significa, of de record, out of record | ~500 | /glosario/off-the-record |
| Rueda de prensa | que es una rueda de prensa, rueda de prensa que es | ~420 | /glosario/rueda-de-prensa |
| Media training | media training, que es media training, media training madrid | ~280 | /glosario/media-training |
| Comerciales/locales | media training madrid, curso media training, monitoreo de noticias colombia, concejo de cali | < 20 | **sin página adecuada** |

**Ojo:** las consultas visibles suman ~33 clics de los 64. El resto vienen de consultas anónimas que Google oculta por privacidad.

### 1.3 Geografía

México 12, España 12, Venezuela 8, Perú 6, Colombia 4 clics. Es lo esperable en búsquedas de definición en español, y **no es malo**: da autoridad temática al dominio, que luego ayuda a posicionar las páginas comerciales en Colombia. Pero ese tráfico no factura por sí solo. El plan trabaja las dos cosas a la vez: autoridad panhispánica y conversión en Colombia.

### 1.4 Datos que faltan (pedir antes de la fase 1 · Carlos)

| ID | Dato | Dónde | Por qué |
|---|---|---|---|
| D-01 | **Posición media** por página y por consulta | GSC → Rendimiento → activar "Posición media" → Exportar → CSV | Saber si vocero está en la posición 8 (falta poco) o en la 35 (hay que reescribir a fondo) |
| D-02 | Clics de WhatsApp y envíos del formulario | GA4 → Informes → Eventos | Saber si hoy hay alguna conversión |
| D-03 | % de visitantes que aceptan cookies | GA4 (sesiones) vs. Vercel Analytics | GA4 solo cuenta a quien acepta, así que puede infravalorar el tráfico |
| D-04 | Informe de indexación | GSC → Indexación → Páginas | 50 de 89 URL no tienen impresiones: ¿no están indexadas o no rankean? |

Guardar los CSV en `audit-evidence/gsc-2026-10/` para comparar cada mes.

---

## 2. Lectura por perfil

**CEO.** El sitio cumple su primer objetivo, que Google lo conozca, pero aún no produce negocio. La pregunta estratégica es **qué vende Andrea y a quién**, porque las búsquedas que hoy ganamos no tienen quién las compre. Antes de invertir en páginas comerciales hay que resolver un riesgo: Andrea es **funcionaria pública** (Secretaría de Turismo del Valle). En Colombia el régimen de inhabilidades e incompatibilidades puede limitar que ofrezca servicios privados, sobre todo a otras entidades públicas o a campañas. **Andrea debe confirmar con un abogado qué puede ofrecer y a quién** antes de la fase 3 (tarea G-30). Mientras tanto, la estrategia segura es la autoridad: glosario, guías y prensa.

**Producto.** Hoy cada página es un callejón sin salida: se lee la definición y se cierra. Hace falta un **embudo explícito**: definición (glosario) → aplicación (guía del blog) → prueba (caso) → oferta (servicio) → conversación (WhatsApp). Además, un **recurso descargable** (plantilla de comunicado, checklist de rueda de prensa) para que el estudiante o el comunicador junior vuelva y recuerde la marca.

**UX/UI.** Las fichas no dan pistas de profundidad: no hay índice, ni fecha de actualización, ni autora visible, ni respuesta destacada. El bloque de contacto del lateral ("¿Necesitas aplicarlo en tu equipo?") es igual para los 30 términos y no se vincula con el servicio concreto. En móvil, el lateral (términos relacionados + contacto) queda **después** del artículo, así que casi nadie lo ve.

**Developer.** El esquema `TermSchema` solo tiene `term`, `short` y `related`. Por eso título y descripción son plantillas fijas, no hay preguntas frecuentes estructuradas y `lastModified` está fijo en el sitemap (`"2026-09-12"`). Hay que ampliar el esquema y la plantilla, y añadir tests que impidan regresiones (longitud de títulos, preguntas frecuentes válidas, enlaces relacionados existentes).

**Diseño de producto / contenido.** Las fichas son correctas, pero las podría haber escrito cualquiera. En la era de los resúmenes de IA de Google, una definición genérica no gana clics. Lo que gana es **lo que la IA no tiene**: experiencia real de una jefa de prensa en el sector público colombiano, ejemplos con nombre y fecha, errores vistos en la práctica y plantillas descargables.

**Auditor.** Hay canibalización en tres grupos (jefe de prensa, rueda de prensa, comunicado/boletín). Las señales E-E-A-T son débiles en el glosario: no hay autora, ni fecha, ni fuentes. Las páginas de servicio no tienen señales locales.

---

## 3. Fase 1 · Ganar el clic (semanas 1–3)

### G-01 · Ampliar el esquema del glosario · Código · P0

**Archivo:** `src/lib/content.ts`

```ts
export const TermSchema = z.object({
  term: z.string().min(2).max(60),
  short: z.string().min(60).max(170),
  related: z.array(z.string().regex(slugRe)).default([]),
  /** Título para Google. Si no existe, se usa la plantilla por defecto. Máx. 60 car. sin sufijo. */
  seoTitle: z.string().min(20).max(60).optional(),
  /** Meta description que invite al clic (no repetir `short`). 120–160 car. */
  seoDescription: z.string().min(120).max(160).optional(),
  /** Respuesta directa de 40–60 palabras, candidata a fragmento destacado. Se pinta arriba del artículo. */
  answer: z.string().min(150).max(420).optional(),
  /** Otras formas en que la gente busca el término (grafías, femenino, sinónimos). */
  aka: z.array(z.string()).max(10).default([]),
  faq: z.array(Faq).max(8).default([]),
  /** Guía del blog que desarrolla el "cómo". Debe existir en /blog. */
  guide: z.string().regex(slugRe).optional(),
  /** Servicio al que lleva el CTA contextual. Debe existir en /servicios. */
  service: z.string().regex(slugRe).optional(),
  /** Fuentes citadas (académicas, RAE, manuales). */
  sources: z.array(z.object({ label: z.string(), url: z.string().url() })).max(8).default([]),
  updated: z.string().regex(dateRe).optional(),
  /** Revisión editorial de Andrea; si es false no se muestra "Revisado por". */
  reviewed: z.boolean().default(false),
});
```

**Aceptación:** `npm run build` pasa con los 30 términos actuales sin cambios (todos los campos nuevos son opcionales o tienen valor por defecto).

### G-02 · Plantilla de la ficha de glosario · Código · P0

**Archivo:** `src/app/glosario/[termino]/page.tsx`

1. **Metadata:**
   - `title`: si existe `t.seoTitle`, usar `{ absolute: t.seoTitle }` (sin el sufijo " · Andrea Belalcázar", que se come ~20 caracteres del espacio visible en Google). Si no existe, mantener la plantilla actual.
   - `description`: `t.seoDescription ?? t.short`.
   - Añadir `openGraph.modifiedTime` con `t.updated`.
2. **Orden del contenido** (de arriba abajo):
   1. `PageHeader` (sin cambios).
   2. **Caja de respuesta** con `t.answer`: fondo `bg-surface`, borde de 1 px con el token `gold` (no usar hex sueltos), eyebrow "En pocas palabras". Va **antes** del cuerpo MDX y debe ser texto real del HTML (no imagen, no colapsado).
   3. **Línea de autoría:** "Por Andrea Belalcázar · Jefa de prensa · Actualizado el {fecha}". Solo si `t.reviewed === true`; si no, solo la fecha. Enlaza a `/sobre-mi`.
   4. Índice de secciones (lista de enlaces a los `##` del MDX) cuando el cuerpo tenga ≥ 4 encabezados. Para que cada `##` tenga `id`, usar `rehype-slug` en la configuración MDX.
   5. Cuerpo MDX.
   6. `<Faq items={t.faq} />` (componente existente).
   7. Bloque **"Fuentes"** si `t.sources.length`.
   8. **Tarjeta de guía** si `t.guide`: "Guía práctica: {título del post}" con su descripción, enlazando a `/blog/{guide}`.
3. **Lateral:** en móvil, pasar el bloque de términos relacionados para que vaya **después de la tarjeta de guía** y antes del contacto. Hoy el lateral queda detrás del artículo sin contexto.
4. **CTA contextual** (ver G-12): si existe `t.service`, cambiar el título y el texto del `ContactBlock` por los del servicio (p. ej. "¿Tu equipo necesita voceros preparados?" → `/servicios/jefatura-de-prensa`).

**Aceptación:**
- La ficha de vocero muestra la caja de respuesta antes del pliegue en móvil (390 × 844).
- Los tests de Playwright existentes pasan.
- Lighthouse: SEO 100 y CLS < 0,05.

### G-03 · JSON-LD de la ficha · Código · P0

**Archivo:** `src/lib/seo.ts`

- `buildDefinedTerm`: añadir `alternateName: t.aka`, `dateModified: t.updated` y `description: t.answer ?? t.short`.
- En la página, añadir `buildFaq(t.faq)` al `graph(...)`.
- Si `t.reviewed`, añadir un nodo `WebPage` con `author` y `reviewedBy: { "@id": PERSON_ID }`, `dateModified` y `about: { "@id": ...#term }`.

**Nota:** desde 2023 Google solo muestra resultados enriquecidos de FAQ a sitios gubernamentales y de salud. Aun así, el marcado ayuda a que Google y los asistentes de IA entiendan la página. El objetivo no es la estrella en la SERP.

**Aceptación:** el Rich Results Test y el validador de schema.org no dan errores en /glosario/vocero.

### G-04 · `lastModified` real en el sitemap · Código · P0

**Archivo:** `src/lib/content.ts` → `getAllRoutes()`

Para los términos, usar `t.updated ?? "2026-09-12"` en lugar de la fecha fija, y subir `changeFrequency` a `"monthly"`. Hacer lo mismo con servicios y casos cuando tengan `updated`.

**Aceptación:** `/sitemap.xml` refleja la nueva fecha tras reescribir vocero.

### G-05 · Reescribir /glosario/vocero · Código (texto) + Andrea (validación) · P0

**Objetivo:** pasar de 210 a **1.200–1.500 palabras** y responder a las 4 intenciones de §1.2.

**Frontmatter:**

```yaml
term: "Vocero"
seoTitle: "Vocero: qué es, qué hace y cómo se escribe (¿o es bocero?)"
seoDescription: "Qué es un vocero o vocera, sus funciones, tipos y cualidades. Por qué se escribe con v y no 'bocero', y en qué se diferencia de un jefe de prensa."
short: "Persona autorizada para hablar en nombre de una organización, campaña o funcionario ante medios y públicos."
answer: "Un vocero o vocera es la persona autorizada para hablar en nombre de una organización, institución o grupo ante los medios y la ciudadanía. Se escribe con v porque viene de «voz»: «bocero» es un error frecuente. Su tarea no es opinar, sino transmitir la posición oficial con claridad, coherencia y datos verificados."
aka: ["vocera", "voceros", "portavoz", "bocero", "vosero"]
related: ["voceria", "media-training", "mensaje-clave", "jefe-de-prensa"]
guide: "como-hablar-con-periodistas-guia-para-funcionarios"
service: "jefatura-de-prensa"
updated: "2026-10-XX"
```

**Estructura del cuerpo (H2 en este orden):**

1. `## Qué es un vocero` — Definición ampliada. Citar el DLE de la RAE (**verificar el texto literal en https://dle.rae.es/vocero antes de publicar**; no citar de memoria).
2. `## ¿Vocero o bocero? Cómo se escribe` — Se escribe con *v*: viene de *voz*, como *vocear* o *vocería*. *Bocero* y *vosero* no existen en el diccionario con este significado. Una regla para recordarlo: «el vocero pone la voz». Sección corta (80–120 palabras), pensada para la duda exacta.
3. `## Vocero y vocera` — El femenino es *vocera*; plural *voceros/voceras*. Uso en titulares.
4. `## Qué hace un vocero: funciones` — Lista de 6–8 funciones (representar la posición oficial, atender entrevistas, intervenir en ruedas de prensa, sostener los mensajes clave, corregir información errónea, hablar en crisis, coordinarse con el jefe de prensa).
5. `## Tipos de vocero` — Institucional (la máxima autoridad), técnico (experto en el tema), de crisis y de campaña. Un párrafo por tipo.
6. `## Cualidades de un buen vocero` — Dominio del tema, credibilidad, control emocional, lenguaje claro y disciplina de mensaje.
7. `## Vocero, portavoz y jefe de prensa: diferencias` — **Tabla** de 3 columnas: quién habla, quién prepara, quién decide. Enlazar a `/glosario/jefe-de-prensa` y `/blog/que-hace-un-jefe-de-prensa`.
8. `## Ejemplo` — Mantener el ejemplo actual de la secretaría de movilidad.
9. `## Lo que he visto en la práctica` — **`TODO(andrea)`**: 2–3 párrafos de experiencia real (p. ej. errores de voceros en entidades del Valle, sin nombrar a nadie si es sensible). **No publicar este H2 hasta que Andrea lo escriba.** Si no llega, omitir la sección; no rellenarla.
10. Preguntas frecuentes (en `faq`, no en el cuerpo):
    - ¿Qué significa ser vocero de una institución?
    - ¿Cuál es la diferencia entre vocero y portavoz? (Son sinónimos; en Colombia y buena parte de América se dice más *vocero* y en España, *portavoz*. **Verificar la afirmación de uso con el DLE o el Diccionario panhispánico de dudas.**)
    - ¿Quién puede ser vocero de una entidad pública?
    - ¿Qué no debe hacer nunca un vocero?
    - ¿Cómo se prepara a un vocero? (enlazar a media training)

**Fuentes:** DLE (RAE), Diccionario panhispánico de dudas si aplica, y /blog/como-hablar-con-periodistas-guia-para-funcionarios.

**Aceptación:**
- 1.200 palabras o más.
- Las palabras *bocero*, *vocera* y *funciones* aparecen en H2.
- Hay una tabla.
- 5 preguntas frecuentes.
- `TODO(andrea)` sin publicar.

### G-06 · Ampliar /glosario/agenda-setting · Código · P0

Esta es la página ganadora; hay que defenderla. Público: estudiantes de comunicación y periodismo.

```yaml
seoTitle: "Agenda setting: qué es, autores, niveles y ejemplos"
seoDescription: "Qué es la teoría de la agenda setting: McCombs y Shaw, el estudio de Chapel Hill, sus niveles, la diferencia con framing y priming, y ejemplos en política."
aka: ["agenda-setting", "establecimiento de la agenda", "teoría de la agenda", "agenda seting"]
guide: "que-es-la-comunicacion-politica"
service: "comunicacion-institucional"
```

**H2 a añadir** (mantener el ejemplo y el "por qué importa" actuales):

1. `## Origen: McCombs y Shaw (1972)` — Estudio en Chapel Hill (Carolina del Norte) durante la elección presidencial de EE. UU. de 1968, publicado en *Public Opinion Quarterly* (1972) como "The Agenda-Setting Function of Mass Media". Antecedentes: Walter Lippmann (*Public Opinion*, 1922) y la frase de Bernard Cohen (1963) sobre que la prensa no dice qué pensar sino sobre qué pensar. **Verificar año, revista y cita con una fuente académica antes de publicar** y añadirla a `sources`.
2. `## Niveles de la agenda setting` — Primer nivel (los temas, *objetos*), segundo nivel o atributos (cómo se caracterizan esos temas) y tercer nivel o de red (*network agenda setting*). Un párrafo cada uno.
3. `## Agenda setting, framing y priming` — **Tabla comparativa** (qué hace cada uno y una pregunta que responde). Enlazar a `/glosario/framing`.
4. `## Agenda mediática, pública y política` — Las tres agendas y cómo se influyen. Concepto de *agenda building* (quién construye la agenda de los medios: fuentes, gabinetes de prensa).
5. `## Críticas y vigencia en la era de las redes` — Fragmentación de audiencias y algoritmos como nuevos "editores" de la agenda.
6. Preguntas frecuentes: ¿Quién creó la teoría de la agenda setting? ¿Cuál es la diferencia entre agenda setting y framing? ¿Qué es el segundo nivel? ¿Sigue vigente con las redes sociales?

**Aceptación:**
- 1.300 palabras o más.
- Fuentes académicas con URL (DOI o editorial).
- Tabla comparativa.
- Enlace a framing y a comunicación política.

### G-07 · Ampliar /glosario/off-the-record · Código · P0

```yaml
seoTitle: "Off the record: qué significa en periodismo (y on the record)"
seoDescription: "Qué significa off the record en periodismo, en qué se diferencia de on the record y on background, cómo se pacta con un periodista y errores que debes evitar."
aka: ["off de record", "of de record", "out of record", "fuera de registro", "off the records"]
service: "jefatura-de-prensa"
```

**H2:**

1. `## Qué significa off the record`.
2. `## Cómo se escribe` — Es una expresión inglesa: *off the record* ("fuera del registro"). Las formas "off de record" y "of de record" son errores frecuentes. Breve, como en vocero.
3. `## Niveles de atribución: on the record, on background, deep background y off the record` — **Tabla**: ¿se puede publicar? ¿se puede atribuir? ¿cómo se cita? Advertir que no hay un estándar universal y que cada medio interpreta los términos a su manera, así que **hay que pactar el significado antes de hablar**.
4. `## Cómo pactar un off the record` — Pasos: avisar antes, confirmar que se entendió igual, cuándo acaba el acuerdo.
5. `## Riesgos y errores frecuentes`.
6. Ejemplo actual.
7. Preguntas frecuentes: ¿Qué significa off the record en español? ¿Es legal publicar algo dicho off the record? (Respuesta prudente: es un pacto ético, no un contrato; **no dar asesoría legal**.) ¿Cuál es la diferencia con el embargo informativo?

### G-08 · Ampliar las 5 fichas siguientes · Código · P1

El mismo patrón (seoTitle + seoDescription + answer + aka + 3–5 preguntas frecuentes + 700–1.000 palabras + guide + service):

| Término | seoTitle propuesto | H2 imprescindibles | guide | service |
|---|---|---|---|---|
| rueda-de-prensa | "Rueda de prensa: qué es, partes y cómo se convoca" | Qué es · Partes (convocatoria, declaración, preguntas, cierre) · Rueda de prensa vs. comunicado vs. declaración · Convocatoria (ejemplo de texto) | como-organizar-una-rueda-de-prensa | jefatura-de-prensa |
| media-training | "Media training: qué es, para qué sirve y cómo se hace" | Qué es · Qué se entrena · Cómo es una sesión · Errores que corrige · ¿Cuánto dura? | como-hablar-con-periodistas-guia-para-funcionarios | jefatura-de-prensa |
| mensaje-clave | "Mensaje clave: qué es y cómo redactarlo (con ejemplos)" | Qué es · Cómo se redacta (fórmula) · 5 ejemplos · Mensaje clave vs. eslogan | como-construir-la-narrativa-de-una-institucion-publica | comunicacion-institucional |
| framing | "Framing o encuadre: qué es, tipos y ejemplos" | Qué es · Origen (Goffman, Entman; **verificar citas**) · Tipos de encuadre · Framing vs. agenda setting · Ejemplos | que-es-la-comunicacion-politica | marketing-politico-digital |
| fact-checking | "Fact-checking: qué es y cómo verificar información" | Qué es · Cómo se hace paso a paso · Verificadores en Colombia y la región (**verificar que existan y los enlaces**) · Fact-checking vs. desinformación | como-monitorear-medios-y-redes-con-inteligencia-artificial | gestion-de-crisis |

### G-09 · Separar glosario y blog para que no compitan · Código · P1

**Regla:** el **glosario responde "qué es"** (definición, origen, diferencias). El **blog responde "cómo se hace"** (pasos, plantillas, errores). Ninguno repite al otro: se enlazan.

| Grupo | Glosario | Blog | Acciones |
|---|---|---|---|
| Jefe de prensa | /glosario/jefe-de-prensa | /blog/que-hace-un-jefe-de-prensa (ya gana) | Ficha corta (≤ 400 palabras) centrada en la definición, con una tarjeta destacada "Guía completa: qué hace un jefe de prensa". El blog enlaza al glosario en su primera mención. Título de la ficha: "Jefe de prensa: definición y diferencia con el director de comunicaciones" |
| Rueda de prensa | /glosario/rueda-de-prensa | /blog/como-organizar-una-rueda-de-prensa | Ver G-08. El blog adopta "cómo organizar" en su H1 y su título, y no explica "qué es" más allá de una línea con enlace |
| Comunicado | /glosario/comunicado-de-prensa + /glosario/boletin-de-prensa | /blog/como-escribir-un-comunicado-de-prensa | Boletín y comunicado son casi sinónimos: la ficha de boletín incluye una sección "Boletín de prensa vs. comunicado de prensa" y enlaza a comunicado. Comunicado enlaza al blog. **No fusionar las URL**: las dos tienen impresiones propias (178 y 127) |

**Aceptación:** cada par tiene enlaces cruzados en el primer tercio del contenido, y los títulos no compiten (palabras distintas en la cabecera).

### G-10 · Títulos y descripciones de las otras 22 fichas · Código · P1

Para los términos que no se reescriben, añadir solo `seoTitle` y `seoDescription` con este patrón:

- Título: `"{Término}: qué es, {beneficio específico}"`, ≤ 60 caracteres. Ej.: "Clipping de prensa: qué es y cómo hacerlo bien".
- Descripción: debe prometer algo que el resultado de Google no da (ejemplo, diferencia, plantilla, errores). **Nunca** repetir `short`.

**Test nuevo** (`tests/unit/content.test.ts` o equivalente):
- `seoTitle.length <= 60`.
- `seoDescription` entre 120 y 160.
- `seoDescription !== short`.
- `guide` y `service` existen.
- Todos los `related` existen.

### G-11 · Pedir la reindexación · Carlos · P0 (después de G-05/06/07)

En GSC → Inspección de URLs, pedir la indexación de vocero, agenda-setting y off-the-record el mismo día del deploy. Volver a enviar el sitemap.

---

## 4. Fase 2 · Del lector a la conversación (semanas 3–6)

### G-12 · CTA contextual y medición del embudo · Código · P0

1. **Archivo** `src/lib/whatsapp.ts`: añadir `"glossary"` y `"blog"` a `WhatsAppPlacement`. Hoy el glosario usa `placement="services"`, lo que mezcla los datos en GA4.
2. En la ficha, `ContactBlock placement="glossary" topic={`glosario:${slug}`}` con título y texto según `t.service`. Mapa de textos en `src/content/site.ts`:

   | service | Título | Texto |
   |---|---|---|
   | jefatura-de-prensa | "¿Tu equipo necesita voceros preparados?" | "Diseño la estrategia de prensa y entreno a quienes dan la cara ante los medios." |
   | comunicacion-institucional | "¿Tu institución necesita una narrativa clara?" | "…" |
   | gestion-de-crisis | "¿Estás frente a una crisis?" | "…" |
   | marketing-politico-digital | "¿Preparas una campaña?" | "…" |

   Estos textos de oferta **los valida Andrea** (G-30).
3. **Eventos GA4** (`AnalyticsEvents.tsx`), con los mismos nombres en todo el sitio:
   - `glossary_guide_click` (de la ficha a la guía).
   - `glossary_service_click` (de la ficha al servicio).
   - `whatsapp_click` con `placement` y `topic`, si no existe ya.
   - `contact_form_submit`.
   - `resource_download` (G-14).

   Marcar `whatsapp_click` y `contact_form_submit` como **eventos clave** en GA4 (Carlos).

**Aceptación:** con el consentimiento aceptado, GA4 DebugView muestra los 4 eventos con sus parámetros.

### G-13 · Enlazado interno · Código · P1

1. **Primera mención:** en cada post del blog, la primera aparición de un término del glosario se enlaza a su ficha (manualmente en MDX; no automatizar, para no enlazar en exceso).
2. **Glosario → blog:** cada ficha enlaza a su `guide` (G-02).
3. **Servicios → glosario:** cada página de servicio tiene un bloque "Conceptos clave" con 3–5 términos (p. ej. jefatura de prensa → vocero, rueda de prensa, comunicado, off the record, media training). Transmite autoridad de las fichas con impresiones a las páginas comerciales.
4. **Home → glosario:** añadir los 6 términos más vistos en una sección o en el footer ("Glosario: vocero · agenda setting · …").

**Aceptación:** todas las páginas de servicio reciben ≥ 5 enlaces internos; comprobar con un crawl (`npx linkinator` o un script).

### G-14 · Recursos descargables · Código + Andrea · P2

Dos recursos para empezar, con la marca de Andrea:

| Recurso | Ficha y guía donde aparece | Formato |
|---|---|---|
| Plantilla de comunicado de prensa | comunicado-de-prensa, boletin-de-prensa, blog cómo escribir un comunicado | .docx + PDF |
| Checklist de rueda de prensa | rueda-de-prensa, blog cómo organizar | PDF de 1 página |

- **Versión 1 sin pedir email** (descarga directa + evento `resource_download`). Pedir email exige base legal (Ley 1581 de 2012 en Colombia), una política de privacidad ampliada y un proveedor de listas: dejarlo para la fase 4 si la v1 da > 50 descargas al mes.
- El contenido de las plantillas lo revisa Andrea.

### G-15 · Mejoras de UX en el glosario (índice) · Código · P2

**Archivo:** `src/app/glosario/page.tsx`

- Navegación A–Z con anclas (30 términos ya lo justifican).
- Arriba, "Los más consultados": vocero, agenda setting, off the record, rueda de prensa, media training (lista fija, no dinámica).
- Buscador ligero en el cliente (filtrar por `term` + `aka`). Sin dependencias nuevas; si no es simple, omitirlo.

---

## 5. Fase 3 · Canal comercial y local (semanas 6–12)

> **Bloqueada por G-30** (validación legal y de oferta con Andrea).

### G-30 · Definir oferta y límites · Andrea + Carlos · P0 de la fase

Preguntas que Andrea debe responder por escrito:

1. ¿Puede ofrecer servicios privados siendo funcionaria? ¿A quién **no** puede ofrecérselos (entidades públicas, campañas, contratistas de su entidad)? → consultar con un abogado.
2. ¿Qué vende de verdad hoy? (asesoría puntual, media training, talleres, conferencias, consultoría a campañas cuando deje el cargo…)
3. ¿Para quién? (alcaldías pequeñas, concejales, gremios, empresas, ONG, universidades…)
4. ¿Dónde? (Cali, Valle, Colombia, remoto en LATAM)
5. ¿Hace talleres o clases? Esto encaja muy bien con el tráfico de estudiantes y de España.

**Si la respuesta a 1 es restrictiva**, la fase 3 se reorienta a "marca personal": conferencias, docencia, prensa y libros, en lugar de servicios.

### G-31 · Páginas de servicio orientadas a búsqueda · Código · P1

Una vez definida la oferta:

- Título y descripción con intención comercial y local. Ej.: "Asesoría de jefatura de prensa en Cali y el Valle del Cauca".
- Preguntas frecuentes de compra (¿cuánto cuesta?, ¿cómo se trabaja?, ¿en qué plazo?).
- Pruebas: casos con resultados medibles (**solo datos verificados por Andrea**).
- `areaServed` ya está en el JSON-LD; añadir `Cali` como `City`.

### G-32 · Página de media training · Código + Andrea · P1 (si la oferta lo incluye)

La consulta "media training" tiene demanda comercial (379 impresiones solo en la ficha, más "curso media training" y "media training madrid"). Si Andrea ofrece talleres, crear `/servicios/media-training` con su temario, duración, formato (presencial en Cali / remoto) y preguntas frecuentes. La ficha del glosario enlaza a ella.

### G-33 · Señales locales · Carlos + Andrea · P1

- **Perfil de Empresa de Google**: solo si Andrea tiene actividad independiente compatible (G-30). Categoría "Consultor de comunicación" o similar; zona de servicio Valle del Cauca, sin dirección pública.
- `site.sameAs` (hoy vacío a propósito): rellenarlo con los perfiles **verificados** (LinkedIn, Instagram, X). Es una tarea pendiente de la auditoría 2026-09.
- Directorios profesionales colombianos serios (gremios de comunicadores, egresados de su universidad).

### G-34 · Contenido de "coyuntura" colombiana · Andrea + Código · P2

Hay una ventaja que nadie en el top 10 tiene: **elecciones regionales y comunicación pública en Colombia contadas por alguien de dentro**. Ideas:

- "Cómo comunicar una obra pública que genera molestias: lecciones del Valle".
- "Ley de garantías y comunicación institucional: qué puede y qué no puede publicar una entidad en época electoral" (**requiere revisión legal**).
- "Comunicación de turismo regional: lo que funciona" (su cargo actual; **revisar si es compatible con su rol**).

Ritmo: 2 posts al mes, mínimo 1.200 palabras, con experiencia propia. El blog actual (12 posts, todos del 12 de septiembre) parece un volcado único; Google valora publicar con regularidad.

---

## 6. Fase 4 · Autoridad fuera del sitio (continuo, desde la semana 4)

| ID | Acción | Responsable | Notas |
|---|---|---|---|
| G-40 | Republicar fragmentos del glosario en LinkedIn (carrusel "¿Vocero o bocero?") enlazando a la ficha | Andrea | 1 por semana. Aporta enlace, marca y tráfico directo |
| G-41 | Contactar a 5–10 docentes de comunicación (Colombia y México) para proponer el glosario como material de consulta | Andrea | Los enlaces desde universidades (.edu.co, .edu.mx) son los de más valor para este tema |
| G-42 | Responder a periodistas que buscan fuentes (en Colombia: redes de periodistas, X) | Andrea | Las menciones en prensa alimentan /prensa y la autoridad |
| G-43 | Página /prensa: añadir cada aparición nueva con enlace | Código | Ya existe; mantenerla viva |

---

## 7. Calidad técnica (transversal)

| ID | Acción | Archivo | Aceptación |
|---|---|---|---|
| G-50 | `rehype-slug` + anclas en los H2 | `next.config.ts` (opciones MDX) | Cada H2 tiene `id`; el índice de G-02 funciona |
| G-51 | Tests de contenido (G-10) en CI | `tests/` + workflow existente | El CI falla si un `seoTitle` pasa de 60 o falta un `related` |
| G-52 | Imagen OG por término con el `term` y la caja de respuesta | `src/app/glosario/[termino]/opengraph-image.tsx` | Mejora el CTR cuando se comparte (LinkedIn, WhatsApp) |
| G-53 | Revisar el informe de indexación (D-04) y arreglar lo que salga | — | 0 URL en "Rastreada: actualmente sin indexar" sin justificar |
| G-54 | Lighthouse CI sigue en verde tras los cambios de plantilla | `lighthouserc.json` | Performance ≥ 90 móvil en PSI de producción |

---

## 8. Medición y ritmo

### 8.1 Panel mensual (Carlos, el día 7 de cada mes)

1. Exportar desde GSC Consultas, Páginas, Países y Dispositivos de los últimos 28 días, con posición. Guardar en `audit-evidence/gsc-AAAA-MM/`.
2. Rellenar esta tabla en `audit-evidence/gsc-log.md`:

| Mes | Impr. | Clics | CTR | Pos. media | Clics CO | Clics vocero | Clics agenda | Impr. servicios | Conversaciones |
|---|---|---|---|---|---|---|---|---|---|
| 2026-10 (base) | 10.170 | 64 | 0,63 % | ? | 4 | 0 | 27 | 38 | ? |

3. Pasar los CSV a Claude para la revisión mensual.

### 8.2 Cómo juzgar cada cambio

- **Esperar 3–4 semanas** antes de juzgar una reescritura: Google tarda en reevaluar.
- Comparar la página **contra sí misma** (28 días antes vs. 28 días después) y no contra el total del sitio.
- Si una ficha reescrita **pierde** posición después de 4 semanas, revisar si se diluyó la intención principal (p. ej. vocero empezó a rankear por "portavoz" y dejó de hacerlo por "vocero").

### 8.3 Lo que NO vamos a hacer

- **No** crear 100 términos nuevos de golpe: primero ganar el clic en los 30 que ya existen.
- **No** generar texto con IA sin la revisión ni la experiencia de Andrea en las secciones de opinión: es justo lo que Google y los resúmenes de IA ya tienen.
- **No** fusionar URL que ya tienen impresiones propias (boletín/comunicado).
- **No** pedir email en las descargas hasta tener base legal y volumen.
- **No** comprar enlaces.

---

## 9. Calendario

| Semana | Tareas | Responsable |
|---|---|---|
| 0 (ya) | D-01…D-04 (exportar datos) · enviar a Andrea las preguntas de G-30 | Carlos |
| 1 | G-01, G-02, G-03, G-04, G-50 (plataforma) | Código |
| 1–2 | G-05 vocero, G-06 agenda setting, G-07 off the record → deploy → G-11 | Código + Andrea (validación) |
| 2–3 | G-08 (5 fichas), G-09 (canibalización), G-10 (22 títulos), G-51 | Código |
| 3–4 | G-12 (CTA + eventos), G-13 (enlazado) | Código + Carlos (eventos clave GA4) |
| 4 | **Revisión 1**: comparar vocero, agenda y off the record antes y después | Carlos + Claude |
| 4–6 | G-14 recursos, G-15 índice A–Z, G-52 OG por término | Código + Andrea |
| 6+ | Fase 3 (si G-30 está resuelta) · G-34 dos posts al mes · fase 4 continua | Todos |
| 8 | **Revisión 2** (panel completo) | Carlos + Claude |
| 12 | **Revisión 3**: ¿se cumplen los objetivos de §0? Replanificar | Carlos + Claude |

---

## 10. Pendientes de Andrea

| # | Qué | Para qué tarea | Bloquea |
|---|---|---|---|
| A-1 | Respuestas de G-30 (límites legales, oferta, público) | Fase 3 | Toda la fase 3 |
| A-2 | 2–3 párrafos de experiencia propia sobre voceros | G-05 | Solo la sección "Lo que he visto" |
| A-3 | Revisar los textos nuevos de vocero, agenda setting y off the record | G-05/06/07 | Marcar `reviewed: true` |
| A-4 | Validar los textos de CTA por servicio | G-12 | El CTA contextual |
| A-5 | Revisar la plantilla de comunicado y el checklist de rueda de prensa | G-14 | Los descargables |
| A-6 | Perfiles sociales verificados | G-33 | `sameAs` |
| A-7 | Pendientes de la auditoría 2026-09 (fechas de cargos, fotos propias) | — | E-E-A-T de /sobre-mi |

---

## Estado de ejecución

| Fecha | Commit | Tareas | Notas |
|---|---|---|---|
| 2026-10-09 | `d076ac8` | G-01, G-02, G-03, G-04, G-05, G-06, G-07, G-50, G-51 | Vocero, agenda setting y off the record reescritos sin la sección "Lo que he visto" (pendiente A-2). Fuentes comprobadas: DLE vía búsqueda (dle.rae.es bloquea el acceso automático), DOIs vía Crossref. `reviewed: false` en todas las fichas hasta A-3 |
| 2026-10-09 | `f98e732` | G-08, G-09, G-10, G-13, G-15, G-52 (+ parte de G-12) | 30/30 fichas con seoTitle y seoDescription; descripciones fieles al contenido real de cada ficha. CTA contextual con textos neutros sobre servicios ya publicados (validación de Andrea en A-4). Eventos `glossary_guide_click` y `glossary_service_click` vía `data-track` |
| 2026-10-09 | (este commit) | Ampliación de las 19 fichas cortas | Las 30 fichas tienen ya respuesta destacada, FAQ e índice. Fuentes nuevas comprobadas: Noelle-Neumann 1974 (Crossref), Wardle y Derakhshan 2017 (Shorenstein Center), Ley 996 de 2005 art. 38 (Secretaría del Senado) |

**Pendiente:**
- **Carlos:** G-11 (pedir la indexación de las fichas reescritas), D-01…D-04 y marcar `contact_whatsapp` como evento clave en GA4.
- **Andrea:** A-1…A-7.
- **Código:** evento de envío del formulario de contacto (resto de G-12), G-14 (descargables, espera a A-5) y fase 3 (espera a G-30).
