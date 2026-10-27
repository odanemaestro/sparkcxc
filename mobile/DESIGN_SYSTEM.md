# SPARK native mobile design system
Version 1.0 | Android + iOS | 2026-10-27

## Product principle

SPARK should behave like a purpose-built education app rather than a responsive website. Keep the web product unchanged. Native students get task-focused screens, a persistent five-destination bottom bar on primary screens, and no stacked website navigation headers. When taking an exam or studying a lesson, hide global tabs and show only essential task controls.

Reference priorities: familiar bottom-tab navigation like mainstream mobile apps, good reading contrast, system typefaces, restrained navy/teal accents, few competing actions, and a predictable route back to the previous screen. Avoid copying other products' content or branding.

## Design tokens

| Item | Android / iOS native |
|---|---|
| Typeface | Roboto on Android; San Francisco/system UI on iOS |
| Large hero title | 27-28sp, weight 700 |
| Page title | 22sp, weight 700 |
| Section title | 18sp, weight 650 |
| Card title | 16sp, weight 650 |
| Body | 14-16sp, weight 400/500, line height 1.45-1.55 |
| Primary button label | 15sp, weight 650 |
| Secondary/supporting text | 12-13sp |
| Navigation label | 10-11sp |
| Exam question | 19sp (scale with OS accessibility), line height 1.5 |
| Exam answer | 16sp, line height 1.45-1.5 |
| Main horizontal padding | 16dp; 12dp on dense exam cards |
| Card padding | 16dp |
| Card corner radius | 16-20dp |
| Vertical stack gap | 12dp |
| Section gap | 20-24dp |
| Minimum touch target | 48 x 48dp for main actions; never less than 44dp |
| Bottom navigation | 5 items; 22-24dp icons, 10-11sp labels; 64-72dp content plus safe-area inset |
| Focus screen toolbar | 48-56dp, only Back/Exit, title and relevant tools |
| Motion | 160-240ms; honor reduced-motion setting |

Font sizing is expressed in scalable points (sp) for native targets and mapped to CSS px at standard scaling in the existing Capacitor WebView. Respect Android text scaling and iOS accessibility font settings. Avoid hard-coded fixed heights for long text. Test at 200% text scaling.

### Colors

- Core navy: `#0F2557` for primary actions and major branding.
- Dark navy: `#081A3D` for deep surfaces where appropriate.
- Teal: existing `--spark-teal`, reserved for selection, progress and study success.
- Background, paper and borders: use `--spark-bg`, `--spark-paper`, `--spark-border`.
- Amber: use for review flags, not routine navigation.
- Ensure normal text contrast >= 4.5:1 and large text contrast >= 3:1.

Never introduce a second persistent navigation bar. Avoid website-like badges, multiple cards-within-cards, tiny counters and persistent CTA clutter.

## Native app navigation

### Persistent bottom bar

| Destination | Route/behavior | Visible content |
|---|---|---|
| Home | `dashboard` / overview | Current learning priority, subjects, recent activity |
| Study | `study` | Enrolled courses and lessons |
| Practice | `practice` | Paper 1, Paper 2, topic practice |
| Progress | `dashboard/progress` | Achievements, topic strengths and recent results |
| More | Native bottom sheet | My subjects, Flashcards, Study Circles, bookings, tutors, notifications, appearance, logout |

Bottom navigation stays available on top-level and utility screens. It disappears during detailed lessons, quizzes and examinations. Use an explicit Back control to return from focused content. The app always renders the Android status bar and system gesture/navigation region as system chrome; do not place a separate SPARK website toolbar directly below the status bar.

### More sheet

- Open as a bottom sheet with rounded top corners, drag indicator, close button and accessible focus.
- One row per action; 15sp label and 12sp short description.
- `My subjects` and `Progress` link to their existing dashboard routes; no duplicate implementation.
- Notification inbox must remain reachable; do not silently drop the existing `NotificationCenter`.
- Display current account information, appearance setting and logout below navigation.
- Provide Escape/dismiss and tap-outside behavior, with scroll locking while open.

## Screen specifications

### 1. Home

- No SPARK website navbar, hamburger or horizontal Overview strip.
- Top of content: short contextual greeting at 22sp, with optional single-line study-streak/progress summary.
- First card: Continue learning. One subject, lesson or recommended next action. One primary button.
- Second area: My subjects, compact vertically stacked rows or 2-column cards with name and completion.
- Optional next areas: recommended practice, recent results, tutoring session.
- Avoid more than two competing actions in one card. Put detailed reports in Progress and secondary actions in More.
- 16dp page padding, 12dp card gaps, 24dp major section gaps.

### 2. Study

- Screen title: Study, 22sp. One line supporting copy maximum.
- Display enrolled subjects, with compact card title, short progress indicator and right chevron or single Open action.
- Keep each subject tappable as a whole row, min 56dp tall; for mixed content use 2-column cards only when text fits.
- Search/filter only if the subject list becomes long enough to need it.
- Opening a course enters a focused screen with contextual Back.

