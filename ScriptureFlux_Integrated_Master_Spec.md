

---

# README.md

# ScriptureFlux

> 성경 66권의 교차 참조 구조를 하나의 시각적 네트워크로 보여주는 정적 웹앱입니다.

ScriptureFlux는 성경 전체를 하나의 연속된 축으로 표현하고, 서로 연관된 구절들을 곡선으로 연결하는 Bible Cross-Reference Visualization 프로젝트입니다. 기본 화면에서는 실제 구절 본문을 노출하지 않고, 사용자가 연결선에 hover 또는 focus했을 때만 source/target 구절과 참조 정보를 오버레이 카드로 보여줍니다.

## 핵심 목표

- 성경 66권의 유기적 연결성을 한눈에 보여주기
- 수만 개 이상의 교차 참조를 정적 웹페이지에서 부드럽게 렌더링하기
- 현대적이고 다이나믹하지만 성경 프로젝트에 어울리는 신뢰감 있는 시각 톤 유지하기
- GitHub Pages로 배포 가능한 오픈소스 SPA로 구성하기
- AI 코딩 에이전트가 바로 구현할 수 있도록 문서와 작업 규칙을 명확히 유지하기

## 기술 스택

| 영역 | 선택 |
|---|---|
| Build | Vite |
| UI | React + TypeScript |
| Styling | Tailwind CSS |
| Visualization | HTML5 Canvas 2D |
| Geometry helpers | D3 scale/quadtree/math helpers |
| Motion | Framer Motion |
| Test | Vitest + Testing Library |
| Deploy | GitHub Pages + GitHub Actions |

## 빠른 시작

```bash
npm install
npm run dev
```

빌드:

```bash
npm run lint
npm run typecheck
npm run build
```

## 문서 구조

```text
AGENTS.md                         # 에이전트 공통 규칙 + ScriptureFlux 전용 구현 규칙
README.md                         # 프로젝트 소개와 실행 가이드
TASKS.md                          # 구현 작업 목록
DECISIONS.md                      # 주요 기술 결정 기록
HISTORY.md                        # 작업 이력
CHANGELOG.md                      # 사용자에게 공개 가능한 변경 로그
docs/00_DESIGN_INDEX.md           # 설계 문서 인덱스
docs/ScriptureFlux_Agent_Master_Spec.md
docs/01_PROJECT_BRIEF.md
docs/02_PRODUCT_REQUIREMENTS.md
docs/03_TECHNICAL_ARCHITECTURE.md
docs/04_DATASET_AND_LICENSE_STRATEGY.md
docs/05_DATA_SCHEMA_AND_PIPELINE.md
docs/06_VISUALIZATION_RENDERING_SPEC.md
docs/07_UI_UX_DESIGN_GUIDE.md
docs/08_COMPONENT_STRUCTURE.md
docs/09_IMPLEMENTATION_ROADMAP.md
docs/10_QA_AND_PERFORMANCE_CHECKLIST.md
docs/11_GITHUB_DEPLOYMENT.md
docs/12_AGENT_PROMPTS.md
```

## 에이전트 사용 방법

이 프로젝트에서 Claude Code, Gemini CLI, Cursor, Antigravity 같은 코딩 에이전트를 사용할 때는 반드시 다음 순서로 읽게 합니다.

```text
@AGENTS.md
@README.md
@docs/00_DESIGN_INDEX.md
@docs/ScriptureFlux_Agent_Master_Spec.md
@TASKS.md
@DECISIONS.md
```

첫 구현 요청 예시:

```text
AGENTS.md와 docs/ScriptureFlux_Agent_Master_Spec.md를 기준으로 ScriptureFlux의 Vite + React + TypeScript 프로젝트를 구현해줘. 먼저 샘플 데이터로 66권 축, Canvas cross-reference curve, hover ReferenceCard까지 동작하게 만들고, npm run build가 성공하도록 정리해줘.
```

## 데이터 및 라이선스 주의

성경 본문과 교차 참조 데이터는 출처와 라이선스를 분리해서 관리합니다.

- 공개 저장소에 성경 번역 본문을 포함하기 전에는 해당 번역본의 재배포 가능 여부를 확인해야 합니다.
- 라이선스가 불명확한 데이터는 커밋하지 않습니다.
- 초기 구현은 샘플 데이터 또는 public-domain 본문으로 시작합니다.
- 데이터 출처, 변환 방식, 고지는 `docs/DATA_SOURCES.md`와 `ATTRIBUTION.md`에 기록합니다.

## 핵심 구현 방침

- 수만 개의 연결선을 SVG DOM으로 만들지 않습니다.
- Canvas로 전체 네트워크를 그리고, React는 UI와 상태 관리에 집중합니다.
- 모든 선에 glow나 shadow를 적용하지 않습니다.
- 활성화된 단일 링크만 별도 렌더링 레이어에서 강조합니다.
- pointer event는 `requestAnimationFrame`으로 제어합니다.
- `d3`는 렌더링 엔진이 아니라 좌표 계산과 spatial index 보조 도구로만 사용합니다.

## 라이선스

프로젝트 코드 라이선스는 저장소 생성 시 결정합니다. 권장값은 MIT입니다.

데이터와 성경 본문은 코드 라이선스와 별도로 취급합니다. 각 데이터 파일의 출처와 재배포 조건은 반드시 별도 문서로 관리합니다.


---

# AGENTS.md

# AGENTS.md

이 문서는 AI 코딩 에이전트가 이 저장소에서 작업할 때 따라야 하는 공통 작업 규칙입니다.

프로젝트명, 앱 ID, 패키지명, 저장소 URL, 특정 기술스택, 고유 정책은 이 파일에 직접 고정하지 않습니다. 프로젝트별 값은 아래의 **프로젝트 설정값** 또는 별도 명세 문서에 둡니다.

---

## 1. 프로젝트 설정값

아래 항목은 프로젝트마다 최초 1회만 채워 넣습니다.

```text
Project Name: ScriptureFlux
Repository: https://github.com/jeiel85/scriptureflux.git (suggested; update after repository creation)
Main Branch: main
Primary Spec: README.md
History Document: HISTORY.md
Changelog: CHANGELOG.md
Task Document: TASKS.md
Decision Log: DECISIONS.md
Version Files: package.json, README.md, AGENTS.md, CHANGELOG.md, docs/*.md
Build/Test Commands: npm install, npm run lint, npm run typecheck, npm run test, npm run build
Release Trigger: tag push
CI System: GitHub Actions
Expected Assets: GitHub Pages static site, dist ZIP, source ZIP
```

원칙적으로 이 파일은 공통 규칙만 담고, 프로젝트 고유 정책은 `Primary Spec`, `Task Document`, `Decision Log`에 기록합니다.

### 1.1 ScriptureFlux 프로젝트 전용 설정

이 저장소의 실제 제품 목표는 **성경 교차 참조 시각화 웹앱 ScriptureFlux**입니다. 공통 운영 규칙은 이 파일을 따르고, 구현 세부 설계는 `docs/` 문서를 따릅니다.

필수 진입 문서 순서:

1. `AGENTS.md`
2. `README.md`
3. `docs/00_DESIGN_INDEX.md`
4. `docs/ScriptureFlux_Agent_Master_Spec.md`
5. `docs/04_DATASET_AND_LICENSE_STRATEGY.md`
6. `TASKS.md`
7. `DECISIONS.md`
8. `HISTORY.md`
9. `CHANGELOG.md`

프로젝트 고유 구현 원칙:

- 앱 유형은 **정적 SPA**입니다. 최초 릴리즈에서는 서버, 로그인, 계정, 결제, 광고, 분석 SDK를 추가하지 않습니다.
- 기본 기술 스택은 **Vite + React + TypeScript + Tailwind CSS + HTML5 Canvas 2D**입니다.
- `d3`는 scale, geometry, quadtree 같은 보조 계산에만 사용합니다. 수만 개의 연결선을 SVG DOM 노드로 만들지 않습니다.
- `framer-motion`은 오버레이 카드, 패널, 설명 UI의 미세 전환에만 사용합니다.
- 교차 참조 링크 렌더링은 Canvas 중심으로 구현합니다.
- 기본 화면은 성경 본문을 직접 노출하지 않고, hover/focus 시에만 연결된 구절 정보를 보여줍니다.
- 공개 저장소에 성경 본문을 포함할 때는 번역본 라이선스를 반드시 확인합니다. 라이선스가 불명확한 번역본은 포함하지 않습니다.
- 교차 참조 데이터와 성경 본문 데이터는 각각 출처, 라이선스, 변환 과정을 `docs/DATA_SOURCES.md`와 `ATTRIBUTION.md`에 기록합니다.
- 성능 목표는 데스크톱 기준 대규모 데이터셋에서도 상호작용이 끊기지 않는 것입니다. 모든 선에 `shadowBlur`, CSS filter, 고비용 gradient를 적용하지 않습니다.
- 접근성은 키보드 focus, 색 대비, reduced motion, 터치 환경의 대체 인터랙션을 포함합니다.


---

## 2. Automation First Principle

이 프로젝트의 에이전트는 가능한 한 작업을 끝까지 자동으로 수행합니다.

일반적인 개발 작업에서는 사용자에게 중간 확인을 요구하지 않습니다. 명시된 작업 범위 안에서는 에이전트가 직접 분석, 구현, 문서 갱신, 검증, 커밋, 푸시, CI 확인까지 진행합니다.

사용자 확인 없이 자동 진행하는 항목:

- 최신 소스 동기화
- 작업 범위 분석
- 관련 이슈 또는 task 확인
- 코드 수정
- 관련 문서 갱신
- `CHANGELOG.md`, `History Document`, `Task Document`, `Decision Log` 갱신
- 가벼운 로컬 검증
- 커밋 생성
- 원격 저장소 푸시
- GitHub Actions 상태 확인
- CI 실패 시 로그 확인 후 수정 커밋 및 재푸시
- 최종 작업 보고

단, 아래 항목은 자동 진행하지 않고 중단 후 보고합니다.

- `git reset --hard`
- `git clean -fd`
- `git push --force`
- 원격 브랜치 삭제
- 원격 태그 삭제
- 사용자 데이터 삭제 가능성이 있는 변경
- 롤백이 어려운 데이터 마이그레이션
- 시크릿, 인증서, API 키, 릴리즈 키 관련 변경
- 유료 서비스, 외부 API, 로그인, 결제, 분석 도구 추가
- 광고 SDK, Play Games Services, 원격 설정, crash reporting 등 외부 콘솔 설정이 필요한 기능 추가
- 프로젝트 정책과 충돌하는 의존성 추가
- 되돌리기 어려운 배포 또는 릴리즈 조작

