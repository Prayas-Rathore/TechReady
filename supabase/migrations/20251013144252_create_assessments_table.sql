create table if not exists public.assessments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  quiz_id uuid,
  score integer,
  total_questions integer,
  correct_answers integer,
  started_at timestamptz default now(),
  completed_at timestamptz,
  duration_seconds integer,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