### 3. Practice

- Title: Practice, 22sp.
- Provide per-subject selection with explicit Paper 1/Paper 2/topic-exam actions.
- Show exam mode, duration and question count clearly.
- Resume active attempt when present; new attempt requires explicit action. Never reset a saved attempt silently.
- No competing website navigation above the test.

### 4. Progress

- Title: Your progress, 22sp.
- First row: completion summary, recent score and learning streak, all compact and readable.
- Next: strengths, areas to improve, and results by subject.
- Use charts only where they answer a clear question. Provide labels and text equivalents.
- Notifications about completed papers deep-link to the relevant subject/attempt when available.

### 5. More

- Use native bottom sheet, not a website drawer or hamburger menu.
- Short, clearly named destinations and account settings.
- Notification badge is optional on the More tab. Do not add a second global bell at the top.
- Appearance follows system by default; user choice is retained.
- Keep Logout visually separate from navigation actions.

### 6. Mathematics and other Paper 1 exams

- Focus-only. Do not show app bottom navigation or persistent website header.
- Compact exam header (66dp max on phone): Exit on left, 21sp tabular timer centered, Questions control on right.
- A thin progress line below header. Clarify whether progress means answered count or position.
- Current question in a flat paper-colored card with Question N of 60, small Flag control, and 19sp readable problem text.
- Four full-width answer choices; min 60dp height, 16sp answer text, clear selected state.
- Previous and Next live in a fixed bottom control area protected by Android/iOS gesture-safe padding.
- Question navigator opens as a bottom sheet, 6 to 8 columns depending on width with >= 44dp targets and clear answered/flagged statuses.
- Submit requires a confirmation with number answered/unanswered. The timer uses an absolute deadline; navigation and app backgrounding must not reset it.
- On review, correctness and rationale appear only after submission.

### 7. Paper 2 exams

- Task-first workspace, no persistent global navigation.
- Top: Back/Exit, remaining time if timed, question number, and source-specific tools.
- Prompt area: 17-19sp, diagrams scale within viewport, never cut off labels.
- Structured response tools: keyboard-safe input areas, answer tables with horizontal scroll only when unavoidable, graph tools with large handles and explicit axis labels.
- Save draft responses on change and interruption. Marking criteria and V2 result publication remain on the server; mobile UI is a view layer, not a new grading algorithm.
- Toolbars must not cover response fields while the keyboard is visible.
- Submit and review actions stay distinct.

### 8. Lesson and flashcard screen

- Focus mode with a small Back button and subject/lesson title.
- Lesson body: 15-16sp at 1.55 line height, heading 18sp, embedded diagrams sized to fit width.
- Progress controls: Previous and Next lesson, respecting completion rules.
- Flashcards: large central surface, swipe between cards, explicit touch buttons for accessibility. Never rely on swipe alone.
- Reduced animation when system motion reduction is enabled.
- Avoid duplicate top-of-screen course navigation rows.

## Responsive and device behavior

- Test target widths 320dp, 360dp, 393dp, 430dp and tablets.
- Portrait is primary for learning and examinations. Support landscape where diagrams and graphs require more room without clipping.
- Keep content inside display cutouts and Android/iOS gesture areas via `env(safe-area-inset-*)`.
- Native keyboard must not cover the active input or Submit action.
- Preserve screen state on background/resume, app switch, and system-initiated process recreation.
- Android hardware/system Back dismisses More and question sheets before navigating away. Confirm exit from active timed exams.
- Dark mode uses the same hierarchy, contrast and selection states as light mode.

## Acceptance criteria

1. Logged-in native student sees **no global SPARK website toolbar** on Home, Study, Practice, Progress, More, or focused learning screens.
2. No dashboard top Overview/My subjects/Progress strip. All destinations remain reachable from tabs, cards, or More.
3. Bottom tabs show only outside focused lesson and examination experiences.
4. Exam timer, answer persistence, grading, question navigator and submission have no regressions.
5. Buttons satisfy touch targets, text scales correctly and screen edges never clip content.
6. No change to GitHub Pages UI and no Supabase marking migration.
7. Native Android emulator and physical-device manual QA, followed by iPhone/Xcode QA, precede app-store release.

## Implementation notes

- Primary shell: `src/App.js`.
- Native header/tab rules: `src/lib/nativeStudentLayout.js`.
- Bottom tab bar and More sheet: `src/components/native/NativeTabBar.jsx`.
- Native-only CSS: `src/nativeMobile.css`.
- Paper 1 component: `src/practice/Paper1Exam.jsx`.
- Capacitor runtime detection: `src/lib/nativeRuntime.js`.
- Build: `npm run mobile:build` then `npm --prefix mobile run android:sync`.
- Keep navigation changes native-scoped until user/device acceptance.
