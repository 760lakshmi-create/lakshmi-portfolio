import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Project } from '../types';
import { X, ExternalLink, Github, Layers, CheckCircle, Code } from 'lucide-react';
import { soundFx } from '../utils/soundEffects';

interface ProjectDetailModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectDetailModal({ project, onClose }: ProjectDetailModalProps) {
  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => {
            soundFx.playClick();
            onClose();
          }}
          className="fixed inset-0 bg-[#0A0A0A]/85 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-4xl bg-[#181515] border border-[#D1B3B3]/30 rounded-3xl shadow-2xl overflow-hidden z-10 my-8 text-[#FAF9F6] max-h-[90vh] flex flex-col"
        >
          {/* Header Bar */}
          <div className="p-6 sm:p-8 bg-gradient-to-r from-[#601212] via-[#3B0A0A] to-[#181515] border-b border-[#D1B3B3]/20 flex items-center justify-between shrink-0">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-[#FAF9F6] text-[#601212] text-[10px] font-mono-code font-bold uppercase">
                  {project.category}
                </span>
                <span className="text-xs font-mono-code text-[#EFDBCF]">
                  Year {project.year}
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-serif-editorial text-[#FAF9F6] pt-1">
                {project.title}
              </h2>
            </div>

            <button
              onClick={() => {
                soundFx.playClick();
                onClose();
              }}
              className="w-10 h-10 rounded-full bg-[#0A0A0A]/60 border border-[#D1B3B3]/30 flex items-center justify-center text-[#D1B3B3] hover:text-white hover:border-[#FAF9F6] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Scrollable Content */}
          <div className="p-6 sm:p-8 space-y-8 overflow-y-auto custom-scrollbar">
            {/* Tagline & Links */}
            <div className="space-y-4">
              <p className="text-lg font-serif-editorial text-[#EFDBCF] leading-relaxed italic">
                "{project.subtitle}"
              </p>
              <p className="text-sm text-[#D1B3B3] font-light leading-relaxed">
                {project.overview}
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => soundFx.playClick()}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#0A0A0A] border border-[#D1B3B3]/30 hover:border-[#EFDBCF] text-xs font-mono-code text-[#FAF9F6] transition-all"
                  >
                    <Github className="w-4 h-4" /> View Source Repository
                  </a>
                )}
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => soundFx.playChime()}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#601212] border border-[#D1B3B3]/40 hover:bg-[#832020] text-xs font-mono-code text-[#FAF9F6] font-semibold transition-all shadow-lg"
                  >
                    <ExternalLink className="w-4 h-4" /> Live Application
                  </a>
                )}
              </div>
            </div>

            {/* Metrics Highlights Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 p-5 rounded-2xl bg-[#0A0A0A] border border-[#D1B3B3]/20">
              {project.metrics.map((metric, mIdx) => (
                <div key={mIdx} className="space-y-1">
                  <span className="text-[10px] font-mono-code text-[#D1B3B3] uppercase block">
                    {metric.label}
                  </span>
                  <span className="text-2xl sm:text-3xl font-serif-editorial text-[#EFDBCF] font-bold block">
                    {metric.value}
                  </span>
                </div>
              ))}
            </div>

            {/* Core Features */}
            {project.features && project.features.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-xl font-serif-editorial text-[#FAF9F6] flex items-center gap-2 border-b border-[#D1B3B3]/20 pb-2">
                  <Layers className="w-5 h-5 text-[#EFDBCF]" /> System Features & Capabilities
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {project.features.map((feature, fIdx) => (
                    <div key={fIdx} className="p-4 rounded-xl bg-[#0A0A0A]/60 border border-[#D1B3B3]/20 flex items-start gap-3">
                      <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span className="text-xs text-[#FAF9F6]">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Code Optimization Comparison */}
            {project.codeComparison && (
              <div className="space-y-3">
                <h3 className="text-xl font-serif-editorial text-[#FAF9F6] flex items-center gap-2">
                  <Code className="w-5 h-5 text-[#EFDBCF]" /> Code Blueprint & Optimization
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-[#0A0A0A] border border-red-900/40 space-y-2">
                    <span className="text-[10px] font-mono-code text-red-400 uppercase tracking-widest block font-bold">
                      {project.codeComparison.beforeTitle}
                    </span>
                    <pre className="text-[11px] font-mono-code text-[#D1B3B3] overflow-x-auto whitespace-pre-wrap leading-relaxed">
                      {project.codeComparison.beforeCode}
                    </pre>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#0A0A0A] border border-emerald-900/40 space-y-2">
                    <span className="text-[10px] font-mono-code text-emerald-400 uppercase tracking-widest block font-bold">
                      {project.codeComparison.afterTitle}
                    </span>
                    <pre className="text-[11px] font-mono-code text-emerald-200 overflow-x-auto whitespace-pre-wrap leading-relaxed">
                      {project.codeComparison.afterCode}
                    </pre>
                  </div>
                </div>
                <p className="text-xs font-mono-code text-[#D1B3B3] italic pt-1">
                  Note: {project.codeComparison.explanation}
                </p>
              </div>
            )}

            {/* Stack Badges */}
            <div className="space-y-3 border-t border-[#D1B3B3]/20 pt-6">
              <span className="text-xs font-mono-code text-[#D1B3B3] uppercase block">
                Technology Stack & Tooling
              </span>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-3.5 py-1.5 rounded-full bg-[#0A0A0A] border border-[#D1B3B3]/30 text-xs font-mono-code text-[#EFDBCF]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Footer Bar */}
          <div className="p-4 sm:p-6 bg-[#0A0A0A] border-t border-[#D1B3B3]/20 flex items-center justify-between shrink-0">
            <span className="text-xs font-mono-code text-[#D1B3B3]">
              Geometric Balance Case Study
            </span>
            <button
              onClick={() => {
                soundFx.playClick();
                onClose();
              }}
              className="px-6 py-2 rounded-full bg-[#601212] hover:bg-[#832020] text-xs font-mono-code text-[#FAF9F6] font-semibold transition-all"
            >
              Close Blueprint
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
