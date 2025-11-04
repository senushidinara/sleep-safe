import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Heart, TrendingUp, Moon, Zap, Calendar, Sparkles } from "lucide-react";
import heroImage from "@/assets/hero-night-sky.jpg";

export default function PulseTab() {
  const [sleepScore] = useState(72);
  const [streak] = useState(5);
  const [mood] = useState("Calm");

  return (
    <div className="min-h-screen pb-24 pt-6">
      {/* Hero Section */}
      <div className="relative h-48 -mt-6 mb-6 overflow-hidden">
        <img 
          src={heroImage} 
          alt="Night sky" 
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-4xl font-bold mb-2 animate-fade-in">
            Your Sleep Mind
          </h1>
          <p className="text-muted-foreground animate-fade-in">
            Track your journey to better rest
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 space-y-6">
        {/* Sleep Addiction Score */}
        <Card className="gradient-card p-6 animate-slide-up glow-effect">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <Moon className="h-6 w-6 text-primary" />
              Sleep Recovery Score
            </h2>
            <Badge variant="outline" className="bg-primary/20 text-primary border-primary">
              {sleepScore}/100
            </Badge>
          </div>
          <Progress value={sleepScore} className="h-3 mb-4" />
          <p className="text-sm text-muted-foreground">
            You're making excellent progress! Keep up the consistent bedtime routine.
          </p>
        </Card>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="gradient-card p-5 animate-slide-up hover:scale-105 transition-transform cursor-pointer">
            <div className="flex items-center gap-3 mb-2">
              <Zap className="h-5 w-5 text-accent" />
              <span className="text-sm text-muted-foreground">Streak</span>
            </div>
            <p className="text-3xl font-bold">{streak} days</p>
            <p className="text-xs text-muted-foreground mt-1">Personal best!</p>
          </Card>

          <Card className="gradient-card p-5 animate-slide-up hover:scale-105 transition-transform cursor-pointer">
            <div className="flex items-center gap-3 mb-2">
              <Heart className="h-5 w-5 text-secondary" />
              <span className="text-sm text-muted-foreground">Mood</span>
            </div>
            <p className="text-3xl font-bold">{mood}</p>
            <p className="text-xs text-muted-foreground mt-1">Emotional state</p>
          </Card>
        </div>

        {/* Sleep Personality */}
        <Card className="gradient-card p-6 animate-slide-up">
          <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-secondary" />
            Sleep Personality
          </h3>
          <div className="bg-muted/30 rounded-lg p-4 mb-4">
            <p className="font-semibold text-lg mb-1">The Midnight Thinker</p>
            <p className="text-sm text-muted-foreground">
              You tend to feel most creative at night, but this can interfere with your sleep schedule.
            </p>
          </div>
          <Button variant="outline" className="w-full">
            View Full Analysis
          </Button>
        </Card>

        {/* Mood-Sleep Graph */}
        <Card className="gradient-card p-6 animate-slide-up">
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-accent" />
            Weekly Progress
          </h3>
          <div className="space-y-3">
            {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, i) => (
              <div key={day} className="flex items-center gap-3">
                <span className="text-sm w-12 text-muted-foreground">{day}</span>
                <Progress 
                  value={60 + Math.random() * 40} 
                  className="h-2 flex-1"
                />
                <span className="text-sm font-medium">{Math.floor(60 + Math.random() * 40)}%</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Daily Reflection */}
        <Card className="gradient-card p-6 animate-slide-up">
          <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
            <Calendar className="h-5 w-5 text-primary" />
            Daily Reflection
          </h3>
          <p className="text-muted-foreground mb-4">
            How are you feeling about your sleep tonight?
          </p>
          <div className="grid grid-cols-3 gap-2">
            {["😊 Great", "😐 Okay", "😟 Anxious"].map((emotion) => (
              <Button
                key={emotion}
                variant="outline"
                className="hover:bg-primary/20 hover:text-primary"
              >
                {emotion}
              </Button>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
