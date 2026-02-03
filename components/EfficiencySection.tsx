export default function EfficiencySection() {
  return (
    <section className="relative py-20 overflow-hidden bg-gradient-to-br from-indigo-50 via-purple-50 to-blue-50">
      {/* Decorative background curves */}
      <div className="pointer-events-none absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full border border-indigo-200 opacity-40" />
      <div className="pointer-events-none absolute top-20 left-60 h-[600px] w-[600px] rounded-full border border-purple-200 opacity-30" />

      <div className="relative mx-auto max-w-6xl px-6 text-center">
        {/* Heading */}
        <h2 className="text-5xl font-extrabold tracking-tight">
          <span className="text-indigo-500">Efficiency</span>{" "}
          <span className="text-gray-900">that pays off</span>
        </h2>

        <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600">
          This saves me at least 15 minutes every week and removes the stress of writing updates.
        </p>

        {/* Cards */}
        <div className="mt-20 grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Card 1 */}
          <div className="rounded-3xl bg-white p-8 shadow-xl">
            <div className="mb-6 h-3 w-full rounded-full bg-indigo-100">
              <div className="h-3 w-3/4 rounded-full bg-indigo-500" />
            </div>

            <h3 className="text-6xl font-extrabold text-gray-900">30%</h3>
            <p className="mt-4 text-gray-600">
              Increase in developer productivity
            </p>
          </div>

          {/* Card 2 */}
          <div className="rounded-3xl bg-white p-8 shadow-xl">
            <h3 className="text-6xl font-extrabold text-gray-900">
              4–6{" "}
              <span className="text-3xl font-semibold text-gray-900">
                hours
              </span>
            </h3>

            <p className="mt-4 text-gray-600">
              <span className="font-semibold text-gray-900">
                Time savings
              </span>{" "}
              – per week per team member
            </p>

            {/* Gauge */}
            <div className="relative mt-10 h-32 w-full overflow-hidden">
              <div className="absolute inset-x-0 bottom-0 h-64 rounded-full bg-gradient-to-br from-purple-200 to-indigo-300" />
              <div className="absolute bottom-0 left-1/2 h-24 w-2 -translate-x-1/2 rotate-45 bg-purple-600 rounded-full" />
            </div>
          </div>

          {/* Card 3 */}
          <div className="rounded-3xl bg-white p-8 shadow-xl">
            <h3 className="text-6xl font-extrabold text-gray-900">95%</h3>

            <p className="mt-4 text-gray-600">
              Reduction in time spent on{" "}
              <span className="font-semibold text-gray-900">
                project updates
              </span>
            </p>

            {/* Wave */}
            <div className="relative mt-10 h-24 overflow-hidden">
              <svg
                viewBox="0 0 500 150"
                preserveAspectRatio="none"
                className="absolute h-full w-full"
              >
                <path
                  d="M0,80 C80,120 160,40 240,60 320,80 400,140 500,90"
                  fill="none"
                  stroke="#6366F1"
                  strokeWidth="6"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
