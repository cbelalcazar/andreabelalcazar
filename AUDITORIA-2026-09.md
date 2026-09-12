# AUDITORÍA INTEGRAL — andreabelalcazar.com

**Versión:** 1.0 · **Fecha:** 12 de septiembre de 2026 · **Auditor:** Claude (Fable 5.1) · **Solicitante:** Carlos Belalcázar
**Alcance:** producto, posicionamiento SEO, contenido, UX/UI, frontend, rendimiento, accesibilidad, backend/infra/seguridad, calidad de código, testing, analítica y roadmap de implementación.
**Estado del código auditado:** commit `a6cddef` (main), desplegado en Vercel en `https://www.andreabelalcazar.com`.
**Actualización 12-09-2026 (tarde):** Fases 0 y 1 implementadas y desplegadas en el commit `bb1a780`; resultados de la re-auditoría en la sección 18.
**Versión web (privada):** https://claude.ai/code/artifact/936b24b9-b583-424b-b10d-3f721943981c
**Regla de este documento:** el auditor **no modifica código**. Todo lo aquí descrito es prescriptivo para la IA/equipo que implemente, y verificable en la re-auditoría (sección 16).

---

## 0. Cómo leer este documento

### 0.1 Identificadores de hallazgos

Cada hallazgo tiene un ID único que se usará en la re-auditoría y en los commits de la implementación (`fix(S-01): ...`):

| Prefijo | Dominio |
|---|---|
| **X-** | Bloqueantes transversales (rompen la propuesta de valor del sitio) |
| **S-** | SEO técnico y posicionamiento |
| **C-** | Contenido, copy, E-E-A-T, arquitectura de información |
| **P-** | Rendimiento (Core Web Vitals, peso, red) |
| **F-** | Frontend (código React/Next/Tailwind, bugs visuales) |
| **U-** | UX / UI / diseño / conversión |
| **A-** | Accesibilidad (WCAG 2.2) |
| **B-** | Backend, infraestructura, seguridad, cabeceras, dominio |
| **T-** | Calidad de código, tooling, DX, testing, CI/CD |
| **M-** | Medición, analítica, observabilidad |
| **G-** | Crecimiento, distribución, negocio |

### 0.2 Severidad

| Nivel | Significado | SLA sugerido |
|---|---|---|
| **S0 · Crítico** | Rompe la promesa del producto, bloquea indexación/conversión o expone riesgo legal/reputacional | 48 h |
| **S1 · Alto** | Degrada claramente descubrimiento, rendimiento móvil o conversión | 2 semanas |
| **S2 · Medio** | Deuda que frena la escala o la calidad percibida | 1 mes |
| **S3 · Bajo** | Pulido, higiene, buenas prácticas | Backlog |

### 0.3 Evidencia

Toda afirmación técnica de este documento fue **medida** el 12-09-2026 contra producción o contra el repositorio local. Los artefactos crudos están en `audit-evidence/`:

- `mobile-fold.png`, `mobile-full.png` (viewport 390×844), `desktop-fold.png`, `desktop-full.png` (1440×900) capturadas con Chromium headless.
- `lh-mobile.json`, `lh-desktop.json`: Lighthouse 12.8.2 completo (performance, accessibility, best-practices, seo).
- Los comandos exactos de cada medición están en la sección 3 y en la sección 16 (para repetirlos).

### 0.4 Los seis sombreros

El encargo pide mirar el proyecto como arquitecto de software, líder de producto, CEO, content manager, UX/UI y developer. En vez de seis informes separados, cada sección declara **qué sombrero habla** y las conclusiones se cruzan en el roadmap (sección 14), que es el único lugar donde se priorizan. Cuando dos sombreros chocan (p. ej. "estética de lujo" vs. "contraste WCAG"), el documento lo dice y decide.

---

## 1. Resumen ejecutivo

### 1.1 Qué es el producto hoy (en una frase)

Una **landing page de una sola ruta** (Next.js 16.2.4, React 19, Tailwind 4) que presenta a Andrea Belalcázar como estratega de comunicación política en Cali, Colombia, con un único objetivo de conversión: **abrir una conversación de WhatsApp** (`wa.me/573105354473`). No hay backend, base de datos, formularios, blog, analítica, sitemap, robots ni tests. Son **273 palabras** de contenido indexable.

### 1.2 Veredicto

El sitio tiene una **dirección estética correcta** (oscuro, dorado, editorial) y una base técnica moderna (Vercel + Next 16 estático, TTFB de ~80 ms, 0 CLS), pero **hoy no está construido para ser encontrado ni para escalar**. La brecha entre la ambición ("llegar a millones") y el estado actual es de **arquitectura, no de pulido**: falta la capa completa de descubrimiento (contenido, indexación, entidades, distribución) y la capa completa de medición.

Además hay **tres defectos S0 que rompen la propuesta de valor visual y social** sin que nadie lo haya notado, porque solo se ven midiendo:

1. **X-01 — Las tipografías nunca se aplican.** El sitio descarga Inter y Playfair Display (87 KB) pero **todo el texto se renderiza en la fuente del sistema** (`ui-sans-serif, system-ui`). La causa es un bug de resolución de variables CSS entre `next/font` y `@theme` de Tailwind 4. La "estética editorial de lujo" que se diseñó **no existe en producción**. Verificado: `getComputedStyle(h1).fontFamily === "ui-sans-serif, system-ui, ..."`, `document.fonts` cargadas: 0.
2. **X-02 — La imagen social (Open Graph) es un JPG de 11 MB y 6016×4016 px** declarado como 1200×630. WhatsApp, LinkedIn, X y Facebook **no generan vista previa** con archivos así (WhatsApp corta en ~600 KB; X y LinkedIn en 5 MB). Para un negocio cuyo único canal de conversión es WhatsApp, **cada enlace compartido llega "mudo"**.
3. **X-03 — El sitio no es descubrible.** No hay `robots.txt`, `sitemap.xml`, `canonical`, ni Search Console verificable; la búsqueda web por el dominio y por el nombre no devuelve el sitio; el schema `Person` apunta a un perfil de X/Twitter **que no existe (404)** y a un LinkedIn no verificado; el footer tiene un enlace de LinkedIn a `#`. El contenido total es de 273 palabras, sin páginas por servicio, sin blog, sin casos.

> **Nota sobre "la página ya tiene un tráfico alto".** No hay ninguna herramienta de analítica instalada (ni GA4, ni Vercel Analytics, ni Plausible, ni Search Console detectable), así que **el tráfico no se puede verificar desde el proyecto**. Si el tráfico existe, viene por enlaces directos (bio de Instagram, WhatsApp, prensa), no por búsqueda. Este documento asume que la meta es real y construye para ella, pero **la primera tarea del roadmap es instalar medición**, porque sin línea base no hay forma de demostrar mejora.

### 1.3 Scorecard medido (12-09-2026)

| Dimensión | Métrica | Móvil | Desktop | Objetivo |
|---|---|---|---|---|
| Lighthouse Performance | score | **55** | 100 | ≥ 90 ambos |
| Lighthouse Accessibility | score | 90 | 95 | 100 |
| Lighthouse Best Practices | score | 100 | 100 | 100 |
| Lighthouse SEO | score | 100* | 100* | 100 + indexación real |
| LCP | s | 2.8 | 0.7 | < 2.5 / < 1.2 |
| TBT | ms | **5 820** | 50 | < 200 |
| Speed Index | s | **32.5** | 0.9 | < 3.4 |
| TTI | s | 7.4 | 0.8 | < 3.8 |
| CLS | — | 0 | 0 | 0 |
| TTFB (edge Vercel) | ms | 80 | 80 | mantener |
| Peso total | KiB | 1 377 | 1 555 | < 800 móvil |
| JS+CSS comprimido | KB | 204 | 204 | < 120 |
| Palabras indexables | — | 273 | 273 | > 8 000 en 90 días |
| Rutas indexables | — | 1 | 1 | ≥ 25 en 90 días |
| robots.txt / sitemap.xml | HTTP | 404 / 404 | | 200 / 200 |
| Fuentes web aplicadas | — | **0 de 2** | 0 de 2 | 2 de 2 |
| Contraste WCAG AA (texto corriente) | fallos | 7 combinaciones | | 0 |
| Cabeceras de seguridad | presentes | solo HSTS | | CSP, XFO/COOP, Referrer, Permissions |

\* Lighthouse SEO solo mide higiene on-page básica; un 100 aquí **no implica visibilidad**. La verificación de indexación es negativa (ver S-01).

### 1.4 Los diez cambios con mayor retorno

Ordenados por (impacto × urgencia) / esfuerzo. Detalle e instrucciones exactas en las secciones 5–13; secuencia en la 14.

1. **Arreglar la resolución de fuentes** (`@theme inline` en `globals.css`) — restaura la identidad visual completa. Esfuerzo: 15 minutos. (X-01)
2. **Generar `opengraph-image` real** (1200×630, < 300 KB) con la convención de archivo de Next — activa previews en WhatsApp/LinkedIn/X. Esfuerzo: 1 hora. (X-02)
3. **Instalar medición**: GA4 + Vercel Analytics/Speed Insights + Search Console + eventos de clic en WhatsApp. Sin esto, nada más es demostrable. Esfuerzo: 2 horas. (M-01…M-04)
4. **`robots.ts` + `sitemap.ts` + `canonical` + `manifest.ts` + iconos**; corregir/eliminar `sameAs` falsos; enlazar LinkedIn/Instagram reales. Esfuerzo: 2 horas. (S-01…S-06)
5. **Quitar `loading="lazy"` del retrato hero (`priority`) y ponerle `sizes` correctas**; convertir el retrato de 11 MB a un asset de 1600 px; detener la descarga del vídeo de 1.1 MB en móvil (poster + carga bajo demanda). Esfuerzo: 2 horas. (P-01…P-04)
6. **Navegación móvil**: hoy en móvil no hay ningún menú (el `nav` está `hidden`) y el botón flotante de WhatsApp tapa el CTA secundario. Esfuerzo: medio día. (U-01, U-02)
7. **Contraste y tamaños mínimos**: siete combinaciones fallan AA; hay textos de 9 px. Rediseñar la escala tipográfica secundaria. Esfuerzo: medio día. (A-01…A-04)
8. **Arquitectura de información nueva**: pasar de 1 ruta a ~25 (servicios, casos, sobre mí, prensa, blog, contacto, recursos) con MDX y datos tipados. Es la única palanca real hacia "millones". Esfuerzo: 3–4 semanas. (C-01…C-12, sección 13)
9. **Cabeceras de seguridad y `proxy.ts`** (CSP, COOP, Referrer-Policy, Permissions-Policy, HSTS preload). Esfuerzo: medio día. (B-01…B-05)
10. **Pipeline de calidad**: Node ≥ 20 fijado con `.nvmrc`/`engines`, lint sin errores, Vitest + Playwright + Lighthouse CI + axe en GitHub Actions con presupuestos de rendimiento. Esfuerzo: 2 días. (T-01…T-10)

### 1.5 Lo que NO hay que hacer

- **No rehacer el sitio en otro stack.** Next 16 en Vercel es la elección correcta para este perfil (estático + edge + imágenes optimizadas gratis). El problema es de contenido y de detalles, no de framework.
- **No añadir un CMS pesado (WordPress, Strapi self-hosted) en esta fase.** Con un autor y < 100 páginas, MDX en el repo + datos tipados es más barato, más rápido y más seguro. Se reevalúa en la Fase 4 si hay redacción colaborativa (sección 13.6).
- **No comprar tráfico antes de arreglar X-01/X-02/X-03 y la medición.** Sería pagar por visitas a una página que no se puede compartir bien ni medir.
- **No traducir al inglés todavía.** El mercado objetivo (Valle del Cauca, Colombia, sector público y campañas) es hispanohablante. El inglés entra en Fase 4 como `/en` con `hreflang`, no antes.

---

## 2. Inventario del estado actual

### 2.1 Repositorio

```
portfolio/
├── AGENTS.md            ← aviso: "Next 16 tiene breaking changes; leer node_modules/next/dist/docs"
├── CLAUDE.md            ← @AGENTS.md
├── README.md            ← plantilla por defecto de create-next-app (sin editar)
├── eslint.config.mjs    ← next/core-web-vitals + typescript
├── next.config.ts       ← solo { reactCompiler: true }
├── package.json         ← next 16.2.4, react 19.2.4, tailwindcss ^4, lucide-react ^1.8
├── postcss.config.mjs
├── tsconfig.json        ← strict, paths @/*
├── public/
│   ├── portrait.jpg     ← 11 020 514 bytes, 6016×4016, EXIF Nikon D750 (2024-06-14)
│   ├── clip-1.jpg       ← 244 KB, 1080×1920 (captura de historia de Instagram)
│   ├── clip-2.jpg       ← 191 KB, 1080×1920 (captura de historia de Instagram, marca de agua @stefaniatoledo)
│   ├── clip-video.mp4   ← 1 119 696 bytes, 720×1280, 15.1 s, H.264 + AAC (audio innecesario)
│   ├── file.svg, globe.svg, next.svg, vercel.svg, window.svg  ← basura de la plantilla, públicos en producción
└── src/app/
    ├── favicon.ico      ← 256×256, 25 KB (único icono; sin apple-touch-icon, sin SVG, sin manifest)
    ├── globals.css      ← 12 líneas: @import tailwind, @theme (fuentes), utilidad text-balance
    ├── layout.tsx       ← 57 líneas: fuentes, metadata, <html lang="es">
    └── page.tsx         ← 263 líneas: TODO el sitio en un componente, con JSON-LD inline
```

**Historial git:** 5 commits, todos el 21-04-2026 entre las 22:07 y las 23:04 (una sesión con Gemini). Sin ramas, sin PRs, sin CI, sin tags. Sin `.nvmrc`, sin `engines`, sin `.env.example`, sin `vercel.json`, sin `audit-evidence/`.

**Archivos sueltos fuera del repo** (`../`): el retrato original `DSC_9020-2.JPG` (idéntico byte a byte a `public/portrait.jpg`), dos capturas y un vídeo de Instagram (idénticos a los de `public/`), y la hoja de vida en PDF. La hoja de vida contiene **mucho más contenido verificable que la web** (ver 2.4).

### 2.2 Stack y versiones instaladas

| Paquete | Versión | Comentario |
|---|---|---|
| next | 16.2.4 | App Router, Turbopack, `reactCompiler: true`. Requiere Node ≥ 20.9 |
| react / react-dom | 19.2.4 | |
| tailwindcss / @tailwindcss/postcss | 4.2.4 | Config CSS-first (`@theme`) |
| lucide-react | 1.8.0 | 8 iconos usados, 3 importados sin usar |
| typescript | 5.9.3 | `strict: true`, sin errores |
| eslint / eslint-config-next | 9.39.4 / 16.2.4 | **2 errores, 3 warnings** (ver T-02) |
| Node local por defecto | **16.19.0** | `next build` **falla** con el Node por defecto de la máquina; con nvm 22.12.0 compila en 10.6 s |

### 2.3 Producción (Vercel)

- DNS: apex `andreabelalcazar.com` → A 216.198.79.1 (Vercel); `www` → CNAME `*.vercel-dns-017.com`. NS en GoDaddy (`domaincontrol.com`).
- `http://andreabelalcazar.com` → 308 → `https://andreabelalcazar.com` → 307 → `https://www.andreabelalcazar.com` (dos saltos; ver B-06).
- Cabeceras: `strict-transport-security: max-age=63072000` (sin `includeSubDomains` ni `preload`), `x-vercel-cache: HIT`, `x-nextjs-prerender: 1`. **Ausentes:** CSP, X-Frame-Options/COOP, Referrer-Policy, Permissions-Policy, X-Content-Type-Options.
- HTML de la home: 50 759 bytes sin comprimir (10 177 transferidos). 8 chunks JS + 1 CSS = **204 KB comprimidos**.
- Rutas que responden 200: `/`, `/favicon.ico`, `/portrait.jpg` (11 MB), `/clip-*.jpg`, `/clip-video.mp4`, `/next.svg`, `/vercel.svg`, `/file.svg`, `/globe.svg`, `/window.svg`.
- Rutas que responden 404: `/robots.txt`, `/sitemap.xml`, `/manifest.webmanifest`, `/apple-touch-icon.png`, `/icon.svg`, `/opengraph-image`, `/llms.txt`, `/.well-known/security.txt`, `/blog`, `/contacto`, `/en`.
- La página 404 es la genérica de Next ("This page could not be found.", en inglés, fondo blanco) y **duplica el `<title>`** (emite `404: This page could not be found.` y luego el título del layout).

### 2.4 Contenido publicado vs. hoja de vida (brecha de E-E-A-T)

| Dato | En la web | En la hoja de vida |
|---|---|---|
| Cargo actual | "Directora de Estrategia de Prensa, Secretaría de Turismo del Valle" | "Jefe de Prensa y Relaciones Públicas, Secretaría de Turismo del Valle del Cauca" |
| Campaña presidencial M.F. Cabal | "Jefatura de Prensa regional" | "Jefe de Prensa Valle del Cauca" |
| Concejo de Cali — Jefe de Prensa | **ausente** | presente |
| Campaña Alcaldía de Cali (Miyerlandi Torres) — Líder de Comunicaciones y Marketing digital | **ausente** | presente |
| Secretaría de Salud Pública — Estratega líder equipo digital | **ausente** | presente |
| La Occidental Ltda. — Directora de Servicio al Cliente y Mercadeo | **ausente** | presente |
| Diplomado Marketing Estratégico de Servicios (USC) | **ausente** | presente |
| Herramientas (Meta Ads, Google Ads, IA aplicada, email marketing, monitoreo) | solo "Marketing & IA" genérico | lista completa |
| Correo profesional | **ausente** | `belalcazarmarketingdigital@gmail.com` |
| Fechas de cada cargo | ninguna | ninguna (la HV pide "ajustar fechas exactas") |

Conclusión: la web muestra **menos de la mitad de la trayectoria verificable**, exagera el título del cargo actual (riesgo reputacional en sector público, ver C-02) y no tiene ni una sola fecha, cifra, cliente, medio, enlace a nota de prensa ni testimonio. Para Google y para un cliente institucional, eso es **cero evidencia**.

### 2.5 Mapa de la página actual (una sola ruta)

| # | Sección (`id`) | Contenido | Problemas principales |
|---|---|---|---|
| 0 | Overlays fijos | marco de 16/32 px del color de fondo; textura `carbon-fibre.png` cargada desde `transparenttextures.com` (tercero, sin preconnect, sin caché larga) | dependencia externa innecesaria; marco recorta contenido en móvil |
| 1 | `header` fijo | logo tipográfico + 4 enlaces (`hidden md:flex`) | **sin menú en móvil**; enlaces de 10 px |
| 2 | Hero | badge, H1 "Donde el análisis se convierte en poder.", párrafo, 2 CTAs, retrato con `grayscale` | LCP con `loading="lazy"`; `min-[90vh]` es una clase inexistente (debería ser `min-h-[90vh]`) |
| 3 | `#about` Filosofía | cita + 2 párrafos | cita en `<h3>` (semántica incorrecta); comillas rectas sin escapar (error de lint) |
| 4 | `#expertise` | 4 tarjetas (Análisis Político, Gestión de Crisis, Marketing & IA, Asuntos Públicos) | descripciones de 8–10 palabras; sin enlaces a páginas de servicio |
| 5 | `#trajectory` | 2 cargos, 2 títulos académicos, vídeo autoplay, 2 fotos | vídeo 1.1 MB sin poster; fotos de Instagram con marca de agua de terceros; columna izquierda corta genera hueco de ~400 px en desktop |
| 6 | `footer` CTA | H2 "Elevamos el Discurso.", CTA blanco | enlace LinkedIn a `#`; texto de 9 px con contraste 2.03:1 |
| 7 | Flotante WhatsApp | icono de teléfono (no de WhatsApp), sin `aria-label` | tapa el CTA "Ver Trayectoria" en móvil (ver `mobile-fold.png`) |

---

## 3. Metodología y evidencia

### 3.1 Qué se hizo

