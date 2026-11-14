import React, { useState, useEffect } from 'react';
import { FileText, Mail, Menu, X } from 'lucide-react';

interface NavbarProps {
  onOpenResume: () => void;
  onOpenContact: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenResume, onOpenContact }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-200 ${
        scrolled
          ? 'bg-[#0c0d0e]/90 backdrop-blur-md border-b border-[#27272a]'
          : 'bg-transparent border-b border-white/[0.06]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-2">
        {/* Zone 1: Full-name wordmark kept single-line across mobile and desktop viewports */}
        <a
          href="#"
          className="text-base sm:text-lg font-bold tracking-tight text-white hover:text-[#f59e0b] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f59e0b] rounded-sm transition-colors whitespace-nowrap shrink-0"
        >
          David Jed Gutierrez
        </a>

        {/* Zone 2: Clean single-line navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-zinc-300">
          <a href="#projects" className="hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f59e0b] rounded-sm transition-colors whitespace-nowrap">
            Projects
          </a>
          <a href="#documentation" className="hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f59e0b] rounded-sm transition-colors whitespace-nowrap">
            Documentation
          </a>
          <a href="#creative" className="hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f59e0b] rounded-sm transition-colors whitespace-nowrap">
            Creative
          </a>
          <a href="#about" className="hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f59e0b] rounded-sm transition-colors whitespace-nowrap">
            About
          </a>
          <a href="#contact" className="hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f59e0b] rounded-sm transition-colors whitespace-nowrap">
            Contact
          </a>
        </nav>

        {/* Zone 3: Primary desktop actions using warm amber accent (#f59e0b) */}
        <div className="hidden md:flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenResume}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium rounded-lg text-zinc-200 border border-[#3f3f46] hover:bg-[#18191e] hover:border-zinc-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f59e0b] transition-colors whitespace-nowrap"
          >
            <FileText className="w-3.5 h-3.5 text-[#f59e0b]" />
            Resume
          </button>
          <button
            onClick={onOpenContact}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-lg bg-[#f59e0b] text-black hover:bg-[#d97706] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f59e0b] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0c0d0e] transition-colors whitespace-nowrap"
          >
            <Mail className="w-3.5 h-3.5" />
            Get in Touch
          </button>
        </div>

        {/* Mobile controls sized for 320px-360px clearance with 44x44px tap target */}
        <div className="flex md:hidden items-center gap-1.5 shrink-0">
          <button
            onClick={onOpenResume}
            className="px-2.5 py-2 text-xs font-medium rounded-lg border border-[#3f3f46] text-zinc-200 hover:bg-[#18191e] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f59e0b] whitespace-nowrap"
          >
            Resume
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg text-zinc-300 hover:text-white hover:bg-[#18191e] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f59e0b]"
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-[#27272a] bg-[#121316] px-4 py-4 space-y-3">
          <nav className="flex flex-col space-y-2.5 text-sm font-medium text-zinc-300">
            <a
              href="#projects"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1.5 hover:text-white transition-colors"
            >
              Projects
            </a>
            <a
              href="#documentation"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1.5 hover:text-white transition-colors"
            >
              Documentation
            </a>
            <a
              href="#creative"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1.5 hover:text-white transition-colors"
            >
              Creative
            </a>
            <a
              href="#about"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1.5 hover:text-white transition-colors"
            >
              About
            </a>
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1.5 hover:text-white transition-colors"
            >
              Contact
            </a>
          </nav>
          <div className="pt-2 border-t border-[#27272a] flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenContact();
              }}
              className="w-full flex items-center justify-center gap-1.5 py-2.5 px-3 text-xs font-semibold rounded-lg bg-[#f59e0b] text-black hover:bg-[#d97706] transition-colors"
            >
              <Mail className="w-3.5 h-3.5" />
              Contact Me
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
