-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- User Profiles Table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  onboarding_completed BOOLEAN DEFAULT false,
  sleep_goal_time TIME DEFAULT '23:00:00',
  wake_goal_time TIME DEFAULT '07:00:00',
  sleep_personality_type TEXT DEFAULT 'The Midnight Thinker'
);

-- Sleep Sessions Table
CREATE TABLE public.sleep_sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  bedtime TIMESTAMP WITH TIME ZONE,
  wake_time TIMESTAMP WITH TIME ZONE,
  quality_score INTEGER CHECK (quality_score >= 0 AND quality_score <= 100),
  duration_minutes INTEGER,
  phone_usage_minutes INTEGER DEFAULT 0,
  intervention_count INTEGER DEFAULT 0,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Mood Tracking Table
CREATE TABLE public.mood_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT now(),
  mood_type TEXT NOT NULL,
  intensity INTEGER CHECK (intensity >= 1 AND intensity <= 10),
  context TEXT,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Dream Journal Table (Fixed syntax)
CREATE TABLE public.dream_entries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  content TEXT NOT NULL,
  symbols JSONB DEFAULT '[]'::jsonb,
  ai_analysis TEXT,
  emotional_tone TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- CBT Module Progress Table
CREATE TABLE public.cbt_progress (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  module_index INTEGER NOT NULL,
  module_title TEXT NOT NULL,
  completed BOOLEAN DEFAULT false,
  completed_at TIMESTAMP WITH TIME ZONE,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(user_id, module_index)
);

-- Addiction Pattern Analysis Table
CREATE TABLE public.addiction_patterns (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  pattern_type TEXT NOT NULL,
  intensity INTEGER CHECK (intensity >= 0 AND intensity <=100),
  last_updated TIMESTAMP WITH TIME ZONE DEFAULT now(),
  weekly_trend JSONB DEFAULT '[]'::jsonb,
  UNIQUE(user_id, pattern_type)
);

-- Guardian Interventions Log Table
CREATE TABLE public.guardian_interventions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT now(),
  intervention_type TEXT NOT NULL,
  success BOOLEAN DEFAULT false,
  relapse_risk_score INTEGER CHECK (relapse_risk_score >= 0 AND relapse_risk_score <= 100),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Sleep Streaks Table
CREATE TABLE public.sleep_streaks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  current_streak INTEGER DEFAULT 0,
  best_streak INTEGER DEFAULT 0,
  total_successful_nights INTEGER DEFAULT 0,
  last_successful_night DATE,
  unlocked_rewards JSONB DEFAULT '[]'::jsonb,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(user_id)
);

-- Circadian Data Table
CREATE TABLE public.circadian_data (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  melatonin_window_start TIME,
  melatonin_window_end TIME,
  energy_curve JSONB DEFAULT '[]'::jsonb,
  caffeine_cutoff_time TIME,
  light_exposure_minutes INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(user_id, date)
);

-- Enable Row Level Security on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sleep_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.mood_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.dream_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cbt_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.addiction_patterns ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.guardian_interventions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sleep_streaks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.circadian_data ENABLE ROW LEVEL SECURITY;

-- RLS Policies for profiles
CREATE POLICY "Users can view their own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile"
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- RLS Policies for sleep_sessions
CREATE POLICY "Users can view their own sleep sessions"
  ON public.sleep_sessions FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own sleep sessions"
  ON public.sleep_sessions FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own sleep sessions"
  ON public.sleep_sessions FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own sleep sessions"
  ON public.sleep_sessions FOR DELETE
  USING (auth.uid() = user_id);

-- RLS Policies for mood_logs
CREATE POLICY "Users can view their own mood logs"
  ON public.mood_logs FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own mood logs"
  ON public.mood_logs FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own mood logs"
  ON public.mood_logs FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own mood logs"
  ON public.mood_logs FOR DELETE
  USING (auth.uid() = user_id);