기본값은 자동 진행입니다. 중단은 예외이며, 파괴적 변경, 데이터 손실, 보안 위험, 비용 발생, 정책 충돌 가능성이 있을 때만 사용합니다.

---

## 3. 기본 커뮤니케이션 규칙

- 사용자에게 하는 설명, 작업 요약, 커밋 메시지, 이슈 코멘트는 기본적으로 **한국어**로 작성합니다.
- 기술 용어는 필요하면 원어를 병기하되, 설명의 중심 언어는 한국어로 유지합니다.
- 불확실한 부분은 추측으로 단정하지 않고 근거, 제약, 확인 결과를 명시합니다.
- 작업을 시작할 때 필요한 경우 주요 가정, 해석이 갈릴 수 있는 부분, 검증 가능한 완료 기준을 간단히 명시합니다.
- 자동 진행이 기본이지만, 보안, 데이터 손실, 비용, 정책 충돌처럼 위험도가 높은 불확실성은 중단 후 질문합니다.
- 사용자가 요청하지 않은 대규모 리팩터링, 디자인 전면 수정, 기능 확장은 하지 않습니다.
- 진행 상황을 보고할 때는 실제로 수행한 작업과 아직 확인하지 못한 작업을 구분합니다.

---

## 4. 작업 시작 전 필수 절차

작업을 시작하기 전에 반드시 최신 소스를 기준으로 상태를 확인합니다.

```bash
git fetch origin
git checkout <MAIN_BRANCH>
git pull origin <MAIN_BRANCH>
git status
```

그 다음 아래 문서를 순서대로 확인합니다.

1. `AGENTS.md`
2. `Primary Spec`
3. `Task Document`
4. `History Document`
5. `Decision Log`
6. `CHANGELOG.md`
7. 관련 `README.md`, `docs/`, CI/CD 설정 파일

작업 전 `git status`가 깨끗하지 않다면 기존 변경 사항을 덮어쓰지 않습니다. 사용자의 변경으로 보이는 파일은 보존하고, 필요한 경우 현재 상태를 보고한 뒤 안전한 범위에서 계속 진행합니다.

---

## 5. 작업 선택 원칙

- 한 번의 작업 루프에서는 **가장 우선순위가 높은 작업 하나만** 선택합니다.
- 모든 개발/수정은 가능하면 GitHub Issue 또는 `Task Document`에 먼저 등록하고 시작합니다.
- 이슈에는 작업 유형과 목표를 명확히 표시합니다.
  - `bug`: 오류 수정
  - `feat`: 기능 추가
  - `refactor`: 구조 개선
  - `docs`: 문서 수정
  - `chore`: 설정/빌드/정리
  - `test`: 테스트 추가 또는 수정
- 이미 등록된 이슈와 중복되는지 먼저 확인합니다.
- 작업 범위가 불명확하면 최소 변경으로 해결 가능한 방향을 선택합니다.
- 작업 목표는 가능하면 검증 가능한 성공 기준으로 바꿉니다.
  - 예: 버그 수정은 재현 조건과 수정 확인 방법을 정의합니다.
  - 예: 기능 추가는 완료 조건과 확인할 사용자 흐름을 정의합니다.
- 관련 없어 보이는 개선점은 즉시 구현하지 말고 후속 작업으로 기록합니다.

---

## 6. 구현 원칙

- 기존 아키텍처, 폴더 구조, 네이밍 규칙, 코드 스타일을 우선합니다.
- 핵심 로직은 UI와 분리하고, 재사용 가능한 단위로 작성합니다.
- 함수와 변수명은 역할이 드러나도록 명확하게 작성합니다.
- 한 번만 쓰이는 코드에는 불필요한 추상화, 설정화, 확장 포인트를 만들지 않습니다.
- 요청되지 않은 유연성, 범용화, 미래 대비 구조는 추가하지 않습니다.
- 하드코딩을 피하고, 앱 이름, 버전, 경로, 설정값은 공통 설정 파일 또는 환경 변수에서 관리합니다.
- 사용자 경로, 홈 디렉터리, 다운로드 경로 등은 OS/API를 통해 동적으로 계산합니다.
- 외부 명령, 파일 경로, URL, 사용자 입력은 검증 후 사용합니다.
- 비동기 작업은 UI 프리징을 유발하지 않도록 처리합니다.
- 리소스는 사용 후 반드시 정리합니다.
  - 예: 파일 핸들, 스트림, 구독, 타이머, disposable 객체
- 예외 처리는 사용자에게 이해 가능한 메시지와 개발자가 추적 가능한 로그를 모두 고려합니다.
- 단순 편의를 위한 대형 라이브러리 추가나 기술 스택 변경은 피합니다.

---

## 7. Scope Control Rules

작업 범위는 요청된 이슈 또는 task에 한정합니다.

하지 말아야 할 것:

- 관련 없는 리팩터링
- 전체 포맷팅
- 디자인 전면 수정
- 기본 기능 구현과 직접 관련 없는 UI 개선 또는 스타일 변경
- 사용하지 않는 파일 대량 정리
- 임의의 기능 추가
- 테스트 구조 전체 변경
- 프로젝트 설정의 대규모 재구성

필요해 보이는 개선 사항은 `Task Document`, GitHub Issue, `Decision Log` 중 적절한 위치에 후속 작업으로 기록합니다.

모든 변경 줄은 사용자 요청, 검증 실패 수정, 또는 이번 변경으로 인해 발생한 정리에 직접 연결되어야 합니다. 기존 dead code, 오래된 주석, 인접 코드 스타일 문제를 발견하더라도 요청 범위 밖이면 삭제하거나 수정하지 않고 후속 작업으로 기록합니다.

---

## 8. 금지 및 사전 승인 필요 항목

아래 작업은 사용자가 명시적으로 승인하거나 프로젝트 명세에 이미 허용되어 있지 않으면 진행하지 않습니다.

- 네트워크 권한 추가
- 신규 API 연동 추가
- 로그인, 계정, 인증 기능 추가
- 분석, 광고, 추적 SDK 추가
- proprietary SDK, remote config, crash reporting SDK 추가
- 민감 정보 수집 또는 외부 전송
- DRM 우회, 접근 제한 우회, 불법 다운로드, 보안 우회 기능 구현
- 기존 앱/서비스의 이름, 아이콘, 색상, 문구, 화면 구성을 그대로 복제
- 릴리즈 키, API 키, 토큰, 인증서 등 비밀정보를 저장소에 커밋
- 사용자가 요청하지 않은 대규모 기술 스택 변경

---

## 9. Destructive Command Rules

일반적인 `commit`, `push`, `tag push`는 자동으로 수행합니다.

단, 아래 명령 또는 이에 준하는 작업은 사용자 승인 없이 실행하지 않습니다.

- `git reset --hard`
- `git clean -fd`
- `git push --force`
- 로컬/원격 태그 삭제
- 원격 브랜치 삭제
- 데이터베이스 초기화
- 마이그레이션 롤백
- 대량 파일 삭제
- 빌드 산출물 또는 릴리즈 산출물 삭제

필요한 경우 먼저 현재 상태, 실행 이유, 영향 범위, 되돌릴 방법을 보고합니다.

---

## 10. Dependency Rules

새 의존성은 꼭 필요한 경우에만 추가합니다.

다만 작업에 명확히 필요하고 프로젝트 정책과 충돌하지 않는다면, 에이전트가 판단하여 추가할 수 있습니다. 사용자 승인이 필요한 경우는 보안, 비용, 라이선스, 외부 서비스 연동, 앱 권한 변경, 배포 정책 충돌 가능성이 있을 때입니다.

의존성을 추가하거나 업데이트하기 전에는 아래를 확인합니다.

- 기존 코드나 표준 라이브러리로 해결할 수 없는지
- 라이선스가 프로젝트 배포 정책과 충돌하지 않는지
- 번들 크기, 빌드 시간, 앱 크기에 미치는 영향
- 유지보수 상태와 최근 업데이트 여부
- 보안 취약점 여부
- 대상 플랫폼 호환성

의존성 변경 시 lockfile을 함께 갱신하고, 변경 이유를 `History Document` 또는 `Decision Log`에 기록합니다.

---

## 11. Data Migration Rules

사용자 데이터 구조를 변경할 때는 데이터 손실 가능성을 최우선으로 검토합니다.

가능한 경우 에이전트가 자동으로 마이그레이션 코드를 작성하고 검증합니다. 단, 기존 사용자 데이터 손실 가능성이 있거나 롤백이 어려운 경우에는 구현하지 말고 중단 후 보고합니다.

아래 변경은 마이그레이션 계획 없이 진행하지 않습니다.

- DB 스키마 변경
- 저장 파일 형식 변경
- 설정 키 이름 변경
- 캐시 구조 변경
- 사용자 생성 데이터 삭제 또는 재생성
- 앱 버전 간 호환성에 영향을 주는 변경

마이그레이션이 필요한 경우 아래를 기록합니다.

```text
변경 전 구조:
변경 후 구조:
마이그레이션 방법:
실패 시 동작:
롤백 가능 여부:
검증 방법:
```

---

## 12. 데이터 및 보안 원칙

- 사용자 데이터는 기본적으로 로컬 우선으로 다룹니다.
- 외부 전송이 필요한 경우 목적, 범위, 저장 위치, 실패 시 동작을 명확히 해야 합니다.
- 캐시, 로컬 DB, 설정 파일, 임시 파일의 저장 위치와 삭제 정책을 고려합니다.
- 업데이트 파일, 외부 바이너리, 다운로드한 아티팩트는 가능한 경우 해시 또는 서명 검증을 수행합니다.
- 환경 변수와 시크릿은 `.env`, GitHub Actions Secrets, OS 보안 저장소 등을 사용하고 Git에 포함하지 않습니다.
- 로그에 토큰, 쿠키, 인증 헤더, 개인정보가 남지 않도록 주의합니다.

---

## 13. UX/UI 원칙

