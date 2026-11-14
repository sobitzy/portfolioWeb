import React, { useState, useEffect, useRef } from 'react';
import {
  FileText,
  Plus,
  ExternalLink,
  Image as ImageIcon,
  Trash2,
  X,
  Upload,
  CheckCircle2,
  Eye,
} from 'lucide-react';
import { PAST_WORK_DOCUMENTATION, WorkDocumentationItem } from '../data/portfolioData';

const DOCS_STORAGE_KEY = 'portfolio_work_documentation_v1';

export const DocumentationSection: React.FC = () => {
  const [docs, setDocs] = useState<WorkDocumentationItem[]>(PAST_WORK_DOCUMENTATION);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [selectedDoc, setSelectedDoc] = useState<WorkDocumentationItem | null>(null);

  // Add documentation form state
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<WorkDocumentationItem['category']>('Technical & Code');
  const [date, setDate] = useState('2025');
  const [projectOrOrg, setProjectOrOrg] = useState('');
  const [summary, setSummary] = useState('');
  const [highlightsText, setHighlightsText] = useState('');
  const [externalUrl, setExternalUrl] = useState('');
  const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(DOCS_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as WorkDocumentationItem[];
        if (Array.isArray(parsed) && parsed.length > 0) {
          setDocs(parsed);
        }
      }
    } catch {
      // Fallback to default seeded documentation
    }
  }, []);

  const persistDocs = (updated: WorkDocumentationItem[]) => {
    setDocs(updated);
    try {
      localStorage.setItem(DOCS_STORAGE_KEY, JSON.stringify(updated));
    } catch {
      // Ignore storage quota exceeded errors gracefully
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setImageUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleAttachPhotoToExisting = (docId: string, file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result as string;
      const updated = docs.map((d) => (d.id === docId ? { ...d, imageUrl: dataUrl } : d));
      persistDocs(updated);
      if (selectedDoc && selectedDoc.id === docId) {
        setSelectedDoc({ ...selectedDoc, imageUrl: dataUrl });
      }
    };
    reader.readAsDataURL(file);
  };

  const handleCreateDoc = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !summary.trim()) return;

    const highlights = highlightsText
      .split('\n')
      .map((line) => line.trim())
      .filter(Boolean);

    const newItem: WorkDocumentationItem = {
      id: `doc-custom-${Date.now()}`,
      title: title.trim(),
      category,
      date: date.trim() || '2025',
      projectOrOrg: projectOrOrg.trim() || 'Independent Work',
      summary: summary.trim(),
      highlights: highlights.length > 0 ? highlights : ['Documented process and deliverables'],
      imageUrl,
      externalUrl: externalUrl.trim() || undefined,
      isCustom: true,
    };

    persistDocs([newItem, ...docs]);

    // Reset form
    setTitle('');
    setProjectOrOrg('');
    setSummary('');
    setHighlightsText('');
    setExternalUrl('');
    setImageUrl(undefined);
    setIsAddModalOpen(false);
  };

  const handleDeleteCustomDoc = (id: string) => {
    const updated = docs.filter((d) => d.id !== id);
    persistDocs(updated);
    if (selectedDoc?.id === id) {
      setSelectedDoc(null);
    }
  };

  const categories = ['All', 'Technical & Code', 'Design & UX', 'Event & Media', 'Coursework & Research'];

  const filteredDocs =
    activeCategory === 'All' ? docs : docs.filter((d) => d.category === activeCategory);

  return (
    <section id="documentation" className="py-20 md:py-24 border-b border-[#27272a] bg-[#0c0d0e]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-10 gap-6">
          <div>
            <div className="text-xs uppercase font-mono tracking-wider text-[#f59e0b] font-semibold mb-2">
              Process &amp; Evidence
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              PAST WORK DOCUMENTATION
            </h2>
            <p className="text-sm sm:text-base text-zinc-300 mt-2 max-w-2xl">
              Architectural notes, event production runbooks, visual screenshots, and documented
              learnings from past projects. Add new work records directly below.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => setIsAddModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg bg-[#f59e0b] text-black hover:bg-[#d97706] transition-colors whitespace-nowrap"
            >
              <Plus className="w-4 h-4" />
              Add Work Documentation
            </button>
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div className="mb-8 flex items-center gap-1 p-1 bg-[#141519] border border-[#27272a] rounded-xl w-fit max-w-full overflow-x-auto">
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

        {/* Documentation Entries Grid */}
        {filteredDocs.length === 0 ? (
          <div className="p-10 rounded-xl bg-[#121316] border border-[#27272a] text-center space-y-3">
            <p className="text-sm text-zinc-400">No documentation entries in this category yet.</p>
            <button
              type="button"
              onClick={() => setIsAddModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-lg bg-[#18191e] border border-[#27272a] text-zinc-200 hover:border-[#f59e0b]"
            >
              <Plus className="w-3.5 h-3.5 text-[#f59e0b]" />
              Add First Entry
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredDocs.map((doc) => (
              <article
                key={doc.id}
                onClick={() => setSelectedDoc(doc)}
                className="group cursor-pointer bg-[#121316] border border-[#27272a] rounded-xl overflow-hidden hover:border-zinc-400 transition-colors flex flex-col justify-between"
              >
                {/* Optional Documentation Visual Preview */}
                {doc.imageUrl ? (
                  <div className="relative aspect-[16/9] w-full bg-[#0a0a0c] border-b border-[#27272a] overflow-hidden">
                    <img
                      src={doc.imageUrl}
                      alt={doc.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                    />
                  </div>
                ) : null}

                <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-3">
                    {/* Unboxed Metadata Line */}
                    <div className="flex items-center justify-between gap-2 text-xs font-mono text-zinc-400">
                      <div className="flex items-center gap-2 truncate">
                        <span className="text-[#f59e0b] font-medium">{doc.category}</span>
                        <span aria-hidden="true">·</span>
                        <span className="truncate">{doc.projectOrOrg}</span>
                      </div>
                      <span className="tabular-nums shrink-0">{doc.date}</span>
                    </div>

                    <h3 className="text-lg font-bold text-white group-hover:text-[#f59e0b] transition-colors leading-snug">
                      {doc.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed line-clamp-3">
                      {doc.summary}
                    </p>

                    <ul className="space-y-1.5 pt-1 text-xs text-zinc-400">
                      {doc.highlights.slice(0, 3).map((hl, hIdx) => (
                        <li key={hIdx} className="flex items-start gap-2">
                          <span className="text-[#f59e0b] font-bold">·</span>
                          <span className="line-clamp-1">{hl}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Card Footer */}
                  <div className="pt-4 mt-4 border-t border-[#27272a] flex items-center justify-between text-xs">
                    <span className="flex items-center gap-1.5 font-medium text-zinc-200 group-hover:text-[#f59e0b] transition-colors">
                      <Eye className="w-3.5 h-3.5" />
                      {doc.imageUrl ? 'Inspect Documentation & Media' : 'Read Notes & Attach Media'}
                    </span>

                    <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                      {doc.externalUrl && (
                        <a
                          href={doc.externalUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 text-zinc-400 hover:text-[#f59e0b] transition-colors"
                          title="Open Reference Link"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                      {doc.isCustom && (
                        <button
                          type="button"
                          onClick={() => handleDeleteCustomDoc(doc.id)}
                          className="p-1.5 text-zinc-400 hover:text-rose-400 transition-colors"
                          title="Remove entry"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

      {/* Add Documentation Modal */}
      {isAddModalOpen && (
        <div
          className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6"
          onClick={() => setIsAddModalOpen(false)}
        >
          <div
            className="relative bg-[#101114] border border-[#27272a] rounded-xl w-full max-w-2xl max-h-[92vh] overflow-y-auto shadow-2xl text-zinc-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 z-20 flex items-center justify-between px-6 py-4 bg-[#101114]/95 backdrop-blur-md border-b border-[#27272a]">
              <div className="flex items-center gap-2 text-xs font-mono text-zinc-300">
                <FileText className="w-4 h-4 text-[#f59e0b]" />
                <span>Add Past Work Documentation</span>
              </div>
              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-[#27272a]"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateDoc} className="p-6 space-y-4 text-xs">
              <div>
                <label className="block font-medium text-zinc-300 mb-1">
                  Documentation Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Database Normalization Schema & ER Diagram Notes"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-md bg-[#0c0d0e] border border-[#27272a] text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-[#f59e0b]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block font-medium text-zinc-300 mb-1">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as WorkDocumentationItem['category'])}
                    className="w-full px-3 py-2 rounded-md bg-[#0c0d0e] border border-[#27272a] text-zinc-100 focus:outline-none focus:border-[#f59e0b]"
                  >
                    <option value="Technical & Code">Technical &amp; Code</option>
                    <option value="Design & UX">Design &amp; UX</option>
                    <option value="Event & Media">Event &amp; Media</option>
                    <option value="Coursework & Research">Coursework &amp; Research</option>
                  </select>
                </div>

                <div>
                  <label className="block font-medium text-zinc-300 mb-1">Project / Organization</label>
                  <input
                    type="text"
                    placeholder="e.g. UST Coursework"
                    value={projectOrOrg}
                    onChange={(e) => setProjectOrOrg(e.target.value)}
                    className="w-full px-3 py-2 rounded-md bg-[#0c0d0e] border border-[#27272a] text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-[#f59e0b]"
                  />
                </div>

                <div>
                  <label className="block font-medium text-zinc-300 mb-1">Year / Date</label>
                  <input
                    type="text"
                    placeholder="e.g. Oct 2025"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-md bg-[#0c0d0e] border border-[#27272a] text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-[#f59e0b]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-medium text-zinc-300 mb-1">
                  Summary &amp; Context *
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="Describe the problem solved, tools used, or process behind this work..."
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-md bg-[#0c0d0e] border border-[#27272a] text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-[#f59e0b] resize-none"
                />
              </div>

              <div>
                <label className="block font-medium text-zinc-300 mb-1">
                  Key Deliverables / Highlights (one per line)
                </label>
                <textarea
                  rows={3}
                  placeholder={"Designed ERD in 3NF\nCaptured 120+ keynote stage frames\nBenchmarked classification accuracy"}
                  value={highlightsText}
                  onChange={(e) => setHighlightsText(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-md bg-[#0c0d0e] border border-[#27272a] text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-[#f59e0b] resize-none"
                />
              </div>

              <div>
                <label className="block font-medium text-zinc-300 mb-1">
                  Reference Link (GitHub, Drive, Framer, Notion — Optional)
                </label>
                <input
                  type="url"
                  placeholder="https://..."
                  value={externalUrl}
                  onChange={(e) => setExternalUrl(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-md bg-[#0c0d0e] border border-[#27272a] text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-[#f59e0b]"
                />
              </div>

              {/* Screenshot / Photo Attachment */}
              <div>
                <label className="block font-medium text-zinc-300 mb-1.5">
                  Attach Documentation Photo or Screenshot (Optional)
                </label>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                {imageUrl ? (
                  <div className="relative rounded-lg overflow-hidden border border-[#27272a] bg-[#0c0d0e]">
                    <img
                      src={imageUrl}
                      alt="Documentation preview"
                      className="w-full max-h-48 object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => setImageUrl(undefined)}
                      className="absolute top-2 right-2 p-1 rounded bg-black/75 text-zinc-200 hover:text-white"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full py-4 px-4 rounded-lg border border-dashed border-[#3f3f46] bg-[#0c0d0e] text-zinc-400 hover:text-white hover:border-[#f59e0b] transition-colors flex items-center justify-center gap-2"
                  >
                    <Upload className="w-4 h-4 text-[#f59e0b]" />
                    Choose Screenshot or Event Photo
                  </button>
                )}
              </div>

              <div className="pt-3 border-t border-[#27272a] flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-md bg-[#18191e] text-zinc-300 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-md bg-[#f59e0b] text-black font-semibold hover:bg-[#d97706]"
                >
                  Save Documentation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Inspect Documentation Detail Modal */}
      {selectedDoc && (
        <div
          className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6"
          onClick={() => setSelectedDoc(null)}
        >
          <div
            className="relative bg-[#101114] border border-[#27272a] rounded-xl w-full max-w-3xl max-h-[92vh] overflow-y-auto shadow-2xl text-zinc-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 z-20 flex items-center justify-between px-6 py-4 bg-[#101114]/95 backdrop-blur-md border-b border-[#27272a]">
              <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
                <span className="text-[#f59e0b]">{selectedDoc.category}</span>
                <span aria-hidden="true">·</span>
                <span>{selectedDoc.projectOrOrg}</span>
                <span aria-hidden="true">·</span>
                <span>{selectedDoc.date}</span>
              </div>
              <button
                type="button"
                onClick={() => setSelectedDoc(null)}
                className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-[#27272a]"
                aria-label="Close documentation detail"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 sm:p-8 space-y-6">
              <h3 className="text-2xl font-bold text-white">{selectedDoc.title}</h3>

              {/* Visual Documentation Frame or Upload Trigger */}
              {selectedDoc.imageUrl ? (
                <div className="space-y-2">
                  <div className="rounded-lg overflow-hidden border border-[#27272a] bg-[#0a0a0c]">
                    <img
                      src={selectedDoc.imageUrl}
                      alt={selectedDoc.title}
                      referrerPolicy="no-referrer"
                      className="w-full max-h-[420px] object-contain mx-auto"
                    />
                  </div>
                  <div className="flex justify-end">
                    <label className="cursor-pointer inline-flex items-center gap-1.5 text-xs font-mono text-zinc-400 hover:text-[#f59e0b] transition-colors">
                      <Upload className="w-3.5 h-3.5" />
                      Replace Attached Screenshot
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) handleAttachPhotoToExisting(selectedDoc.id, file);
                        }}
                      />
                    </label>
                  </div>
                </div>
              ) : (
                <label className="cursor-pointer block p-6 rounded-xl border border-dashed border-[#3f3f46] bg-[#141519] hover:border-[#f59e0b] transition-colors text-center space-y-2">
                  <ImageIcon className="w-6 h-6 text-[#f59e0b] mx-auto" />
                  <div className="text-xs font-semibold text-zinc-200">
                    Attach Visual Documentation / Screenshot
                  </div>
                  <p className="text-[11px] text-zinc-400">
                    Upload a terminal capture, UI screenshot, or event behind-the-scenes photo for this record.
                  </p>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleAttachPhotoToExisting(selectedDoc.id, file);
                    }}
                  />
                </label>
              )}

              <div className="space-y-2">
                <div className="text-xs uppercase font-mono tracking-wider text-zinc-400 font-semibold">
                  Documentation Notes
                </div>
                <p className="text-sm text-zinc-300 leading-relaxed">{selectedDoc.summary}</p>
              </div>

              <div className="space-y-2">
                <div className="text-xs uppercase font-mono tracking-wider text-zinc-400 font-semibold">
                  Recorded Highlights &amp; Deliverables
                </div>
                <ul className="space-y-2">
                  {selectedDoc.highlights.map((hl, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{hl}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {selectedDoc.externalUrl && (
                <div className="pt-4 border-t border-[#27272a]">
                  <a
                    href={selectedDoc.externalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-md bg-[#f59e0b] text-black hover:bg-[#d97706] transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    Open External Documentation
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
