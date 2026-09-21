# Integrated Science Final Package Checkpoint

Branch: `integrated-science-acceptance-audit`

## Recovery anchor

The full content/visual package immediately before this checkpoint commit is:

`2668d9987b1a8e5ee586fda47a446ce45882b416`

SPARK Quality Gate run 869 was started against that exact final-package SHA during final packaging.

If the chat/session is interrupted, resume from this branch and first check the latest branch HEAD and the Quality Gate result. Do not restart the broad content audit unless the final gate exposes a specific regression.

## Finalisation status

Integrated Science is in final QA/package mode, not broad content construction.

Completed:
- canonical objective migrations and lesson wiring
- learner-order repair for 1.1.1 and 1.1.2
- major scientific SVG acceptance sweep across biology, physics, chemistry and environment
- responsive/dark-mode coverage in the upgraded components
- regression tests for the new scientific diagrams and mechanisms
- water cycle, hurricane, volcano, hydroponics, microbiology, tooth, dengue, mould, aflatoxin, vertebral column, galvanising, hazards, blocked drains, smell/taste/skin receptors, disease routes, asthma, work/force-displacement, transformer induction and space-suit life-support upgrades
- preservation of already-strong anatomy/apparatus diagrams instead of unnecessary redraws

## Current final-package state

- Final packaging head before this checkpoint update: `2668d9987b1a8e5ee586fda47a446ce45882b416`
- Run 869 is the exact-head SPARK Quality Gate for that SHA.
- The stale PostgreSQL `DO $ ... END $;` assertion was corrected on the final package head.

## Final package tasks remaining

1. Obtain a green SPARK Quality Gate on the latest final-package HEAD.
2. Fix only concrete failing regressions found by the gate.
3. Run/confirm the production build on that same final HEAD.
4. Perform the final acceptance sweep:
   - no missing canonical objectives
   - no obvious placeholder/weak scientific diagrams
   - responsive mobile/tablet/iPad/desktop behaviour
   - light/dark theme readability
   - no malformed scientific text or mojibake
5. Record the final exact commit SHA and package/handoff state.

## Important acceptance rules

- Preserve CSEC Integrated Science terminology, level and tone.
- Scientific diagrams must teach the mechanism/anatomy, not merely decorate the lesson.
- Prefer true SVG geometry and labelled scientific structures.
- Do not overwrite already-strong approved diagrams merely for consistency.
- Any final fix must be regression-locked where appropriate.
- Do not call the package final until the exact final HEAD is green and the build is confirmed.
