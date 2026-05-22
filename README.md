# ScriptureFlux

> 성경 66권의 교차 참조 구조를 하나의 시각적 네트워크로 보여주는 정적 웹앱입니다.

ScriptureFlux는 성경 전체를 하나의 연속된 축으로 표현하고, 서로 연관된 구절들을 곡선으로 연결하는 Bible Cross-Reference Visualization 프로젝트입니다. 기본 화면에서는 실제 구절 본문을 노출하지 않고, 사용자가 연결선에 hover 또는 focus했을 때만 source/target 구절과 참조 정보를 오버레이 카드로 보여줍니다.

## 🎨 Original Inspiration (영감을 준 프로젝트)

ScriptureFlux는 **크리스 해리슨(Chris Harrison)** 교수의 2008년 시각화 예술 작품인 **"Bible Cross-References"**와 **OpenBible.info** 프로젝트의 오픈 데이터에서 직접적인 영감을 받아 탄생하였습니다. 
- **시각화 아이디어**: [Chris Harrison's Bible Visualization](https://www.chrisharrison.net/index.php/Visualizations/BibleVis)
- **교차 참조 데이터**: [OpenBible.info (Christoph Römhild & Sean Harrison)](https://www.openbible.info)

원작자들의 뛰어난 창의성과 데이터를 아낌없이 개방해 주신 헌신에 마음 깊이 존경과 감사를 표합니다. 자세한 출처와 라이선스에 관한 정보는 [ATTRIBUTION.md](file:///D:/Project/ScriptureFlux/ATTRIBUTION.md) 문서에서 확인할 수 있습니다.

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
