import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, ArrowRightLeft, Sparkles, Pin, X } from 'lucide-react';
import books from '../data/books.json';
import verseTextsEn from '../data/verse-text.kjv.json';
import verseTextsKo from '../data/verse-text.ko.json';
import type { RenderLink } from './NetworkCanvas';

interface ReferenceCardProps {
  activeLink: RenderLink | null;
  pinnedLink: RenderLink | null;
  onUnpin: () => void;
}

export const ReferenceCard: React.FC<ReferenceCardProps> = ({ 
  activeLink,
  pinnedLink,
  onUnpin,
}) => {
  // OS prefers-reduced-motion 감지 상태
  const [shouldReduceMotion, setShouldReduceMotion] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    const handleMediaChange = (e: MediaQueryListEvent) => {
      setShouldReduceMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleMediaChange);
    return () => mediaQuery.removeEventListener('change', handleMediaChange);
  }, []);

  // 텍스트 조회용 헬퍼 키 생성 - 영어
  const getVerseTextEn = (bookIdx: number, chapter: number, verse: number) => {
    const key = `${bookIdx}.${chapter}.${verse}` as keyof typeof verseTextsEn;
    return verseTextsEn[key] || "Verse text loaded dynamically in full release.";
  };

  // 텍스트 조회용 헬퍼 키 생성 - 한국어
  const getVerseTextKo = (bookIdx: number, chapter: number, verse: number) => {
    const key = `${bookIdx}.${chapter}.${verse}` as keyof typeof verseTextsKo;
    return verseTextsKo[key] || "본문 구절은 정식 릴리즈에서 동적으로 로드됩니다.";
  };

  // Reduced Motion 대응 애니메이션 설정
  const animVariants = {
    initial: shouldReduceMotion 
      ? { opacity: 0 } 
      : { opacity: 0, y: 20, scale: 0.98 },
    animate: shouldReduceMotion 
      ? { opacity: 1 } 
      : { opacity: 1, y: 0, scale: 1 },
    exit: shouldReduceMotion 
      ? { opacity: 0 } 
      : { opacity: 0, y: 15, scale: 0.98 }
  };

  const animTransition = shouldReduceMotion 
    ? { duration: 0 } 
    : { duration: 0.25, ease: 'easeOut' };

  const displayLink = pinnedLink || activeLink;

  return (
    <AnimatePresence>
      {displayLink && (
        <motion.div
          variants={animVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={animTransition}
          className={`glass-panel w-full rounded-2xl p-6 md:p-8 shadow-2xl relative overflow-hidden transition-colors duration-300 ${
            pinnedLink ? 'border border-amber-500/30' : ''
          }`}
        >
          {/* 장식적 네온 백그라운드 그라디언트 */}
          {pinnedLink ? (
            <div className="absolute -right-16 -top-16 w-32 h-32 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
          ) : (
            <div className="absolute -right-16 -top-16 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
          )}
          <div className="absolute -left-16 -bottom-16 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* 상단 헤더 영역 */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-800/60">
            <div className="flex items-center gap-2">
              <div className={`p-1.5 rounded-lg ${pinnedLink ? 'bg-amber-500/10 text-amber-400' : 'bg-emerald-500/10 text-brand-accent'}`}>
                {pinnedLink ? <Pin className="w-5 h-5" /> : <Sparkles className="w-5 h-5" />}
              </div>
              <h3 className="text-lg font-semibold text-slate-100 tracking-wide">
                {pinnedLink ? '고정된 교차 참조 연결 정보' : '교차 참조 연결 세부 정보'}
              </h3>
            </div>
            
            <div className="flex items-center gap-2.5">
              {/* 연결 타입 배지 */}
              <span className={`px-3 py-1 text-xs font-semibold rounded-full tracking-wider uppercase border ${
                pinnedLink 
                  ? 'bg-amber-950/40 text-amber-400 border-amber-500/20' 
                  : 'bg-slate-900/80 text-emerald-400 border-emerald-500/20'
              }`}>
                {displayLink.testamentClass.replace(/_/g, ' ')} (Weight: {displayLink.weight.toFixed(2)})
              </span>

              {/* 핀 해제 버튼 (Pinned Link일 경우만 표시) */}
              {pinnedLink && (
                <button
                  onClick={onUnpin}
                  className="p-1 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-slate-200 transition-colors"
                  title="참조 고정 해제"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>

          {/* 소스 및 타겟 그리드 레이아웃 */}
          <div className="grid grid-cols-1 md:grid-cols-11 items-stretch gap-6 relative">
            
            {/* 1. Source Verse Card */}
            <div className={`md:col-span-5 flex flex-col justify-between glass-card p-5 rounded-xl transition-all ${
              pinnedLink ? 'hover:border-amber-500/20' : 'hover:border-blue-500/20'
            }`}>
              <div>
                <span className="text-xs font-bold text-blue-400/90 tracking-widest uppercase block mb-1">
                  SOURCE (출처 구절)
                </span>
                <h4 className="text-2xl font-bold text-slate-100 flex items-center gap-2 mb-3">
                  <BookOpen className="w-5 h-5 text-blue-400 shrink-0" />
                  {books[displayLink.source.bookIndex].ko} {displayLink.source.chapter}:{displayLink.source.verse}
                  <span className="text-sm font-normal text-slate-400 ml-1">
                    ({books[displayLink.source.bookIndex].en})
                  </span>
                </h4>
                
                {/* 다국어 듀얼 레이아웃 */}
                <div className="space-y-3">
                  {/* 국문 개역한글 */}
                  <p className="text-slate-100 font-medium text-lg leading-relaxed pl-2 border-l-2 border-blue-500/40">
                    "{getVerseTextKo(displayLink.source.bookIndex, displayLink.source.chapter, displayLink.source.verse)}"
                  </p>
                  
                  {/* 영문 KJV */}
                  <div className="border-t border-dashed border-slate-800/40 pt-2.5 mt-2.5">
                    <p className="text-slate-400 font-serif text-sm italic pl-2 border-l-2 border-slate-700">
                      "{getVerseTextEn(displayLink.source.bookIndex, displayLink.source.chapter, displayLink.source.verse)}"
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-800/30 flex justify-between text-xs text-slate-400">
                <span>Testament: {books[displayLink.source.bookIndex].testament}</span>
                <span>Section: {books[displayLink.source.bookIndex].section}</span>
              </div>
            </div>

            {/* 2. 중앙 교환 화살표 아이콘 */}
            <div className="md:col-span-1 flex items-center justify-center">
              <div className={`p-3 rounded-full border shadow-lg shadow-black/30 ${
                pinnedLink 
                  ? 'bg-amber-500/10 text-amber-400 border-amber-500/10' 
                  : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/10'
              }`}>
                <ArrowRightLeft className="w-6 h-6 rotate-90 md:rotate-0" />
              </div>
            </div>

            {/* 3. Target Verse Card */}
            <div className={`md:col-span-5 flex flex-col justify-between glass-card p-5 rounded-xl transition-all ${
              pinnedLink ? 'hover:border-amber-500/20' : 'hover:border-pink-500/20'
            }`}>
              <div>
                <span className="text-xs font-bold text-pink-400/90 tracking-widest uppercase block mb-1">
                  TARGET (연결 구절)
                </span>
                <h4 className="text-2xl font-bold text-slate-100 flex items-center gap-2 mb-3">
                  <BookOpen className="w-5 h-5 text-pink-400 shrink-0" />
                  {books[displayLink.target.bookIndex].ko} {displayLink.target.chapter}:{displayLink.target.verse}
                  <span className="text-sm font-normal text-slate-400 ml-1">
                    ({books[displayLink.target.bookIndex].en})
                  </span>
                </h4>
                
                {/* 다국어 듀얼 레이아웃 */}
                <div className="space-y-3">
                  {/* 국문 개역한글 */}
                  <p className="text-slate-100 font-medium text-lg leading-relaxed pl-2 border-l-2 border-pink-500/40">
                    "{getVerseTextKo(displayLink.target.bookIndex, displayLink.target.chapter, displayLink.target.verse)}"
                  </p>
                  
                  {/* 영문 KJV */}
                  <div className="border-t border-dashed border-slate-800/40 pt-2.5 mt-2.5">
                    <p className="text-slate-400 font-serif text-sm italic pl-2 border-l-2 border-slate-700">
                      "{getVerseTextEn(displayLink.target.bookIndex, displayLink.target.chapter, displayLink.target.verse)}"
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-800/30 flex justify-between text-xs text-slate-400">
                <span>Testament: {books[displayLink.target.bookIndex].testament}</span>
                <span>Section: {books[displayLink.target.bookIndex].section}</span>
              </div>
            </div>

          </div>

        </motion.div>
      )}
    </AnimatePresence>
  );
};
