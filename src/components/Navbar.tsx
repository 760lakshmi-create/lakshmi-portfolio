import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'motion/react';
import { Volume2, VolumeX, Menu, X, Github, Sun, Moon } from 'lucide-react';
import { soundFx } from '../utils/soundEffects';
import { PERSONAL_INFO } from '../data/portfolioData';

interface NavbarProps {
  activeSection: string;
  isDarkMode?: boolean;
  onToggleTheme?: () => void;
}

export default function Navbar({ activeSection, isDarkMode = false, onToggleTheme }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMuted, setIsMuted] = useState(soundFx.getMuted());
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState('');

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };

    const updateClock = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      };
      setCurrentTime(new Intl.DateTimeFormat('en-US', options).format(now));
    };

    updateClock();
    const interval = setInterval(updateClock, 1000);
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(interval);
    };
  }, []);

  const toggleSound = () => {
    const muted = soundFx.toggleMute();
    setIsMuted(muted);
  };

  const navLinks = [
    { name: 'Core', href: '#hero', id: 'hero' },
    { name: 'Projects', href: '#projects', id: 'projects' },
    { name: 'CRUD Lab', href: '#live-crud-lab', id: 'live-crud-lab', badge: 'Live' },
    { name: 'Ecosystem', href: '#skills', id: 'skills' },
    { name: 'Journey', href: '#journey', id: 'journey' },
    { name: 'Contact', href: '#contact', id: 'contact' },
  ];

  return (
    <>
      {/* Top Scroll Progress Indicator Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] bg-[#601212] z-50 origin-left"
        style={{ scaleX }}
      />

      <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled 
          ? (isDarkMode ? 'bg-[#0E0D0D]/90 backdrop-blur-md border-b border-[#FAF9F6]/10 py-3 shadow-xs' : 'bg-[#FAF9F6]/90 backdrop-blur-md border-b border-[#0A0A0A]/10 py-3 shadow-xs') 
          : 'bg-transparent py-4'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-8 flex items-center justify-between">
          
          {/* Brand Monogram & Name - Click or Double Click for Audio Chime */}
          <a
            href="#hero"
            onClick={() => soundFx.playClick()}
            onDoubleClick={(e) => {
              e.preventDefault();
              soundFx.playDoubleTapChime();
            }}
            data-cursor="CLICK / 2x CHIME"
            title="Lakshmi Kumari | Click or Double-click for audio chime 🎵"
            className="flex items-center gap-2.5 group select-none cursor-pointer"
          >
            <div className="w-8 h-8 bg-[#601212] text-[#FAF9F6] font-serif-editorial font-bold text-sm flex items-center justify-center transition-transform group-hover:scale-105 shadow-xs relative">
              LK
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-mono-code font-bold tracking-[0.2em] uppercase group-hover:text-[#601212] transition-colors leading-tight flex items-center gap-1">
                LAKSHMI KUMARI
              </span>
              <span className="text-[9px] font-mono-code opacity-50 uppercase tracking-widest leading-none mt-0.5">
                Full Stack Architect
              </span>
            </div>
          </a>

          {/* Clean Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7 text-[11px] font-mono-code font-semibold tracking-[0.18em] uppercase">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={() => soundFx.playClick()}
                  onMouseEnter={() => soundFx.playHover()}
                  data-cursor={link.name}
                  className={`relative py-1 transition-colors flex items-center gap-1.5 ${
                    isActive ? 'text-[#601212] font-bold' : 'opacity-60 hover:opacity-100'
                  }`}
                >
                  <span>{link.name}</span>
                  {link.badge && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#601212] animate-pulse" />
                  )}
                  {isActive && (
                    <motion.div
                      layoutId="activeUnderline"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#601212]"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Right Action Controls */}
          <div className="flex items-center gap-2.5">
            {/* Live IST Time */}
            <div className="hidden xl:flex items-center gap-1.5 text-[10px] font-mono-code tracking-wider opacity-60 mr-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
              <span>IST {currentTime || 'KOLKATA'}</span>
            </div>

            {/* Audio Toggle */}
            <button
              onClick={toggleSound}
              data-cursor={isMuted ? 'UNMUTE' : 'MUTE'}
              aria-label="Toggle Audio"
              title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
              className="w-8 h-8 border border-current opacity-80 flex items-center justify-center hover:text-[#601212] hover:opacity-100 transition-colors"
            >
              {isMuted ? <VolumeX className="w-3.5 h-3.5 opacity-50" /> : <Volume2 className="w-3.5 h-3.5 text-[#601212]" />}
            </button>

            {/* Dark/Light Mode Theme Toggle */}
            {onToggleTheme && (
              <button
                onClick={() => {
                  soundFx.playClick();
                  onToggleTheme();
                }}
                data-cursor={isDarkMode ? 'LIGHT' : 'DARK'}
                aria-label="Toggle Dark/Light Mode"
                title={isDarkMode ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
                className="w-8 h-8 border border-current opacity-80 flex items-center justify-center hover:opacity-100 transition-colors"
              >
                {isDarkMode ? <Sun className="w-3.5 h-3.5 text-amber-400" /> : <Moon className="w-3.5 h-3.5 text-[#601212]" />}
              </button>
            )}

            {/* GitHub Link */}
            <a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="GITHUB"
              aria-label="GitHub Profile"
              title="GitHub Profile"
              className="hidden sm:flex w-8 h-8 border border-current opacity-80 items-center justify-center hover:text-[#601212] hover:opacity-100 transition-colors"
            >
              <Github className="w-3.5 h-3.5" />
            </a>

            {/* Mobile Menu Button */}
            <button
              onClick={() => {
                setMobileMenuOpen(!mobileMenuOpen);
              }}
              aria-label="Toggle Menu"
              className="lg:hidden w-8 h-8 bg-[#601212] text-[#FAF9F6] flex items-center justify-center"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>

        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-30 bg-[#FAF9F6] px-6 pt-24 pb-8 flex flex-col justify-between lg:hidden"
          >
            <div className="space-y-4">
              <div className="flex justify-between items-center border-b border-[#0A0A0A]/10 pb-3">
                <span className="text-[10px] font-mono-code text-[#0A0A0A]/50 uppercase tracking-[0.25em]">
                  Navigation Directory
                </span>
                <span className="text-[10px] font-mono-code text-emerald-700 font-bold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
                  Available for Hire
                </span>
              </div>

              <div className="flex flex-col">
                {navLinks.map((link) => (
                  <a
                    key={link.id}
                    href={link.href}
                    onClick={() => {
                      setMobileMenuOpen(false);
                    }}
                    className="flex items-center justify-between text-xl font-serif-editorial text-[#0A0A0A] hover:text-[#601212] py-3 border-b border-[#0A0A0A]/10 transition-colors"
                  >
                    <span>{link.name}</span>
                    <span className="text-xs font-mono-code text-[#601212]">→</span>
                  </a>
                ))}
              </div>
            </div>

            <div className="space-y-3 pt-4 border-t border-[#0A0A0A]/10 text-xs font-mono-code">
              <div className="flex gap-2">
                <a
                  href={PERSONAL_INFO.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2.5 border border-[#0A0A0A]/20 text-center uppercase tracking-widest font-bold text-[10px] hover:bg-[#601212] hover:text-[#FAF9F6] hover:border-[#601212] transition-colors"
                >
                  GitHub
                </a>
                <a
                  href={PERSONAL_INFO.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2.5 border border-[#0A0A0A]/20 text-center uppercase tracking-widest font-bold text-[10px] hover:bg-[#601212] hover:text-[#FAF9F6] hover:border-[#601212] transition-colors"
                >
                  LinkedIn
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

