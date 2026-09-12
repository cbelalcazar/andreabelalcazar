"use client"; // los error boundaries deben ser Client Components

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <main
      id="contenido"
      className="flex min-h-[70vh] flex-col items-center justify-center px-4 pt-32 pb-20 text-center md:px-8"
    >
      <p className="eyebrow mb-4">Algo falló</p>
      <h1 className="font-display text-4xl text-balance text-ink md:text-5xl">No se pudo mostrar esta sección.</h1>
      <p className="mt-4 max-w-md text-lg text-muted">
        Vuelve a intentarlo. Si el problema continúa, escríbeme y lo reviso.
        {error.digest ? <span className="mt-2 block text-xs text-muted">Ref. {error.digest}</span> : null}
      </p>
      <button
        type="button"
        onClick={reset}
        className="mt-8 inline-flex min-h-12 items-center rounded-full bg-ink px-8 text-sm font-semibold text-white hover:bg-ground-2"
      >
        Reintentar
      </button>
    </main>
  );
}
