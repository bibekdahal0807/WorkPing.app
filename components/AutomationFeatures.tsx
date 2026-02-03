import React from 'react';
import { Check } from 'lucide-react';

const features = [
  {
    title: "GitHub App Integration",
    description: "Secure, read-only access to your repositories via a GitHub App. Automatically tracks merged pull requests, commits, and code changes from selected repos—works with private repositories.",
    gradient: "from-blue-400 to-blue-600",
  },
  {
    title: "AI-Generated Client Updates",
    description: "AI summarizes your actual GitHub activity into clear, professional client updates. Focused on what was done—not assumptions, timelines, or promises. Always grounded in real work.",
    gradient: "from-indigo-400 to-indigo-600",
  },
  {
    title: "Review Before Sending",
    description: "Every update is generated in clean Markdown and shown for review. Edit anything, add context, or rewrite in your own words before copying and sending. You stay fully in control.",
    gradient: "from-purple-400 to-purple-600",
  },
  {
    title: "Manual Notes for Non-Code Work",
    description: "Add quick notes for meetings, discussions, planning, or blockers that don't appear in GitHub. Notes are merged naturally into the final update for complete, honest reporting.",
    gradient: "from-pink-400 to-pink-600",
  }
];

export function AutomationFeatures() {
  return (
    <section id="features" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 tracking-tight mb-4" style={{fontWeight: 700, fontSize: '3rem'}}>
            Why Workping
          </h2>
          <p className="text-lg text-slate-500" style={{fontSize: '1.25rem'}}>
            Built for freelance developers who value their time
          </p>
          
          {/* Pull Quote Badge */}
          <div className="mt-8 inline-flex items-center px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-full font-bold text-lg shadow-lg">
            No promises. No fluff. Just real progress.
          </div>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="p-8 rounded-2xl border border-slate-100 bg-white shadow-sm hover:shadow-lg hover:-translate-y-2 transition-all duration-300 flex flex-col items-start group"
            >
              {/* Icon Box */}
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center text-white mb-6 shadow-lg shadow-slate-200 group-hover:scale-110 transition-transform duration-300`}>
                <Check size={24} strokeWidth={3} />
              </div>

              {/* Text Content */}
              <h3 className="text-xl font-bold text-slate-900 mb-3 leading-tight" style={{fontSize: '1.5rem'}}>
                {feature.title}
              </h3>
              <p className="text-slate-500 text-sm leading-relaxed" style={{fontSize: '1rem'}}>
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}