import { Activity, Brain, Moon, Shield, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

export type TabType = "pulse" | "guardian" | "rhythm" | "mindRewire" | "dreamscape";

interface TabNavigationProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

const tabs = [
  { id: "pulse" as TabType, label: "Pulse", icon: Activity },
  { id: "guardian" as TabType, label: "Guardian", icon: Shield },
  { id: "rhythm" as TabType, label: "Rhythm", icon: Moon },
  { id: "mindRewire" as TabType, label: "MindRewire", icon: Brain },
  { id: "dreamscape" as TabType, label: "Dreamscape", icon: Sparkles },
];

export default function TabNavigation({ activeTab, onTabChange }: TabNavigationProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border/50 bg-card/80 backdrop-blur-xl">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-around py-3">
          {tabs.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => onTabChange(id)}
              className={cn(
                "flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-all duration-300",
                activeTab === id
                  ? "text-primary scale-110"
                  : "text-muted-foreground hover:text-foreground hover:scale-105"
              )}
            >
              <Icon
                className={cn(
                  "h-6 w-6 transition-all duration-300",
                  activeTab === id && "animate-glow"
                )}
              />
              <span className="text-xs font-medium">{label}</span>
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}
