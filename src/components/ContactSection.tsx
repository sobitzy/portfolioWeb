import React, { useState } from 'react';
import { Mail, Copy, Check, Send, Github, Linkedin, Instagram, ArrowUpRight, MessageSquare } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    opportunityType: 'IT Internship / Job',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const emailAddress = 'dj.gutierrez.1221@gmail.com';

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(emailAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name.trim() || !formState.email.trim() || !formState.message.trim()) return;

    // Build mailto link so user can send immediately from their mail client
    const subject = encodeURIComponent(`[${formState.opportunityType}] Portfolio Inquiry from ${formState.name}`);
    const body = encodeURIComponent(
      `Hello David Jed,\n\nName: ${formState.name}\nEmail: ${formState.email}\nOpportunity Type: ${formState.opportunityType}\n\nMessage:\n${formState.message}\n`
    );

    window.location.href = `mailto:${emailAddress}?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-20 md:py-28 bg-[#0c0d0e]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left info column */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <div className="text-xs uppercase font-mono tracking-wider text-[#f59e0b] font-semibold mb-2">
                Get In Touch
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                LET&apos;S BUILD SOMETHING MEANINGFUL
              </h2>
            </div>

            <p className="text-sm sm:text-base text-zinc-300 leading-relaxed max-w-lg">
              Whether you are an IT recruiter seeking an eager intern, a software team exploring
              collaborations, or an organization needing creative visual documentation — my inbox
              is always open.
            </p>

            {/* Quick Email Copy Card */}
            <div className="p-5 rounded-2xl bg-[#121316] border border-[#27272a] space-y-3">
              <div className="text-xs font-mono uppercase tracking-wider text-zinc-400">
                Direct Contact
              </div>
              <div className="flex items-center justify-between gap-3">
                <a
                  href={`mailto:${emailAddress}`}
                  className="text-base sm:text-lg font-mono font-semibold text-white hover:text-[#f59e0b] transition-colors truncate"
                >
                  {emailAddress}
                </a>
                <button
                  onClick={handleCopyEmail}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-[#27272a] text-zinc-200 hover:bg-[#3f3f46] hover:text-white transition-colors shrink-0"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      Copied
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-[#f59e0b]" />
                      Copy Email
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Target Audience Notes */}
            <div className="space-y-2 text-xs text-zinc-400">
              <div className="font-semibold uppercase tracking-wider text-zinc-300 font-mono text-[11px]">
                Open for:
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-zinc-300">
                <div className="flex items-center gap-2">
                  <span className="text-[#f59e0b]">·</span> Software &amp; IT Internships
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[#f59e0b]">·</span> Student &amp; Open Source Projects
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[#f59e0b]">·</span> Event Photography &amp; Video
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[#f59e0b]">·</span> UX/UI &amp; Web Prototyping
                </div>
              </div>
            </div>

            {/* Social channels */}
            <div className="pt-4 border-t border-[#27272a] flex items-center gap-4 text-xs font-mono text-zinc-400">
              <a
                href="https://github.com/djgutierrez-it"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 hover:text-white transition-colors"
              >
                <Github className="w-4 h-4" /> GitHub
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 hover:text-white transition-colors"
              >
                <Linkedin className="w-4 h-4" /> LinkedIn
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 hover:text-white transition-colors"
              >
                <Instagram className="w-4 h-4" /> Visual Portfolio
              </a>
            </div>
          </div>

          {/* Right Form column */}
          <div className="lg:col-span-6 bg-[#121316] border border-[#27272a] rounded-2xl p-6 sm:p-8">
            <h3 className="text-lg font-bold text-white mb-1 flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-[#f59e0b]" />
              Send a Direct Message
            </h3>
            <p className="text-xs text-zinc-400 mb-6">
              Fill in your details and send directly via your preferred email client.
            </p>

            {submitted ? (
              <div className="p-6 rounded-xl bg-[#18191e] border border-emerald-500/30 text-center space-y-3">
                <div className="w-10 h-10 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center mx-auto">
                  <Check className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-semibold text-white">Opening Email Client...</h4>
                <p className="text-xs text-zinc-400">
                  Thank you for reaching out! If your email client didn&apos;t open automatically, you can also write directly to{' '}
                  <span className="text-[#f59e0b] font-mono">{emailAddress}</span>.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="px-4 py-1.5 text-xs rounded-lg bg-[#27272a] text-zinc-200 hover:text-white mt-2"
                >
                  Send Another Note
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="block font-medium text-zinc-300 mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Jane Doe"
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#0c0d0e] border border-[#27272a] text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-[#f59e0b]"
                  />
                </div>

                <div>
                  <label className="block font-medium text-zinc-300 mb-1">Your Email</label>
                  <input
                    type="email"
                    required
                    placeholder="name@company.com"
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#0c0d0e] border border-[#27272a] text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-[#f59e0b]"
                  />
                </div>

                <div>
                  <label className="block font-medium text-zinc-300 mb-1">Opportunity Type</label>
                  <select
                    value={formState.opportunityType}
                    onChange={(e) => setFormState({ ...formState, opportunityType: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#0c0d0e] border border-[#27272a] text-zinc-100 focus:outline-none focus:border-[#f59e0b]"
                  >
                    <option value="IT Internship / Job">IT Internship / Entry-Level Role</option>
                    <option value="Student / Tech Collaboration">Student Collaboration / Organization</option>
                    <option value="Event Photo / Videography">Creative / Event Media Project</option>
                    <option value="General Mentorship / Inquiry">Mentorship / General Inquiry</option>
                  </select>
                </div>

                <div>
                  <label className="block font-medium text-zinc-300 mb-1">Message</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Share what you are working on and how we can collaborate..."
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#0c0d0e] border border-[#27272a] text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-[#f59e0b] resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-lg bg-[#f59e0b] text-black font-semibold hover:bg-[#d97706] transition-colors"
                >
                  <Send className="w-3.5 h-3.5" />
                  Send Inquiry
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
