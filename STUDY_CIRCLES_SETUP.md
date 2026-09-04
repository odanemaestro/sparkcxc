# SPARK Study Circles V9.0

Study Circles are opt-in small peer-learning groups for CSEC Mathematics students. SPARK uses the mastery data already created by Adaptive Practice to find groups where students can contribute in different areas and learn from one another.

## Product behaviour

- Student-only Study Circles tab in the dashboard.
- Groups form with 3-4 opted-in students.
- Matching considers complementary strength/focus patterns and broad availability.
- Exact mastery scores are never shown to peers.
- Peer names are reduced to first name + last initial.
- Shared agenda suggests which student can lead a walkthrough for a group member's focus area.
- Shared in-SPARK study board. No private messaging.
- Phone numbers, email addresses, social handles and external links are blocked from study-board posts.
- Posts can be reported.
- Administrators have a Study Circle safety-report queue with dismiss and remove-post actions.
- Approved linked parents can see only high-level participation, not peer identities, scores or messages.
- Student and parent notifications are created when a circle forms.
- Student circle notifications deep-link to Dashboard > Study Circles.
- Dark, Light and System appearance modes are supported.
- Mobile layouts are intentionally reorganized rather than merely squeezed down.

## Deployment order

1. Apply `supabase/migrations/20260904_study_circles.sql` in the Supabase SQL Editor.
2. Run `supabase/study_circles_verification.sql` and confirm all objects resolve.
3. Deploy the updated `send-push` Edge Function:
   `npx supabase functions deploy send-push --no-verify-jwt`
4. Run the static verifier and production build locally.
5. Review `git diff --check`, `git diff --stat` and `git status`.
6. Commit only the production/source files listed by the patcher.
7. Push `main`, wait for the GitHub Pages workflow, then test with at least three student accounts.

## Suggested acceptance test

Use three or four student accounts.

1. Complete enough Adaptive Practice to create different skill profiles. Students without a usable mastery signal should be directed back to Adaptive Practice rather than matched randomly.
2. Open Dashboard > Study Circles.
3. Select broad availability, accept the guidelines and opt in.
4. The first one or two students should wait rather than get a fake group.
5. The third student should be able to form a circle.
6. Reopen Study Circles on the earlier students and confirm the same group appears.
7. Confirm members see only broad strengths/focus areas, not percentages.
8. Confirm the study board rejects an email, phone number, social handle and URL.
9. Confirm a normal academic post succeeds.
10. Confirm another member can report that post.
11. Sign in as an administrator and verify the Study Circle safety queue can dismiss a report or remove the reported post.
12. Confirm the linked parent sees only the high-level Study Circle participation card.
13. Confirm the Study Circle notification opens the correct student dashboard tab.
14. Confirm Light, Dark and System modes on desktop and phone.
15. Confirm the Study Circles route survives a page refresh at `#/dashboard/circles`.
16. Leave a 3-person circle and confirm the remaining 2-person group closes rather than operating below the minimum size.
