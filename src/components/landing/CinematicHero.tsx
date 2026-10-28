import React, { useRef, useEffect, useState } from 'react';
import { Play, ArrowRight, Layers, Bot, Sparkles } from 'lucide-react';
import { ViewMode } from '../../types';

interface CinematicHeroProps {
  onBeginJourney: () => void;
  onNavigate: (view: ViewMode) => void;
}

export const CinematicHero: React.FC<CinematicHeroProps> = ({
  onBeginJourney,
  onNavigate,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoOpacity, setVideoOpacity] = useState<number>(0);
  const animFrameRef = useRef<number | null>(null);

  // Precision 0.5s fade-in/fade-out loop logic using requestAnimationFrame
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let isEndedHandling = false;

    const updateLoop = () => {
      if (video && !video.paused && video.duration > 0 && !isEndedHandling) {
        const currentTime = video.currentTime;
        const duration = video.duration;
        const fadeTime = 0.5;

        let targetOpacity = 0.85;

        if (currentTime < fadeTime) {
          targetOpacity = Math.max(0, Math.min(0.85, (currentTime / fadeTime) * 0.85));
        } else if (currentTime > duration - fadeTime) {
          targetOpacity = Math.max(0, Math.min(0.85, ((duration - currentTime) / fadeTime) * 0.85));
        } else {
          targetOpacity = 0.85;
        }

        setVideoOpacity(targetOpacity);
      }
      animFrameRef.current = requestAnimationFrame(updateLoop);
    };

    const handleEnded = () => {
      isEndedHandling = true;
      setVideoOpacity(0);
      setTimeout(() => {
        if (video) {
          video.currentTime = 0;
          video.play().catch(() => {});
          isEndedHandling = false;
        }
      }, 100);
    };

    video.addEventListener('ended', handleEnded);
    video.play().catch(() => {});
    animFrameRef.current = requestAnimationFrame(updateLoop);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      video.removeEventListener('ended', handleEnded);
    };
  }, []);

  const chapters = [
    {
      id: 'mat-1',
      title: 'Neural Architectures & Transformers',
      subtitle: 'Chapter 01 · Deep Learning',
      image: 'https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/cd2d844f-ae3f-4fa9-8067-b077530b6e71.webp',
      view: 'flashcards' as ViewMode,
    },
    {
      id: 'mat-2',
      title: 'Internet Protocols & TCP/IP Stack',
      subtitle: 'Chapter 02 · Computer Networks',
      image: 'https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/48f5b97e-c27c-4afd-9427-eb35aebd1751.webp',
      view: 'materials' as ViewMode,
    },
    {
      id: 'mat-3',
      title: 'Molecular Genetics & CRISPR Editing',
      subtitle: 'Chapter 03 · Life Sciences',
      image: 'https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/cde5384e-ce4d-423f-925a-451b779066e0.webp',
      view: 'quiz' as ViewMode,
    },
  ];

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#FAFAF8] text-[#000000] font-sans selection:bg-black selection:text-white">
      {/* ================= UNIFIED CINEMATIC BACKGROUND ================= */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Still Plate */}
        <img
          src="https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/3ca5d10d-ea2f-4907-876f-33bde169469e.jpg"
          alt="Meadowbell Hillside"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Looping video: grass ripples and clouds drift */}
        <video
          src="https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/d2cb5bef-f92b-4e91-ae93-8dc6555e56ac.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full object-cover"
          style={{ width: '100%', height: '112.5%', top: '-6.25%' }}
        />

        {/* Aethera Ethereal video overlay with smooth 0.5s fade-in/fade-out loop */}
        <video
          ref={videoRef}
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260328_083109_283f3553-e28f-428b-a723-d639c617eb2b.mp4"
          muted
          playsInline
          preload="auto"
          style={{
            opacity: videoOpacity * 0.45,
            transition: 'opacity 0.05s linear',
          }}
          className="absolute inset-0 w-full h-full object-cover mix-blend-overlay pointer-events-none"
        />

        {/* Soft atmospheric gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#FAFAF8]/90 via-[#FAFAF8]/35 to-[#FAFAF8]/95 pointer-events-none" />
      </div>

      {/* ================= HERO SECTION (z-10) ================= */}
      <section
        className="relative z-10 flex flex-col items-center justify-center text-center px-6 max-w-7xl mx-auto"
        style={{ paddingTop: 'calc(10rem - 40px)', paddingBottom: '140px' }}
      >
        {/* Kicker badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 backdrop-blur-md border border-black/10 text-xs font-bold tracking-wide text-[#000000] mb-8 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-[#5B875C]" />
          <span>AUTONOMOUS LEARNING STUDIO</span>
        </div>

        {/* Headline: Punchy, Modern Neo-Grotesque Sans (NOT Serif!) */}
        <h1 className="font-display text-5xl sm:text-7xl md:text-8xl max-w-5xl font-black text-[#000000] tracking-tight leading-[1.04] animate-fade-rise">
          Learn Smarter. <span className="text-[#6F6F6F]">Remember Longer.</span>
        </h1>

        {/* Description in Plus Jakarta Sans */}
        <p className="text-base sm:text-lg max-w-2xl mt-7 leading-relaxed text-[#6F6F6F] animate-fade-rise-delay font-medium">
          Building platforms for brilliant minds, fearless makers, and thoughtful souls.
          Through the noise, we craft digital havens for deep work and pure flows.
        </p>

        {/* Hero CTA Button */}
        <button
          onClick={onBeginJourney}
          className="rounded-full px-14 py-5 text-base font-bold mt-12 bg-[#000000] text-[#FFFFFF] hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 shadow-xl hover:shadow-2xl animate-fade-rise-delay-2 select-none"
        >
          Begin Journey
        </button>

        {/* Quick Study Navigation Pills */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-3 animate-fade-rise-delay-2 font-semibold">
          <button
            onClick={() => onNavigate('dashboard')}
            className="px-6 py-2.5 rounded-full text-xs bg-white/90 hover:bg-white text-black border border-black/10 backdrop-blur-md transition-all shadow-sm flex items-center gap-2 hover:scale-105 active:scale-95"
          >
            <span>Learning Dashboard</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => onNavigate('tutor')}
            className="px-6 py-2.5 rounded-full text-xs bg-white/90 hover:bg-white text-black border border-black/10 backdrop-blur-md transition-all shadow-sm flex items-center gap-2 hover:scale-105 active:scale-95"
          >
            <Bot className="w-3.5 h-3.5 text-[#5B875C]" />
            <span>AI Study Tutor</span>
          </button>
          <button
            onClick={() => onNavigate('flashcards')}
            className="px-6 py-2.5 rounded-full text-xs bg-white/90 hover:bg-white text-black border border-black/10 backdrop-blur-md transition-all shadow-sm flex items-center gap-2 hover:scale-105 active:scale-95"
          >
            <Layers className="w-3.5 h-3.5 text-blue-600" />
            <span>3D Flashcards</span>
          </button>
        </div>
      </section>

      {/* ================= CHAPTERS ROW ================= */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 pb-24">
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-[#000000] uppercase">
            CHAPTERS
          </h2>
          <button
            onClick={() => onNavigate('materials')}
            className="text-sm text-[#6F6F6F] hover:text-black font-semibold transition-colors flex items-center gap-1"
          >
            <span>browse all chapters</span>
            <span className="text-base">&rsaquo;</span>
          </button>
        </div>

        {/* Three 378x273 Cards with Hover Lift and Art Zoom 1.05 */}
        <div className="grid md:grid-cols-3 gap-6">
          {chapters.map(chapter => (
            <div
              key={chapter.id}
              onClick={() => onNavigate(chapter.view)}
              className="group relative h-[273px] rounded-[18px] overflow-hidden cursor-pointer shadow-[0_10px_30px_rgba(28,70,120,0.08)] hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 select-none border border-black/5 bg-white"
            >
              <img
                src={chapter.image}
                alt={chapter.title}
                className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.05]"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent pointer-events-none" />

              <div className="absolute bottom-5 left-5 z-10 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                  <Play className="w-4 h-4 fill-current ml-0.5 text-black" />
                </div>
                <div className="text-left text-white">
                  <span className="text-[11px] font-semibold tracking-wider uppercase opacity-85 block">
                    {chapter.subtitle}
                  </span>
                  <h3 className="text-sm font-bold line-clamp-1">
                    {chapter.title}
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
