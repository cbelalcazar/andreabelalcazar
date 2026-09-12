export default function Loading() {
  return (
    <main
      id="contenido"
      className="flex min-h-[60vh] items-center justify-center px-4 pt-32"
      aria-busy="true"
      aria-live="polite"
    >
      <p className="font-serif text-xl text-muted">Cargando…</p>
    </main>
  );
}
