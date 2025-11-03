import React from 'react';
import { Rocket, Shield, Zap, Star } from 'lucide-react';

const items = [
  {
    icon: Rocket,
    title: 'Blazing Fast',
    desc: 'Instant dev server, HMR, and optimized builds out of the box.'
  },
  {
    icon: Shield,
    title: 'Type-Safe Ready',
    desc: 'Add TypeScript or Zod easily for confidence as you scale.'
  },
  {
    icon: Zap,
    title: 'Beautiful by Default',
    desc: 'Tailwind utilities and polished components for a clean baseline.'
  },
  {
    icon: Star,
    title: 'Production Friendly',
    desc: 'Ship with accessibility, responsiveness, and semantics in mind.'
  }
];

export default function Features() {
  return (
    <section id="features" className="py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900 dark:text-white">Everything you need to start strong</h2>
          <p className="mt-2 text-neutral-600 dark:text-neutral-300">A focused set of choices to help you move fast without sacrificing quality.</p>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="group rounded-2xl border border-black/10 dark:border-white/10 bg-white/60 dark:bg-neutral-900/60 backdrop-blur p-5 hover:shadow-sm transition">
              <div className="h-10 w-10 rounded-lg bg-gradient-to-tr from-indigo-600 via-fuchsia-600 to-rose-500 text-white grid place-items-center shadow">
                <Icon size={18} />
              </div>
              <h3 className="mt-4 font-semibold text-neutral-900 dark:text-white">{title}</h3>
              <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-300">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
