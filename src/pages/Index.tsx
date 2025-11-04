import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import TabNavigation, { TabType } from "@/components/TabNavigation";
import PulseTab from "@/components/tabs/PulseTab";
import GuardianTab from "@/components/tabs/GuardianTab";
import RhythmTab from "@/components/tabs/RhythmTab";
import MindRewireTab from "@/components/tabs/MindRewireTab";
import DreamscapeTab from "@/components/tabs/DreamscapeTab";
import Auth from "@/components/Auth";

const Index = () => {
  const [activeTab, setActiveTab] = useState<TabType>("pulse");
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse-slow text-primary">Loading SleepSafe...</div>
      </div>
    );
  }

  if (!session) {
    return <Auth />;
  }

  const renderActiveTab = () => {
    switch (activeTab) {
      case "pulse":
        return <PulseTab />;
      case "guardian":
        return <GuardianTab />;
      case "rhythm":
        return <RhythmTab />;
      case "mindRewire":
        return <MindRewireTab />;
      case "dreamscape":
        return <DreamscapeTab />;
      default:
        return <PulseTab />;
    }
  };

  return (
    <div className="min-h-screen">
      {renderActiveTab()}
      <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
};

export default Index;
