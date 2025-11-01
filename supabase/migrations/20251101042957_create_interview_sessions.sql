/*
  # Create Interview Practice Tables

  1. New Tables
    - `job_descriptions`
      - `id` (uuid, primary key)
      - `title` (text) - Job title
      - `description` (text) - Full job description
      - `category` (text) - Job category
      - `is_custom` (boolean) - Whether it's user-created
      - `user_id` (uuid, nullable) - Creator if custom
      - `created_at` (timestamptz)

    - `interview_sessions`
      - `id` (uuid, primary key)
      - `user_id` (uuid) - User conducting interview
      - `job_description_id` (uuid) - Related job description
      - `questions` (jsonb) - Array of generated questions
      - `status` (text) - 'pending', 'in_progress', 'completed'
      - `started_at` (timestamptz)
      - `completed_at` (timestamptz, nullable)
      - `created_at` (timestamptz)

    - `interview_responses`
      - `id` (uuid, primary key)
      - `session_id` (uuid) - Related interview session
      - `question_number` (int) - Question index
      - `question_text` (text) - The question asked
      - `transcription` (text) - User's response transcription
      - `audio_duration` (int) - Duration in seconds
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Create job_descriptions table
CREATE TABLE IF NOT EXISTS job_descriptions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  category text NOT NULL,
  is_custom boolean DEFAULT false,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE job_descriptions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view all pre-defined job descriptions"
  ON job_descriptions FOR SELECT
  TO authenticated
  USING (is_custom = false OR user_id = auth.uid());

CREATE POLICY "Users can create custom job descriptions"
  ON job_descriptions FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid() AND is_custom = true);

CREATE POLICY "Users can update own custom job descriptions"
  ON job_descriptions FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid() AND is_custom = true)
  WITH CHECK (user_id = auth.uid() AND is_custom = true);

CREATE POLICY "Users can delete own custom job descriptions"
  ON job_descriptions FOR DELETE
  TO authenticated
  USING (user_id = auth.uid() AND is_custom = true);

-- Create interview_sessions table
CREATE TABLE IF NOT EXISTS interview_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  job_description_id uuid REFERENCES job_descriptions(id) ON DELETE SET NULL,
  job_description_text text NOT NULL,
  questions jsonb NOT NULL DEFAULT '[]'::jsonb,
  status text NOT NULL DEFAULT 'pending',
  started_at timestamptz,
  completed_at timestamptz,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE interview_sessions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own interview sessions"
  ON interview_sessions FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can create own interview sessions"
  ON interview_sessions FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update own interview sessions"
  ON interview_sessions FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can delete own interview sessions"
  ON interview_sessions FOR DELETE
  TO authenticated
  USING (user_id = auth.uid());

-- Create interview_responses table
CREATE TABLE IF NOT EXISTS interview_responses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id uuid NOT NULL REFERENCES interview_sessions(id) ON DELETE CASCADE,
  question_number int NOT NULL,
  question_text text NOT NULL,
  transcription text DEFAULT '',
  audio_duration int DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE interview_responses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own interview responses"
  ON interview_responses FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM interview_sessions
      WHERE interview_sessions.id = interview_responses.session_id
      AND interview_sessions.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create own interview responses"
  ON interview_responses FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM interview_sessions
      WHERE interview_sessions.id = interview_responses.session_id
      AND interview_sessions.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update own interview responses"
  ON interview_responses FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM interview_sessions
      WHERE interview_sessions.id = interview_responses.session_id
      AND interview_sessions.user_id = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM interview_sessions
      WHERE interview_sessions.id = interview_responses.session_id
      AND interview_sessions.user_id = auth.uid()
    )
  );

-- Insert pre-defined job descriptions
INSERT INTO job_descriptions (title, description, category, is_custom) VALUES
(
  'Software Engineer',
  'We are seeking a talented Software Engineer to join our development team. You will be responsible for designing, developing, and maintaining software applications. Strong knowledge of programming languages, data structures, and algorithms is required. Experience with modern frameworks and version control systems is essential.',
  'Engineering',
  false
),
(
  'Product Manager',
  'Looking for an experienced Product Manager to lead product strategy and development. You will work closely with engineering, design, and business teams to define product vision, roadmap, and features. Strong analytical skills, customer empathy, and ability to prioritize are crucial.',
  'Product',
  false
),
(
  'Business Analyst',
  'We need a detail-oriented Business Analyst to bridge the gap between business needs and technical solutions. Responsibilities include gathering requirements, analyzing data, creating documentation, and facilitating communication between stakeholders and development teams.',
  'Business',
  false
),
(
  'Marketing Specialist',
  'Seeking a creative Marketing Specialist to develop and execute marketing campaigns. You will manage social media, content creation, email marketing, and analytics. Strong communication skills and knowledge of digital marketing tools are required.',
  'Marketing',
  false
),
(
  'Data Analyst',
  'We are hiring a Data Analyst to transform raw data into actionable insights. Responsibilities include data collection, analysis, visualization, and reporting. Proficiency in SQL, Excel, and data visualization tools is essential.',
  'Analytics',
  false
),
(
  'UX/UI Designer',
  'Looking for a talented UX/UI Designer to create intuitive and beautiful user experiences. You will conduct user research, create wireframes and prototypes, and collaborate with developers to implement designs. Strong portfolio required.',
  'Design',
  false
),
(
  'Sales Representative',
  'Seeking a motivated Sales Representative to drive revenue growth. You will prospect new clients, conduct product demos, negotiate contracts, and maintain customer relationships. Strong communication and persuasion skills are essential.',
  'Sales',
  false
),
(
  'Human Resources Specialist',
  'We need an HR Specialist to manage recruitment, employee relations, and HR policies. Responsibilities include conducting interviews, onboarding new hires, managing benefits, and ensuring compliance with labor laws.',
  'Human Resources',
  false
),
(
  'Customer Service Representative',
  'Looking for a friendly Customer Service Representative to assist customers with inquiries and issues. You will provide support via phone, email, and chat, resolve complaints, and ensure customer satisfaction.',
  'Customer Service',
  false
),
(
  'QA Engineer',
  'Seeking a meticulous QA Engineer to ensure software quality. Responsibilities include creating test plans, executing manual and automated tests, reporting bugs, and collaborating with development teams to resolve issues.',
  'Engineering',
  false
);
