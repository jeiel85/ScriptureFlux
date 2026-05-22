# ScriptureFlux Integrated Design Index

이 문서는 기존 ScriptureFlux 설계 묶음을 현재 프로젝트의 에이전트 운영 문서와 통합한 인덱스입니다.

- 루트 `AGENTS.md`는 작업 규칙과 안전장치의 단일 진실 공급원입니다.
- 이 `docs/` 폴더는 ScriptureFlux 구현 명세의 단일 진실 공급원입니다.
- 구현 전에는 반드시 루트 `README.md`, `TASKS.md`, `DECISIONS.md`도 함께 확인합니다.

---

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
