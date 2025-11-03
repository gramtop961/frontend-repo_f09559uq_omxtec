import React, { useEffect, useMemo, useState } from 'react';

// ContactVeil: unconventional contact with progressive disclosure & validation
export default function ContactVeil() {
  const [data, setData] = useState(() => {
    try {
      const saved = localStorage.getItem('veil.form');
      return saved ? JSON.parse(saved) : { name: '', email: '', message: '', agree: false };
    } catch {
      return { name: '', email: '', message: '', agree: false };
    }
  });
  const [errors, setErrors] = useState({});
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('veil.form', JSON.stringify(data));
    } catch {}
  }, [data]);

  const emailOk = useMemo(() => /.+@.+\..+/.test(data.email), [data.email]);
  const nameOk = useMemo(() => data.name.trim().length >= 2, [data.name]);
  const msgOk = useMemo(() => data.message.trim().length >= 10, [data.message]);

  useEffect(() => {
    const e = {};
    if (!nameOk) e.name = 'two letters is a minimum whisper';
    if (!emailOk) e.email = 'is this an email or a riddle?';
    if (!msgOk) e.message = 'say at least ten characters to be heard';
    if (!data.agree) e.agree = 'consent opens the door';
    setErrors(e);
  }, [nameOk, emailOk, msgOk, data.agree]);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (Object.keys(errors).length) return;
    setBusy(true);
    // simulate async processing with graceful feedback
    await new Promise((r) => setTimeout(r, 900));
    setBusy(false);
    setDone(true);
  };

  const onReset = () => {
    setData({ name: '', email: '', message: '', agree: false });
    setDone(false);
  };

  return (
    <section id="contact" className="relative py-28 sm:py-36">
      <div className="mx-auto max-w-[900px] px-6">
        <h4 className="text-5xl sm:text-6xl font-extrabold tracking-tight text-neutral-900 dark:text-white">say less, mean more</h4>
        <p className="mt-2 max-w-md text-neutral-600 dark:text-neutral-300">
          a form that prefers silence—yet understands intent
        </p>

        {!done ? (
          <form onSubmit={onSubmit} className="mt-10 space-y-6" noValidate>
            <div className="flex flex-col sm:flex-row gap-6">
              <Field
                label="name"
                type="text"
                value={data.name}
                onChange={(v) => setData((d) => ({ ...d, name: v }))}
                error={errors.name}
                placeholder="—"
                autoComplete="name"
              />
              <Field
                label="email"
                type="email"
                value={data.email}
                onChange={(v) => setData((d) => ({ ...d, email: v }))}
                error={errors.email}
                placeholder="you@somewhere"
                autoComplete="email"
              />
            </div>

            <Field
              as="textarea"
              label="message"
              value={data.message}
              onChange={(v) => setData((d) => ({ ...d, message: v }))}
              error={errors.message}
              placeholder="leave a trace"
              rows={5}
            />

            <div className="flex items-start gap-3">
              <input
                id="agree"
                type="checkbox"
                checked={data.agree}
                onChange={(e) => setData((d) => ({ ...d, agree: e.target.checked }))}
                className="mt-1 h-4 w-4 rounded border-neutral-400 text-fuchsia-600 focus:ring-fuchsia-600"
              />
              <label htmlFor="agree" className="text-sm text-neutral-700 dark:text-neutral-200">
                i allow my words to be received
              </label>
            </div>
            {errors.agree && <p className="text-xs text-fuchsia-600">{errors.agree}</p>}

            <div className="flex items-center gap-3">
              <button
                type="submit"
                disabled={busy || Object.keys(errors).length > 0}
                data-cursor="solid"
                className={`inline-flex items-center rounded-full px-6 py-2.5 text-sm font-medium transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-fuchsia-600 ${
                  busy || Object.keys(errors).length > 0
                    ? 'bg-neutral-300 text-neutral-600 cursor-not-allowed'
                    : 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 hover:translate-y-[-1px] active:translate-y-[0px]'
                }`}
              >
                {busy ? (
                  <span className="inline-flex items-center gap-2">
                    <Spinner /> sending
                  </span>
                ) : (
                  'send'
                )}
              </button>
              <button
                type="button"
                onClick={onReset}
                data-cursor="dot"
                className="text-sm text-neutral-600 dark:text-neutral-300 underline decoration-dotted underline-offset-4 hover:text-neutral-900 dark:hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-600 rounded"
              >
                reset
              </button>
            </div>
          </form>
        ) : (
          <div className="mt-10 rounded-2xl border border-white/10 bg-white/50 dark:bg-neutral-900/60 backdrop-blur p-6">
            <p className="text-lg">received. we will respond in negative space.</p>
            <button
              type="button"
              onClick={onReset}
              className="mt-4 inline-flex items-center rounded-full px-5 py-2 text-sm font-medium bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-600"
            >
              write again
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

function Field({ as = 'input', label, error, onChange, ...props }) {
  const Tag = as;
  const id = `f-${label}`;
  const invalid = Boolean(error);
  return (
    <div className="flex-1">
      <label htmlFor={id} className="block text-sm text-neutral-700 dark:text-neutral-200 mb-1">
        {label}
      </label>
      <Tag
        id={id}
        aria-invalid={invalid}
        aria-describedby={invalid ? `${id}-err` : undefined}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full rounded-xl border bg-white/70 dark:bg-neutral-900/70 backdrop-blur px-3 py-2 text-sm text-neutral-900 dark:text-white placeholder-neutral-400 outline-none transition focus:ring-2 focus:ring-fuchsia-600 ${
          invalid ? 'border-fuchsia-500' : 'border-white/20'
        }`}
        {...props}
      />
      {invalid && (
        <p id={`${id}-err`} className="mt-1 text-xs text-fuchsia-600">
          {error}
        </p>
      )}
    </div>
  );
}

function Spinner() {
  return (
    <svg className="h-4 w-4 animate-spin text-current" viewBox="0 0 24 24" aria-hidden>
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
    </svg>
  );
}
