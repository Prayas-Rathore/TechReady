-- Migration 2: Guest Assessments table (for non-authenticated users taking tests)
CREATE TABLE IF NOT EXISTS public.guest_assessments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  anon_user_id TEXT NOT NULL,
  answers JSONB NOT NULL,
  submitted_at TIMESTAMPTZ DEFAULT NOW(),
  linked_to_user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  linked_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_guest_assessments_anon_id 
  ON public.guest_assessments(anon_user_id);

CREATE INDEX IF NOT EXISTS idx_guest_assessments_linked_user 
  ON public.guest_assessments(linked_to_user_id);

-- Enable RLS
ALTER TABLE public.guest_assessments ENABLE ROW LEVEL SECURITY;

-- ⚠️ CRITICAL FIX: Use "TO public" instead of "TO anon, authenticated"
-- This allows ANYONE (including non-authenticated visitors) to insert data

-- RLS Policies
CREATE POLICY "Anyone can insert guest assessments"
  ON public.guest_assessments
  FOR INSERT
  TO public  -- ✅ CHANGED FROM "TO anon, authenticated"
  WITH CHECK (true);

CREATE POLICY "Users can read their linked assessments"
  ON public.guest_assessments
  FOR SELECT
  TO authenticated
  USING (linked_to_user_id = auth.uid());

-- Add comment
COMMENT ON TABLE public.guest_assessments IS 'Stores detailed Q&A assessment data for guest users (before signup)';