import React, { useEffect, useRef } from 'react';
import Spline from '@splinetool/react-spline';

// Cover: full-bleed Spline scene with subtle overlays and an entry question
export default function Cover() {
  const titleRef = useRef(null);
  const noteRef = useRef(null);

  // counter-parallax: move text slightly opposite to scroll
  useEffect(() => {
    let raf = 0;
    let lastY = window.scrollY;
    const loop = () => {
      const y = window.scrollY;
      const delta = y - lastY;
      lastY = y;
      const t1 = titleRef.current;
      const t2 = noteRef.current;
      if (t1) t1.style.transform = `translateY(${(-y * 0.08).toFixed(2)}px)`;
      if (t2) t2.style.transform = `translateY(${(-y * 0.12).toFixed(2)}px)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <section id="entry" className="relative h-[90vh] min-h-[560px] overflow-hidden select-none">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/7m4PRZ7kg6K1jPfF/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      {/* whispering overlays */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[8%] top-[22%] h-64 w-64 rounded-full bg-fuchsia-500/10 blur-3xl" />
        <div className="absolute right-[10%] bottom-[18%] h-72 w-72 rounded-full bg-white/5 dark:bg-white/10 blur-3xl" />
      </div>

      <div className="relative z-10 h-full">
        <div className="h-full flex flex-col">
          <div className="flex-1" />
          <div className="px-6 sm:px-10 pb-14">
            <h1
              ref={titleRef}
              className="font-extrabold tracking-[-0.035em] text-[12vw] leading-none text-white/90 drop-shadow-sm mix-blend-screen"
              aria-label="Question: What does silence look like?"
            >
              what does silence look like?
            </h1>
            <p ref={noteRef} className="mt-4 max-w-md text-sm text-white/70">
              scroll, but not forward. the page remembers where you might have gone.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
