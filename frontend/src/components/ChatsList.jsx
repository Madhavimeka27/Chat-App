import { useEffect, useMemo } from "react";
import { useChatStore } from "../store/useChatStore";
import UsersLoadingSkeleton from "./UsersLoadingSkeleton";
import NoChatsFound from "./NoChatsFound";
import { useAuthStore } from "../store/useAuthStore";
import { motion } from "framer-motion";

function ChatsList({ searchQuery = "" }) {
  const { getMyChatPartners, chats, isUsersLoading, setSelectedUser, selectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();

  useEffect(() => {
    getMyChatPartners();
  }, [getMyChatPartners]);

  // FEATURE: Real-time Frontend Filtering
  // useMemo prevents unnecessary re-calculations unless chats or searchQuery change
  const filteredChats = useMemo(() => {
    return chats.filter((chat) =>
      chat.fullName.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [chats, searchQuery]);

  if (isUsersLoading) return <UsersLoadingSkeleton />;
  
  // If search yields no results, or list is empty
  if (filteredChats.length === 0) return <NoChatsFound isSearch={!!searchQuery} />;

  return (
    <div className="space-y-1">
      {filteredChats.map((chat) => {
        const isSelected = selectedUser?._id === chat._id;
        const isOnline = onlineUsers.includes(chat._id);

        return (
          <motion.div
            layout // Smoothly animates position when filtering
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            key={chat._id}
            onClick={() => setSelectedUser(chat)}
            className={`
              group relative flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all duration-200
              ${isSelected 
                ? "bg-cyan-500/10 border border-cyan-500/20 shadow-[0_0_20px_rgba(6,182,212,0.05)]" 
                : "bg-transparent border border-transparent hover:bg-zinc-900/50 hover:border-zinc-800"
              }
            `}
          >
            {/* AVATAR SECTION */}
            <div className="relative">
              <div className={`size-12 rounded-full overflow-hidden border-2 transition-all duration-300 ${
                isSelected ? 'border-cyan-500' : 'border-zinc-800 group-hover:border-zinc-700'
              }`}>
                <img 
                  src={chat.profilePic || "/avatar.png"} 
                  alt={chat.fullName} 
                  className="w-full h-full object-cover grayscale-[0.3] group-hover:grayscale-0 transition-all"
                />
              </div>
              
              {/* GLOWING ONLINE STATUS */}
              {isOnline && (
                <span className="absolute bottom-0 right-0 size-3.5 bg-green-500 border-2 border-black rounded-full shadow-[0_0_8px_rgba(34,197,94,0.5)]" />
              )}
            </div>

            {/* INFO SECTION */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-0.5">
                <h4 className={`font-semibold truncate transition-colors ${
                  isSelected ? 'text-cyan-400' : 'text-zinc-200 group-hover:text-white'
                }`}>
                  {chat.fullName}
                </h4>
                {isSelected && (
                  <motion.div 
                    layoutId="activeIndicator"
                    className="size-1.5 bg-cyan-400 rounded-full shadow-[0_0_8px_rgba(34,211,238,0.8)]" 
                  />
                )}
              </div>
              <p className="text-xs text-zinc-500 truncate font-medium">
                {isOnline ? (
                  <span className="text-green-500/80">Online</span>
                ) : (
                  "Last seen recently"
                )}
              </p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

export default ChatsList;