# HISTORY.md

## 2026-05-22

- 작업: ScriptureFlux 성경 교차 참조 시각화 SPA MVP 구현 완료, 빌드 에러/린트 오류 해결 및 원격 GitHub 저장소 푸시 완료
- 변경 파일:
  - `src/components/NetworkCanvas.tsx`: ESLint 미사용 변수(offsetToX, dx) 제거, strokeColor 대입 최적화(const ternary), type import 대응
  - `src/App.tsx`: type-only import(`type RenderLink`)로 수정하여 TS1484 에러(verbatimModuleSyntax 규칙) 해결
  - `src/components/ReferenceCard.tsx`: type-only import(`import type { RenderLink }`)로 수정하여 TS1484 에러 해결
  - `src/utils/projection.ts`: `let localOffset`을 `const`로 변경하여 ESLint(prefer-const) 에러 해결
  - `TASKS.md`: 완료된 태스크 반영 갱신
  - `HISTORY.md`, `CHANGELOG.md`: 최종 구현 완료 요약 기록
- 검증:
  - 로컬 `npm run lint` 실행: 무오류 성공 통과
  - 로컬 `npm run test` 실행: `projection.test.ts` 4개 유닛 테스트 100% 성공 통과
  - 로컬 `npm run typecheck` 및 `npm run build` 실행: `dist/` 정적 asset(index.html, JS, CSS) 빌드 성공
  - `git push -u origin main` 실행: 원격 origin(https://github.com/jeiel85/ScriptureFlux.git) main 브랜치로 커밋 푸시 성공
- 결과: 성공 (MVP 빌드본 원격 도달)
- 후속 작업:
  - GitHub Actions 기반 자동화 빌드/배포(GitHub Pages) 추가
  - keyboard focus 대체 인터랙션 설계 및 reduced motion/모바일 반응형 보완

---

## 2026-05-22 (이전 통합 작업)

- 작업: 기존 범용 에이전트 MD 파일과 ScriptureFlux 성경 교차 참조 시각화 설계 묶음 통합

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
