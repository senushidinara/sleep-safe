import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { text, type } = await req.json();
    
    if (!text) {
      throw new Error("Text is required for analysis");
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY not configured");
    }

    let systemPrompt = "";
    
    if (type === "mood") {
      systemPrompt = `You are an empathetic sleep wellness AI analyzing emotional patterns that affect sleep. 
      Analyze the user's mood entry and provide:
      1. Primary emotion detected (anxious, calm, stressed, happy, lonely, etc.)
      2. Intensity level (1-10)
      3. How this emotion typically impacts sleep
      4. A compassionate, brief suggestion (max 50 words)
      
      Return JSON: { "emotion": string, "intensity": number, "sleep_impact": string, "suggestion": string }`;
    } else if (type === "dream") {
      systemPrompt = `You are a dream pattern analyst specializing in sleep psychology.
      Analyze the dream entry and identify:
      1. Recurring symbols and their meanings
      2. Emotional tone (peaceful, anxious, exciting, etc.)
      3. Possible connections to sleep quality
      4. A brief insight (max 80 words)
      
      Return JSON: { "symbols": string[], "emotional_tone": string, "analysis": string, "sleep_connection": string }`;
    } else if (type === "intervention") {
      systemPrompt = `You are a compassionate AI sleep guardian detecting late-night temptation patterns.
      Based on the user's current state, provide:
      1. Relapse risk score (0-100)
      2. Primary trigger identified
      3. Intervention recommendation
      4. Compassionate message (max 60 words)
      
      Return JSON: { "risk_score": number, "trigger": string, "intervention": string, "message": string }`;
    }

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: text }
        ],
        response_format: { type: "json_object" }
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again later." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "AI credits depleted. Please add funds to continue." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const errorText = await response.text();
      console.error("AI API error:", response.status, errorText);
      throw new Error("AI analysis failed");
    }

    const data = await response.json();
    const analysisResult = JSON.parse(data.choices[0].message.content);

    return new Response(
      JSON.stringify({ analysis: analysisResult }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (error) {
    console.error("Error in emotional analysis:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
