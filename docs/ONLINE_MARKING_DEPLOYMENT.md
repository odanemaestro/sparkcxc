# SPARK online Paper 2 automatic marking deployment

This runbook activates the optional server-side marking queue for English A and Integrated Science Paper 2. The normal frontend graders continue to work when this service is disabled.

## Safety defaults

- The database queue starts disabled.
- The frontend control stays hidden unless `REACT_APP_SERVER_MARKING=true`.
- `OPENAI_API_KEY`, `SPARK_MARKING_MODEL` and `SPARK_MARKER_SECRET` are server secrets only.
- Never create `REACT_APP_` versions of server secrets.
- Test in a staging Supabase project before production.

## 1. Verify the repository

Run:

```bash
npm ci
npm test -- --watchAll=false --runInBand
npm run test:marking-db
npm run build:marker
npm run build
```

The generated files under `supabase/functions/_shared/` are ignored build output and must exist locally before deploying `mark-paper2`.

## 2. Apply database migrations in staging

Apply the exam-attempt migrations in timestamp order. Confirm these two are included:

- `20261005120000_exam_attempt_write_protection.sql`
- `20261005160000_automated_marking_queue.sql`

After applying them, confirm the queue is still disabled:

```sql
select enabled,revision,max_concurrency,daily_user_limit
from public.spark_marking_config
where singleton=true;
```

Expected initial values include:

- `enabled = false`
- `revision = online-v1`
- `max_concurrency = 4`
- `daily_user_limit = 3`
- `daily_global_limit = 20`
- `daily_token_budget = 1000000`
- `per_job_token_reservation = 50000`

Do not enable it yet.

## 3. Configure Edge Function secrets

Set these in the staging Supabase Edge Function secret store:

- `OPENAI_API_KEY`
- `SPARK_MARKING_MODEL`
- `SPARK_MARKER_SECRET`

Choose a long random value for `SPARK_MARKER_SECRET`.

Hosted Supabase Edge Functions already provide the database URL and service-role credentials used by this worker.

## 4. Build and deploy the worker

Run:

```bash
npm run build:marker
supabase functions deploy mark-paper2 --no-verify-jwt
```

The function deliberately disables platform JWT verification because it is a scheduled worker endpoint. It still refuses requests unless the `x-spark-marker-secret` header matches the configured secret.

## 5. Test the worker while the queue is disabled

A POST with no marker secret should return HTTP 401.

A POST with the correct marker secret while the queue is disabled should return a successful response with zero processed jobs.

Do not send a student answer, rubric or job ID in the request body. The worker leases jobs from the database itself.

## 6. Install the recurring scheduler

Use `supabase/ops/online_marking_scheduler.sql` in the staging SQL Editor.

Create these Vault secrets first:

- `spark_project_url`
- `spark_marker_secret`

The scheduler calls the worker once per minute. This is intentionally frequent enough to recover expired leases and process small queues promptly. The database still enforces the global concurrency limit.

Verify:

```sql
select jobid,jobname,schedule,active
from cron.job
where jobname='spark-mark-paper2-worker';
```

## 7. Enable the queue in staging

Only after the worker and scheduler are operational:

```sql
update public.spark_marking_config
set enabled=true
where singleton=true;

select *
from public.spark_marking_config
where singleton=true;
```

## 8. Expose the frontend control in staging

Set the GitHub repository or environment variable:

```text
REACT_APP_SERVER_MARKING=true
```

The Pages workflow reads this variable at build time. Re-run the deployment after changing it.

Keep it `false` for production until staging is validated.

## Cost guards

The deeper marker is intentionally optional. When any cost guard is reached, `spark_enqueue_marking` returns no job and the frontend silently keeps the normal SPARK grade.

Default guards:

- Maximum 3 deeper checks per student in a rolling 24-hour period.
- Maximum 20 deeper checks platform-wide per UTC day.
- Maximum 1,000,000 reserved model tokens per UTC day.
- Each accepted job reserves 50,000 tokens before any model call.
- Repeated requests for the same attempt and rubric revision reuse the existing job and do not consume another allowance.

The worker records the actual input, output and total token usage returned by the provider for completed checks. The reservation is deliberately conservative so queued work cannot bypass the daily budget.

These values can be changed without a frontend deployment:

```sql
update public.spark_marking_config
set daily_user_limit=3,
    daily_global_limit=20,
    daily_token_budget=1000000,
    per_job_token_reservation=50000
where singleton=true;
```

## 9. Staging acceptance checks

Use authenticated staging accounts and confirm:

1. A submitted English A Paper 2 can enqueue one marking job.
2. A submitted Integrated Science Paper 2 can enqueue one marking job.
3. Another student's attempt cannot be viewed or enqueued.
4. Re-enqueueing the same attempt/revision returns the existing job.
5. More than the daily quota is rejected.
6. Claims never exceed the configured concurrency.
7. An expired lease becomes claimable again.
8. A stale worker cannot finish a job after losing its lease.
9. Retryable failures are retried and stop after the maximum tries.
10. Two model passes that disagree produce an uncertain range, not an averaged mark.
11. Completed results contain only bounded marking output and evidence quotations.
12. Worker logs do not contain raw student response text or provider error bodies.

## 10. Production rollout

Repeat the migration, secret, function and scheduler steps in production only after staging passes.

Then enable the queue:

```sql
update public.spark_marking_config set enabled=true where singleton=true;
```

Set the production GitHub variable:

```text
REACT_APP_SERVER_MARKING=true
```

Deploy the frontend.

## Emergency shutdown

Hide the frontend control by setting `REACT_APP_SERVER_MARKING=false` and redeploying.

Stop new jobs immediately:

```sql
update public.spark_marking_config set enabled=false where singleton=true;
```

Optionally pause the scheduler:

```sql
update cron.job
set active=false
where jobname='spark-mark-paper2-worker';
```

Existing leases may finish. Completed results should be retained for reproducibility.

## Version rule

The worker revision and `spark_marking_config.revision` must remain aligned. The current supported revision is `online-v1`. A future rubric revision must update the worker and database configuration deliberately.
