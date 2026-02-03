import Link from 'next/link';

export default function FinalCTASection() {
  return (
    <section className="py-20 px-4 sm:px-6">
      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-50 via-purple-50 to-blue-50 shadow-2xl">
        
        {/* Decorative shapes — hidden on mobile */}
        <div className="pointer-events-none absolute right-0 top-0 hidden h-full w-1/2 md:block">
          <div className="absolute bottom-0 right-0 h-[260px] w-[260px] rounded-tl-[120px] bg-indigo-400 opacity-70" />
          <div className="absolute bottom-6 right-6 h-[260px] w-[260px] rounded-tl-[120px] border border-indigo-300 opacity-40" />
          <div className="absolute bottom-12 right-12 h-[260px] w-[260px] rounded-tl-[120px] border border-indigo-200 opacity-30" />
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col gap-10 p-8 sm:p-12 md:p-16 md:max-w-3xl">
          
          <h2 className="text-3xl font-extrabold leading-tight text-gray-900 sm:text-4xl md:text-5xl">
            Built for freelance developers who value{" "}
            <span className="text-indigo-500">clear communication</span>
          </h2>

          <p className="max-w-xl text-base text-gray-600 sm:text-lg">
            Spend less time writing updates and more time doing real work. Client updates, generated directly from your actual GitHub activity.
          </p>

          {/* Buttons */}
          <div className="flex flex-col gap-4 sm:flex-row">
            <Link href="/login" className="rounded-full bg-indigo-500 px-8 py-4 font-semibold text-white shadow-md transition hover:bg-indigo-600 text-center">
              Start for free
            </Link>

            <Link href="/signup" className="rounded-full border border-indigo-400 px-8 py-4 font-semibold text-indigo-500 transition hover:bg-indigo-50 text-center">
              Try a demo
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}
