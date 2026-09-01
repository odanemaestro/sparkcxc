# CaribPrep - Family Requests + Tutor Marketplace Bug Fixes

## Fixed in this release

### Parent request resend
A relationship that was previously `declined` or `revoked` can now be requested again. The database RPC resets it to `pending` safely rather than leaving it stuck at the previous state.

### Student-side live requests
The student dashboard subscribes to `parent_student_links`. A newly inserted request or a resent request that changes back to `pending` is reflected while the student is already on the page.

### Parent-side live status
The parent dashboard also subscribes to the same relationship. Approval, decline, and resend states update without a page refresh.

### Tutor avatars
The tutor marketplace now generates initials directly from the tutor's name and uses a deterministic CaribPrep color fallback when the stored `avatar_color` is missing or invalid. This fixes blank white avatar circles from incomplete legacy tutor rows.

### Tutor marketplace styling
The marketplace now has a deliberate solid-card visual system, stronger spacing and typography, polished filter/search controls, responsive cards, and mobile-friendly filter scrolling. It intentionally avoids the previous grey/glass visual treatment.

## Database action required

Run **only**:

`supabase/migrations/20260816_family_resend_and_realtime.sql`

Do not rerun the earlier adaptive or reviews/parent migrations if they have already been applied.
