import React, { useState } from 'react';
import { Camera, Film, Eye, Sparkles, Sliders, Maximize2 } from 'lucide-react';
import { CREATIVE_WORKS, CreativeWorkItem } from '../data/portfolioData';

interface CreativeGalleryProps {
  onSelectItem: (item: CreativeWorkItem) => void;
}

export const CreativeGallery: React.FC<CreativeGalleryProps> = ({ onSelectItem }) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = ['All', 'Event & Organization', 'Cinematography', 'Travel & Street', 'Editorial & Portrait'];

  const filteredItems =
    activeCategory === 'All'
      ? CREATIVE_WORKS
      : CREATIVE_WORKS.filter((item) => item.category === activeCategory);

  return (
    <section id="creative" className="py-20 md:py-28 border-b border-[#27272a] bg-[#0c0d0e]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Subtle Marquee Divider Ribbon */}
        <div className="mb-14 overflow-hidden border-y border-[#27272a] py-3 text-xs font-mono uppercase tracking-widest text-zinc-400 select-none">
          <div className="flex whitespace-nowrap animate-marquee gap-8">
            <span>Visual Storytelling</span>
            <span aria-hidden="true">·</span>
            <span>Documentary Photography</span>
            <span aria-hidden="true">·</span>
            <span>Cinematography &amp; Color Grading</span>
            <span aria-hidden="true">·</span>
            <span>Event Coverage</span>
            <span aria-hidden="true">·</span>
            <span>Human-Centered Framing</span>
            <span aria-hidden="true">·</span>
            <span>Visual Storytelling</span>
            <span aria-hidden="true">·</span>
            <span>Documentary Photography</span>
            <span aria-hidden="true">·</span>
            <span>Cinematography &amp; Color Grading</span>
          </div>
        </div>

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="text-xs uppercase font-mono tracking-wider text-[#f59e0b] font-semibold mb-2">
              The Creative Direction
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              PHOTOGRAPHY, CINEMATOGRAPHY &amp; MEDIA
            </h2>
            <p className="text-sm sm:text-base text-zinc-300 mt-2 max-w-xl">
              Capturing human emotion, architectural geometry, and high-energy university events.
              How visual composition directly enriches software UI, UX, and technical documentation.
            </p>
          </div>

          {/* Interactive filter tabs */}
          <div className="flex items-center gap-1 p-1 bg-[#141519] border border-[#27272a] rounded-xl self-start md:self-auto overflow-x-auto max-w-full">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                  activeCategory === cat
                    ? 'bg-[#27272a] text-white shadow-sm'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Bento / Masonry Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, idx) => {
            const isWide = item.aspectRatio === '16:9' && (idx % 3 === 0);
            return (
              <div
                key={item.id}
                onClick={() => onSelectItem(item)}
                className={`group cursor-pointer relative bg-[#121316] border border-[#27272a] rounded-2xl overflow-hidden hover:border-zinc-400 transition-all duration-200 flex flex-col justify-between ${
                  isWide ? 'md:col-span-2' : ''
                }`}
              >
                {/* Visual Media Showcase Frame */}
                <div
                  className={`relative w-full bg-[#18191e] overflow-hidden flex flex-col justify-between p-6 ${
                    item.aspectRatio === '16:9' ? 'aspect-video' : 'aspect-[4/3]'
                  }`}
                  style={{
                    background: `linear-gradient(135deg, #141519 0%, #1a1c23 100%)`,
                  }}
                >
                  {/* Subtle color flare from item's palette */}
                  <div
                    className="absolute -top-12 -right-12 w-48 h-48 rounded-full blur-3xl opacity-20 pointer-events-none group-hover:opacity-40 transition-opacity"
                    style={{ backgroundColor: item.palette[0] }}
                  />

                  {/* Top indicators */}
                  <div className="flex items-center justify-between z-10 text-xs font-mono text-zinc-400">
                    <span className="flex items-center gap-1.5">
                      {item.category === 'Cinematography' ? (
                        <Film className="w-3.5 h-3.5 text-[#f59e0b]" />
                      ) : (
                        <Camera className="w-3.5 h-3.5 text-[#f59e0b]" />
                      )}
                      {item.category}
                    </span>
                    <span className="tabular-nums">{item.year}</span>
                  </div>

                  {/* Visual Composition Center Graphic */}
                  <div className="my-auto text-center z-10 py-6">
                    <div className="inline-flex p-3 rounded-full bg-black/40 border border-white/10 text-zinc-300 group-hover:text-[#f59e0b] group-hover:scale-110 transition-all mb-3">
                      <Maximize2 className="w-5 h-5" />
                    </div>
                    <div className="text-sm font-semibold text-zinc-200 tracking-wide">
                      {item.title}
                    </div>
                    <div className="text-[11px] font-mono text-zinc-400 mt-1">
                      {item.role}
                    </div>
                  </div>

                  {/* Bottom Technical Camera Strip */}
                  <div className="z-10 pt-2 border-t border-white/[0.08] flex items-center justify-between text-[11px] font-mono text-zinc-400">
                    <span className="truncate max-w-[70%]">{item.exif.camera}</span>
                    <span className="text-[#f59e0b] font-medium">{item.exif.settings}</span>
                  </div>
                </div>

                {/* Card Lower Narrative */}
                <div className="p-5 bg-[#121316] space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-bold text-white group-hover:text-[#f59e0b] transition-colors">
                      {item.title}
                    </h3>
                    <span className="text-xs font-mono text-[#f59e0b] flex items-center gap-1">
                      Inspect <Eye className="w-3 h-3" />
                    </span>
                  </div>

                  <p className="text-xs text-zinc-300 line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>

                  <div className="pt-2 flex flex-wrap gap-1 text-[11px] font-mono text-zinc-400">
                    {item.tools.map((t, tIdx) => (
                      <span key={tIdx} className="text-zinc-400">
                        {t}{tIdx < item.tools.length - 1 ? ' ·' : ''}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
