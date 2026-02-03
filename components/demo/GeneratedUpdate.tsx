"use client";

import { useState } from "react";

const GENERATED_TEXT = `### Weekly Development Update

Here’s a summary of the work completed during this period:

- Implemented a new system to generate clear, client-friendly progress updates from GitHub activity.
- Refined the structure and wording of updates to improve clarity and professionalism.
- Fixed a date range issue affecting weekly summaries.
- Made small UI improvements to enhance overall usability.

All work focused on improving reliability, clarity, and maintainability of the product.`;

export default function GeneratedUpdate() {
  const [text, setText] = useState("");

  return (
    <div className="rounded-lg border border-slate-200 bg-white flex flex-col">
      <div className="border-b px-4 py-3 flex items-center justify-between">
        <span className="font-semibold text-slate-800">
          Generated Client Update
        </span>
        <button
          onClick={() => setText(GENERATED_TEXT)}
          className="rounded-md bg-slate-900 px-3 py-1.5 text-sm font-medium text-white hover:bg-slate-800"
        >
          Generate Update
        </button>
      </div>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Click “Generate Update” to see a sample client-ready summary..."
        className="min-h-[260px] w-full resize-none p-4 text-sm leading-relaxed outline-none"
      />
    </div>
  );
}
