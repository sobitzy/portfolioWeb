import React, { useState, useRef, useEffect } from 'react';
import { Code2, Camera, ChevronRight, Upload, RotateCcw, UserCheck } from 'lucide-react';

interface HeroProps {
  onExploreProjects: () => void;
  onExploreCreative: () => void;
  onOpenResume: () => void;
  onOpenContact: () => void;
}

const DEFAULT_PORTRAIT_PATH = '/assets/aistudio/business_att_996f29bd.png';
const PORTRAIT_STORAGE_KEY = 'portfolio_business_portrait_v1';

export const Hero: React.FC<HeroProps> = ({
  onExploreProjects,
  onExploreCreative,
  onOpenContact,
}) => {
  const [portraitUrl, setPortraitUrl] = useState<string>(DEFAULT_PORTRAIT_PATH);
  const [imgLoadFailed, setImgLoadFailed] = useState<boolean>(false);
  const [imgLoaded, setImgLoaded] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(PORTRAIT_STORAGE_KEY);
      if (saved) {
        setPortraitUrl(saved);
        setImgLoadFailed(false);
      } else {
        setPortraitUrl(DEFAULT_PORTRAIT_PATH);
      }
    } catch {
      setPortraitUrl(DEFAULT_PORTRAIT_PATH);
    }
  }, []);

  useEffect(() => {
    if (imgRef.current?.complete && imgRef.current.naturalWidth > 0) {
      setImgLoaded(true);
    }
  }, [portraitUrl]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      setImgLoaded(false);
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

  const handleResetPhoto = () => {
    try {
      localStorage.removeItem(PORTRAIT_STORAGE_KEY);
    } catch {
      // ignore
    }
    setImgLoaded(false);
    setPortraitUrl(DEFAULT_PORTRAIT_PATH);
    setImgLoadFailed(false);
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
    /* overflow-x-clip prevents mobile horizontal scrollbars without clipping vertical radial light into a box */
    <section className="relative pt-12 pb-12 lg:pt-12 lg:pb-12 border-b border-[#27272a] bg-[#0c0d0e] overflow-x-clip">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Unified poster composition: headline column + overlapping bottom-anchored portrait stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 items-end gap-8 lg:gap-0">
          {/* Left Column: Headline, Positioning & CTAs */}
          <div className="lg:col-span-6 relative pb-4 lg:pb-12">
            {/* Academic kicker — unboxed text with dot separator */}
            <div className="relative z-10 flex flex-wrap items-center gap-2 text-xs font-mono text-zinc-400 mb-6 tracking-wide">
              <span className="text-[#f59e0b] font-semibold">University of Santo Tomas</span>
              <span aria-hidden="true">·</span>
              <span>BS Information Technology</span>
              <span aria-hidden="true">·</span>
              <span>Manila, PH</span>
            </div>

            {/* Layered Headline: base text (z-10) slides subtly behind shoulder, amber highlight (z-30) stays unobstructed */}
            <h1 className="relative text-3xl sm:text-4xl lg:text-[3rem] font-extrabold uppercase tracking-[-0.03em] text-white leading-[1.05] mb-6 [text-wrap:balance]">
              <span className="relative z-10">BUILDING DIGITAL EXPERIENCES THROUGH </span>
              <span className="relative z-30 text-transparent bg-clip-text bg-gradient-to-r from-[#f59e0b] via-amber-200 to-amber-500">
                CODE, DESIGN,{' '}
              </span>
              <span className="relative z-10">AND STORYTELLING.</span>
            </h1>

            <p className="relative z-30 text-base sm:text-lg text-zinc-300 max-w-xl leading-relaxed mb-8">
              I am an IT student at the University of Santo Tomas exploring software development,
              data science, and artificial intelligence — backed by practical experience in
              photography, videography, and event-based creative production.
            </p>

            {/* Primary Calls to Action */}
            <div className="relative z-30 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={onExploreProjects}
                className="flex items-center gap-2 px-4 py-2.5 text-sm font-semibold rounded-lg bg-[#f59e0b] text-black hover:bg-[#d97706] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f59e0b] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0c0d0e] transition-colors whitespace-nowrap"
              >
                <Code2 className="w-4 h-4" />
                View My Projects
              </button>

              <button
                type="button"
                onClick={onExploreCreative}
                className="flex items-center gap-2 px-4 py-2.5 text-sm font-semibold rounded-lg bg-[#18191e] border border-[#27272a] text-zinc-200 hover:text-white hover:border-zinc-400 hover:bg-[#22242a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f59e0b] transition-colors whitespace-nowrap"
              >
                <Camera className="w-4 h-4 text-[#f59e0b]" />
                Explore Creative Work
              </button>

              <button
                type="button"
                onClick={onOpenContact}
                className="flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium text-zinc-300 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f59e0b] rounded-lg transition-colors whitespace-nowrap"
              >
                Contact Me
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Column: Frameless Portrait Stage overlapping headline at lg+ */}
          <div className="lg:col-span-6 relative z-20 lg:-ml-12 xl:-ml-20 flex flex-col items-center lg:items-start justify-end self-end">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
              aria-label="Upload business attire portrait photo"
            />

            {/* Stage container: no card border, no bg fill, no rounded frame, no clipping blur boxes */}
            <div className="group relative w-[85%] sm:w-[400px] lg:w-full flex flex-col items-center lg:items-start justify-end">
              {showImage ? (
                <>
                  {/* Elliptical radial amber light: fades naturally to transparent before reaching any edge (no blur filter, no box) */}
                  <div
                    className="absolute -inset-12 z-0 pointer-events-none"
                    style={{
                      background:
                        'radial-gradient(ellipse 55% 60% at 50% 40%, rgba(245,158,11,0.28), transparent 70%)',
                    }}
                    aria-hidden="true"
                  />

                  {/* Optional subtle radially masked dot grid behind subject */}
                  <div
                    className="absolute inset-0 bg-grid-pattern opacity-35 z-0 pointer-events-none"
                    style={{
                      maskImage: 'radial-gradient(circle at 50% 42%, black 20%, transparent 70%)',
                      WebkitMaskImage: 'radial-gradient(circle at 50% 42%, black 20%, transparent 70%)',
                    }}
                    aria-hidden="true"
                  />

                  {/* Single decorative amber ring centered behind the subject's head */}
                  <div
                    className="absolute top-[2%] left-1/2 -translate-x-1/2 w-[280px] h-[280px] lg:w-[420px] lg:h-[420px] rounded-full border border-[rgba(245,158,11,0.25)] z-0 pointer-events-none"
                    aria-hidden="true"
                  />

                  {/* Desktop two-line name label positioned at photo's top-right (never over body or face) */}
                  <div className="hidden lg:block absolute top-2 right-0 z-30 text-right font-mono text-[11px] leading-snug pointer-events-none">
                    <div className="text-zinc-100 font-medium">David Jed Gutierrez</div>
                    <div className="text-zinc-400">IT Candidate · UST</div>
                  </div>

                  {/* Keyboard-accessible Replace/Reset photo controls (hover/focus only) */}
                  <div className="absolute top-2 left-2 lg:top-12 lg:left-auto lg:right-0 z-30 flex items-center gap-2 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 focus-within:opacity-100 transition-opacity duration-200 motion-reduce:transition-none">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-lg bg-[#121316]/90 border border-[#27272a] text-zinc-100 hover:border-[#f59e0b] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f59e0b] transition-colors whitespace-nowrap"
                    >
                      <Upload className="w-3.5 h-3.5 text-[#f59e0b]" />
                      Replace Photo
                    </button>

                    {hasCustomStoredPhoto && (
                      <button
                        type="button"
                        onClick={handleResetPhoto}
                        aria-label="Reset portrait to default"
                        title="Reset portrait to default"
                        className="p-2 rounded-lg bg-[#121316]/90 border border-[#27272a] text-zinc-300 hover:text-white hover:border-zinc-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f59e0b] transition-colors"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>

                  {/* Bottom-anchored subject cutout (~105% of headline block on lg+) with bottom 12% fade into #0c0d0e */}
                  <div
                    className="relative z-10 w-full h-[380px] sm:h-[460px] lg:h-[520px] flex items-end justify-center overflow-visible"
                    style={{
                      maskImage: 'linear-gradient(to bottom, black 88%, transparent)',
                      WebkitMaskImage: 'linear-gradient(to bottom, black 88%, transparent)',
                    }}
                  >
                    <img
                      ref={imgRef}
                      src={portraitUrl}
                      alt="David Jed Gutierrez — Business Attire Portrait"
                      referrerPolicy="no-referrer"
                      onLoad={() => setImgLoaded(true)}
                      onError={() => setImgLoadFailed(true)}
                      style={{
                        filter: 'drop-shadow(0 0 24px rgba(245, 158, 11, 0.25))',
                      }}
                      className={`h-full w-auto max-w-full object-contain object-top lg:scale-[1.08] lg:origin-bottom select-none transition-opacity duration-300 motion-reduce:transition-none ${
                        imgLoaded ? 'opacity-100' : 'opacity-0'
                      }`}
                    />
                  </div>

                  {/* Mobile two-line label centered cleanly below the photo */}
                  <div className="mt-3 lg:hidden text-center font-mono text-[11px] leading-snug">
                    <div className="text-zinc-100 font-medium">David Jed Gutierrez</div>
                    <div className="text-zinc-400">IT Candidate · UST</div>
                  </div>
                </>
              ) : (
                /* Fallback upload placeholder card when image fails to load */
                <div className="w-full max-w-[360px] mx-auto aspect-[2/3] rounded-xl border border-[#27272a] bg-[#121316] flex flex-col items-center justify-center p-6 text-center space-y-4">
                  <div className="w-24 h-24 rounded-full bg-[#18191e] border border-[#27272a] flex items-center justify-center text-zinc-400">
                    <UserCheck className="w-10 h-10 text-[#f59e0b]/80" strokeWidth={1.5} />
                  </div>

                  <div className="space-y-1.5 max-w-[240px]">
                    <div className="text-sm font-semibold text-white">
                      Business Attire Photo
                    </div>
                    <p className="text-xs text-zinc-400 leading-relaxed">
                      Upload your formal portrait here for recruiters, or place it at{' '}
                      <code className="text-[11px] text-zinc-300 font-mono">public/assets/aistudio/business_att_996f29bd.png</code>.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg bg-[#f59e0b] text-black hover:bg-[#d97706] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f59e0b] transition-colors whitespace-nowrap"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    Upload Business Photo
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Highlight Metrics Strip: pulled up with lg:-mt-6 so the portrait's faded base rests on its top divider */}
        <div className="relative z-30 grid grid-cols-2 md:grid-cols-4 gap-6 mt-8 lg:-mt-6 pt-8 border-t border-[#27272a]/80">
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
