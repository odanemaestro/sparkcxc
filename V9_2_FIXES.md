# CaribPrep v9.2 - Tutor Application Validation & Role Footer Fix

## Fixed

### 1. Step 1 no longer validates Step 2/3 fields
The old `validateApplication()` function was being called by the Step 1 Continue button. Because it also checked subjects, qualifications, experience, and availability, a user could be blocked on Step 1 with:

> Select between 1 and 8 subjects.

Step validation is now separated:
- Step 1: name, phone, bio, email/password (where applicable)
- Step 2: 1–8 subjects and hourly rate
- Step 3: qualifications, experience, availability
- Final submit: all three steps

### 2. Phone validation is now meaningful
Jamaican numbers are accepted as:
- `8768939303`
- `6588939303`
- `+1 876 893 9303`
- formatted variants with spaces, dashes or parentheses

International numbers must include a `+` country code and have a plausible 10–15 digit length.

### 3. Subject selection is capped at 8
The UI stops the user from selecting a ninth subject and shows a clear message.

### 4. Tutor homepage footer role detection
A signed-in account with an existing tutor application is treated as tutor-role UX on the homepage footer, even if the application is still pending or was rejected. This prevents the student-only Study column from appearing when the tutor returns to Home.

## Supabase
No new migration is required for these UI fixes. The existing `submit_tutor_application` RPC remains in place for secure first-time applications and rejected re-applications.
