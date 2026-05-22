# Data Sources

## Cross-reference data

Primary candidate:

- OpenBible.info Bible Cross References

Implementation note:

- The project should verify the current downloadable data file and its license before committing raw or transformed data.
- Keep transformation scripts in the repository so the generated dataset is reproducible.
- Preserve attribution in `ATTRIBUTION.md` and the app footer.

## Bible text

Recommended MVP options:

1. Use no bundled verse text, only references.
2. Use KJV public-domain text for an English demo where legally appropriate.
3. Allow users to configure/import their own licensed Bible text.

## Korean Bible text

Do not bundle modern Korean Bible translations unless a redistribution license is explicitly confirmed.

## Required documentation

- `ATTRIBUTION.md`
- `DATA_SOURCES.md`
- `LICENSE`
- source comments in the data preprocessing script
