import { MessageCircleIcon, SearchXIcon, UsersIcon } from "lucide-react";
import { useChatStore } from "../store/useChatStore";

function NoChatsFound({ isSearch = false }) {
  const { setActiveTab } = useChatStore();

  return (
    <div className="flex flex-col items-center justify-center py-12 text-center animate-in fade-in zoom-in duration-300">
      {/* ICON SECTION */}
      <div className="relative mb-6">
        <div className="absolute inset-0 bg-cyan-500/10 rounded-full blur-xl animate-pulse" />
        <div className="relative size-16 bg-zinc-900 border border-zinc-800 rounded-2xl flex items-center justify-center">
          {isSearch ? (
            <SearchXIcon className="size-8 text-zinc-500" />
          ) : (
            <MessageCircleIcon className="size-8 text-cyan-400" />
          )}
        </div>
      </div>

      {/* TEXT SECTION */}
      <div className="space-y-2 mb-6 px-8">
        <h4 className="text-zinc-200 font-semibold tracking-tight">
          {isSearch ? "No results found" : "No conversations yet"}
        </h4>
        <p className="text-zinc-500 text-xs leading-relaxed max-w-[200px] mx-auto">
          {isSearch 
            ? "We couldn't find any chats matching your current search." 
            : "Connect with your friends by starting a new conversation."}
        </p>
      </div>

      {/* ACTION BUTTON */}
      {!isSearch ? (
        <button
          onClick={() => setActiveTab("contacts")}
          className="flex items-center gap-2 px-5 py-2.5 text-xs font-bold uppercase tracking-widest text-black bg-cyan-500 rounded-xl hover:bg-cyan-400 transition-all active:scale-95 shadow-lg shadow-cyan-500/10"
        >
          <UsersIcon size={14} />
          Find contacts
        </button>
      ) : (
        <p className="text-[10px] text-zinc-600 uppercase tracking-widest font-bold">
          Try a different name
        </p>
      )}
    </div>
  );
}

export default NoChatsFound;