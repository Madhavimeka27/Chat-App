import { useEffect, useRef } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";
import NoChatHistoryPlaceholder from "./NoChatHistoryPlaceholder";
import MessageInput from "./MessageInput";
import MessagesLoadingSkeleton from "./MessagesLoadingSkeleton";
import ChatHeader from "./ChatHeader";
import { motion } from "framer-motion"; // Added for smooth message entry

function ChatContainer() {
  const {
    selectedUser,
    getMessagesByUserId,
    messages,
    isMessagesLoading,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = useChatStore();

  const { authUser } = useAuthStore();
  const messageEndRef = useRef(null);

  useEffect(() => {
    if (!selectedUser?._id) return;

    getMessagesByUserId(selectedUser._id);
    subscribeToMessages();

    return () => unsubscribeFromMessages();
  }, [selectedUser?._id, getMessagesByUserId, subscribeToMessages, unsubscribeFromMessages]);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (!selectedUser) {
    return <NoChatHistoryPlaceholder />;
  }

  return (
    <div className="flex-1 flex flex-col h-full bg-black relative">
      {/* FEATURE: Subtle background gradient for depth */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-cyan-500/5 via-transparent to-transparent pointer-events-none" />

      <ChatHeader />

      <div className="flex-1 px-4 md:px-6 overflow-y-auto py-4 scrollbar-hide relative z-10">
        {messages.length > 0 && !isMessagesLoading ? (
          <div className="max-w-4xl mx-auto space-y-4">
            {messages.map((msg, idx) => {
              const isMine = msg.senderId === authUser?._id;
              
              return (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.2, delay: Math.min(idx * 0.05, 0.3) }}
                  key={msg._id}
                  className={`flex ${isMine ? "justify-end" : "justify-start"}`}
                >
                  <div className={`max-w-[75%] md:max-w-[60%] flex flex-col ${isMine ? "items-end" : "items-start"}`}>
                    
                    {/* MESSAGE BUBBLE */}
                    <div
                      className={`relative px-4 py-2.5 rounded-2xl shadow-sm ${
                        isMine
                          ? "bg-cyan-600 text-white rounded-tr-none"
                          : "bg-zinc-900 text-zinc-200 border border-zinc-800 rounded-tl-none"
                      }`}
                    >
                      {msg.image && (
                        <img
                          src={msg.image}
                          alt="Shared"
                          className="rounded-lg max-h-64 w-full object-cover mb-2 cursor-pointer hover:opacity-90 transition-opacity"
                        />
                      )}

                      {msg.text && <p className="text-[15px] leading-relaxed break-words">{msg.text}</p>}

                      {/* TIMESTAMP */}
                      <div className={`flex items-center gap-1 mt-1 opacity-60 text-[10px] uppercase tracking-tighter ${isMine ? "justify-end" : "justify-start"}`}>
                        {new Date(msg.createdAt).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                        {isMine && <span className="text-cyan-200">✓✓</span>}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
            <div ref={messageEndRef} />
          </div>
        ) : isMessagesLoading ? (
          <MessagesLoadingSkeleton />
        ) : (
          <NoChatHistoryPlaceholder name={selectedUser.fullName} />
        )}
      </div>

      <MessageInput />
    </div>
  );
}

export default ChatContainer;