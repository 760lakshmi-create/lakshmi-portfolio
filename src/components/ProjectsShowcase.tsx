import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ExternalLink, Github, Filter, ArrowRight } from 'lucide-react';
import { PROJECTS } from '../data/portfolioData';
import { Project } from '../types';
import { soundFx } from '../utils/soundEffects';

interface ProjectsShowcaseProps {
  onSelectProject: (project: Project) => void;
}

export default function ProjectsShowcase({ onSelectProject }: ProjectsShowcaseProps) {
  const [filter, setFilter] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Stacks' },
    { id: 'frontend', label: 'Frontend UI' },
    { id: 'mern', label: 'MERN Stack' },
    { id: 'php', label: 'PHP & MySQL' },
    { id: 'api', label: 'APIs & Services' },
  ];

  const filteredProjects = filter === 'all'
    ? PROJECTS
    : PROJECTS.filter(p => {
        const cat = p.category.toLowerCase();
        const stack = p.techStack.map(t => t.toLowerCase());
        if (filter === 'frontend') {
          return cat.includes('frontend') || cat.includes('react') || cat.includes('ui') || stack.some(t => t.includes('react') || t.includes('tailwind'));
        }
        if (filter === 'mern') {
          return cat.includes('mern') || cat.includes('node') || cat.includes('mongo') || stack.some(t => t.includes('mern') || t.includes('express'));
        }
        if (filter === 'php') {
          return cat.includes('php') || cat.includes('mysql') || stack.some(t => t.includes('php') || t.includes('mysql'));
        }
        if (filter === 'api') {
          return cat.includes('api') || cat.includes('backend') || cat.includes('microservices') || stack.some(t => t.includes('rest') || t.includes('api'));
        }
        return cat.includes(filter.toLowerCase());
      });

  return (
    <section id="projects" className="py-24 px-6 sm:px-12 bg-[#FAF9F6] border-b border-[#0A0A0A]/10 relative text-[#0A0A0A]">
      
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#0A0A0A]/15 pb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono-code font-bold uppercase tracking-[0.25em] text-[#601212] mb-2">
              <span className="w-2.5 h-2.5 bg-[#601212]" />
              <span>Catalog 2026 // Full Stack Blueprints</span>
            </div>
            <h2 className="text-4xl sm:text-6xl font-serif-editorial font-black text-[#0A0A0A]">
              FEATURED <span className="italic font-normal text-[#601212]">PROJECTS</span>
            </h2>
          </div>

          <p className="text-sm text-[#0A0A0A]/70 max-w-md font-light">
            Architected for scalability, modular maintainability, and clean editorial UI aesthetics using MERN stack, PHP 8, and relational databases.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 bg-[#EFDBCF] p-3 border border-[#0A0A0A]/15">
          <div className="flex items-center gap-2 text-xs font-mono-code font-bold uppercase text-[#0A0A0A] px-2">
            <Filter className="w-4 h-4 text-[#601212]" />
            <span>Filter Stack:</span>
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => {
                  soundFx.playClick();
                  setFilter(cat.id);
                }}
                onMouseEnter={() => soundFx.playHover()}
                data-cursor={cat.label}
                className={`px-4 py-2 text-xs font-mono-code uppercase font-bold transition-all border ${
                  filter === cat.id
                    ? 'bg-[#601212] text-[#FAF9F6] border-[#601212]'
                    : 'bg-[#FAF9F6] text-[#0A0A0A] border-[#0A0A0A]/20 hover:border-[#601212]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, idx) => (
              <motion.article
                key={project.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                className="bg-[#FAF9F6] border border-[#0A0A0A]/15 flex flex-col justify-between group hover:border-[#601212] transition-colors shadow-sm rounded-2xl overflow-hidden"
              >
                
                {/* Image & Header */}
                <div>
                  <div className="relative aspect-[16/9] overflow-hidden border-b border-[#0A0A0A]/15 bg-[#601212]">
                    <img
                      src={project.heroImage}
                      alt={project.title}
                      className="w-full h-full object-cover grayscale contrast-125 group-hover:filter-none group-hover:scale-105 transition-all duration-700"
                    />
                    <div className="absolute top-4 left-4 bg-[#FAF9F6] px-3 py-1 border border-[#0A0A0A]/20 text-[10px] font-mono-code font-bold uppercase tracking-widest text-[#0A0A0A]">
                      0{idx + 1} // {project.category}
                    </div>

                    <div className="absolute top-4 right-4 bg-[#601212] text-[#FAF9F6] px-3 py-1 text-[10px] font-mono-code uppercase tracking-widest font-bold">
                      {project.year}
                    </div>
                  </div>

                  {/* Body Info */}
                  <div className="p-8 space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-2xl font-serif-editorial font-bold text-[#0A0A0A] group-hover:text-[#601212] transition-colors">
                        {project.title}
                      </h3>
                      {project.metrics && project.metrics[0] && (
                        <span className="text-xs font-mono-code text-[#601212] font-bold">
                          {project.metrics[0].value}
                        </span>
                      )}
                    </div>

                    <p className="text-xs font-mono-code font-bold uppercase tracking-wider text-[#601212]">
                      {project.subtitle}
                    </p>

                    <p className="text-sm text-[#0A0A0A]/80 line-clamp-3 leading-relaxed">
                      {project.overview}
                    </p>

                    {/* Tech Badges */}
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {project.techStack.map(tech => (
                        <span
                          key={tech}
                          className="px-2.5 py-1 bg-[#EFDBCF] text-[#0A0A0A] border border-[#0A0A0A]/10 text-[10px] font-mono-code uppercase font-semibold"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer Controls */}
                <div className="p-6 border-t border-[#0A0A0A]/15 bg-[#EFDBCF]/30 flex flex-wrap items-center justify-between gap-4">
                  <button
                    onClick={() => {
                      soundFx.playClick();
                      onSelectProject(project);
                    }}
                    onMouseEnter={() => soundFx.playHover()}
                    data-cursor="SPECS"
                    className="text-xs font-mono-code font-bold uppercase tracking-widest text-[#601212] hover:text-[#3B0A0A] flex items-center gap-2 group/btn"
                  >
                    <span>Inspect System Specs</span>
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </button>

                  <div className="flex items-center gap-2">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => soundFx.playClick()}
                        data-cursor="REPO"
                        aria-label="GitHub Repository"
                        className="w-9 h-9 border border-[#0A0A0A]/20 bg-[#FAF9F6] flex items-center justify-center text-[#0A0A0A] hover:bg-[#601212] hover:text-[#FAF9F6] transition-colors"
                      >
                        <Github className="w-4 h-4" />
                      </a>
                    )}

                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => soundFx.playClick()}
                        data-cursor="DEMO"
                        aria-label="Live Demo"
                        className="w-9 h-9 border border-[#0A0A0A]/20 bg-[#FAF9F6] flex items-center justify-center text-[#0A0A0A] hover:bg-[#601212] hover:text-[#FAF9F6] transition-colors"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>

              </motion.article>
            ))}
          </AnimatePresence>
        </div>

      </div>

    </section>
  );
}
