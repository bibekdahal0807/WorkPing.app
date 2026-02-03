"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

type AnswerState = {
  role?: string;
  workflow?: string[];
  pain?: string;
  value?: string;
  pay?: string;
  worth?: string;
  notes?: string;
};

const steps = [
  {
    key: "role",
    question: "1️⃣ What best describes you?",
    required: true,
    options: [
      "Freelancer / Consultant",
      "Remote Engineer",
      "Solo Founder",
      "Intern / Junior Developer",
      "Part of a small team",
      "Just exploring",
    ],
  },
  {
    key: "workflow",
    question: "2️⃣ How do you currently share progress with clients or stakeholders?",
    required: true,
    multiSelect: true,
    options: [
      "Manual written updates (email, docs, Notion)",
      "Slack / chat messages",
      "Calls or meetings",
      "Screenshots / screen recordings",
      "I don't regularly share progress",
      "Other (please specify)",
    ],
  },
  {
    key: "pain",
    question: "3️⃣ How painful is writing or preparing these progress updates?",
    required: true,
    options: [
      "Very painful — I hate doing it",
      "Somewhat annoying",
      "Neutral",
      "Not really a problem",
      "I enjoy writing updates",
    ],
  },
  {
    key: "value",
    question: "4️⃣ Does this approach (auto-generating updates from GitHub activity) solve a real problem for you?",
    required: true,
    options: [
      "Yes, definitely",
      "Somewhat",
      "Not really",
      "Too early to say",
    ],
  },
  {
    key: "pay",
    question: "5️⃣ Optional — If this saved you time and mental effort, what would you realistically pay per month?",
    required: false,
    options: ["$5", "$10", "$20+", "I wouldn't pay yet"],
  },
];

export default function EarlyAccessSurvey() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<AnswerState>({});
  const [notes, setNotes] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const current = steps[step];

  const selectOption = (value: string) => {
    if (current.multiSelect) {
      const currentValues = (answers[current.key as keyof AnswerState] as string[]) || [];
      const newValues = currentValues.includes(value)
        ? currentValues.filter(v => v !== value)
        : [...currentValues, value];
      setAnswers({ ...answers, [current.key]: newValues });
    } else {
      setAnswers({ ...answers, [current.key]: value });
    }
  };

  const next = () => {
    const answer = answers[current.key as keyof AnswerState];
    if (current.required && (!answer || (Array.isArray(answer) && answer.length === 0))) return;
    setStep(step + 1);
  };

  const submit = async () => {
  setLoading(true);

  const { data: sessionData, error: sessionError } =
    await supabase.auth.getSession();

  if (sessionError || !sessionData.session) {
    console.error("No session:", sessionError);
    setLoading(false);
    return;
  }

  const user = sessionData.session.user;

  const { error } = await supabase.from("user_feedback").insert({
    user_id: user.id,
    role: answers.role ?? null,
    current_workflow: Array.isArray(answers.workflow)
      ? answers.workflow.join(", ")
      : answers.workflow ?? null,
    pain_level: answers.pain ?? null,
    value_validation: answers.value ?? null,
    willingness_to_pay: answers.pay ?? null,
    worth_paying_for: answers.worth ?? null,
    feature_requests: notes || null,
  });

  if (error) {
    console.error("❌ Supabase insert error:", error);
    alert("Something went wrong while saving feedback.");
    setLoading(false);
    return;
  }

  setSubmitted(true);
  setLoading(false);
};


  if (submitted) {
    return (
      <div className="mx-auto max-w-xl rounded-xl bg-white p-8 shadow-sm">
        <h2 className="text-xl font-semibold text-slate-900">
          Thanks for the feedback 🙌
        </h2>
        <p className="mt-2 text-slate-600">
          Your input directly helps shape WorkPing.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-xl rounded-xl bg-white p-8 shadow-sm">
      {/* Header */}
      <h1 className="text-xl font-semibold text-slate-900">
        🚧 WorkPing is in early access
      </h1>
      <p className="mt-2 text-sm text-slate-600">
        We're validating this idea and shaping the product with early users.
        Your feedback directly influences what we build next.
      </p>

      {/* Question */}
      {step < steps.length ? (
        <div className="mt-8">
          <p className="mb-4 text-sm font-medium text-slate-800">
            {current.question}
          </p>
          {current.required && (
            <p className="mb-4 text-xs text-slate-500">(Required)</p>
          )}
          {current.multiSelect && (
            <p className="mb-4 text-xs text-slate-500">(Select all that apply)</p>
          )}

          <div className="grid gap-3">
            {current.options.map((opt) => {
              const answer = answers[current.key as keyof AnswerState];
              const selected = current.multiSelect 
                ? Array.isArray(answer) && answer.includes(opt)
                : answer === opt;

              return (
                <button
                  key={opt}
                  onClick={() => selectOption(opt)}
                  className={`rounded-lg border px-4 py-3 text-left text-sm transition
                    ${
                      selected
                        ? "border-slate-900 bg-slate-900 text-white"
                        : "border-slate-200 hover:bg-slate-50"
                    }`}
                >
                  {opt}
                </button>
              );
            })}
          </div>

          <button
            onClick={next}
            disabled={current.required && (!answers[current.key as keyof AnswerState] || (Array.isArray(answers[current.key as keyof AnswerState]) && (answers[current.key as keyof AnswerState] as string[]).length === 0))}
            className="mt-6 w-full rounded-lg bg-slate-900 py-2.5 text-sm font-medium text-white disabled:opacity-40"
          >
            Next
          </button>
        </div>
      ) : (
        /* Final Questions */
        <div className="mt-8 space-y-6">
          <div>
            <p className="mb-2 text-sm font-medium text-slate-800">
              6️⃣ What would make this product worth paying for?
            </p>
            <p className="mb-3 text-xs text-slate-500">
              e.g. better summaries, client-friendly wording, integrations, custom schedules, etc.
            </p>
            <textarea
              rows={2}
              value={answers.worth || ''}
              onChange={(e) => setAnswers({ ...answers, worth: e.target.value })}
              className="w-full rounded-lg border border-slate-200 p-3 text-sm outline-none focus:ring-2 focus:ring-slate-100"
            />
          </div>
          
          <div>
            <p className="mb-2 text-sm font-medium text-slate-800">
              7️⃣ Anything else you'd like to see or improve?
            </p>
            <textarea
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full rounded-lg border border-slate-200 p-3 text-sm outline-none focus:ring-2 focus:ring-slate-100"
            />
          </div>

          <button
            onClick={submit}
            disabled={loading}
            className="mt-6 w-full rounded-lg bg-slate-900 py-2.5 text-sm font-medium text-white disabled:opacity-40"
          >
            {loading ? "Submitting..." : "✅ Submit feedback"}
          </button>
        </div>
      )}
    </div>
  );
}