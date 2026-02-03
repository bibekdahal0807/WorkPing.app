import ActivityList from "@/components/demo/ActivityList";
import GeneratedUpdate from "@/components/demo/GeneratedUpdate";
import { mockActivity } from "@/components/demo/mockData";
import Link from "next/link";

export default function DemoPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">
          Client Update Demo
        </h1>
        <p className="mt-2 text-slate-600">
          See how WorkPing turns real GitHub activity into clear,
          client-ready progress updates.
        </p>
        <p className="mt-2 text-sm text-slate-400">
          This is a demo using sample data.
        </p>
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <ActivityList items={mockActivity} />
        <GeneratedUpdate />
      </div>

      {/* CTA */}
      <div className="mt-10 flex justify-center">
        <Link
          href="/login"
          className="rounded-lg bg-[#4318FF] px-6 py-3 font-semibold text-white hover:opacity-90"
        >
          Sign in with GitHub to generate real updates
        </Link>
      </div>
    </main>
  );
}
