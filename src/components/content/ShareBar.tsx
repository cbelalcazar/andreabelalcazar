export default function ShareBar({ url, title }: { url: string; title: string }) {
  const u = encodeURIComponent(url);
  const t = encodeURIComponent(title);
  const links = [
    { name: "WhatsApp", href: `https://wa.me/?text=${t}%20${u}` },
    { name: "LinkedIn", href: `https://www.linkedin.com/sharing/share-offsite/?url=${u}` },
    { name: "X", href: `https://x.com/intent/post?text=${t}&url=${u}` },
  ];
  return (
    <div className="rounded-[20px] bg-surface p-6 shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
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
              className="inline-flex min-h-10 items-center rounded-full bg-ground px-4 text-[14px] font-medium text-ink hover:bg-surface-2"
            >
              {l.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