-- RLS Policies for dream_entries
CREATE POLICY "Users can view their own dream entries"
  ON public.dream_entries FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own dream entries"
  ON public.dream_entries FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own dream entries"
  ON public.dream_entries FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own dream entries"
  ON public.dream_entries FOR DELETE
  USING (auth.uid() = user_id);

-- RLS Policies for cbt_progress
CREATE POLICY "Users can view their own CBT progress"
  ON public.cbt_progress FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own CBT progress"
  ON public.cbt_progress FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own CBT progress"
  ON public.cbt_progress FOR UPDATE
  USING (auth.uid() = user_id);

-- RLS Policies for addiction_patterns
CREATE POLICY "Users can view their own addiction patterns"
  ON public.addiction_patterns FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own addiction patterns"
  ON public.addiction_patterns FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own addiction patterns"
  ON public.addiction_patterns FOR UPDATE
  USING (auth.uid() = user_id);

-- RLS Policies for guardian_interventions
CREATE POLICY "Users can view their own guardian interventions"
  ON public.guardian_interventions FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own guardian interventions"
  ON public.guardian_interventions FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- RLS Policies for sleep_streaks
CREATE POLICY "Users can view their own sleep streaks"
  ON public.sleep_streaks FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own sleep streaks"
  ON public.sleep_streaks FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own sleep streaks"
  ON public.sleep_streaks FOR UPDATE
  USING (auth.uid() = user_id);

-- RLS Policies for circadian_data
CREATE POLICY "Users can view their own circadian data"
  ON public.circadian_data FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own circadian data"
  ON public.circadian_data FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own circadian data"
  ON public.circadian_data FOR UPDATE
  USING (auth.uid() = user_id);

-- Create function to handle new user profile creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name)
  VALUES (
    new.id,
    COALESCE(new.raw_user_meta_data->>'full_name', 'Sleep User')
  );
  
  -- Initialize sleep streak
  INSERT INTO public.sleep_streaks (user_id, current_streak, best_streak)
  VALUES (new.id, 0, 0);
  
  -- Initialize default addiction patterns
  INSERT INTO public.addiction_patterns (user_id, pattern_type, intensity)
  VALUES 
    (new.id, 'stress', 50),
    (new.id, 'loneliness', 30),
    (new.id, 'fomo', 40),
    (new.id, 'boredom', 25);
  
  RETURN new;
END;
$$;

-- Trigger to create profile on user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- Trigger to auto-update timestamps
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at();

-- Function to calculate sleep score
CREATE OR REPLACE FUNCTION public.calculate_sleep_score(
  p_duration_minutes INTEGER,
  p_quality_score INTEGER,
  p_phone_usage_minutes INTEGER,
  p_intervention_count INTEGER
)
RETURNS INTEGER
LANGUAGE plpgsql
AS $$
DECLARE
  base_score INTEGER;
  duration_penalty INTEGER;
  usage_penalty INTEGER;
  intervention_penalty INTEGER;
BEGIN
  base_score := COALESCE(p_quality_score, 50);
  
  IF p_duration_minutes IS NOT NULL THEN
    IF p_duration_minutes < 360 THEN
      duration_penalty := (360 - p_duration_minutes) / 6;
      base_score := base_score - duration_penalty;
    ELSIF p_duration_minutes > 540 THEN
      duration_penalty := (p_duration_minutes - 540) / 12;
      base_score := base_score - duration_penalty;
    END IF;
  END IF;
  
  IF p_phone_usage_minutes > 0 THEN
    usage_penalty := LEAST(p_phone_usage_minutes / 2, 20);
    base_score := base_score - usage_penalty;
  END IF;
  
  IF p_intervention_count > 0 THEN
    intervention_penalty := LEAST(p_intervention_count * 5, 15);
    base_score := base_score - intervention_penalty;
  END IF;
  
  RETURN GREATEST(0, LEAST(100, base_score));
END;
$$;