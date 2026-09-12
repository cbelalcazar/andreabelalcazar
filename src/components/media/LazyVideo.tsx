"use client"; // IntersectionObserver + control de reproducción accesible

import { useEffect, useRef, useState, useSyncExternalStore } from "react";

type Source = { src: string; type: string };

const REDUCED = "(prefers-reduced-motion: reduce)";
const subscribeReduced = (cb: () => void) => {
  const mq = window.matchMedia(REDUCED);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
};
const getReduced = () => window.matchMedia(REDUCED).matches;
const getReducedServer = () => false;

export default function LazyVideo({
  sources,
  poster,
  label,
  className = "",
}: {
  sources: Source[];
  poster: string;
  /** Descripción breve del contenido para lectores de pantalla. */
  label: string;
  className?: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [armed, setArmed] = useState(false);
  const [playing, setPlaying] = useState(false);
  const reduced = useSyncExternalStore(subscribeReduced, getReduced, getReducedServer);

  useEffect(() => {
    const el = videoRef.current;
    if (!el || reduced) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setArmed(true);
          el.play()
            .then(() => setPlaying(true))
            .catch(() => setPlaying(false));
        } else {
          el.pause();
          setPlaying(false);
        }
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reduced]);

  const toggle = () => {
    const el = videoRef.current;
    if (!el) return;
    setArmed(true);
    if (playing) {
      el.pause();
      setPlaying(false);
    } else {
      el.play()
        .then(() => setPlaying(true))
        .catch(() => setPlaying(false));
    }
  };

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <video
        ref={videoRef}
        poster={poster}
        className="absolute inset-0 h-full w-full object-cover"
        muted
        playsInline
        loop
        preload="none"
        aria-label={label}
      >
        {armed && sources.map((s) => <source key={s.src} src={s.src} type={s.type} />)}
      </video>
      <button
        type="button"
        onClick={toggle}
        aria-pressed={playing}
        aria-label={playing ? "Pausar video" : "Reproducir video"}
        className="absolute right-3 bottom-3 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-black/60 text-white hover:bg-black/80"
      >
        {playing ? (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <rect x="6" y="4" width="4" height="16" />
            <rect x="14" y="4" width="4" height="16" />
          </svg>
        ) : (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <polygon points="6 3 20 12 6 21 6 3" />
          </svg>
        )}
      </button>
      {reduced && <span className="sr-only">Video en pausa por preferencia de movimiento reducido.</span>}
    </div>
  );
}
