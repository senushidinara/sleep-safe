import { useState } from "react";
import TabNavigation, { TabType } from "@/components/TabNavigation";
import PulseTab from "@/components/tabs/PulseTab";
import GuardianTab from "@/components/tabs/GuardianTab";
import RhythmTab from "@/components/tabs/RhythmTab";
import MindRewireTab from "@/components/tabs/MindRewireTab";
import DreamscapeTab from "@/components/tabs/DreamscapeTab";

const Index = () => {
  const [activeTab, setActiveTab] = useState<TabType>("pulse");

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
