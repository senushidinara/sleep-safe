import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Brain, BookOpen, Target, Zap, Award } from "lucide-react";
import { toast } from "sonner";

export default function MindRewireTab() {
  const [currentModule, setCurrentModule] = useState(0);
  const [completedModules, setCompletedModules] = useState(2);

  const modules = [
    {
      title: "Understanding Triggers",
      description: "Identify what drives your late-night scrolling",
      duration: "2 min",
      difficulty: "Beginner",
    },
    {
      title: "Thought Challenging",
      description: "Question the 'just one more video' impulse",
      duration: "3 min",
      difficulty: "Beginner",
    },
    {
      title: "Reward Replacement",
      description: "Find healthier sources of comfort",
      duration: "3 min",
      difficulty: "Intermediate",
    },
    {
      title: "Impulse Control",
      description: "Build resistance to digital temptations",
      duration: "4 min",
      difficulty: "Intermediate",
    },
    {
      title: "Long-term Rewiring",
      description: "Create lasting behavioral change",
      duration: "5 min",
      difficulty: "Advanced",
    },
  ];

  const handleStartModule = (index: number) => {
    setCurrentModule(index);
    toast.success("Module Started", {
      description: `Beginning: ${modules[index].title}`,
    });
  };

  const handleCompleteModule = () => {
    if (completedModules < modules.length) {
      setCompletedModules(completedModules + 1);
      toast.success("Module Completed! 🎉", {
        description: "You're rewiring your sleep habits!",
      });
    }
  };

  return (
    <div className="min-h-screen pb-24 pt-6">
      <div className="container mx-auto px-4 space-y-6">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <Brain className="h-16 w-16 mx-auto mb-4 text-primary animate-pulse-slow" />
          <h1 className="text-4xl font-bold mb-2">MindRewire Lab</h1>
          <p className="text-muted-foreground">
            Neuroscience-backed habit transformation
          </p>
        </div>

        {/* Progress Overview */}
        <Card className="gradient-card p-6 animate-slide-up glow-effect">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold">Your Progress</h2>
            <Award className="h-8 w-8 text-warning" />
          </div>
          <Progress value={(completedModules / modules.length) * 100} className="h-3 mb-4" />
          <p className="text-sm text-muted-foreground">
            {completedModules} of {modules.length} modules completed
          </p>
        </Card>

        {/* Addiction Pattern Map */}
        <Card className="gradient-card p-6 animate-slide-up">
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Target className="h-5 w-5 text-accent" />
            Your Addiction Pattern
          </h3>
          <div className="space-y-3">
            {[
              { label: "Stress Trigger", value: 85, color: "bg-destructive" },
              { label: "Loneliness", value: 60, color: "bg-warning" },
              { label: "FOMO", value: 40, color: "bg-accent" },
              { label: "Boredom", value: 30, color: "bg-primary" },
            ].map((pattern) => (
              <div key={pattern.label}>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">{pattern.label}</span>
                  <span className="text-sm text-muted-foreground">{pattern.value}%</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className={`h-full ${pattern.color} transition-all duration-1000`}
                    style={{ width: `${pattern.value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* CBT Modules */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-primary" />
            Cognitive Rewiring Modules
          </h3>
          {modules.map((module, index) => (
            <Card
              key={index}
              className={`gradient-card p-5 animate-slide-up hover:scale-102 transition-transform cursor-pointer ${
                index === currentModule ? "ring-2 ring-primary" : ""
              }`}
              onClick={() => setCurrentModule(index)}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-semibold">{module.title}</h4>
                    {index < completedModules && (
                      <span className="text-xs bg-success/20 text-success px-2 py-0.5 rounded-full">
                        ✓ Completed
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    {module.description}
                  </p>
                  <div className="flex gap-2">
                    <span className="text-xs bg-muted/30 px-2 py-1 rounded">
                      {module.duration}
                    </span>
                    <span className="text-xs bg-muted/30 px-2 py-1 rounded">
                      {module.difficulty}
                    </span>
                  </div>
                </div>
              </div>
              {index === currentModule && (
                <Button
                  className="w-full mt-3"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (index >= completedModules) {
                      handleCompleteModule();
                    } else {
                      handleStartModule(index);
                    }
                  }}
                >
                  {index >= completedModules ? "Complete Module" : "Review Module"}
                </Button>
              )}
            </Card>
          ))}
        </div>

        {/* AI Dialogue */}
        <Card className="gradient-card p-6 animate-slide-up">
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Zap className="h-5 w-5 text-warning" />
            AI Reframing Dialogue
          </h3>
          <div className="space-y-3">
            <div className="bg-muted/20 rounded-lg p-4 border-l-4 border-primary">
              <p className="text-sm font-medium mb-1">Your Thought:</p>
              <p className="text-sm italic text-muted-foreground">
                "I'll just watch one more video before bed"
              </p>
            </div>
            <div className="bg-primary/10 rounded-lg p-4 border-l-4 border-accent">
              <p className="text-sm font-medium mb-1">AI Reframe:</p>
              <p className="text-sm">
                What if that 'one more video' is your brain seeking dopamine? Let's find a
                calmer way to feel satisfied before sleep.
              </p>
            </div>
          </div>
          <Button variant="outline" className="w-full mt-4">
            Start Dialogue Session
          </Button>
        </Card>

        {/* Psychoeducation Feed */}
        <Card className="gradient-card p-6 animate-slide-up">
          <h3 className="text-xl font-bold mb-4">Daily Neuroscience Insight</h3>
          <div className="bg-accent/10 rounded-lg p-4 border border-accent/30">
            <p className="text-sm font-medium mb-2">🧠 Did you know?</p>
            <p className="text-sm text-muted-foreground">
              Your brain's prefrontal cortex (responsible for self-control) is 60% less
              active after midnight. This is why late-night decisions often lead to
              scrolling binges.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
