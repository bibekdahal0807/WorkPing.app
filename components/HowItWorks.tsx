import React from 'react';
import { ChevronRight, ArrowDown } from 'lucide-react';

const steps = [
  {
    number: 1,
    title: 'Connect GitHub',
    description: 'Securely connect your GitHub account and choose the repositories you work on. Private repositories are fully supported.',
    gradient: 'from-blue-500 to-blue-600',
    shadow: 'shadow-blue-500/25',
  },
  {
    number: 2,
    title: 'AI generates your update',
    description: 'We analyze your merged PRs, commits, and code changes to create a professional, client-ready update. Optional: add quick notes or customize your voice (Pro plans).',
    gradient: 'from-violet-500 to-purple-600',
    shadow: 'shadow-violet-500/25',
  },
  {
    number: 3,
    title: 'Review & copy',
    description: 'Edit the update in a clean editor, then copy and send it anywhere — email, Slack, Notion, or client portals. You stay in full control.',
    gradient: 'from-pink-500 to-rose-500',
    shadow: 'shadow-pink-500/25',
  },
];

export function HowItWorks() {
  return (
    <section className="py-32 bg-slate-50" id="howitworks">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <h2 className="text-4xl font-bold text-slate-900 tracking-tight mb-4" style={{fontWeight: 700, fontSize: '3rem'}}>
            How it works
          </h2>
          <p className="text-lg text-slate-600" style={{fontSize: '1.25rem'}}>
            Three simple steps to stress-free client updates
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((step, index) => (
            <div key={step.number} className="relative flex flex-col h-full">
              
              {/* Card */}
              <div className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm h-full flex flex-col z-10 relative hover:shadow-lg hover:-translate-y-2 transition-all duration-300 group">
                {/* Number Icon */}
                <div
                  className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${step.gradient} flex items-center justify-center text-white text-xl font-bold mb-6 shadow-lg ${step.shadow} group-hover:scale-110 transition-transform duration-300`}
                >
                  {step.number}
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-slate-900 mb-3" style={{fontSize: '1.5rem'}}>
                  {step.title}
                </h3>
                <p className="text-slate-600 leading-relaxed text-sm" style={{fontSize: '1rem'}}>
                  {step.description}
                </p>
              </div>

              {/* Desktop Arrow (Right) - Only show between items */}
              {index < steps.length - 1 && (
                <div className="hidden md:flex absolute top-1/2 -right-4 transform -translate-y-1/2 translate-x-1/2 z-0 text-slate-300">
                  <ChevronRight size={48} strokeWidth={1.5} />
                </div>
              )}

              {/* Mobile Arrow (Down) - Only show between items */}
              {index < steps.length - 1 && (
                <div className="md:hidden flex justify-center py-4 text-slate-300">
                  <ArrowDown size={32} strokeWidth={1.5} />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}