import React from 'react';
import { ArrowUp } from 'lucide-react';

interface FooterProps {
  onOpenResume: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenResume }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-[#27272a] bg-[#090a0c] text-zinc-400 py-12 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          {/* Updated brand name to David Jed Gutierrez */}
          <div className="font-bold text-white tracking-tight mb-1 text-sm">
            David Jed Gutierrez
          </div>
          <p className="text-zinc-400">
            Information Technology · University of Santo Tomas (UST), Manila
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-6">
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
          <button
            onClick={onOpenResume}
            className="hover:text-white transition-colors"
          >
            Resume
          </button>
          <a
            href="mailto:dj.gutierrez.1221@gmail.com"
            className="text-[#f59e0b] hover:underline"
          >
            dj.gutierrez.1221@gmail.com
          </a>
        </div>

        <button
          onClick={scrollToTop}
          className="flex items-center gap-1.5 p-2 rounded-lg border border-[#27272a] text-zinc-400 hover:text-white hover:bg-[#18191e] transition-colors"
          title="Back to top"
        >
          <ArrowUp className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Top</span>
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 pt-6 border-t border-[#27272a]/40 text-center text-zinc-400 text-[11px]">
        Designed with minimalist typography &amp; zero-pill discipline · University of Santo Tomas IT Student Portfolio
      </div>
    </footer>
  );
};
