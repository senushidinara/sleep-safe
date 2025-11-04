import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Shield, Lock, Zap, AlertCircle, Moon, Smartphone } from "lucide-react";
import { toast } from "sonner";

export default function GuardianTab() {
  const [guardianActive, setGuardianActive] = useState(false);
  const [blueLightShield, setBlueLightShield] = useState(false);
  const [appLockdown, setAppLockdown] = useState(false);

  const handleGuardianToggle = () => {
    setGuardianActive(!guardianActive);
    toast.success(
      guardianActive ? "Guardian Mode Deactivated" : "Guardian Mode Activated",
      {
        description: guardianActive
          ? "You're on your own now"
          : "Your digital sleep guardian is now protecting your rest",
      }
    );
  };

  return (
    <div className="min-h-screen pb-24 pt-6">
      <div className="container mx-auto px-4 space-y-6">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <Shield className="h-16 w-16 mx-auto mb-4 text-primary animate-float" />
          <h1 className="text-4xl font-bold mb-2">Guardian Mode</h1>
          <p className="text-muted-foreground">
            Real-time protection against late-night digital temptations
          </p>
        </div>

        {/* Main Guardian Toggle */}
        <Card className="gradient-card p-6 animate-slide-up glow-effect">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">Sleep Guardian</h2>
              <p className="text-sm text-muted-foreground">
                {guardianActive
                  ? "Actively monitoring your phone usage"
                  : "Tap to activate protection"}
              </p>
            </div>
            <Switch
              checked={guardianActive}
              onCheckedChange={handleGuardianToggle}
              className="scale-125"
            />
          </div>

          {guardianActive && (
            <div className="bg-primary/10 border border-primary/30 rounded-lg p-4 animate-fade-in">
              <div className="flex items-center gap-2 mb-2">
                <AlertCircle className="h-5 w-5 text-primary" />
                <span className="font-semibold text-primary">Guardian Active</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Your sleep patterns are being protected. Interventions will activate if
                risky behavior is detected.
              </p>
            </div>
          )}
        </Card>

        {/* Protection Features */}
        <div className="space-y-4">
          {/* Blue Light Shield */}
          <Card className="gradient-card p-5 animate-slide-up hover:scale-102 transition-transform">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="bg-accent/20 p-3 rounded-lg">
                  <Moon className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <h3 className="font-semibold">Blue Light Shield</h3>
                  <p className="text-sm text-muted-foreground">
                    Reduces eye strain before bed
                  </p>
                </div>
              </div>
              <Switch
                checked={blueLightShield}
                onCheckedChange={(checked) => {
                  setBlueLightShield(checked);
                  toast.success(
                    checked ? "Blue Light Shield Enabled" : "Blue Light Shield Disabled"
                  );
                }}
              />
            </div>
          </Card>

          {/* App Lockdown */}
          <Card className="gradient-card p-5 animate-slide-up hover:scale-102 transition-transform">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="bg-destructive/20 p-3 rounded-lg">
                  <Lock className="h-6 w-6 text-destructive" />
                </div>
                <div>
                  <h3 className="font-semibold">Adaptive App Lockdown</h3>
                  <p className="text-sm text-muted-foreground">
                    Blocks distracting apps dynamically
                  </p>
                </div>
              </div>
              <Switch
                checked={appLockdown}
                onCheckedChange={(checked) => {
                  setAppLockdown(checked);
                  toast.success(
                    checked ? "App Lockdown Enabled" : "App Lockdown Disabled"
                  );
                }}
              />
            </div>
          </Card>
        </div>

        {/* Relapse Risk Prediction */}
        <Card className="gradient-card p-6 animate-slide-up">
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Zap className="h-5 w-5 text-warning" />
            Relapse Risk Prediction
          </h3>
          <div className="space-y-4">
            <div className="bg-muted/30 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium">Tonight's Risk Level</span>
                <Badge variant="outline" className="bg-warning/20 text-warning border-warning">
                  Medium
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                AI detected increased phone activity after 11 PM on similar nights
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Button variant="outline" className="flex items-center gap-2">
                <Smartphone className="h-4 w-4" />
                Manage Apps
              </Button>
              <Button variant="outline">View Patterns</Button>
            </div>
          </div>
        </Card>

        {/* Compassion Override */}
        <Card className="gradient-card p-6 animate-slide-up">
          <h3 className="text-xl font-bold mb-3">Compassion Dialogue</h3>
          <div className="bg-primary/10 rounded-lg p-4 mb-4 border-l-4 border-primary">
            <p className="text-sm italic">
              "I sense you're feeling restless tonight. Would you like to try a 2-minute
              breathing exercise instead of scrolling?"
            </p>
          </div>
          <Button className="w-full" variant="outline">
            Start Breathing Exercise
          </Button>
        </Card>

        {/* Stats */}
        <Card className="gradient-card p-6 animate-slide-up">
          <h3 className="text-xl font-bold mb-4">Guardian Impact</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 bg-muted/20 rounded-lg">
              <p className="text-3xl font-bold text-primary mb-1">23</p>
              <p className="text-xs text-muted-foreground">Interventions This Week</p>
            </div>
            <div className="text-center p-4 bg-muted/20 rounded-lg">
              <p className="text-3xl font-bold text-accent mb-1">87%</p>
              <p className="text-xs text-muted-foreground">Success Rate</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
