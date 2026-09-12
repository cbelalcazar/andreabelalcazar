export default function ShareBar({ url, title }: { url: string; title: string }) {
  const u = encodeURIComponent(url);
  const t = encodeURIComponent(title);
  const links = [
    { name: "WhatsApp", href: `https://wa.me/?text=${t}%20${u}` },
    { name: "LinkedIn", href: `https://www.linkedin.com/sharing/share-offsite/?url=${u}` },
    { name: "X", href: `https://x.com/intent/post?text=${t}&url=${u}` },
  ];
  return (
    <div className="rounded-2xl border border-line bg-white/[0.02] p-6">
      <p className="eyebrow mb-3">Compartir</p>
      <ul className="flex flex-wrap gap-2">
        {links.map((l) => (
          <li key={l.name}>
            <a
              href={l.href}
              target="_blank"
              rel="noopener noreferrer"
              data-track="share_click"
              data-topic={l.name.toLowerCase()}
              className="inline-flex min-h-10 items-center rounded-full border border-line px-4 text-sm text-paper hover:border-gold/50 hover:text-gold"
            >
              {l.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
