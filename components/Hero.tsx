import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative flex flex-col items-center text-center pt-24 pb-32 px-6 bg-slate-50 overflow-hidden">
      
      {/* Decorative Background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-indigo-100/50 via-transparent to-transparent -z-10" />

      {/* Badge */}
      <div className="mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-sm font-semibold tracking-wide">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-600"></span>
          </span>
          New: AI-powered commit summaries
        </span>
      </div>

      {/* Main Heading */}
      <h1 className="text-5xl md:text-7xl font-extrabold leading-[1.6] md:leading-[1.65] max-w-5xl tracking-tight text-slate-900 animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-100">
        
        {/* Highlight: Clear client updates */}
        <span className="relative inline-block whitespace-nowrap">
          <span className="relative z-10">Clear client updates</span>
          <svg
            className="absolute -bottom-1.5 left-0 w-full h-9 text-amber-300 z-0"
            viewBox="0 0 100 20"
            preserveAspectRatio="none"
          >
            <path
              d="M0 10 Q 50 17 100 10 L 100 15 Q 50 22 0 15 Z"
              fill="currentColor"
            />
          </svg>
        </span>

        {" "}from your{" "}

        {/* Highlight: real GitHub work */}
        <span className="relative inline-block whitespace-nowrap">
          <span className="relative z-10">real GitHub work</span>
          <svg
            className="absolute -bottom-1.5 left-0 w-full h-9 text-amber-300 z-0"
            viewBox="0 0 100 20"
            preserveAspectRatio="none"
          >
            <path
              d="M0 10 Q 50 17 100 10 L 100 15 Q 50 22 0 15 Z"
              fill="currentColor"
            />
          </svg>
        </span>
      </h1>

      {/* Description */}
      <p className="mt-9 max-w-2xl text-lg md:text-xl text-slate-600 leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
        Stop wasting time writing weekly updates.
        <br className="hidden md:block" />
        WorkPing turns commits and PRs into clean, client-ready progress updates —
        <span className="font-bold text-slate-900"> review, edit, and send.</span>
      </p>

      {/* CTA */}
      <div className="mt-14 animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-300">
        <Link
          href="/login"
          className="group relative inline-flex items-center gap-3 bg-slate-900 text-white px-10 py-5 rounded-full text-lg font-bold hover:bg-indigo-600 transition-all duration-300 active:scale-95 shadow-xl shadow-indigo-200/50"
        >
          <span>Try for free</span>
          <svg
            className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 7l5 5m0 0l-5 5m5-5H6"
            />
          </svg>

          {/* Shine Effect */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"></div>
        </Link>

        <p className="mt-4 text-sm text-slate-400 font-medium">
          No credit card required
        </p>
      </div>
    </section>
  );
}
