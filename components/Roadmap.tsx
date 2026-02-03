import React from 'react';
import { CheckCircle, Clock, Zap } from 'lucide-react';

const roadmapItems = [
  {
    title: "GitHub Integration & AI Summaries",
    description: "Connect repositories, track merged PRs and commits, generate professional client updates with AI.",
    status: "completed",
    icon: CheckCircle,
    gradient: "from-green-400 to-green-600",
    shadow: "shadow-green-500/25",
  },
  {
    title: "Manual Notes & Chrome Extension",
    description: "Add context for non-code work like meetings, planning, and blockers. Quick note-taking via browser extension.",
    status: "in-progress",
    icon: Clock,
    gradient: "from-blue-400 to-blue-600",
    shadow: "shadow-blue-500/25",
  },
  {
    title: "Team Collaboration & Multi-Repo",
    description: "Support multiple team members, aggregate updates across repositories, and customize update frequency.",
    status: "planned",
    icon: Zap,
    gradient: "from-purple-400 to-purple-600",
    shadow: "shadow-purple-500/25",
  },
  {
    title: "Advanced Customization & Integrations",
    description: "Custom update templates, direct integrations with Slack, email, and project management tools.",
    status: "planned",
    icon: Zap,
    gradient: "from-pink-400 to-pink-600",
    shadow: "shadow-pink-500/25",
  }
];

const statusConfig = {
  completed: { label: "✅ Live", color: "text-green-600 bg-green-50 border-green-200" },
  "in-progress": { label: "🚧 In Progress", color: "text-blue-600 bg-blue-50 border-blue-200" },
  planned: { label: "📋 Planned", color: "text-purple-600 bg-purple-50 border-purple-200" }
};

export default function Roadmap() {
  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 tracking-tight mb-4" style={{fontWeight: 700, fontSize: '3rem'}}>
            Product Roadmap
          </h2>
          <p className="text-lg text-slate-600" style={{fontSize: '1.25rem'}}>
            Building the future of client communication for freelance developers
          </p>
        </div>

        {/* Roadmap Timeline */}
        <div className="space-y-8">
          {roadmapItems.map((item, index) => {
            const IconComponent = item.icon;
            const config = statusConfig[item.status as keyof typeof statusConfig];
            
            return (
              <div key={index} className="relative flex items-start group">
                
                {/* Timeline Line */}
                {index < roadmapItems.length - 1 && (
                  <div className="absolute left-7 top-16 w-0.5 h-16 bg-slate-200"></div>
                )}
                
                {/* Icon */}
                <div className={`flex-shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br ${item.gradient} flex items-center justify-center text-white shadow-lg ${item.shadow} group-hover:scale-110 transition-transform duration-300`}>
                  <IconComponent size={24} strokeWidth={2} />
                </div>
                
                {/* Content Card */}
                <div className="ml-6 flex-1 bg-white rounded-2xl p-8 border border-slate-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                  
                  {/* Status Badge */}
                  <div className="mb-4">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${config.color}`}>
                      {config.label}
                    </span>
                  </div>
                  
                  {/* Title */}
                  <h3 className="text-xl font-bold text-slate-900 mb-3" style={{fontSize: '1.5rem'}}>
                    {item.title}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-slate-600 leading-relaxed" style={{fontSize: '1rem'}}>
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Disclaimer */}
        <div className="text-center mt-12">
          <p className="text-sm text-slate-500 italic">
            Roadmap is subject to change based on user feedback.
          </p>
        </div>
      </div>
    </section>
  );
}