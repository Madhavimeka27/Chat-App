import { XIcon, Trash2Icon } from "lucide-react";
import { useChatStore } from "../store/useChatStore";
import { useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore";

function ChatHeader() {
  const { selectedUser, setSelectedUser, clearMessages } = useChatStore();
  const { onlineUsers } = useAuthStore();

  // ✅ prevent crash
  if (!selectedUser) return null;

  const isOnline = onlineUsers?.includes(selectedUser._id);

  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === "Escape") setSelectedUser(null);
    };

    window.addEventListener("keydown", handleEscKey);
    return () => window.removeEventListener("keydown", handleEscKey);
  }, [setSelectedUser]);

  const handleClearChat = () => {
    if (window.confirm(`Clear all messages with ${selectedUser.fullName}? This cannot be undone.`)) {
      clearMessages();
    }
  };

  return (
    <div className="flex justify-between items-center bg-black border-b border-zinc-800 h-[72px] px-6 relative z-20">
      <div className="flex items-center space-x-4">
        {/* AVATAR WITH OLED BORDER */}
        <div className="relative">
          <div className={`size-11 rounded-full overflow-hidden border-2 transition-colors ${
            isOnline ? "border-cyan-500/50" : "border-zinc-800"
          }`}>
            <img
              src={selectedUser.profilePic || "/avatar.png"}
              alt={selectedUser.fullName}
              className="object-cover size-full"
            />
          </div>
          {isOnline && (
            <span className="absolute bottom-0 right-0 size-3 bg-green-500 border-2 border-black rounded-full shadow-[0_0_8px_rgba(34,197,94,0.4)]" />
          )}
        </div>

        {/* USER INFO */}
        <div>
          <h3 className="text-zinc-100 font-bold tracking-tight text-sm">
            {selectedUser.fullName}
          </h3>
          <div className="flex items-center gap-1.5">
            {isOnline && <span className="size-1.5 bg-green-500 rounded-full animate-pulse" />}
            <p className="text-zinc-500 text-[10px] uppercase font-bold tracking-widest">
              {isOnline ? "Available Now" : "Currently Offline"}
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* CLEAR CHAT BUTTON */}
        <button 
          onClick={handleClearChat}
          title="Clear Conversation"
          className="p-2 text-zinc-500 hover:text-red-400 hover:bg-red-400/5 rounded-xl transition-all active:scale-90"
        >
          <Trash2Icon className="size-5" />
        </button>

        <div className="w-[1px] h-6 bg-zinc-800 mx-1" />

        {/* CLOSE CHAT BUTTON */}
        <button 
          onClick={() => setSelectedUser(null)}
          className="p-2 text-zinc-500 hover:text-cyan-400 hover:bg-cyan-400/5 rounded-xl transition-all active:scale-90"
        >
          <XIcon className="size-5" />
        </button>
      </div>
    </div>
  );
}

export default ChatHeader;