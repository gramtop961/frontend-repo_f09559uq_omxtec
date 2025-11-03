import React from 'react';
import { Rocket, Star } from 'lucide-react';

export default function Navbar() {
  return (
    <header className="sticky top-0 z-20 backdrop-blur bg-white/60 dark:bg-neutral-900/60 border-b border-black/5 dark:border-white/10">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-fuchsia-600 to-rose-500 text-white grid place-items-center shadow-sm">
            <Rocket size={18} />
          </div>
          <span className="font-semibold tracking-tight text-neutral-900 dark:text-white">Vibe Starter</span>
        </div>

        <div className="hidden md:flex items-center gap-6 text-sm text-neutral-600 dark:text-neutral-300">
          <a href="#features" className="hover:text-neutral-900 dark:hover:text-white transition">Features</a>
          <a href="#pricing" className="hover:text-neutral-900 dark:hover:text-white transition">Pricing</a>
          <a href="#about" className="hover:text-neutral-900 dark:hover:text-white transition">About</a>
        </div>

        <div className="flex items-center gap-2">
          <button className="hidden sm:inline-flex h-9 items-center gap-2 rounded-lg border border-black/10 dark:border-white/10 px-3 text-sm text-neutral-700 dark:text-neutral-200 hover:bg-black/5 dark:hover:bg-white/5 transition">
            <Star size={16} />
            Star
          </button>
          <button className="inline-flex h-9 items-center rounded-lg bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 px-4 text-sm font-medium shadow hover:opacity-90 transition">
            Get Started
          </button>
        </div>
      </nav>
    </header>
  );
}
