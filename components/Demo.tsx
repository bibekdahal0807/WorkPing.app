import React from 'react';

export default function Demo() {
  return (
    <section className="py-32 bg-white" id="demo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 tracking-tight mb-4" style={{fontWeight: 700, fontSize: '3rem'}}>
            See It In Action
          </h2>
          <p className="text-lg text-slate-600" style={{fontSize: '1.25rem'}}>
            Watch how your GitHub activity transforms into professional client updates
          </p>
        </div>

        {/* Demo Container */}
        <div className="relative max-w-5xl mx-auto">
          
          {/* Browser Frame */}
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
            
            {/* Browser Header */}
            <div className="bg-slate-100 px-6 py-4 border-b border-slate-200 flex items-center gap-2">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-400"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                <div className="w-3 h-3 rounded-full bg-green-400"></div>
              </div>
              <div className="ml-4 bg-white rounded-lg px-4 py-1 text-sm text-slate-600 flex-1">
                                workping.com/dashboard
              </div>
            </div>

            {/* Demo Content */}
            <div className="p-8">
              
              {/* GitHub Activity Section */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-slate-900 mb-4">Your GitHub Activity (Last 7 Days)</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg border border-green-200">
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    <span className="text-sm text-slate-700">Merged PR #47: Add user authentication system</span>
                    <span className="text-xs text-slate-500 ml-auto">2 days ago</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                    <span className="text-sm text-slate-700">8 commits to feature/payment-integration</span>
                    <span className="text-xs text-slate-500 ml-auto">1 day ago</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg border border-purple-200">
                    <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                    <span className="text-sm text-slate-700">Fixed critical bug in checkout flow</span>
                    <span className="text-xs text-slate-500 ml-auto">Today</span>
                  </div>
                </div>
              </div>

              {/* Generated Update */}
              <div className="border-t border-slate-200 pt-8">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-slate-900">Generated Client Update</h3>
                  <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors">
                    Copy Update
                  </button>
                </div>
                
                <div className="bg-slate-50 rounded-lg p-6 border border-slate-200">
                  <div className="prose prose-sm max-w-none">
                    <p className="text-slate-700 mb-4">
                      <strong>Weekly Progress Update</strong>
                    </p>
                    <p className="text-slate-700 mb-3">
                      This week I completed the user authentication system and made significant progress on payment integration:
                    </p>
                    <ul className="text-slate-700 space-y-1 mb-4">
                      <li>✅ Implemented secure user login and registration</li>
                      <li>✅ Added password reset functionality</li>
                      <li>🔄 Working on Stripe payment integration (8 commits)</li>
                      <li>🐛 Fixed critical checkout flow bug affecting user experience</li>
                    </ul>
                    <p className="text-slate-700">
                      The authentication system is now live and ready for testing. Payment integration is on track for completion next week.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Floating Elements */}
          <div className="absolute -top-4 -right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg">
            AI Generated
          </div>
          <div className="absolute -bottom-4 -left-4 bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg">
            Ready to Send
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <p className="text-slate-600 mb-4 text-sm">
            Generated only from merged PRs and commits — no guessing, no fluff.
          </p>
          <a 
            href="/signup" 
            className="inline-flex items-center gap-2 bg-indigo-600 text-white px-8 py-4 rounded-full font-semibold hover:bg-indigo-700 transition-colors shadow-lg"
          >
            Try It Yourself
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}