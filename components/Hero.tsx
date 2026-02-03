import Link from "next/link";

export default function Hero() {
  return (
    <section className="flex flex-col items-center text-center pt-32 pb-20 px-4 bg-slate-50">
      
      {/* Small badge */}
      <div className="mb-6">
        <span className="px-4 py-1 rounded-full bg-indigo-50 text-indigo-600 text-sm font-medium">
          Turn GitHub activity into clear, client-ready updates.
        </span>
      </div>

      {/* Main heading */}
      <h1 className="text-5xl md:text-6xl font-extrabold leading-tight max-w-4xl">
  <span className="relative inline-block">
    <span className="relative z-10">Clear client updates</span>
    {/* The Golden Tear Shape */}
    <svg className="absolute -bottom-2 left-0 w-full h-4 -z-0 opacity-70" viewBox="0 0 100 20" preserveAspectRatio="none">
      <path 
        d="M0,10 Q25,0 50,10 T100,10 L100,20 L0,20 Z" 
        fill="#FFD700" 
      />
    </svg>
  </span> 
  {" "}from your{" "}
  <span className="relative inline-block">
    <span className="relative z-10">real GitHub work</span>
    <svg className="absolute -bottom-2 left-0 w-full h-4 -z-0 opacity-70" viewBox="0 0 100 20" preserveAspectRatio="none">
      <path 
        d="M0,15 Q30,5 60,15 T100,5 L100,20 L0,20 Z" 
        fill="#FFD700" 
      />
    </svg>
  </span>
</h1>

      {/* Description */}
      <p className="mt-6 max-w-2xl text-lg text-muted">
        Stop wasting time writing weekly updates. <br />
WorkPing turns your commits and merged pull requests into clean, client-ready progress updates —
        <span className="font-semibold text-black">
        &nbsp;review, edit, and send.
        </span>
      </p>

      {/* CTA */}
      <Link
        href="/login"
        className="mt-10 inline-flex items-center gap-2 bg-primary text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-primary/90 transition-all duration-300 group active:scale-95 relative overflow-hidden"
      >
        <span className="relative z-10">Try for free</span>
        <span className="group-hover:translate-x-1 transition-transform duration-300 relative z-10">→</span>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out"></div>
      </Link>

    </section>
  );
}
