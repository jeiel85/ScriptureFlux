# AGENT_START_PROMPT.md

아래 프롬프트를 코딩 에이전트 첫 요청으로 사용하세요.

```text
이 저장소는 ScriptureFlux 프로젝트입니다.

먼저 다음 문서를 순서대로 읽고, 문서 간 충돌이 있으면 AGENTS.md를 최우선으로 삼아주세요.

1. AGENTS.md
2. README.md
3. docs/00_DESIGN_INDEX.md
4. docs/ScriptureFlux_Agent_Master_Spec.md
5. docs/04_DATASET_AND_LICENSE_STRATEGY.md
6. TASKS.md
7. DECISIONS.md
8. HISTORY.md
9. CHANGELOG.md

목표는 Vite + React + TypeScript + Tailwind CSS 기반의 정적 SPA를 구현하는 것입니다.

첫 번째 작업 범위:
- 프로젝트 스캐폴딩
- 66권 성경 메타데이터 작성
- verse-position projection 유틸리티 작성
- 샘플 cross-reference 데이터 작성
- Canvas 기반 성경 축과 곡선 링크 렌더링
- hover 시 active link 강조와 ReferenceCard 표시
- npm run build 성공

주의:
- 수만 개 링크를 SVG DOM path로 만들지 마세요.
- 모든 선에 shadowBlur/filter/glow를 적용하지 마세요.
- 성경 본문 번역본 라이선스가 불명확하면 public repo에 포함하지 마세요.
- 구현 후 HISTORY.md, CHANGELOG.md, TASKS.md를 갱신하세요.
```
