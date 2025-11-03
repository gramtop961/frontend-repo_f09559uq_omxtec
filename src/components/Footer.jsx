import React from 'react';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-16 border-t border-black/5 dark:border-white/10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-neutral-600 dark:text-neutral-300">
        <p>&copy; {year} Vibe Starter. All rights reserved.</p>
        <div className="flex items-center gap-4">
          <a className="hover:text-neutral-900 dark:hover:text-white transition" href="#privacy">Privacy</a>
          <a className="hover:text-neutral-900 dark:hover:text-white transition" href="#terms">Terms</a>
          <a className="hover:text-neutral-900 dark:hover:text-white transition" href="#contact">Contact</a>
        </div>
      </div>
    </footer>
  );
}
