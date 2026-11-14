import React from 'react';
import { X, Camera, Film, Award, Sliders, Calendar, Users, Eye, Sparkles } from 'lucide-react';
import { CreativeWorkItem } from '../data/portfolioData';

interface LightboxModalProps {
  item: CreativeWorkItem | null;
  onClose: () => void;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({ item, onClose }) => {
  if (!item) return null;

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-black/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6"
      onClick={onClose}
    >
      <div
        className="relative bg-[#101114] border border-[#27272a] rounded-2xl w-full max-w-4xl max-h-[92vh] overflow-y-auto shadow-2xl text-zinc-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 z-20 flex items-center justify-between px-6 py-4 bg-[#101114]/95 backdrop-blur-md border-b border-[#27272a]">
          <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
            <span>{item.category}</span>
            <span aria-hidden="true">·</span>
            <span>{item.year}</span>
            {item.awardOrRecognition && (
              <>
                <span aria-hidden="true">·</span>
                <span className="text-[#f59e0b] font-semibold flex items-center gap-1">
                  <Award className="w-3.5 h-3.5" />
                  {item.awardOrRecognition}
                </span>
              </>
            )}
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-[#27272a] transition-colors"
            aria-label="Close lightbox"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Media Visual Area */}
        <div className="p-6 sm:p-8 space-y-6">
          <div className="relative rounded-xl overflow-hidden border border-[#27272a] bg-gradient-to-br from-[#18191e] via-[#101114] to-[#0c0d0e] aspect-video flex flex-col items-center justify-center text-center p-8">
            {/* Visual background treatment */}
            <div
              className="absolute inset-0 opacity-20 pointer-events-none"
              style={{
                backgroundImage: `radial-gradient(circle at 50% 50%, ${item.palette[0]} 0%, transparent 60%)`,
              }}
            />

            <div className="relative z-10 flex flex-col items-center max-w-lg space-y-4">
              <div className="p-4 rounded-full bg-[#18191e]/80 border border-[#27272a] text-[#f59e0b] shadow-xl">
                {item.category === 'Cinematography' ? (
                  <Film className="w-8 h-8" />
                ) : (
                  <Camera className="w-8 h-8" />
                )}
              </div>
              <div>
                <h4 className="text-xl font-bold text-white mb-1">{item.title}</h4>
                <p className="text-xs font-mono text-zinc-400">
                  {item.role} {item.collaborators ? `— with ${item.collaborators}` : ''}
                </p>
              </div>

              {/* Technical EXIF pill (unboxed) */}
              <div className="flex flex-wrap justify-center gap-3 text-xs font-mono text-zinc-400 pt-2 border-t border-[#27272a]/60">
                <span>{item.exif.camera}</span>
                <span aria-hidden="true">·</span>
                <span>{item.exif.lens}</span>
                <span aria-hidden="true">·</span>
                <span className="text-[#f59e0b]">{item.exif.settings}</span>
              </div>
            </div>
          </div>

          {/* Description & Narrative */}
          <div className="space-y-4">
            <h3 className="text-xs uppercase tracking-wider font-semibold text-zinc-400">
              The Story Behind the Frame
            </h3>
            <p className="text-sm text-zinc-300 leading-relaxed">
              {item.description}
            </p>
          </div>

          {/* Metadata Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-[#27272a]">
            <div className="p-4 rounded-xl bg-[#141519] border border-[#27272a]">
              <div className="text-[11px] uppercase tracking-wider text-zinc-400 font-semibold mb-1 flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-[#f59e0b]" />
                Role &amp; Credits
              </div>
              <div className="text-xs text-zinc-200 font-medium">{item.role}</div>
              {item.collaborators && (
                <div className="text-[11px] text-zinc-400 mt-0.5">{item.collaborators}</div>
              )}
            </div>

            <div className="p-4 rounded-xl bg-[#141519] border border-[#27272a]">
              <div className="text-[11px] uppercase tracking-wider text-zinc-400 font-semibold mb-1 flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5 text-[#f59e0b]" />
                Post-Production Tools
              </div>
              <div className="flex flex-wrap gap-1 text-xs text-zinc-300">
                {item.tools.map((t, idx) => (
                  <span key={idx} className="font-mono text-[11px]">
                    {t}{idx < item.tools.length - 1 ? ' · ' : ''}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#141519] border border-[#27272a]">
              <div className="text-[11px] uppercase tracking-wider text-zinc-400 font-semibold mb-1 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#f59e0b]" />
                Production Year
              </div>
              <div className="text-xs text-zinc-200 font-mono">{item.year}</div>
              <div className="text-[11px] text-zinc-400 mt-0.5">Event &amp; Studio Media</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
