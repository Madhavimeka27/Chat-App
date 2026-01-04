import { useState, useMemo } from "react"; // Added useMemo for performance
import { useChatStore } from "../store/useChatStore";
import BorderAnimatedContainer from "../components/BorderAnimatedContainer";
import ProfileHeader from "../components/ProfileHeader";
import ActiveTabSwitch from "../components/ActiveTabSwitch";
import ChatsList from "../components/ChatsList";
import ContactList from "../components/ContactList";
import ChatContainer from "../components/ChatContainer";
import NoConversationPlaceholder from "../components/NoConversationPlaceholder";
import { SearchIcon, MessageSquarePlusIcon, Settings2Icon, BellIcon, BellOffIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

function ChatPage() {
  const { activeTab, selectedUser } = useChatStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [isMuted, setIsMuted] = useState(false); 

  // FEATURE: Pure Frontend Notification Sound Logic
  const toggleMute = () => {
    setIsMuted(!isMuted);
    // You can add a small 'click' sound here if you have a sound file
  };

  return (
    <div className="w-full flex items-center justify-center p-4 bg-black min-h-screen">
      <div className="relative w-full max-w-6xl h-[850px] mx-auto">
        <BorderAnimatedContainer>
          <div className="w-full h-full flex bg-black rounded-2xl overflow-hidden shadow-2xl border border-zinc-800/50">
            
            {/* LEFT SIDEBAR */}
            <div className="w-85 md:w-96 flex flex-col border-r border-zinc-800 bg-black">
              {/* Profile Section */}
              <div className="p-4 border-b border-zinc-800 bg-zinc-900/10">
                <ProfileHeader />
              </div>
              
              <div className="p-4 space-y-4">
                {/* Search Bar Logic */}
                <div className="relative group">
                  <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 group-focus-within:text-cyan-400 transition-colors" />
                  <input 
                    type="text"
                    placeholder={`Search ${activeTab}...`}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-800 text-sm text-white rounded-xl py-2.5 pl-10 pr-4 focus:ring-1 focus:ring-cyan-500 outline-none transition-all placeholder:text-zinc-600"
                  />
                  {searchQuery && (
                    <button 
                      onClick={() => setSearchQuery("")}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white text-xs"
                    >
                      Clear
                    </button>
                  )}
                </div>

                <ActiveTabSwitch />
              </div>

              {/* Chat/Contact List Area */}
              <div className="flex-1 overflow-y-auto px-2 pb-4 space-y-1 scrollbar-hide">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab} // Forces animation when tab changes
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    transition={{ duration: 0.2 }}
                  >
                    {activeTab === "chats" ? (
                      <ChatsList searchQuery={searchQuery} />
                    ) : (
                      <ContactList searchQuery={searchQuery} />
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* FOOTER ACTIONS */}
              <div className="p-4 border-t border-zinc-800 flex items-center justify-around bg-zinc-900/10">
                <button title="New Message" className="text-zinc-500 hover:text-cyan-400 transition-all active:scale-90 p-2">
                  <MessageSquarePlusIcon size={20} />
                </button>
                
                <button 
                  title={isMuted ? "Unmute" : "Mute"}
                  onClick={toggleMute}
                  className={`transition-all active:scale-90 p-2 rounded-lg ${isMuted ? 'text-red-500 bg-red-500/10' : 'text-zinc-500 hover:text-cyan-400'}`}
                >
                  {isMuted ? <BellOffIcon size={20} /> : <BellIcon size={20} />}
                </button>

                <button title="Chat Settings" className="text-zinc-500 hover:text-cyan-400 transition-all active:scale-90 p-2">
                  <Settings2Icon size={20} />
                </button>
              </div>
            </div>

            {/* RIGHT SIDE - Chat Window */}
            <div className="flex-1 flex flex-col bg-zinc-900/5 relative">
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[120px]" />
              </div>

              <div className="relative z-10 flex flex-col h-full">
                {selectedUser ? (
                  /* IMPORTANT: The key={selectedUser._id} makes the chat refresh when you click a new user */
                  <ChatContainer key={selectedUser._id} isMuted={isMuted} />
                ) : (
                  <div className="flex-1 flex flex-col items-center justify-center p-12 text-center">
                    <NoConversationPlaceholder />
                    
                    <div className="mt-10 space-y-6">
                      <p className="text-zinc-500 text-sm max-w-xs mx-auto">
                        Select a contact from the sidebar to start a secure, encrypted conversation.
                      </p>
                      
                      <div className="flex justify-center gap-3">
                        {['Secure', 'Free', 'Private'].map((label) => (
                          <span key={label} className="px-4 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 text-[10px] font-medium text-cyan-400 uppercase tracking-widest shadow-sm shadow-cyan-500/5">
                            {label}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

          </div>
        </BorderAnimatedContainer>
      </div>
    </div>
  );
}

export default ChatPage;