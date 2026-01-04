import { LoaderIcon, ShieldCheckIcon } from "lucide-react";

function PageLoader() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-black relative overflow-hidden">
      
      {/* FEATURE 1: Background Glow (OLED Depth) */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-cyan-500/10 via-transparent to-transparent pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center">
        
        {/* FEATURE 2: Outer Ring Decoration */}
        <div className="relative flex items-center justify-center mb-6">
           {/* Static ring to give the spinning icon a "track" */}
          <div className="absolute size-16 rounded-full border-2 border-zinc-900" />
          
          {/* YOUR LOGIC: LoaderIcon with animate-spin */}
          <LoaderIcon className="size-10 text-cyan-500 animate-spin relative z-10" />
        </div>

        {/* FEATURE 3: Branding & Status Subtext */}
        <div className="text-center space-y-2">
          <h2 className="text-zinc-100 font-bold tracking-[0.7em] uppercase text-xs">
            Loading Interface
          </h2>
          
          <div className="flex items-center justify-center gap-2 opacity-50">
            <ShieldCheckIcon className="size-3 text-cyan-400" />
            <span className="text-zinc-500 text-[9px] font-bold uppercase tracking-widest">
              End-to-End Secure
            </span>
          </div>
        </div>

        {/* FEATURE 4: Minimalist Progress Track */}
        <div className="mt-8 w-32 h-[1px] bg-zinc-900 relative overflow-hidden">
          <div className="absolute inset-0 w-1/2 bg-cyan-500/50 animate-[shimmer_1.5s_infinite] translate-x-[-100%]" 
               style={{ animation: 'shimmer 1.5s infinite linear' }}
          />
        </div>
      </div>
      
      {/* Custom Shimmer Animation for the progress track */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes shimmer {
          100% { transform: translateX(200%); }
        }
      `}} />
    </div>
  );
}

export default PageLoader;