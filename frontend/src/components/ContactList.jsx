import { useEffect, useMemo, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import UsersLoadingSkeleton from "./UsersLoadingSkeleton";
import { useAuthStore } from "../store/useAuthStore";
import { motion, AnimatePresence } from "framer-motion";

function ContactList({ searchQuery = "" }) {
  const { getAllContacts, allContacts, setSelectedUser, selectedUser, isUsersLoading } = useChatStore();
  const { onlineUsers } = useAuthStore();
  
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);

  useEffect(() => {
    getAllContacts();
  }, [getAllContacts]);

  // ✅ DEBUG LOG: Check this in your browser console (F12)
  useEffect(() => {
    console.log("Current Online IDs from Server:", onlineUsers);
  }, [onlineUsers]);

  // FEATURE: Real-time Search + Online Status Filtering
  const filteredContacts = useMemo(() => {
    return allContacts.filter((contact) => {
      const matchesSearch = contact.fullName.toLowerCase().includes(searchQuery.toLowerCase());
      const isOnline = onlineUsers.includes(contact._id);
      
      if (showOnlineOnly) {
        return matchesSearch && isOnline;
      }
      return matchesSearch;
    });
  }, [allContacts, searchQuery, onlineUsers, showOnlineOnly]);

  if (isUsersLoading) return <UsersLoadingSkeleton />;

  return (
    <div className="flex flex-col h-full bg-black">
      {/* HEADER & FILTER */}
      <div className="px-4 py-3 flex items-center justify-between border-b border-zinc-800/50 mb-2">
        <div className="flex flex-col">
          <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">Contacts</span>
          <span className="text-xs text-zinc-400 font-medium">{filteredContacts.length} users</span>
        </div>
        
        <button 
          onClick={() => setShowOnlineOnly(!showOnlineOnly)}
          className={`text-[10px] uppercase font-bold px-3 py-1.5 rounded-full transition-all border ${
            showOnlineOnly 
              ? "bg-green-500/10 text-green-500 border-green-500/50 shadow-[0_0_10px_rgba(34,197,94,0.2)]" 
              : "bg-zinc-900 text-zinc-500 border-zinc-800 hover:border-zinc-700"
          }`}
        >
          {showOnlineOnly ? "Online Only" : "Show All"}
        </button>
      </div>

      {/* LIST SECTION */}
      <div className="flex-1 space-y-1 overflow-y-auto custom-scrollbar px-2">
        <AnimatePresence mode="popLayout">
          {filteredContacts.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <div className="size-12 bg-zinc-900 rounded-2xl flex items-center justify-center mx-auto mb-4 opacity-20">
                 <div className="size-6 border-2 border-zinc-400 rounded-full" />
              </div>
              <p className="text-zinc-500 text-sm italic">
                {searchQuery ? `No results for "${searchQuery}"` : "No contacts found"}
              </p>
            </motion.div>
          ) : (
            filteredContacts.map((contact) => {
              const isSelected = selectedUser?._id === contact._id;
              const isOnline = onlineUsers.includes(contact._id);

              return (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  key={contact._id}
                  onClick={() => setSelectedUser(contact)}
                  className={`
                    group flex items-center gap-3 p-3 rounded-2xl cursor-pointer transition-all duration-300
                    ${isSelected 
                      ? "bg-zinc-900/80 border border-zinc-800 shadow-xl" 
                      : "bg-transparent border border-transparent hover:bg-zinc-900/40"
                    }
                  `}
                >
                  {/* AVATAR WRAPPER */}
                  <div className="relative">
                    <div className={`size-12 rounded-full overflow-hidden border-2 transition-all duration-500 ${
                      isSelected ? 'border-cyan-500 shadow-[0_0_20px_rgba(6,182,212,0.2)]' : 'border-zinc-800'
                    }`}>
                      <img 
                        src={contact.profilePic || "/avatar.png"} 
                        alt={contact.fullName} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    {/* STATUS DOT */}
                    {isOnline && (
                      <span className="absolute bottom-0 right-0 size-3.5 bg-green-500 border-[3px] border-black rounded-full shadow-[0_0_12px_rgba(34,197,94,1)] animate-pulse" />
                    )}
                  </div>

                  {/* USER DATA */}
                  <div className="flex-1 min-w-0">
                    <h4 className={`text-[15px] font-semibold truncate transition-colors ${
                      isSelected ? 'text-white' : 'text-zinc-300'
                    }`}>
                      {contact.fullName}
                    </h4>
                    <div className="flex items-center gap-1.5">
                      <p className={`text-[10px] uppercase tracking-[0.1em] font-black ${
                        isOnline ? "text-green-500" : "text-zinc-600"
                      }`}>
                        {isOnline ? "Active Now" : "Currently Offline"}
                      </p>
                    </div>
                  </div>

                  {/* ACTIVE INDICATOR PILL */}
                  {isSelected && (
                    <motion.div 
                      layoutId="activeTab"
                      className="w-1 h-8 bg-cyan-500 rounded-full shadow-[0_0_10px_rgba(6,182,212,0.8)]"
                    />
                  )}
                </motion.div>
              );
            })
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default ContactList;