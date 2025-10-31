create table user_metadata (
  id uuid primary key references auth.users(id) on delete cascade,
  user_role smallint not null default 0 check (user_role in (0,1,2)),
  plan_name text,
  subscription_start timestamptz,
  subscription_end timestamptz,
  soft_deleted boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table user_metadata enable row level security;

create policy "User can view own metadata"
on user_metadata for select
using (auth.uid() = id);

create policy "User can update their own subscription"
on user_metadata for update
using (auth.uid() = id)
with check (auth.uid() = id);

create policy "Admin can manage all metadata"
on user_metadata for all
using (
  exists (
    select 1
    from user_metadata as m
    where m.id = auth.uid() and m.user_role = 1
  )
);
