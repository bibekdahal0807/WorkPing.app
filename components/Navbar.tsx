'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, MoreHorizontal, Sparkles, Menu, X } from 'lucide-react';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

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

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Features', href: '#features' },
    { name: 'Pricing', href: '#pricing' },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* LEFT: Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <span className="text-2xl font-black tracking-tighter text-[#4318FF]">
                WORKPING
              </span>
            </Link>
          </div>

          {/* CENTER: Desktop Links */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link 
                key={link.name}
                href={link.href}
                onClick={(e) => handleScroll(e, link.href)}
                className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* RIGHT: Desktop Auth Actions */}
          <div className="hidden md:flex items-center gap-6">
            <Link 
              href="/login" 
              className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
            >
              Login
            </Link>
            <Link 
              href="/signup" 
              className="group flex items-center gap-2 bg-[#3600E3] hover:bg-[#2b00b5] text-white px-5 py-2.5 rounded-full text-sm font-medium transition-all shadow-sm"
            >
              <span>Try for free</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          {/* MOBILE: Hamburger Button */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-600 hover:text-slate-900 p-2"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE MENU: Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-slate-100 absolute w-full left-0 animate-in slide-in-from-top-2 duration-200">
          <div className="px-4 pt-2 pb-6 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  handleScroll(e, link.href);
                  setIsOpen(false);
                }}
                className="block px-3 py-3 text-base font-medium text-slate-600 hover:bg-slate-50 rounded-lg"
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-4 flex flex-col gap-3 px-3">
              <Link 
                href="/login"
                className="text-center py-3 text-base font-medium text-slate-600 border border-slate-200 rounded-lg"
              >
                Login
              </Link>
              <Link 
                href="/signup"
                className="text-center py-3 text-base font-medium bg-[#3600E3] text-white rounded-lg"
              >
                Try for free
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}