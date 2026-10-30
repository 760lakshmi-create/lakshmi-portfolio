import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProjectsShowcase from './components/ProjectsShowcase';
import InteractiveLiveCrudLab from './components/InteractiveLiveCrudLab';
import SkillsEcosystem from './components/SkillsEcosystem';
import JourneyTimeline from './components/JourneyTimeline';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import ProjectDetailModal from './components/ProjectDetailModal';
import { Project } from './types';
import { soundFx } from './utils/soundEffects';

export default function App() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    return localStorage.getItem('portfolio_theme') === 'dark';
  });

  const toggleTheme = () => {
    setIsDarkMode((prev) => {
      const next = !prev;
      localStorage.setItem('portfolio_theme', next ? 'dark' : 'light');
      return next;
    });
  };

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);

      const sections = ['hero', 'projects', 'live-crud-lab', 'skills', 'journey', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    soundFx.playClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className={`relative min-h-screen transition-colors duration-500 selection:bg-[#601212] selection:text-[#FAF9F6] ${
      isDarkMode ? 'bg-[#0E0D0D] text-[#FAF9F6] dark' : 'bg-[#FAF9F6] text-[#0A0A0A]'
    }`}>
      {/* Custom Geometric Balance Cursor */}
      <CustomCursor />

      {/* Main Sticky Header with Progress Bar and Theme Toggle */}
      <Navbar 
        activeSection={activeSection} 
        isDarkMode={isDarkMode} 
        onToggleTheme={toggleTheme} 
      />

      {/* Main Content Sections */}
      <main>
        {/* Section 01: Hero Core */}
        <Hero />

        {/* Section 02: Featured Projects Showcase */}
        <ProjectsShowcase onSelectProject={(p) => setSelectedProject(p)} />

        {/* Section 03: Real-Time Interactive CRUD Lab */}
        <InteractiveLiveCrudLab />

        {/* Section 04: Skills & Technical Ecosystem */}
        <SkillsEcosystem />

        {/* Section 05: Experience & Career Journey */}
        <JourneyTimeline />

        {/* Section 06: Contact & Communication */}
        <ContactSection />
      </main>

      {/* Floating Back to Top Button */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            onClick={scrollToTop}
            data-cursor="TOP"
            title="Back to Top"
            aria-label="Back to Top"
            className="fixed bottom-6 right-6 z-40 w-11 h-11 bg-[#601212] text-[#FAF9F6] border border-[#FAF9F6]/20 shadow-2xl flex items-center justify-center hover:bg-[#3B0A0A] hover:scale-105 active:scale-95 transition-all"
          >
            <ArrowUp className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Footer */}
      <Footer />

      {/* Project Specs Inspection Modal */}
      <ProjectDetailModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </div>
  );
}

