import { useChatStore } from "../store/useChatStore";
import { motion } from "framer-motion";
import { MessageSquareIcon, UsersIcon } from "lucide-react";

function ActiveTabSwitch() {
  const { activeTab, setActiveTab } = useChatStore();

  const tabs = [
    { id: "chats", label: "Chats", icon: MessageSquareIcon },
    { id: "contacts", label: "Contacts", icon: UsersIcon },
  ];

  return (
    <div className="relative flex p-1 bg-zinc-900/50 border border-zinc-800 rounded-xl overflow-hidden shadow-inner">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        const Icon = tab.icon;

        return (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`
              relative flex-1 flex items-center justify-center gap-2 py-2.5 text-xs font-bold uppercase tracking-widest transition-colors duration-300 z-10
              ${isActive ? "text-cyan-400" : "text-zinc-500 hover:text-zinc-300"}
            `}
          >
            <Icon size={14} className={isActive ? "animate-pulse" : ""} />
            {tab.label}

            {/* SLIDING PILL BACKGROUND */}
            {isActive && (
              <motion.div
                layoutId="activeTabPill"
                className="absolute inset-0 bg-cyan-500/10 border border-cyan-500/20 rounded-lg -z-10 shadow-[0_0_15px_rgba(6,182,212,0.1)]"
                transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
              />
            )}
          </button>
        );
      })}
    </div>
  );
}

export default ActiveTabSwitch;