<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Reglas de este proyecto

Contexto completo, hallazgos y roadmap: `AUDITORIA-2026-09.md` (IDs tipo S-01, P-03…). Referenciar el ID en commits y PRs.

## Next 16 (lo que cambia respecto a 13/14)
- `next/image`: **no usar `priority`** (deprecado). Usar `loading="eager"` + `fetchPriority="high"` para la imagen LCP y siempre `sizes` con `fill`. `quality` debe estar en `images.qualities`.
- `themeColor`/`colorScheme` van en `export const viewport`, no en `metadata`.
- No existe `middleware.ts`: es `proxy.ts` (runtime Node). Hoy no hay proxy; las cabeceras van en `next.config.ts`.
- `params`/`searchParams` son `Promise`. `revalidateTag(tag, "max")` lleva dos argumentos.
- Lint: `eslint .` (no `next lint`). Node ≥ 20.9 (`.nvmrc` = 22).
- Contenido en MDX bajo `src/content/{servicios,casos,blog,glosario}` con frontmatter validado por Zod en `src/lib/content.ts` (descripciones 100–170 caracteres). Plugins remark/rehype como strings (Turbopack). `typedRoutes` está desactivado a propósito (hrefs dinámicos).

## Convenciones
- Server Components por defecto. Cada `"use client"` lleva un comentario de una línea con el motivo.
- Contenido en `src/content/site.ts`, nunca en JSX. Solo datos verificados; huecos como `TODO(andrea)`.
- Tokens en `@theme inline` (`globals.css`): `ink`, `paper`, `muted`, `gold`, `line`. Nada de hex sueltos.
- Prohibido: `transition-all`, `backdrop-blur` en móvil, animaciones infinitas, texto < 12 px, contraste < 4.5:1, assets > 400 KB, imágenes con EXIF, vídeo con audio, perfiles sociales sin verificar en `sameAs`.
- Todo enlace a WhatsApp pasa por `WhatsAppLink` (texto prellenado + evento GA).
- Respetar `prefers-reduced-motion`.

## Antes de abrir un PR
`npm run check` en verde y `npm run test:e2e` en verde. Lighthouse móvil ≥ 90 / a11y 100 (presupuestos en `lighthouserc.json`).
