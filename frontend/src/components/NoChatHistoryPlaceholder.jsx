import { MessageCircleIcon, SparklesIcon } from "lucide-react";
import { useChatStore } from "../store/useChatStore";
import { motion } from "framer-motion";

const NoChatHistoryPlaceholder = ({ name }) => {
  const { sendMessage } = useChatStore();

  // FEATURE: Quick Send Logic
  const handleQuickSend = (text) => {
    sendMessage({ text });
  };

  const quickMessages = [
    { label: "👋 Say Hello", text: "Hey there! 👋" },
    { label: "🤝 How are you?", text: "How have you been?" },
    { label: "📅 Meet up soon?", text: "We should catch up soon!" },
  ];

  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-6 bg-black relative">
      {/* GLOWING BACKGROUND ORB */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-cyan-500/5 rounded-full blur-[80px] pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative z-10"
      >
        {/* ICON CONTAINER */}
        <div className="w-20 h-20 bg-zinc-900 border border-zinc-800 rounded-3xl flex items-center justify-center mb-6 mx-auto shadow-2xl shadow-cyan-500/5">
          <MessageCircleIcon className="size-10 text-cyan-400" strokeWidth={1.5} />
        </div>

        {/* HEADER */}
        <h3 className="text-xl font-bold text-zinc-100 mb-2 tracking-tight">
          Start chatting with <span className="text-cyan-400">{name}</span>
        </h3>
        
        <div className="flex flex-col items-center space-y-4 max-w-sm mx-auto mb-8">
          <p className="text-zinc-500 text-sm leading-relaxed">
            This is the very beginning of your encrypted history. Send a prompt below to break the ice.
          </p>
          <div className="flex items-center gap-3 w-full">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-zinc-800"></div>
            <SparklesIcon size={14} className="text-zinc-700" />
            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-zinc-800"></div>
          </div>
        </div>

        {/* QUICK ACTION BUTTONS */}
        <div className="flex flex-wrap gap-3 justify-center">
          {quickMessages.map((msg) => (
            <button
              key={msg.label}
              onClick={() => handleQuickSend(msg.text)}
              className="px-5 py-2.5 text-xs font-bold text-zinc-300 bg-zinc-900 border border-zinc-800 rounded-xl hover:bg-cyan-500/10 hover:border-cyan-500/30 hover:text-cyan-400 transition-all active:scale-95 shadow-lg"
            >
              {msg.label}
            </button>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default NoChatHistoryPlaceholder;