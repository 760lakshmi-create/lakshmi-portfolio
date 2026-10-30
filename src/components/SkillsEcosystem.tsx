import React, { useState } from 'react';
import { motion } from 'motion/react';
import { SKILL_NODES } from '../data/portfolioData';
import { SkillCategory } from '../types';
import { Code, Server, Database, Wrench, Layers } from 'lucide-react';
import { soundFx } from '../utils/soundEffects';

export default function SkillsEcosystem() {
  const [activeCategory, setActiveCategory] = useState<string>('frontend');

  const categories: { id: SkillCategory; title: string }[] = [
    { id: 'frontend', title: 'Frontend Architecture' },
    { id: 'backend', title: 'Backend Services & APIs' },
    { id: 'database', title: 'Database Engines (SQL & NoSQL)' },
    { id: 'architecture', title: 'System Protocols & Design' },
    { id: 'tools', title: 'DevOps & Tooling' },
  ];

  const categoryIcons: Record<string, React.ReactNode> = {
    frontend: <Code className="w-4 h-4 text-[#601212]" />,
    backend: <Server className="w-4 h-4 text-[#601212]" />,
    database: <Database className="w-4 h-4 text-[#601212]" />,
    architecture: <Layers className="w-4 h-4 text-[#601212]" />,
    tools: <Wrench className="w-4 h-4 text-[#601212]" />,
  };

  const filteredSkills = SKILL_NODES.filter((skill) => skill.category === activeCategory);

  return (
    <section id="skills" className="py-24 px-6 sm:px-12 bg-[#FAF9F6] border-b border-[#0A0A0A]/10 relative text-[#0A0A0A]">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#0A0A0A]/15 pb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono-code font-bold uppercase tracking-[0.25em] text-[#601212] mb-2">
              <span className="w-2.5 h-2.5 bg-[#601212]" />
              <span>03 / Technical Competency Matrix</span>
            </div>
            <h2 className="text-4xl sm:text-6xl font-serif-editorial font-black text-[#0A0A0A]">
              ECOSYSTEM <span className="italic font-normal text-[#601212]">& STACK</span>
            </h2>
          </div>

          <p className="text-sm text-[#0A0A0A]/80 max-w-md font-light">
            Comprehensive breakdown of my engineering arsenal across full stack JavaScript (React, Node, Express), PHP 8 systems, and dual relational / document database engines.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-3 border-b border-[#0A0A0A]/15 pb-4">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                soundFx.playClick();
                setActiveCategory(cat.id);
              }}
              onMouseEnter={() => soundFx.playHover()}
              data-cursor={cat.title}
              className={`px-5 py-2.5 text-xs font-mono-code uppercase font-bold tracking-wider transition-all border flex items-center gap-2 rounded-xl ${
                activeCategory === cat.id
                  ? 'bg-[#601212] text-[#FAF9F6] border-[#601212]'
                  : 'bg-[#EFDBCF] text-[#0A0A0A] border-[#0A0A0A]/15 hover:border-[#601212]'
              }`}
            >
              {categoryIcons[cat.id]}
              <span>{cat.title}</span>
            </button>
          ))}
        </div>

        {/* Active Category Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSkills.map((skill, idx) => (
            <motion.div
              key={skill.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: idx * 0.05 }}
              className="p-6 bg-[#FAF9F6] border border-[#0A0A0A]/15 hover:border-[#601212] transition-colors shadow-sm flex flex-col justify-between rounded-2xl"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono-code font-bold uppercase tracking-widest text-[#0A0A0A]/50">
                    NODE 0{idx + 1}
                  </span>
                  <span className="text-xs font-mono-code font-bold text-[#601212] bg-[#EFDBCF] px-2.5 py-0.5 border border-[#0A0A0A]/10 rounded-full">
                    {skill.level}% Mastery
                  </span>
                </div>

                <div>
                  <h3 className="text-2xl font-serif-editorial font-bold text-[#0A0A0A]">
                    {skill.name}
                  </h3>
                  <span className="text-[11px] font-mono-code uppercase tracking-wider text-[#601212] font-semibold">
                    {skill.experienceYears} Practical Application
                  </span>
                </div>

                <p className="text-xs text-[#0A0A0A]/80 leading-relaxed font-light">
                  {skill.description}
                </p>
              </div>

              {/* Progress Bar */}
              <div className="mt-6 pt-4 border-t border-[#0A0A0A]/10 space-y-1">
                <div className="w-full h-2 bg-[#EFDBCF] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#601212] transition-all duration-1000"
                    style={{ width: `${skill.level}%` }}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
