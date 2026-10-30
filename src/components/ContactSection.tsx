import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Send, CheckCircle2, Github, Linkedin, ArrowUpRight } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { soundFx } from '../utils/soundEffects';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'Project Inquiry',
    message: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    soundFx.playClick();
    setIsSending(true);

    setTimeout(() => {
      setIsSending(false);
      setIsSubmitted(true);
      soundFx.playSuccess();
    }, 800);
  };

  return (
    <section id="contact" className="py-24 px-6 sm:px-12 bg-[#FAF9F6] border-b border-[#0A0A0A]/10 relative">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#0A0A0A]/15 pb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono-code font-bold uppercase tracking-[0.25em] text-[#601212] mb-2">
              <span className="w-2 h-2 bg-[#601212]" />
              <span>05 / Communication Channel</span>
            </div>
            <h2 className="text-4xl sm:text-6xl font-serif-editorial font-black text-[#0A0A0A]">
              LET'S <span className="italic font-normal text-[#601212]">CONNECT</span>
            </h2>
          </div>

          <p className="text-sm text-[#0A0A0A]/80 max-w-md font-light">
            Have a project, engineering opportunity, or technical inquiry? Send a direct message or connect via GitHub and LinkedIn.
          </p>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Info Panel */}
          <div className="lg:col-span-5 space-y-8">
            <div className="p-8 bg-[#EFDBCF] border border-[#0A0A0A]/15 space-y-6">
              <span className="text-xs font-mono-code uppercase font-bold tracking-widest text-[#601212] block border-b border-[#0A0A0A]/10 pb-2">
                Direct Contact Telemetry
              </span>

              <div className="space-y-4 text-xs font-mono-code">
                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-[#601212] shrink-0 mt-0.5" />
                  <div>
                    <span className="block text-[10px] text-[#0A0A0A]/60 uppercase">Email Address</span>
                    <a
                      href={`mailto:${PERSONAL_INFO.email}`}
                      className="font-bold text-[#0A0A0A] hover:text-[#601212] transition-colors"
                    >
                      {PERSONAL_INFO.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-[#601212] shrink-0 mt-0.5" />
                  <div>
                    <span className="block text-[10px] text-[#0A0A0A]/60 uppercase">Phone Contact</span>
                    <a
                      href={`tel:${PERSONAL_INFO.phone}`}
                      className="font-bold text-[#0A0A0A] hover:text-[#601212] transition-colors"
                    >
                      {PERSONAL_INFO.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#601212] shrink-0 mt-0.5" />
                  <div>
                    <span className="block text-[10px] text-[#0A0A0A]/60 uppercase">Location</span>
                    <span className="font-bold text-[#0A0A0A]">
                      {PERSONAL_INFO.location}
                    </span>
                  </div>
                </div>
              </div>

              {/* Social Channels */}
              <div className="pt-4 border-t border-[#0A0A0A]/10 space-y-3">
                <span className="text-[10px] font-mono-code text-[#0A0A0A]/60 uppercase tracking-wider block">
                  Professional Networks
                </span>

                <div className="flex gap-3">
                  <a
                    href={PERSONAL_INFO.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => soundFx.playClick()}
                    className="flex-1 py-3 bg-[#FAF9F6] border border-[#0A0A0A]/20 text-[#0A0A0A] font-mono-code text-xs font-bold uppercase tracking-widest text-center hover:bg-[#601212] hover:text-[#FAF9F6] transition-colors flex items-center justify-center gap-2"
                  >
                    <Github className="w-4 h-4" />
                    <span>GitHub</span>
                  </a>

                  <a
                    href={PERSONAL_INFO.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => soundFx.playClick()}
                    className="flex-1 py-3 bg-[#601212] text-[#FAF9F6] font-mono-code text-xs font-bold uppercase tracking-widest text-center hover:bg-[#3B0A0A] transition-colors flex items-center justify-center gap-2"
                  >
                    <Linkedin className="w-4 h-4" />
                    <span>LinkedIn</span>
                  </a>
                </div>
              </div>

            </div>
          </div>

          {/* Right Form Panel */}
          <div className="lg:col-span-7 bg-[#FAF9F6] border border-[#0A0A0A]/15 p-8 shadow-sm">
            {isSubmitted ? (
              <div className="py-16 text-center space-y-4 font-mono-code">
                <div className="w-12 h-12 bg-[#601212] text-[#FAF9F6] mx-auto flex items-center justify-center rounded-full">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-serif-editorial font-bold text-[#0A0A0A]">
                  Message Dispatched Successfully!
                </h3>
                <p className="text-xs text-[#0A0A0A]/70 max-w-sm mx-auto">
                  Thank you for reaching out. Lakshmi Kumari will respond to your inquiry shortly.
                </p>
                <button
                  onClick={() => {
                    soundFx.playClick();
                    setIsSubmitted(false);
                    setFormData({ name: '', email: '', subject: 'Project Inquiry', message: '' });
                  }}
                  className="px-6 py-2.5 bg-[#EFDBCF] text-[#0A0A0A] text-xs font-bold uppercase tracking-widest border border-[#0A0A0A]/20 hover:bg-[#601212] hover:text-[#FAF9F6] transition-colors"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5 text-xs font-mono-code">
                <div className="border-b border-[#0A0A0A]/10 pb-2">
                  <span className="text-xs font-bold uppercase tracking-widest text-[#601212]">
                    Send Direct Inquiry
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block uppercase font-bold text-[#0A0A0A] mb-1">Your Name</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g., Alex Mercer"
                      className="w-full px-4 py-3 bg-[#EFDBCF]/40 border border-[#0A0A0A]/20 text-[#0A0A0A] focus:outline-none focus:border-[#601212]"
                    />
                  </div>

                  <div>
                    <label className="block uppercase font-bold text-[#0A0A0A] mb-1">Your Email</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g., alex@company.com"
                      className="w-full px-4 py-3 bg-[#EFDBCF]/40 border border-[#0A0A0A]/20 text-[#0A0A0A] focus:outline-none focus:border-[#601212]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block uppercase font-bold text-[#0A0A0A] mb-1">Subject</label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-3 bg-[#EFDBCF]/40 border border-[#0A0A0A]/20 text-[#0A0A0A] focus:outline-none focus:border-[#601212]"
                  >
                    <option value="Project Inquiry">Full Stack Project Inquiry</option>
                    <option value="Recruitment">Senior Role Opportunity</option>
                    <option value="Consulting">MERN / PHP Systems Consulting</option>
                    <option value="General">General Technical Inquiry</option>
                  </select>
                </div>

                <div>
                  <label className="block uppercase font-bold text-[#0A0A0A] mb-1">Message Details</label>
                  <textarea
                    rows={5}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Describe your project scope, requirements, or technical goals..."
                    className="w-full px-4 py-3 bg-[#EFDBCF]/40 border border-[#0A0A0A]/20 text-[#0A0A0A] focus:outline-none focus:border-[#601212]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSending}
                  data-cursor="TRANSMIT"
                  className="w-full py-4 bg-[#601212] hover:bg-[#3B0A0A] text-[#FAF9F6] font-bold uppercase tracking-[0.2em] transition-colors flex items-center justify-center gap-2 shadow-md"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSending ? 'Transmitting...' : 'Dispatch Message'}</span>
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
}
