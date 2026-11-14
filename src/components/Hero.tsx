import React, { useState, useRef, useEffect } from 'react';
import { Code2, Camera, ChevronRight, Upload, RotateCcw, Blend } from 'lucide-react';

interface HeroProps {
  onExploreProjects: () => void;
  onExploreCreative: () => void;
  onOpenResume: () => void;
  onOpenContact: () => void;
}

const PORTRAIT_STORAGE_KEY = 'portfolio_business_portrait_v1';
const PORTRAIT_BLEND_KEY = 'portfolio_business_portrait_blend_v1';

export const Hero: React.FC<HeroProps> = ({
  onExploreProjects,
  onExploreCreative,
  onOpenContact,
}) => {
  const [portraitUrl, setPortraitUrl] = useState<string | null>(null);
  const [imgLoadFailed, setImgLoadFailed] = useState<boolean>(false);
  const [blendWithBg, setBlendWithBg] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(PORTRAIT_STORAGE_KEY);
      const savedBlend = localStorage.getItem(PORTRAIT_BLEND_KEY);
      if (savedBlend === 'true') {
        setBlendWithBg(true);
      }
      if (saved) {
        setPortraitUrl(saved);
        setImgLoadFailed(false);
      } else {
        setPortraitUrl('/business-portrait.jpg');
      }
    } catch {
      setPortraitUrl('/business-portrait.jpg');
    }
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      setPortraitUrl(result);
      setImgLoadFailed(false);
      try {
        localStorage.setItem(PORTRAIT_STORAGE_KEY, result);
      } catch {
        // Storage quota fallback: still display in active session
      }
    };
    reader.readAsDataURL(file);
  };

  const handleToggleBlend = () => {
    const next = !blendWithBg;
    setBlendWithBg(next);
    try {
      localStorage.setItem(PORTRAIT_BLEND_KEY, String(next));
    } catch {
      // ignore
    }
  };

  const handleResetPhoto = () => {
    try {
      localStorage.removeItem(PORTRAIT_STORAGE_KEY);
    } catch {
      // ignore
    }
    setPortraitUrl(null);
    setImgLoadFailed(true);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const showImage = Boolean(portraitUrl && !imgLoadFailed);
  const hasCustomStoredPhoto = (() => {
    try {
      return Boolean(localStorage.getItem(PORTRAIT_STORAGE_KEY));
    } catch {
      return false;
    }
  })();

  return (
    <section className="relative bg-[#0c0d0e] border-b border-white/15 overflow-hidden">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
        aria-label="Upload business attire portrait photo"
      />

      {/* Editorial Poster Stage — Frameless Portrait Integrated Into Solid Background */}
      <div className="relative max-w-[1440px] mx-auto min-h-[460px] sm:min-h-[560px] lg:min-h-[640px] flex flex-col justify-between">
        {/* Frameless Vertical Portrait Band (Zero borders, zero rounded corners, zero shadows, zero gradients) */}
        <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 md:left-[24%] md:translate-x-0 lg:left-[26%] w-[82%] sm:w-[60%] md:w-[42%] lg:w-[36%] max-w-[500px] z-0 overflow-hidden bg-[#0c0d0e]">
          {showImage ? (
            <img
              src={portraitUrl!}
              alt="DJ Gutierrez — Business Attire Portrait"
              referrerPolicy="no-referrer"
              onError={() => setImgLoadFailed(true)}
              className={`w-full h-full object-cover object-top select-none ${
                blendWithBg ? 'mix-blend-lighten' : ''
              }`}
            />
          ) : (
            /* Frameless portrait zone sharing the exact #0c0d0e background */
            <div className="w-full h-full flex flex-col items-center justify-start pt-16 sm:pt-20 bg-[#0c0d0e] px-6 text-center">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="group relative z-20 flex flex-col items-center gap-3 text-zinc-400 hover:text-[#ebe7df] transition-colors focus:outline-none"
              >
                <svg
                  viewBox="0 0 120 140"
                  className="w-28 h-32 sm:w-36 sm:h-40 text-white/15 group-hover:text-[#f04a1b]/60 transition-colors"
                  fill="none"
                  aria-hidden="true"
                >
                  <circle cx="60" cy="40" r="24" stroke="currentColor" strokeWidth="1.25" />
                  <path
                    d="M16 138C16 102 36 82 60 82C84 82 104 102 104 138"
                    stroke="currentColor"
                    strokeWidth="1.25"
                  />
                </svg>
                <span className="inline-flex items-center gap-2 text-xs font-mono tracking-wider uppercase text-zinc-300 group-hover:text-[#f04a1b] transition-colors">
                  <Upload className="w-3.5 h-3.5" />
                  Upload Business Attire Photo
                </span>
              </button>
            </div>
          )}
        </div>

        {/* Top Micro-Metadata & Photo Controls Strip */}
        <div className="relative z-10 px-4 sm:px-8 lg:px-12 pt-7 flex items-center justify-between text-[11px] font-mono uppercase tracking-[0.14em] text-zinc-400">
          <span>University of Santo Tomas · BS IT</span>
          <div className="flex items-center gap-4">
            <span className="hidden sm:inline">Manila, PH</span>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="inline-flex items-center gap-1.5 text-zinc-300 hover:text-[#f04a1b] transition-colors"
            >
              <Upload className="w-3 h-3" />
              {showImage ? 'Replace Photo' : 'Add Photo'}
            </button>
            {showImage && (
              <button
                type="button"
                onClick={handleToggleBlend}
                title="Blend dark photo backdrop into background"
                className={`inline-flex items-center gap-1 transition-colors ${
                  blendWithBg ? 'text-[#f04a1b]' : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                <Blend className="w-3 h-3" />
                <span className="hidden sm:inline">{blendWithBg ? 'Blended' : 'Blend'}</span>
              </button>
            )}
            {hasCustomStoredPhoto && (
              <button
                type="button"
                onClick={handleResetPhoto}
                title="Reset portrait"
                className="text-zinc-400 hover:text-zinc-200 transition-colors"
              >
                <RotateCcw className="w-3 h-3" />
              </button>
            )}
          </div>
        </div>

        {/* Central Architectural Datum Hairline + Starburst + Oversized Overlapping Display Type */}
        <div className="relative z-10 mt-auto pt-36 sm:pt-44 pb-8 sm:pb-12 pointer-events-none">
          {/* Starburst Accent & Right Micro Label above hairline */}
          <div className="px-4 sm:px-8 lg:px-12 flex items-end justify-between mb-3">
            <span className="text-[11px] font-mono uppercase tracking-[0.14em] text-zinc-400">
              Software · Data Science · Visual Media
            </span>

            <div className="flex items-center gap-5">
              {/* Crisp 8-point vermilion starburst */}
              <svg
                viewBox="0 0 32 32"
                className="w-6 h-6 sm:w-8 sm:h-8 text-[#f04a1b]"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M16 0L17.4 12.6L27.3 4.7L19.4 14.6L32 16L19.4 17.4L27.3 27.3L17.4 19.4L16 32L14.6 19.4L4.7 27.3L12.6 17.4L0 16L12.6 14.6L4.7 4.7L14.6 12.6L16 0Z" />
              </svg>
              <span className="hidden md:inline text-[11px] font-mono uppercase tracking-[0.12em] text-zinc-300 text-right leading-tight">
                IT Student &amp;<br />Creative Technologist
              </span>
            </div>
          </div>

          {/* Full-bleed horizontal datum hairline */}
          <div className="w-full h-px bg-white/20 mb-2 sm:mb-4" />

          {/* Giant Overlapping Display Typography */}
          <div className="px-3 sm:px-6 lg:px-10 select-none">
            <h1 className="text-[#ebe7df] font-light tracking-[-0.03em] leading-[0.88] text-[clamp(2.1rem,10.6vw,8.75rem)] whitespace-nowrap">
              DJG
              <span className="font-editorial italic font-normal pr-[0.03em]">U</span>
              TI
              <span className="font-editorial italic font-normal pr-[0.03em]">E</span>
              RREZ
            </h1>

            <div className="flex justify-end pr-2 sm:pr-6 mt-1 sm:mt-2">
              <span className="text-[#f04a1b] font-normal tracking-[-0.03em] leading-[0.88] text-[clamp(2.2rem,8.8vw,7.5rem)]">
                .W
                <span className="font-editorial italic font-normal pr-[0.02em]">O</span>
                RK
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Positioning Statement & Primary Calls to Action (Clean flat #0c0d0e bar) */}
      <div className="border-t border-white/15 bg-[#0c0d0e]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <p className="text-sm sm:text-base text-zinc-300 max-w-xl leading-relaxed">
            Building digital experiences through code, design, and visual storytelling.
            IT student at the University of Santo Tomas exploring software development,
            data science, and AI.
          </p>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={onExploreProjects}
              className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-md bg-[#f04a1b] text-white hover:bg-[#d93f14] transition-colors whitespace-nowrap"
            >
              <Code2 className="w-4 h-4" />
              View My Projects
            </button>

            <button
              type="button"
              onClick={onExploreCreative}
              className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-md bg-[#16171a] border border-white/15 text-zinc-100 hover:border-white/40 transition-colors whitespace-nowrap"
            >
              <Camera className="w-4 h-4 text-[#f04a1b]" />
              Creative Work
            </button>

            <button
              type="button"
              onClick={onOpenContact}
              className="flex items-center gap-1 px-3 py-2.5 text-sm font-medium text-zinc-300 hover:text-white transition-colors whitespace-nowrap"
            >
              Contact
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Highlight Metrics Strip */}
      <div className="border-t border-white/10 bg-[#0c0d0e]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div>
            <div className="text-xs uppercase tracking-wider font-semibold text-zinc-400 mb-1">
              Academic Program
            </div>
            <div className="text-sm font-semibold text-zinc-100">
              UST IT Student
            </div>
            <div className="text-xs text-zinc-400 mt-0.5">
              Software dev &amp; data focus
            </div>
          </div>

          <div>
            <div className="text-xs uppercase tracking-wider font-semibold text-zinc-400 mb-1">
              Core Technical Work
            </div>
            <div className="text-sm font-semibold text-zinc-100 font-mono tabular-nums">
              Java · Python · Web
            </div>
            <div className="text-xs text-zinc-400 mt-0.5">
              OOP, CLI systems &amp; UX
            </div>
          </div>

          <div>
            <div className="text-xs uppercase tracking-wider font-semibold text-zinc-400 mb-1">
              Specialized Coursework
            </div>
            <div className="text-sm font-semibold text-[#f59e0b]">
              Matsuo Labs GCI
            </div>
            <div className="text-xs text-zinc-400 mt-0.5">
              Univ of Tokyo 3-mo AI program
            </div>
          </div>

          <div>
            <div className="text-xs uppercase tracking-wider font-semibold text-zinc-400 mb-1">
              Creative Direction
            </div>
            <div className="text-sm font-semibold text-zinc-100">
              Photo &amp; Video Media
            </div>
            <div className="text-xs text-zinc-400 mt-0.5">
              TEDx &amp; summit event lead
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
