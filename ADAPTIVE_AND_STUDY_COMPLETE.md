# CaribPrep - Study + Adaptive Learning Completion

This build completes every Study-tab curriculum topic and preserves the existing authored lessons.

## Study coverage
Every topic in `SYLLABUS_SECTIONS` now resolves to a lesson, so the old `Content coming soon` state should not appear for a normal syllabus topic.

## Question bank
`public/question-bank/csec_maths_question_engine.json` contains the expanded CSEC Mathematics engine with base questions and randomized variants.

## Adaptive layer
`src/adaptive/` contains the adaptive engine, question loader, persistence adapter and practice component.

## Supabase
Run `supabase/migrations/20260816_csec_adaptive_learning.sql` in the existing Supabase project.

## Run
```bash
npm install
npm start
```
