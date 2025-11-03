import React, { useEffect, useRef } from 'react';
import Cover from './components/Cover';
import GhostNav from './components/GhostNav';
import Story from './components/Story';
import ContactVeil from './components/ContactVeil';

export default function App() {
  const cursorRef = useRef(null);

  // Custom cursor that adapts on interactive zones
  useEffect(() => {
    const c = cursorRef.current;
    if (!c) return;
    let raf = 0;
    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let tx = x;
    let ty = y;

    const move = (e) => {
      tx = e.clientX;
      ty = e.clientY;
      if (!raf) raf = requestAnimationFrame(tick);
    };
    const tick = () => {
      x += (tx - x) * 0.18;
      y += (ty - y) * 0.18;
      c.style.transform = `translate(${x - 12}px, ${y - 12}px)`;
      raf = requestAnimationFrame(tick);
    };

    const enter = (e) => {
      const t = e.target;
      if (t && t.getAttribute && t.getAttribute('data-cursor') === 'solid') {
        c.style.width = '36px';
        c.style.height = '36px';
        c.style.background = 'rgba(255,0,110,0.85)';
        c.style.mixBlendMode = 'screen';
      } else if (t && t.getAttribute && t.getAttribute('data-cursor') === 'dot') {
        c.style.width = '16px';
        c.style.height = '16px';
        c.style.background = 'rgba(255,255,255,0.8)';
        c.style.mixBlendMode = 'difference';
      }
    };
    const leave = () => {
      c.style.width = '24px';
      c.style.height = '24px';
      c.style.background = 'rgba(255,255,255,0.5)';
      c.style.mixBlendMode = 'difference';
    };

    window.addEventListener('pointermove', move);
    window.addEventListener('mouseover', enter, true);
    window.addEventListener('mouseout', leave, true);
    return () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('mouseover', enter, true);
      window.removeEventListener('mouseout', leave, true);
      cancelAnimationFrame(raf);
    };
  }, []);

  // keyboard focus ring helper for skip-to-content
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === '/') {
        const el = document.getElementById('whisper');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white antialiased">
      {/* Accessible skip */}
      <a href="#whisper" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:bg-white focus:text-black rounded px-3 py-1">skip</a>

      <GhostNav />
      <Cover />
      <Story />
      <ContactVeil />

      {/* time + progress indicator */}
      <ScrollProgress />

      {/* Custom cursor */}
      <div
        ref={cursorRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-50 h-6 w-6 rounded-full border border-white/30 shadow-[0_0_20px_rgba(255,0,110,0.35)]"
        style={{ transition: 'width 160ms ease, height 160ms ease, background 160ms ease' }}
      />
    </div>
  );
}

function ScrollProgress() {
  const bar = useRef(null);
  useEffect(() => {
    const on = () => {
      const s = window.scrollY;
      const h = document.documentElement.scrollHeight - window.innerHeight;
      const p = h > 0 ? s / h : 0;
      if (bar.current) bar.current.style.transform = `scaleX(${p.toFixed(3)})`;
    };
    on();
    window.addEventListener('scroll', on, { passive: true });
    window.addEventListener('resize', on);
    return () => {
      window.removeEventListener('scroll', on);
      window.removeEventListener('resize', on);
    };
  }, []);
  return (
    <div className="fixed inset-x-0 top-0 z-40 h-px bg-white/5">
      <div ref={bar} className="h-full w-full origin-left bg-fuchsia-500/80" style={{ transform: 'scaleX(0)' }} />
    </div>
  );
}