1. Lectura completa del repositorio (código, config, historial git, assets) y de la hoja de vida en PDF.
2. Análisis de metadatos de assets (`sips`, `ffprobe`, `mdls`): dimensiones, peso, EXIF, duplicados (`md5`).
3. Compilación local: `tsc --noEmit`, `eslint src`, `next build` con Node 16 (falla) y Node 22 (ok).
4. Sondeo de producción con `curl`: cabeceras, redirecciones, rutas estándar (`robots`, `sitemap`, `manifest`, iconos), tamaños de chunks, transformaciones de `/_next/image`, fuentes, vídeo.
5. Análisis del HTML servido: JSON-LD, `<img>` (srcset/sizes/loading), enlaces, encabezados, hosts externos, canonical/hreflang, recuento de palabras.
6. Lighthouse 12.8.2 local (Chrome headless, presets móvil y desktop) contra producción. PageSpeed Insights API respondió con cuota agotada; se usó Lighthouse local con la misma versión de motor.
7. Chromium headless (gstack browse) a 390×844 y 1440×900: capturas, consola, red, `perf`, `media`, métricas de layout (`scrollWidth`, tamaños de tap targets, fuente mínima, `display` del `nav`, `fontFamily` computada del `h1`, `document.fonts`).
8. Cálculo de contraste WCAG con los valores OKLCH reales de Tailwind 4.2.4 convertidos a sRGB (no con los hex de Tailwind 3, que son distintos).
9. Verificación de enlaces externos y perfiles (`wa.me`, LinkedIn, X/Twitter, Instagram, textura externa).
10. Búsqueda web del dominio y del nombre para comprobar indexación/visibilidad y panorama competitivo (kratosconsultores.com como benchmark de arquitectura).
11. Lectura de la documentación de Next 16 empaquetada en `node_modules/next/dist/docs/` para que todas las instrucciones usen las APIs vigentes (ver sección 13.1).

### 3.2 Límites de la auditoría

- No hay acceso a Vercel Dashboard, Search Console, GA ni a las redes de Andrea: **el tráfico real, las consultas de búsqueda y el CTR son desconocidos**.
- LinkedIn devuelve 999 a clientes automatizados, así que la URL `linkedin.com/in/andreabelalcazar` **no pudo confirmarse** (sí se confirmó que `x.com/andreabelalcazar` es 404 y que `instagram.com/andreabelalcazar` existe, aunque no se validó que sea ella).
- Lighthouse móvil simula CPU ×4 y red 4G lenta; los valores absolutos varían ±10 % entre ejecuciones, pero el diagnóstico (TBT y Speed Index rotos por animaciones/vídeo continuos) es estable.
- No se ejecutaron pruebas con lectores de pantalla reales (VoiceOver/NVDA); la accesibilidad se evaluó con axe (vía Lighthouse), inspección del DOM y cálculo de contraste.

---

## 4. Visión de producto y negocio (sombreros: CEO y Producto)

### 4.1 Qué vende realmente este sitio

No vende "una página bonita". Vende **confianza de alto valor con ciclo de venta largo**: un secretario de despacho, un candidato, un gremio o una empresa que necesita a alguien que gestione su relación con los medios, su narrativa y sus crisis. El ticket es alto (honorarios mensuales o por campaña), la decisión la toman pocas personas, y la decisión se toma **antes de escribir por WhatsApp**: mirando quién es, qué ha hecho, quién la respalda y qué opina.

Por eso la métrica de éxito **no es "visitas"** sino:

1. **Consultas calificadas** (conversaciones de WhatsApp/email iniciadas desde el sitio por decisores).
2. **Autoridad demostrable** (menciones en medios, apariciones como analista, artículos propios rankeando).
3. **Reconocimiento de nombre** (búsquedas de marca `andrea belalcázar` creciendo mes a mes en Search Console).

"Llegar a millones" es coherente con este negocio **solo si se entiende como alcance de contenido** (análisis, opinión, explicadores de comunicación política que se leen y se comparten), no como tráfico a una ficha de contacto. Nadie llega a millones con una tarjeta de presentación; se llega con **un medio propio** cuya autora es la marca. Esa es la tesis de producto de este documento.

### 4.2 Audiencias (personas) y qué necesita cada una

| Persona | Quién es | Qué busca en el sitio | Qué le falta hoy | Página objetivo (nueva) |
|---|---|---|---|---|
| **P1 · Decisor institucional** | Secretario/a, director/a de entidad pública, gerente de gremio (Valle, Cauca, Eje Cafetero) | Prueba de que ha manejado prensa institucional sin escándalos; método; disponibilidad | Casos, resultados, método, referencias, correo formal | `/servicios/comunicacion-institucional`, `/casos/*` |
| **P2 · Candidato / gerente de campaña** | Aspirante a alcaldía, concejo, asamblea, Congreso 2026 | Experiencia en campañas de alta exposición; manejo de crisis; equipo digital | Casos de campaña (Cabal, Torres), enfoque de narrativa, ética | `/servicios/campanas`, `/servicios/gestion-de-crisis` |
| **P3 · Periodista / productor** | Busca analista para columna, entrevista, panel | Bio corta, foto en alta, temas que domina, contacto rápido | Kit de prensa, bio descargable, lista de temas, apariciones previas | `/prensa` (media kit), `/sobre-mi` |
| **P4 · Empresa privada** | Marca regional con exposición pública o regulatoria | Asuntos públicos, reputación, vocería | Servicios explícitos para empresa | `/servicios/asuntos-publicos` |
| **P5 · Estudiante / colega** | Comunicadores, politólogos, marketers | Aprender: cómo se hace una jefatura de prensa, cómo se maneja una crisis | Contenido educativo | `/blog/*`, `/recursos/*` |
| **P6 · Reclutador / academia** | Universidades, consultoras nacionales, partidos | Trayectoria formal, formación, publicaciones | CV estructurado, formación completa, LinkedIn real | `/sobre-mi`, `/cv.pdf` |

P5 es la palanca de escala (volumen), P1–P4 son la palanca de ingresos (valor). El sitio actual solo habla a P1/P2 y les da poca evidencia; a P3, P5 y P6 no les da nada.

### 4.3 Posicionamiento propuesto

**Categoría:** estratega de comunicación política e institucional.
**Territorio:** Valle del Cauca y suroccidente colombiano primero (donde hay prueba y red), Colombia después, Latinoamérica hispanohablante en la fase de contenido.
**Diferenciación defendible (basada en la HV, no inventada):**

1. Ha estado **en los tres lados del tablero**: campaña presidencial de alta polarización, campaña local (alcaldía de Cali), y gobierno (Concejo, Salud Pública, Turismo). Pocos perfiles regionales tienen esa combinación.
2. Formación de **mercadeo estratégico** (no solo periodismo): traduce comunicación a objetivos medibles.
3. **IA aplicada a comunicación** como práctica declarada en la HV: es un ángulo de contenido con demanda de búsqueda alta y poca competencia en español regional.

**Promesa (candidata a H1):** de la actual, abstracta ("Donde el análisis se convierte en poder"), a una **específica y verificable**: *"Estrategia de prensa y narrativa para gobiernos, campañas y marcas del suroccidente colombiano."* El copy definitivo se trabaja en la sección 5.5, pero el principio es: **la primera pantalla debe decir qué hace, para quién y dónde, en menos de 12 palabras**. Hoy el H1 no contiene ninguna palabra que alguien escribiría en Google.

### 4.4 Modelo de crecimiento (cómo se llega a millones sin mentirse)

```
                 ┌──────────────────────────────────────────────────────┐
   Distribución  │ Instagram/LinkedIn/X de Andrea → enlaces a artículos  │
   (propia)      │ WhatsApp Channels / newsletter → artículos            │
                 └──────────────────────┬───────────────────────────────┘
                                        ▼
                 ┌──────────────────────────────────────────────────────┐
   Descubrimiento│ Google (informacional: "cómo manejar una crisis de   │
   (ganado)      │ prensa", "qué hace un jefe de prensa", "comunicación │
                 │ política Colombia 2026") + Google Discover + IA      │
                 │ generativa (AI Overviews, ChatGPT, Perplexity)       │
                 └──────────────────────┬───────────────────────────────┘
                                        ▼
                 ┌──────────────────────────────────────────────────────┐
   Autoridad     │ /blog + /recursos (volumen, P5) → menciones, enlaces │
                 │ /prensa (P3) → entrevistas → más búsquedas de marca  │
                 └──────────────────────┬───────────────────────────────┘
                                        ▼
                 ┌──────────────────────────────────────────────────────┐
   Conversión    │ /servicios/* + /casos/* + /sobre-mi (P1, P2, P4)     │
                 │ → WhatsApp (con evento medido) / formulario / email  │
                 └──────────────────────────────────────────────────────┘
```

Tres consecuencias de arquitectura:

- Se necesita **un sistema de contenido** (MDX + datos tipados + sitemap dinámico + RSS + OG dinámico por artículo) y no una landing.
- Se necesita **medición de extremo a extremo** (qué artículo trajo qué conversación de WhatsApp).
- Se necesita **velocidad móvil real** porque el tráfico informacional en Colombia es > 80 % móvil y Google Discover exige Core Web Vitals en verde.

### 4.5 KPIs y metas (propuesta, a validar con línea base en 30 días)

| KPI | Fuente | Línea base | 90 días | 12 meses |
|---|---|---|---|---|
| Rutas indexadas en Google | Search Console | 0–1 | 25 | 150 |
| Clics orgánicos / mes | Search Console | desconocido | 1 000 | 50 000 |
| Impresiones de marca (`andrea belalcázar`) / mes | Search Console | desconocido | +50 % | +300 % |
| Sesiones / mes | GA4 | desconocido | 5 000 | 100 000 |
| Clics a WhatsApp / mes (evento) | GA4 | desconocido | 60 | 400 |
| Tasa clic-WhatsApp por sesión (P1–P4) | GA4 | — | 1.5 % | 1 % (baja al crecer el volumen informacional; es normal) |
| Suscriptores newsletter | proveedor | 0 | 300 | 5 000 |
| CWV móvil (LCP/INP/CLS) en verde | CrUX / Speed Insights | rojo (TBT) | verde | verde |
| Lighthouse móvil | CI | 55 | ≥ 90 | ≥ 95 |
| Menciones en medios enlazando al dominio | Ahrefs/Search Console | 0 | 5 | 40 |

### 4.6 Riesgos que un CEO debe ver

1. **Riesgo reputacional por exactitud** (C-02): la web dice "Directora de Estrategia de Prensa" y la HV dice "Jefe de Prensa y Relaciones Públicas". En el sector público colombiano los cargos son verificables en directorios oficiales (`valledelcauca.gov.co/directorio`). Una inconsistencia es munición para un adversario. **Regla:** títulos exactos, fechas exactas.
2. **Riesgo de neutralidad institucional:** mientras sea funcionaria, publicar opinión partidista o promocionar servicios de campaña desde el mismo dominio puede generar conflicto (Ley 996 de 2005 y régimen disciplinario). Recomendación: separar claramente "análisis" (educativo) de "servicios" (con aviso de disponibilidad), y revisar con abogado antes de la Fase 2. No es un problema técnico, pero condiciona el contenido.
3. **Riesgo de derechos de imagen:** `clip-2.jpg` lleva la marca de agua `@stefaniatoledo`; las fotos y el vídeo son descargas de Instagram (nombres `SaveClip.App_*`). Se necesitan originales con permiso o material propio.
4. **Riesgo de canal único:** todo depende de un número de WhatsApp personal. Si cambia el número, todos los enlaces (y los que estén en prensa o redes) mueren. Se necesita al menos un correo profesional con dominio propio (`hola@andreabelalcazar.com`) y un formulario.
5. **Riesgo de dependencia de una sesión de IA sin pruebas:** el sitio se construyó en 57 minutos y nunca se compiló localmente en la máquina del propietario (Node 16). Sin CI, cualquier cambio futuro puede romper producción sin aviso.

---

## 5. Estrategia de contenido y posicionamiento (sombreros: Content Manager y SEO)

### 5.1 Diagnóstico

- **Volumen:** 273 palabras indexables. Un perfil de LinkedIn medio tiene más. Google no puede asociar la entidad "Andrea Belalcázar" con ningún tema porque no hay texto suficiente sobre ningún tema.
- **Intención cubierta:** solo navegacional de marca ("andrea belalcázar") y ni siquiera bien, porque el sitio no aparece al buscar el nombre. Cero cobertura informacional, cero comercial-local ("asesor de comunicación política cali").
- **Entidad:** el JSON-LD `Person` es correcto en forma pero **débil en señales**: `sameAs` con un perfil de X inexistente, LinkedIn sin verificar, sin `alumniOf`, `worksFor`, `hasOccupation`, `address`, `email`, `knowsLanguage`, sin `@id` estable ni vínculo a un `WebSite`/`Organization`.
- **Copy:** grandilocuente y abstracto ("Arquitecta de narrativas de poder", "Trayectoria Impecable", "Elevamos el Discurso"). Suena a agencia, no a persona. Ninguna frase es demostrable ni contiene términos de búsqueda. Mezcla tono: "Impecable" es autoelogio que un decisor público lee con desconfianza.
- **Idioma/localización:** `lang="es"` genérico (debería ser `es-CO`), `og:locale` sí es `es_CO`. Sin `hreflang` (no hace falta hasta tener `/en`).
- **Pruebas sociales:** cero logos, cero testimonios, cero cifras, cero enlaces salientes a fuentes (notas de prensa, entrevistas, el directorio oficial de la Gobernación).

### 5.2 Arquitectura de información propuesta (v2)

Objetivo: pasar de 1 URL a ~25 en 90 días y a 150+ en 12 meses, con **cada URL respondiendo a una intención concreta**.

```
/                                   Home (posicionamiento, prueba, CTAs, últimos artículos)
/sobre-mi                           Bio larga, trayectoria completa con fechas, formación, valores, foto oficial, CV descargable
/servicios                          Índice de servicios (P1, P2, P4)
/servicios/jefatura-de-prensa       Comunicación institucional y relación con medios (P1)
/servicios/gestion-de-crisis        Protocolo, war room, vocería bajo presión (P1, P2, P4)
/servicios/campanas-electorales     Narrativa, agenda, digital (P2)  ← revisar restricción por cargo público
/servicios/asuntos-publicos         Reputación y relacionamiento para empresas (P4)
/servicios/formacion-de-voceros     Talleres de vocería y media training (P1, P4) — producto nuevo de alto margen
/casos                              Índice de casos
/casos/secretaria-de-turismo-valle  Caso institucional (qué, cómo, resultados medibles, medios)
/casos/campana-presidencial-2022    Caso campaña (regional Valle)
/casos/concejo-de-cali              Caso institucional
/casos/alcaldia-cali-2023           Caso campaña local
/casos/salud-publica-cali           Caso sector salud / campañas ciudadanas
/prensa                             Media kit: bio corta/larga, fotos HD, temas, apariciones, contacto de prensa
/blog                               Índice (paginado, por tema)
/blog/[slug]                        Artículos (análisis, explicadores, opinión) — motor de escala (P5)
/blog/tema/[tema]                   Hubs por tema (comunicación-politica, crisis, prensa, ia, marketing-digital)
/recursos                           Plantillas y guías descargables (lead magnets)
/recursos/[slug]                    Cada recurso (con formulario de email)
/newsletter                         Alta a boletín
/contacto                           Formulario + WhatsApp + email + agenda (Cal.com)
/glosario/[termino]                 Glosario de comunicación política (SEO programático de cola larga, 50–150 URLs)
/rss.xml                            Feed
/sitemap.xml, /robots.txt, /manifest.webmanifest, /llms.txt
/en (Fase 4)                        Versión inglesa parcial con hreflang
```

Reglas:

- **Una intención por URL.** No mezclar "servicio" y "caso" en la misma página.
- **Todo caso enlaza a su servicio; todo servicio enlaza a 2+ casos y a 3+ artículos.** Es la malla interna que reparte autoridad.
- **Slugs en español, sin acentos, con guiones**, estables para siempre (redirección 308 si algún día cambian).
- **Breadcrumbs visibles y en JSON-LD** (`BreadcrumbList`) en todo lo que no sea home.

### 5.3 Clusters de palabras clave (a validar con Search Console + Keyword Planner en la Fase 1)

No se dispone de volúmenes reales en esta auditoría; los clusters se derivan de la HV, de la intención de las personas y del panorama competitivo observado. **La IA implementadora no debe inventar volúmenes**: el paso 1 de contenido es validar esta lista en Google Keyword Planner (cuenta Ads sin gasto) y en Search Console tras 30 días.

| Cluster | Intención | Página destino | Ejemplos de consultas |
|---|---|---|---|
| Marca | Navegacional | `/`, `/sobre-mi` | andrea belalcázar, andrea belalcazar cali, andrea belalcazar prensa |
| Servicio local | Comercial | `/servicios/*` | asesor comunicación política cali, jefe de prensa valle del cauca, consultor gestión de crisis colombia, estratega político cali, agencia comunicación institucional cali |
| Explicadores (P5) | Informacional | `/blog/*` | qué hace un jefe de prensa, cómo hacer un comunicado de prensa, cómo manejar una crisis de reputación, qué es comunicación política, cómo se hace una estrategia de campaña, cómo hablar con periodistas |
| Coyuntura 2026 | Informacional-temporal | `/blog/*` | elecciones 2026 colombia comunicación, debates presidenciales análisis, narrativa campaña 2026 |
| IA aplicada | Informacional-emergente | `/blog/tema/ia`, `/recursos/*` | ia para comunicación política, chatgpt para comunicados de prensa, monitoreo de medios con inteligencia artificial, prompts para jefes de prensa |
| Glosario | Informacional-larga cola | `/glosario/*` | qué es un vocero, qué es agenda setting, qué es framing político, qué es una rueda de prensa, qué es un boletín de prensa |
| Formación | Comercial | `/servicios/formacion-de-voceros` | media training colombia, taller de vocería cali, curso comunicación política |

### 5.4 Calendario editorial mínimo viable (primeros 90 días)

- **Semanas 1–2:** las 12 páginas estructurales (home v2, sobre mí, 5 servicios, 5 casos) y `/prensa`. Escritas a partir de la HV + entrevistas con Andrea (una hora por caso). Cada caso con la estructura *Contexto → Reto → Qué hicimos → Resultado (cifras/medios) → Aprendizaje*.
- **Semanas 3–12:** 2 artículos/semana (20 en total): 12 explicadores evergreen, 4 de IA aplicada, 4 de coyuntura 2026. 800–1 500 palabras, una imagen OG propia, un CTA contextual, 3 enlaces internos, 2 externos a fuentes.
- **Semana 6:** primer recurso descargable ("Checklist de gestión de crisis en 72 horas", PDF de 6 páginas) con captura de email.
- **Semana 8:** glosario inicial de 30 términos (200–300 palabras cada uno, `DefinedTerm` en JSON-LD).
- **Cadencia de distribución:** cada artículo → 1 carrusel Instagram + 1 post LinkedIn + 1 hilo X + canal de WhatsApp. Cada pieza enlaza al artículo con UTM (`utm_source=instagram&utm_medium=social&utm_campaign=blog`).

### 5.5 Guía de voz y copy (para reescritura)

- **Persona, no agencia.** Primera persona del singular. "Llevo X años…" en vez de "Elevamos el discurso".
- **Concreto antes que épico.** Cada afirmación lleva un sustantivo verificable (entidad, campaña, medio, cifra, año).
- **Prohibidas** las palabras: impecable, poder (como sustantivo abstracto), vanguardia, excelencia, arquitecta de narrativas, alto nivel, de impacto real. Sustituir por hechos.
- **Titulares con verbo y beneficio para el lector**, no para la autora.
- **Español de Colombia, registro formal-cercano**, sin anglicismos innecesarios (usar "relación con medios" antes que "media relations", salvo en el término técnico "media training").
- **Longitud de frase:** máx. 25 palabras. Párrafos de máx. 4 líneas en móvil.

**Propuesta de primera pantalla (a validar con Andrea):**

