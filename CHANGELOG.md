# CHANGELOG.md

## v0.2.0 - 2026-05-22

### Added
- ScriptureFlux 성경 교차 참조 시각화 프로젝트 전용 설계 문서 묶음 추가
- 기존 범용 `AGENTS.md` 운영 규칙을 ScriptureFlux 프로젝트 설정값과 구현 규칙으로 통합
- `TASKS.md`, `DECISIONS.md`, `ATTRIBUTION.md` 추가
- Canvas 기반 대규모 cross-reference rendering, hover hit-test, 데이터셋 라이선스 전략 문서 추가
- Claude, Gemini, Cursor 계열 에이전트 진입 파일 추가
- **성경 교차 참조 시각화 SPA MVP 구현**:
  - Vite + React + TypeScript + Tailwind CSS + Canvas 2D 아키텍처 도입
  - 66권 규격 메타데이터(`books.json`) 및 31,139절 인덱스(`verse-index.json`) 빌드 파이프라인
  - 저작권 준수를 위해 30개 고유 샘플 구절(15개 참조 쌍) KJV 텍스트 데이터 분리 매핑 (`verse-text.kjv.json`)
  - 60FPS 상호작용 속도를 보증하는 `requestAnimationFrame` 쓰로틀 마우스 호버 감지 로직
  - Active 1개 링크에만 Glow/Anchor 효과를 적용하는 Canvas 렌더러 (`NetworkCanvas.tsx`)
  - Glassmorphism 효과가 적용된 미려한 상세 카드 오버레이 (`ReferenceCard.tsx`)
  - Deep Navy 테마, 구신약 비례 축 렌더링, Framer Motion 미세 트랜지션 UI 구성 (`App.tsx`)

### Changed
- 기존 범용 README를 ScriptureFlux 프로젝트 README로 재구성
- `HISTORY.md`와 `CHANGELOG.md`를 ScriptureFlux 초기 설계 패키지 기준으로 갱신
- TS `verbatimModuleSyntax` 활성화 규칙에 맞춰 `RenderLink`에 type-only import (`type` 키워드) 적용하여 TS1484 에러 해결
- `projection.ts` 내 재할당 없는 변수 `localOffset`을 `const`로 보정하여 ESLint `prefer-const` 경고 해결

### Documentation
- 기존 에이전트 템플릿 원본은 `docs/source_snapshots/`에 보존
- 설계 문서는 `docs/` 아래에 정리

### Verification
- `npm run lint` 실행: 스타일 및 사용되지 않는 변수/임포트(offsetToX, dx) 정리하여 100% 통과
- `npm run test` 실행: 창세기 오프셋 데이터 정합성에 맞춘 `projection.test.ts` 4개 유닛 테스트 100% 통과
- `npm run build` 실행: `dist/` 내 정적 assets(index.html, js, css) 무오류 정적 빌드 성공
- GitHub 원격 origin `main` 브랜치로 전체 소스 코드 푸시 및 반영 성공 확인

---

## 이전 에이전트 템플릿 변경 이력

## v0.1.2 - 2026-05-17

### Added
- 모바일 배포 프로젝트를 위한 AAB, 스토어 업로드 산출물, mapping/symbols/dSYM 확인 규칙 추가
- GitHub Release 본문과 모바일 스토어용 릴리즈 노트를 분리해 관리하는 규칙 추가
- Android/iOS 버전명과 빌드 번호를 태그 및 문서 버전과 함께 확인하는 규칙 추가
- 외부 SDK, 광고, Play Games Services, 서명 키, 실기 검증 관련 배포 체크리스트 보강

## v0.1.1 - 2026-04-30

### Added
- `AGENTS.md` 프로젝트 설정값에 `Expected Assets` 항목 추가
- 릴리즈 시 APK, EXE 등 실제 구동 파일의 생성 및 유효성 확인 규칙 강화 (Section 23)

## v0.1.0 - 2026-04-29

### Added
- AI 코딩 에이전트를 위한 범용 작업 규칙 `AGENTS.md` 추가
- 프로젝트 개요 및 가이드를 담은 `README.md` 추가
- 이력 관리를 위한 `HISTORY.md` 및 `CHANGELOG.md` 구조화

### Documentation
- `AGENTS.md` 프로젝트 설정값 업데이트 (Repository URL 등)
