import { motion } from "framer-motion";

function MessagesLoadingSkeleton() {
  // We create 6 bubbles with varying widths to look like a real conversation
  const skeletonMessages = [
    { align: "start", width: "w-48" },
    { align: "end", width: "w-32" },
    { align: "start", width: "w-56" },
    { align: "start", width: "w-24" },
    { align: "end", width: "w-40" },
    { align: "start", width: "w-36" },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6 px-4">
      {skeletonMessages.map((msg, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: idx * 0.1 }}
          className={`flex ${msg.align === "end" ? "justify-end" : "justify-start"}`}
        >
          <div className={`flex flex-col ${msg.align === "end" ? "items-end" : "items-start"}`}>
            {/* MESSAGE BUBBLE SKELETON */}
            <div
              className={`
                h-12 ${msg.width} animate-pulse rounded-2xl relative
                ${msg.align === "end" 
                  ? "bg-cyan-500/10 border border-cyan-500/10 rounded-tr-none" 
                  : "bg-zinc-900 border border-zinc-800 rounded-tl-none"
                }
              `}
            >
              {/* SHIMMER EFFECT OVERLAY */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
            </div>

            {/* TIMESTAMP SKELETON */}
            <div className={`mt-2 h-2 w-10 bg-zinc-800 rounded animate-pulse opacity-50`} />
          </div>
        </motion.div>
      ))}
    </div>
  );
}

export default MessagesLoadingSkeleton;