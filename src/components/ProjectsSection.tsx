import React, { useState } from 'react';
import { ExternalLink, Terminal, ArrowUpRight, Github, Code2, Sparkles, Layers } from 'lucide-react';
import { PORTFOLIO_PROJECTS, ProjectCaseStudy } from '../data/portfolioData';

interface ProjectsSectionProps {
  onSelectProject: (project: ProjectCaseStudy) => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ onSelectProject }) => {
  const [activeFilter, setActiveFilter] = useState<string>('All');

  const categories = ['All', 'Software & Java', 'Web & UI', 'Data Science & AI'];

  const filteredProjects =
    activeFilter === 'All'
      ? PORTFOLIO_PROJECTS
      : PORTFOLIO_PROJECTS.filter((p) => p.type === activeFilter);

  return (
    <section id="projects" className="py-20 md:py-28 border-b border-[#27272a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="text-xs uppercase font-mono tracking-wider text-[#f59e0b] font-semibold mb-2">
              Selected Technical Work
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              ENGINEERING &amp; WEB PROJECTS
            </h2>
            <p className="text-sm sm:text-base text-zinc-300 mt-2 max-w-xl">
              Object-oriented software systems, published responsive web experiences, and
              exploratory data science research.
            </p>
          </div>

          {/* Interactive filter tabs (segmented control as permitted in rule 1.A) */}
          <div className="flex items-center gap-1 p-1 bg-[#141519] border border-[#27272a] rounded-xl self-start md:self-auto overflow-x-auto max-w-full">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                  activeFilter === cat
                    ? 'bg-[#27272a] text-white shadow-sm'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredProjects.map((project, idx) => (
            <div
              key={project.id}
              className="group relative bg-[#121316] border border-[#27272a] rounded-2xl p-6 sm:p-7 hover:border-zinc-400 transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                {/* Header: Editorial index + Clean unboxed metadata (zero pill rule) */}
                <div className="flex items-center justify-between text-xs text-zinc-400 font-mono mb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-[#f59e0b] font-bold">
                      0{PORTFOLIO_PROJECTS.findIndex((p) => p.id === project.id) + 1}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>{project.category}</span>
                  </div>

                  <span
                    className={`font-medium ${
                      project.status === 'Published'
                        ? 'text-emerald-400'
                        : project.status === 'In Progress'
                        ? 'text-[#f59e0b]'
                        : 'text-amber-300'
                    }`}
                  >
                    {project.status}
                  </span>
                </div>

                {/* Project Title */}
                <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-[#f59e0b] transition-colors mb-3">
                  {project.title}
                </h3>

                {/* Subtitle / Description */}
                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed mb-6">
                  {project.subtitle}
                </p>

                {/* Key feature bullets */}
                <div className="space-y-1.5 mb-6 text-xs text-zinc-300">
                  {project.features.slice(0, 3).map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-start gap-2">
                      <span className="text-[#f59e0b] font-bold">·</span>
                      <span className="line-clamp-1">{feat}</span>
                    </div>
                  ))}
                </div>

                {/* Tech stack items (clean typography) */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {project.tools.slice(0, 4).map((tool, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-2 py-0.5 text-[11px] font-mono rounded bg-[#18191e] border border-[#27272a] text-zinc-300"
                    >
                      {tool}
                    </span>
                  ))}
                  {project.tools.length > 4 && (
                    <span className="px-1.5 py-0.5 text-[11px] font-mono text-zinc-400">
                      +{project.tools.length - 4} more
                    </span>
                  )}
                </div>
              </div>

              {/* Action Bar */}
              <div className="pt-4 border-t border-[#27272a] flex items-center justify-between text-xs">
                <button
                  onClick={() => onSelectProject(project)}
                  className="flex items-center gap-1.5 font-semibold text-white group-hover:text-[#f59e0b] transition-colors"
                >
                  {project.demoType === 'java-cli' ? (
                    <>
                      <Terminal className="w-4 h-4 text-[#f59e0b]" />
                      Open Case Study &amp; CLI Simulator
                    </>
                  ) : project.demoType === 'framer-embed' ? (
                    <>
                      <Layers className="w-4 h-4 text-[#f59e0b]" />
                      View Case Study &amp; Live Site
                    </>
                  ) : (
                    <>
                      <Code2 className="w-4 h-4 text-[#f59e0b]" />
                      Read Detailed Case Study
                    </>
                  )}
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>

                <div className="flex items-center gap-2">
                  {project.repoUrl && (
                    <a
                      href={project.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 text-zinc-400 hover:text-white transition-colors"
                      title="GitHub Repository"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                  )}
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 text-zinc-400 hover:text-[#f59e0b] transition-colors"
                      title="Open Live Website"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
