# Mobile quality assurance checklist

## First viewport
- [ ] A student sees a relevant action, subject or lesson rather than repeated marketing copy.
- [ ] The page title is compact and not cut off, including a long subject name.
- [ ] No unwanted horizontal scrolling at 320, 360, 390 or 430px.
- [ ] System status bar and gesture/home indicator have safe-area spacing.

## Navigation
- [ ] Bottom tabs show on root screens and not on timed exam screens.
- [ ] Left-chevron buttons open the intended parent screen.
- [ ] More sheet opens, keyboard focus stays inside, Escape closes and focus returns.
- [ ] More destinations highlight the appropriate tab instead of wrongly highlighting Home.
- [ ] Browser history, iOS gesture and Android system Back are tested on device.
- [ ] Deep links to student pages and notifications arrive at the right screen.

## Courses and state
- [ ] Last-opened subject shortcut is restricted to the same account and capability.
- [ ] No removed or unenrolled course appears through local history.
- [ ] Every subject appears at most once in the list.
- [ ] Lesson progress is sourced from stored actual completions.
- [ ] Large-font settings and screen reader modes keep controls accessible.

## Exams
- [ ] Answers and timers persist across question navigation, backgrounding and resume.
- [ ] Paper 1 navigator, Paper 2 diagrams and graph tools work on touch.
- [ ] Submit/Exit are distinct and warnings prevent unintended attempt loss.
- [ ] Result verification status does not change from UI-only changes.

## Release gates
- [ ] Jest/unit and targeted navigation tests pass.
- [ ] Vite mobile build, Android scaffolding/sync and full SPARK regression pass.
- [ ] Physical Android and iOS checks completed before store submission.
- [ ] No secrets, signing keys, or Supabase service-role credentials committed.
