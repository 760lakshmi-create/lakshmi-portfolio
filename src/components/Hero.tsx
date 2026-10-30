import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowDownRight, Terminal, Cpu, CheckCircle2, ArrowUpRight, Github, Linkedin, Sparkles, Camera, RotateCcw, Download, FileText } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { soundFx } from '../utils/soundEffects';

const DEFAULT_IMAGE = "public/profile.jpeg"; // Default profile photo path

export default function Hero() {
  const [activeTab, setActiveTab] = useState<'stack' | 'database' | 'architecture'>('stack');
  const [heroImage, setHeroImage] = useState<string>(() => {
    return localStorage.getItem('portfolio_hero_image') || DEFAULT_IMAGE;
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setHeroImage(result);
        localStorage.setItem('portfolio_hero_image', result);
        soundFx.playSuccess();
      };
      reader.readAsDataURL(file);
    }
  };

  const handleResetImage = () => {
    setHeroImage(DEFAULT_IMAGE);
    localStorage.removeItem('portfolio_hero_image');
    soundFx.playClick();
  };

  const handleDownloadResume = () => {
    soundFx.playSuccess();
    const resumeContent = `===================================================================
LAKSHMI KUMARI - FULL STACK ENGINEER & SYSTEMS ARCHITECT
Email: ${PERSONAL_INFO.email} | Phone: ${PERSONAL_INFO.phone}
Location: ${PERSONAL_INFO.location}
GitHub: ${PERSONAL_INFO.github} | LinkedIn: ${PERSONAL_INFO.linkedin}
===================================================================

PROFILE SUMMARY
-------------------------------------------------------------------
Full Stack Engineer specializing in high-concurrency MERN platforms,
PHP 8 OOP backends, and dual MongoDB & MySQL relational database systems.
Passionate about clean architecture, sub-20ms API response latency, and
WCAG-compliant editorial web interfaces.

CORE COMPETENCIES & TECH STACK
-------------------------------------------------------------------
- Frontend: React 19, TypeScript, Tailwind CSS, Motion/React, Next.js SPA
- Backend: Node.js, Express.js, PHP 8 OOP, RESTful Microservices, JWT Auth
- Databases: MongoDB (Mongoose, Aggregation Pipelines), MySQL 8 (3NF, PDO)
- Tools & Dev: Git, GitHub, Docker, Postman, Vite, Vercel, Linux CLI

FEATURED PROJECTS
-------------------------------------------------------------------
1. AURA / Flipkart Next - High-Concurrency MERN E-Commerce
   - Sub-18ms filter query latency with indexed MongoDB aggregation pipelines
   - Atomic shopping cart state and PHP legacy inventory sync

2. LUXE CRAFT / Haute Joaillerie - Full-Stack PHP & MySQL Platform
   - Bespoke jewelry catalog engine built on normalized 3NF MySQL schemas
   - PDO prepared statements with strict parameter binding

3. VELOCITY - High-Performance Editorial UI & Component Suite
   - Lightweight React 19 design system with Framer Motion transitions

EDUCATION & CERTIFICATIONS
-------------------------------------------------------------------
- Bachelor of Technology in Computer Science & Engineering
- Certified Full Stack MERN Developer

===================================================================
Downloaded from Lakshmi Kumari Portfolio 2026
`;

    const blob = new Blob([resumeContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Lakshmi_Kumari_Full_Stack_Resume.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <section id="hero" className="relative min-h-screen pt-28 pb-16 px-6 sm:px-12 flex flex-col justify-between bg-noise border-b border-[#0A0A0A]/10">
      
      {/* Decorative Editorial Background Geometry Lines */}
      <div className="absolute top-[30%] right-[32%] w-64 h-[1px] bg-[#0A0A0A]/10 rotate-45 pointer-events-none" />
      <div className="absolute bottom-[20%] left-[25%] w-32 h-32 border border-[#0A0A0A]/10 rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center my-auto">
        
        {/* Left Meta Vertical Rail + Title */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Eyebrow Tag */}
          <div className="inline-flex items-center gap-3 px-4 py-1.5 bg-[#EFDBCF] border border-[#0A0A0A]/15 text-[11px] font-mono-code font-bold uppercase tracking-[0.2em] text-[#0A0A0A]">
            <span className="w-2 h-2 rounded-full bg-[#601212] animate-ping" />
            <span>Full Stack Engineer • MERN & PHP Systems Architect</span>
          </div>

          {/* Main Giant Headline */}
          <div className="space-y-3">
            <h1 className="text-6xl sm:text-8xl xl:text-9xl font-serif-editorial font-black leading-[0.88] tracking-tighter text-[#0A0A0A]">
              LAKSHMI<br />
              <span className="italic font-normal text-[#601212]">KUMARI</span>
            </h1>

            <div className="flex items-center gap-4 pt-2">
              <div className="w-12 h-1 bg-[#601212]" />
              <p className="text-xs font-mono-code uppercase tracking-[0.3em] font-bold text-[#0A0A0A]/70">
                CREATIVE FULL STACK ENGINEERING // 2026
              </p>
            </div>
          </div>

          {/* Bio Description */}
          <p className="text-base sm:text-lg text-[#0A0A0A]/80 font-light max-w-2xl leading-relaxed">
            I engineer resilient, high-speed web platforms with an uncompromising focus on clean architecture, scalable database schemas (MongoDB & MySQL), and pristine editorial user interfaces using <strong className="font-semibold text-[#0A0A0A]">React 19, Node.js, Express, and PHP 8</strong>.
          </p>

          {/* Core Capability Selector */}
          <div className="p-5 bg-[#FAF9F6] border border-[#0A0A0A]/15 shadow-sm space-y-3">
            <div className="flex items-center justify-between text-xs font-mono-code text-[#0A0A0A]/70">
              <span className="flex items-center gap-1.5 uppercase font-bold tracking-wider text-[#601212]">
                <Cpu className="w-4 h-4" /> Architectural Core Stack
              </span>
              <span className="text-[10px] uppercase tracking-widest text-[#0A0A0A]/50">Select Stack Focus</span>
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => { soundFx.playClick(); setActiveTab('stack'); }}
                className={`px-4 py-2 text-xs font-mono-code uppercase font-bold transition-all border ${
                  activeTab === 'stack'
                    ? 'bg-[#601212] text-[#FAF9F6] border-[#601212]'
                    : 'bg-[#FAF9F6] text-[#0A0A0A] border-[#0A0A0A]/20 hover:border-[#601212]'
                }`}
              >
                MERN Stack
              </button>
              <button
                onClick={() => { soundFx.playClick(); setActiveTab('database'); }}
                className={`px-4 py-2 text-xs font-mono-code uppercase font-bold transition-all border ${
                  activeTab === 'database'
                    ? 'bg-[#601212] text-[#FAF9F6] border-[#601212]'
                    : 'bg-[#FAF9F6] text-[#0A0A0A] border-[#0A0A0A]/20 hover:border-[#601212]'
                }`}
              >
                MongoDB & MySQL
              </button>
              <button
                onClick={() => { soundFx.playClick(); setActiveTab('architecture'); }}
                className={`px-4 py-2 text-xs font-mono-code uppercase font-bold transition-all border ${
                  activeTab === 'architecture'
                    ? 'bg-[#601212] text-[#FAF9F6] border-[#601212]'
                    : 'bg-[#FAF9F6] text-[#0A0A0A] border-[#0A0A0A]/20 hover:border-[#601212]'
                }`}
              >
                PHP 8 Microservices
              </button>
            </div>

            <div className="text-xs text-[#0A0A0A]/80 font-mono-code pt-2 border-t border-[#0A0A0A]/10 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
              <span>
                {activeTab === 'stack' && 'Complete MERN CRUD lifecycle engineering with React 19 hooks & Express REST endpoints.'}
                {activeTab === 'database' && 'Hybrid MongoDB NoSQL document collections + normalized 3NF MySQL relational schemas.'}
                {activeTab === 'architecture' && 'PHP Object-Oriented microservices, PDO prepared statements, and JWT token authentication.'}
              </span>
            </div>
          </div>

          {/* CTAs Pair */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            {/* Primary Solid Button: View My Work */}
            <a
              href="#projects"
              onClick={() => soundFx.playClick()}
              onMouseEnter={() => soundFx.playHover()}
              data-cursor="WORK"
              className="px-8 py-4 bg-[#601212] hover:bg-[#3B0A0A] text-[#FAF9F6] font-mono-code text-xs uppercase tracking-[0.22em] font-bold transition-all shadow-lg flex items-center gap-3 group border border-[#601212]"
            >
              <span>View My Work</span>
              <ArrowDownRight className="w-4 h-4 group-hover:translate-x-1 group-hover:translate-y-1 transition-transform text-[#FAF9F6]" />
            </a>

            {/* Secondary Outline Button: Download Resume */}
            <button
              onClick={handleDownloadResume}
              onMouseEnter={() => soundFx.playHover()}
              data-cursor="RESUME"
              className="px-7 py-4 bg-transparent hover:bg-[#601212] hover:text-[#FAF9F6] text-[#0A0A0A] border-2 border-[#0A0A0A]/80 font-mono-code text-xs uppercase tracking-[0.2em] font-bold transition-all shadow-sm flex items-center gap-2.5 group"
            >
              <Download className="w-4 h-4 text-[#601212] group-hover:text-[#FAF9F6] transition-colors" />
              <span>Download Resume</span>
            </button>
          </div>

        </div>

        {/* Right Preview Feature Card */}
        <div className="lg:col-span-4 bg-[#EFDBCF] border border-[#0A0A0A]/15 p-8 relative flex flex-col justify-between shadow-xl">
          
          <div className="flex justify-between items-start mb-6">
            <span className="text-[10px] font-mono-code font-bold tracking-[0.3em] uppercase text-[#0A0A0A]">
              System Preview
            </span>
            <span className="text-xs font-serif-editorial font-bold text-[#601212]">
              v2026.4
            </span>
          </div>

          {/* Profile Frame with Photo Upload */}
          <div className="aspect-[3/4] bg-[#601212] mb-6 shadow-2xl relative overflow-hidden group">
            <img
              src={heroImage}
              alt="Lakshmi Kumari - Full Stack Engineer"
              className="w-full h-full object-cover filter contrast-105 group-hover:filter-none transition-all duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#3B0A0A]/90 via-transparent to-transparent opacity-80 pointer-events-none" />

            {/* Photo Upload Controls - Compact Icon Buttons */}
            <div className="absolute top-2.5 right-2.5 flex items-center gap-1.5 opacity-90 group-hover:opacity-100 transition-opacity z-10">
              <label
                data-cursor="PHOTO"
                title="Change Profile Photo"
                aria-label="Change Profile Photo"
                className="cursor-pointer w-7 h-7 bg-[#601212] text-[#FAF9F6] flex items-center justify-center hover:bg-[#3B0A0A] active:scale-95 transition-all shadow-md border border-[#FAF9F6]/30 rounded-xs"
              >
                <Camera className="w-3.5 h-3.5 text-[#EFDBCF]" />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
              {heroImage !== DEFAULT_IMAGE && (
                <button
                  onClick={handleResetImage}
                  title="Reset Default Photo"
                  aria-label="Reset Default Photo"
                  className="w-7 h-7 bg-[#FAF9F6] text-[#0A0A0A] hover:bg-[#EFDBCF] active:scale-95 transition-all shadow-md border border-[#0A0A0A]/20 rounded-xs flex items-center justify-center"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            <div className="absolute bottom-3 left-3 right-3 bg-[#FAF9F6] p-3 border border-[#0A0A0A]/20 shadow-md">
              <span className="block text-[9px] font-mono-code uppercase tracking-wider text-[#0A0A0A]/60">
                Core Competency
              </span>
              <span className="text-xs font-serif-editorial font-bold text-[#0A0A0A]">
                Full Stack MERN & PHP Systems
              </span>
            </div>
          </div>

          {/* Telemetry Grid */}
          <div className="grid grid-cols-2 gap-2 text-xs font-mono-code">
            {PERSONAL_INFO.stats.map((stat, idx) => (
              <div key={idx} className="bg-[#FAF9F6] p-2.5 border border-[#0A0A0A]/10">
                <span className="block text-[9px] text-[#0A0A0A]/60 uppercase">{stat.label}</span>
                <span className="font-bold text-[#601212] text-sm">{stat.value}</span>
              </div>
            ))}
          </div>

          <a
            href={PERSONAL_INFO.github}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => soundFx.playClick()}
            className="mt-6 flex items-center justify-between text-xs font-mono-code font-bold uppercase tracking-widest text-[#0A0A0A] hover:text-[#601212] transition-colors"
          >
            <span>GitHub Ecosystem</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>

        </div>

      </div>

      {/* Marquee Banner */}
      <div className="w-full mt-16 pt-6 border-t border-[#0A0A0A]/10 overflow-hidden">
        <div className="animate-marquee whitespace-nowrap flex items-center gap-8 text-xs font-mono-code text-[#0A0A0A]/70 uppercase tracking-[0.25em]">
          <span className="flex items-center gap-3 font-bold">
            <span className="w-2 h-2 bg-[#601212]" /> MERN STACK ARCHITECTURE
          </span>
          <span className="flex items-center gap-3">
            <span className="w-2 h-2 bg-[#D1B3B3]" /> REACT 19 & NODE.JS
          </span>
          <span className="flex items-center gap-3 font-bold">
            <span className="w-2 h-2 bg-[#601212]" /> PHP 8 & MYSQL RELATIONAL
          </span>
          <span className="flex items-center gap-3">
            <span className="w-2 h-2 bg-[#D1B3B3]" /> MONGODB BSON CLUSTERS
          </span>
          <span className="flex items-center gap-3 font-bold">
            <span className="w-2 h-2 bg-[#601212]" /> FLIPKART NEXT COMMERCE ENGINE
          </span>
          <span className="flex items-center gap-3">
            <span className="w-2 h-2 bg-[#D1B3B3]" /> HAUTE JOAILLERIE LUXE PLATFORM
          </span>
        </div>
      </div>

    </section>
  );
}
