import React from 'react';
import { motion } from 'motion/react';
import { JOURNEY_MILESTONES } from '../data/portfolioData';
import { Calendar, MapPin, Award, CheckCircle2, ArrowUpRight } from 'lucide-react';
import { soundFx } from '../utils/soundEffects';

export default function JourneyTimeline() {
  return (
    <section id="journey" className="py-24 px-6 sm:px-12 bg-[#FAF9F6] border-b border-[#0A0A0A]/10 relative">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#0A0A0A]/15 pb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono-code font-bold uppercase tracking-[0.25em] text-[#601212] mb-2">
              <span className="w-2 h-2 bg-[#601212]" />
              <span>04 / Experience & Engineering History</span>
            </div>
            <h2 className="text-4xl sm:text-6xl font-serif-editorial font-black text-[#0A0A0A]">
              PROFESSIONAL <span className="italic font-normal text-[#601212]">JOURNEY</span>
            </h2>
          </div>

          <p className="text-sm text-[#0A0A0A]/80 max-w-md font-light">
            My career trajectory spanning full stack software development, PHP backend microservices, e-commerce production architecture, and academic excellence.
          </p>
        </div>

        {/* Timeline Rail */}
        <div className="relative border-l-2 border-[#0A0A0A]/20 ml-4 sm:ml-8 pl-6 sm:pl-10 space-y-12">
          {JOURNEY_MILESTONES.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="relative group"
            >
              {/* Timeline Bullet Node */}
              <div className="absolute -left-[31px] sm:-left-[47px] top-1.5 w-5 h-5 bg-[#FAF9F6] border-2 border-[#601212] flex items-center justify-center group-hover:bg-[#601212] transition-colors">
                <div className="w-1.5 h-1.5 bg-[#601212] group-hover:bg-[#FAF9F6]" />
              </div>

              {/* Card Surface */}
              <div className="p-8 bg-[#EFDBCF]/40 border border-[#0A0A0A]/15 hover:border-[#601212] transition-colors shadow-sm space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#0A0A0A]/10 pb-3">
                  <div className="flex items-center gap-2 text-xs font-mono-code font-bold text-[#601212]">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{item.period}</span>
                  </div>

                  <span className="text-[10px] font-mono-code uppercase font-bold text-[#0A0A0A]/60 bg-[#FAF9F6] px-2.5 py-1 border border-[#0A0A0A]/10">
                    {item.organization}
                  </span>
                </div>

                <div>
                  <h3 className="text-2xl font-serif-editorial font-bold text-[#0A0A0A]">
                    {item.title}
                  </h3>
                  <p className="text-xs font-mono-code uppercase tracking-wider font-bold text-[#601212] pt-1">
                    {item.role}
                  </p>
                </div>

                <p className="text-sm text-[#0A0A0A]/80 font-light leading-relaxed">
                  {item.description}
                </p>

                {/* Key Achievements */}
                <div className="space-y-2 pt-2">
                  {item.keyAchievements.map((ach, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs font-mono-code text-[#0A0A0A]/80">
                      <CheckCircle2 className="w-4 h-4 text-[#601212] shrink-0 mt-0.5" />
                      <span>{ach}</span>
                    </div>
                  ))}
                </div>

                {/* Tech Used Pills */}
                <div className="flex flex-wrap gap-1.5 pt-3 border-t border-[#0A0A0A]/10">
                  {item.techUsed.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 bg-[#FAF9F6] border border-[#0A0A0A]/15 text-[10px] font-mono-code uppercase font-semibold text-[#0A0A0A]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
