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
