import React, { useState } from 'react';
import { X, Printer, Download, Mail, Copy, Check, ExternalLink, MapPin, GraduationCap } from 'lucide-react';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleCopyText = () => {
    // Full name updated to David Jed Gutierrez
    const plainResume = `DAVID JED GUTIERREZ
IT Student & Creative Technologist | University of Santo Tomas
Email: dj.gutierrez.1221@gmail.com
Location: Manila, Philippines
GitHub: https://github.com/djgutierrez-it

OBJECTIVE
Motivated Information Technology student at the University of Santo Tomas seeking IT internships, entry-level software engineering, data science, or technical collaboration opportunities. Combines disciplined object-oriented programming (Java), Python data analysis, and web engineering with proven creative direction in photography and digital media.

EDUCATION
University of Santo Tomas (UST) — Manila, Philippines
Bachelor of Science in Information Technology (BS IT)
Core: Object-Oriented Programming (Java), Data Structures, Web Development, Database Systems

SPECIALIZED TRAINING
Matsuo Labs & The University of Tokyo — Tokyo, Japan (Online)
Global Consumer Intelligence (GCI) Program (3-Month Intensive)
Focus: Python Data Science (NumPy, Pandas), Exploratory Data Analysis, Machine Learning Foundations

TECHNICAL PROJECTS
1. Product Manager System (Java 21, OOP, CLI Prototype)
- Engineered an encapsulated Java inventory system calculating dynamic inventory value and discount algorithms.
- Enforced strict defensive validation and data encapsulation principles.

2. TEDxSISC Youth Website (Framer, UX/UI, Published)
- Designed and launched responsive official event site (https://tedxsisc.framer.website/).
- Structured event schedules, speaker showcases, and venue directions for conference attendees.

3. Consumer Behavior EDA Pipeline (Python, Pandas, Matplotlib)
- Built automated data cleaning and statistical aggregation scripts as part of GCI coursework.

CREATIVE & LEADERSHIP EXPERIENCE
Lead Event Photographer & Media Documenter — TEDxSISC Youth (2024)
- Directed stage coverage and documentary photography under high-contrast stage lighting.
- Coordinated media delivery for promotional and social campaigns.

TECHNICAL SKILLS
Languages: Java, Python, TypeScript, JavaScript, SQL, HTML5/CSS3
Frameworks & Libraries: React, Tailwind CSS, Pandas, NumPy, Matplotlib
Tools & Platforms: Git/GitHub, Framer, Figma, Adobe Premiere Pro, Lightroom, DaVinci Resolve
`;

    navigator.clipboard.writeText(plainResume);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6"
      onClick={onClose}
    >
      <div
        className="relative bg-[#101114] border border-[#27272a] rounded-2xl w-full max-w-4xl max-h-[92vh] overflow-y-auto shadow-2xl text-zinc-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Control Bar */}
        <div className="sticky top-0 z-20 flex items-center justify-between px-6 py-4 bg-[#101114]/95 backdrop-blur-md border-b border-[#27272a]">
          <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
            <span>Curriculum Vitae</span>
            <span aria-hidden="true">·</span>
            <span className="text-[#f59e0b] font-semibold">David Jed Gutierrez</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyText}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-[#18191e] border border-[#27272a] text-zinc-200 hover:text-white hover:border-zinc-400 transition-colors"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  Copied Text
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-[#f59e0b]" />
                  Copy Markdown
                </>
              )}
            </button>
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-[#f59e0b] text-black hover:bg-[#d97706] transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              Print / Save PDF
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-[#27272a] transition-colors"
              aria-label="Close resume"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Resume Canvas */}
        <div className="p-8 sm:p-12 space-y-8 bg-[#101114] text-zinc-200 print:bg-white print:text-black print:p-0">
          {/* Header — prints cleanly with full name */}
          <div className="border-b border-[#27272a] pb-6 space-y-2">
            <h1 className="text-3xl font-extrabold text-white print:text-black tracking-tight">
              DAVID JED GUTIERREZ
            </h1>
            <div className="text-sm font-semibold text-[#f59e0b] print:text-neutral-800">
              Information Technology Student &amp; Creative Technologist
            </div>
            <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-zinc-400 print:text-neutral-600 pt-1">
              <span className="flex items-center gap-1">
                <Mail className="w-3.5 h-3.5 text-[#f59e0b]" />
                dj.gutierrez.1221@gmail.com
              </span>
              <span aria-hidden="true">·</span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5" />
                University of Santo Tomas, Manila, PH
              </span>
              <span aria-hidden="true">·</span>
              <span>github.com/djgutierrez-it</span>
            </div>
          </div>

          {/* Statement / Objective */}
          <div className="space-y-2">
            <h2 className="text-xs uppercase font-mono tracking-wider font-semibold text-[#f59e0b] print:text-black">
              Professional Objective
            </h2>
            <p className="text-xs sm:text-sm text-zinc-300 print:text-neutral-700 leading-relaxed">
              Motivated IT student at the University of Santo Tomas seeking IT internships, entry-level
              software engineering, data science, or technical collaboration opportunities. Combines disciplined
              object-oriented programming (Java), Python data analysis, and web engineering with proven creative
              direction in photography, videography, and digital media production.
            </p>
          </div>

          {/* Education & Training */}
          <div className="space-y-4">
            <h2 className="text-xs uppercase font-mono tracking-wider font-semibold text-[#f59e0b] print:text-black">
              Education &amp; Training
            </h2>

            <div className="space-y-3">
              <div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs sm:text-sm font-semibold text-white print:text-black">
                  <span>Bachelor of Science in Information Technology (BS IT)</span>
                  <span className="text-zinc-400 font-mono text-xs">University of Santo Tomas (UST)</span>
                </div>
                <p className="text-xs text-zinc-400 print:text-neutral-600 mt-0.5">
                  Core Coursework: Object-Oriented Programming (Java), Data Structures &amp; Algorithms, Database
                  Management Systems, Web Architecture, Systems Analysis.
                </p>
              </div>

              <div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs sm:text-sm font-semibold text-white print:text-black">
                  <span>Global Consumer Intelligence (GCI) Program — 3-Month Intensive</span>
                  <span className="text-zinc-400 font-mono text-xs">Matsuo Labs &amp; The University of Tokyo</span>
                </div>
                <p className="text-xs text-zinc-400 print:text-neutral-600 mt-0.5">
                  Practical immersion in Python data analysis (NumPy, Pandas), statistical data visualization, and
                  machine learning fundamentals taught by Matsuo Labs faculty.
                </p>
              </div>
            </div>
          </div>

          {/* Technical Projects */}
          <div className="space-y-4">
            <h2 className="text-xs uppercase font-mono tracking-wider font-semibold text-[#f59e0b] print:text-black">
              Featured Technical Projects
            </h2>

            <div className="space-y-4 text-xs sm:text-sm">
              <div>
                <div className="flex items-center justify-between text-white print:text-black font-semibold">
                  <span>Product Manager System</span>
                  <span className="text-xs font-mono text-[#f59e0b]">Java 21 · OOP</span>
                </div>
                <p className="text-xs text-zinc-300 print:text-neutral-700 mt-1 leading-relaxed">
                  Developed an object-oriented Java command-line inventory system demonstrating class encapsulation,
                  dynamic valuation (unit price * stock), and dynamic discount calculations with defensive bounds validation.
                </p>
              </div>

              <div>
                <div className="flex items-center justify-between text-white print:text-black font-semibold">
                  <span>TEDxSISC Youth Website</span>
                  <span className="text-xs font-mono text-emerald-400">Framer · UX/UI · Published</span>
                </div>
                <p className="text-xs text-zinc-300 print:text-neutral-700 mt-1 leading-relaxed">
                  Designed, structured, and deployed the official responsive event website (https://tedxsisc.framer.website/)
                  introducing the conference theme, organizing speaker agendas, and guiding attendee venue navigation.
                </p>
              </div>

              <div>
                <div className="flex items-center justify-between text-white print:text-black font-semibold">
                  <span>Data Science EDA Pipeline</span>
                  <span className="text-xs font-mono text-amber-300">Python · Pandas · Seaborn</span>
                </div>
                <p className="text-xs text-zinc-300 print:text-neutral-700 mt-1 leading-relaxed">
                  Exploratory data analysis notebooks for consumer behavior insights, statistical feature transformation,
                  and baseline predictive modeling.
                </p>
              </div>
            </div>
          </div>

          {/* Creative Experience */}
          <div className="space-y-4">
            <h2 className="text-xs uppercase font-mono tracking-wider font-semibold text-[#f59e0b] print:text-black">
              Creative &amp; Media Experience
            </h2>

            <div className="space-y-3 text-xs sm:text-sm">
              <div>
                <div className="flex items-center justify-between text-white print:text-black font-semibold">
                  <span>Lead Event Photographer &amp; Media Documenter — TEDxSISC Youth</span>
                  <span className="text-xs font-mono text-zinc-400">2024</span>
                </div>
                <p className="text-xs text-zinc-300 print:text-neutral-700 mt-0.5">
                  Captured keynote speakers, live hall atmosphere, and sponsor activations under demanding lighting conditions;
                  curated deliverables for press and digital media channels.
                </p>
              </div>

              <div>
                <div className="flex items-center justify-between text-white print:text-black font-semibold">
                  <span>Cinematography &amp; Event Videography — Tech Summits &amp; Orgs</span>
                  <span className="text-xs font-mono text-zinc-400">2023 - Present</span>
                </div>
                <p className="text-xs text-zinc-300 print:text-neutral-700 mt-0.5">
                  Filmed and edited high-energy event aftermovies and short-form reels using Sony Alpha / Cinema series,
                  Adobe Premiere Pro, and DaVinci Resolve.
                </p>
              </div>
            </div>
          </div>

          {/* Skills Breakdown */}
          <div className="space-y-3 pt-2 border-t border-[#27272a] text-xs">
            <h2 className="uppercase font-mono tracking-wider font-semibold text-[#f59e0b] print:text-black">
              Technical &amp; Creative Skills
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-zinc-300 print:text-neutral-700">
              <div>
                <strong className="text-white print:text-black">Programming:</strong> Java, Python, TypeScript, JavaScript, HTML5/CSS3
              </div>
              <div>
                <strong className="text-white print:text-black">Data &amp; AI:</strong> Pandas, NumPy, Matplotlib, Jupyter Notebooks
              </div>
              <div>
                <strong className="text-white print:text-black">Web &amp; Design:</strong> React, Tailwind CSS, Framer, Figma, UI/UX
              </div>
              <div>
                <strong className="text-white print:text-black">Media Production:</strong> Adobe Premiere Pro, Lightroom, DaVinci Resolve
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
