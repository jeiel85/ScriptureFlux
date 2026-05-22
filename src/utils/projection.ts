export interface VerseRef {
  bookIndex: number;
  chapter: number;
  verse: number;
}

export interface BookIndexOffset {
  bookIndex: number;
  startVerseOffset: number;
  verseCount: number;
  chapterVerseCounts: number[];
}

export interface VerseIndex {
  totalVerses: number;
  books: BookIndexOffset[];
}

/**
 * 특정 성경 구절(책 인덱스, 장, 절)을 0 ~ totalVerses-1 범위의 global verse offset으로 변환합니다.
 */
export function toGlobalVerseOffset(
  ref: VerseRef,
  verseIndex: VerseIndex
): number {
  const book = verseIndex.books[ref.bookIndex];
  if (!book) {
    throw new Error(`Invalid bookIndex: ${ref.bookIndex}`);
  }

  // 이전 장들의 절 수 누적 합산
  let chapterStart = 0;
  for (let i = 0; i < ref.chapter - 1; i++) {
    chapterStart += book.chapterVerseCounts[i] || 0;
  }

  // 1-indexed인 절과 장을 0-indexed로 조정하여 누적
  return book.startVerseOffset + chapterStart + (ref.verse - 1);
}

/**
 * global verse offset을 Canvas 렌더링 영역의 X 좌표값으로 매핑합니다.
 */
export function offsetToX(
  offset: number,
  totalVerses: number,
  width: number,
  padding: number
): number {
  const innerWidth = width - padding * 2;
  if (totalVerses <= 1) return padding;
  return padding + (offset / (totalVerses - 1)) * innerWidth;
}

/**
 * 반대로 Canvas X 좌표값을 바탕으로 global verse offset을 추적합니다.
 */
export function xToOffset(
  x: number,
  totalVerses: number,
  width: number,
  padding: number
): number {
  const innerWidth = width - padding * 2;
  if (innerWidth <= 0) return 0;
  const ratio = (x - padding) / innerWidth;
  const clampedRatio = Math.max(0, Math.min(1, ratio));
  return Math.round(clampedRatio * (totalVerses - 1));
}

/**
 * global offset을 바탕으로 구절 정보(VerseRef)를 복원합니다.
 */
export function offsetToVerseRef(
  offset: number,
  verseIndex: VerseIndex
): VerseRef {
  // 바이너리 서치 또는 순차 서치로 해당 오프셋이 속한 책을 찾습니다.
  let low = 0;
  let high = verseIndex.books.length - 1;
  let bookIndex = 0;

  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    const book = verseIndex.books[mid];
    const nextBook = verseIndex.books[mid + 1];
    
    const start = book.startVerseOffset;
    const end = nextBook ? nextBook.startVerseOffset : verseIndex.totalVerses;

    if (offset >= start && offset < end) {
      bookIndex = mid;
      break;
    } else if (offset < start) {
      high = mid - 1;
    } else {
      low = mid + 1;
    }
  }

  const book = verseIndex.books[bookIndex];
  const localOffset = offset - book.startVerseOffset;

  let chapter = 0;
  let verse = 0;
  let accumulated = 0;

  for (let i = 0; i < book.chapterVerseCounts.length; i++) {
    const counts = book.chapterVerseCounts[i];
    if (localOffset < accumulated + counts) {
      chapter = i + 1;
      verse = localOffset - accumulated + 1;
      break;
    }
    accumulated += counts;
  }

  // 예외 케이스: 마지막 절 범위 초과 대응
  if (chapter === 0) {
    chapter = book.chapterVerseCounts.length;
    verse = book.chapterVerseCounts[chapter - 1];
  }

  return { bookIndex, chapter, verse };
}
