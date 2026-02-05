'use client';

import Link from "next/link";

export default function PricingSection() {
  return (
    <section id="pricing" className="py-32 px-6">
      <div className="mx-auto max-w-6xl text-center">
        {/* Heading */}
        <h2 className="text-5xl font-extrabold tracking-tight text-gray-900">
          Simple pricing
        </h2>
        <p className="mt-4 text-lg text-gray-500">
          Start free, upgrade when you need more
        </p>

        {/* Pricing cards */}
        <div className="mt-20 grid grid-cols-1 gap-8 md:grid-cols-2">
          
          {/* Free */}
          <div className="rounded-3xl border bg-white p-8 text-left shadow-sm">
            <h3 className="text-2xl font-bold text-gray-900">Free</h3>

            <div className="mt-4">
              <span className="text-5xl font-extrabold">$0</span>
              <span className="ml-2 text-gray-500">/month</span>
            </div>

            <ul className="mt-8 space-y-4 text-gray-700">
              <li>✓ Connect GitHub</li>
              <li>✓ View recent activity</li>
              <li>✓ Preview client update</li>
              <li>✓ Manual editing</li>
            </ul>

            <Link href="/login" className="mt-10 w-full rounded-xl border px-4 py-3 font-semibold block text-center hover:bg-gray-50 transition-colors">
              Get started
            </Link>
          </div>

          {/* Pro (highlighted) */}
          <div className="relative rounded-3xl bg-gradient-to-b from-indigo-500 to-indigo-600 p-8 text-left text-white shadow-xl">
            {/* Popular badge */}
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-yellow-400 px-4 py-1 text-sm font-bold text-gray-900">
              POPULAR
            </div>

            <h3 className="text-2xl font-bold">Starter</h3>

            <div className="mt-4">
              <span className="text-5xl font-extrabold">$5</span>
              <span className="ml-2 text-indigo-200">/month</span>
            </div>

            <ul className="mt-8 space-y-4">
              <li>✓ Generate polished client updates</li>
              <li>✓ Unlimited clients</li>
              <li>✓ Edit, copy, reuse</li>
              <li>✓ Cancel anytime</li>
            </ul>

            <button 
              onClick={() => alert('Email muraridahal0807@gmail.com for early access to WorkPing Starter!')}
              className="mt-10 w-full rounded-xl bg-white px-4 py-3 font-semibold text-indigo-600"
            >
              Request Early Access
            </button>
          </div>

        </div>
        
        {/* Trust & Security */}
        <div className="mt-16 bg-slate-50 rounded-2xl p-8">
          <h3 className="text-lg font-semibold text-slate-900 mb-6 text-center">🔒 Your Code is Safe</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-3">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="text-sm font-medium text-slate-700">Read-only GitHub App</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-3">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4-8-4m16 0v10l-8 4-8-4V7" />
                </svg>
              </div>
              <p className="text-sm font-medium text-slate-700">No code is stored</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-3">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <p className="text-sm font-medium text-slate-700">You can revoke access anytime</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
