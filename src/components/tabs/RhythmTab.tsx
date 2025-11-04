import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, Sun, Moon, Coffee, Utensils, Activity } from "lucide-react";
import circadianImage from "@/assets/circadian-waves.jpg";

export default function RhythmTab() {
  const currentHour = new Date().getHours();

  return (
    <div className="min-h-screen pb-24 pt-6">
      <div className="container mx-auto px-4 space-y-6">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <Clock className="h-16 w-16 mx-auto mb-4 text-primary animate-pulse-slow" />
          <h1 className="text-4xl font-bold mb-2">Circadian Rhythm</h1>
          <p className="text-muted-foreground">Your body's natural clock</p>
        </div>

        {/* Current Status */}
        <Card className="gradient-card p-6 animate-slide-up glow-effect overflow-hidden relative">
          <img
            src={circadianImage}
            alt="Circadian rhythm"
            className="absolute inset-0 w-full h-full object-cover opacity-20"
          />
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold">Your Digital Twin</h2>
              <Badge className="bg-primary text-primary-foreground">
                {currentHour < 6 ? "🌙 Night" : currentHour < 12 ? "🌅 Morning" : currentHour < 18 ? "☀️ Afternoon" : "🌆 Evening"}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Based on your sleep data, your body's natural rhythm peaks at 2:00 PM and dips
              at 10:30 PM.
            </p>
            <div className="bg-background/40 backdrop-blur-sm rounded-lg p-4">
              <p className="text-sm font-medium mb-2">Current Energy Level</p>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-1000"
                  style={{ width: "68%" }}
                />
              </div>
              <p className="text-xs text-muted-foreground mt-2">68% - Moderate Energy</p>
            </div>
          </div>
        </Card>

        {/* 24-Hour Timeline */}
        <Card className="gradient-card p-6 animate-slide-up">
          <h3 className="text-xl font-bold mb-4">Today's Rhythm Forecast</h3>
          <div className="space-y-3">
            {[
              { time: "6:00 AM", icon: Sun, label: "Wake Window", color: "text-warning" },
              { time: "10:00 AM", icon: Coffee, label: "Peak Alertness", color: "text-accent" },
              { time: "2:00 PM", icon: Activity, label: "Energy Peak", color: "text-primary" },
              { time: "6:00 PM", icon: Utensils, label: "Last Meal Time", color: "text-secondary" },
              { time: "10:30 PM", icon: Moon, label: "Sleep Window", color: "text-primary" },
            ].map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-4 p-3 bg-muted/20 rounded-lg hover:bg-muted/30 transition-colors"
              >
                <item.icon className={`h-5 w-5 ${item.color}`} />
                <div className="flex-1">
                  <p className="font-medium">{item.label}</p>
                  <p className="text-sm text-muted-foreground">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Optimization Tips */}
        <Card className="gradient-card p-6 animate-slide-up">
          <h3 className="text-xl font-bold mb-4">Personalized Timing</h3>
          <div className="space-y-4">
            <div className="bg-primary/10 border border-primary/30 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Coffee className="h-5 w-5 text-primary" />
                <span className="font-semibold">Caffeine Cut-off</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Stop caffeine intake by <span className="text-foreground font-medium">2:00 PM</span> for optimal sleep
              </p>
            </div>

            <div className="bg-accent/10 border border-accent/30 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Sun className="h-5 w-5 text-accent" />
                <span className="font-semibold">Light Exposure</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Get 15 minutes of morning sunlight to strengthen your rhythm
              </p>
            </div>
          </div>
        </Card>

        {/* Melatonin Window */}
        <Card className="gradient-card p-6 animate-slide-up">
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Moon className="h-5 w-5 text-secondary" />
            Melatonin Production Window
          </h3>
          <div className="bg-muted/30 rounded-lg p-4 mb-4">
            <p className="text-lg font-semibold mb-2">8:45 PM - 11:00 PM</p>
            <p className="text-sm text-muted-foreground">
              Your natural sleep hormone production peaks during this window. Dim lights and
              reduce screen time for best results.
            </p>
          </div>
          <Button className="w-full">Set Reminder</Button>
        </Card>

        {/* Sync Challenge */}
        <Card className="gradient-card p-6 animate-slide-up">
          <h3 className="text-xl font-bold mb-3">7-Day Rhythm Sync Challenge</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Wake up and sleep within 30 minutes of your optimal times for 7 consecutive days
          </p>
          <div className="flex gap-2 mb-4">
            {[1, 2, 3, 4, 5, 6, 7].map((day) => (
              <div
                key={day}
                className={`flex-1 h-2 rounded-full ${
                  day <= 3 ? "bg-primary" : "bg-muted"
                }`}
              />
            ))}
          </div>
          <p className="text-sm font-medium">3/7 days completed</p>
        </Card>
      </div>
    </div>
  );
}
