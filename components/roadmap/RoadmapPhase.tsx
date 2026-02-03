import { RoadmapPhase as Phase } from "./roadmapData";

export default function RoadmapPhase({ phase }: { phase: Phase }) {
  return (
    <div
      className={`rounded-lg border px-5 py-4 ${
        phase.current
          ? "border-slate-900 bg-slate-50"
          : "border-slate-200 bg-white"
      }`}
    >
      <div className="flex items-center justify-between">
        <h3 className="text-base font-semibold text-slate-900">
          {phase.title}
        </h3>

        {phase.current && (
          <span className="rounded-full bg-slate-900 px-2 py-0.5 text-xs font-medium text-white">
            Current
          </span>
        )}
      </div>

      <p className="mt-2 text-sm text-slate-600">
        {phase.description}
      </p>

      <ul className="mt-3 space-y-1 text-sm text-slate-700">
        {phase.features.map((feature) => (
          <li key={feature} className="flex gap-2">
            <span className="mt-1 h-1.5 w-1.5 rounded-full bg-slate-400" />
            {feature}
          </li>
        ))}
      </ul>
    </div>
  );
}
