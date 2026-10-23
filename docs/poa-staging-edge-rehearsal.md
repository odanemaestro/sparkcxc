# Hosted Accounts staging rehearsal

This adapter runs the genuine HTTP rehearsal in `tools/test-poa-staging.mjs` when local network access is unavailable. It is restricted to the disposable project `cfqetgozfxmavwexhrxz`. Production SPARK is forbidden by both the adapter and the runner.

Commit the source changes, build the private V2 marker, and regenerate the Accounts verification artifacts from that clean source commit. Then run:

```text
node --test tools/poa-staging-edge-runtime.test.mjs
node tools/build-poa-staging-edge.mjs
node --check .audit-output/poa-staging-edge/index.mjs
```

The builder checks the evidence commit, clean-source provenance and exact marker checksum. It embeds only genuinely verified Accounts papers. Blocked papers remain excluded and are listed in deployment metadata.

The generated `deployment.json` identifies the exact stage, function name, code checksum, expiry and file paths. Apply `nonce-guard.sql` **only to the named disposable project**, then deploy `index.mjs` as `poa-staging-rehearsal` with `verify_jwt=true`. The private nonce is stored outside the repository web root under `../poa-staging-secrets/`, with a unique file name and owner-only permissions where supported. Do not print, commit, serve or publish it.

Invoke the function once with a valid stage JWT and `x-poa-staging-nonce` read directly from that private file. Use an empty body or `{}`. The request cannot choose projects, papers, SQL or response fixtures. PostgreSQL claims the authorization atomically, so replay and concurrent calls cannot repeat the run. A failed rehearsal also consumes the authorization. The runner authenticates disposable fixture users, uses the deployed private worker, checks access rules and notifications, restores course visibility, signs out its sessions and deletes its fixture users.

Save the returned report and inspect both `passed` and `cleanup.passed`. A runner exception cannot produce a successful cleanup claim. Confirm fixture accounts and test rows were removed through a separate stage query. Finally deploy `disabled.mjs` with `verify_jwt=true`, confirm the endpoint denies invocation, and remove the exact local nonce file. Keep the genuine marker worker and grading evidence separate from this temporary rehearsal endpoint.

The SQL guard grants its no-argument claim function only to `service_role`; its private authorization table has RLS and no anonymous or student privileges. The adapter reads project credentials only from hosted environment variables and returns an explicit, credential-redacted report. It does not accept commands or grading data from callers.

## Stage worker with modern API keys

The disposable project can provide an opaque `sb_secret_...` key rather than a legacy service-role JWT. These keys belong in the `apikey` header. They cannot pass the platform's JWT check as Bearer tokens. The production worker and its gateway configuration remain unchanged.

For this stage only, run `node tools/build-poa-stage-worker.mjs`. Deploy the files listed in `.audit-output/poa-stage-worker/deployment.json` to the exact disposable stage as `mark-paper2-v2-shadow`, using `verify_jwt=false`. This generated adapter authenticates every request itself: it requires the exact stage URL and compares the supplied `apikey` with the server-held service key using fixed-length SHA-256 digest comparison. It also supports `SUPABASE_SECRET_KEYS.default` when the legacy environment variable is unavailable. Anonymous keys, user JWTs and incorrect keys receive HTTP 401 before any database RPC. The server retains and validates all privileged database access.

The builder starts from the genuine worker entry point and asserts that its examiner and database protocol remain byte-for-byte unchanged after the authentication prelude. It copies the genuine marker bundle and checksum without changes, and pins the stage client to the installed Supabase package version. The rehearsal endpoint itself still uses `verify_jwt=true` plus its separate expiring, one-use nonce.

When transferring the generated files through an API, read every path literally and reject file-read errors, empty contents and truncated chunks before deployment. Normalize Windows path separators when a path is embedded in JavaScript. Confirm the deployed worker rejects an anonymous request promptly before starting the rehearsal. An empty uploaded entry point can boot without serving a handler and leave the rehearsal waiting until timeout.

See Supabase's [API-key migration guidance](https://supabase.com/docs/guides/getting-started/migrating-to-new-api-keys) and [authorization header reference](https://supabase.com/docs/guides/functions/auth-headers) for the key and gateway distinction.
