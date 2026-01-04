import { motion } from "framer-motion";

function UsersLoadingSkeleton() {
  // Create 6 items to fill the sidebar height better
  const skeletonItems = Array.from({ length: 6 });

  return (
    <div className="space-y-3 px-1">
      {skeletonItems.map((_, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: idx * 0.1 }}
          className="p-3 rounded-2xl border border-zinc-800/50 bg-zinc-900/20"
        >
          <div className="flex items-center gap-3">
            {/* AVATAR SKELETON */}
            <div className="relative">
              <div className="size-12 rounded-full bg-zinc-800 animate-pulse" />
              {/* Fake Online Dot Skeleton */}
              <div className="absolute bottom-0 right-0 size-3 bg-zinc-900 border-2 border-black rounded-full" />
            </div>

            {/* TEXT SKELETONS */}
            <div className="flex-1 space-y-2">
              {/* Name line */}
              <div className="h-4 bg-zinc-800 rounded-md w-2/3 animate-pulse" />
              {/* Status line */}
              <div className="h-3 bg-zinc-800/50 rounded-md w-1/3 animate-pulse" />
            </div>
          </div>
        </motion.div>
      ))}

      {/* FEATURE: Subtle "Loading..." indicator at bottom */}
      <div className="pt-4 flex justify-center">
        <span className="text-[10px] text-zinc-700 uppercase tracking-[0.2em] animate-pulse">
          Syncing Contacts...
        </span>
      </div>
    </div>
  );
}

export default UsersLoadingSkeleton;