- 초반에는 필수 기능만 노출하고 고급 기능은 설정 또는 별도 영역으로 분리합니다.
- 에러 메시지는 사용자가 이해할 수 있는 문장으로 표시합니다.
- 진행 상태가 있는 작업은 진행률, 상태, 남은 시간, 실패 사유를 사람이 읽기 쉬운 형태로 제공합니다.
- 사용자가 직접 실행해야 하는 행동과 자동으로 실행되는 행동을 명확히 구분합니다.
- 화면 크기, 다크 모드, 접근성, 키보드/마우스/터치 사용성을 고려합니다.
- 기능 구현 또는 버그 수정에 반드시 필요한 경우가 아니라면 기존 UI 구조, 레이아웃, 스타일, 문구, 색상, 인터랙션을 임의로 변경하지 않습니다.
- 기능 변경 때문에 UI 수정이 필요한 경우에도 최소 변경을 원칙으로 하며, 기존 디자인 시스템과 화면 흐름을 유지합니다.
- UI 변경이 불가피한 경우 변경 이유와 사용자 영향 범위를 작업 요약에 명시합니다.
- 다국어 지원 기본 정책은 한국어를 기준 언어(primary locale)로 사용합니다.
- 영어(en)는 필수 지원 언어로 항상 함께 개발하고 유지합니다.
- 중국어(zh), 일본어(ja)는 선택 지원 언어로 프로젝트 요구사항에 따라 추가할 수 있습니다.
- 새 문자열을 추가할 때는 최소한 한국어와 영어 리소스를 동시에 갱신하며, 중국어/일본어를 지원하는 프로젝트는 해당 언어도 함께 반영합니다.

---

## 14. 테스트 및 품질 확인

변경 후 가능한 범위에서 아래 순서로 검증합니다.

검증은 작업 목표와 직접 연결되어야 합니다. 버그 수정은 가능하면 재현 절차 또는 회귀 테스트를 기준으로 확인하고, 리팩터링은 변경 전후 동작이 같다는 것을 테스트 또는 빌드로 확인합니다.

1. 정적 검사 또는 린트
2. 타입 체크
3. 단위 테스트
4. 통합 테스트 또는 E2E 테스트
5. 빌드
6. 앱 실행 또는 핵심 플로우 수동 확인

프로젝트별 명령은 `Build/Test Commands`에 정의합니다.

예시:

```bash
npm test
npm run lint
npm run build
./gradlew test
./gradlew assembleDebug
flutter test
flutter build apk
```

검증 실패 시 실패 로그를 읽고 원인을 수정한 뒤 다시 실행합니다. 환경 문제로 검증이 불가능하면 어떤 명령이 왜 실패했는지 기록하고 보고합니다.

---

## 15. GitHub Actions 중심 검증 원칙

이 프로젝트는 가능한 경우 GitHub Actions 기반 검증을 우선합니다.

빌드와 배포 가능 여부의 최종 판단은 로컬 환경이 아니라 GitHub Actions 결과를 우선합니다. 로컬 환경은 OS, SDK, Java, Node, Gradle, Flutter, Rust, Python, 인증서, 기기 상태 차이 때문에 최종 배포 환경을 완전히 보증하지 못할 수 있습니다.

운영 기준:

- 로컬에서는 가능한 경우 빠른 정적 검사, 포맷, 타입 체크, 단위 테스트처럼 비용이 낮은 검증을 우선 실행합니다.
- 시간이 오래 걸리거나 리소스를 많이 쓰는 전체 빌드, 릴리즈 빌드, 멀티 플랫폼 검증, 서명 산출물 검증은 GitHub Actions에서 수행하는 것을 기본으로 합니다.
- 로컬 빌드가 특정 기기나 OS 환경을 충분히 보증하지 못하는 경우, 로컬 성공만으로 최종 검증 완료로 간주하지 않습니다.
- CI가 실패하면 `gh run view --log-failed` 등으로 실패 로그를 확인하고, 원인을 수정한 뒤 다시 푸시합니다.
- CI 검증이 필요한 변경을 한 경우, 커밋과 푸시 이후 GitHub Actions 결과까지 확인합니다.
- 로컬에서 무거운 검증을 생략했다면, 이력 문서나 작업 요약에 “로컬 생략, CI에서 검증”처럼 명확히 기록합니다.
- 실제로 실행하지 않은 로컬 테스트나 빌드를 성공한 것처럼 기록하지 않습니다.

권장 명령:

```bash
gh run list --limit 10
gh run view <RUN_ID> --log-failed
gh run rerun <RUN_ID> --failed
```

---

## 16. Pre-Commit Review

커밋 전 에이전트는 변경 내용을 직접 확인합니다. 문제가 없으면 사용자 확인 없이 커밋과 푸시를 진행합니다.

기능 구현이 끝나면 파일을 저장하거나 커밋하기 직전에 반드시 오타 점검을 먼저 수행합니다. 오타 점검 없이 저장 또는 커밋을 진행하지 않습니다.

```bash
git status
git diff --stat
git diff
```

확인 항목:

- 변경된 코드, 주석, 문서, 사용자 노출 문구, 식별자(변수/함수/클래스/파일명), 커밋 메시지에 오타가 없는지
- 한국어/영어 혼용 시 맞춤법, 띄어쓰기, 영문 대소문자, 고유명사 표기가 일관된지
- 요청한 작업 범위 밖의 파일이 수정되지 않았는지
- 개인 정보, API 키, 토큰, 인증서가 포함되지 않았는지
- 빌드 산출물, 캐시, 로그 파일이 실수로 포함되지 않았는지
- 포맷팅만 대량 변경된 파일이 없는지
- 변경된 각 파일과 주요 diff가 이번 작업의 성공 기준에 직접 연결되는지
- 요청 범위 밖 UI 변경, 인접 코드 개선, 불필요한 추상화가 포함되지 않았는지
- 버전 변경 시 관련 파일이 모두 함께 수정되었는지
- 문서와 실제 구현이 서로 모순되지 않는지

오타 또는 표기 오류를 발견하면 같은 작업 범위 안에서 즉시 수정한 뒤 다시 diff를 확인하고 커밋합니다.

---

## 17. 문서화 및 이력 관리

코드가 바뀌면 관련 문서를 함께 갱신합니다.

- 주요 변경 사항: `History Document`
- 릴리즈 변경 사항: `CHANGELOG.md` 또는 릴리즈 노트
- 기능 명세 변경: `Primary Spec` 또는 `README.md`
- 작업 목록 변경: `Task Document`
- 중요한 기술적 판단: `Decision Log`

이력 문서에는 최소한 아래 내용을 남깁니다.

```text
날짜:
작업:
변경 파일:
검증:
결과:
후속 작업:
```

`CHANGELOG.md`는 사용자에게 공개 가능한 변경 요약을 기록합니다. `History Document` 또는 `PROGRESS.md`는 작업 과정, 시행착오, 검증 내역, 에이전트 작업 기록을 남기는 용도로 사용합니다.

---

## 18. CHANGELOG 작성 규칙

`CHANGELOG.md`는 커밋 로그가 아니라 사용자가 이해할 수 있는 변경 요약으로 작성합니다.

기본 원칙:

- 사용자에게 영향이 있는 모든 변경 사항은 기록합니다.
- 내부 구현 변경도 유지보수, 안정성, 성능, 보안, 배포에 영향이 있으면 기록합니다.
- 단순 커밋 메시지를 그대로 복사하지 않습니다.
- “수정함”, “개선함”처럼 목적이 불명확한 표현만 쓰지 않습니다.
- 최신 버전이 항상 문서 상단에 오도록 역순으로 작성합니다.
- 날짜와 버전을 명확히 기록합니다.
- 테스트나 빌드를 실제로 실행하지 않았다면 성공으로 기록하지 않습니다.
- 릴리즈하지 않은 변경 사항을 릴리즈 완료처럼 쓰지 않습니다.

권장 버전 형식:

```text
## vX.Y.Z - YYYY-MM-DD
```

권장 섹션:

```md
### Added
- 새로 추가된 기능

### Changed
- 기존 기능의 동작 변경, UI/UX 개선, 구조 개선

### Fixed
- 버그 수정, 예외 처리 보완, 깨진 동작 복구

### Removed
- 제거된 기능, 파일, 설정

### Security
- 보안 관련 수정, 민감정보 보호, 권한/인증/검증 강화

### Performance
- 속도, 메모리, 빌드 시간, 렌더링 개선

### Documentation
- README, AGENTS, 배포 문서, 사용법 문서 변경

### Build / CI
- 빌드 설정, 배포 설정, GitHub Actions, 릴리즈 자동화 변경

### Verification
- 실제 실행한 테스트, 빌드, CI 검증, 산출물 확인
```

금지 사항:

- 커밋 메시지만 나열하지 않습니다.
- 내부 파일명만 적고 사용자 영향도를 설명하지 않는 기록은 피합니다.
- 검증하지 않은 빌드/테스트 성공을 기록하지 않습니다.
- 릴리즈하지 않은 변경 사항을 릴리즈 완료처럼 쓰지 않습니다.

---

## 19. 릴리즈 노트 작성 규칙

릴리즈 노트는 자동 생성된 커밋 목록만 사용하지 않고, 사용자가 이해하기 쉬운 변경 요약으로 직접 정리합니다.

GitHub Release 본문, 스토어 등록용 릴리즈 노트, 앱 내 공지 문구가 분리되어 있다면 각각의 목적에 맞게 따로 작성합니다.

권장 형식:

```md
## vX.Y.Z - YYYY-MM-DD

### 주요 변경 사항
- 

### 수정 사항
- 

### 문서 / 빌드 / 배포
- 

### 검증
- 로컬:
- CI:
- 산출물:

### 설치 또는 업데이트 참고 사항
- 
```

릴리즈 노트 파일을 별도로 관리하는 프로젝트에서는 아래 규칙을 권장합니다.

- GitHub Release 본문: `docs/releases/vX.Y.Z.md`
- 모바일 스토어 등록용 본문: `play_store/release_notes/vX.Y.Z.txt`
- 파일명은 태그 이름과 정확히 일치시키고, 접두사 `v`를 포함합니다.
- 스토어 등록용 본문은 플랫폼 제한을 지킵니다. 예: Play Console 릴리즈 노트는 언어별 태그와 글자 수 제한을 확인합니다.
- 알려진 문제는 숨기지 말고 사용자 영향과 다음 처리 계획을 함께 기록합니다.

릴리즈 전에는 아래 항목이 서로 일치하는지 확인합니다.

- 태그 버전
- 앱 내부 버전
- 패키지 또는 빌드 파일 버전
- `CHANGELOG.md`
- GitHub Release 제목
- 릴리즈 노트
- 릴리즈 산출물

---

## 20. 버전 관리 규칙

버전 변경 시 프로젝트에 정의된 모든 버전 표기 위치를 동시에 갱신합니다.

예시:

```text
package.json
pubspec.yaml
build.gradle
AndroidManifest.xml
export_presets.cfg
App version constant
README badge
CHANGELOG.md
```

태그를 만들기 전에는 반드시 실제 앱 내부 버전, 문서 버전, 태그 버전이 일치하는지 확인합니다.

```bash
# 프로젝트에 맞게 수정해서 사용
cat package.json | grep '"version"'
grep -R "versionName\|versionCode\|version:" .
```

