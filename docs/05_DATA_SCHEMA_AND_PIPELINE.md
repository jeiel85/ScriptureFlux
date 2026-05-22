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
