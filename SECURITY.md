# Security Setup

_Last updated: 2026-04-24_

This project uses the **simplest viable** auth model for the admin CMS: a single
admin user, with Supabase self-signup **disabled**. All other security guarantees
in the database depend on that single fact being true.

---

## Why this matters

The Row-Level Security policies in `supabase/migrations/003_rls_policies.sql`
grant full CRUD on every CMS table and storage bucket to anyone whose JWT has
`auth.role() = 'authenticated'`. That means **any logged-in Supabase user can
read, modify, or delete every row and every uploaded asset**. This is only safe
because we guarantee that exactly one user can ever be authenticated: the admin
account that was provisioned manually. If self-signup is ever re-enabled — even
briefly — a stranger can register an account, log in, and wipe the CMS. Closing
signup at the Supabase Auth layer is therefore the load-bearing control; the RLS
policies themselves do **not** restrict by user identity.

---

## Setup checklist (do this once)

Replace `YOUR-PROJECT-REF` with your project's ref (visible in the dashboard URL).

### 1. Disable email signups

1. Open `https://supabase.com/dashboard/project/YOUR-PROJECT-REF/auth/providers`
2. **Authentication → Providers → Email**
3. Toggle **"Enable Sign-Ups"** OFF. Leave **"Enable Email Provider"** ON
   (the existing admin still needs to log in).
4. Click **Save**.

### 2. Disable every other provider you do not use

Same page (`Authentication → Providers`):

- **Phone** — toggle the entire provider OFF unless you actively use SMS auth.
- **Anonymous Sign-Ins** (`Authentication → Sign In / Up → Anonymous Sign-Ins`)
  — must be OFF. An anonymous user counts as `authenticated` for RLS purposes
  and would bypass the whole model.
- **Social providers** (Google, GitHub, etc.) — toggle OFF any provider you are
  not deliberately using. Each enabled provider is another signup path.

### 3. Verify only the intended admin user exists

Open the SQL editor: `https://supabase.com/dashboard/project/YOUR-PROJECT-REF/sql/new`

```sql
select id, email, phone, created_at, last_sign_in_at, is_anonymous
from auth.users
order by created_at;
```

You should see **exactly one row** — the admin. If there are more, investigate
each one before going further: delete unknown users from
`Authentication → Users` and treat the project as compromised (rotate the anon
key, audit the CMS tables for unexpected writes).

### 4. Rotate the anon key if any unexpected signup ever happened

If step 3 surfaced an unknown user, or if signups were ever left open in
production:

1. `https://supabase.com/dashboard/project/YOUR-PROJECT-REF/settings/api`
2. **Project API keys → anon public → Regenerate**
3. Update `VITE_SUPABASE_ANON_KEY` in:
   - Local `.env` files
   - Vercel project settings (Production + Preview + Development)
   - Any other deploy targets
4. Redeploy.

The anon key itself does **not** grant write access (RLS still requires a
session), but rotating it invalidates any third-party scripts that may have
scraped it and forces a clean baseline.

---

## How to add a second admin later

Until a real `admins` table exists, every authenticated user is an admin. To add
one more trusted operator without rewriting policies:

**Option A — invite via dashboard (preferred):**
1. `Authentication → Users → Add user → Send invitation`
2. Use a real email; the invited user sets their own password.
3. Re-run the verification query in step 3 above and confirm the new row.

**Option B — create directly via SQL (service-role key required):**
Run this in the SQL editor while logged in as project owner. It uses Supabase's
admin function so the password is correctly hashed:

```sql
-- requires service_role; do NOT run from the client
select auth.admin_create_user(
  jsonb_build_object(
    'email', 'second-admin@example.com',
    'password', 'CHANGE-ME-STRONG-PASSWORD',
    'email_confirm', true
  )
);
```

**Forward pointer:** once there is more than one admin, or the moment you want
non-admin authenticated users (e.g. customer accounts) to exist, this model
breaks. The correct next step is:

1. Add an `admins` table keyed on `auth.users.id`.
2. Rewrite the policies in `003_rls_policies.sql` from
   `using (auth.role() = 'authenticated')` to
   `using (exists (select 1 from admins where admins.user_id = auth.uid()))`.
3. Or, simpler: stamp a custom JWT claim (e.g. `app_metadata.role = 'admin'`)
   and check `(auth.jwt() ->> 'role') = 'admin'` in the policies.

Either approach removes the dependency on signups being closed.

---

## Tripwires (run periodically)

Paste into the SQL editor monthly, or wire into a scheduled job:

```sql
-- Expected: 1 (or whatever your current admin count is)
select
  count(*) as user_count,
  count(*) filter (where is_anonymous) as anonymous_count,
  max(created_at) as most_recent_signup
from auth.users;
```

If `user_count` exceeds the number of admins you remember provisioning, or
`anonymous_count > 0`, or `most_recent_signup` is newer than your last known
admin invite — treat it as an incident: re-disable signups, audit
`auth.users`, rotate the anon key, and inspect CMS tables for unauthorized
writes (`select max(updated_at) from products;` etc.).