버전 태그는 기본적으로 SemVer 형식의 `vX.Y.Z`를 사용합니다.

```bash
git tag vX.Y.Z
git push origin vX.Y.Z
```

태그는 반드시 버전 변경 커밋 이후에 생성합니다. 태그가 이전 커밋을 가리키면 릴리즈 버전과 앱 내부 버전이 달라질 수 있습니다.

모바일 앱에서는 아래 항목도 함께 확인합니다.

- Android `versionName` 또는 iOS `CFBundleShortVersionString`이 태그 버전과 일치하는지
- Android `versionCode` 또는 iOS `CFBundleVersion`이 이전 릴리즈보다 증가했는지
- 스토어 업로드용 AAB/IPA와 테스트 배포용 APK/기타 산출물이 같은 커밋에서 생성되었는지
- 난독화 또는 축소 빌드를 사용한다면 mapping, symbols, dSYM 같은 디버깅 산출물을 보존했는지

---

## 21. 커밋 및 푸시 규칙

소스 코드 수정 후 검증이 끝나면 즉시 커밋합니다. 원격 저장소 권한이 있으면 커밋 후 푸시까지 수행합니다.

```bash
git status
git add <changed files>
git commit -m "<type>: <변경 요약>"
git push origin <CURRENT_BRANCH>
```

권장 커밋 형식:

```text
feat: 새 기능 추가
fix: 오류 수정
docs: 문서 수정
refactor: 구조 개선
test: 테스트 추가 또는 수정
chore: 설정, 빌드, 정리 작업
```

커밋 메시지는 한국어를 기본으로 하며, 변경 내용이 사용자가 이해할 수 있게 작성합니다.

예시:

```text
feat: 메모 목록 빈 상태 화면 추가
fix: 설정 저장 실패 시 예외 처리 보완
docs: 에이전트 작업 절차 업데이트
chore: 릴리즈 버전 동기화
```

---

## 22. 브랜치 및 PR 규칙

이슈 기반 작업은 가능하면 별도 브랜치에서 진행합니다.

```bash
git checkout -b feat/issue-123-short-description
```

PR 설명에는 아래 내용을 포함합니다.

```text
## 변경 사항
- 

## 검증
- [ ] lint
- [ ] test
- [ ] build
- [ ] CI

## 관련 이슈
Closes #123

## 주의 사항
-
```

---

## 23. 릴리즈 및 배포 확인

릴리즈 또는 주요 기능 푸시 후에는 CI/CD 상태와 산출물을 확인합니다. 특히 `Expected Assets`에 명시된 실제 구동 가능 파일이 정상적으로 생성되어 릴리즈 애셋에 업로드되었는지 반드시 체크합니다.

```bash
gh run list --limit 10
gh run view <RUN_ID> --log-failed
gh release view vX.Y.Z
```

확인 항목:

- GitHub Actions 성공 여부
- 릴리즈 생성 여부
- **구동 파일 존재 확인**: APK, AAB, EXE, MSI, DMG, ZIP 등 실행 가능한 산출물 업로드 여부
- **산출물 유효성**: 파일 크기가 0이 아니며, 예상되는 파일 확장자를 가지고 있는지 확인
- **스토어 업로드 산출물 확인**: Play Store용 AAB, App Store용 IPA, Windows/MSIX 등 스토어 제출 파일이 필요한 프로젝트는 별도 산출물 존재 확인
- **디버깅 산출물 확인**: R8/ProGuard mapping, native symbols, dSYM 등 스토어 콘솔 또는 crash 분석에 필요한 파일이 생성되었는지 확인
- 릴리즈 노트가 최신 변경 사항을 반영하는지
- `CHANGELOG.md`와 릴리즈 노트가 서로 모순되지 않는지
- 배포 페이지 또는 문서 사이트가 의도한 소스를 서빙하는지

릴리즈는 태그 푸시로 자동화되는 경우가 많으므로, 버전 커밋 후 태그가 올바른 커밋을 가리키는지 반드시 확인합니다.

모바일 배포 프로젝트는 추가로 아래를 확인합니다.

- 스토어 등록정보의 앱 이름, 패키지명, 버전, 지원 언어, 광고 포함 여부가 실제 빌드와 일치하는지
- Play App Signing 또는 iOS signing을 사용하는 경우, 업로드 키와 최종 배포 서명 키의 차이를 문서화했는지
- 키스토어, 인증서, provisioning profile, API 키, 광고 ID, OAuth client ID 같은 민감 정보가 저장소에 커밋되지 않았는지
- 외부 SDK가 포함된 경우 필요한 스토어 정책 고지, 권한, 개인정보 처리방침, 테스트 계정, 콘솔 설정이 준비되었는지
- 광고는 실제 광고 ID로 셀프 테스트하지 않습니다. 개발/내부 테스트 단계에서는 공식 테스트 ID 또는 테스트 모드를 사용합니다.
- 실기 검증이 필요한 UI, 결제, 광고, 로그인, 리더보드, 푸시 알림은 에뮬레이터 또는 로컬 빌드만으로 완료 처리하지 않습니다.
- 헤드리스/CI 빌드가 네이티브 플러그인, AAR, entitlement, capability, asset pack 등을 누락할 수 있는 프로젝트는 산출물 내부 또는 실기 동작으로 포함 여부를 확인합니다.

---

## 24. Generated Files Rules

생성 파일, 빌드 산출물, 캐시 파일은 원칙적으로 커밋하지 않습니다.

예외적으로 커밋할 수 있는 항목:

- 배포용 정적 파일
- 문서 사이트 산출물
- 프로젝트에서 명시적으로 추적하는 generated file
- lockfile
- 네이티브 프로젝트 동기화 결과물처럼 프로젝트 정책상 필요한 파일

커밋 전 `.gitignore`와 `git status`를 확인합니다.

---

## 25. Environment Assumption Rules

에이전트는 로컬 환경을 절대적으로 신뢰하지 않습니다.

- OS, Node, Java, Flutter, Android SDK, Gradle, Rust, Python 등의 버전 차이를 고려합니다.
- 로컬에서만 성공하거나 실패한 결과는 CI 결과와 구분해서 기록합니다.
- 환경 변수나 시크릿이 없어 실패한 경우, 값을 추측하거나 임의 생성하지 않습니다.
- 특정 기기에서의 동작은 에뮬레이터나 로컬 빌드만으로 완전히 보증하지 않습니다.
- 최종 배포 판단은 가능하면 GitHub Actions와 릴리즈 산출물 기준으로 합니다.

---

## 26. 중단 조건

아래 상황에서는 임의로 계속 진행하지 말고 중단 후 보고합니다.

- 프로젝트 명세와 작업 요청이 충돌하는 경우
- 보안, 개인정보, 라이선스, 스토어 정책 위반 가능성이 있는 경우
- 필요한 권한, 시크릿, 인증서, 환경 변수가 없어 검증할 수 없는 경우
- 빌드/테스트 환경이 손상되어 결과를 신뢰할 수 없는 경우
- 기존 사용자 데이터 손실 가능성이 있는 경우
- 마이그레이션이 필요하지만 롤백 계획이 없는 경우
- 외부 API 또는 과금 리소스 사용이 필요한 경우
- 파괴적 Git 명령이 필요한 경우

보고할 때는 아래 형식으로 정리합니다.

```text
중단 사유:
확인한 근거:
영향 범위:
안전한 대안:
사용자 결정이 필요한 항목:
```

---

## 27. Final Report Format

작업 완료 후 에이전트는 아래 형식으로 요약합니다.

```text
작업 요약:
- 

변경 파일:
- 

검증:
- 로컬:
- CI:
- 생략한 검증:

커밋:
- 

푸시:
- 

후속 작업:
- 
```

검증하지 않은 항목은 성공으로 표현하지 않습니다. CI 확인이 필요한 경우 GitHub Actions 실행 결과를 확인하고 상태를 기록합니다.

---

## 28. 반복 실수 방지 기록

반복되는 문제는 해결 즉시 이 섹션 또는 `Decision Log`에 기록합니다.

기록 형식:

```text
문제:
원인:
해결:
다음부터 지킬 규칙:
관련 파일:
```

예시:

```text
문제: 릴리즈 태그는 v1.2.0인데 앱 내부 버전은 1.1.9로 표시됨
원인: 버전 파일 일부만 수정하고 태그를 생성함
해결: 모든 버전 위치를 동기화한 뒤 태그 재생성
다음부터 지킬 규칙: 태그 생성 전 Version Files 전체를 검사한다
관련 파일: package.json, build.gradle, CHANGELOG.md
```

---

## 29. 에이전트별 진입 파일

여러 에이전트를 함께 사용하는 경우 `CLAUDE.md`, `GEMINI.md` 등은 중복 규칙을 쓰지 말고 이 파일을 참조하게 만듭니다.

```text
@AGENTS.md
```

규칙의 단일 진실 공급원은 항상 `AGENTS.md`입니다.


---

## 30. ScriptureFlux 구현 세부 규칙

### 30.1 구현 우선순위

1. 프로젝트 스캐폴딩: Vite, React, TypeScript, Tailwind, ESLint, Vitest
2. 성경 66권 메타데이터와 verse-position projection 유틸리티
3. 작은 샘플 데이터셋 기반 Canvas 렌더링
4. 교차 참조 hover/focus hit-test
5. `ReferenceCard` 오버레이
6. OpenBible/Treasury of Scripture Knowledge 계열 데이터 어댑터
7. 성경 본문 데이터 분리 및 라이선스 고지
8. GitHub Pages 배포 워크플로
9. 성능 계측과 회귀 테스트
10. 디자인 polish와 접근성 보완

### 30.2 Canvas 렌더링 규칙

- `NetworkCanvas`는 모든 cross-reference curve를 Canvas에 그립니다.
- React 상태는 hover된 링크 ID, viewport size, 필터 상태처럼 UI에 필요한 값으로 제한합니다.
- pointer move는 `requestAnimationFrame`으로 throttle합니다.
- 초기 MVP에서는 정확한 곡선 충돌 판정보다 샘플링된 point-to-segment 거리 계산 또는 quadtree 근사 검색을 우선합니다.
- 배경 네트워크와 활성 링크는 렌더링 단계를 분리합니다.
- 활성 링크 하나에만 glow, 굵은 stroke, 높은 alpha를 적용합니다.

### 30.3 데이터 규칙

대규모 참조 데이터는 객체 배열보다 indexed tuple 형태를 우선합니다.

```ts
type CrossReferenceTuple = [
  sourceBookIndex: number,
  sourceChapter: number,
  sourceVerse: number,
  targetBookIndex: number,
  targetChapter: number,
  targetVerse: number,
  weight: number
];
```

