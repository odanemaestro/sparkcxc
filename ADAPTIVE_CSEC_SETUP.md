# Adaptive CSEC Learning Layer

## Run

npm install
npm start

## Supabase

Run:
supabase/migrations/20260816_csec_adaptive_learning.sql

This adds per-user:
- csec_question_attempts
- csec_skill_progress

Both have Row Level Security.

## React

Import:
`src/adaptive/AdaptivePractice.jsx`

Example route:

```jsx
import AdaptivePractice from "./adaptive/AdaptivePractice";

<Route path="/practice" element={
  <AdaptivePractice supabase={supabase} userId={user?.id} />
} />
```

Use your EXISTING Supabase client.

## Architecture

Lesson → skill practice → adaptive questions → attempt telemetry → mastery → targeted recommendation.

Question content is static in `public/question-bank`.
Student progress is dynamic in Supabase.
