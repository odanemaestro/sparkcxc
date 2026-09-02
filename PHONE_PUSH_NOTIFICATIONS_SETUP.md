# SPARK Phone Push Notifications

This update adds standards-based Web Push to the existing SPARK Notification Centre.

Push is opt-in. A user must turn it on from Notification Centre > Settings. The in-app Notification Centre remains the source of truth.

## What receives phone push alerts

SPARK mirrors the important notifications already created by the platform:

- booking requests, confirmations, declines, cancellations and reschedules
- completed tutoring sessions
- Paper 1 and Paper 2 results
- parent child-progress exam alerts
- parent learning milestones, mastery alerts and weak-skill alerts
- family connection requests and updates
- tutor application updates

Users can turn categories on or off. They can also hide notification details on the Lock Screen.

## iPhone requirement

On iPhone and iPad, Web Push works for web apps added to the Home Screen. Open SPARK in Safari, tap Share, choose Add to Home Screen, launch SPARK from the Home Screen icon, then enable phone notifications inside SPARK.

Android and supported desktop browsers can enable Web Push directly from the browser.

## Files added

- `public/sw.js`
- `src/lib/pushNotifications.js`
- `src/lib/pushNotifications.test.js`
- `src/components/notifications/PushNotificationSettings.jsx`
- `supabase/migrations/20260902223000_web_push_notifications.sql`
- `supabase/functions/send-push/index.ts`
- `supabase/functions/send-push/deno.json`
- `supabase/config.toml`
- `scripts/generate-vapid-keys.mjs`

## Step 1. Apply the database migration

Open the Supabase SQL Editor and run:

`supabase/migrations/20260902223000_web_push_notifications.sql`

The migration creates:

- `notification_preferences`
- `push_subscriptions`
- row-level security policies
- secure subscription registration and removal functions

Push defaults to off for every account. Existing users receive no phone alerts until they opt in.

## Step 2. Generate VAPID keys and the webhook secret

From the SPARK project root run:

```powershell
node scripts/generate-vapid-keys.mjs
```

The command prints three values:

- `REACT_APP_VAPID_PUBLIC_KEY`
- `VAPID_PRIVATE_JWK`
- `PUSH_WEBHOOK_SECRET`

The public key is safe to use in the browser. The private JWK and webhook secret must stay private.

Do not commit the generated private values to Git.

## Step 3. Add the public key locally

Add this line to your existing ignored `.env` file:

```text
REACT_APP_VAPID_PUBLIC_KEY=PASTE_THE_PUBLIC_KEY_HERE
```

Keep your existing Supabase environment variables in the same file.

## Step 4. Add the public key to GitHub Actions

In the GitHub repository open:

Settings > Secrets and variables > Actions > New repository secret

Create:

`REACT_APP_VAPID_PUBLIC_KEY`

Paste only the public VAPID key.

The deployment workflow already reads this secret.

## Step 5. Create the local Edge Function secret file

Create this file locally:

`supabase/.env.push.local`

It is already ignored by Git.

Add:

```text
VAPID_PRIVATE_JWK=PASTE_THE_PRIVATE_JWK_JSON_HERE
PUSH_WEBHOOK_SECRET=PASTE_THE_WEBHOOK_SECRET_HERE
SPARK_APP_URL=https://odanemaestro.github.io/sparkcxc/
VAPID_SUBJECT=https://odanemaestro.github.io/sparkcxc/
```

Do not add quotes around the values unless your shell or environment tool requires them.

## Step 6. Deploy the Supabase Edge Function

From PowerShell in the SPARK project folder:

```powershell
npx supabase@latest login
```

Then link the project if it is not already linked:

```powershell
npx supabase@latest link --project-ref YOUR_PROJECT_REF
```

Deploy the function:

```powershell
npx supabase@latest functions deploy send-push --no-verify-jwt
```

Upload the private secrets:

```powershell
npx supabase@latest secrets set --env-file supabase/.env.push.local
```