메타데이터와 본문은 분리합니다.

```text
public/data/books.json
public/data/cross_refs.sample.json
public/data/cross_refs.full.json
public/data/verses.public-domain.sample.json
```

### 30.4 라이선스 중단 조건

다음 상황에서는 구현을 계속하지 말고 보고합니다.

- 성경 본문 번역본 라이선스가 불명확한 경우
- 데이터셋의 재배포 허용 여부가 불명확한 경우
- 외부 API 키 또는 인증이 필요한 방식으로 설계가 바뀌는 경우
- 공개 GitHub 저장소에 저작권 위험이 있는 본문을 커밋해야 하는 경우

### 30.5 완료 기준

최소 완료 기준:

```bash
npm install
npm run lint
npm run typecheck
npm run build
```

사용자 경험 기준:

- 페이지 첫 화면에서 66권 성경 구조와 교차 참조 네트워크가 즉시 이해됩니다.
- hover 또는 keyboard focus 시 source/target 구절 카드가 표시됩니다.
- 데이터가 없거나 로드 실패 시에도 앱이 깨지지 않고 안내 상태를 보여줍니다.
- GitHub Pages 배포 결과물이 정적 파일만으로 동작합니다.


---

# TASKS.md

# TASKS.md

이 문서는 ScriptureFlux 구현 작업 목록입니다. 에이전트는 한 번의 작업 루프에서 가장 높은 우선순위 작업 하나만 선택합니다.

## P0 - 프로젝트 기반 구축

- [ ] Vite + React + TypeScript 프로젝트 생성
- [ ] Tailwind CSS 설정
- [ ] ESLint, Prettier 또는 프로젝트 표준 포맷 설정
- [ ] Vitest 테스트 환경 설정
- [ ] 기본 라우트 없는 SPA 구조 정리
- [ ] GitHub Pages 배포를 고려한 `base` 설정 검토

## P0 - 데이터 모델

- [ ] 66권 성경 메타데이터 작성
- [ ] 각 권의 장/절 수 기반 누적 verse offset 계산 유틸리티 작성
- [ ] `CrossReferenceTuple` 타입 정의
- [ ] 작은 샘플 교차 참조 JSON 작성
- [ ] 데이터 로딩 실패/빈 데이터 상태 처리

## P0 - 시각화 MVP

- [ ] `NetworkCanvas` 컴포넌트 구현
- [ ] 성경 66권 축 렌더링
- [ ] sample cross-reference curve 렌더링
- [ ] cubic Bezier curve 계산 유틸리티 작성
- [ ] resize 대응
- [ ] high-DPI canvas scaling 처리

## P1 - 인터랙션

- [ ] pointer move `requestAnimationFrame` throttle
- [ ] hover hit-test 1차 구현
- [ ] active link glow 렌더링 분리
- [ ] source/target anchor point 표시
- [ ] `ReferenceCard` 오버레이 구현
- [ ] keyboard focus 대체 인터랙션 설계

## P1 - 데이터셋 파이프라인

- [ ] 교차 참조 원본 데이터 후보 검토
- [ ] 원본 데이터 라이선스 기록
- [ ] 전처리 스크립트 설계
- [ ] full dataset을 indexed tuple JSON으로 변환
- [ ] large JSON lazy load 또는 gzip 배포 전략 검토
- [ ] 성경 본문 데이터와 참조 데이터 분리

## P1 - 디자인 polish

- [ ] deep navy/charcoal 배경 시스템 정리
- [ ] 구약/신약 시각 구분
- [ ] glassmorphism card 세부 스타일 보정
- [ ] reduced motion 대응
- [ ] 모바일/태블릿 레이아웃 대응
- [ ] 범례와 데이터 출처 표시

## P2 - 품질 및 배포

- [ ] `npm run lint` 성공
- [ ] `npm run typecheck` 성공
- [ ] `npm run test` 성공
- [ ] `npm run build` 성공
- [ ] GitHub Actions CI 추가
- [ ] GitHub Pages deploy workflow 추가
- [ ] README 실행 방법 최신화
- [ ] CHANGELOG/HISTORY 갱신

## 후속 아이디어

- [ ] 필터: 구약↔신약, 동일 권 내부, 주제별, weight별
- [ ] 검색: 특정 구절 입력 시 관련 링크 집중 표시
- [ ] 공유 링크: 활성 링크 또는 구절 위치 URL hash 저장
- [ ] 성경 본문 번역 선택 구조
- [ ] WebGL 또는 OffscreenCanvas 실험


---

# DECISIONS.md

# DECISIONS.md

중요한 기술적 판단과 이유를 기록합니다. 에이전트는 구현 중 새 결정을 내리면 이 문서에 추가합니다.

## 2026-05-22 - 렌더링 엔진은 Canvas 2D를 기본으로 한다

### 결정

ScriptureFlux의 대규모 교차 참조 선 렌더링은 SVG DOM이 아니라 HTML5 Canvas 2D를 기본으로 구현한다.

### 이유

- 교차 참조 데이터가 수만 개 이상이 될 수 있다.
- SVG path를 수만 개 DOM 노드로 만들면 layout, paint, event handling 비용이 커진다.
- Canvas는 네트워크 배경장을 한 번에 그리는 방식에 적합하다.

### 영향

- 개별 링크 접근성은 별도 UI 또는 hit-test 레이어로 보완해야 한다.
- React 컴포넌트는 렌더링 대상이 아니라 상태와 UI chrome에 집중한다.

## 2026-05-22 - D3는 보조 계산용으로만 사용한다

### 결정

D3는 scale, interpolation, quadtree 같은 계산 보조 도구로만 사용하고, D3 selection 기반 DOM 렌더링은 사용하지 않는다.

### 이유

- React와 D3 DOM 제어가 충돌할 수 있다.
- Canvas 중심 구조에서 D3의 강점은 좌표/스케일/공간 인덱싱에 있다.

## 2026-05-22 - 성경 본문과 교차 참조 데이터는 분리한다

### 결정

교차 참조 관계 데이터와 실제 성경 본문 텍스트 데이터는 별도 파일과 별도 라이선스 문서로 관리한다.

### 이유

- 교차 참조 데이터와 성경 번역 본문은 라이선스 조건이 다를 수 있다.
- 본문 없는 데모도 가능하게 만들어 저작권 위험을 낮춘다.

## 2026-05-22 - 초기 릴리즈는 정적 SPA로 제한한다

### 결정

초기 버전에는 서버, 계정, 로그인, DB, 외부 유료 API를 추가하지 않는다.

### 이유

- 사용자가 요구한 페이지는 정보 교환이 아니라 보여주기에 집중한 정적 웹페이지다.
- GitHub Pages 배포와 오픈소스 공개에 적합하다.


---

# CHANGELOG.md

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


---

# HISTORY.md

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


---

# docs/ScriptureFlux_Agent_Master_Spec.md

# ScriptureFlux Design Bundle

> Bible Cross-Reference Network Visualization  
> Generated: 2026-05-22

## Purpose

This bundle converts the Gemini conversation brief into a coding-agent-ready Markdown specification package.

The target product is a static, open-source web application that visualizes the organic structure of the Bible by placing the 66 books along a continuous axis and drawing curved cross-reference links between related passages.

## Recommended usage

1. Create a new GitHub repository.
2. Copy this entire bundle into the repository root.
3. Ask your coding agent to read `AGENTS.md` first.
4. Then ask it to implement the app according to the documents in numerical order.

## File map

| File | Purpose |
|---|---|
| `AGENTS.md` | Primary execution prompt for Claude Code, Cursor, Antigravity, etc. |
| `01_PROJECT_BRIEF.md` | Product identity, goals, non-goals, target experience |
| `02_PRODUCT_REQUIREMENTS.md` | Functional and non-functional requirements |
| `03_TECHNICAL_ARCHITECTURE.md` | Framework, rendering, routing, state, deployment |
| `04_DATASET_AND_LICENSE_STRATEGY.md` | Dataset sources, Bible text licensing, attribution rules |
| `05_DATA_SCHEMA_AND_PIPELINE.md` | Normalized data model and preprocessing pipeline |
| `06_VISUALIZATION_RENDERING_SPEC.md` | Canvas rendering, Bezier curves, hover detection |
| `07_UI_UX_DESIGN_GUIDE.md` | Visual tone, layout, motion, responsive rules |
| `08_COMPONENT_STRUCTURE.md` | React component breakdown and file tree |
| `09_IMPLEMENTATION_ROADMAP.md` | Practical development phases |
| `10_QA_AND_PERFORMANCE_CHECKLIST.md` | Acceptance tests, performance budget, edge cases |
| `11_GITHUB_DEPLOYMENT.md` | GitHub repository setup and GitHub Pages deployment |
| `12_AGENT_PROMPTS.md` | Ready-to-paste prompts for vibe coding sessions |
| `ScriptureFlux_Agent_Master_Spec.md` | Single-file consolidated spec for agents |

## Important legal note

The cross-reference mapping and Bible text source must be reviewed before public redistribution. Prefer public-domain or clearly licensed sources, and keep source attribution visible in the repository and UI.


---

# Agent Instructions: ScriptureFlux

You are implementing a production-ready static web app named **ScriptureFlux**.

## First objective

Build a modern, high-performance Bible cross-reference visualization page.

The user wants a page where:

- The 66 books of the Bible are represented as one continuous visual axis.
- Individual verses are not displayed by default.
- Related verses are connected by elegant curved lines.
- Hovering a line highlights the relationship and shows the two linked passages in an overlay card.
- The page is primarily presentational, not conversational or form-driven.
- The visual style must be modern, dynamic, refined, and trustworthy.

## Implementation constraints

Use this stack unless the user explicitly changes it:

- Vite
- React
- TypeScript
- Tailwind CSS
- HTML5 Canvas 2D
- D3 only for scales/quadtree/math helpers, not for rendering thousands of DOM nodes
- Framer Motion for overlay and UI transitions

## Critical rendering rule

Do not render tens of thousands of SVG paths as DOM elements.

Use Canvas for the link field. Use normal DOM/React components only for UI chrome, labels, tooltips, controls, and overlay cards.

## Critical performance rule

Do not apply `shadowBlur`, `filter`, or expensive gradient logic to every cross-reference link on every frame.

Correct pattern:

1. Draw the full background network with low alpha and no glow.
2. Use spatial indexing or sampled hit geometry to detect one active link.
3. Redraw only the active link with glow and thicker stroke.
4. Throttle pointer interactions with `requestAnimationFrame`.

## Data rule

Use indexed numeric arrays for the large relationship matrix.

Recommended matrix:

