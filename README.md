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
src/app/            rutas: page, layout, not-found, error, loading, privacidad,
                    robots.ts, sitemap.ts, manifest.ts, icon.svg, apple-icon.tsx,
                    opengraph-image.tsx, twitter-image.tsx
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

Todo el texto vive en `src/content/site.ts`. Regla: solo datos verificados (hoja de vida oficial). Los huecos están marcados con `TODO(andrea)` y no se muestran en la web hasta completarse.

Para cambiar el número de WhatsApp o el correo: `site.whatsapp` y `site.email` en ese mismo archivo. Hay un test que protege el número.

## Variables de entorno

Ver `.env.example`. Ninguna es obligatoria. `NEXT_PUBLIC_GA_ID` activa Google Analytics 4 con banner de consentimiento; sin ella solo corre Vercel Analytics (sin cookies) cuando está desplegado en Vercel.

## Despliegue

Vercel despliega `main` en producción y cada rama/PR como preview (los previews llevan `X-Robots-Tag: noindex`). CI (`.github/workflows/ci.yml`) corre lint, typecheck, unit, build, Playwright + axe y Lighthouse CI en cada PR.

## Re-auditoría

Los comandos de verificación están en `AUDITORIA-2026-09.md`, sección 16.
