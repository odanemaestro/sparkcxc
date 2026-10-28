# SPARK mobile app patterns

This guidance is adapted from the project owner's uploaded mobile-app-ui-design skill.

## Student learning

- Mobile is a focused learning product, not the website compressed into a phone.
- Compact titles, one meaningful primary action, limited copy and restrained icons.
- Study: the last opened enrolled subject may be shown as a quick shortcut, with all other active enrolled subjects available once each.
- A locally stored shortcut does not claim to represent completion progress or sync across devices. The backend stays authoritative for access and progress.
- Subject -> Section -> Topic/Lesson -> Practice -> Results -> Next lesson should have understandable return paths.
- Show progress only if it comes from existing data, never make up scores or enrollment.

## Native navigation

- No repeated SPARK web header on signed-in student screens.
- Bottom tabs for Home, Study, Practice, Progress and More. Keep the active tab aligned with secondary destinations such as bookings and flashcards.
- A left-aligned 19–20px chevron inside a 44–48px touch area is the default nested Back action.
- Focused exams and lesson workspaces avoid persistent tabs when task-specific controls are more useful.
- Short More menus should be accessible: label controls, trap keyboard focus, dismiss with Escape and restore focus. Android native Back needs device testing.

## Assessment integrity

- Questions, diagrams, editable graphs, timers and answer input are dominant. Do not bury them under visual decoration.
- Keep autosave, attempt recovery, marking and verified-result logic unchanged by visual-only passes.
- Clarify scores and marking status accurately; provisional or partially verified results are not final.
- Provide screen-reader labels, adequate answer target sizes and clear selected states.

## Devices, text and themes

- Test 320/360/390/430px phone widths, tablets, light/dark, landscape where necessary, keyboard and safe-area insets.
- Normal text contrast at least 4.5:1. Allow text enlargement and reduce animation on request.
- Prefer phone system fonts, 18–22px page titles, 16px section titles, 14–16px body copy, 12–13px supporting copy, 20px navigation icons.
- Use calm navy surfaces and teal for meaning rather than decoration.