```ts
type CrossReferenceTuple = [
  sourceBookIndex: number,
  sourceChapter: number,
  sourceVerse: number,
  targetBookIndex: number,
  targetChapter: number,
  targetVerse: number,
  weight: number
];
```

## Development order

1. Scaffold app.
2. Create static sample dataset.
3. Implement Bible book metadata and verse indexing utilities.
4. Implement Canvas visualization with sample data.
5. Add hover detection and ReferenceCard.
6. Add data loader and production dataset adapter.
7. Add responsive layout.
8. Add performance measurements.
9. Add GitHub Pages deployment workflow.
10. Polish visual style and accessibility.

## Definition of done

The app must run locally with:

```bash
npm install
npm run dev
```

The app must build with:

```bash
npm run build
```

The deployed static build must work on GitHub Pages.


---

# Project Brief: ScriptureFlux

## Project name

**ScriptureFlux**

## One-line concept

A modern static web visualization that reveals the organic cross-reference structure of the Bible by connecting related passages across the 66 books.

## Background

The product is inspired by Bible cross-reference visualizations: the Bible is treated as a continuous structured text, and related passages are connected visually. The user specifically wants a display-focused page, not a chat app, study app, or reading app.

## Core user experience

The initial screen should feel like a refined map of Scripture:

1. A dark, trustworthy canvas fills the page.
2. The 66 books appear as a continuous Bible axis.
3. Thousands of faint arcs show relationships between passages.
4. Hovering a curve activates it.
5. The activated curve glows.
6. A glassmorphism overlay shows:
   - source reference
   - source verse text
   - target reference
   - target verse text
   - relationship weight/type when available

## Goals

- Make the interconnectedness of Scripture visually obvious.
- Keep the first impression beautiful and credible.
- Avoid clutter by hiding verse text until interaction.
- Make the project suitable for GitHub open-source release.
- Make the codebase friendly to coding agents and future maintainers.

## Non-goals

- Do not build a full Bible reader in the first release.
- Do not build accounts, notes, highlights, or social features.
- Do not require a backend for the first release.
- Do not depend on paid Bible APIs for the public demo.
- Do not embed copyrighted Bible translations unless permission is clear.

## Primary audience

- Bible readers who appreciate visual structure.
- Pastors, teachers, and students.
- Developers interested in biblical data visualization.
- Visitors arriving from GitHub or a landing page.

## Success criteria

The product is successful if a first-time visitor immediately understands:

> “This shows how passages across the Bible are connected.”

The implementation is successful if it remains smooth with a large cross-reference dataset and can be deployed as a static site.


---

# Product Requirements

## MVP scope

### RQ-001: Bible axis

Render the 66 books of the Bible as a single continuous horizontal axis.

Acceptance criteria:

- Books appear in canonical Protestant order.
- Old Testament and New Testament are visually distinguishable.
- Each book segment is proportionate to its verse count, not merely equal-width.
- Book boundaries are visible at normal desktop resolution.

### RQ-002: Cross-reference arcs

Render cross-reference links between related passages.

Acceptance criteria:

- Each link connects source and target positions on the Bible axis.
- Links use smooth cubic Bezier curves.
- Default links are faint enough not to overpower the page.
- Link density should create a network-field impression without blocking labels.

### RQ-003: Hover interaction

Hovering a link reveals its relationship.

Acceptance criteria:

- The active link becomes visually distinct.
- Non-active links dim or remain background-level.
- Source and target anchor points are highlighted.
- The UI remains responsive during pointer movement.

### RQ-004: Reference overlay

Display a verse information card when a link is active.

Acceptance criteria:

- The overlay shows source reference and target reference.
- The overlay shows verse text only on interaction.
- The overlay uses a dark glassmorphism style.
- The overlay stays inside viewport bounds.
- On mobile, the overlay anchors to a bottom sheet.

### RQ-005: Static deployment

The project must deploy without a server.

Acceptance criteria:

- `npm run build` produces static assets.
- GitHub Pages deployment is supported.
- Data files load from relative paths.
- Refreshing the deployed page does not break routing.

## Nice-to-have scope

### RQ-101: Filter controls

- Old Testament only
- New Testament only
- OT-to-NT links
- Same-book links
- Same-chapter links
- Minimum weight threshold

### RQ-102: Mini statistics

Show:

- total books
- total verses
- total cross references loaded
- active filter
- current hovered reference

### RQ-103: Search jump

Allow searching a reference like `John 1:1` and center/focus nearby links.

### RQ-104: Shareable state

Encode selected filters and hovered/selected reference in URL query parameters.

## Non-functional requirements

### Performance

Target:

- 60 FPS for hover feedback on modern desktop browsers.
- Usable interaction on mid-range mobile devices.
- Initial load should stay reasonable by using compressed static data.

### Accessibility

- Provide keyboard focus mode for selected links.
- Maintain sufficient color contrast.
- Do not rely only on color to convey Old/New Testament.
- Respect `prefers-reduced-motion`.

### Maintainability

- Keep data preprocessing separate from rendering code.
- Avoid hard-coded magic numbers in rendering.
- Add comments only where logic is non-obvious.
- Prefer TypeScript types for dataset and geometry models.

### Legal and attribution

- Include `ATTRIBUTION.md` or a visible footer for dataset and Bible text sources.
- Avoid redistributing restricted Bible translations without permission.


---

# Technical Architecture

## Architecture summary

ScriptureFlux should be a static single-page app with a React UI shell and a Canvas visualization core.

```txt
Browser
  ├─ React UI layer
  │   ├─ Header / Legend / Controls
  │   ├─ ReferenceCard
  │   └─ Responsive layout
  ├─ Canvas rendering layer
  │   ├─ Static network field
  │   ├─ Active link overlay
  │   └─ Axis / anchor highlights
  └─ Static data layer
      ├─ book metadata
      ├─ verse index metadata
      ├─ cross-reference tuples
      └─ verse text lookup
```

## Recommended stack

| Area | Recommendation |
|---|---|
| Build | Vite |
| UI | React + TypeScript |
| Styling | Tailwind CSS |
| Visualization | HTML5 Canvas 2D |
| Math helpers | D3 scale, D3 quadtree |
| Animation | Framer Motion |
| Deployment | GitHub Pages |

## Why Canvas

Cross-reference datasets can contain tens or hundreds of thousands of links. Rendering each link as an SVG path or DOM node can overload layout, style, and hit-testing. Canvas keeps the link field as a bitmap rendering problem and gives predictable performance.

## Rendering layers

Use two canvases if needed:

```txt
NetworkBackgroundCanvas
  - static or rarely redrawn
  - all faint cross-reference arcs
  - no shadows

InteractionCanvas
  - redrawn on hover/selection/filter change
  - active arc
  - active endpoints
  - transient glow
```

A two-canvas approach prevents unnecessary redraw of the full dataset on every mousemove.

## State model

Recommended app state:

```ts
type AppState = {
  datasetStatus: 'idle' | 'loading' | 'ready' | 'error';
  filters: VisualizationFilters;
  activeLinkId: string | null;
  selectedLinkId: string | null;
  pointer: { x: number; y: number } | null;
  viewport: { width: number; height: number; dpr: number };
};
```

## Data loading

Use static files under `public/data` or imported files under `src/data` for MVP.

Recommended production layout:

```txt
public/data/
  books.json
  verse-index.json
  cross-references.min.json
  verse-text.kjv.min.json
```

## Data preprocessing

Do heavy normalization before runtime.

Runtime should not parse human-formatted references repeatedly. Convert every reference to numeric book/chapter/verse indexes ahead of time.

## Error handling

The app should show a clear fallback panel if:

- data cannot be loaded
- JSON schema is invalid
- browser canvas context is unavailable
- WebGL/Canvas performance is weak

## Browser support

Target current evergreen browsers:

- Chrome
- Edge
- Firefox
- Safari

Do not use experimental browser-only APIs for the MVP.


---

# Dataset and License Strategy

## Primary data categories

ScriptureFlux needs three kinds of data:

1. Bible book metadata
2. Cross-reference relationship data
3. Verse text for hover overlays

These must be treated separately because their licenses may differ.

## Cross-reference dataset candidates

### OpenBible.info cross references

OpenBible.info provides a Bible cross-reference dataset and states that the page has about 340,000 cross references. It also states that the data draws primarily from public-domain sources, especially *Treasury of Scripture Knowledge*, and offers a downloadable data zip.

Recommended use:

- Use as the first candidate for the cross-reference matrix.
- Preserve attribution.
- Verify the downloaded zip contents and license text before committing it to the repository.
- Keep a `DATA_SOURCES.md` file documenting the source and transformation steps.

### Treasury of Scripture Knowledge

The OpenBible.info page indicates that much of its data comes from *Treasury of Scripture Knowledge*. This is a historically important source for public-domain cross-reference data. Confirm edition/source details before republishing transformed data.

## Verse text strategy

### Important rule

Do not assume every Bible translation can be freely redistributed.

For the public GitHub version, choose one of these approaches:

#### Option A: Public-domain English text for demo

Use KJV text from Project Gutenberg for the English demo if the target distribution is compatible with Project Gutenberg terms and United States public-domain status.

Pros:

- Easy to redistribute in the United States.
- Good for open demo.
- Stable source.

Cons:

- Archaic language.
- Copyright status can vary outside the United States.

#### Option B: No bundled verse text

Bundle only references. Fetch or display verse text only if the user configures an allowed source.

Pros:

- Lowest licensing risk.
- Clean open-source distribution.

Cons:

- Hover card is less impressive until configured.

#### Option C: User-provided Bible text

Allow local JSON import or repository-level configuration for licensed translations.

Pros:

- Flexible.
- Can support Korean translations if the user has rights.

Cons:

- More implementation work.
- Public demo cannot include restricted translations.

## Korean Bible text caution

Most modern Korean Bible translations are copyrighted. Do not bundle Korean verse text unless the license explicitly permits redistribution in this web app.

For Korean UI, the reference labels can be Korean while the verse text source remains configurable.

## Attribution requirements

Create:

```txt
ATTRIBUTION.md
DATA_SOURCES.md
LICENSE
```

UI footer should include:

- cross-reference dataset source
- Bible text source
- app repository link
- short license notice

## Recommended MVP decision

For the first public MVP:

1. Use OpenBible.info cross-reference data after verifying its license and keeping attribution.
2. Use KJV public-domain text for English demo overlays.
3. Make Bible text provider replaceable.
4. Do not bundle copyrighted Korean Bible text.
5. Provide Korean UI labels separately from verse text.


---

# Data Schema and Pipeline

## Canonical book metadata

Create a complete `books.json` with all 66 books.

Recommended shape:

