import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-neutral-50 dark:from-neutral-950 dark:to-neutral-900 text-neutral-900 dark:text-white selection:bg-fuchsia-200/60 selection:text-neutral-900">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <section id="pricing" className="py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="rounded-2xl border border-black/10 dark:border-white/10 p-8 bg-white/60 dark:bg-neutral-900/60 backdrop-blur text-center">
              <h3 className="text-2xl font-semibold">Simple pricing</h3>
              <p className="mt-2 text-neutral-600 dark:text-neutral-300">Start free. Scale as you grow.</p>
              <div className="mt-6 inline-flex items-baseline gap-1">
                <span className="text-5xl font-extrabold">$0</span>
                <span className="text-neutral-600 dark:text-neutral-300">/ forever</span>
              </div>
              <div className="mt-6">
                <a href="#get-started" className="inline-flex items-center justify-center rounded-lg bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 px-5 py-3 text-sm font-medium shadow hover:opacity-90 transition">
                  Get Started
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
