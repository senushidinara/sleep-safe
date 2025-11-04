export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      addiction_patterns: {
        Row: {
          id: string
          intensity: number | null
          last_updated: string | null
          pattern_type: string
          user_id: string
          weekly_trend: Json | null
        }
        Insert: {
          id?: string
          intensity?: number | null
          last_updated?: string | null
          pattern_type: string
          user_id: string
          weekly_trend?: Json | null
        }
        Update: {
          id?: string
          intensity?: number | null
          last_updated?: string | null
          pattern_type?: string
          user_id?: string
          weekly_trend?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "addiction_patterns_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      cbt_progress: {
        Row: {
          completed: boolean | null
          completed_at: string | null
          created_at: string | null
          id: string
          module_index: number
          module_title: string
          notes: string | null
          user_id: string
        }
        Insert: {
          completed?: boolean | null
          completed_at?: string | null
          created_at?: string | null
          id?: string
          module_index: number
          module_title: string
          notes?: string | null
          user_id: string
        }
        Update: {
          completed?: boolean | null
          completed_at?: string | null
          created_at?: string | null
          id?: string
          module_index?: number
          module_title?: string
          notes?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "cbt_progress_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      circadian_data: {
        Row: {
          caffeine_cutoff_time: string | null
          created_at: string | null
          date: string
          energy_curve: Json | null
          id: string
          light_exposure_minutes: number | null
          melatonin_window_end: string | null
          melatonin_window_start: string | null
          user_id: string
        }
        Insert: {
          caffeine_cutoff_time?: string | null
          created_at?: string | null
          date?: string
          energy_curve?: Json | null
          id?: string
          light_exposure_minutes?: number | null
          melatonin_window_end?: string | null
          melatonin_window_start?: string | null
          user_id: string
        }
        Update: {
          caffeine_cutoff_time?: string | null
          created_at?: string | null
          date?: string
          energy_curve?: Json | null
          id?: string
          light_exposure_minutes?: number | null
          melatonin_window_end?: string | null
          melatonin_window_start?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "circadian_data_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      dream_entries: {
        Row: {
          ai_analysis: string | null
          content: string
          created_at: string | null
          date: string
          emotional_tone: string | null
          id: string
          symbols: Json | null
          user_id: string
        }
        Insert: {
          ai_analysis?: string | null
          content: string
          created_at?: string | null
          date?: string
          emotional_tone?: string | null
          id?: string
          symbols?: Json | null
          user_id: string
        }
        Update: {
          ai_analysis?: string | null
          content?: string
          created_at?: string | null
          date?: string
          emotional_tone?: string | null
          id?: string
          symbols?: Json | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "dream_entries_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      guardian_interventions: {
        Row: {
          created_at: string | null
          id: string
          intervention_type: string
          relapse_risk_score: number | null
          success: boolean | null
          timestamp: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          intervention_type: string
          relapse_risk_score?: number | null
          success?: boolean | null
          timestamp?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          intervention_type?: string
          relapse_risk_score?: number | null
          success?: boolean | null
          timestamp?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "guardian_interventions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      mood_logs: {
        Row: {
          context: string | null
          created_at: string | null
          id: string
          intensity: number | null
          mood_type: string
          notes: string | null
          timestamp: string | null
          user_id: string
        }
        Insert: {
          context?: string | null
          created_at?: string | null
          id?: string
          intensity?: number | null
          mood_type: string
          notes?: string | null
          timestamp?: string | null
          user_id: string
        }
        Update: {
          context?: string | null
          created_at?: string | null
          id?: string
          intensity?: number | null
          mood_type?: string
          notes?: string | null
          timestamp?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "mood_logs_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string | null
          full_name: string | null
          id: string
          onboarding_completed: boolean | null
          sleep_goal_time: string | null
          sleep_personality_type: string | null
          updated_at: string | null
          wake_goal_time: string | null
        }
        Insert: {
          created_at?: string | null
          full_name?: string | null
          id: string
          onboarding_completed?: boolean | null
          sleep_goal_time?: string | null
          sleep_personality_type?: string | null
          updated_at?: string | null
          wake_goal_time?: string | null
        }
        Update: {
          created_at?: string | null
          full_name?: string | null
          id?: string
          onboarding_completed?: boolean | null
          sleep_goal_time?: string | null
          sleep_personality_type?: string | null
          updated_at?: string | null
          wake_goal_time?: string | null
        }
        Relationships: []
      }
      sleep_sessions: {
        Row: {
          bedtime: string | null
          created_at: string | null
          date: string
          duration_minutes: number | null
          id: string
          intervention_count: number | null
          notes: string | null
          phone_usage_minutes: number | null
          quality_score: number | null
          user_id: string
          wake_time: string | null
        }
        Insert: {
          bedtime?: string | null
          created_at?: string | null
          date: string
          duration_minutes?: number | null
          id?: string
          intervention_count?: number | null
          notes?: string | null
          phone_usage_minutes?: number | null
          quality_score?: number | null
          user_id: string
          wake_time?: string | null
        }
        Update: {
          bedtime?: string | null
          created_at?: string | null
          date?: string
          duration_minutes?: number | null
          id?: string
          intervention_count?: number | null
          notes?: string | null
          phone_usage_minutes?: number | null
          quality_score?: number | null
          user_id?: string
          wake_time?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "sleep_sessions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      sleep_streaks: {
        Row: {
          best_streak: number | null
          current_streak: number | null
          id: string
          last_successful_night: string | null
          total_successful_nights: number | null
          unlocked_rewards: Json | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          best_streak?: number | null
          current_streak?: number | null
          id?: string
          last_successful_night?: string | null
          total_successful_nights?: number | null
          unlocked_rewards?: Json | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          best_streak?: number | null
          current_streak?: number | null
          id?: string
          last_successful_night?: string | null
          total_successful_nights?: number | null
          unlocked_rewards?: Json | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "sleep_streaks_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      calculate_sleep_score: {
        Args: {
          p_duration_minutes: number
          p_intervention_count: number
          p_phone_usage_minutes: number
          p_quality_score: number
        }
        Returns: number
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