```json
[
  {
    "index": 0,
    "osis": "Gen",
    "id": "GEN",
    "ko": "창세기",
    "en": "Genesis",
    "chapters": 50,
    "testament": "OT",
    "section": "Law"
  }
]
```

## Verse index metadata

Each book needs cumulative verse offsets so that every verse can be projected onto the global Bible axis.

Recommended shape:

```json
{
  "totalVerses": 31102,
  "books": [
    {
      "bookIndex": 0,
      "startVerseOffset": 0,
      "verseCount": 1533,
      "chapterVerseCounts": [31, 25, 24]
    }
  ]
}
```

## Cross-reference matrix

Large cross-reference data should be compressed.

Recommended tuple:

```ts
type CrossReferenceTuple = [
  sourceBookIndex: number,
  sourceChapter: number,
  sourceVerse: number,
  targetBookIndex: number,
  targetChapter: number,
  targetVerse: number,
  weight: number
];
```

Example:

```json
[
  [0, 1, 1, 42, 1, 1, 1.0]
]
```

## Runtime enriched object

At runtime, convert tuples into enriched render objects:

```ts
type RenderLink = {
  id: number;
  source: VerseRef;
  target: VerseRef;
  sourceOffset: number;
  targetOffset: number;
  x0: number;
  y0: number;
  x1: number;
  y1: number;
  weight: number;
  testamentClass: 'OT_TO_OT' | 'OT_TO_NT' | 'NT_TO_NT' | 'NT_TO_OT';
};
```

## Verse text lookup

Recommended compact key:

```ts
const key = `${bookIndex}.${chapter}.${verse}`;
```

Example:

```json
{
  "0.1.1": "In the beginning God created the heaven and the earth.",
  "42.1.1": "In the beginning was the Word, and the Word was with God, and the Word was God."
}
```

## Projection algorithm

### Step 1: Convert verse ref to global offset

```ts
function toGlobalVerseOffset(ref: VerseRef, verseIndex: VerseIndex): number {
  const book = verseIndex.books[ref.bookIndex];
  const chapterStart = sum(book.chapterVerseCounts.slice(0, ref.chapter - 1));
  return book.startVerseOffset + chapterStart + (ref.verse - 1);
}
```

### Step 2: Convert global offset to X coordinate

```ts
function offsetToX(offset: number, totalVerses: number, width: number, padding: number): number {
  return padding + (offset / Math.max(totalVerses - 1, 1)) * (width - padding * 2);
}
```

## Preprocessing script requirements

Create a Node script:

```txt
scripts/prepare-data.ts
```

Responsibilities:

- read raw cross-reference source
- parse source and target references
- normalize book names
- map references to book indexes
- reject invalid references with a report
- emit compact JSON files
- emit `data-report.json`

## Data validation

Validate:

- book index is 0–65
- chapter exists for the book
- verse exists for the chapter
- no self-duplicate links unless intentionally allowed
- weight is numeric
- source and target text exists if verse text is bundled

## Output files

```txt
public/data/books.json
public/data/verse-index.json
public/data/cross-references.min.json
public/data/verse-text.kjv.min.json
public/data/data-report.json
```


---

# Visualization Rendering Specification

## Coordinate model

Default layout: horizontal linear Bible axis.

```txt
Genesis ........................................ Revelation
|-----------------------------------------------------------|
```

All cross-reference arcs rise above the axis.

## Canvas setup

Use device pixel ratio scaling:

```ts
function setupCanvas(canvas: HTMLCanvasElement, width: number, height: number, dpr: number) {
  canvas.width = Math.floor(width * dpr);
  canvas.height = Math.floor(height * dpr);
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;

  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Canvas 2D context unavailable');

  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  return ctx;
}
```

## Bezier curve

Use cubic Bezier curves.

```ts
function drawArc(ctx: CanvasRenderingContext2D, link: RenderLink, intensity: number) {
  const dx = Math.abs(link.x1 - link.x0);
  const height = Math.max(60, Math.min(420, dx * 0.35));

  const cp1x = link.x0;
  const cp1y = link.y0 - height;
  const cp2x = link.x1;
  const cp2y = link.y1 - height;

  ctx.beginPath();
  ctx.moveTo(link.x0, link.y0);
  ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, link.x1, link.y1);
  ctx.stroke();
}
```

## Default network rendering

Default rendering should be subtle:

```ts
ctx.globalAlpha = 0.035;
ctx.lineWidth = 0.65;
ctx.shadowBlur = 0;
```

## Active link rendering

Only the active link should glow:

```ts
ctx.globalAlpha = 1;
ctx.lineWidth = 2.5;
ctx.shadowBlur = 15;
ctx.shadowColor = '#10b981';
ctx.strokeStyle = '#10b981';
```

## Color classes

Recommended:

| Relationship | Color |
|---|---|
| OT → OT | `rgba(59, 130, 246, 0.35)` |
| OT → NT | `rgba(16, 185, 129, 0.45)` |
| NT → NT | `rgba(236, 72, 153, 0.35)` |
| same book | `rgba(168, 85, 247, 0.32)` |
| same chapter | `rgba(148, 163, 184, 0.30)` |

## Hover detection

### MVP approach

Sample points along each Bezier curve and store them in a spatial index.

```ts
type HitPoint = {
  x: number;
  y: number;
  linkId: number;
};
```

Create a D3 quadtree:

```ts
const tree = d3.quadtree<HitPoint>()
  .x(d => d.x)
  .y(d => d.y)
  .addAll(hitPoints);
```

On pointer move:

```ts
const nearest = tree.find(pointer.x, pointer.y, hoverRadius);
```

If nearest exists, activate its link.

### Optimization

Do not sample every link too densely.

Recommended sampling:

- short links: 6 points
- medium links: 10 points
- long links: 16 points

Rebuild the quadtree only when:

- data changes
- filters change
- viewport changes

## Redraw strategy

### Full redraw triggers

- initial load
- resize
- data loaded
- filter changed

### Interaction redraw triggers

- active link changed
- selected link changed

Pointer move should not redraw the full background layer.

## Axis rendering

Axis should include:

- subtle base line
- book segment ticks
- larger OT/NT division
- optional short book labels
- hover anchor dots

## Mobile behavior

On mobile:

- tap selects a link
- card appears as bottom sheet
- axis labels reduce to abbreviated labels
- filters collapse into a floating button


---

# UI/UX Design Guide

## Design keywords

- modern
- refined
- trustworthy
- sacred but not old-fashioned
- dynamic geometric
- quiet premium
- data visualization first

## Visual direction

Use a deep navy/charcoal background with faint radial gradients. The network should look like a sacred constellation or illuminated manuscript translated into modern data art.

## Palette

```txt
Background: #090D16
Panel: rgba(15, 23, 42, 0.72)
Panel border: rgba(255, 255, 255, 0.10)
Main text: #F8FAFC
Secondary text: #CBD5E1
Muted text: #64748B
OT blue: #3B82F6
NT rose: #EC4899
Active emerald: #10B981
Sacred gold accent: #D4AF37
```

## Typography

Recommended:

- UI font: Inter, Pretendard, system sans-serif
- Reference labels: semibold
- Verse text: readable serif optional, such as Georgia, but only inside the verse card
- Avoid decorative fonts in data-heavy regions

## Layout

Desktop:

```txt
┌──────────────────────────────────────────────────────┐
│ Header: title, subtitle, GitHub link                 │
├──────────────────────────────────────────────────────┤
│                                                      │
│             Canvas visualization area                │
│                                                      │
│                                                      │
│ Bible axis near lower third                          │
├──────────────────────────────────────────────────────┤
│ Footer / attribution / small stats                   │
└──────────────────────────────────────────────────────┘
```

## Header copy

Suggested title:

```txt
ScriptureFlux
```

Suggested subtitle:

```txt
A visual map of cross-references across the 66 books of Scripture.
```

## Reference card

Card fields:

- Source
- Source reference
- Source verse text
- Cross-reference indicator
- Target reference
- Target verse text
- Optional weight/source label

Desktop card placement:

- near pointer with viewport collision detection
- or fixed right-side inspection panel when selected

Mobile card placement:

- bottom sheet
- 80–90% width
- max height 45vh
- scrollable verse text

## Motion

Use motion sparingly:

- card fade/scale in: 150–220 ms
- active link glow: immediate or 120 ms
- background network: no constant animation by default
- optional slow ambient gradient only if it does not affect performance

## Accessibility

- Respect `prefers-reduced-motion`.
- Provide a text equivalent for active cross-reference.
- Make footer attribution readable.
- Ensure keyboard selection can inspect links eventually.
- Do not rely entirely on color; use labels and legend.

## Trust cues

Add subtle credibility elements:

- source attribution footer
- clear data count
- GitHub link
- no manipulative religious language in UI
- avoid excessive neon effects
- keep text sober and factual


---

# Component Structure

## Recommended file tree

```txt
scriptureflux/
├── public/
│   └── data/
│       ├── books.json
│       ├── verse-index.json
│       ├── cross-references.sample.json
│       └── verse-text.sample.json
├── src/
│   ├── app/
│   │   ├── App.tsx
│   │   └── AppShell.tsx
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── Legend.tsx
│   │   ├── visualization/
│   │   │   ├── BibleNetworkCanvas.tsx
│   │   │   ├── CanvasLayer.tsx
│   │   │   └── AxisLabels.tsx
│   │   └── ui/
│   │       ├── ReferenceCard.tsx
│   │       ├── FilterPanel.tsx
│   │       └── LoadingState.tsx
│   ├── data/
│   │   ├── bibleBooks.ts
│   │   └── sampleCrossReferences.ts
│   ├── hooks/
│   │   ├── useDataset.ts
│   │   ├── useCanvasSize.ts
│   │   ├── usePointerRaf.ts
│   │   └── useReducedMotion.ts
│   ├── lib/
│   │   ├── geometry/
│   │   │   ├── bezier.ts
│   │   │   ├── projection.ts
│   │   │   └── hitTest.ts
│   │   ├── rendering/
│   │   │   ├── drawAxis.ts
│   │   │   ├── drawLinks.ts
│   │   │   └── drawActiveLink.ts
│   │   ├── data/
│   │   │   ├── normalize.ts
│   │   │   ├── validate.ts
│   │   │   └── labels.ts
│   │   └── constants.ts
│   ├── styles/
│   │   └── globals.css
│   ├── types/
│   │   ├── bible.ts
│   │   ├── dataset.ts
│   │   └── visualization.ts
│   └── main.tsx
├── scripts/
│   └── prepare-data.ts
├── AGENTS.md
├── ATTRIBUTION.md
├── DATA_SOURCES.md
├── package.json
└── vite.config.ts
```

