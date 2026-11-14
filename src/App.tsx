/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProjectsSection } from './components/ProjectsSection';
import { DocumentationSection } from './components/DocumentationSection';
import { CreativeGallery } from './components/CreativeGallery';
import { AboutSection } from './components/AboutSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ProjectCaseStudyModal } from './components/ProjectCaseStudyModal';
import { LightboxModal } from './components/LightboxModal';
import { ResumeModal } from './components/ResumeModal';
import { ProjectCaseStudy, CreativeWorkItem } from './data/portfolioData';

export default function App() {
  const [selectedProject, setSelectedProject] = useState<ProjectCaseStudy | null>(null);
  const [selectedCreativeItem, setSelectedCreativeItem] = useState<CreativeWorkItem | null>(null);
  const [resumeOpen, setResumeOpen] = useState<boolean>(false);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#0c0d0e] text-[#ededed] font-sans flex flex-col selection:bg-[#f59e0b] selection:text-black">
      {/* Navigation */}
      <Navbar
        onOpenResume={() => setResumeOpen(true)}
        onOpenContact={() => scrollToSection('contact')}
      />

      {/* Main Content */}
      <main className="flex-1">
        <Hero
          onExploreProjects={() => scrollToSection('projects')}
          onExploreCreative={() => scrollToSection('creative')}
          onOpenResume={() => setResumeOpen(true)}
          onOpenContact={() => scrollToSection('contact')}
        />

        <ProjectsSection onSelectProject={(project) => setSelectedProject(project)} />

        <DocumentationSection />

        <CreativeGallery onSelectItem={(item) => setSelectedCreativeItem(item)} />

        <AboutSection />

        <ContactSection />
      </main>

      {/* Footer */}
      <Footer onOpenResume={() => setResumeOpen(true)} />

      {/* Modals & Overlays */}
      <ProjectCaseStudyModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      <LightboxModal
        item={selectedCreativeItem}
        onClose={() => setSelectedCreativeItem(null)}
      />

      <ResumeModal
        isOpen={resumeOpen}
        onClose={() => setResumeOpen(false)}
      />
    </div>
  );
}
