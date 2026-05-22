# CHANGELOG.md

## v0.2.0 - 2026-05-22

### Added
- ScriptureFlux 성경 교차 참조 시각화 프로젝트 전용 설계 문서 묶음 추가
- 기존 범용 `AGENTS.md` 운영 규칙을 ScriptureFlux 프로젝트 설정값과 구현 규칙으로 통합
- `TASKS.md`, `DECISIONS.md`, `ATTRIBUTION.md` 추가
- Canvas 기반 대규모 cross-reference rendering, hover hit-test, 데이터셋 라이선스 전략 문서 추가
- Claude, Gemini, Cursor 계열 에이전트 진입 파일 추가

### Changed
- 기존 범용 README를 ScriptureFlux 프로젝트 README로 재구성
- `HISTORY.md`와 `CHANGELOG.md`를 ScriptureFlux 초기 설계 패키지 기준으로 갱신

### Documentation
- 기존 에이전트 템플릿 원본은 `docs/source_snapshots/`에 보존
- 설계 문서는 `docs/` 아래에 정리

### Verification
- 문서 파일 생성 및 ZIP 패키징 확인
- 실제 앱 빌드/테스트는 아직 수행하지 않음

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
