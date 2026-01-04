import { MessageCircleIcon, ShieldCheckIcon, ZapIcon } from "lucide-react";
import { motion } from "framer-motion";

const NoConversationPlaceholder = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-8 relative overflow-hidden">
      
      {/* BACKGROUND RADIANCE */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none" />

      {/* FLOATING ICON SECTION */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ 
          duration: 0.8,
          repeat: Infinity,
          repeatType: "reverse",
          repeatDelay: 0.5 
        }}
        className="relative mb-8"
      >
        {/* Outer Glow Ring */}
        <div className="absolute inset-0 bg-cyan-500/20 rounded-full blur-2xl animate-pulse" />
        
        <div className="relative size-24 bg-zinc-900 border border-zinc-800 rounded-3xl flex items-center justify-center shadow-2xl shadow-cyan-500/10 rotate-3 group-hover:rotate-0 transition-transform">
          <MessageCircleIcon className="size-12 text-cyan-400" strokeWidth={1.5} />
        </div>
      </motion.div>

      {/* TEXT CONTENT */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="relative z-10"
      >
        <h3 className="text-2xl font-bold text-zinc-100 mb-3 tracking-tight">
          Select a conversation
        </h3>
        <p className="text-zinc-500 max-w-sm mx-auto text-sm leading-relaxed mb-8">
          Your messages are protected by <span className="text-cyan-500/80">End-to-End Encryption</span>. Pick a contact to start your secure chat.
        </p>

        {/* FEATURE: Mini Status Indicators */}
        <div className="flex items-center justify-center gap-6 py-4 border-t border-zinc-900/50">
          <div className="flex items-center gap-2">
            <ShieldCheckIcon className="size-4 text-cyan-500/50" />
            <span className="text-[10px] text-zinc-600 uppercase font-bold tracking-widest">Secure</span>
          </div>
          <div className="flex items-center gap-2">
            <ZapIcon className="size-4 text-cyan-500/50" />
            <span className="text-[10px] text-zinc-600 uppercase font-bold tracking-widest">Fast</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default NoConversationPlaceholder;