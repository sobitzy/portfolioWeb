import React from 'react';
import {
  GraduationCap,
  Code2,
  Cpu,
  Brain,
  Palette,
  CheckCircle2,
  Calendar,
  ExternalLink,
  BookOpen,
  Sparkles
} from 'lucide-react';
import { TECHNICAL_SKILLS, LEARNING_TIMELINE } from '../data/portfolioData';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-20 md:py-28 border-b border-[#27272a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-14">
          <div className="text-xs uppercase font-mono tracking-wider text-[#f59e0b] font-semibold mb-2">
            Background &amp; Philosophy
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            ABOUT ME &amp; THE DUAL-LENS ADVANTAGE
          </h2>
          <p className="text-sm sm:text-base text-zinc-300 mt-2 max-w-2xl leading-relaxed">
            Where analytical software development meets the observational discipline of visual storytelling.
          </p>
        </div>

        {/* Narrative & Dual-Lens Philosophy Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
          <div className="lg:col-span-7 space-y-5 text-sm sm:text-base text-zinc-300 leading-relaxed">
            <p>
              I am an Information Technology student at the{' '}
              <strong className="text-white font-semibold">University of Santo Tomas (UST)</strong> in
              Manila, cultivating strong foundations in object-oriented programming, data systems, and
              modern web development.
            </p>
            <p>
              Before writing code, I worked behind camera viewfinders, audio monitors, and timeline editors
              documenting live events and directing university summit media. That creative discipline taught me
              that software engineering is never purely about algorithms — it is fundamentally about how humans
              perceive, navigate, and experience digital systems.
            </p>
            <p>
              My goal is to secure IT opportunities — internships, entry-level engineering roles, technical
              collaborations, and student organization projects — where I can contribute solid code, dependable
              execution, and a refined sense for user experience.
            </p>

            {/* Quote block */}
            <div className="p-5 rounded-xl bg-[#141519] border-l-2 border-[#f59e0b] text-zinc-200 text-sm italic font-serif">
              &ldquo;Building digital experiences through code, design, and visual storytelling.&rdquo;
            </div>
          </div>

          {/* Right card: The Creative Edge in IT */}
          <div className="lg:col-span-5 p-6 rounded-2xl bg-[#121316] border border-[#27272a] space-y-4">
            <div className="text-xs uppercase tracking-wider font-semibold text-[#f59e0b] flex items-center gap-1.5 font-mono">
              <Sparkles className="w-3.5 h-3.5" />
              Why Creative Experience Empowers My Code
            </div>

            <div className="space-y-3 text-xs sm:text-sm text-zinc-300">
              <div className="flex items-start gap-2.5">
                <span className="text-[#f59e0b] font-bold mt-0.5">·</span>
                <div>
                  <strong className="text-white">Intuitive Information Architecture:</strong> Directing
                  photo/video narratives builds an instinctive feel for visual hierarchy, typography scale,
                  and eliminating cognitive clutter in UI.
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <span className="text-[#f59e0b] font-bold mt-0.5">·</span>
                <div>
                  <strong className="text-white">Precision Documentation &amp; Communication:</strong> Event
                  coverage demands quick collaboration with diverse stakeholders, translating technical briefs
                  into clear, tangible outcomes.
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <span className="text-[#f59e0b] font-bold mt-0.5">·</span>
                <div>
                  <strong className="text-white">Attention to Edge Cases &amp; Pacing:</strong> Post-production
                  color grading and frame-by-frame cuts mirror the meticulous debugging required for clean code.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Education & Learning Spotlight (including Matsuo Labs GCI) */}
        <div id="learning" className="pt-8 border-t border-[#27272a]">
          <div className="mb-8">
            <div className="text-xs uppercase font-mono tracking-wider text-[#f59e0b] font-semibold mb-1">
              Active Curriculum
            </div>
            <h3 className="text-2xl font-bold text-white tracking-tight">
              EDUCATION &amp; SPECIALIZED COURSEWORK
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {LEARNING_TIMELINE.map((item, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-[#121316] border border-[#27272a] flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-xs font-mono text-zinc-400 mb-3">
                    <span className="text-[#f59e0b] font-semibold">{item.year}</span>
                    <GraduationCap className="w-4 h-4 text-zinc-400" />
                  </div>
                  <h4 className="text-base font-bold text-white mb-1">{item.title}</h4>
                  <div className="text-xs font-medium text-zinc-300 mb-3">{item.institution}</div>
                  <p className="text-xs text-zinc-400 leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Detailed Technical Skills Matrix */}
          <div>
            <div className="mb-6">
              <div className="text-xs uppercase font-mono tracking-wider text-[#f59e0b] font-semibold mb-1">
                Capability Matrix
              </div>
              <h3 className="text-2xl font-bold text-white tracking-tight">
                TECHNICAL &amp; CREATIVE TOOLBOX
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {TECHNICAL_SKILLS.map((grp, gIdx) => (
                <div
                  key={gIdx}
                  className="p-6 rounded-2xl bg-[#121316] border border-[#27272a] space-y-4"
                >
                  <h4 className="text-sm font-mono uppercase tracking-wider font-semibold text-white flex items-center gap-2">
                    {gIdx === 0 && <Code2 className="w-4 h-4 text-[#f59e0b]" />}
                    {gIdx === 1 && <Brain className="w-4 h-4 text-[#f59e0b]" />}
                    {gIdx === 2 && <Cpu className="w-4 h-4 text-[#f59e0b]" />}
                    {gIdx === 3 && <Palette className="w-4 h-4 text-[#f59e0b]" />}
                    {grp.category}
                  </h4>

                  <div className="space-y-3">
                    {grp.skills.map((skill, sIdx) => (
                      <div
                        key={sIdx}
                        className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 pb-2 border-b border-[#27272a]/60 text-xs"
                      >
                        <span className="font-semibold text-zinc-200">{skill.name}</span>
                        <span className="text-zinc-400 font-mono text-[11px]">{skill.level}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