The function uses a custom webhook secret because it is called by the database webhook rather than by a browser user.

## Step 7. Create the Database Webhook

In Supabase open Database > Webhooks.

Create a webhook with these settings:

- Name: `spark-notification-push`
- Schema: `public`
- Table: `notifications`
- Event: `INSERT` only
- Webhook type: Supabase Edge Function
- Edge Function: `send-push`
- Method: `POST`
- Timeout: `1000` ms

Add this HTTP header:

- Header name: `x-spark-push-secret`
- Header value: the exact `PUSH_WEBHOOK_SECRET` generated in Step 2

The webhook runs after a notification row is created. The Edge Function checks the recipient's preferences and sends the notification to every active device for that account.

## Step 7B. Enable 30-minute session reminders

SPARK includes `spark_create_session_reminders()`. It creates one reminder for the student and tutor about 30 minutes before a confirmed session. Dedupe keys prevent repeated alerts.

In Supabase open Integrations > Cron and enable Supabase Cron if it is not enabled. Then run this once in the SQL Editor:

```sql
select cron.schedule(
  'spark-session-reminders',
  '*/5 * * * *',
  'select public.spark_create_session_reminders();'
);
```

The job checks every five minutes. Session times are interpreted in the `America/Jamaica` time zone used by the current SPARK booking system.

## Step 8. Test locally

Run:

```powershell
npm test -- --watchAll=false
npm run build
npm start
```

Sign in, open the Notification Centre, select Settings, then turn on Phone notifications.

If the browser asks for permission, choose Allow.

## Step 9. Test a real push

Use two accounts when possible.

Recommended tests:

1. Student requests a tutoring session. The tutor should receive a push.
2. Tutor accepts the booking. The student should receive a push.
3. Student completes Paper 1 or Paper 2. The student and linked parent should receive their respective pushes.
4. Trigger a parent learning milestone. The linked parent should receive a push.
5. Tap the phone notification. SPARK should open the exact notification target.

For an iPhone, make sure SPARK was opened from the Home Screen icon before testing.

## Privacy and shared devices

SPARK detaches the current browser push endpoint when a user explicitly logs out. This prevents the next person using a shared browser from receiving the previous user's private alerts.

If the same user logs in again and still has push enabled, SPARK reconnects the existing browser subscription without asking for permission again.

Users can turn off Lock Screen details. When previews are off, the device displays a generic SPARK alert and the full message remains inside the authenticated Notification Centre.

Turning off the master Phone notifications setting disables push delivery for the whole account and deactivates all saved devices. A browser subscription can remain in the browser, but SPARK will not send to it until the user explicitly enables a device again.

## Delivery cleanup

The Edge Function removes subscriptions that the browser push service reports as expired. Other failed subscriptions are disabled after repeated delivery failures. A user can reconnect the device from Notification Centre > Settings.

## Troubleshooting

### The Settings panel says phone notifications are still being configured

The React build does not have `REACT_APP_VAPID_PUBLIC_KEY`. Add the key to local `.env` and to the GitHub Actions repository secret, then rebuild.

### iPhone does not show the Enable option

Add SPARK to the Home Screen and open SPARK from the Home Screen icon. Web Push permission on iPhone must be requested from the installed web app.

### Permission says blocked

The browser or operating system has denied notifications. Re-enable SPARK notifications in browser or device settings.

### Push is enabled but no alert arrives

Check:

- the `push_subscriptions` table contains a row for the user
- `notification_preferences.push_enabled` is true
- the relevant category preference is true
- the `spark-notification-push` Database Webhook is enabled
- the `send-push` Edge Function is deployed
- `PUSH_WEBHOOK_SECRET` matches the custom webhook header
- the Edge Function has `VAPID_PRIVATE_JWK`
- Supabase Edge Function logs for delivery errors

### Notification opens SPARK but not the correct screen

The push includes the notification row ID. SPARK reads that notification after authentication and uses the same routing engine as the in-app Notification Centre. Confirm the notification row still exists and belongs to the signed-in user.