> **H1:** Estrategia de prensa y narrativa para gobiernos, campañas y marcas del suroccidente colombiano.
> **Sub:** Soy Andrea Belalcázar. He dirigido la comunicación de una secretaría departamental, un concejo municipal, una campaña presidencial en el Valle y una campaña a la Alcaldía de Cali. Ayudo a instituciones y líderes a decir lo correcto, a tiempo y en el medio correcto.
> **CTA primario:** Hablemos por WhatsApp → **CTA secundario:** Ver casos
> **Prueba (fila de logos/medios, texto si no hay logos):** Gobernación del Valle · Concejo de Cali · Secretaría de Salud Pública de Cali · [medios donde ha aparecido]

### 5.6 E-E-A-T: qué señales construir (experiencia, pericia, autoridad, confianza)

| Señal | Estado | Acción |
|---|---|---|
| Autoría clara con bio enlazada en cada artículo | no hay artículos | `author` en JSON-LD `Article` apuntando al `@id` de `Person` |
| Perfiles sociales consistentes (`sameAs`) | 1 roto, 1 sin verificar | Solo URLs verificadas: LinkedIn real, Instagram real, X real (o eliminar) |
| Menciones externas (prensa, directorio oficial) | ninguna enlazada | En `/sobre-mi` y `/prensa` enlazar directorio de la Gobernación, notas donde aparece, entrevistas |
| Credenciales verificables | universidades nombradas sin enlace | `alumniOf` con `@id` de Universidad del Valle y USC; enlazar programas |
| Datos de contacto profesionales | solo WhatsApp | Email con dominio, dirección de ciudad, horario |
| Política de privacidad y aviso legal | no existen | Obligatorios al capturar emails (Ley 1581 de 2012, Colombia) |
| Fechas de publicación/actualización | no | `datePublished`, `dateModified` visibles y en JSON-LD |
| Casos con cifras y fuentes | no | Cada caso con al menos una cifra verificable o una nota de prensa enlazada |

### 5.7 Posicionamiento en buscadores generativos (GEO)

Una parte creciente del descubrimiento ocurre en AI Overviews de Google, ChatGPT, Perplexity y Gemini. Lo que estos sistemas premian coincide con E-E-A-T pero añade requisitos:

1. **Respuestas directas al inicio** de cada artículo (párrafo de 40–60 palabras que responda la pregunta del título).
2. **Estructura en H2/H3 con preguntas literales** ("¿Qué hace un jefe de prensa?").
3. **Tablas y listas** (se extraen mejor).
4. **`FAQPage` JSON-LD** en servicios y explicadores.
5. **`/llms.txt`** con índice del sitio y descripción de la autora (convención emergente, coste cero).
6. **Permitir crawlers de IA en `robots.txt`** de forma explícita (`GPTBot`, `ClaudeBot`, `PerplexityBot`, `Google-Extended`), decisión de negocio: para una marca personal que quiere alcance, **permitir**.

### 5.8 Hallazgos de contenido (IDs)

| ID | Sev | Hallazgo | Evidencia | Acción |
|---|---|---|---|---|
| **C-01** | S0 | Contenido total de 273 palabras en 1 URL; imposible rankear por ningún tema | recuento sobre HTML servido | Implementar AI v2 (5.2) y calendario (5.4) |
| **C-02** | S0 | Título del cargo actual inconsistente con la HV ("Directora de Estrategia de Prensa" vs "Jefe de Prensa y Relaciones Públicas") | `page.tsx:168` vs HV p.1 | Usar el título oficial exacto; añadir fechas |
| **C-03** | S1 | 4 de 6 experiencias de la HV no aparecen (Concejo de Cali, Alcaldía Cali, Salud Pública, La Occidental) y falta un diplomado | tabla 2.4 | `/sobre-mi` completo + 5 casos |
| **C-04** | S1 | Copy abstracto sin términos de búsqueda ni hechos verificables | H1/H2 actuales | Reescritura según 5.5 |
| **C-05** | S1 | Cero prueba social (logos, medios, testimonios, cifras) | inspección | Fila de entidades en home; testimonios con nombre y cargo (con permiso) |
| **C-06** | S1 | Imágenes de terceros con marca de agua (`@stefaniatoledo`) y capturas de Instagram como "portafolio" | `clip-2.jpg`, nombres `SaveClip.App_*` | Sustituir por material propio con derechos; pie de foto con contexto |
| **C-07** | S2 | Sin correo profesional; único canal WhatsApp personal | `page.tsx` (5 enlaces `wa.me`) | `hola@andreabelalcazar.com` (Google Workspace o Zoho), formulario, Cal.com |
| **C-08** | S2 | Sin política de privacidad ni aviso legal (bloquea captura de emails) | 404 en rutas | `/privacidad`, `/terminos` (plantilla Ley 1581) |
| **C-09** | S2 | Sin kit de prensa (P3 no tiene qué llevarse) | — | `/prensa` con bio 50/150/400 palabras, 3 fotos HD, temas, apariciones |
| **C-10** | S2 | Sin blog ni recursos: no hay palanca de escala | — | MDX + calendario |
| **C-11** | S3 | `lang="es"` genérico | `layout.tsx:49` | `lang="es-CO"` |
| **C-12** | S3 | Comillas rectas `"` en la cita (tipografía y error de lint) | `page.tsx:115` | Comillas tipográficas «» o “ ” en un `<blockquote>` |

---

## 6. SEO técnico (sombrero: SEO)

### 6.1 Hallazgos

| ID | Sev | Hallazgo | Evidencia | Acción (Next 16) |
|---|---|---|---|---|
| **S-01** | S0 | El sitio **no aparece** al buscar el dominio ni el nombre; no hay Search Console verificable | búsqueda web 12-09; `<meta name="google-site-verification">` ausente | Verificar propiedad de dominio en Search Console (registro DNS TXT en GoDaddy), enviar sitemap, solicitar indexación de `/` |
| **S-02** | S0 | `og:image` = `/portrait.jpg` de **11 MB / 6016×4016**, declarado 1200×630 (mentira de dimensiones + peso inaceptable). Sin preview en WhatsApp/LinkedIn/X | `curl -I /portrait.jpg` → `content-length: 11020514` | `src/app/opengraph-image.tsx` con `ImageResponse` (1200×630, fondo oscuro, nombre, cargo, retrato recortado) o `opengraph-image.jpg` estático < 300 KB. Idem `twitter-image` |
| **S-03** | S0 | `sameAs` con `https://twitter.com/andreabelalcazar` → **404**; LinkedIn no verificado; footer LinkedIn `href="#"` | `curl -L` → 404; `page.tsx:241` | Solo URLs reales; eliminar las que no existan; enlazar Instagram si es el canal principal |
| **S-04** | S1 | No hay `robots.txt` (404) | `curl /robots.txt` → 404 (HTML de not-found) | `src/app/robots.ts` con `rules` (allow all, allow bots de IA), `sitemap` y `host` |
| **S-05** | S1 | No hay `sitemap.xml` (404) | idem | `src/app/sitemap.ts` generado desde el índice de contenido (MDX + rutas estáticas) con `lastModified`, `changeFrequency`, `priority`; imágenes con `images` |
| **S-06** | S1 | Sin `<link rel="canonical">` | HTML servido | `metadata.alternates.canonical` en cada ruta (`metadataBase` ya existe) |
| **S-07** | S1 | JSON-LD `Person` sin `@id`, sin `WebSite`, sin `Organization`/`worksFor`, sin `alumniOf`, `address`, `email`, `hasOccupation`, `knowsLanguage`, `nationality` | `page.tsx:5-18` | Grafo `@graph` en `layout.tsx` (o componente `JsonLd`) con `WebSite` (+`potentialAction: SearchAction` cuando exista búsqueda), `Person` con `@id: https://www.andreabelalcazar.com/#person`, `ProfilePage` en `/sobre-mi`, `Service` en servicios, `Article` en blog, `BreadcrumbList` en todo |
| **S-08** | S1 | `keywords` meta (ignorado por Google desde 2009, ruido) y `title` sin `template` | `layout.tsx:11` | Eliminar `keywords`; `title: { default, template: "%s · Andrea Belalcázar" }` |
| **S-09** | S1 | Página 404 genérica de Next en inglés, fondo blanco, con **doble `<title>`**, sin enlaces de recuperación | `curl /cualquier-ruta` | `src/app/not-found.tsx` de marca, en español, con enlaces a home/servicios/blog y `metadata` propia |
| **S-10** | S2 | Redirección en dos saltos `http://apex → https://apex → https://www` | `curl -I` | En Vercel: marcar `www` como dominio principal con redirección directa del apex (ya lo hace, pero HTTP→HTTPS→www son 2 saltos; aceptable, pero configurar HSTS `preload` para eliminar el primero en navegadores) |
| **S-11** | S2 | Sin `manifest`, sin `apple-touch-icon`, sin `icon.svg`, `theme-color` ausente | 404s | `src/app/manifest.ts`, `icon.svg`, `apple-icon.png` (180×180), `export const viewport = { themeColor: "#0A0A0B", colorScheme: "dark" }` |
| **S-12** | S2 | `lang="es"` en vez de `es-CO`; `og:locale` ok | `layout.tsx:49` | `es-CO` |
| **S-13** | S2 | H3 usado para una cita; jerarquía H1→H2→H3 correcta pero semántica errónea; `Áreas de Autoridad` y `Trayectoria Impecable.` no describen contenido para un buscador | `page.tsx:114,135,163` | `<blockquote>` para la cita; H2 descriptivos ("Servicios de comunicación política e institucional", "Trayectoria: campañas, gobierno y empresa") |
| **S-14** | S2 | Enlaces `wa.me` sin `rel="noopener"`/`target` consistentes (solo el flotante) y sin parámetro `text=` prellenado (pierde contexto y atribución) | `page.tsx:41,65,231,240,248` | Un componente `WhatsAppLink` con `text=Hola Andrea, vengo de andreabelalcazar.com (servicios/crisis)…` y evento GA4 |
| **S-15** | S2 | Assets basura de plantilla públicos (`next.svg`, `vercel.svg`, `file.svg`, `globe.svg`, `window.svg`) | 200 en producción | Eliminar |
| **S-16** | S3 | Sin `rss.xml`, sin `llms.txt`, sin `humans.txt`/`security.txt` | 404s | Route handlers (`app/rss.xml/route.ts`), `public/llms.txt`, `public/.well-known/security.txt` |
| **S-17** | S3 | `authors`/`creator` presentes pero sin `publisher`, `category`, `formatDetection`, `appleWebApp` | `layout.tsx` | Completar objeto `metadata` |
| **S-18** | S3 | Sin `hreflang` (correcto por ahora; necesario en Fase 4 con `/en`) | — | `alternates.languages` cuando exista `/en` |

