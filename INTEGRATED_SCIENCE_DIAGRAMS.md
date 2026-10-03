Approved CSEC Integrated Science diagrams
========================================

Based on main commit `8002d086d972e5105446d7b4ecba87ec4bc78171`, fetched again immediately before packaging on 2 October 2026.

This change installs all 559 approved review views: 555 image files plus the approved text/removal entries. Published artwork is preserved byte-for-byte, including the explicitly approved raster exceptions. The seven practice graphs retain SPARK's exact data. Per-image attribution, licence links and adaptation notes are available in the lesson and in `public/integrated-science/diagrams/credits.json`.

Current main lacked most of the review branch's Integrated Science explorer components. This patch adds the necessary subject components and routes existing Integrated Science `interactiveModels` metadata to them. It preserves main's generic study routing, progress handling, shared label component and shared transport component. Physics and other subject code are not modified. No database migrations or dependency changes are included.

Interaction changes
-------------------

- Approved references support enlargement and image credits.
- Skeleton detail selection uses accessible buttons alongside its reference image. Rusting controls remain available.
- The nine replaced label-template illustrations are reference images with drag/tap description matching below them. Existing label IDs, scoring, hints, reset and completion callbacks are retained. The eleven originally approved interactive templates retain their existing image targets.
- The Archimedes image is a fixed worked example. A separate calculator uses the student's values and flags apparent weight greater than weight in air.
- Continuous input values outside the captured review snapshots retain an approved reference for the same scene. Live calculations remain in the lesson controls; sourced artwork is not dynamically redrawn.
- Previously empty respiratory-system and chloroplast tabs now show their approved views.

Validation
----------

- 559 captured diagram signatures match; 559 registry entries are installed.
- All 555 installed image files exist, pass format/security checks, and retain approved bytes.
- 123 tests pass, including 113 explorer entry points and tab controls, label scoring/completion, raster support, image switching, source credits and buoyancy edge cases.
- Desktop (1360px) and mobile (390px) browser fixtures: images load, controls and zoom work, no page errors or horizontal overflow.
- Production build succeeds with existing app-wide lint warnings. Strict `CI=true` fails because warnings are treated as errors; the remaining warnings are outside this change. No claim of a warning-free repository is made.

Apply the patch
---------------

From a clean SPARK checkout at the base commit (or current main if the patch check succeeds):

```sh
git apply --check /path/to/CSEC-Integrated-Science-approved.patch
git apply /path/to/CSEC-Integrated-Science-approved.patch
npm test -- --watchAll=false --runInBand --runTestsByPath src/subjects/components/IntegratedScienceExplorerCoverage.test.jsx src/subjects/components/IntegratedScienceDiagrams.test.jsx src/subjects/components/ReviewedScienceDiagram.test.jsx src/subjects/components/interactiveLabelDiagramModel.test.js
npm run build
```

Run the check first and resolve any later-main conflicts before applying. The patch contains binary raster files; use `git apply`, not manual copy/paste. Nothing is pushed or deployed by applying it.
