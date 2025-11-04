import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export function useSleepData() {
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<any>(null);
  const [sleepScore, setSleepScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [addictionPatterns, setAddictionPatterns] = useState<any[]>([]);
  const [recentSessions, setRecentSessions] = useState<any[]>([]);

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Fetch profile
      const { data: profileData } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();
      
      setProfile(profileData);

      // Fetch sleep streak
      const { data: streakData } = await supabase
        .from("sleep_streaks")
        .select("*")
        .eq("user_id", user.id)
        .single();
      
      setStreak(streakData?.current_streak || 0);

      // Fetch addiction patterns
      const { data: patternsData } = await supabase
        .from("addiction_patterns")
        .select("*")
        .eq("user_id", user.id)
        .order("intensity", { ascending: false });
      
      setAddictionPatterns(patternsData || []);

      // Fetch recent sleep sessions
      const { data: sessionsData } = await supabase
        .from("sleep_sessions")
        .select("*")
        .eq("user_id", user.id)
        .order("date", { ascending: false })
        .limit(7);
      
      setRecentSessions(sessionsData || []);

      // Calculate average sleep score
      if (sessionsData && sessionsData.length > 0) {
        const avgScore = sessionsData.reduce((sum, session) => sum + (session.quality_score || 0), 0) / sessionsData.length;
        setSleepScore(Math.round(avgScore));
      } else {
        setSleepScore(50); // Default
      }

    } catch (error) {
      console.error("Error fetching sleep data:", error);
      toast.error("Failed to load your data");
    } finally {
      setLoading(false);
    }
  };

  const logMood = async (moodType: string, intensity: number, notes?: string) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { error } = await supabase.from("mood_logs").insert({
        user_id: user.id,
        mood_type: moodType,
        intensity,
        context: "before_sleep",
        notes,
      });

      if (error) throw error;

      // Get AI analysis
      const response = await supabase.functions.invoke("analyze-emotional-patterns", {
        body: { text: `Feeling ${moodType}. ${notes || ''}`, type: "mood" },
      });

      if (response.data?.analysis) {
        toast.success("Mood logged", {
          description: response.data.analysis.suggestion,
        });
      }

    } catch (error) {
      console.error("Error logging mood:", error);
      toast.error("Failed to log mood");
    }
  };

  const saveDream = async (content: string) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Get AI analysis first
      const response = await supabase.functions.invoke("analyze-emotional-patterns", {
        body: { text: content, type: "dream" },
      });

      const analysis = response.data?.analysis;

      const { error } = await supabase.from("dream_entries").insert({
        user_id: user.id,
        content,
        symbols: analysis?.symbols || [],
        ai_analysis: analysis?.analysis,
        emotional_tone: analysis?.emotional_tone,
      });

      if (error) throw error;

      toast.success("Dream saved & analyzed", {
        description: analysis?.analysis || "Your dream has been recorded",
      });

    } catch (error) {
      console.error("Error saving dream:", error);
      toast.error("Failed to save dream");
    }
  };

  const logIntervention = async (interventionType: string, success: boolean) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Get risk score from AI
      const response = await supabase.functions.invoke("analyze-emotional-patterns", {
        body: { 
          text: `Intervention: ${interventionType}, Success: ${success}`, 
          type: "intervention" 
        },
      });

      const riskScore = response.data?.analysis?.risk_score || 50;

      await supabase.from("guardian_interventions").insert({
        user_id: user.id,
        intervention_type: interventionType,
        success,
        relapse_risk_score: riskScore,
      });

    } catch (error) {
      console.error("Error logging intervention:", error);
    }
  };

  return {
    loading,
    profile,
    sleepScore,
    streak,
    addictionPatterns,
    recentSessions,
    logMood,
    saveDream,
    logIntervention,
    refreshData: fetchAllData,
  };
}
