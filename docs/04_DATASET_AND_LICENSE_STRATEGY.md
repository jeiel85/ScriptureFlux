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
