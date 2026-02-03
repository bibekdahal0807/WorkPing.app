import RoadmapPhase from "./RoadmapPhase";
import { roadmapPhases } from "./roadmapData";

export default function Roadmap() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16">
      <div className="mb-10 max-w-2xl">
        <h2 className="text-2xl font-bold text-slate-900">
          Product Roadmap
        </h2>
        <p className="mt-2 text-slate-600">
          A transparent view of what we’re building and what’s coming next.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {roadmapPhases.map((phase) => (
          <RoadmapPhase key={phase.id} phase={phase} />
        ))}
      </div>

      <p className="mt-6 text-sm text-slate-400">
        Roadmap items may change based on user feedback.
      </p>
    </section>
  );
}
