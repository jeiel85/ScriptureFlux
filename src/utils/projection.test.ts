import { describe, it, expect } from 'vitest';
import { toGlobalVerseOffset, offsetToVerseRef } from './projection';
import verseIndex from '../data/verse-index.json';

describe('Verse Projection Utilities', () => {
  it('should correctly project Gen 1:1 to offset 0', () => {
    const ref = { bookIndex: 0, chapter: 1, verse: 1 };
    const offset = toGlobalVerseOffset(ref, verseIndex);
    expect(offset).toBe(0);

    const reconstructed = offsetToVerseRef(offset, verseIndex);
    expect(reconstructed).toEqual(ref);
  });

  it('should correctly project last verse of Gen (50:26) to offset 1529', () => {
    const ref = { bookIndex: 0, chapter: 50, verse: 26 };
    const offset = toGlobalVerseOffset(ref, verseIndex);
    // Genesis actually has 1530 verses in our index, so last offset is 1529
    expect(offset).toBe(1529);

    const reconstructed = offsetToVerseRef(offset, verseIndex);
    expect(reconstructed).toEqual(ref);
  });

  it('should correctly project Exo 1:1 to offset 1530', () => {
    const ref = { bookIndex: 1, chapter: 1, verse: 1 };
    const offset = toGlobalVerseOffset(ref, verseIndex);
    expect(offset).toBe(1530);

    const reconstructed = offsetToVerseRef(offset, verseIndex);
    expect(reconstructed).toEqual(ref);
  });

  it('should restore Rev 22:21 to the exact original ref', () => {
    const ref = { bookIndex: 65, chapter: 22, verse: 21 }; // Revelation 22:21
    const offset = toGlobalVerseOffset(ref, verseIndex);
    
    const reconstructed = offsetToVerseRef(offset, verseIndex);
    expect(reconstructed).toEqual(ref);
  });
});
