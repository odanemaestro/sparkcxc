# SPARK Authentication - Final Supabase Setup

The login code now includes the authentication flow requested in `Google Facebook Signup Requirements.docx`:

- Email format validation
- Email ownership verification after signup
- Resend verification email
- Forgot password
- 6-digit password-reset verification code
- New password screen
- Password strength validation
- Google login
- Blocking unverified accounts from entering the app
- Existing Supabase session/logout handling

## 1. Confirm email verification is enabled

In Supabase Dashboard, open **Authentication → Providers → Email** and make sure email/password sign-up is enabled and email confirmation is enabled.

## 2. Make the password-reset email contain the 6-digit code

The app's forgot-password screen calls `resetPasswordForEmail()` and then verifies the code with `verifyOtp({ type: "recovery" })`.

In the Supabase **Reset password** email template, include the OTP variable:

`{{ .Token }}`

For example, the email can say:

> Your SPARK password reset code is {{ .Token }}

The user enters that 6-digit code in SPARK, then creates a new password.

## 3. Add the app URL to Supabase Redirect URLs

In **Authentication → URL Configuration**, add the URL where SPARK is hosted. Also add your local development URL if you use one, such as:

`http://localhost:3000`

The app uses the current browser origin for OAuth and password-reset redirects, so the deployed origin must be in Supabase's allowed redirect URL list.

## 4. Enable Google login

In **Supabase Dashboard → Authentication → Providers → Google**:

1. Enable Google.
2. Create a Google OAuth client in Google Cloud.
3. Add the SPARK site origin as an authorized JavaScript origin.
4. Add the Supabase Google callback URL shown by the Supabase Google provider settings as an authorized redirect URI in Google Cloud.
5. Copy the Google Client ID and Client Secret into the Supabase Google provider settings.

The SPARK code already calls `supabase.auth.signInWithOAuth({ provider: "google" })` and redirects back to the current app origin.

## 5. Test the complete flow

### New account

1. Create a student or parent account.
2. Confirm that SPARK shows the **Check your email** screen.
3. Open the verification email and verify the account.
4. Return to SPARK and log in.
5. Confirm an unverified account cannot enter the dashboard.

### Resend verification

From the verification screen, click **Resend verification email** and confirm a new email arrives.

### Forgot password

1. Click **Forgot your password?**
2. Enter the account email.
3. Confirm the reset email contains the 6-digit code.
4. Enter the code in SPARK.
5. Create a new password.
6. Log in with the new password.

### Google

Click **Continue with Google**, complete Google consent, and confirm SPARK returns to the app and opens the authenticated experience.
