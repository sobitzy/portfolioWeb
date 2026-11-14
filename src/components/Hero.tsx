import React, { useState, useRef, useEffect } from 'react';
import { Code2, Camera, ChevronRight, Upload, RotateCcw, UserCheck } from 'lucide-react';

interface HeroProps {
  onExploreProjects: () => void;
  onExploreCreative: () => void;
  onOpenResume: () => void;
  onOpenContact: () => void;
}

const PORTRAIT_STORAGE_KEY = 'portfolio_business_portrait_v1';

export const Hero: React.FC<HeroProps> = ({
  onExploreProjects,
  onExploreCreative,
  onOpenContact,
}) => {
  const [portraitUrl, setPortraitUrl] = useState<string | null>(null);
  const [imgLoadFailed, setImgLoadFailed] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(PORTRAIT_STORAGE_KEY);
      if (saved) {
        setPortraitUrl(saved);
        setImgLoadFailed(false);
      } else {
        // Check if user placed a static file at /business-portrait.jpg
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
    <section className="relative pt-12 pb-20 md:pt-16 md:pb-24 border-b border-[#27272a] overflow-hidden">
      {/* Subtle ambient depth */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-[#f59e0b]/[0.06] via-transparent to-transparent pointer-events-none blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Split-Screen Hero Row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Positioning & Calls to Action */}
          <div className="lg:col-span-7">
            {/* Academic kicker - clean unboxed text */}
            <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-zinc-400 mb-6 tracking-wide">
              <span className="text-[#f59e0b] font-semibold">University of Santo Tomas</span>
              <span aria-hidden="true">·</span>
              <span>BS Information Technology</span>
              <span aria-hidden="true">·</span>
              <span>Manila, PH</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-[3.25rem] font-extrabold tracking-tight text-white leading-[1.08] mb-6 [text-wrap:balance]">
              BUILDING DIGITAL EXPERIENCES THROUGH{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#f59e0b] via-amber-200 to-amber-500">
                CODE, DESIGN,
              </span>{' '}
              AND STORYTELLING.
            </h1>

            <p className="text-base sm:text-lg text-zinc-300 max-w-2xl leading-relaxed mb-8">
              I am an IT student at the University of Santo Tomas exploring software development,
              data science, and artificial intelligence — backed by practical experience in
              photography, videography, and event-based creative production.
            </p>

            {/* Action CTAs */}
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={onExploreProjects}
                className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-lg bg-[#f59e0b] text-black hover:bg-[#d97706] transition-all transform active:scale-95 shadow-lg shadow-[#f59e0b]/10 whitespace-nowrap"
              >
                <Code2 className="w-4 h-4" />
                View My Projects
              </button>

              <button
                onClick={onExploreCreative}
                className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-lg bg-[#18191e] border border-[#27272a] text-zinc-200 hover:text-white hover:border-zinc-400 hover:bg-[#22242a] transition-all whitespace-nowrap"
              >
                <Camera className="w-4 h-4 text-[#f59e0b]" />
                Explore Creative Work
              </button>

              <button
                onClick={onOpenContact}
                className="flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium text-zinc-400 hover:text-white transition-colors whitespace-nowrap"
              >
                Contact Me
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Column: Business Attire Portrait Frame */}
          <div className="lg:col-span-5 flex flex-col items-center lg:items-end">
            <div className="w-full max-w-[360px]">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
                aria-label="Upload business attire portrait photo"
              />

              <div className="group relative aspect-[3/4] w-full rounded-xl overflow-hidden bg-[#121316] border border-[#27272a] shadow-2xl">
                {showImage ? (
                  <>
                    <img
                      src={portraitUrl!}
                      alt="DJ Gutierrez — Business Attire Portrait"
                      referrerPolicy="no-referrer"
                      onError={() => setImgLoadFailed(true)}
                      className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-[1.02]"
                    />
                    {/* Subtle bottom scrim for legibility of hover controls */}
                    <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/80 via-black/30 to-transparent pointer-events-none" />

                    {/* Photo management controls on hover / focus */}
                    <div className="absolute bottom-3 inset-x-3 flex items-center justify-between gap-2 opacity-90 sm:opacity-0 sm:group-hover:opacity-100 focus-within:opacity-100 transition-opacity duration-200">
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md bg-[#121316]/90 backdrop-blur-md border border-[#3f3f46] text-zinc-100 hover:border-[#f59e0b] hover:text-white transition-colors whitespace-nowrap"
                      >
                        <Upload className="w-3.5 h-3.5 text-[#f59e0b]" />
                        Replace Photo
                      </button>

                      {hasCustomStoredPhoto && (
                        <button
                          type="button"
                          onClick={handleResetPhoto}
                          title="Reset Portrait Slot"
                          className="p-1.5 rounded-md bg-[#121316]/90 backdrop-blur-md border border-[#3f3f46] text-zinc-300 hover:text-white hover:border-zinc-400 transition-colors"
                        >
                          <RotateCcw className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </>
                ) : (
                  /* Styled Portrait Slot Ready for Business Attire Photo */
                  <div className="w-full h-full flex flex-col items-center justify-between p-6 text-center bg-gradient-to-b from-[#16181d] via-[#121316] to-[#0e0f12]">
                    <div className="w-full flex items-center justify-between text-[11px] font-mono text-zinc-400">
                      <span>Portrait Frame</span>
                      <span className="text-[#f59e0b]">3:4 Aspect</span>
                    </div>

                    <div className="flex flex-col items-center space-y-4 my-auto">
                      {/* Minimalist architectural silhouette avatar */}
                      <div className="w-24 h-24 rounded-full bg-[#18191e] border border-[#27272a] flex items-center justify-center text-zinc-400">
                        <UserCheck className="w-10 h-10 text-[#f59e0b]/80" strokeWidth={1.5} />
                      </div>

                      <div className="space-y-1.5 max-w-[230px]">
                        <div className="text-sm font-semibold text-white">
                          Business Attire Photo
                        </div>
                        <p className="text-xs text-zinc-400 leading-relaxed">
                          Upload your formal portrait here for recruiters and organizations, or save it as{' '}
                          <code className="text-[11px] text-zinc-300 font-mono">public/business-portrait.jpg</code>.
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-md bg-[#f59e0b] text-black hover:bg-[#d97706] transition-colors whitespace-nowrap"
                      >
                        <Upload className="w-3.5 h-3.5" />
                        Upload Business Photo
                      </button>
                    </div>

                    <div className="w-full pt-3 border-t border-[#27272a]/70 text-[11px] font-mono text-zinc-400">
                      Saved locally in browser preview
                    </div>
                  </div>
                )}
              </div>

              {/* Clean unboxed portrait caption */}
              <div className="mt-3 flex items-center justify-between text-xs font-mono text-zinc-400">
                <span className="text-zinc-200 font-medium">DJ Gutierrez</span>
                <span>IT Candidate · UST</span>
              </div>
            </div>
          </div>
        </div>

        {/* Highlight Metrics Strip (Tabular, clean unboxed layout) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-14 pt-8 border-t border-[#27272a]/80">
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
