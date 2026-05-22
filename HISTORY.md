# HISTORY.md

## 2026-05-22

- 작업: 기존 범용 에이전트 MD 파일과 ScriptureFlux 성경 교차 참조 시각화 설계 묶음 통합
- 변경 파일:
  - AGENTS.md: 기존 Automation First, Scope Control, 검증/릴리즈 규칙을 유지하면서 ScriptureFlux 프로젝트 설정값과 구현 세부 규칙 추가
  - README.md: 범용 AGENTS 템플릿 소개에서 ScriptureFlux 프로젝트 README로 전환
  - TASKS.md: 구현 단계별 작업 목록 추가
  - DECISIONS.md: Canvas 2D, D3 보조 사용, 데이터/본문 분리, 정적 SPA 제한 결정 기록
  - ATTRIBUTION.md: 데이터 출처와 성경 본문 라이선스 기록 템플릿 추가
  - docs/: 기존 ScriptureFlux 설계 문서와 원본 업로드 스냅샷 보존
  - CHANGELOG.md: v0.2.0 문서 통합 기록 추가
- 검증:
  - 업로드된 AGENTS/README/HISTORY/CHANGELOG 파일 내용 확인
  - 기존 ScriptureFlux 설계 묶음 파일 확인
  - 통합 MD 파일 생성 및 ZIP 패키징 확인
- 결과: 성공
- 후속 작업:
  - 실제 GitHub 저장소 생성 후 Repository URL 확정
  - 앱 구현 시작 후 `npm run lint`, `npm run typecheck`, `npm run build` 검증
  - 데이터셋 출처와 성경 본문 라이선스 최종 확인

---

## 이전 에이전트 템플릿 작업 이력

## 2026-05-17
- 작업: `nightseed-survivor` 프로젝트의 모바일 배포 및 릴리즈 운영 규칙을 범용 규칙으로 반영
- 변경 파일:
  - AGENTS.md: AAB, 스토어 릴리즈 노트, 모바일 버전 동기화, 서명/외부 SDK/실기 검증 체크리스트 추가
  - CHANGELOG.md: v0.1.2 변경 사항 추가
  - HISTORY.md: 작업 이력 기록
- 검증: `git diff`로 변경 내용 확인
- 결과: 성공
- 후속 작업: 다른 모바일 프로젝트에 적용 시 프로젝트별 `Expected Assets`, 버전 파일, 스토어 노트 경로를 설정값에 맞게 조정

## 2026-04-30
- 작업: 릴리즈 산출물 검증 규칙 강화 및 템플릿 업데이트
- 변경 파일:
  - AGENTS.md: 'Expected Assets' 설정 항목 추가 및 릴리즈 검증 체크리스트 구체화
- 검증: 파일 수정 확인
- 결과: 성공
- 후속 작업: 신규 규칙 적용 확인

## 2026-04-29
- 작업: 프로젝트 초기화 및 기본 문서 작성
- 변경 파일:
  - AGENTS.md: 범용 에이전트 규칙 작성 및 프로젝트 설정 업데이트
  - README.md: 프로젝트 소개 및 사용법 작성
  - HISTORY.md: 이력 관리 문서 생성
  - CHANGELOG.md: 변경 로그 문서 생성
- 검증: 로컬 파일 생성 확인
- 결과: 성공
- 후속 작업: GitHub 저장소 푸시 및 에이전트 연동 테스트
