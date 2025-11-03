import React, { useEffect, useRef, useState } from 'react';

// GhostNav: right-side dot navigation that reveals itself on proximity
export default function GhostNav() {
  const [active, setActive] = useState('entry');
  const navRef = useRef(null);

  useEffect(() => {
    const ids = ['entry', 'whisper', 'flux', 'contact'];
    const sections = ids.map((id) => document.getElementById(id)).filter(Boolean);
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { root: null, threshold: 0.25 }
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;
    const onMove = (e) => {
      const rect = nav.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      nav.style.setProperty('--mx', `${x}px`);
      nav.style.setProperty('--my', `${y}px`);
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  const go = (id) => (e) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const items = [
    { id: 'entry', label: 'entry' },
    { id: 'whisper', label: 'whisper' },
    { id: 'flux', label: 'flux' },
    { id: 'contact', label: 'contact' }
  ];

  return (
    <aside
      ref={navRef}
      aria-label="Section navigation"
      className="fixed right-4 sm:right-6 top-1/2 -translate-y-1/2 z-30"
    >
      <ul className="relative flex flex-col gap-4 pr-2">
        <div
          aria-hidden
          className="absolute -inset-4 rounded-full opacity-0 transition-opacity duration-300"
          style={{
            background: 'radial-gradient(120px 120px at var(--mx,50%) var(--my,50%), rgba(255, 0, 110, 0.08), transparent 60%)'
          }}
        />
        {items.map((it) => (
          <li key={it.id}>
            <a
              href={`#${it.id}`}
              onClick={go(it.id)}
              data-cursor="dot"
              className={`group relative flex items-center gap-2 focus:outline-none`}>
              <span
                className={`h-2.5 w-2.5 rounded-full transition-all duration-300 outline-none ${
                  active === it.id ? 'bg-fuchsia-500 ring-2 ring-fuchsia-500/30 scale-110' : 'bg-white/50 hover:bg-white/80'
                }`}
              />
              <span className="pointer-events-none origin-left scale-x-0 group-hover:scale-x-100 group-focus-visible:scale-x-100 transition-transform duration-300 text-[11px] tracking-wide uppercase text-white/70">
                {it.label}
              </span>
            </a>
          </li>
        ))}
      </ul>
    </aside>
  );
}
