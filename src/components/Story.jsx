import React, { useEffect, useRef } from 'react';

// Story: asymmetrical typography + counter-parallax layers
export default function Story() {
  const layerA = useRef(null);
  const layerB = useRef(null);
  const layerC = useRef(null);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        const y = window.scrollY;
        // move opposite to scroll for tension
        if (layerA.current) layerA.current.style.transform = `translateY(${(-y * 0.06).toFixed(2)}px)`;
        if (layerB.current) layerB.current.style.transform = `translateY(${(-y * 0.1).toFixed(2)}px)`;
        if (layerC.current) layerC.current.style.transform = `translateY(${(-y * 0.14).toFixed(2)}px)`;
        raf = 0;
      });
    };
    document.addEventListener('scroll', onScroll, { passive: true });
    return () => document.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section id="whisper" className="relative py-40 sm:py-52">
      <div className="pointer-events-none absolute inset-x-0 top-10 flex justify-end pr-10">
        <div ref={layerA} className="h-40 w-40 sm:h-56 sm:w-56 rounded-full bg-fuchsia-500/10 blur-3xl" />
      </div>

      <div className="mx-auto max-w-[1100px] px-6">
        {/* Asymmetry: large rotated word */}
        <div className="relative h-[32rem]">
          <h2
            className="absolute left-[-6%] top-10 origin-left -rotate-6 text-[16vw] leading-none font-black tracking-[-0.04em] text-neutral-900 dark:text-white mix-blend-difference"
          >
            whisper
          </h2>
          <p
            className="absolute right-[6%] top-[22%] max-w-xs text-sm text-neutral-600 dark:text-neutral-300"
          >
            negative space becomes intent. the pause between notes carries the score.
          </p>
          <p
            className="absolute left-[18%] bottom-[12%] max-w-sm text-base text-neutral-700 dark:text-neutral-200"
          >
            do not fix the grid—let it breathe. balance by weight, not symmetry.
          </p>
        </div>

        <div id="flux" className="relative mt-40 h-[36rem]">
          <div ref={layerB} className="pointer-events-none absolute -left-10 bottom-8 h-24 w-40 rotate-12 rounded-full bg-white/5 dark:bg-white/10 blur-2xl" />
          <div ref={layerC} className="pointer-events-none absolute right-0 -top-6 h-24 w-24 -rotate-12 rounded-full bg-fuchsia-500/20 blur-2xl" />

          <h3 className="absolute right-[8%] top-[10%] text-[12vw] sm:text-[10vw] leading-none font-extrabold tracking-tight text-neutral-900 dark:text-white">
            flux
          </h3>
          <p className="absolute left-[10%] top-[40%] max-w-xs text-sm text-neutral-600 dark:text-neutral-300">
            a word can be a room. a letter can be a wall. architecture in type.
          </p>

          {/* interactive boundary: invisible zone reveals a line */}
          <InteractiveLine />
        </div>
      </div>
    </section>
  );
}

function InteractiveLine() {
  const wrap = useRef(null);
  const line = useRef(null);

  useEffect(() => {
    const el = wrap.current;
    const ln = line.current;
    if (!el || !ln) return;
    const onMove = (e) => {
      const rect = el.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      ln.style.setProperty('--x', `${x}%`);
    };
    el.addEventListener('mousemove', onMove);
    return () => el.removeEventListener('mousemove', onMove);
  }, []);

  return (
    <div ref={wrap} className="absolute inset-x-[8%] bottom-[14%] h-24">
      <div
        ref={line}
        className="h-px w-full bg-gradient-to-r from-transparent via-white/60 to-transparent"
        style={{ maskImage: 'radial-gradient(120px at var(--x, 50%) 50%, black, transparent 60%)', WebkitMaskImage: 'radial-gradient(120px at var(--x, 50%) 50%, black, transparent 60%)' }}
        aria-hidden
      />
      <p className="sr-only">Move cursor to reveal a line that follows your intent</p>
    </div>
  );
}
