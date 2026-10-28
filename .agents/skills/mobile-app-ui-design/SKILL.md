---
name: mobile-app-ui-design
description: Audit and improve SPARK's Android/iOS Capacitor UI, native navigation, typography, safe areas, course selection, lessons, assessment views and accessibility. Use when refining mobile interfaces. Keep the existing React/Vite web product and Supabase marking unchanged.
---

# Mobile App UI/UX Design

Project-local adaptation of the `mobile-app-ui-design` skill supplied by the SPARK project owner. Read [SPARK patterns](references/spark-mobile-guidelines.md) and [QA checklist](references/mobile-qa-checklist.md) before changing mobile screens.

## Workflow

1. Inspect the actual current component, styles, routes and user journey.
2. Identify the one main action and previous/next screen. Remove duplicate headers, marketing copy, oversized cards, excessive labels and unrelated actions.
3. Use native-only components or styles scoped to `isSparkNativeApp()` / `html.spark-native-app`. Do not change the website's layout or its Supabase data flow without an explicit requirement.
4. Use a 3–5 destination bottom bar on root screens, one left chevron for nested screens, and a focused layout for examinations and lessons.
5. Keep essential instructions, error states and assessment tools. Never simplify away question information, graph controls, required evidence, timers, autosave or marking.
6. Validate at narrow widths, both themes, large fonts, safe areas and keyboard visible. Run relevant Jest tests, Vite mobile build, Android sync and regression checks.
7. Report the committed diff, verification status and any untested native-device behavior.

## Layout and typography

- System Android Roboto / iOS San Francisco where appropriate; respect font scaling.
- Screen title 18–22px, section title 16–18px, body 14–16px, supporting 12–13px.
- Horizontal padding 16px, row gaps 8–12px, section spacing 16–24px.
- Icon glyphs 18–22px but controls at least 44×44px (prefer 48×48 for Android actions).
- Prefer modest borders and neutral backgrounds. Keep SPARK navy and restrained teal. Avoid gradients, stacked containers and overlong introductions.
- Use short course names and current progress when available; never manufacture a completion statistic.
- Preserve reading order, voice labels, reduced motion and contrast.

## Navigation

- Root student tabs: Home, Study, Practice, Progress, More.
- More is a sheet for secondary destinations, notifications, account settings and appearance; it should dismiss predictably and retain focus.
- Nested pages: a small leading chevron, accessible description and reliable parent route.
- Exams: Exit, time, question navigation, answer controls and Submit. Hide persistent app tabs during active work; do not silently reset an attempt.
- Respect route hashes, browser history, Android Back and iPhone gestures. Device-specific behavior must be tested, not assumed.

## SPARK safeguards

- Maintain student, parent and tutor role separation, enrollment checks and RLS.
- All subjects stay sourced from the current catalog. Never surface disabled courses.
- Keep Mathematics/Science SVGs, graphing and partial-credit grading intact.
- Review notification links, study progress, draft recovery, practice result states and theme behavior.
- Never infer V2 marking verification from a UI build succeeding.
- Preserve existing web builds and do not merge or deploy from a QA-only branch without approval.

## Quick rejection test

- Does the first viewport show the next useful task?
- Is there only one persistent navigation surface?
- Do the left chevron, tab bar and content destinations work?
- Are tap targets generous, icons restrained and fonts readable?
- Does a backgrounded exam preserve the user's work?
- Are source tests and Android/iPhone QA complete before release?

Original source attribution: supplied `mobile-app-ui-design-skill(1).zip`, derived from the user's `mobile-app-ui-design-main.zip` package, with original README attribution to `ceorkm/mobile-app-ui-design`.
