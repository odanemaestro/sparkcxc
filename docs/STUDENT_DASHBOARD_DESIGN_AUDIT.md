# SPARK Student Dashboard Design Audit

Branch: `feat/student-dashboard-approved-design-v1`

This document is the acceptance checklist for the redesigned student overview. The branch must not be merged into `main` until the visual result is approved.

## Product hierarchy

The overview follows one reading order:

1. **Next action** — one specific learning recommendation and one primary action.
2. **Learning priorities** — one subject list, sorted with the lowest lesson completion first.
3. **Time-sensitive information** — next tutoring session appears first in the support rail.
4. **Secondary study tools** — flashcards and recent activity.
5. **Personal planning** — the existing overall learning goal.
6. **Motivation and rewards** — the complete existing SPARK Rewards panel.
7. **Family controls** — pending connection requests and family code remain available without competing with learning actions.

## Existing dashboard capability inventory

| Existing capability | New location | Status |
| --- | --- | --- |
| Greeting | Next-action hero | Preserved |
| Continue studying | Specific hero recommendation | Improved |
| Quick practice | Per-subject Practise action using the real practice route | Consolidated |
| Flashcards | Support rail | Preserved |
| SPARK Rewards | Main column below goal | Preserved |
| Enrolled subject count | Subject summary line | Consolidated |
| Lessons completed | Subject summary line | Consolidated |
| Practice results | Subject summary line | Consolidated |
| Study streak | Hero streak card | Preserved, duplicate stat removed |
| Subject progress | One sorted subject list | Consolidated |
| SPARK subject insight | Subject heading + next-activity column | Consolidated |
| Subject-specific evidence | Each subject row | Preserved |
| Progress report | Subject header action | Preserved |
| Overall learning goal | Main column | Preserved |
| Next tutoring session | First support-rail card | Improved |
| Recent activity / achievements | Support rail | Preserved |
| Parent connection request | Full-width family section | Preserved |
| Family code + copy action | Full-width family section | Preserved |
| Profile photo editor | Existing sidebar only | Preserved, duplicate prohibited |

## Deliberately removed duplication

- No separate four-card statistics grid.
- No second copy of the study streak.
- No progress rings plus progress cards showing the same percentages.
- No generic quick-action strip duplicating the hero, subject actions and navigation.
- No second profile-photo editor in the hero.
- No decorative bubble/orb artwork.
- No subject-specific pastel progress-bar colors. Progress uses one navy fill and a neutral track.

## Visual system

- Light neutral canvas and white surfaces.
- Existing SPARK navy is the main anchor.
- Teal is used for progress/positive emphasis.
- Amber is reserved for streak/reward emphasis.
- Muted text remains dark enough to read against neutral surfaces.
- Borders and shallow shadows define hierarchy without making every block look elevated.
- Existing SVG icon system is used instead of dashboard emoji.

## Interaction integrity

- Hero action opens the recommended subject.
- Subject `Practise` buttons use each subject's actual practice route.
- Subject management, progress, progress report, flashcards and bookings keep their existing routes.
- Family approval/decline and family-code copy behavior are unchanged.
- Rewards privacy and leaderboard interactions remain unchanged.
- Goal edit/save/suggestion behavior remains unchanged.

## Responsive audit targets

### Desktop / laptop
- Two-column content layout.
- Subject list remains scan-friendly.
- Right rail begins with tutoring.
- Main learning content remains visually dominant.

### Tablet / iPad
- Dashboard collapses to one main column before the subject list becomes cramped.
- Support cards become a horizontal three-card row where width allows.
- Subject rows reduce columns before stacking.

### Mobile
- Hero becomes one column.
- Primary and secondary hero actions become full width.
- Subject rows stack without horizontal scrolling.
- Support cards stack vertically.
- Existing dashboard navigation and safe-area behavior remain intact.

## Theme and accessibility audit

- Dark mode has separately selected surface/border colors.
- Progress is not communicated by color alone: every row includes a numeric percentage.
- The weakest subject uses both position and the text label `Focus next`.
- Buttons retain visible focus treatment.
- Touch targets remain at least approximately 40–44 px high for primary controls.
- Reduced-motion preference disables the new press transitions.
- No low-contrast grey-on-pastel subject cards.
- No essential information is encoded only by red/green/orange.

## Validation

Required before approval:

- Full Jest regression suite passes.
- Marking database verification passes.
- Server marker bundle builds.
- Production SPARK build passes.
- Manual visual review at narrow phone, standard phone, tablet/iPad and desktop widths.
- Light mode and dark mode reviewed.
- No clipping of buttons, subject rows, family cards or support cards.
- No duplicate profile-photo control.
- No dashboard feature from the inventory above is missing.
