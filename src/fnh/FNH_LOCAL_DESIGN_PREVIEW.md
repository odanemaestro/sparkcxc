# Testing the FNH study redesign locally

The Food, Nutrition and Health subject is still a draft. Do **not** enable it in the public subject catalog or run SQL to publish it merely to inspect the UI. Use the standalone local preview in `fnh-preview.html`.

## Windows PowerShell / VS Code terminal

Open your local SPARK repository folder. Save or stash any uncommitted changes first:

```powershell
git status
git fetch origin
git switch feat/fnh-syllabus-course-v1
git pull --ff-only origin feat/fnh-syllabus-course-v1
npm ci
npm start
```

If the branch does not yet exist locally, run `git switch --track origin/feat/fnh-syllabus-course-v1` instead of the first `git switch`.

The Vite development server is configured for port **3000** and base path `/sparkcxc/`. Open:

**http://127.0.0.1:3000/sparkcxc/fnh-preview.html**

This is a **development-only UI preview**. It loads the real study layout and local 25-lesson FNH content, bypasses login/enrolment only inside the isolated preview, and never connects to Supabase. Practice responses and lesson completion are temporary local React state: refreshing clears them. It does **not** publish FNH, change the live site, record grades, or validate production authentication and notifications.

## Visual and interaction checklist

1. **Desktop at 1440px:** Check heading, progress, sidebar navigation, lesson typography, full 87-objective coverage via the objective list, worked examples, spacing and focus-reading toggle.
2. **Tablet at 768–1024px:** Check that the course outline can be opened/collapsed, all section buttons can be tapped, the two-column content switches correctly and no text overlaps.
3. **Phones at 320px, 375px and 430px:** Check tap targets, wrapping of long titles, navigation in two columns/one column, food-card labs, interactive answer controls and no sideways scrolling.
4. **Light/dark:** Use the `Light` / `Dark` toggle at the top of the preview. Check text, SVGs, selected/unselected answers, disabled controls and feedback.
5. **Lesson navigation:** Try `Read notes`, `Explore` when offered, `Quick practice`, `Written response` and the `Focus on reading` / `Show course outline` buttons. Confirm the target becomes visible and there is no stale lesson content on switching topics.
6. **Learning activities:** Choose a single answer, use multi-select, reorder using arrow buttons, enter a numerical answer, get a hint, check a wrong/correct answer, retry, and confirm a written objective answer. Verify the statements explain that self-checks are **not grades**.
7. **Accessibility:** Tab through the buttons, use Enter and Space, zoom to 200%, and enable reduced motion in system/browser preferences. Inspect focus indicators and readable line lengths.
8. **App integration:** The local preview does **not** test Supabase enrolment/authorization, database progress persistence, live notifications, or the historical Paper 1/2 grading workflows. Those require separate authenticated staging QA before merging.

To emulate phones and tablets in Chrome or Edge, press `F12` and then `Ctrl+Shift+M` to open Device Toolbar. For actual iPhone/Android testing, the development server must be explicitly exposed **only to your trusted local Wi-Fi** (the default `npm start` listens on `127.0.0.1` and cannot be reached by a phone).

For focused automated checks:

```powershell
npm test -- --runInBand src/fnh/dev/FnhLocalDesignPreview.test.jsx src/fnh/fnhStudyDesignExperience.test.jsx src/fnh/components/FnhStudyPractice.test.jsx
npm run build
```

If anything looks wrong, capture the screen at that width and note the lesson title, theme, device/browser and what you clicked.
