import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MessageCircle, Users, FolderOpen, History } from "lucide-react";
import { TabType } from "@/pages/Dashboard";

interface SidebarProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

const menuItems = [
  {
    id: "chat" as TabType,
    label: "Chat",
    icon: MessageCircle,
  },
  {
    id: "team" as TabType,
    label: "Equipe",
    icon: Users,
  },
  {
    id: "cases" as TabType,
    label: "Casos",
    icon: FolderOpen,
  },
  {
    id: "history" as TabType,
    label: "Histórico",
    icon: History,
  },
];

export const Sidebar = ({ activeTab, onTabChange }: SidebarProps) => {
  return (
    <div className="w-64 bg-card border-r border-border flex flex-col">
      {/* User Profile */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center space-x-3">
          <Avatar>
            <AvatarImage src="/placeholder-avatar.jpg" />
            <AvatarFallback className="bg-primary text-white font-semibold">
              DR
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold text-foreground">Dr. João Silva</p>
            <p className="text-xs text-muted-foreground">Cardiologista</p>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 p-4">
        <div className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-[var(--radius)] text-left transition-all duration-200 ${
                  isActive
                    ? "bg-primary text-white shadow-soft"
                    : "text-foreground hover:bg-muted"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* Chat History (only visible when chat tab is active) */}
      {activeTab === "chat" && (
        <div className="p-4 border-t border-border">
          <h3 className="text-sm font-semibold text-foreground mb-3">
            Conversas Recentes
          </h3>
          <div className="space-y-2">
            {[
              "Caso: Dor torácica em homem de 45 anos",
              "Diagnóstico diferencial - dispneia",
              "Interpretação ECG complexa",
            ].map((chat, index) => (
              <button
                key={index}
                className="w-full text-left p-2 text-xs text-muted-foreground hover:text-foreground hover:bg-muted rounded transition-colors line-clamp-2"
              >
                {chat}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};