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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#"
          className="text-lg font-bold tracking-tight text-white hover:text-[#f59e0b] transition-colors whitespace-nowrap"
        >
          DJ Gutierrez
        </a>

        {/* Zone 2: 4-6 clean text navigation links (single-line, subtle hover) */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-zinc-300">
          <a href="#projects" className="hover:text-white transition-colors">
            Projects
          </a>
          <a href="#documentation" className="hover:text-white transition-colors">
            Documentation
          </a>
          <a href="#creative" className="hover:text-white transition-colors">
            Creative
          </a>
          <a href="#about" className="hover:text-white transition-colors">
            About
          </a>
          <a href="#contact" className="hover:text-white transition-colors">
            Contact
          </a>
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="hidden sm:flex items-center gap-3">
          <button
            onClick={onOpenResume}
            className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium rounded-lg text-zinc-200 border border-[#3f3f46] hover:bg-[#18191e] hover:border-zinc-400 transition-colors whitespace-nowrap"
          >
            <FileText className="w-3.5 h-3.5 text-[#f59e0b]" />
            Resume
          </button>
          <button
            onClick={onOpenContact}
            className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium rounded-lg bg-[#f59e0b] text-black hover:bg-[#d97706] transition-colors whitespace-nowrap"
          >
            <Mail className="w-3.5 h-3.5" />
            Get in Touch
          </button>
        </div>

        {/* Mobile menu hamburger toggle */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={onOpenResume}
            className="px-2.5 py-1 text-xs font-medium rounded-md border border-[#3f3f46] text-zinc-200"
          >
            Resume
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 text-zinc-400 hover:text-white focus:outline-none"
            aria-label="Toggle menu"
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
              className="py-1 hover:text-white transition-colors"
            >
              Projects
            </a>
            <a
              href="#documentation"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-white transition-colors"
            >
              Documentation
            </a>
            <a
              href="#creative"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-white transition-colors"
            >
              Creative
            </a>
            <a
              href="#about"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-white transition-colors"
            >
              About
            </a>
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-white transition-colors"
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
              className="w-full flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-medium rounded-lg bg-[#f59e0b] text-black"
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
