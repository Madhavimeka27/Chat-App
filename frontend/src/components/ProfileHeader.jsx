import { useState, useRef } from "react";
import { LogOutIcon, VolumeOffIcon, Volume2Icon, CameraIcon } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";
import { motion } from "framer-motion";

// Use a cleaner way to handle audio to avoid reload issues
const playClick = () => {
  const audio = new Audio("/sounds/mouse-click.mp3");
  audio.volume = 0.4;
  audio.play().catch(() => {});
};

function ProfileHeader() {
  const { logout, authUser, updateProfile } = useAuthStore();
  const { isSoundEnabled, toggleSound } = useChatStore();
  const [isUpdating, setIsUpdating] = useState(false);
  const [selectedImg, setSelectedImg] = useState(null);

  const fileInputRef = useRef(null);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);
      setIsUpdating(true);
      try {
        await updateProfile({ profilePic: base64Image });
      } finally {
        setIsUpdating(false);
      }
    };
  };

  return (
    <div className="p-4 border-b border-zinc-800 bg-black/50 backdrop-blur-md">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          
          {/* AVATAR WITH OLED GLOW */}
          <div className="relative group">
            <button
              className={`size-12 rounded-full overflow-hidden relative border-2 transition-all duration-300 ${
                isUpdating ? "border-cyan-500 animate-pulse" : "border-zinc-800 group-hover:border-cyan-500/50"
              }`}
              onClick={() => fileInputRef.current.click()}
              disabled={isUpdating}
            >
              <img
                src={selectedImg || authUser.profilePic || "/avatar.png"}
                alt="Profile"
                className="size-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              
              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center transition-all duration-300">
                <CameraIcon className="size-4 text-cyan-400" />
                <span className="text-[8px] text-white font-bold uppercase tracking-tighter">Edit</span>
              </div>
            </button>

            {/* Online Badge */}
            <span className="absolute bottom-0 right-0 size-3 bg-green-500 border-2 border-black rounded-full shadow-[0_0_10px_rgba(34,197,94,0.4)]" />

            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleImageUpload}
              className="hidden"
            />
          </div>

          {/* USER INFO */}
          <div className="flex flex-col">
            <h3 className="text-zinc-100 font-semibold text-sm tracking-tight truncate max-w-[140px]">
              {authUser.fullName}
            </h3>
            <div className="flex items-center gap-1.5">
              <span className="size-1.5 bg-green-500 rounded-full animate-pulse" />
              <p className="text-zinc-500 text-[10px] uppercase font-bold tracking-widest">Active Now</p>
            </div>
          </div>
        </div>

        {/* ACTION BUTTONS */}
        <div className="flex gap-2 items-center">
          
          {/* SOUND TOGGLE */}
          <button
            title={isSoundEnabled ? "Disable Sounds" : "Enable Sounds"}
            className={`p-2 rounded-xl transition-all duration-200 active:scale-90 ${
              isSoundEnabled ? "text-cyan-400 bg-cyan-400/5 border border-cyan-400/10" : "text-zinc-500 hover:text-zinc-300 bg-zinc-900/50"
            }`}
            onClick={() => {
              if (isSoundEnabled) playClick();
              toggleSound();
            }}
          >
            {isSoundEnabled ? <Volume2Icon size={18} /> : <VolumeOffIcon size={18} />}
          </button>

          {/* LOGOUT */}
          <button
            title="Logout"
            className="p-2 text-zinc-500 hover:text-red-400 hover:bg-red-400/5 rounded-xl transition-all duration-200 active:scale-90 border border-transparent hover:border-red-400/10"
            onClick={logout}
          >
            <LogOutIcon size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProfileHeader;