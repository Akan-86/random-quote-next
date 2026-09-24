export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-linear-to-br from-slate-950 via-slate-900 to-indigo-950 px-6 py-12">
      <div className="w-full max-w-xl">
        <header className="mb-8 text-center">
          <p className="text-xs font-semibold tracking-[0.25em] text-violet-300">A MOMENT OF INSPIRATION</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-white sm:text-5xl">Random Quote<span className="text-violet-400">.</span></h1>
          <p className="mt-4 text-slate-300">A little perspective for your day.</p>
        </header>

        <blockquote className="rounded-3xl border border-white/20 bg-slate-50 p-8 shadow-2xl sm:p-12">
          <span aria-hidden="true" className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-100 font-serif text-4xl text-violet-700">“</span>
          <p className="mt-7 text-3xl leading-relaxed font-medium tracking-tight text-slate-900 sm:text-4xl">Little by little, a little becomes a lot.</p>
          <footer className="mt-8 flex items-center gap-3 text-sm text-slate-600">
            <span aria-hidden="true" className="h-px w-8 bg-violet-500" />
            Traditional proverb
          </footer>
        </blockquote>
        <p className="mt-6 text-center text-xs tracking-wide text-slate-400">Pause. Reflect. Keep going.</p>
      </div>
    </main>
  );
}
