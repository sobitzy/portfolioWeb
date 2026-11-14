import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  ExternalLink,
  Github,
  CheckCircle2,
  Terminal,
  BookOpen,
  Layers,
  ArrowRight,
  Code2,
  Smartphone,
  Monitor,
  Plus,
  Image as ImageIcon,
  Trash2,
  Upload
} from 'lucide-react';
import { ProjectCaseStudy, DocumentationArtifact } from '../data/portfolioData';
import { JavaCliSimulator } from './JavaCliSimulator';

interface ProjectCaseStudyModalProps {
  project: ProjectCaseStudy | null;
  onClose: () => void;
}

const PROJECT_DOCS_STORAGE_PREFIX = 'portfolio_project_artifacts_';

export const ProjectCaseStudyModal: React.FC<ProjectCaseStudyModalProps> = ({ project, onClose }) => {
  const [framerViewMode, setFramerViewMode] = useState<'desktop' | 'mobile'>('desktop');
  const [artifacts, setArtifacts] = useState<DocumentationArtifact[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [docTitle, setDocTitle] = useState('');
  const [docCaption, setDocCaption] = useState('');
  const [docImage, setDocImage] = useState<string | undefined>(undefined);
  const artifactFileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!project) return;
    setShowAddForm(false);
    setDocTitle('');
    setDocCaption('');
    setDocImage(undefined);

    try {
      const saved = localStorage.getItem(`${PROJECT_DOCS_STORAGE_PREFIX}${project.id}`);
      if (saved) {
        setArtifacts(JSON.parse(saved));
      } else {
        setArtifacts(project.documentation ?? []);
      }
    } catch {
      setArtifacts(project.documentation ?? []);
    }
  }, [project]);

  if (!project) return null;

  const saveArtifacts = (next: DocumentationArtifact[]) => {
    setArtifacts(next);
    try {
      localStorage.setItem(`${PROJECT_DOCS_STORAGE_PREFIX}${project.id}`, JSON.stringify(next));
    } catch {
      // ignore storage errors
    }
  };

  const handleArtifactImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setDocImage(reader.result as string);
    reader.readAsDataURL(file);
  };

  const handleAddArtifact = (e: React.FormEvent) => {
    e.preventDefault();
    if (!docTitle.trim() && !docCaption.trim()) return;
    const entry: DocumentationArtifact = {
      id: `artifact-${Date.now()}`,
      title: docTitle.trim() || 'Project Documentation',
      caption: docCaption.trim() || 'Uploaded process screenshot or note.',
      date: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
      imageUrl: docImage,
    };
    saveArtifacts([entry, ...artifacts]);
    setDocTitle('');
    setDocCaption('');
    setDocImage(undefined);
    setShowAddForm(false);
  };

  const handleRemoveArtifact = (id: string) => {
    saveArtifacts(artifacts.filter((a) => a.id !== id));
  };

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6"
      onClick={onClose}
    >
      <div
        className="relative bg-[#101114] border border-[#27272a] rounded-2xl w-full max-w-4xl max-h-[92vh] overflow-y-auto shadow-2xl text-zinc-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="sticky top-0 z-20 flex items-center justify-between px-6 py-4 bg-[#101114]/95 backdrop-blur-md border-b border-[#27272a]">
          <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
            <span>{project.category}</span>
            <span aria-hidden="true">·</span>
            <span
              className={`font-semibold ${
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

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-[#27272a] transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-8">
          {/* Title & Subtitle */}
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-3">
              {project.title}
            </h2>
            <p className="text-base text-zinc-300 leading-relaxed max-w-3xl">
              {project.subtitle}
            </p>
          </div>

          {/* Quick Metrics & Links Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl bg-[#16171c] border border-[#27272a]">
            <div className="flex flex-wrap items-center gap-6">
              {project.metrics?.map((m, idx) => (
                <div key={idx}>
                  <div className="text-[11px] uppercase tracking-wider text-zinc-400 font-medium">
                    {m.label}
                  </div>
                  <div className="text-xs sm:text-sm font-semibold text-zinc-100 font-mono">
                    {m.value}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-3">
              {project.repoUrl && (
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-[#27272a] text-zinc-200 hover:bg-[#3f3f46] hover:text-white transition-colors"
                >
                  <Github className="w-3.5 h-3.5" />
                  GitHub Repository
                </a>
              )}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-[#f59e0b] text-black hover:bg-[#d97706] transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  Visit Live Site
                </a>
              )}
            </div>
          </div>

          {/* Interactive Feature Demo / Preview Showcase */}
          {project.demoType === 'java-cli' && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase tracking-wider text-zinc-400 font-semibold flex items-center gap-1.5">
                  <Terminal className="w-4 h-4 text-[#f59e0b]" />
                  Live In-Browser Java Execution Simulator
                </span>
                <span className="text-[11px] text-zinc-400">
                  Emulates Scanner input &amp; OOP state mutations
                </span>
              </div>
              <JavaCliSimulator />
            </div>
          )}

          {project.demoType === 'framer-embed' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase tracking-wider text-zinc-400 font-semibold flex items-center gap-1.5">
                  <Layers className="w-4 h-4 text-[#f59e0b]" />
                  Live Published Framer Production Interface
                </span>
                <div className="flex items-center gap-1 bg-[#16171c] p-1 rounded-lg border border-[#27272a]">
                  <button
                    onClick={() => setFramerViewMode('desktop')}
                    className={`flex items-center gap-1 px-2.5 py-1 text-xs rounded transition-colors ${
                      framerViewMode === 'desktop' ? 'bg-[#27272a] text-white font-medium' : 'text-zinc-400'
                    }`}
                  >
                    <Monitor className="w-3 h-3" /> Desktop
                  </button>
                  <button
                    onClick={() => setFramerViewMode('mobile')}
                    className={`flex items-center gap-1 px-2.5 py-1 text-xs rounded transition-colors ${
                      framerViewMode === 'mobile' ? 'bg-[#27272a] text-white font-medium' : 'text-zinc-400'
                    }`}
                  >
                    <Smartphone className="w-3 h-3" /> Mobile
                  </button>
                </div>
              </div>

              {/* Framer Frame Container */}
              <div className="bg-[#16171c] border border-[#27272a] rounded-xl overflow-hidden shadow-xl">
                <div className="flex items-center justify-between px-4 py-2.5 bg-[#121316] border-b border-[#27272a] text-xs font-mono text-zinc-400">
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    https://tedxsisc.framer.website/
                  </span>
                  <a
                    href="https://tedxsisc.framer.website/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#f59e0b] flex items-center gap-1 transition-colors"
                  >
                    Open Tab <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

                <div className="p-4 flex justify-center bg-[#0a0a0c]">
                  <div
                    className={`transition-all duration-300 w-full overflow-hidden border border-[#27272a] rounded-lg shadow-inner ${
                      framerViewMode === 'mobile' ? 'max-w-[360px] h-[520px]' : 'w-full h-[460px]'
                    }`}
                  >
                    <iframe
                      src="https://tedxsisc.framer.website/"
                      title="TEDxSISC Youth Live Site"
                      className="w-full h-full bg-[#111]"
                      sandbox="allow-scripts allow-same-origin allow-popups"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Goal & User Role */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 rounded-xl bg-[#16171c] border border-[#27272a] space-y-2">
              <div className="text-xs uppercase tracking-wider font-semibold text-[#f59e0b] flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5" />
                Problem Statement &amp; Goal
              </div>
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                {project.goal}
              </p>
            </div>

            <div className="p-5 rounded-xl bg-[#16171c] border border-[#27272a] space-y-2">
              <div className="text-xs uppercase tracking-wider font-semibold text-[#f59e0b] flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5" />
                My Direct Role &amp; Contribution
              </div>
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                {project.userRole}
              </p>
            </div>
          </div>

          {/* Tools & Technologies */}
          <div className="space-y-3">
            <h3 className="text-xs uppercase tracking-wider font-semibold text-zinc-400">
              Tools &amp; Technologies Applied
            </h3>
            <div className="flex flex-wrap gap-2 text-xs text-zinc-300">
              {project.tools.map((t, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-md bg-[#18191e] border border-[#27272a] font-mono"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Main Features */}
          <div className="space-y-3">
            <h3 className="text-xs uppercase tracking-wider font-semibold text-zinc-400">
              Core Implemented Features
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {project.features.map((feat, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2.5 p-3 rounded-lg bg-[#141519] border border-[#27272a]/60 text-xs sm:text-sm text-zinc-300"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Code Snippet if present */}
          {project.codeSnippet && project.demoType !== 'java-cli' && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
                <span className="flex items-center gap-1.5">
                  <Code2 className="w-3.5 h-3.5 text-[#f59e0b]" />
                  {project.codeSnippet.filename}
                </span>
                <span className="uppercase">{project.codeSnippet.language}</span>
              </div>
              <div className="p-4 rounded-xl bg-[#0c0d0e] border border-[#27272a] font-mono text-xs text-zinc-300 overflow-x-auto">
                <pre>{project.codeSnippet.code}</pre>
              </div>
            </div>
          )}

          {/* Planned Improvements (Honest Engineering Roadmap) */}
          {project.plannedImprovements && project.plannedImprovements.length > 0 && (
            <div className="p-5 rounded-xl bg-[#141519] border border-[#27272a] space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-xs uppercase tracking-wider font-semibold text-[#f59e0b]">
                  Planned Engineering Improvements &amp; Roadmap
                </h3>
                <span className="text-[11px] font-mono text-zinc-400">
                  Next iterations
                </span>
              </div>
              <ul className="space-y-2 text-xs sm:text-sm text-zinc-300">
                {project.plannedImprovements.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <ArrowRight className="w-3.5 h-3.5 text-zinc-400 shrink-0 mt-1" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Project Documentation & Visual Artifacts */}
          <div className="space-y-4 pt-4 border-t border-[#27272a]">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h3 className="text-xs uppercase tracking-wider font-semibold text-[#f59e0b]">
                  Project Documentation &amp; Screenshots
                </h3>
                <p className="text-xs text-zinc-400 mt-0.5">
                  Attach build screenshots, architecture diagrams, or testing logs for this project.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowAddForm(!showAddForm)}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-[#18191e] border border-[#27272a] text-zinc-200 hover:border-[#f59e0b] hover:text-white transition-colors shrink-0"
              >
                <Plus className="w-3.5 h-3.5 text-[#f59e0b]" />
                {showAddForm ? 'Cancel' : 'Add Documentation'}
              </button>
            </div>

            {showAddForm && (
              <form
                onSubmit={handleAddArtifact}
                className="p-4 rounded-xl bg-[#141519] border border-[#27272a] space-y-3 text-xs"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    placeholder="Title (e.g. Terminal Output Test)"
                    value={docTitle}
                    onChange={(e) => setDocTitle(e.target.value)}
                    className="px-3 py-2 rounded-md bg-[#0c0d0e] border border-[#27272a] text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-[#f59e0b]"
                  />
                  <div className="flex items-center gap-2">
                    <input
                      ref={artifactFileRef}
                      type="file"
                      accept="image/*"
                      onChange={handleArtifactImageChange}
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={() => artifactFileRef.current?.click()}
                      className="w-full flex items-center justify-center gap-1.5 px-3 py-2 rounded-md bg-[#0c0d0e] border border-[#3f3f46] text-zinc-300 hover:border-[#f59e0b]"
                    >
                      <Upload className="w-3.5 h-3.5 text-[#f59e0b]" />
                      {docImage ? 'Screenshot Selected' : 'Upload Screenshot'}
                    </button>
                  </div>
                </div>
                <textarea
                  rows={2}
                  placeholder="Write documentation notes or caption..."
                  value={docCaption}
                  onChange={(e) => setDocCaption(e.target.value)}
                  className="w-full px-3 py-2 rounded-md bg-[#0c0d0e] border border-[#27272a] text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-[#f59e0b] resize-none"
                />
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="px-4 py-1.5 rounded-md bg-[#f59e0b] text-black font-semibold hover:bg-[#d97706]"
                  >
                    Attach to Case Study
                  </button>
                </div>
              </form>
            )}

            {artifacts.length === 0 ? (
              <div className="p-5 rounded-xl border border-dashed border-[#27272a] bg-[#141519]/50 text-center text-xs text-zinc-400">
                No project screenshots or notes attached yet. Click &ldquo;Add Documentation&rdquo; to upload visuals or milestone logs.
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {artifacts.map((art) => (
                  <div
                    key={art.id}
                    className="rounded-xl bg-[#141519] border border-[#27272a] overflow-hidden flex flex-col justify-between"
                  >
                    {art.imageUrl ? (
                      <div className="aspect-video bg-[#0c0d0e] border-b border-[#27272a] overflow-hidden">
                        <img
                          src={art.imageUrl}
                          alt={art.title}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ) : (
                      <div className="px-4 pt-4 flex items-center gap-2 text-zinc-400 text-xs font-mono">
                        <ImageIcon className="w-3.5 h-3.5 text-[#f59e0b]" />
                        <span>Text Log</span>
                      </div>
                    )}
                    <div className="p-4 space-y-1.5">
                      <div className="flex items-center justify-between gap-2">
                        <div className="text-sm font-semibold text-white">{art.title}</div>
                        <button
                          type="button"
                          onClick={() => handleRemoveArtifact(art.id)}
                          className="p-1 text-zinc-400 hover:text-rose-400 transition-colors"
                          title="Remove documentation item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <p className="text-xs text-zinc-300 leading-relaxed">{art.caption}</p>
                      <div className="text-[11px] font-mono text-zinc-400 pt-1">{art.date}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Outcome & Lessons Learned */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-[#27272a]">
            <div>
              <h3 className="text-xs uppercase tracking-wider font-semibold text-zinc-400 mb-2">
                Demonstrated Outcome
              </h3>
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                {project.outcome}
              </p>
            </div>

            <div>
              <h3 className="text-xs uppercase tracking-wider font-semibold text-zinc-400 mb-2">
                Lessons &amp; Engineering Reflections
              </h3>
              <ul className="space-y-1.5 text-xs sm:text-sm text-zinc-300">
                {project.lessonsLearned.map((lesson, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-[#f59e0b] font-bold">·</span>
                    <span>{lesson}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
