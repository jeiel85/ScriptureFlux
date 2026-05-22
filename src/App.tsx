import { useState } from 'react';
import { NetworkCanvas, type RenderLink } from './components/NetworkCanvas';
import { ReferenceCard } from './components/ReferenceCard';
import { Github, BookOpen, Layers, ShieldCheck } from 'lucide-react';
import rawCrossReferences from './data/cross-references.json';

function App() {
  const [activeLink, setActiveLink] = useState<RenderLink | null>(null);
  const [pinnedLink, setPinnedLink] = useState<RenderLink | null>(null);
  const [filterType, setFilterType] = useState<'ALL' | 'OT_ONLY' | 'NT_ONLY' | 'OT_NT'>('ALL');

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#0a0f1e] text-slate-200">
      
      {/* 1. 상단 글로벌 네비게이션 / 헤더 */}
      <header className="border-b border-slate-800/80 bg-slate-950/40 backdrop-blur-md sticky top-0 z-50 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-tr from-emerald-500 to-blue-500 text-[#0a0f1e] font-bold rounded-xl shadow-lg shadow-emerald-500/10">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl font-extrabold tracking-tight text-white flex items-center gap-1.5 m-0">
                ScriptureFlux
                <span className="text-[10px] font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-1.5 py-0.5 rounded-md">
                  v0.2.0 MVP
                </span>
              </h1>
            </div>
          </div>
          
          <a
            href="https://github.com/jeiel85/ScriptureFlux"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-slate-400 hover:text-slate-200 transition-colors"
          >
            <Github className="w-5 h-5" />
            <span className="hidden sm:inline">GitHub Repository</span>
          </a>
        </div>
      </header>

      {/* 2. 메인 컨텐츠 영역 */}
      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-8">
        
        {/* 상단 안내 섹션 */}
        <section className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="flex-grow max-w-3xl">
            <h2 className="text-3xl font-black text-slate-100 mb-2 tracking-tight">
              성경 교차 참조 시각화 네트워크
            </h2>
            <p className="text-slate-400 leading-relaxed text-sm md:text-base">
              ScriptureFlux는 성경 66권 전체를 하나의 단일 유기적 축으로 배열하고, 구절 간의 긴밀한 상호 연관성을 수려한 2D 곡선 네트워크로 시각화합니다. 아래 곡선 위로 마우스 커서를 올려 실시간으로 구절을 확인하거나, <strong>클릭(Click)하여 정보를 고정</strong>해 읽어보세요.
            </p>
            <p className="text-slate-500 text-xs mt-2 leading-relaxed">
              🎨 본 프로젝트는 크리스 해리슨(Chris Harrison)의 전설적인 시각화 예술{' '}
              <a 
                href="https://www.chrisharrison.net/index.php/Visualizations/BibleVis" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-emerald-400/90 hover:text-emerald-400 hover:underline transition-all"
              >
                "Bible Cross-References"
              </a>
              와{' '}
              <a 
                href="https://www.openbible.info" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-emerald-400/90 hover:text-emerald-400 hover:underline transition-all"
              >
                OpenBible.info
              </a>
              의 오픈 데이터에 깊은 영감을 받아 제작된 경의적 헌사 웹 앱입니다.
            </p>
          </div>
          
          {/* 미니 통계 정보 패널 */}
          <div className="flex gap-4 shrink-0 glass-card px-4 py-3 rounded-xl border border-slate-800/40 text-xs">
            <div className="text-center border-r border-slate-800/60 pr-4">
              <span className="text-slate-400 block mb-0.5">총 성경 권수</span>
              <strong className="text-slate-100 text-lg font-bold">66권</strong>
            </div>
            <div className="text-center border-r border-slate-800/60 pr-4">
              <span className="text-slate-400 block mb-0.5">총 성경 구절</span>
              <strong className="text-slate-100 text-lg font-bold">31,139절</strong>
            </div>
            <div className="text-center">
              <span className="text-slate-400 block mb-0.5">로드된 참조 수</span>
              <strong className="text-emerald-400 text-lg font-bold">
                {rawCrossReferences.length}개
              </strong>
            </div>
          </div>
        </section>

        {/* 3. 컨트롤 패널 - 필터 버튼 목록 */}
        <section className="flex flex-wrap items-center justify-between gap-4 glass-card p-3 rounded-2xl border border-slate-800/50">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-emerald-400 ml-2" />
            <span className="text-sm font-semibold text-slate-300">네트워크 필터:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'ALL', label: '전체 보기' },
              { id: 'OT_ONLY', label: '구약 내부만 (OT ↔ OT)' },
              { id: 'NT_ONLY', label: '신약 내부만 (NT ↔ NT)' },
              { id: 'OT_NT', label: '구약 ↔ 신약 연결만 (OT ↔ NT)' }
            ].map((btn) => (
              <button
                key={btn.id}
                onClick={() => {
                  setFilterType(btn.id as 'ALL' | 'OT_ONLY' | 'NT_ONLY' | 'OT_NT');
                  setActiveLink(null); // 필터링 시 활성 링크 초기화
                }}
                className={`px-4 py-1.5 text-xs font-semibold rounded-xl transition-all ${
                  filterType === btn.id
                    ? 'bg-emerald-500 text-[#0a0f1e] shadow-lg shadow-emerald-500/20 font-bold'
                    : 'bg-slate-900/60 text-slate-400 hover:text-slate-200 border border-slate-800/40'
                }`}
              >
                {btn.label}
              </button>
            ))}
          </div>
        </section>

        {/* 4. Canvas 시각화 보드 */}
        <section className="relative">
          <NetworkCanvas
            activeLink={activeLink}
            setActiveLink={setActiveLink}
            pinnedLink={pinnedLink}
            setPinnedLink={setPinnedLink}
            filterType={filterType}
          />
          
          {/* 마우스 가이드 헬퍼 */}
          {!activeLink && !pinnedLink && (
            <div className="absolute top-4 left-4 glass-card px-3 py-1.5 rounded-lg border border-slate-800/50 text-[11px] text-slate-400 pointer-events-none animate-pulse">
              💡 곡선 네트워크에 마우스 커서를 올리거나, 클릭(Click)하여 정보를 고정해 보세요.
            </div>
          )}
        </section>

        {/* 5. activeLink 또는 pinnedLink가 존재할 시 하단에 세부 구절 카드 정보 노출 */}
        <section className="min-h-[160px] flex items-center justify-center">
          {pinnedLink || activeLink ? (
            <ReferenceCard 
              activeLink={activeLink} 
              pinnedLink={pinnedLink} 
              onUnpin={() => {
                setPinnedLink(null);
                setActiveLink(null);
              }}
            />
          ) : (
            <div className="w-full text-center py-12 border border-dashed border-slate-800/50 rounded-2xl bg-slate-950/20 text-slate-500 text-sm">
              선택 또는 호버된 연결선이 없습니다. 캔버스 영역의 유기적 곡선에 마우스를 가져가거나 클릭하여 상세 정보를 고정하십시오.
            </div>
          )}
        </section>

      </main>

      {/* 6. 글로벌 푸터 */}
      <footer className="border-t border-slate-900 bg-slate-950/80 py-6 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-1">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>ScriptureFlux © 2026. Made with Open Source Integrity.</span>
            </div>
            <div className="text-[10px] text-slate-600">
              Inspired by Chris Harrison's pioneering "Bible Cross-References" visualization.
            </div>
          </div>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            <span>
              Data: <a href="https://www.openbible.info" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 transition-colors">OpenBible.info (TSK)</a>
            </span>
            <span>
              Text: <a href="https://www.gutenberg.org" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 transition-colors">KJV</a> &amp; 개역한글 (1961)
            </span>
            <span>License: MIT License</span>
          </div>
        </div>
      </footer>

    </div>
  );
}

export default App;
