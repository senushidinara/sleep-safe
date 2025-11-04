import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Sunrise, BookOpen, TrendingUp, Award } from "lucide-react";
import { toast } from "sonner";
import { useSleepData } from "@/hooks/useSleepData";
import meditationImage from "@/assets/meditation-orbs.jpg";

export default function DreamscapeTab() {
  const [dreamEntry, setDreamEntry] = useState("");
  const { streak, saveDream } = useSleepData();

  const handleSaveDream = async () => {
    if (dreamEntry.trim()) {
      await saveDream(dreamEntry);
      setDreamEntry("");
    }
  };

  return (
    <div className="min-h-screen pb-24 pt-6">
      <div className="container mx-auto px-4 space-y-6">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <Sparkles className="h-16 w-16 mx-auto mb-4 text-secondary animate-float" />
          <h1 className="text-4xl font-bold mb-2">Dreamscape</h1>
          <p className="text-muted-foreground">Your restful recovery sanctuary</p>
        </div>

        {/* Morning Recovery Report */}
        <Card className="gradient-card p-6 animate-slide-up glow-effect overflow-hidden relative">
          <img
            src={meditationImage}
            alt="Meditation"
            className="absolute inset-0 w-full h-full object-cover opacity-20"
          />
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <Sunrise className="h-6 w-6 text-warning" />
                Morning Recovery
              </h2>
              <Badge className="bg-success/20 text-success border-success">
                Excellent
              </Badge>
            </div>
            <div className="space-y-3 mb-4">
              <div className="bg-background/40 backdrop-blur-sm rounded-lg p-3">
                <p className="text-sm font-medium mb-1">Sleep Quality</p>
                <p className="text-2xl font-bold">8.5/10</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-background/40 backdrop-blur-sm rounded-lg p-3">
                  <p className="text-xs text-muted-foreground mb-1">Duration</p>
                  <p className="text-lg font-bold">7h 45m</p>
                </div>
                <div className="bg-background/40 backdrop-blur-sm rounded-lg p-3">
                  <p className="text-xs text-muted-foreground mb-1">Mood Improvement</p>
                  <p className="text-lg font-bold text-success">+30%</p>
                </div>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              You reduced post-midnight phone usage by 48%. Your emotional calm increased
              significantly. Remarkable progress!
            </p>
          </div>
        </Card>

        {/* Dream Journal */}
        <Card className="gradient-card p-6 animate-slide-up">
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-primary" />
            Dream Journal
          </h3>
          <Textarea
            placeholder="Describe your dream... AI will analyze emotional patterns and recurring symbols"
            value={dreamEntry}
            onChange={(e) => setDreamEntry(e.target.value)}
            className="min-h-32 mb-4 bg-muted/20 border-muted"
          />
          <Button onClick={handleSaveDream} className="w-full">
            Save & Analyze Dream
          </Button>
        </Card>

        {/* Dream Insights */}
        <Card className="gradient-card p-6 animate-slide-up">
          <h3 className="text-xl font-bold mb-4">Recent Dream Insights</h3>
          <div className="space-y-3">
            {[
              {
                symbol: "Running",
                meaning: "Indicates overstimulation before bed",
                suggestion: "Try 5-minute yoga flow tomorrow evening",
              },
              {
                symbol: "Water",
                meaning: "Represents emotional processing",
                suggestion: "Your mind is healing - great progress",
              },
            ].map((insight, i) => (
              <div
                key={i}
                className="bg-muted/20 rounded-lg p-4 hover:bg-muted/30 transition-colors"
              >
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="h-4 w-4 text-secondary" />
                  <span className="font-semibold">{insight.symbol}</span>
                </div>
                <p className="text-sm text-muted-foreground mb-2">{insight.meaning}</p>
                <p className="text-sm text-accent">{insight.suggestion}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Sleep Streak Rewards */}
        <Card className="gradient-card p-6 animate-slide-up">
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Award className="h-5 w-5 text-warning" />
            Sleep Streak Rewards
          </h3>
          <div className="mb-4">
            <p className="text-sm text-muted-foreground mb-2">
              Current Streak: <span className="text-foreground font-bold">{streak} nights</span>
            </p>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5, 7, 10].map((day) => (
                <div
                  key={day}
                  className={`flex-1 h-12 rounded-lg flex items-center justify-center font-bold text-sm ${
                    streak >= day
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted/30 text-muted-foreground"
                  }`}
                >
                  {day}
                </div>
              ))}
            </div>
          </div>
          <div className="bg-primary/10 border border-primary/30 rounded-lg p-4">
            <p className="font-semibold mb-2">🌌 Unlocked: Silent Horizon</p>
            <p className="text-sm text-muted-foreground">
              A tranquil space scene earned for 5 early sleeps in a row. Tap to explore.
            </p>
          </div>
        </Card>

        {/* Self-Reflection */}
        <Card className="gradient-card p-6 animate-slide-up">
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-accent" />
            Weekly Reflection
          </h3>
          <div className="space-y-4">
            <div className="bg-muted/20 rounded-lg p-4">
              <p className="text-sm font-medium mb-2">What improved most this week?</p>
              <p className="text-sm text-muted-foreground">
                Your bedtime consistency improved by 42%, and anxiety levels before sleep
                decreased significantly.
              </p>
            </div>
            <Button variant="outline" className="w-full">
              View Full Analysis
            </Button>
          </div>
        </Card>

        {/* Immersive Calm Gallery */}
        <Card className="gradient-card p-6 animate-slide-up">
          <h3 className="text-xl font-bold mb-4">Calm Soundscapes</h3>
          <div className="grid grid-cols-2 gap-3">
            {["Ocean Waves", "Forest Rain", "White Noise", "Gentle Piano"].map((sound) => (
              <Button
                key={sound}
                variant="outline"
                className="h-20 flex flex-col items-center justify-center gap-2 hover:bg-primary/20 hover:text-primary"
                onClick={() =>
                  toast.success(`Playing: ${sound}`, {
                    description: "Personalized for your relaxation",
                  })
                }
              >
                <span className="text-2xl">🎵</span>
                <span className="text-xs">{sound}</span>
              </Button>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
