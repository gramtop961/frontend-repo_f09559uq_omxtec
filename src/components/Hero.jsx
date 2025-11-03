import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 -left-20 h-72 w-72 rounded-full bg-fuchsia-500/20 blur-3xl" />
        <div className="absolute -bottom-24 -right-20 h-72 w-72 rounded-full bg-indigo-500/20 blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="grid lg:grid-cols-2 items-center gap-10">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-black/10 dark:border-white/10 px-3 py-1 text-xs text-neutral-600 dark:text-neutral-300 mb-4 bg-white/60 dark:bg-neutral-900/60 backdrop-blur">
              <Sparkles size={14} />
              Fresh Vite + Tailwind baseline
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
              Build beautiful UIs fast.
            </h1>
            <p className="mt-4 text-lg text-neutral-600 dark:text-neutral-300 max-w-prose">
              A crisp starter with sensible defaults, modern components, and a delightful developer experience.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <a href="#get-started" className="inline-flex items-center justify-center rounded-lg bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 px-5 py-3 text-sm font-medium shadow hover:opacity-90 transition">
                Get Started
                <ArrowRight size={16} className="ml-2" />
              </a>
              <a href="#features" className="inline-flex items-center justify-center rounded-lg border border-black/10 dark:border-white/10 px-5 py-3 text-sm font-medium text-neutral-800 dark:text-neutral-100 hover:bg-black/5 dark:hover:bg-white/5 transition">
                Explore Features
              </a>
            </div>
          </div>

          <div className="relative">
            <div className="aspect-[4/3] w-full rounded-2xl border border-black/10 dark:border-white/10 bg-gradient-to-br from-white to-neutral-50 dark:from-neutral-900 dark:to-neutral-800 shadow-sm overflow-hidden">
              <div className="h-full w-full grid place-items-center">
                <div className="text-center p-6">
                  <div className="mx-auto h-16 w-16 rounded-2xl bg-gradient-to-tr from-indigo-600 via-fuchsia-600 to-rose-500 shadow-md" />
                  <p className="mt-4 text-sm text-neutral-500 dark:text-neutral-400">Drop your product shot, chart, or 3D scene here.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
