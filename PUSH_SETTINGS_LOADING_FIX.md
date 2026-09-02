# SPARK Push Settings Loading Fix

Fixes the Notification Centre Settings screen remaining on "Loading phone notification settings..." on a fresh service worker registration.

Changes:
- Initial device-state inspection no longer waits indefinitely for `navigator.serviceWorker.ready`.
- A five-second activation wait is used only when the user explicitly enables push notifications.
- Missing user state no longer leaves the settings panel permanently loading.

No Supabase migration or secret changes are required.