## Core components

### `AppShell`

Owns full-page layout.

Responsibilities:

- Header
- main visualization container
- footer attribution
- global background

### `BibleNetworkCanvas`

Owns canvas lifecycle and rendering orchestration.

Props:

```ts
type BibleNetworkCanvasProps = {
  books: BibleBook[];
  verseIndex: VerseIndex;
  links: CrossReferenceTuple[];
  verseText: VerseTextMap;
  filters: VisualizationFilters;
  onActiveLinkChange: (link: ActiveLink | null) => void;
};
```

### `ReferenceCard`

Displays the selected/hovered relationship.

Props:

```ts
type ReferenceCardProps = {
  activeLink: ActiveLink | null;
  pointer: { x: number; y: number } | null;
  mode: 'hover' | 'selected';
};
```

### `Legend`

Explains line colors.

### `FilterPanel`

Optional in MVP, useful in v1.

## Hooks

### `useDataset`

Loads static JSON files.

Return shape:

```ts
{
  status: 'loading' | 'ready' | 'error';
  books: BibleBook[];
  verseIndex: VerseIndex;
  links: CrossReferenceTuple[];
  verseText: VerseTextMap;
  error?: Error;
}
```

### `useCanvasSize`

Uses `ResizeObserver` to provide container bounds and DPR.

### `usePointerRaf`

Throttles pointer events to animation frames.

## Type safety

All external data must be validated before rendering.

Do not assume JSON files are valid.


---

# Implementation Roadmap

## Phase 0: Repository setup

Tasks:

- Create Vite React TypeScript app.
- Install Tailwind CSS.
- Install D3 and Framer Motion.
- Configure ESLint/Prettier if desired.
- Add GitHub Pages deployment workflow.

Deliverable:

- Blank dark page with title and footer.

## Phase 1: Static sample visualization

Tasks:

- Create a small sample dataset with 20–50 cross references.
- Add complete 66-book metadata.
- Implement verse offset projection.
- Render axis and sample arcs.

Deliverable:

- A working visual prototype with no hover.

## Phase 2: Hover and overlay

Tasks:

- Implement Bezier point sampling.
- Build quadtree hit testing.
- Add active link glow.
- Add ReferenceCard.
- Add viewport collision handling.

Deliverable:

- Hovering a curve reveals source and target verse card.

## Phase 3: Dataset pipeline

Tasks:

- Build `scripts/prepare-data.ts`.
- Normalize raw cross-reference input.
- Validate book/chapter/verse references.
- Emit compact matrix JSON.
- Emit data report.

Deliverable:

- Production-style data files loaded by the app.

## Phase 4: Performance optimization

Tasks:

- Split background and interaction canvas if needed.
- Avoid full redraw on pointer movement.
- Memoize computed geometry.
- Add filter-aware quadtree rebuild.
- Add performance debug overlay behind a dev flag.

Deliverable:

- Smooth interaction with a large dataset.

## Phase 5: UI polish

Tasks:

- Add legend.
- Add statistics strip.
- Add filter panel.
- Add mobile bottom sheet behavior.
- Add reduced-motion support.
- Add attribution footer.

Deliverable:

- Presentable public beta.

## Phase 6: Release readiness

Tasks:

- Add README.
- Add screenshots/GIF.
- Add attribution and data source documentation.
- Confirm licenses.
- Deploy to GitHub Pages.
- Create v0.1.0 release tag.

Deliverable:

- Public GitHub repository and live demo.

## Suggested issue breakdown

1. `chore: scaffold Vite React TypeScript app`
2. `feat: add 66-book metadata and verse projection`
3. `feat: render Bible axis on canvas`
4. `feat: render cross-reference arcs from sample data`
5. `feat: implement quadtree hover detection`
6. `feat: add reference overlay card`
7. `feat: add dataset preprocessing script`
8. `perf: split static and interaction canvas layers`
9. `feat: add filters and legend`
10. `docs: add attribution and data source notes`
11. `ci: deploy to GitHub Pages`


---

# QA and Performance Checklist

## Functional checks

- [ ] App loads with no console errors.
- [ ] 66 books render in correct order.
- [ ] Old Testament and New Testament are visually distinguishable.
- [ ] Cross-reference arcs connect correct source and target positions.
- [ ] Hovering a visible arc activates the correct relationship.
- [ ] ReferenceCard displays correct source and target labels.
- [ ] Verse text lookup returns expected text for known references.
- [ ] Filters update visible links.
- [ ] Attribution footer is visible.

## Data checks

- [ ] Every book has a valid index.
- [ ] Every chapter count is correct.
- [ ] Every verse reference validates against the verse index.
- [ ] Invalid references are reported by the preprocessing script.
- [ ] Duplicate links are either removed or intentionally retained.
- [ ] Production dataset is smaller after minification/compression.

## Performance checks

Use Chrome DevTools Performance panel.

Target:

- [ ] Initial render completes without long UI freeze.
- [ ] Pointer movement remains responsive.
- [ ] Hover detection is throttled with `requestAnimationFrame`.
- [ ] Full background canvas does not redraw on every pointer event.
- [ ] Active glow applies only to one or a small number of selected links.
- [ ] No continuous animation runs unless necessary.
- [ ] Resize handler is debounced or ResizeObserver-driven.
- [ ] Event listeners are cleaned up on unmount.

## Visual checks

- [ ] Network field is visible but not overwhelming.
- [ ] Active link is immediately recognizable.
- [ ] Overlay card remains readable against the background.
- [ ] UI feels reverent/trustworthy rather than arcade-like.
- [ ] Mobile card does not overflow viewport.
- [ ] Labels are not cluttered on small screens.

## Accessibility checks

- [ ] Text contrast is sufficient.
- [ ] Reduced motion mode disables non-essential motion.
- [ ] Interactive controls are keyboard-focusable.
- [ ] Footer attribution is readable.
- [ ] Canvas has an accessible description.

## Browser checks

Test:

- [ ] Chrome
- [ ] Edge
- [ ] Firefox
- [ ] Safari if available
- [ ] Android Chrome if possible
- [ ] iOS Safari if possible

## Release checks

- [ ] `npm run build` succeeds.
- [ ] GitHub Pages path works.
- [ ] Repository README explains data source and licensing.
- [ ] `ATTRIBUTION.md` is present.
- [ ] `DATA_SOURCES.md` is present.
- [ ] License file is present.


---

# GitHub Deployment Guide

## Repository name suggestions

Recommended:

```txt
scriptureflux
```

Alternatives:

```txt
bible-cross-reference-map
scripture-network-visualizer
crossref-scripture-map
```

## Initial repository setup

```bash
npm create vite@latest scriptureflux -- --template react-ts
cd scriptureflux
npm install
npm install d3 framer-motion
npm install -D tailwindcss @tailwindcss/vite
```

Follow the current Tailwind + Vite setup instructions for the installed Tailwind version.

## Suggested package scripts

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "preview": "vite preview",
    "prepare:data": "tsx scripts/prepare-data.ts"
  }
}
```

## GitHub Pages deployment

Create:

```txt
.github/workflows/deploy.yml
```

Suggested workflow:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: npm

      - name: Install
        run: npm ci

      - name: Build
        run: npm run build

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: dist

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy
        id: deployment
        uses: actions/deploy-pages@v4
```

## Vite base path

If deploying to:

```txt
https://USERNAME.github.io/scriptureflux/
```

configure:

```ts
// vite.config.ts
export default defineConfig({
  base: '/scriptureflux/',
  plugins: [react()]
});
```

If deploying to a custom domain or user root page, use:

```ts
base: '/'
```

## Documentation files

Add:

```txt
README.md
DATA_SOURCES.md
ATTRIBUTION.md
LICENSE
```

## README outline

```md
# ScriptureFlux

A modern Bible cross-reference visualization.

## Features

## Demo

## Data sources

## Local development

## Build

## Deployment

## License and attribution
```

## Release process

1. Confirm dataset license.
2. Confirm Bible text license.
3. Run build.
4. Deploy to GitHub Pages.
5. Tag release:

```bash
git tag v0.1.0
git push origin v0.1.0
```


---

# Agent Prompts

## Prompt 1: Initial scaffold

```txt
이 저장소의 AGENTS.md와 01~11번 설계 문서를 정독해줘.
Vite + React + TypeScript + Tailwind 기반으로 ScriptureFlux 앱을 구현해줘.

1차 목표는 다음이야:
- 66권 성경 축 렌더링
- 샘플 교차참조 데이터 렌더링
- Canvas 기반 Bezier 곡선 렌더링
- 기본 Header/Footer/Attribution
- npm run dev / npm run build 성공

SVG로 수천 개 path를 만들지 말고 Canvas를 사용해줘.
```

## Prompt 2: Hover interaction

```txt
현재 ScriptureFlux 앱에 hover interaction을 구현해줘.

요구사항:
- Bezier curve를 샘플링해서 hit point를 만들 것
- d3-quadtree 또는 동등한 공간 인덱스를 사용할 것
- pointermove는 requestAnimationFrame으로 throttle 할 것
- active link만 glow 처리할 것
- ReferenceCard에 source/target reference와 verse text를 표시할 것
- viewport 밖으로 카드가 나가지 않도록 보정할 것
```

## Prompt 3: Dataset pipeline

```txt
scripts/prepare-data.ts를 만들어줘.

목표:
- raw cross-reference 데이터를 읽고
- book/chapter/verse를 정규화하고
- 66권 book index로 변환하고
- 잘못된 reference를 data-report.json에 기록하고
- compact tuple matrix로 public/data/cross-references.min.json을 출력해줘.

Matrix format:
[sourceBookIndex, sourceChapter, sourceVerse, targetBookIndex, targetChapter, targetVerse, weight]
```

## Prompt 4: Performance pass

```txt
Canvas 성능 최적화를 해줘.

반드시 지킬 것:
- 전체 cross-reference background layer는 pointermove마다 다시 그리지 말 것
- shadowBlur는 active link에만 적용할 것
- ResizeObserver와 cleanup을 정확히 구현할 것
- large dataset 기준으로 geometry memoization 구조를 만들 것
- performance debug flag를 추가해서 link count, hit point count, frame time을 확인할 수 있게 할 것
```

## Prompt 5: Release readiness

```txt
GitHub Pages 배포 가능한 형태로 정리해줘.

작업:
- README.md 작성
- DATA_SOURCES.md 작성
- ATTRIBUTION.md 작성
- .github/workflows/deploy.yml 작성
- vite.config.ts base path 설명 주석 추가
- npm run build 통과 확인
- public demo에서 저작권 문제가 없도록 verse text와 dataset 출처를 명확히 분리해줘
```
