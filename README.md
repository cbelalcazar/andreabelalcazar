# andreabelalcazar.com

Sitio de Andrea Belalcázar, jefe de prensa y estratega de comunicación política (Cali, Colombia). Next.js 16 (App Router, Turbopack), React 19, Tailwind CSS 4, desplegado en Vercel.

## Requisitos

- Node **22** (`.nvmrc`). Con nvm: `nvm use`. Next 16 no arranca en Node 16/18.
- npm 10.

## Comandos

```bash
npm ci                # instalar
npm run dev           # desarrollo (http://localhost:3000)
npm run build         # build de producción
npm run start         # servir el build
npm run lint          # eslint
npm run typecheck     # tsc --noEmit
npm run format        # prettier --check (format:fix para escribir)
npm run test:unit     # vitest (tests/unit)
npm run test:e2e      # playwright (tests/e2e) contra el build de producción
npm run lhci          # Lighthouse CI con presupuestos (lighthouserc.json)
npm run check         # lint + typecheck + unit + build
```

## Estructura

```
src/app/            rutas: home, sobre-mi, servicios/[slug], casos/[slug], blog/[slug],
                    blog/tema/[tema], glosario/[termino], prensa, contacto, privacidad,
                    not-found, error, loading, robots.ts, sitemap.ts, manifest.ts, rss.xml,
                    icon.svg, apple-icon.tsx, opengraph-image.tsx (global y por artículo)
src/content/        MDX de servicios, casos, blog y glosario + site.ts
src/lib/content.ts  índice de contenido (Zod) que alimenta sitemap, RSS y relacionados
src/components/     layout (Header, MobileMenu, Footer, WhatsAppFloat, SkipLink)
                    sections (Hero, Philosophy, Services, Trajectory, ContactCTA)
                    analytics (Analytics, WhatsAppLink, ConsentBanner, WebVitals)
                    media (LazyVideo) · seo (JsonLd) · icons
src/content/site.ts TODO el contenido editable (textos, cargos, formación, contacto)
src/lib/            seo.ts (JSON-LD), whatsapp.ts (enlaces wa.me con atribución)
src/assets/         imágenes importadas (sin EXIF) y fuente para OG
public/             vídeo (mp4 + webm), poster, llms.txt, .well-known/security.txt
tests/              unit (vitest), e2e (playwright + axe)
AUDITORIA-2026-09.md  auditoría completa y roadmap; audit-evidence/ capturas y Lighthouse
```

## Cómo editar contenido

- Datos de la persona (nombre, cargo, contacto, cargos, formación, nav): `src/content/site.ts`.
- Servicios, casos, artículos y glosario: archivos MDX en `src/content/{servicios,casos,blog,glosario}/`. El frontmatter se valida con Zod (`src/lib/content.ts`); si falta un campo o una descripción supera 170 caracteres, el build falla con un mensaje claro.
- Publicar un artículo = crear `src/content/blog/<slug>.mdx` con `title`, `description` (100–170), `date`, `tema`, `tags`, `faq` y `draft: false`, y hacer push a `main`. El sitemap, el RSS, el hub de tema, la imagen OG y los enlaces relacionados se generan solos.
- Regla: solo datos verificados. Los huecos están marcados con `TODO` y no se muestran hasta completarse.

Para cambiar el número de WhatsApp o el correo: `site.whatsapp` y `site.email` en ese mismo archivo. Hay un test que protege el número.

## Variables de entorno

Ver `.env.example`. Ninguna es obligatoria. GA4 usa `G-5S474KXVJ8` por defecto (con banner de consentimiento; el script solo se descarga si el visitante acepta). `RESEND_API_KEY` activa el formulario de contacto; sin ella la página muestra WhatsApp y correo.

## Despliegue

Vercel despliega `main` en producción y cada rama/PR como preview (los previews llevan `X-Robots-Tag: noindex`). CI (`.github/workflows/ci.yml`) corre lint, typecheck, unit, build, Playwright + axe y Lighthouse CI en cada PR.

## Re-auditoría

Los comandos de verificación están en `AUDITORIA-2026-09.md`, sección 16.
