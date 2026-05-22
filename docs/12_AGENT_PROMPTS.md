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
