import { GitHubActivity } from "./mockData";

export default function ActivityList({
  items,
}: {
  items: GitHubActivity[];
}) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white">
      <div className="border-b px-4 py-3 font-semibold text-slate-800">
        Recent GitHub Activity
      </div>

      <ul className="divide-y">
        {items.map((item) => (
          <li key={item.id} className="px-4 py-3">
            <p className="text-sm font-medium text-slate-900">
              {item.title}
            </p>
            {item.description && (
              <p className="mt-1 text-sm text-slate-500">
                {item.description}
              </p>
            )}
            <span className="mt-2 inline-block text-xs text-slate-400">
              {item.type.replace("_", " ")}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
