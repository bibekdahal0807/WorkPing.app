'use client';

import Link from "next/link";

export default function Footer() {
  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else if (href === '/') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };
  return (
    <footer className="bg-primary px-4 sm:px-6">
      <div className="mx-auto max-w-6xl py-16">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 md:grid-cols-4">
          
          {/* Brand */}
          <div>
            <h3 className="text-lg font-bold text-white">
              WorkPing
            </h3>
            <p className="mt-4 max-w-xs text-sm text-white/80">
              Clear, honest client updates from real GitHub work.
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 className="text-sm font-semibold text-white">
              Product
            </h4>
            <ul className="mt-4 space-y-3 text-sm text-white/80">
              <li><Link href="#features" onClick={(e) => handleScroll(e, '#features')} className="hover:text-white">Features</Link></li>
              <li><Link href="#pricing" onClick={(e) => handleScroll(e, '#pricing')} className="hover:text-white">Pricing</Link></li>
              <li><Link href="#howitworks" onClick={(e) => handleScroll(e, '#howitworks')} className="hover:text-white">How it works</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-sm font-semibold text-white">
              Company
            </h4>
            <ul className="mt-4 space-y-3 text-sm text-white/80">
              <li><Link href="#" className="hover:text-white">About</Link></li>
              <li><Link href="#" className="hover:text-white">Contact</Link></li>
              <li><Link href="#" className="hover:text-white">Privacy</Link></li>
            </ul>
          </div>

          {/* CTA */}
          <div>
            <h4 className="text-sm font-semibold text-white">
              Get started
            </h4>
            <p className="mt-4 text-sm text-white/80">
              Sign in with GitHub and generate your first update in minutes.
            </p>
            <Link
              href="/login"
              className="mt-6 inline-block rounded-full bg-white px-6 py-3 text-sm font-semibold text-primary transition hover:bg-gray-100"
            >
              Continue with GitHub →
            </Link>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/20 pt-8 text-sm text-white/60 sm:flex-row">
          <span>
            © {new Date().getFullYear()} WorkPing. All rights reserved.
          </span>
          <span>
            Built for freelance developers • Trust first
          </span>
        </div>
      </div>
    </footer>
  );
}
