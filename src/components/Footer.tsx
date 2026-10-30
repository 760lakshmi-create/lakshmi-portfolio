import React from 'react';
import { ArrowUp, Github, Linkedin, Heart } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { soundFx } from '../utils/soundEffects';

export default function Footer() {
  const scrollToTop = () => {
    soundFx.playClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0A0A0A] text-[#FAF9F6] py-16 px-6 sm:px-12 border-t border-white/10 font-mono-code text-xs">
      <div className="max-w-7xl mx-auto space-y-12">
        
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 border-b border-white/10 pb-12">
          
          {/* Left Brand */}
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-[#601212] text-[#FAF9F6] font-serif-editorial font-bold text-sm flex items-center justify-center">
                LK
              </div>
              <span className="font-serif-editorial font-bold text-2xl tracking-tight text-[#FAF9F6]">
                LAKSHMI KUMARI
              </span>
            </div>
            <p className="text-xs text-white/50 tracking-wider uppercase">
              Full Stack Engineer • MERN & PHP Systems Architect
            </p>
          </div>

          {/* Quick Nav */}
          <div className="flex flex-wrap items-center gap-6 text-[11px] uppercase tracking-widest text-white/70">
            <a href="#hero" onClick={() => soundFx.playClick()} className="hover:text-[#D1B3B3] transition-colors">Core</a>
            <a href="#projects" onClick={() => soundFx.playClick()} className="hover:text-[#D1B3B3] transition-colors">Projects</a>
            <a href="#live-crud-lab" onClick={() => soundFx.playClick()} className="hover:text-[#D1B3B3] transition-colors">CRUD Lab</a>
            <a href="#skills" onClick={() => soundFx.playClick()} className="hover:text-[#D1B3B3] transition-colors">Ecosystem</a>
            <a href="#journey" onClick={() => soundFx.playClick()} className="hover:text-[#D1B3B3] transition-colors">Journey</a>
            <a href="#contact" onClick={() => soundFx.playClick()} className="hover:text-[#D1B3B3] transition-colors">Contact</a>
          </div>

          {/* Top Trigger */}
          <button
            onClick={scrollToTop}
            data-cursor="TOP"
            className="w-12 h-12 bg-[#601212] hover:bg-[#3B0A0A] text-[#FAF9F6] border border-white/20 flex items-center justify-center transition-colors shadow-lg"
            aria-label="Back to Top"
          >
            <ArrowUp className="w-5 h-5" />
          </button>

        </div>

        {/* Bottom Credits */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-white/40 text-[10px] uppercase tracking-widest">
          <div>
            © 2026 Lakshmi Kumari. Geometric Balance Aesthetic.
          </div>

          <div className="flex items-center gap-2">
            <span>Designed & Engineered with React 19 & Tailwind</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
