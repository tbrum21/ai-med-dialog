import { useState } from "react";
import { Sidebar } from "@/components/medical/Sidebar";
import { ChatTab } from "@/components/medical/ChatTab";
import { ForumTab } from "@/components/medical/ForumTab";
import { TeamTab } from "@/components/medical/TeamTab";
import { CasesTab } from "@/components/medical/CasesTab";
import { HistoryTab } from "@/components/medical/HistoryTab";

export type TabType = "chat" | "team" | "cases" | "history";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState<TabType>("chat");

  const renderActiveTab = () => {
    switch (activeTab) {
      case "chat":
        return <ChatTab />;
      case "team":
        return <ForumTab />;
      case "cases":
        return <CasesTab />;
      case "history":
        return <HistoryTab />;
      default:
        return <ChatTab />;
    }
  };

  return (
    <div className="flex h-screen bg-background">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
      <main className="flex-1 overflow-hidden">
        {renderActiveTab()}
      </main>
    </div>
  );
};

export default Dashboard;