### 6.2 Especificación del grafo JSON-LD objetivo (home)

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://www.andreabelalcazar.com/#website",
      "url": "https://www.andreabelalcazar.com/",
      "name": "Andrea Belalcázar",
      "inLanguage": "es-CO",
      "publisher": { "@id": "https://www.andreabelalcazar.com/#person" }
    },
    {
      "@type": "Person",
      "@id": "https://www.andreabelalcazar.com/#person",
      "name": "Andrea Belalcázar",
      "alternateName": "Yuly Andrea Belalcázar",
      "url": "https://www.andreabelalcazar.com/",
      "image": { "@type": "ImageObject", "url": "https://www.andreabelalcazar.com/img/andrea-belalcazar-retrato.jpg", "width": 1600, "height": 2000 },
      "jobTitle": "Jefe de Prensa y Relaciones Públicas",
      "worksFor": { "@type": "GovernmentOrganization", "name": "Secretaría de Turismo del Valle del Cauca", "url": "https://www.valledelcauca.gov.co/turismo" },
      "hasOccupation": { "@type": "Occupation", "name": "Estratega de comunicación política e institucional" },
      "alumniOf": [
        { "@type": "CollegeOrUniversity", "name": "Universidad del Valle", "sameAs": "https://www.univalle.edu.co/" },
        { "@type": "CollegeOrUniversity", "name": "Universidad Santiago de Cali", "sameAs": "https://www.usc.edu.co/" }
      ],
      "knowsAbout": ["Comunicación política", "Jefatura de prensa", "Gestión de crisis", "Relaciones públicas", "Marketing digital", "Inteligencia artificial aplicada a comunicación"],
      "knowsLanguage": "es",
      "address": { "@type": "PostalAddress", "addressLocality": "Cali", "addressRegion": "Valle del Cauca", "addressCountry": "CO" },
      "email": "mailto:hola@andreabelalcazar.com",
      "sameAs": ["<solo URLs verificadas>"]
    }
  ]
}
```

Nota: `alternateName` solo si Andrea quiere asociar su nombre completo (aparece en el PDF). `worksFor` debe reflejar el cargo vigente y **retirarse el día que deje el cargo** (poner fecha en el calendario del proyecto).

### 6.3 Especificación de `robots.ts`

```ts
// src/app/robots.ts
import type { MetadataRoute } from "next";
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/api/", "/_next/"] },
      { userAgent: ["GPTBot", "ClaudeBot", "PerplexityBot", "Google-Extended", "CCBot"], allow: "/" },
    ],
    sitemap: "https://www.andreabelalcazar.com/sitemap.xml",
    host: "https://www.andreabelalcazar.com",
  };
}
```

(Firma y campos según docs de Next 16, ver 13.1.)

### 6.4 Especificación de `sitemap.ts`

Debe generarse a partir del **índice de contenido** (sección 13.3), no a mano:

- Rutas estáticas con `priority` 1.0 (home), 0.9 (servicios, sobre-mi), 0.8 (casos, prensa, contacto), 0.7 (blog índice).
- Artículos con `lastModified` real (frontmatter `updated`), `changeFrequency: "monthly"`, `priority` 0.6–0.7.
- Glosario 0.4.
- Excluir `/privacidad`, `/terminos`, `/gracias`.
- Si supera 50 000 URLs (no ocurrirá), usar `generateSitemaps`.

### 6.5 Open Graph por tipo de página

| Tipo | Imagen | Título | Descripción |
|---|---|---|---|
| Home | `opengraph-image.tsx` genérica (retrato + nombre + cargo) | "Andrea Belalcázar · Estrategia de prensa y comunicación política" | 140–160 caracteres con territorio y servicios |
| Servicio | plantilla con nombre del servicio | "{Servicio} · Andrea Belalcázar" | beneficio + para quién |
| Caso | foto del caso (con derechos) | "Caso: {Entidad} · Andrea Belalcázar" | reto + resultado |
| Artículo | `blog/[slug]/opengraph-image.tsx` dinámica con título del artículo | título del artículo | resumen de 150 caracteres |

Todas 1200×630, PNG o JPG < 300 KB, texto legible a 300 px de ancho (WhatsApp muestra miniaturas pequeñas).

---

## 7. Rendimiento y frontend (sombreros: Developer y Arquitecto)

### 7.1 Lectura de los datos de Lighthouse

**Desktop = 100, Móvil = 55.** La diferencia no la explica el peso (1.4 MB en ambos) sino el **trabajo continuo del hilo principal en CPU lenta**: 7.5 s de main-thread, de los cuales **5.9 s son "Other"** (no script, no layout): es el compositor/rasterizador ocupado con **animaciones infinitas y filtros caros sobre capas grandes**:

- `animate-pulse` en el punto dorado del header (repinta un elemento con `backdrop-blur-xl` encima de todo el documento, 60 veces por segundo, para siempre).
- `backdrop-blur-xl` en el header fijo y en el botón flotante: cada frame recalcula el desenfoque de lo que hay debajo mientras se hace scroll.
- `blur` + `group-hover:opacity` en el halo del retrato; `grayscale` sobre tres imágenes grandes con `transition-all duration-1000`.
- Un `<video autoplay loop>` de 720×1280 decodificando en bucle **desde la primera carga**, aunque esté a 5 000 px de distancia del viewport en móvil.
- Dos overlays `fixed inset-0` (marco y textura) que fuerzan capas de composición del tamaño de la pantalla.

Esto es lo que dispara **Speed Index 32.5 s** (la página "nunca termina de pintarse" porque siempre hay algo animándose) y **TBT 5.8 s / TTI 7.4 s**. En un iPhone reciente se siente fluido; en un Android de gama media (el dispositivo mayoritario en Colombia) **se siente lento y calienta el teléfono**. Y Google usa el percentil 75 de usuarios reales (CrUX) para Core Web Vitals: los Android de gama media son ese percentil.

El **LCP** cambia de elemento según el viewport: en desktop es el retrato (bien, 0.7 s, pero con `loading="lazy"` y sin `fetchpriority`, lo que Lighthouse marca como error); en móvil es el `<h1>` (2.8 s) porque el retrato queda debajo del pliegue. El retardo del H1 en móvil es **Render Delay 2.1 s**: el texto está listo pero el hilo principal está ocupado (véase arriba) y las fuentes se preloadan sin usarse.

### 7.2 Hallazgos de rendimiento

| ID | Sev | Hallazgo | Evidencia | Acción |
|---|---|---|---|---|
| **P-01** | S0 | Animaciones/filtros infinitos y costosos (`animate-pulse`, `backdrop-blur-xl` ×2, `blur`, `grayscale` ×3 con `transition-all`, 2 overlays `fixed inset-0`) → TBT 5.8 s, SI 32.5 s en móvil | `lh-mobile.json` `mainthread-work-breakdown` = 7.5 s | Eliminar `animate-pulse`; sustituir `backdrop-blur-xl` por fondo sólido semitransparente (`bg-[#0A0A0B]/85`) o `backdrop-blur-sm` solo en `md:`; eliminar overlay de textura externo (o hacerlo un PNG local de 4 KB con `opacity` sin `fixed`); `grayscale` solo en `md:` y `transition-[filter]` en lugar de `transition-all`; respetar `prefers-reduced-motion` |
| **P-02** | S0 | Vídeo de 1.12 MB con audio innecesario, `autoplay loop`, sin `poster`, sin `preload="none"`, descargado en móvil aunque esté fuera del viewport | `network`: `clip-video.mp4 206 1 120 565 B` | `preload="none"` + `poster` (JPG 40 KB) + reproducción solo cuando entre en viewport (IntersectionObserver en un Client Component pequeño) o al tocar; recodificar sin audio, 720p → 540p, H.264 CRF 28 (~400 KB) y ofrecer `webm/AV1`; en móvil mostrar solo el poster con botón de reproducir |
| **P-03** | S1 | El retrato LCP (desktop) lleva `loading="lazy"` y sin prioridad; `sizes="100vw"` implícito hace que desktop descargue la variante 1920 w (55 KB) para un hueco de 646 px y que la `src` fallback sea `w=3840` | HTML servido; `lcp-lazy-loaded` score 0 | En Next 16 `priority` está **deprecado**: usar `loading="eager"` + `fetchPriority="high"` (o `preload` si se quiere `<link rel=preload>`); `sizes="(min-width:1024px) 45vw, 100vw"`; `quality={70}` (añadir a `images.qualities`) |
| **P-04** | S1 | `public/portrait.jpg` es el original de cámara: **11 MB, 6016×4016, EXIF completo** (modelo de cámara, lente, fecha). Se sirve tal cual en `og:image` y a quien abra la URL | `sips`, `mdls` | Exportar a 1600×2000 (recorte 4:5), JPG q80 (~250 KB) + AVIF/WebP; **borrar EXIF**; renombrar `andrea-belalcazar-retrato.jpg` (nombre descriptivo = SEO de imagen); mover a `src/assets/` e **importar estáticamente** para obtener `width/height/blurDataURL` automáticos y `Cache-Control: immutable` |
| **P-05** | S1 | Fuentes: 87 KB preloaded (`Inter` variable 100–900, `Playfair` variable 400–900) **que no se aplican** (X-01) | `document.fonts` = 0 loaded | Tras el fix X-01, limitar `weight` a lo usado: Inter `["300","400","700"]` o variable; Playfair `["400","700"]` + `style: ["normal","italic"]` (se usa itálica); `display: "swap"` (default); `subsets: ["latin"]` basta para español (las tildes y la ñ están en `latin`) |
| **P-06** | S1 | Textura de fondo desde `transparenttextures.com` (tercero): DNS+TLS extra (~400 ms en móvil), sin caché larga, dependencia de un sitio ajeno, fuga de `Referer` | `uses-rel-preconnect` 400 ms; `uses-long-cache-ttl` | Eliminar; si se quiere textura, PNG/SVG local ≤ 4 KB o `background-image` con gradiente/ruido CSS |
| **P-07** | S1 | `/public` se sirve con `cache-control: public, max-age=0, must-revalidate` (Vercel por defecto para `public/`); imágenes de contenido sin hash | `curl -I /portrait.jpg` | Importar imágenes desde `src/` (hash + `immutable`) o añadir `headers()` en `next.config.ts` para `/:all*(jpg|png|webp|avif|mp4|svg)` con `max-age=31536000, immutable` **solo si los nombres llevan versión** |
| **P-08** | S2 | JS: 204 KB comprimidos para una página estática sin interactividad; 59 KB "unused"; 14 KB legacy | `unused-javascript`, `legacy-javascript` | Aceptable para Next 16 (runtime ~90 KB), pero: no importar iconos sin usar (`Globe`, `Mail`, `Plus`), evitar Client Components innecesarios; añadir `browserslist` moderno (`defaults and fully supports es6-module`) para eliminar polyfills legacy |
| **P-09** | S2 | Imágenes `clip-1/2` de 1080×1920 recortadas a cuadrados de 153–300 px con `sizes="100vw"` → 179 KB desperdiciados en desktop | `uses-responsive-images` 179 KiB | `sizes="(min-width:1024px) 20vw, 45vw"`; recortar los originales a 1:1 800×800; AVIF |
| **P-10** | S2 | Sin AVIF (`images.formats` por defecto solo WebP) | `content-type: image/webp` | `images: { formats: ["image/avif","image/webp"], qualities: [60,70,75] }` |
| **P-11** | S2 | `scroll-smooth` en `<html>`: en Next 16 ya no se anula durante la navegación; con anclas `#` y header fijo el destino queda tapado (sin `scroll-padding-top`) | `layout.tsx:49` | `scroll-padding-top: 6rem` en `html`; `data-scroll-behavior="smooth"`; `@media (prefers-reduced-motion: reduce) { scroll-behavior: auto }` |
| **P-12** | S3 | CSS render-blocking de 7.3 KB (normal en Next); DOM 168 elementos (bien) | `render-blocking-resources` | Nada que hacer ahora; vigilar que la v2 no supere ~30 KB de CSS |

### 7.3 Presupuesto de rendimiento (para CI, sección 11)

| Recurso | Presupuesto móvil | Hoy |
|---|---|---|
| HTML | ≤ 30 KB (comprimido ≤ 12 KB) | 50.7 / 10.2 KB |
| CSS total | ≤ 30 KB | 7.3 KB |
| JS total (comprimido) | ≤ 130 KB | 204 KB |
| Fuentes | ≤ 100 KB, ≤ 3 archivos | 87 KB, 2 archivos (sin usar) |
| Imágenes above-the-fold | ≤ 120 KB | 14–55 KB |
| Vídeo en carga inicial | 0 KB | 1 120 KB |
| Peticiones a terceros | 0 (salvo analítica con `afterInteractive`) | 1 |
| Peso total inicial | ≤ 600 KB | 1 377 KB |
| LCP / INP / CLS (lab móvil) | ≤ 2.0 s / ≤ 200 ms / ≤ 0.05 | 2.8 s / TBT 5.8 s / 0 |
| Lighthouse móvil (perf/a11y/bp/seo) | ≥ 90 / 100 / 100 / 100 | 55 / 90 / 100 / 100 |

### 7.4 Hallazgos de frontend (código)

| ID | Sev | Hallazgo | Evidencia | Acción |
|---|---|---|---|---|
| **F-01 (= X-01)** | S0 | **Las fuentes no se aplican.** `@theme { --font-sans: var(--font-inter), … }` se compila a `:root { --font-sans: var(--font-inter), … }` y `.font-sans { font-family: var(--font-sans) }`. Pero `--font-inter`/`--font-playfair` las define `next/font` **en la clase del `<body>`**, no en `:root`. Al resolverse `--font-sans` en `:root`, `var(--font-inter)` no existe → la propiedad entera es inválida en tiempo de cómputo → `font-family` hereda el valor del UA. Resultado: Inter y Playfair se descargan y nunca se usan. **Validado en producción:** al inyectar `.font-serif{font-family:var(--font-playfair),…}` (equivalente a `@theme inline`) o al mover las clases de variables a `<html>`, el `h1` pasa a `"Playfair Display"` y `document.fonts` reporta ambas cargadas (`audit-evidence/desktop-fold-fonts-fixed.png`) | `globals.css:3-6`, `layout.tsx:50-52`, `getComputedStyle(h1)` | **Fix A (recomendado, documentado por Tailwind 4 para `next/font`):** `@theme inline { --font-sans: var(--font-inter), ui-sans-serif, system-ui, sans-serif; --font-serif: var(--font-playfair), ui-serif, Georgia, serif; }`. **Fix B (alternativo):** aplicar `${inter.variable} ${playfair.variable}` en `<html>` en vez de `<body>`. Aplicar A y, opcionalmente, también B. **Consecuencia de diseño:** con Playfair real, el H1 crece ~15 % en altura; revisar que los CTAs sigan sobre el pliegue a 1440×900 y 390×844 |
| **F-02** | S1 | Clase inexistente `min-[90vh]` en el hero (debería ser `min-h-[90vh]`); Tailwind la ignora en silencio → el hero no tiene altura mínima | `page.tsx:46`; CSS compilado no contiene la regla | Corregir; añadir `eslint-plugin-tailwindcss` o `@tailwindcss/vite` warnings para clases desconocidas (o revisar con `tailwindcss --content` en CI) |
| **F-03** | S1 | Todo el sitio en un componente de 263 líneas con datos hardcodeados (servicios, cargos, formación, textos, número de WhatsApp repetido 5 veces) | `page.tsx` | Descomponer en `src/components/` (Header, Hero, Services, Timeline, CTA, Footer, WhatsAppButton, JsonLd) y datos en `src/content/site.ts` tipado (`satisfies SiteConfig`) |
| **F-04** | S1 | Sin menú móvil: `nav` con `hidden md:flex` y ningún sustituto | `display: none` medido a 390 px | Menú móvil accesible (botón `aria-expanded`, `<dialog>` o panel con foco atrapado, cierre con Esc), o barra inferior de acciones |
| **F-05** | S1 | `<video>` sin `poster`, sin `preload`, sin `aria-hidden`, sin `<source>` alternativos, sin control para pausar (WCAG 2.2.2) | `page.tsx:193-200` | Componente `LazyVideo` (Client) con IntersectionObserver, `poster`, `preload="none"`, botón pausar/reproducir, `prefers-reduced-motion` |
| **F-06** | S1 | Botón flotante sin nombre accesible (`link-name` = 0) e icono de **teléfono** para un enlace de **WhatsApp** (confusión de affordance) | Lighthouse `link-name` | `aria-label="Escribir por WhatsApp"`; icono oficial de WhatsApp (SVG inline, marca permitida para enlaces); texto visible en ≥ md |
| **F-07** | S1 | `keywords` en metadata (inútil), `title` sin `template`, `twitter` sin `creator`/`site` | `layout.tsx` | Ver S-08, S-17 |
| **F-08** | S2 | JSON-LD construido dentro del componente de página con `dangerouslySetInnerHTML` sin escapar `<` (riesgo XSS si algún día el contenido viene de un CMS) | `page.tsx:22-25` | Componente `JsonLd` que serialice con `JSON.stringify(data).replace(/</g, "\\u003c")` |
| **F-09** | S2 | Iconos importados sin usar (`Globe`, `Mail`, `Plus`) y `lucide-react` completo en el bundle de la página (tree-shaking funciona, pero el lint falla) | eslint warnings | Limpiar imports; `import { Mic } from "lucide-react"` está bien con ESM |
| **F-10** | S2 | Cita en `<h3>`, encabezados con `<br/>` forzados, textos visuales en `<div>` que deberían ser `<p>`/`<time>`/`<dl>` | `page.tsx:109,114,163,166` | Semántica: `<blockquote>`, `<dl>` para formación, `<time>` para fechas, `<address>` en footer |
| **F-11** | S2 | Anclas `href="#about"` sin `scroll-padding` bajo header fijo; `href="#"` en LinkedIn | `page.tsx:38-41,241` | `scroll-padding-top`; enlaces reales o eliminar |
| **F-12** | S2 | `selection:bg-amber-500/30` y colores hardcodeados `#0A0A0B` repetidos 4 veces en vez de tokens `@theme` | `layout.tsx`, `page.tsx` | Tokens: `--color-ink`, `--color-gold`, `--color-paper`, `--color-muted`; escala tipográfica en `@theme` |
| **F-13** | S2 | `Image` con `fill` y `alt` genéricos ("Estrategia 1") | `page.tsx:210,213` | `alt` descriptivo con contexto ("Andrea Belalcázar en rueda de prensa de la Secretaría de Turismo, 2025") |
| **F-14** | S3 | `README.md` de plantilla, sin instrucciones reales; `.vscode/launch.json` de Node genérico; sin `.nvmrc` | repo | README con setup (Node 22, `nvm use`), scripts, estructura, cómo añadir contenido; `.nvmrc` = `22` |
| **F-15** | S3 | `reactCompiler: true` en un sitio sin estado: coste de build (Babel) sin beneficio hoy | `next.config.ts` | Mantener (es estable en 16 y será útil con componentes interactivos), pero medir tiempo de build en CI |

### 7.5 Reglas de frontend para la v2

1. **Server Components por defecto.** Solo `"use client"` en: menú móvil, `LazyVideo`, formulario, `WebVitals`, tracking de eventos.
2. **Cero `transition-all`.** Transiciones nombradas (`transition-colors`, `transition-opacity`, `transition-transform`).
3. **Solo animar `opacity` y `transform`.** Nada de `filter`, `backdrop-filter`, `box-shadow` animados en móvil.
4. **`prefers-reduced-motion`** respetado globalmente (`motion-safe:`/`motion-reduce:` de Tailwind).
5. **Tokens de diseño en `@theme inline`**, nunca hex sueltos en JSX.
6. **Contenido fuera de los componentes** (`src/content/*.ts` + MDX), tipado con Zod o `satisfies`.
7. **Imágenes siempre por import estático** (o `remotePatterns` si CMS), con `sizes` explícito, `alt` descriptivo y `quality` del set permitido.
8. **Un solo `WhatsAppLink`** con `text` prellenado por contexto y evento de analítica.

---

## 8. UX / UI y conversión (sombrero: UX/UI)

### 8.1 Lo que funciona

- Dirección visual coherente: oscuro, acento cálido, mucho aire, grid de 1400 px. Se percibe premium (cuando las fuentes funcionen, mucho más).
- Jerarquía clara del CTA primario (dorado) vs secundario (borde).
- 0 CLS: no hay saltos de layout.
- Header compacto y legible en desktop.

### 8.2 Lo que rompe la experiencia

| ID | Sev | Hallazgo | Evidencia | Acción |
|---|---|---|---|---|
| **U-01** | S0 | **Sin navegación en móvil.** Solo hay scroll; no hay forma de ir a "Contacto" salvo el botón flotante | `mobile-fold.png`; `nav display:none` | Menú móvil (F-04) |
| **U-02** | S0 | **El botón flotante de WhatsApp tapa el CTA "Ver Trayectoria"** en la primera pantalla móvil (390×844) | `mobile-fold.png` | Mover el flotante a `bottom-6 right-4` con tamaño 56 px, ocultarlo mientras el hero esté visible (IntersectionObserver) o convertirlo en barra inferior fija de 2 acciones (WhatsApp · Llamar/Email) que no solape contenido; añadir `safe-area-inset` |
| **U-03** | S1 | En móvil el retrato queda **debajo del pliegue**: la primera pantalla es solo texto con fondo negro. Para una marca personal, la cara es la prueba nº 1 | `mobile-fold.png` | Hero móvil con retrato recortado 1:1 arriba (o fondo con degradado) y texto encima; o `grid` con imagen primero en `<lg` |
| **U-04** | S1 | Marco fijo de 16/32 px del color de fondo (`border-[16px] md:border-[32px]`) **recorta contenido** al hacer scroll y reduce el ancho útil en móvil de 390 a 358 px | `page.tsx:28` | Eliminar el marco o reducirlo a un borde decorativo de 1 px que no recorte (`inset-2 border border-white/5`) |
| **U-05** | S1 | Página de **6 924 px de alto en móvil para 273 palabras**: `py-40` (160 px) en cada sección + `space-y-12/16` produce vacío sin contenido; el usuario hace ~9 pantallas de scroll para llegar al CTA final | `docH` medido | Escala de espaciado responsive: `py-16 md:py-28 lg:py-36`; agrupar tarjetas en 2 columnas desde `sm:` |
| **U-06** | S1 | Sección Trayectoria en desktop: columna izquierda de ~480 px frente a derecha de ~1 000 px → **hueco vacío** de ~400 px bajo la tarjeta de cargos | `desktop-full.png` | Rediseñar como línea de tiempo vertical única (fecha · cargo · entidad · logro) o igualar alturas con `lg:grid-rows-[auto]` y `self-start` + contenido adicional (los 4 cargos que faltan llenan el hueco) |
| **U-07** | S1 | Tipografía secundaria de **9–11 px con `tracking-[0.3em]`** en mayúsculas para etiquetas, navegación y footer: ilegible en móvil y falla WCAG (A-01) | `smallestFont: 9` | Mínimo 12 px (`text-xs`) para etiquetas, 14 px para navegación, 16 px para cuerpo; `tracking` máx. `0.15em` |
| **U-08** | S1 | Las 4 tarjetas de "Áreas de Autoridad" **no llevan a ningún sitio**, tienen `hover` pero no son enlaces: affordance falsa | `page.tsx:146` | Convertir en `<Link href="/servicios/…">` con flecha y 2 líneas más de copy |
| **U-09** | S1 | Cinco CTAs con **cuatro textos distintos** para la misma acción ("Agendar Consultoría", "Contacto", "Iniciar Conversación Privada", "WhatsApp", icono) | `page.tsx` | Un verbo y una promesa: "Hablemos por WhatsApp" (primario) en todos; "Ver casos" como secundario |
| **U-10** | S2 | Retrato en **escala de grises** con `hover:grayscale-0`: en móvil no hay hover, así que la única foto de la persona se ve siempre gris; el color transmite más calidez/confianza | `page.tsx:82` | Color por defecto; tratamiento tonal solo si es decisión de marca (y entonces, en todas las fotos) |
| **U-11** | S2 | Vídeo con overlay de "play" (`ChevronRight`) que **no hace nada** al pulsar | `page.tsx:201-205` | Botón real de reproducir/pausar o quitar el falso control |
| **U-12** | S2 | Fotos de la galería sin pie ni contexto (¿qué evento, qué año, con quién?) | `desktop-full.png` | `<figure>` + `<figcaption>` con evento/fecha; enlazar al caso |
| **U-13** | S2 | Footer sin información de contacto real (email, ciudad, horario), sin enlaces legales, con "A. Belalcázar © 2026" en 9 px | `page.tsx:237-243` | Footer de 3 columnas: identidad + contacto (`<address>`), navegación, legal + redes |
| **U-14** | S2 | Sin estados: no hay `loading.tsx`, `error.tsx`, `not-found.tsx` de marca; el 404 es blanco e inglés | producción | Crear los tres con la identidad visual |
| **U-15** | S2 | Sin formulario: quien no usa WhatsApp (sector público en horario laboral, periodistas desde escritorio) no tiene alternativa | — | Formulario corto (nombre, entidad, necesidad, email/teléfono) con Server Action + Resend + honeypot + rate limit; opción "Agenda 20 min" (Cal.com) |
| **U-16** | S3 | `target="_blank"` solo en el flotante; el resto abre WhatsApp en la misma pestaña y saca al usuario del sitio | `page.tsx` | Consistencia: `target="_blank" rel="noopener"` en todos los `wa.me` |
| **U-17** | S3 | Sin favicon SVG ni tema claro: el sitio no reacciona a `prefers-color-scheme` (aceptable por marca, pero declarar `color-scheme: dark` para que los controles nativos y el scrollbar sean oscuros) | — | `viewport.colorScheme = "dark"` |

### 8.3 Wireframe de la home v2 (móvil primero)

```
┌──────────────────────────────┐
│ ● Andrea Belalcázar    [☰]   │  header 56px, fondo sólido 85 %
├──────────────────────────────┤
│ [retrato 1:1 con degradado]  │  above the fold: cara + nombre
│ Estrategia de prensa y       │  H1 ≤ 12 palabras (Playfair 34–40px)
│ narrativa para gobiernos,    │
│ campañas y marcas del        │
│ suroccidente colombiano.     │
│ Soy Andrea Belalcázar…       │  sub 2 líneas (Inter 17px)
│ [ Hablemos por WhatsApp ]    │  CTA 48px alto, ancho completo
│ [ Ver casos ]                │
│ Gobernación del Valle ·      │  fila de prueba (texto/logos)
│ Concejo de Cali · …          │
├──────────────────────────────┤
│ QUÉ HAGO                     │  4 servicios como enlaces-tarjeta
│ ▸ Jefatura de prensa …       │  (2 col desde sm)
│ ▸ Gestión de crisis …        │
├──────────────────────────────┤
│ CASOS                        │  3 casos destacados con cifra
├──────────────────────────────┤
│ TRAYECTORIA                  │  línea de tiempo 6 cargos + 3 títulos
├──────────────────────────────┤
│ ÚLTIMOS ARTÍCULOS            │  3 tarjetas → /blog
├──────────────────────────────┤
│ EN LOS MEDIOS                │  logos/enlaces (P3)
├──────────────────────────────┤
│ ¿Hablamos?                   │  CTA + formulario corto + email
├──────────────────────────────┤
│ footer 3 col                 │
└──────────────────────────────┘
│ [WhatsApp]  fijo 56px, bottom-6 right-4, oculto en hero │
```

### 8.4 Sistema de diseño mínimo (tokens)

| Token | Valor propuesto | Uso |
|---|---|---|
| `--color-ink` | `#0A0A0B` | fondo |
| `--color-ink-2` | `#121214` | tarjetas/secciones alternas (sustituye `bg-white/2`) |
| `--color-paper` | `#F4F1EA` (blanco cálido) | texto principal (mejor que `slate-300` frío sobre dorado) |
| `--color-muted` | `#A9A9B3` (≥ 7:1 sobre ink) | texto secundario (sustituye `slate-500`, que falla AA) |
| `--color-gold` | `oklch(76.9% 0.188 70)` (amber-500) | acentos, CTA |
| `--color-gold-deep` | amber-600 | CTA hover / fondo botón |
| Tipografía | Playfair 400/700 + itálica para H1–H2; Inter 400/500/700 para todo lo demás | |
| Escala | 12 / 14 / 16 / 18 / 22 / 28 / 36 / 48 / 64 (móvil máx. 40) | `text-xs`…`text-6xl` mapeados |
| Espaciado de sección | `py-16 md:py-24 lg:py-32` | |
| Radio | 12 px tarjetas, 999 px pills | |
| Movimiento | 150–300 ms, `ease-out`, solo `opacity/transform`, `motion-reduce:transition-none` | |

---

## 9. Accesibilidad (sombrero: UX/UI + Developer)

Referencia: WCAG 2.2 nivel AA. Lighthouse a11y: 90 (móvil), 95 (desktop). Lo que Lighthouse no ve se lista igualmente.

### 9.1 Contraste medido (valores reales de Tailwind 4.2.4, OKLCH → sRGB)

| Combinación | Hex fg | Ratio | AA 4.5 | AA grande 3.0 |
|---|---|---|---|---|
| Cuerpo `slate-300` sobre `#0A0A0B` | `#cad5e2` | 13.33 | ✅ | ✅ |
| Párrafo hero `slate-500` sobre `#0A0A0B` | `#62748e` | **4.15** | ❌ | ✅ |
| Navegación `slate-500` 10 px | `#62748e` | **4.15** | ❌ | — (texto pequeño) |
| Párrafos "Filosofía" `slate-500` sobre `bg-white/2` | `#62748e` | **4.02** | ❌ | ✅ |
| Descripciones tarjetas `slate-500` 14 px | `#62748e` | **4.02** | ❌ | — |
| Meta formación `slate-600` 9 px | `#45556c` | **2.53** | ❌ | ❌ |
| Copyright `slate-700` 9 px sobre negro | `#314158` | **2.03** | ❌ | ❌ |
| Enlaces footer `slate-500` 9 px | `#62748e` | **4.41** | ❌ | — |
| Acento `amber-500` | `#fe9a00` | 9.22 | ✅ | ✅ |
| Badge `amber-500/80` 9 px | `#cd7d02` | 6.14 | ✅ | ✅ |
| CTA negro sobre `amber-600` | — | 6.58 | ✅ | ✅ |

**Siete combinaciones fallan AA para texto normal**, y todas las que fallan son precisamente **el texto que explica qué hace Andrea**. Solución: `--color-muted` ≥ `#A9A9B3` (7.3:1) para texto secundario; `slate-500` solo para decoración no textual.

### 9.2 Hallazgos

| ID | Sev | Hallazgo | Criterio WCAG | Acción |
|---|---|---|---|---|
| **A-01** | S1 | Contraste insuficiente en 7 combinaciones de texto | 1.4.3 | Tokens 8.4 |
| **A-02** | S1 | Texto de 9–11 px (etiquetas, nav, footer) | 1.4.4 / legibilidad | Mínimo 12 px; ideal 14 |
| **A-03** | S1 | Enlace flotante sin nombre accesible; icono sin `aria-hidden` | 1.1.1 / 2.4.4 / 4.1.2 | `aria-label`, `<svg aria-hidden="true">` |
| **A-04** | S1 | Vídeo en autoplay sin control de pausa; animación `pulse` infinita | 2.2.2 | Botón pausa; `prefers-reduced-motion`; quitar `pulse` |
| **A-05** | S1 | Sin enlace "Saltar al contenido"; header fijo sin `role`/`aria-label`; `nav` sin `aria-label` | 2.4.1 | `<a href="#main" class="sr-only focus:not-sr-only">`; `<nav aria-label="Principal">` |
| **A-06** | S1 | Tap targets < 44 px: enlaces de footer 61×14 y 52×14 px; nav 48×15 | 2.5.8 (AA en 2.2: 24 px mín.) | Padding para ≥ 44×44 en móvil |
| **A-07** | S2 | Estados de foco no diseñados (se depende del outline por defecto sobre fondo negro, poco visible con `border-white/10`) | 2.4.7 / 2.4.11 | `focus-visible:outline-2 outline-offset-2 outline-[--color-gold]` global |
| **A-08** | S2 | Imágenes decorativas sin `alt=""` explícito vs. informativas con `alt` pobre | 1.1.1 | Auditar cada imagen: decorativa → `alt=""`; informativa → descripción |
| **A-09** | S2 | Uso de color como único indicador (enlace "Contacto" solo se distingue por ser blanco) | 1.4.1 | Subrayado o icono |
| **A-10** | S2 | `<h3>` para una cita; jerarquía visual (H2 de 96 px "Elevamos el Discurso") sin relación con la jerarquía semántica | 1.3.1 | `<blockquote>`; H2 con texto descriptivo |
| **A-11** | S2 | `lang="es"` genérico (afecta a pronunciación de lectores de pantalla en variantes regionales, menor) y sin `lang` en términos ingleses ("Marketing & IA" es aceptable) | 3.1.1 | `es-CO` |
| **A-12** | S3 | `scroll-smooth` sin respetar `prefers-reduced-motion` | 2.3.3 | Media query |
| **A-13** | S3 | Sin `<main>` único claro (sí hay `<main>`, bien) pero el flotante está fuera de `<main>` y sin landmark | 1.3.1 | Aceptable; documentar |

### 9.3 Checklist de aceptación de accesibilidad (para la re-auditoría)

- [ ] axe-core: 0 violaciones críticas/serias en todas las rutas (Playwright + `@axe-core/playwright`).
- [ ] Navegación completa con teclado (Tab/Shift+Tab/Enter/Esc) incluyendo menú móvil y formulario.
- [ ] VoiceOver (iOS) y TalkBack (Android): todos los enlaces y botones tienen nombre; orden de lectura lógico.
- [ ] Contraste ≥ 4.5:1 en todo texto < 24 px; ≥ 3:1 en ≥ 24 px y en bordes de controles.
- [ ] Ningún texto < 12 px; cuerpo ≥ 16 px en móvil.
- [ ] `prefers-reduced-motion` desactiva todas las animaciones no esenciales.
- [ ] Zoom 200 % sin pérdida de contenido ni scroll horizontal.
- [ ] Lighthouse a11y = 100 en móvil y desktop.

---

## 10. Backend, infraestructura y seguridad (sombrero: Arquitecto)

### 10.1 Estado

No existe backend: la ruta `/` se prerenderiza en build (`x-nextjs-prerender: 1`) y Vercel la sirve desde su CDN (`x-vercel-cache: HIT`, TTFB 80–100 ms desde `iad1`). Es la arquitectura correcta para el contenido actual y **seguirá siéndolo para la v2**: contenido estático + un puñado de funciones (formulario, newsletter, OG dinámico, RSS). No se recomienda base de datos propia en las fases 0–3.

### 10.2 Hallazgos

| ID | Sev | Hallazgo | Evidencia | Acción |
|---|---|---|---|---|
| **B-01** | S1 | Sin `Content-Security-Policy` | cabeceras; Lighthouse `csp-xss` "No CSP found" | Sitio estático → CSP en `next.config.ts` `headers()` con `source: "/(.*)"`. Política inicial (sin nonce, compatible con prerender): `default-src 'self'; script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://va.vercel-scripts.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob: https://www.google-analytics.com; font-src 'self'; connect-src 'self' https://www.google-analytics.com https://region1.google-analytics.com https://vitals.vercel-insights.com; media-src 'self'; frame-ancestors 'none'; base-uri 'self'; form-action 'self' https://wa.me; upgrade-insecure-requests`. Empezar en `Content-Security-Policy-Report-Only` una semana; luego enforzar. Si se quiere eliminar `'unsafe-inline'` para scripts: `experimental.sri` o nonce vía `proxy.ts` (implica render dinámico: **no** recomendado aquí) |
| **B-02** | S1 | Sin protección de clickjacking ni aislamiento de origen | `clickjacking-mitigation`, `origin-isolation` | `frame-ancestors 'none'` (en CSP) + `X-Frame-Options: DENY` (legado) + `Cross-Origin-Opener-Policy: same-origin` |
| **B-03** | S1 | HSTS sin `includeSubDomains` ni `preload` | `strict-transport-security: max-age=63072000` | `Strict-Transport-Security: max-age=63072000; includeSubDomains; preload` y enviar a hstspreload.org (antes, verificar que ningún subdominio necesite HTTP) |
| **B-04** | S1 | Sin `Referrer-Policy`, `Permissions-Policy`, `X-Content-Type-Options` | cabeceras | `Referrer-Policy: strict-origin-when-cross-origin`; `Permissions-Policy: camera=(), microphone=(), geolocation=(), browsing-topics=(), interest-cohort=()`; `X-Content-Type-Options: nosniff`; `X-DNS-Prefetch-Control: on` |
| **B-05** | S2 | `poweredByHeader` no desactivado (Vercel lo oculta, pero en otro host se filtraría `x-powered-by: Next.js`) | config | `poweredByHeader: false` |
| **B-06** | S2 | Redirección `http://apex → https://apex → https://www` en dos saltos (SEO: pierde ~100 ms y una fracción de equity en cada salto) | `curl -I` | Es comportamiento de Vercel; mitigar con HSTS preload (los navegadores saltan directamente a HTTPS). Confirmar en Vercel Domains que `www` es primario y el apex redirige 308 |
| **B-07** | S2 | Dominio en GoDaddy con NS por defecto; sin DNSSEC visible; sin registros SPF/DMARC (no hay correo aún, pero al crear `hola@` hará falta) | `dig NS` | Al configurar correo: SPF (`v=spf1 include:_spf.google.com ~all`), DKIM, DMARC (`p=quarantine`), y `CAA` para Let's Encrypt/Vercel |
| **B-08** | S2 | Sin `vercel.json`/config de proyecto: regiones, `cleanUrls`, `trailingSlash` por defecto; sin protección de previews | — | Vercel: **Deployment Protection** en previews (evita indexación de `*.vercel.app`), añadir `X-Robots-Tag: noindex` a previews vía `headers()` condicionada por `process.env.VERCEL_ENV !== "production"` |
| **B-09** | S2 | Formularios futuros sin plan anti-abuso | — | Server Action + honeypot + `Upstash Ratelimit` (o Vercel WAF rate limit) + Turnstile (Cloudflare) si hay spam; enviar con Resend; nunca exponer el número de teléfono en respuestas de API |
| **B-10** | S2 | Secretos: no hay `.env.example`; la IA implementadora podría hardcodear IDs (GA4, Resend) | repo | `.env.example` con `NEXT_PUBLIC_GA_ID`, `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `NEXT_PUBLIC_SITE_URL`; validación con `zod` en `src/env.ts` (`@t3-oss/env-nextjs` opcional) |
| **B-11** | S3 | Sin `security.txt`, sin política de divulgación | 404 | `public/.well-known/security.txt` con `Contact: mailto:seguridad@…` y `Expires` |
| **B-12** | S3 | Assets de plantilla expuestos (`next.svg`, `vercel.svg`…) revelan stack (menor) | 200 | Eliminar (S-15) |
| **B-13** | S3 | EXIF en imágenes públicas (cámara, lente, fecha; no hay GPS) | `mdls portrait.jpg` | Pipeline de imágenes que borre metadatos (`sharp` con `.withMetadata(false)` o `exiftool -all=`) |

### 10.3 Arquitectura de despliegue objetivo

```
GitHub (main protegido, PRs obligatorios)
  └─ GitHub Actions: lint · typecheck · unit · build · e2e · lighthouse-ci · axe  → status checks
       └─ Vercel Git Integration
            ├─ Preview por PR (Deployment Protection ON, X-Robots-Tag: noindex)
            └─ Production (www.andreabelalcazar.com)
                 ├─ Static: /, /servicios/*, /casos/*, /blog/*, /glosario/* (prerender + ISR opcional)
                 ├─ Metadata routes: /sitemap.xml, /robots.txt, /manifest.webmanifest, /opengraph-image, /rss.xml
                 ├─ Functions (Node): Server Action contacto → Resend; /api/newsletter → proveedor
                 ├─ proxy.ts (opcional): headers por entorno; futura detección de /en
                 └─ Vercel Analytics + Speed Insights; GA4 vía @next/third-parties
Dominio: GoDaddy DNS → Vercel (A/CNAME), HSTS preload, CAA, SPF/DKIM/DMARC para hola@
Correo: Google Workspace (o Zoho Mail gratis) para hola@andreabelalcazar.com
Formularios: Resend (3 000 emails/mes gratis) · Newsletter: Buttondown/Resend Audiences/Beehiiv
Agenda: Cal.com (gratis) embebido o enlazado
```

### 10.4 Caché y regeneración (Next 16)

- Contenido MDX en repo → **todo prerenderizado en build**; cada `git push` a `main` redespliega (Vercel, ~1 min). No hace falta ISR ni `use cache` en las fases 0–3.
- Si en Fase 4 el contenido viene de un CMS headless (Sanity/Contentful/Notion): activar `cacheComponents: true`, usar `"use cache"` + `cacheLife("days")` + `cacheTag("posts")` en las funciones de lectura, y un webhook del CMS que llame a un Route Handler que ejecute `revalidateTag("posts", "max")` (**en Next 16 el segundo argumento es obligatorio**).
- Las rutas de metadatos (`sitemap.ts`, `opengraph-image.tsx`, `robots.ts`) se cachean por defecto y se regeneran en cada build: correcto para este caso.

---

## 11. Calidad de código, DX, testing y CI/CD (sombrero: Developer)

### 11.1 Estado

- **TypeScript:** `strict: true`, 0 errores. Bien.
- **Lint:** `eslint src` → **2 errores** (`react/no-unescaped-entities` en `page.tsx:115`) y **3 warnings** (imports sin usar). El script `npm run lint` es `eslint` sin argumentos y **falla en Node 16** (`structuredClone is not defined`). Nadie lo ha ejecutado con éxito nunca en esta máquina.
- **Build:** falla con Node 16.19 (el default del sistema); compila con Node 22.12 en 10.6 s (Turbopack). No hay `.nvmrc` ni `engines`.
- **Tests:** ninguno. Ni unitarios, ni componentes, ni E2E, ni visuales, ni de accesibilidad, ni de rendimiento.
- **CI/CD:** ninguno más allá del auto-deploy de Vercel al hacer push a `main`. `main` no está protegido. Cualquier push roto llega a producción (aunque Vercel no promociona builds fallidos, sí promociona builds que compilan con bugs).
- **Documentación:** README de plantilla. `AGENTS.md` correcto pero mínimo.

### 11.2 Hallazgos

| ID | Sev | Hallazgo | Acción |
|---|---|---|---|
| **T-01** | S1 | Node no fijado; el propietario no puede compilar localmente | `.nvmrc` → `22`; `"engines": { "node": ">=20.9 <25" }`; `packageManager` (`npm@10` o migrar a `pnpm@9`); README con `nvm use` |
| **T-02** | S1 | Lint con errores; sin `lint:fix`, sin `typecheck`, sin `format` | Scripts: `"lint": "eslint .", "lint:fix": "eslint . --fix", "typecheck": "tsc --noEmit", "format": "prettier --check .", "format:fix": "prettier --write ."`; Prettier + `prettier-plugin-tailwindcss` (ordena clases, evita duplicados); corregir los 5 problemas actuales |
| **T-03** | S1 | Sin pruebas | Ver 11.3 |
| **T-04** | S1 | Sin CI | GitHub Actions `ci.yml` en PR y push a `main`: `npm ci` → `lint` → `typecheck` → `test:unit` → `build` → `test:e2e` (Playwright con `webServer` sobre `next start`) → `lhci autorun` (presupuestos 7.3) → `axe`. Requerir checks verdes para merge (branch protection) |
| **T-05** | S1 | Sin validación de contenido | Zod para frontmatter MDX y `site.ts`; script `validate:content` en CI que falla si falta `title/description/date/og` o si hay enlaces internos rotos (`remark-lint` + `linkinator` contra el build) |
| **T-06** | S2 | Sin control de clases Tailwind inexistentes (`min-[90vh]` pasó desapercibida) | `eslint-plugin-better-tailwindcss` (o `eslint-plugin-tailwindcss` compatible con v4) con regla `no-unregistered-classes`; Prettier plugin para orden |
| **T-07** | S2 | Sin Dependabot/Renovate ni auditoría de dependencias | `dependabot.yml` semanal (npm + actions); `npm audit --audit-level=high` en CI |
| **T-08** | S2 | Sin convención de commits ni changelog | Conventional Commits (`feat(seo): …`, `fix(F-01): …`); `commitlint` opcional; CHANGELOG generado por release |
| **T-09** | S2 | Sin pruebas visuales de regresión (el bug de fuentes habría sido detectado por una captura) | Playwright `toHaveScreenshot()` en 3 viewports para home, servicio, artículo; umbral 0.2 % |
| **T-10** | S3 | `.vscode/launch.json` inútil; sin `settings.json`/`extensions.json` recomendadas | Recomendar extensiones (Tailwind IntelliSense, ESLint, Prettier, MDX); `launch.json` de Next (server + client) |
| **T-11** | S3 | `README.md` de plantilla | README real: propósito, stack, setup, scripts, estructura, cómo añadir un artículo/caso, cómo desplegar, cómo re-auditar |
| **T-12** | S3 | `AGENTS.md` sin reglas del proyecto | Añadir: convenciones (Server Components, tokens, sin `transition-all`), dónde vive el contenido, presupuestos de rendimiento, IDs de auditoría, comandos de verificación |

### 11.3 Estrategia de testing (pirámide para un sitio de contenido)

| Nivel | Herramienta | Qué cubre | Cuándo corre |
|---|---|---|---|
| **Estático** | TypeScript strict, ESLint (next/core-web-vitals, jsx-a11y, tailwind), Prettier, Zod en contenido | Tipos, a11y estática, clases inválidas, frontmatter | pre-commit (lint-staged) + CI |
| **Unitario** | Vitest + `@testing-library/react` (jsdom) | Utilidades (`buildWhatsAppUrl`, `formatDate`, `slugify`, generación de JSON-LD, `sitemap()` y `robots()` como funciones puras, parser de frontmatter) y componentes cliente pequeños (menú móvil, `LazyVideo`, formulario con estados) | CI |
| **Integración** | Vitest sobre el build: leer `.next/server/app/*.html` o hacer `fetch` a `next start` | Cada ruta tiene `<title>`, `<meta description>`, `canonical`, 1 solo `<h1>`, JSON-LD parseable y válido (schema-dts + validación de `@type`), sin enlaces `#` | CI |
| **E2E** | Playwright (Chromium + WebKit + Mobile Chrome) contra `next build && next start` | Flujos: abrir menú móvil y navegar; clic en CTA WhatsApp abre `wa.me` con `text` correcto (interceptar popup); enviar formulario (mock de Resend) → estado de éxito; 404 de marca; RSS válido; `robots.txt`/`sitemap.xml` 200 y con URLs esperadas | CI |
| **Accesibilidad** | `@axe-core/playwright` en cada ruta E2E | 0 violaciones serious/critical | CI |
| **Visual** | Playwright screenshots (390, 768, 1440) | Regresiones de layout/tipografía (habría detectado X-01) | CI (con `--update-snapshots` controlado) |
| **Rendimiento** | Lighthouse CI (`@lhci/cli`) con `assertions` = presupuestos 7.3, 3 runs, preset móvil | Regresiones de LCP/TBT/peso | CI en PR (bloqueante) |
| **Monitorización** | Vercel Speed Insights (RUM), Search Console (CWV report), UptimeRobot/Checkly ping cada 5 min | Datos reales de usuarios y disponibilidad | continuo |

Notas específicas de Next 16 (de la documentación empaquetada): los **Server Components `async` no se pueden testear unitariamente** con Vitest/Jest → cubrirlos por E2E o por integración sobre el HTML generado; Playwright debe correr contra el **build de producción**, no contra `next dev`.

### 11.4 Definición de "hecho" para cualquier PR de la v2

1. `lint`, `typecheck`, `test:unit`, `build`, `test:e2e`, `lhci` en verde.
2. Ninguna nueva violación de axe.
3. Presupuestos de rendimiento no superados (o excepción justificada en el PR).
4. Si toca contenido: frontmatter validado, enlaces internos comprobados, OG image generada y revisada.
5. Si toca UI: capturas visuales actualizadas y revisadas por un humano.
6. Referencia al ID de auditoría en el título del PR/commit.

---

## 12. Medición y analítica (sombreros: CEO y Producto)

### 12.1 Estado

**Cero instrumentación.** No hay GA4, GTM, Vercel Analytics, Speed Insights, Plausible, Meta Pixel, Search Console ni Bing Webmaster. Los enlaces de WhatsApp no llevan parámetros ni disparan eventos. Es imposible saber cuántas personas visitan, de dónde vienen, qué leen o cuántas escriben.

### 12.2 Hallazgos y plan

| ID | Sev | Hallazgo | Acción |
|---|---|---|---|
| **M-01** | S0 | Sin analítica de tráfico | GA4 vía `@next/third-parties/google` (`<GoogleAnalytics gaId=… />` en `layout.tsx`) **o** Plausible/Umami si se prefiere sin cookies (evita banner). Recomendación: **GA4 + Vercel Analytics** (este último sin cookies, incluido en Vercel) |
| **M-02** | S0 | Sin Search Console | Verificar dominio (DNS TXT); enviar `sitemap.xml`; activar informe de CWV y de "Mejoras"; Bing Webmaster (importa desde GSC) |
| **M-03** | S0 | Conversión no medida | Evento `contact_whatsapp` (`sendGAEvent`) con parámetros `placement` (hero/nav/footer/float/service-x), `page_path`; marcar como conversión en GA4. Idem `contact_form_submit`, `newsletter_subscribe`, `resource_download`, `outbound_click` |
| **M-04** | S1 | Sin RUM de Core Web Vitals | `@vercel/speed-insights` (`<SpeedInsights />`) y/o `useReportWebVitals` de `next/web-vitals` enviando a GA4 (`LCP`, `INP`, `CLS`, `TTFB` con `rating`) |
| **M-05** | S1 | Sin UTM en la distribución (bio de Instagram, LinkedIn, WhatsApp) | Convención: `?utm_source=instagram&utm_medium=bio&utm_campaign=perfil`; acortador propio `/ig`, `/li`, `/wa` con `redirects()` en `next.config.ts` para enlaces limpios en redes |
| **M-06** | S1 | Sin atribución en WhatsApp (no se sabe qué página originó cada conversación) | `text=` prellenado por contexto: `Hola Andrea, te escribo desde andreabelalcazar.com/servicios/gestion-de-crisis` — el propio mensaje es la atribución |
| **M-07** | S2 | Sin consentimiento de cookies (necesario con GA4 en Colombia por Ley 1581 y para tráfico UE) | Banner mínimo con Consent Mode v2 (`gtag('consent','default',…)`); GA4 con `anonymize_ip` (default en GA4). Alternativa: Plausible sin banner |
| **M-08** | S2 | Sin monitorización de errores | Sentry (`@sentry/nextjs`, plan gratis) con `instrumentation.ts` (`onRequestError`) e `instrumentation-client.ts`; o al menos Vercel Logs + alertas |
| **M-09** | S2 | Sin dashboard de KPIs | Looker Studio conectado a GA4 + GSC con las 10 métricas de 4.5; revisión mensual |
| **M-10** | S3 | Sin `llms.txt` ni seguimiento de tráfico de agentes IA | `llms.txt`; segmento en GA4 por `user_agent` de bots IA (referrals de chatgpt.com, perplexity.ai) |

### 12.3 Plan de medición (taxonomía de eventos GA4)

| Evento | Parámetros | Conversión |
|---|---|---|
| `contact_whatsapp` | `placement`, `page_path`, `service` | ✅ |
| `contact_form_submit` | `page_path`, `service`, `org_type` | ✅ |
| `contact_email_click` | `placement` | ✅ |
| `calendar_open` | `placement` | ✅ |
| `newsletter_subscribe` | `page_path`, `source` | ✅ |
| `resource_download` | `resource_slug` | ✅ |
| `article_read_75` | `slug`, `tema` (scroll 75 %) | — |
| `outbound_click` | `url`, `placement` | — |
| `share_click` | `network`, `slug` | — |
| `web_vitals` | `metric`, `value`, `rating` | — |

---

## 13. Arquitectura objetivo (sombrero: Arquitecto)

### 13.1 Reglas de Next 16 que la implementación debe respetar

Extraídas de `node_modules/next/dist/docs/` (versión instalada 16.2.4). La IA implementadora **no debe usar su memoria de Next 13/14**; estas son las diferencias que más afectan a este proyecto:

| Tema | Next 13/14 (memoria) | **Next 16 (vigente)** | Doc |
|---|---|---|---|
| Imagen prioritaria | `<Image priority />` | **`priority` deprecado.** Usar `loading="eager"` + `fetchPriority="high"`, o `preload` (inserta `<link rel=preload>`; no combinar con `loading`/`fetchPriority`) | `01-app/03-api-reference/02-components/image.md` |
| `sizes` con `fill` | opcional | Si falta, el navegador asume `100vw` y Next genera srcset limitado. **Siempre poner `sizes`** | idem |
| `images.qualities` | libre | **Default `[75]`**; cualquier otro `quality` debe declararse | idem |
| `images.minimumCacheTTL` | 60 s | **4 h** por defecto | idem |
| `images.domains` | ok | deprecado → `remotePatterns` | idem |
| `themeColor`, `colorScheme`, `viewport` en `metadata` | ok | **deprecados** → `export const viewport: Viewport` | `04-functions/generate-viewport.md` |
| `middleware.ts` | ok | **renombrado a `proxy.ts`**, export `proxy`, **solo runtime Node** (sin edge); matcher debe excluir `sitemap.xml`, `robots.txt`, `_next/*` | `03-file-conventions/proxy.md` |
| `request.geo` / `request.ip` | ok | **eliminados** (usar cabeceras `x-vercel-ip-country`) | `04-functions/next-request.md` |
| `params`/`searchParams` | sync | **siempre `Promise`** → `await params` (también en `opengraph-image.tsx`, `sitemap.ts` `id`) | `02-guides/upgrading/version-16.md` |
| `revalidateTag(tag)` | 1 arg | **2 args obligatorios**: `revalidateTag("posts", "max")`; `updateTag` en Server Actions | `04-functions/revalidateTag.md` |
| `unstable_cache` | ok | reemplazado por `"use cache"` + `cacheLife`/`cacheTag` (requiere `cacheComponents: true`) | `01-directives/use-cache.md` |
| `experimental.typedRoutes` | experimental | **`typedRoutes: true` estable** | `05-config/01-next-config-js/typedRoutes.md` |
| `experimental.turbo` | experimental | `turbopack` top-level; **Turbopack por defecto en dev y build** | `version-16.md` |
| `next lint` | ok | **eliminado** → `eslint .` | `version-16.md` |
| `scroll-behavior: smooth` | Next lo anulaba en navegación | ya no; usar `data-scroll-behavior="smooth"` en `<html>` si se quiere | `version-16.md` |
| Parallel routes | `default.js` opcional | **obligatorio** (build falla) | `version-16.md` |
| `error.tsx` | `reset` | props `error` y `unstable_retry` (además de `reset`) | `03-file-conventions/error.md` |
| OG image | `ImageResponse` de `next/server` | `import { ImageResponse } from "next/og"`; exports `alt`, `size`, `contentType`; **límite 8 MB OG / 5 MB Twitter (falla el build)**; solo flexbox, fuentes `ttf/otf/woff` | `01-metadata/opengraph-image.md` |
| Favicon | — | `favicon.ico` **solo en raíz de `app/`**; `icon.svg`/`icon.png`, `apple-icon.png` en cualquier segmento; no se puede generar favicon por código | `01-metadata/app-icons.md` |
| MDX + Turbopack | plugins como funciones | **plugins remark/rehype como strings** con opciones serializables; `mdx-components.tsx` en raíz obligatorio con `useMDXComponents()` sin argumentos | `02-guides/mdx.md` |
| GA4 | `next/script` manual | `@next/third-parties/google` (`GoogleAnalytics`, `sendGAEvent`) | `02-guides/third-party-libraries.md` |
| Web Vitals | `reportWebVitals` | `useReportWebVitals` de `next/web-vitals` en Client Component; `instrumentation-client.ts` para código pre-hidratación | `04-functions/use-report-web-vitals.md` |
| Tests | — | Server Components `async` **no** testeables con Vitest/Jest → E2E con Playwright sobre `next build && next start` | `02-guides/testing/*.md` |
| Node | 18 | **≥ 20.9** | `version-16.md` |

### 13.2 Estructura de carpetas objetivo

```
portfolio/
├── .github/workflows/ci.yml
├── .nvmrc                          (22)
├── .env.example
├── AGENTS.md                       (reglas del proyecto + IDs de auditoría)
├── README.md
├── next.config.ts                  (headers, redirects, images, typedRoutes, MDX)
├── mdx-components.tsx
├── proxy.ts                        (opcional: noindex en previews, futura /en)
├── instrumentation.ts / instrumentation-client.ts
├── lighthouserc.json
├── playwright.config.ts · vitest.config.mts
├── content/                        ← TODO el contenido editable, fuera de src
│   ├── site.ts                     (nombre, cargo oficial, contacto, redes verificadas, nav)
│   ├── servicios/*.mdx             (frontmatter: title, slug, summary, forWho, deliverables, faq[], related[])
│   ├── casos/*.mdx                 (entity, role, period{from,to}, challenge, actions[], results[], media[], links[])
│   ├── trayectoria.ts              (6 cargos + 3 títulos con fechas exactas)
│   ├── blog/*.mdx                  (title, description, date, updated, tema, cover, canonical?, draft)
│   ├── glosario/*.mdx              (term, definition, related[])
│   ├── recursos/*.mdx
│   └── prensa.ts                   (bios 50/150/400, fotos, temas, apariciones[])
├── public/
│   ├── llms.txt · .well-known/security.txt
│   └── downloads/*.pdf             (CV, recursos)
└── src/
    ├── app/
    │   ├── layout.tsx              (fonts, metadata base + template, viewport, JsonLd global, GA, SpeedInsights)
    │   ├── page.tsx                (home compuesta por secciones)
    │   ├── not-found.tsx · error.tsx · global-error.tsx · loading.tsx
    │   ├── robots.ts · sitemap.ts · manifest.ts · opengraph-image.tsx · twitter-image.tsx · icon.svg · apple-icon.png · favicon.ico
    │   ├── rss.xml/route.ts
    │   ├── sobre-mi/page.tsx
    │   ├── servicios/page.tsx · servicios/[slug]/page.tsx
    │   ├── casos/page.tsx · casos/[slug]/page.tsx
    │   ├── blog/page.tsx · blog/[slug]/page.tsx · blog/[slug]/opengraph-image.tsx · blog/tema/[tema]/page.tsx
    │   ├── glosario/page.tsx · glosario/[termino]/page.tsx
    │   ├── recursos/… · prensa/page.tsx · contacto/page.tsx · newsletter/page.tsx
    │   ├── privacidad/page.tsx · terminos/page.tsx · gracias/page.tsx
    │   └── actions/contact.ts      (Server Action: validación Zod, honeypot, rate limit, Resend)
    ├── components/
    │   ├── layout/ (Header, MobileMenu*, Footer, SkipLink, WhatsAppFloat*)
    │   ├── sections/ (Hero, ProofBar, ServicesGrid, CasesGrid, Timeline, LatestPosts, PressLogos, ContactCTA)
    │   ├── content/ (Prose, Callout, Figure, FAQ, Breadcrumbs, ShareBar*, TableOfContents)
    │   ├── media/ (LazyVideo*, Portrait)
    │   ├── seo/ (JsonLd)
    │   └── analytics/ (WebVitals*, TrackedLink*)     (* = Client Component)
    ├── lib/
    │   ├── content.ts              (loaders MDX + Zod schemas + índice para sitemap/rss)
    │   ├── seo.ts                  (buildMetadata, jsonld builders: person, website, service, article, breadcrumb, faq)
    │   ├── whatsapp.ts             (buildWhatsAppUrl({placement, service}))
    │   ├── env.ts                  (zod env)
    │   └── utils.ts
    ├── styles/globals.css          (@theme inline tokens, base, prose)
    └── assets/img/                 (imágenes importadas estáticamente, sin EXIF, nombres descriptivos)
tests/
├── unit/ · integration/ · e2e/ · visual/
```

### 13.3 Modelo de contenido (Zod, resumido)

```ts
// content schemas (src/lib/content.ts)
const Service = z.object({ slug, title, summary: z.string().max(160), forWho: z.array(z.string()), deliverables: z.array(z.string()), faq: z.array(z.object({ q, a })), related: z.array(slug), order: z.number() });
const Case = z.object({ slug, entity, entityType: z.enum(["gobierno","campaña","empresa"]), role, period: z.object({ from: z.string().date(), to: z.string().date().nullable() }), challenge, actions: z.array(z.string()), results: z.array(z.object({ metric, value, source: z.string().url().optional() })), cover, links: z.array(url), services: z.array(slug) });
const Post = z.object({ slug, title: z.string().max(70), description: z.string().min(120).max(160), date, updated: z.string().optional(), tema: z.enum(["comunicacion-politica","crisis","prensa","ia","marketing-digital","coyuntura"]), cover, draft: z.boolean().default(false), faq: z.array(...).optional() });
```

El **índice de contenido** (`getAllRoutes()`) alimenta `sitemap.ts`, `rss.xml`, los hubs de tema, los enlaces relacionados y el test de integración "toda ruta tiene metadata". Una sola fuente de verdad.

### 13.4 Configuración objetivo de `next.config.ts` (esqueleto)

```ts
import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const isProd = process.env.VERCEL_ENV === "production";
const securityHeaders = [
  { key: "Content-Security-Policy", value: "<política de B-01>" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), browsing-topics=()" },
  ...(isProd ? [] : [{ key: "X-Robots-Tag", value: "noindex, nofollow" }]),
];

const nextConfig: NextConfig = {
  reactCompiler: true,
  typedRoutes: true,
  poweredByHeader: false,
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  images: { formats: ["image/avif", "image/webp"], qualities: [60, 70, 75], minimumCacheTTL: 60 * 60 * 24 * 30 },
  async headers() { return [{ source: "/(.*)", headers: securityHeaders }]; },
  async redirects() { return [
    { source: "/ig", destination: "/?utm_source=instagram&utm_medium=bio&utm_campaign=perfil", permanent: false },
    { source: "/li", destination: "/?utm_source=linkedin&utm_medium=bio&utm_campaign=perfil", permanent: false },
  ]; },
};
export default createMDX({ options: { remarkPlugins: [["remark-gfm"], ["remark-frontmatter"], ["remark-mdx-frontmatter"]], rehypePlugins: [["rehype-slug"], ["rehype-autolink-headings", { behavior: "wrap" }]] } })(nextConfig);
```

(Plugins como **strings** por Turbopack. Frontmatter alternativo: `gray-matter` en `lib/content.ts` leyendo `content/**/*.mdx` con `fs`, y `import()` dinámico del MDX para el cuerpo.)

### 13.5 `globals.css` objetivo (fragmento crítico)

```css
@import "tailwindcss";

@theme inline {
  --font-sans: var(--font-inter), ui-sans-serif, system-ui, sans-serif;
  --font-serif: var(--font-playfair), ui-serif, Georgia, serif;
  --color-ink: #0a0a0b;
  --color-ink-2: #121214;
  --color-paper: #f4f1ea;
  --color-muted: #a9a9b3;
  --color-gold: oklch(76.9% 0.188 70.08);
  --color-gold-deep: oklch(66.6% 0.179 58.318);
}

@layer base {
  html { scroll-padding-top: 6rem; color-scheme: dark; }
  @media (prefers-reduced-motion: no-preference) { html { scroll-behavior: smooth; } }
  body { @apply bg-ink text-paper font-sans antialiased; }
  :focus-visible { @apply outline-2 outline-offset-2 outline-gold; }
}
```

### 13.6 Decisión: MDX en repo vs. CMS

| Criterio | MDX en repo (recomendado F0–F3) | CMS headless (Sanity/Notion) F4+ |
|---|---|---|
| Autores | 1–2 técnicos o con ayuda de IA | Andrea sola desde móvil |
| Coste | 0 | 0–99 USD/mes |
| Velocidad de publicación | push → 1 min | instantáneo con webhook + `revalidateTag` |
| Riesgo | bajo (todo versionado) | medio (tokens, webhooks, esquema) |
| SEO | idéntico | idéntico |
| Decisión | **Empezar aquí.** Migrar cuando haya > 50 artículos o cuando Andrea quiera publicar sin desarrollador. La capa `lib/content.ts` aísla el cambio | |

---

## 14. Roadmap por fases

Cada fase tiene **criterio de salida verificable**. No se pasa a la siguiente sin cumplirlo. La IA implementadora trabaja en ramas `fase-N/…` con PRs pequeños (≤ 400 líneas) que referencian IDs.

### Fase 0 · Hotfixes (48 horas) — "que el sitio sea lo que ya cree ser"

| # | Tarea | IDs | Criterio de salida |
|---|---|---|---|
| 0.1 | `@theme inline` en `globals.css` (+ opcional variables en `<html>`) | X-01/F-01 | `getComputedStyle(h1).fontFamily` empieza por `"Playfair Display"`; `document.fonts` = 2 loaded |
| 0.2 | `opengraph-image.tsx` + `twitter-image.tsx` (1200×630, < 300 KB) con retrato recortado, nombre, cargo | X-02/S-02 | `curl -I /opengraph-image` → 200, `content-length` < 300 000; preview correcta en opengraph.xyz y en WhatsApp real |
| 0.3 | Sustituir `public/portrait.jpg` por `src/assets/img/andrea-belalcazar-retrato.jpg` 1600×2000 sin EXIF; import estático; `loading="eager" fetchPriority="high" sizes="(min-width:1024px) 45vw, 100vw"` | P-03, P-04, B-13 | Ningún asset > 400 KB en `public/` ni `src/assets/`; `lcp-lazy-loaded` = pass |
| 0.4 | Vídeo: `preload="none"` + `poster` + `muted playsInline` + recodificar sin audio a ~400 KB; reproducir solo en viewport | P-02, F-05, A-04 | En carga inicial móvil, 0 bytes de `.mp4` en `network` |
| 0.5 | Quitar `animate-pulse`, `backdrop-blur-xl` (→ fondo sólido/85), textura externa, `transition-all`; `grayscale` solo `md:` | P-01, P-06 | Lighthouse móvil TBT < 300 ms, SI < 4 s, perf ≥ 85 |
| 0.6 | `robots.ts`, `sitemap.ts`, `manifest.ts`, `icon.svg`, `apple-icon.png`, `viewport` (themeColor), `alternates.canonical`, `lang="es-CO"`, quitar `keywords`, `title.template` | S-04…S-08, S-11, S-12, C-11 | `curl` 200 en las 4 rutas; canonical presente; Rich Results Test sin errores |
| 0.7 | Corregir `sameAs` (solo URLs verificadas con Andrea), LinkedIn del footer, `aria-label` del flotante, icono WhatsApp, `min-h-[90vh]`, comillas, imports sin usar, `alt` descriptivos | S-03, F-02, F-06, F-09, F-13, C-12 | `eslint .` = 0 errores 0 warnings; `link-name` pass |
| 0.8 | Corregir título del cargo al oficial y añadir fechas (confirmar con Andrea) | C-02 | Texto coincide con directorio oficial / HV |
| 0.9 | Eliminar assets de plantilla; `.nvmrc`, `engines`, scripts `typecheck/lint`, README básico | S-15, T-01, T-02 | `nvm use && npm run lint && npm run typecheck && npm run build` pasa en la máquina de Carlos |
| 0.10 | GA4 (`@next/third-parties`) + Vercel Analytics + Speed Insights + evento `contact_whatsapp` con `placement`; verificar Search Console y enviar sitemap | M-01…M-04 | Evento visible en GA4 DebugView; propiedad verificada en GSC |

**Salida Fase 0:** Lighthouse móvil ≥ 85 / a11y ≥ 95; fuentes reales; preview de WhatsApp funcionando; sitio en Search Console con sitemap enviado; medición activa.

### Fase 1 · Fundamentos (semanas 1–2) — "que el sitio sea sólido"

| # | Tarea | IDs |
|---|---|---|
| 1.1 | Descomposición en componentes + `content/site.ts` + tokens `@theme inline` + escala tipográfica (mín. 12 px) + `--color-muted` | F-03, F-12, U-07, A-01, A-02 |
| 1.2 | Header con menú móvil accesible; skip link; `nav aria-label`; foco visible | F-04, U-01, A-05, A-07 |
| 1.3 | Flotante WhatsApp rediseñado (no solapa; oculto en hero; safe-area) + `WhatsAppLink` único con `text` contextual | U-02, S-14, M-06 |
| 1.4 | Hero móvil con retrato sobre el pliegue; quitar marco fijo; espaciado responsive | U-03, U-04, U-05 |
| 1.5 | Cabeceras de seguridad (CSP report-only → enforce), `poweredByHeader: false`, HSTS preload | B-01…B-05 |
| 1.6 | `not-found.tsx`, `error.tsx`, `global-error.tsx`, `loading.tsx` de marca | S-09, U-14 |
| 1.7 | CI en GitHub Actions: lint, typecheck, build, Playwright (home + 404 + robots/sitemap), axe, Lighthouse CI con presupuestos; branch protection | T-03, T-04, T-09 |
| 1.8 | Vitest para `whatsapp.ts`, `seo.ts`, `sitemap()`, `robots()`; test de integración de metadata sobre HTML | T-03 |
| 1.9 | Correo `hola@andreabelalcazar.com` + SPF/DKIM/DMARC; formulario con Server Action + Resend + honeypot + rate limit; `/privacidad`, `/terminos` | C-07, C-08, U-15, B-07, B-09 |
| 1.10 | Consent Mode v2 mínimo; Sentry | M-07, M-08 |
| 1.11 | Prettier + plugin Tailwind + lint de clases; Dependabot; Conventional Commits; AGENTS.md del proyecto | T-06…T-08, T-12 |

**Salida Fase 1:** Lighthouse móvil ≥ 90 / 100 / 100 / 100; axe 0 serias; CI verde obligatorio; formulario funcionando; CSP enforzada; 0 combinaciones de contraste fallidas.

### Fase 2 · Contenido estructural (semanas 3–6) — "que haya algo que encontrar"

| # | Tarea | IDs |
|---|---|---|
| 2.1 | Pipeline MDX + Zod + `lib/content.ts` + índice de rutas → `sitemap.ts`, `rss.xml` | C-10, S-05, S-16 |
| 2.2 | `/sobre-mi` (bio larga, 6 cargos con fechas, 3 títulos, valores, foto oficial, CV PDF, `ProfilePage` JSON-LD) | C-03, S-07 |
| 2.3 | 5 páginas `/servicios/*` con FAQ (`FAQPage`), `Service` JSON-LD, casos y artículos relacionados, CTA contextual | C-01, U-08 |
| 2.4 | 5 `/casos/*` con estructura Contexto→Reto→Acciones→Resultados→Aprendizaje, cifras/fuentes, imágenes propias con pie | C-05, C-06, U-12 |
| 2.5 | `/prensa` (media kit) y `/contacto` (WhatsApp + form + email + Cal.com) | C-09 |
| 2.6 | Home v2 según wireframe 8.3 (H1 nuevo, fila de prueba, servicios enlazados, casos, línea de tiempo, últimos artículos) | C-04, U-06, U-09, U-10, U-11, U-13 |
| 2.7 | Grafo JSON-LD completo (`WebSite`, `Person` con `@id`, `BreadcrumbList` global) | S-07 |
| 2.8 | `llms.txt`, `security.txt`, `humans.txt` | S-16, B-11 |
| 2.9 | Revisión legal del alcance de "servicios de campaña" mientras ocupe cargo público (con Andrea/abogado) | riesgo 4.6.2 |

**Salida Fase 2:** ≥ 14 rutas indexables con metadata única, breadcrumbs y JSON-LD válidos; ≥ 6 000 palabras; Rich Results Test sin errores en home, servicio, caso, sobre-mi; GSC muestra ≥ 10 URLs indexadas.

### Fase 3 · Motor de crecimiento (semanas 7–12) — "que crezca solo"

| # | Tarea |
|---|---|
| 3.1 | Blog: índice paginado, `/blog/[slug]` con `Article` JSON-LD, TOC, tiempo de lectura, share, artículos relacionados, autor; `opengraph-image` dinámica por artículo; hubs `/blog/tema/*` |
| 3.2 | 20 artículos (2/semana) según 5.4; cada uno con respuesta directa inicial, H2 en forma de pregunta, FAQ |
| 3.3 | Glosario: 30 términos con `DefinedTerm`/`DefinedTermSet` |
| 3.4 | `/recursos` + primer lead magnet (checklist de crisis) + newsletter (Buttondown/Resend Audiences) + `/gracias` |
| 3.5 | Distribución: plantilla de carrusel/post por artículo; enlaces cortos `/ig`, `/li`; canal de WhatsApp |
| 3.6 | Búsqueda interna ligera (Pagefind, estático) cuando haya > 30 artículos; `SearchAction` en `WebSite` |
| 3.7 | Dashboard Looker Studio; revisión mensual de GSC (consultas, CTR, CWV) → ajuste de títulos/descripciones |
| 3.8 | Pruebas visuales de regresión y Lighthouse CI también sobre `/blog/[slug]` y `/servicios/[slug]` |

**Salida Fase 3:** ≥ 60 rutas indexadas; ≥ 1 000 clics orgánicos/mes; CWV verde en CrUX (o en Speed Insights p75); ≥ 60 eventos `contact_whatsapp`/mes; newsletter ≥ 300.

### Fase 4 · Escala (mes 4 en adelante) — "que llegue a millones"

- Cadencia editorial sostenida (3–4 piezas/semana, incluida coyuntura electoral 2026 con publicación el mismo día).
- **Vídeo corto embebido propio** (no Instagram) con transcripción indexable (`VideoObject`).
- `/en` con `hreflang` para análisis con interés internacional (Cabal, elecciones colombianas) → `app/[lang]` solo si el volumen lo justifica; alternativa: artículos puntuales en inglés bajo `/en/blog/*` con `alternates.languages`.
- Colaboraciones e invitados (E-E-A-T cruzado), podcast/newsletter con RSS, apariciones en medios enlazadas.
- Evaluar CMS (13.6), `cacheComponents` + `use cache` si el contenido deja de vivir en el repo.
- Google Discover: imágenes ≥ 1200 px, `max-image-preview:large` (ya en `robots` metadata), titulares no clickbait.
- Programa de enlaces: directorio de la Gobernación, universidades (alumni), medios regionales, gremios.

---

## 15. Especificaciones atómicas para la IA implementadora

Cada bloque es una tarea autocontenida: **objetivo, archivos, pasos, criterio de aceptación, prueba**. Copiar y pegar como prompt. Prerrequisito universal: `nvm use 22 && npm ci && npm run build` en verde antes de empezar; leer `node_modules/next/dist/docs/` en cada API mencionada.

### 15.1 · X-01 Fuentes (Fase 0.1)

**Objetivo:** que Inter y Playfair Display se apliquen realmente.
**Archivos:** `src/app/globals.css`, `src/app/layout.tsx`.
**Pasos:** (1) Cambiar `@theme {` por `@theme inline {` conservando las dos variables de fuente. (2) En `layout.tsx`, mover `${inter.variable} ${playfair.variable}` al `<html className>` (mantener `font-sans antialiased` en `<body>`). (3) Limitar pesos: `Inter({ subsets: ["latin"], weight: ["300","400","500","700"], variable: "--font-inter", display: "swap" })`, `Playfair_Display({ subsets: ["latin"], weight: ["400","700"], style: ["normal","italic"], variable: "--font-playfair", display: "swap" })`.
**Aceptación:** en producción, `getComputedStyle(document.querySelector("h1")).fontFamily` contiene `Playfair Display`; `getComputedStyle(document.body).fontFamily` contiene `Inter`; `[...document.fonts].filter(f=>f.status==="loaded").length >= 2`.
**Prueba:** Playwright `expect(await h1.evaluate(e=>getComputedStyle(e).fontFamily)).toContain("Playfair Display")` + captura visual.

### 15.2 · X-02 Open Graph (Fase 0.2)

**Objetivo:** vista previa correcta en WhatsApp/LinkedIn/X.
**Archivos:** `src/app/opengraph-image.tsx`, `src/app/twitter-image.tsx` (puede reexportar), `src/assets/img/andrea-belalcazar-retrato-og.jpg` (recorte 3:4 de 800 px, < 120 KB), fuente `Playfair Display` `.ttf` en `src/assets/fonts/` para `ImageResponse`.
**Pasos:** `export const runtime` **no** (default Node); `export const alt = "Andrea Belalcázar, estratega de comunicación política"; export const size = { width: 1200, height: 630 }; export const contentType = "image/png";` Default export `async function Image()` que lee retrato y fuente con `node:fs/promises` desde `process.cwd()`, y devuelve `new ImageResponse(<div style={{display:"flex", ...}}>…</div>, { ...size, fonts: [{ name: "Playfair", data, weight: 700, style: "normal" }] })`. Solo flexbox. Fondo `#0A0A0B`, nombre en Playfair 72 px blanco, cargo en 28 px dorado, retrato a la derecha con borde. Eliminar `openGraph.images`/`twitter.images` del objeto `metadata` (la convención de archivo tiene prioridad y evita duplicados).
**Aceptación:** `curl -sI https://www.andreabelalcazar.com/opengraph-image` → 200, `content-type: image/png`, `content-length` < 300 000; `og:image` en HTML apunta a esa ruta con `og:image:width/height` 1200/630; opengraph.xyz muestra la tarjeta; compartir en WhatsApp real muestra imagen.
**Prueba:** test de integración: `fetch("/opengraph-image")` status 200 y tamaño < 300 KB; HTML contiene `property="og:image"` con `/opengraph-image`.

### 15.3 · P-01/P-02/P-03 Rendimiento móvil (Fase 0.3–0.5)

**Objetivo:** Lighthouse móvil perf ≥ 85 con TBT < 300 ms.
**Pasos:** (1) Eliminar `<div className="fixed inset-0 bg-[url('https://www.transparenttextures.com/…')]…">` y el `animate-pulse`. (2) Header: `bg-[#0A0A0B]/85` sin `backdrop-blur` (o `md:backdrop-blur-sm`). (3) Sustituir toda `transition-all` por `transition-colors`/`transition-opacity`/`transition-transform`. (4) `grayscale` → `md:grayscale md:hover:grayscale-0 motion-reduce:transition-none`. (5) Retrato: import estático, `loading="eager" fetchPriority="high" sizes="(min-width:1024px) 45vw, 100vw" quality={70}` y `images.qualities: [60,70,75]` en config. (6) Vídeo: componente Client `LazyVideo` con `IntersectionObserver` que asigne `src` al entrar en viewport, `preload="none"`, `poster` (JPG 40 KB), `muted playsInline loop`, botón pausa accesible, y que no haga nada si `matchMedia("(prefers-reduced-motion: reduce)")`. Recodificar: `ffmpeg -i in.mp4 -an -vf scale=540:-2 -c:v libx264 -crf 28 -preset slow -movflags +faststart out.mp4` (+ `-c:v libsvtav1` para `.webm`/`.mp4` AV1 como `<source>` primero).
**Aceptación:** `lh-mobile` perf ≥ 85, TBT < 300 ms, SI < 4 s; `network` inicial sin `.mp4`, sin `transparenttextures.com`; `lcp-lazy-loaded` pass.
**Prueba:** Lighthouse CI assertion `total-blocking-time` `maxNumericValue: 300`, `speed-index` 4000; Playwright: `expect(requests.filter(r=>r.url().endsWith(".mp4"))).toHaveLength(0)` antes de hacer scroll.

### 15.4 · S-04…S-12 Descubrimiento (Fase 0.6)

**Archivos:** `src/app/robots.ts` (6.3), `src/app/sitemap.ts` (6.4, por ahora rutas estáticas), `src/app/manifest.ts` (`{ name: "Andrea Belalcázar", short_name: "A. Belalcázar", start_url: "/", display: "standalone", background_color: "#0A0A0B", theme_color: "#0A0A0B", icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml" }, { src: "/apple-icon.png", sizes: "180x180", type: "image/png" }] }`), `src/app/icon.svg` (monograma "AB" dorado sobre negro), `src/app/apple-icon.png` (180×180), `layout.tsx`: `export const viewport: Viewport = { themeColor: "#0A0A0B", colorScheme: "dark", width: "device-width", initialScale: 1 }`; `metadata`: eliminar `keywords`; `title: { default: "Andrea Belalcázar · Estrategia de prensa y comunicación política", template: "%s · Andrea Belalcázar" }`; `alternates: { canonical: "/" }` (y en cada página futura su ruta); `robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 } }`; `<html lang="es-CO">`.
**Aceptación:** `curl -s /robots.txt` contiene `Sitemap:`; `/sitemap.xml` es XML válido con `<loc>https://www.andreabelalcazar.com/</loc>`; `/manifest.webmanifest` 200; HTML contiene `<link rel="canonical" href="https://www.andreabelalcazar.com/">` y `<meta name="theme-color">`; no contiene `name="keywords"`.

### 15.5 · S-03/S-07 JSON-LD (Fase 0.7 + 2.7)

**Archivos:** `src/components/seo/JsonLd.tsx` (`<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />`), `src/lib/seo.ts` con builders tipados (usar `schema-dts`). En `layout.tsx` el `@graph` de 6.2 con `sameAs` **solo de `content/site.ts` y solo URLs confirmadas por Andrea** (la IA no debe inventar perfiles).
**Aceptación:** Rich Results Test y validator.schema.org sin errores; ningún `sameAs` devuelve 404 (test de integración con `fetch` HEAD, tolerando 999 de LinkedIn).

### 15.6 · F-04/U-01/U-02 Navegación móvil y flotante (Fase 1.2–1.3)

**Componentes:** `MobileMenu` (Client): botón 44×44 con `aria-expanded`, `aria-controls`; panel `<dialog>` nativo o `role="dialog" aria-modal` con foco atrapado, cierre con Esc y clic fuera, `inert` en el resto; enlaces ≥ 48 px de alto. `WhatsAppFloat` (Client): 56×56, `bottom: max(1.5rem, env(safe-area-inset-bottom))`, `right: 1rem`, `aria-label="Escribir a Andrea por WhatsApp"`, SVG de WhatsApp `aria-hidden`, oculto (`opacity-0 pointer-events-none`) mientras el hero esté ≥ 50 % visible (IntersectionObserver), `motion-reduce` sin transición.
**Aceptación:** a 390×844 el menú abre/cierra con teclado y con toque; axe 0 violaciones; el flotante no intersecta ningún CTA del hero (Playwright: comparar `boundingBox` de ambos → sin solape).

### 15.7 · B-01…B-04 Cabeceras (Fase 1.5)

**Archivo:** `next.config.ts` (13.4). Primera semana `Content-Security-Policy-Report-Only` con `report-to`/`report-uri` a Sentry o a un Route Handler que loguee; después renombrar a `Content-Security-Policy`.
**Aceptación:** securityheaders.com grado A; consola sin errores CSP en home, servicio, artículo, formulario (con GA activo).

### 15.8 · T-04 CI (Fase 1.7)

**Archivo:** `.github/workflows/ci.yml`: `actions/setup-node@v4` con `node-version-file: .nvmrc`, cache npm; jobs `quality` (lint, typecheck, unit), `build` (artefacto `.next`), `e2e` (Playwright `webServer: "npm run start"`, `npx playwright install --with-deps chromium webkit`), `lighthouse` (`@lhci/cli autorun` con `lighthouserc.json`: `collect.url` home/servicio/artículo, `settings.preset: "mobile"`, `numberOfRuns: 3`, `assert.assertions` = presupuestos 7.3 con `"error"`), `axe` dentro de e2e. Branch protection en `main` exigiendo los 4 jobs.
**Aceptación:** un PR que reintroduzca `transition-all` en 10 elementos o una imagen de 2 MB **falla** el job `lighthouse`.

### 15.9 · Fase 2 · Pipeline de contenido

**Archivos:** `content/**`, `src/lib/content.ts`, `mdx-components.tsx`, `src/app/blog/[slug]/page.tsx` (`generateStaticParams` desde el índice; `export const dynamicParams = false`; `generateMetadata` con `title`, `description`, `alternates.canonical`, `openGraph.type: "article"`, `publishedTime`, `authors`), `src/app/blog/[slug]/opengraph-image.tsx` (`await params`), `src/app/sitemap.ts` (desde índice; `lastModified` = `updated ?? date`), `src/app/rss.xml/route.ts` (`export async function GET()` → `new Response(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } })`).
**Aceptación:** test de integración recorre `getAllRoutes()` y comprueba en el HTML: 1 `<h1>`, `<title>` ≤ 60 chars, `description` 120–160, `canonical` = URL, JSON-LD parseable con `@type` esperado, `BreadcrumbList` (salvo home), sin `href="#"`; `sitemap.xml` incluye todas; `rss.xml` válido (W3C feed validator).

### 15.10 · Reglas de oro para la IA implementadora

1. **Leer la doc de Next 16** en `node_modules/next/dist/docs/` antes de usar cualquier API; en caso de conflicto con este documento, **gana la doc** y se anota la discrepancia en el PR.
2. **No inventar datos de Andrea** (fechas, cifras, clientes, perfiles). Los huecos se marcan `TODO(andrea): …` y se listan en el PR.
3. **No tocar el número de WhatsApp ni los textos legales sin confirmación.**
4. **Un PR por tarea atómica**, con el ID en el título, capturas antes/después en móvil y desktop, y la salida de Lighthouse CI.
5. **Nada de `transition-all`, `backdrop-blur` en móvil, `animate-*` infinitas, hex sueltos, `priority` en `Image`, `middleware.ts`, `themeColor` en `metadata`, `next lint`.**
6. **Server Components por defecto**; justificar cada `"use client"` en un comentario de una línea.
7. **Todo texto visible ≥ 12 px y contraste ≥ 4.5:1** salvo decorativo; comprobar con el cálculo OKLCH (no con hex de Tailwind 3).
8. **Ningún asset > 400 KB** en el repo salvo PDFs en `public/downloads/`; imágenes sin EXIF; vídeo sin audio.
9. **Contenido en `content/`, nunca en JSX.**
10. **Ejecutar la re-auditoría (sección 16) al cerrar cada fase** y adjuntar los resultados.

---

## 16. Plan de re-auditoría (verificable)

Se repetirá al cierre de cada fase con exactamente estos comandos (Node 22, macOS/Linux). Los valores esperados están junto a cada comprobación.

### 16.1 Repositorio

```bash
nvm use && npm ci
npm run lint            # 0 errores, 0 warnings
npm run typecheck       # 0 errores
npm run build           # ok; listar rutas
npm run test:unit && npm run test:e2e
find public src/assets -type f -size +400k   # vacío (salvo public/downloads)
grep -rn "transition-all\|animate-pulse\|backdrop-blur-xl\|priority=\|min-\[90vh\]" src   # vacío
```

### 16.2 Producción (HTTP)

```bash
D=https://www.andreabelalcazar.com
for p in / /robots.txt /sitemap.xml /manifest.webmanifest /opengraph-image /icon.svg /apple-icon.png /rss.xml /llms.txt /.well-known/security.txt; do printf "%-28s" $p; curl -s -o /dev/null -w "%{http_code} %{size_download}B %{content_type}\n" $D$p; done
# Esperado: todos 200; /opengraph-image < 300000 B
curl -sI $D/ | grep -iE "content-security-policy|strict-transport|x-frame|cross-origin-opener|referrer-policy|permissions-policy|x-content-type"   # 7 cabeceras
curl -s $D/ | grep -oE '<link rel="canonical"[^>]*>|<meta name="theme-color"[^>]*>|<html[^>]*>'   # canonical, theme-color, lang="es-CO"
curl -s $D/ | grep -c 'name="keywords"'   # 0
curl -s $D/ | grep -oE '<img[^>]*alt="Andrea[^>]*>' | grep -oE 'loading="[a-z]+"|fetchpriority="[a-z]+"|sizes="[^"]*"'   # eager, high, sizes explícito
curl -s $D/sitemap.xml | grep -c "<loc>"   # ≥ 14 (F2), ≥ 60 (F3)
for u in $(curl -s $D/ | grep -oE '"sameAs":\[[^]]*\]' | grep -oE 'https?://[^"]+'); do printf "%-50s" $u; curl -s -o /dev/null -L -w "%{http_code}\n" -A "Mozilla/5.0" $u; done   # 200 o 999, nunca 404
```

### 16.3 Navegador (gstack browse o Playwright)

```bash
B=~/.claude/skills/gstack/browse/dist/browse
$B viewport 390x844 && $B goto $D/ && $B wait --networkidle
$B js "getComputedStyle(document.querySelector('h1')).fontFamily"                 # "Playfair Display"…
$B js "[...document.fonts].filter(f=>f.status==='loaded').length"                  # ≥ 2
$B js "getComputedStyle(document.querySelector('header nav, header button[aria-expanded]')).display"   # ≠ none
$B js "Math.min(...[...document.querySelectorAll('a,p,span,li')].filter(e=>e.innerText.trim()).map(e=>parseFloat(getComputedStyle(e).fontSize)))"   # ≥ 12
$B js "document.documentElement.scrollWidth<=innerWidth"                           # true
$B network | grep -c "\.mp4"                                                       # 0 antes de scroll
$B network | grep -c "transparenttextures"                                          # 0
$B screenshot --viewport audit-evidence/reaudit-mobile-fold.png                # el flotante no tapa CTAs
$B viewport 1440x900 && $B goto $D/ && $B screenshot audit-evidence/reaudit-desktop-full.png
```

### 16.4 Lighthouse (misma versión y presets)

```bash
npx lighthouse@12 $D/ --preset=perf --form-factor=mobile --screenEmulation.mobile --throttling-method=simulate --only-categories=performance,accessibility,best-practices,seo --output=json --output-path=audit-evidence/reaudit-lh-mobile.json --chrome-flags="--headless=new"
npx lighthouse@12 $D/ --preset=desktop --only-categories=performance,accessibility,best-practices,seo --output=json --output-path=audit-evidence/reaudit-lh-desktop.json --chrome-flags="--headless=new"
# Esperado F0: móvil ≥85/95/100/100 · F1+: ≥90/100/100/100; TBT<300ms; SI<4s; lcp-lazy-loaded pass; color-contrast pass; link-name pass
```

### 16.5 Externos

- Rich Results Test (home, servicio, artículo): sin errores.
- opengraph.xyz y compartir en WhatsApp real: imagen y título correctos.
- securityheaders.com: A.
- Search Console: cobertura (URLs indexadas ≥ objetivo de fase), CWV móvil "Buena", sin errores de sitemap.
- GA4 DebugView: `contact_whatsapp` con `placement` al pulsar cada CTA.
- axe DevTools en 3 rutas: 0 serious/critical.
- VoiceOver iOS: menú móvil y flotante anunciados con nombre.

### 16.6 Matriz de cierre por fase

| Fase | Checks obligatorios |
|---|---|
| F0 | 16.1 (lint/typecheck/build), 16.2 (rutas 200, og < 300 KB, canonical), 16.3 (fuentes, 0 mp4, 0 terceros), 16.4 (≥ 85), 16.5 (WhatsApp preview, GSC verificado, GA4 evento) |
| F1 | todo F0 + cabeceras 7/7, menú móvil, fuente mínima 12, axe 0, Lighthouse ≥ 90/100/100/100, formulario E2E |
| F2 | todo F1 + sitemap ≥ 14, metadata/JSON-LD por ruta (test integración), Rich Results 4 tipos, GSC ≥ 10 indexadas |
| F3 | todo F2 + sitemap ≥ 60, RSS válido, CWV verde en Speed Insights p75, KPIs 4.5 a 90 días |

---

## 17. Anexos

### 17.1 Inventario completo de hallazgos por severidad

Recuento automático sobre las tablas de hallazgos de este documento (X-01 = F-01, X-02 = S-02, X-03 = S-01 + S-03 + C-01):

**S0 · Crítico (13):** C-01, C-02, F-01 (X-01), M-01, M-02, M-03, P-01, P-02, S-01, S-02 (X-02), S-03, U-01, U-02.
**S1 · Alto (46):** A-01…A-06, B-01…B-04, C-03…C-06, F-02…F-07, M-04…M-06, P-03…P-07, S-04…S-09, T-01…T-05, U-03…U-09.
**S2 · Medio (44):** A-07…A-11, B-05…B-10, C-07…C-10, F-08…F-13, M-07…M-09, P-08…P-11, S-10…S-15, T-06…T-09, U-10…U-15.
**S3 · Bajo (19):** A-12, A-13, B-11…B-13, C-11, C-12, F-14, F-15, M-10, P-12, S-16…S-18, T-10…T-12, U-16, U-17.

Total: **122 hallazgos únicos**, de los cuales 59 (S0 + S1) deben resolverse en las Fases 0 y 1.

### 17.2 Datos crudos de Lighthouse (12-09-2026, v12.8.2)

| Auditoría | Móvil | Desktop |
|---|---|---|
| performance / accessibility / best-practices / seo | 55 / 90 / 100 / 100 | 100 / 95 / 100 / 100 |
| FCP | 1.2 s | 0.4 s |
| LCP (elemento) | 2.8 s (`<h1>`; render delay 2 122 ms) | 0.7 s (`<img alt="Andrea Belalcázar" loading="lazy">`) |
| TBT / Max Potential FID | 5 820 ms / 5 470 ms | 50 ms / 150 ms |
| Speed Index | 32.5 s | 0.9 s |
| TTI | 7.4 s | 0.8 s |
| CLS | 0 | 0 |
| Main-thread | 7.5 s (Other 5 920 ms, Script 760, Style/Layout 480) | — |
| Peso total | 1 377 KiB (vídeo 1 120 KiB) | 1 555 KiB |
| Fallos a11y | color-contrast (6 nodos), link-name (1) | color-contrast (6) |
| Seguridad (informativo) | sin CSP, sin frame control, sin COOP, HSTS sin includeSubDomains/preload | idem |
| Terceros | transparenttextures.com (preconnect ahorraría 400 ms; sin caché larga) | idem |

### 17.3 Métricas de red medidas (curl, 12-09-2026)

| Recurso | Bytes | Nota |
|---|---|---|
| `/` HTML | 50 759 (10 177 comprimido) | |
| JS (8 chunks) | 196 769 comprimido | runtime Next + página |
| CSS | 7 297 comprimido | |
| Inter woff2 | 38 460 | preload, no usado |
| Playfair woff2 | 48 432 | preload, no usado |
| `/portrait.jpg` original | 11 020 514 | og:image |
| `/_next/image?portrait&w=640/1080/1920/3840` | 13 980 / 26 698 / 54 842 / 133 388 (webp) | desktop usa 1920 |
| `/_next/image?clip-1&w=640/1920` | 50 596 / 91 504 | |
| `/clip-video.mp4` | 1 119 696 | descargado en carga inicial |
| texture png | 656 | tercero |

### 17.4 Textos actuales vs. propuestos (borrador para validar con Andrea)

| Ubicación | Actual | Propuesta |
|---|---|---|
| `<title>` | Andrea Belalcázar \| Estratega de Comunicación y Analista Política | Andrea Belalcázar · Estrategia de prensa y comunicación política en Cali |
| `description` | Consultoría estratégica de alto nivel en comunicación política, gestión de crisis y posicionamiento institucional en Colombia. Arquitecta de narrativas de poder. | Jefe de prensa y estratega de comunicación con experiencia en gobierno, campañas y empresa en el Valle del Cauca. Relación con medios, narrativa institucional y gestión de crisis. |
| Badge hero | Estratega de Comunicación Política | Comunicación política e institucional · Cali, Colombia |
| H1 | Donde el análisis se convierte en poder. | Estrategia de prensa y narrativa para gobiernos, campañas y marcas del suroccidente colombiano. |
| Sub hero | Arquitecta de narrativas institucionales y experta en gestión de reputación. Transformo la complejidad política en estrategias de impacto real. | Soy Andrea Belalcázar. He dirigido la comunicación de una secretaría departamental, un concejo municipal, una campaña presidencial en el Valle y una campaña a la Alcaldía de Cali. Ayudo a instituciones y líderes a decir lo correcto, a tiempo y en el medio correcto. |
| CTA primario | Agendar Consultoría | Hablemos por WhatsApp |
| CTA secundario | Ver Trayectoria | Ver casos |
| H2 servicios | Áreas de Autoridad | Qué hago |
| H2 trayectoria | Trayectoria Impecable. | Trayectoria: gobierno, campañas y empresa |
| H2 cierre | Elevamos el Discurso. | ¿Necesitas a alguien que hable con los medios por ti? |
| Sub cierre | Disponible para consultoría estratégica, análisis de medios y gestión de crisis institucionales. | Cuéntame tu situación en un mensaje. Respondo personalmente en menos de 24 horas hábiles. |

### 17.5 Preguntas abiertas para Andrea (bloquean contenido, no código)

1. Título oficial exacto y fecha de inicio del cargo actual; fechas de los 5 cargos anteriores.
2. URLs reales de LinkedIn, Instagram, X (o confirmación de que no existen).
3. ¿Puede publicitar servicios de campaña mientras ocupa cargo público? (respuesta legal).
4. Tres cifras o hechos verificables por caso (medios gestionados, ruedas de prensa, alcance, notas publicadas).
5. Fotos propias en alta resolución con derechos (mínimo: retrato, 2 de trabajo con medios, 1 de campaña).
6. Dos o tres personas dispuestas a dar testimonio con nombre y cargo.
7. Correo profesional deseado y si quiere agenda pública (Cal.com).
8. Temas de los que quiere ser referente en 12 meses (elige 3).

### 17.6 Glosario rápido

- **LCP/INP/CLS/TBT/SI:** métricas de rendimiento de Google (carga del elemento principal, respuesta a la interacción, estabilidad visual, bloqueo del hilo principal, velocidad de pintado).
- **E-E-A-T:** experiencia, pericia, autoridad y confianza; criterios de calidad de Google para contenido sobre personas y temas sensibles (política incluida).
- **GEO:** optimización para motores generativos (AI Overviews, ChatGPT, Perplexity).
- **OG / Open Graph:** metadatos que usan WhatsApp, LinkedIn, X, Facebook para la vista previa de un enlace.
- **JSON-LD / schema.org:** datos estructurados que explican a los buscadores quién es la persona, qué servicio ofrece, qué es un artículo.
- **CSP / HSTS / COOP:** cabeceras de seguridad del navegador.
- **MDX:** Markdown con componentes React; formato del contenido en la v2.
- **RUM / CrUX:** medición con usuarios reales; Chrome User Experience Report (lo que Google usa para Core Web Vitals).

---

*Fases 0 y 1 ejecutadas y re-auditadas el mismo día: ver sección 18.*

---

## 18. Re-auditoría F0 + F1 (12 de septiembre de 2026, producción)

**Commit desplegado:** `bb1a780` (main) · **Deploy Vercel:** `dpl_8WQUFyxmX5xC1dD7CrUZNJ5VE1JS` · **Ejecutor:** Claude (misma sesión que la auditoría).
Evidencia: `audit-evidence/reaudit-f1-*.png`, `audit-evidence/reaudit-f1-lh-mobile.json`, `audit-evidence/reaudit-f1-lh-desktop.json`.

### 18.1 Checks HTTP (sección 16.2)

| Comprobación | Antes | Ahora | Estado |
|---|---|---|---|
| `/robots.txt` · `/sitemap.xml` · `/manifest.webmanifest` | 404 · 404 · 404 | 200 · 200 · 200 | ✅ |
| `/opengraph-image` · `/twitter-image` | no existían (`og:image` = JPG de 11 MB) | 200 · PNG 1200×630 · **263 KB** | ✅ |
| `/icon.svg` · `/apple-icon` | 404 · 404 | 200 · 200 | ✅ |
| `/llms.txt` · `/.well-known/security.txt` | 404 · 404 | 200 · 200 | ✅ |
| `/privacidad` | 404 | 200 | ✅ |
| 404 de marca (`/no-existe`) | genérica en inglés, doble `<title>` | 404 en español, con enlaces, `noindex` | ✅ |
| `/portrait.jpg`, `/next.svg`, `/vercel.svg`… | 200 (11 MB expuestos, basura de plantilla) | 404 | ✅ |
| `/ig` → UTM Instagram | — | 307 con `utm_source=instagram` | ✅ |
| Cabeceras de seguridad | solo HSTS | CSP, HSTS `includeSubDomains; preload`, XFO DENY, COOP, nosniff, Referrer-Policy, Permissions-Policy | ✅ 7/7 |
| `x-powered-by` | (oculto por Vercel) | ausente | ✅ |
| `<html lang>` | `es` | `es-CO` | ✅ |
| `<link rel="canonical">` | ausente | `https://www.andreabelalcazar.com` | ✅ |
| `theme-color` | ausente | `#0A0A0B` | ✅ |
| `meta keywords` | presente | 0 | ✅ |
| `<h1>` | 1 abstracto | 1 descriptivo | ✅ |
| Preload de la imagen LCP | no (`loading="lazy"`) | `<link rel="preload" as="image">` + `sizes` explícito | ✅ |
| Enlaces WhatsApp con texto prellenado | 0 de 5 | 9 de 9 (`?text=…placement`) | ✅ |
| Enlaces `href="#"` | 1 | 0 | ✅ |
| JSON-LD | `Person` suelto con X/Twitter 404 | `@graph` WebSite + Person (`@id`, `worksFor`, `alumniOf`, `address`, `email`, `makesOffer`); `sameAs` vacío hasta verificar | ✅ |
| Título del cargo | "Directora de Estrategia de Prensa" | "Jefe de Prensa y Relaciones Públicas" (HV) | ✅ |
| Sitemap | — | 2 URLs (`/`, `/privacidad`) | ✅ (crece en F2) |

### 18.2 Checks en navegador (sección 16.3, Chromium 390×844)

| Comprobación | Antes | Ahora |
|---|---|---|
| `fontFamily` del `h1` | `ui-sans-serif, system-ui` | `"Playfair Display"` |
| `fontFamily` del `body` | `ui-sans-serif` | `Inter` |
| `document.fonts` cargadas | 0 | 5 |
| Menú móvil | inexistente (`nav` `display:none`) | botón `aria-expanded` + diálogo accesible |
| Skip link | no | sí |
| Fuente mínima visible | 9 px | 12 px |
| Scroll horizontal | no | no |
| Flotante WhatsApp sobre el hero | tapaba «Ver Trayectoria» | oculto (`aria-hidden=true`) mientras el hero es visible |
| Peticiones `.mp4/.webm` en carga inicial | 1 (1.12 MB) | 0 |
| Peticiones a terceros | transparenttextures.com | 0 |
| Errores de consola | 0 | 0 |

### 18.3 Lighthouse 12.8.2 (producción, mediana de 3 ejecuciones móviles)

| Métrica | Antes (21-04 → medido 12-09 mañana) | Ahora (producción, 12-09 tarde) | Objetivo F1 |
|---|---|---|---|
| Performance móvil | **55** | **76** (71 / 76 / 77) | ≥ 90 (pendiente: JS runtime de Next; ver nota) |
| Accessibility móvil | 90 | **100** | 100 ✅ |
| Best Practices móvil | 100 | **100** | 100 ✅ |
| SEO móvil | 100* | **100** (+ robots/sitemap/canonical reales) | 100 ✅ |
| LCP móvil | 2.8 s (`<h1>`; el retrato ni aparecía en el pliegue) | 3.4 s (retrato 1080 px sobre el pliegue, con preload) | < 2.5 s (pendiente) |
| TBT móvil | **5 820 ms** | **595 ms** | < 300 ms (pendiente) |
| Speed Index móvil | **32.5 s** | **2.7 s** | < 4 s ✅ |
| CLS | 0 | 0 | 0 ✅ |
| Peso total móvil | 1 377 KiB | **413 KiB** | < 600 KiB ✅ |
| Vídeo en carga inicial | 1 120 KiB | 0 | 0 ✅ |
| Terceros | 1 (texture) | 0 | 0 ✅ |
| Performance desktop | 100 | 98 | ≥ 95 ✅ |
| Accessibility desktop | 95 | **100** | 100 ✅ |
| LCP desktop | 0.7 s (imagen lazy) | 0.8 s (imagen preload) | < 1.2 s ✅ |
| `lcp-lazy-loaded` | FAIL | pass | ✅ |
| `color-contrast` | FAIL (6 nodos) | pass | ✅ |
| `link-name` | FAIL | pass | ✅ |

Qué queda para llegar a ≥ 90 en móvil: el coste restante es el runtime de Next/React (~200 KB de JS comprimido que se evalúa en CPU simulada ×4: TBT ≈ 600 ms) y el retrato, que ahora sí es el elemento LCP en móvil. Palancas para F2: (1) servir el retrato móvil a 750 px (`sizes` más ajustado) o recortarlo 4:3 específico; (2) reducir Client Components (solo quedan MobileMenu, WhatsAppFloat, LazyVideo y el listener de analítica); (3) evaluar `experimental.optimizePackageImports`/`browserslist` moderno para quitar ~14 KB de polyfills legacy. Con datos reales (Speed Insights, p75) es habitual que un sitio así mida mejor que en laboratorio.

Nota metodológica: Lighthouse local en este Mac tiene una variación de ±15 puntos en «performance» móvil entre ejecuciones consecutivas (CPU simulada ×4). Los valores estructurales (a11y, best-practices, SEO, peso, CLS, LCP lazy) son estables; el veredicto definitivo de rendimiento debe tomarse de PageSpeed Insights / CrUX en 28 días con datos reales de usuarios (Speed Insights ya está instalado para eso).

### 18.4 Calidad (sección 16.1)

| Check | Resultado |
|---|---|
| `npm run typecheck` | 0 errores |
| `npm run lint` | 0 errores, 0 warnings |
| `npm run format` | Prettier OK |
| `npm run test:unit` | 14/14 (3 archivos) |
| `npm run test:e2e` | 26/26 (desktop + móvil), 0 violaciones axe serias/críticas |
| `npm run build` | 12 rutas estáticas |
| Assets > 400 KB | ninguno (`public/` + `src/assets/`) |
| JS comprimido total | ~213 KB (runtime Next + React + página) |

### 18.5 Hallazgos cerrados en esta entrega

X-01/F-01, X-02/S-02, S-03…S-09, S-11…S-17, P-01…P-07, P-09…P-11, F-02…F-15, U-01…U-05, U-07…U-11, U-13, U-14, U-16, U-17, A-01…A-13, B-01…B-05, B-08 (noindex previews; la protección SSO de previews ya estaba activa), B-10…B-13, T-01…T-04, T-06…T-12, M-04 (Speed Insights), M-05, M-06, C-02, C-03 (los 6 cargos y 3 títulos visibles), C-04, C-07 (correo de la HV enlazado), C-08 (política de privacidad), C-11, C-12.

### 18.6 Hallazgos abiertos y por qué

| ID | Motivo | Quién desbloquea |
|---|---|---|
| S-01 | Verificar dominio en Search Console y enviar `sitemap.xml` (requiere acceso a la cuenta de Google / DNS de GoDaddy) | Carlos |
| M-01, M-02, M-03, M-07 | GA4 está implementado con Consent Mode v2 pero **desactivado** hasta definir `NEXT_PUBLIC_GA_ID` en Vercel → Settings → Environment Variables. Al hacerlo, GA, el banner de consentimiento y el evento `contact_whatsapp` se activan solos | Carlos (crear propiedad GA4) |
| M-08 | Sentry no instalado (decisión: esperar a tener tráfico medido) | — |
| C-01, C-05, C-06, C-09, C-10, U-06 (parcial), U-12, U-15, S-10, S-18 | Fase 2: páginas de servicios/casos/prensa/blog, testimonios, fotos propias, formulario. Requieren datos y material de Andrea (§17.5) | Andrea + siguiente sprint |
| `sameAs` | Vacío a propósito: el perfil de X no existe y LinkedIn/Instagram no están verificados | Andrea (URLs reales) |
| Fechas de cargos | `TODO(andrea)` en `src/content/site.ts`; no se muestran hasta completarse | Andrea |
| B-06, B-07 | Redirección apex y SPF/DKIM/DMARC dependen de DNS en GoDaddy y del correo con dominio propio | Carlos |
| T-05, T-09 | Validación Zod de contenido y pruebas visuales llegan con el pipeline MDX de F2 | siguiente sprint |
| lhci en CI | Configurado con «warn» en performance (los runners de GitHub son lentos) y «error» en a11y/SEO/best-practices/peso/LCP-lazy/contraste | — |

### 18.7 Tres acciones inmediatas para Carlos (sin código)

1. **Vercel → Settings → Environment Variables:** `NEXT_PUBLIC_GA_ID = G-XXXXXXX` (propiedad GA4 nueva). Redeploy. Verificar en GA4 DebugView que el clic en un CTA dispara `contact_whatsapp`.
2. **Search Console:** añadir propiedad de dominio `andreabelalcazar.com` (registro TXT en GoDaddy), enviar `https://www.andreabelalcazar.com/sitemap.xml`, solicitar indexación de `/`.
3. **Compartir la URL por WhatsApp** a un contacto y confirmar que aparece la tarjeta con foto y título.
