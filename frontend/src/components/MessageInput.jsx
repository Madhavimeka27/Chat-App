import { useRef, useState } from "react";
import useKeyboardSound from "../hooks/useKeyboardSound";
import { useChatStore } from "../store/useChatStore";
import toast from "react-hot-toast";
import { ImageIcon, SendIcon, XIcon, SmileIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

function MessageInput() {
  const { playRandomKeyStrokeSound } = useKeyboardSound();
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);

  const fileInputRef = useRef(null);
  const { sendMessage, isSoundEnabled, selectedUser } = useChatStore();

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!text.trim() && !imagePreview) return;

    try {
      // Play sound on send if enabled
      if (isSoundEnabled) playRandomKeyStrokeSound();

      await sendMessage({
        text: text.trim(),
        image: imagePreview,
      });

      // Clear state after successful send
      setText("");
      setImagePreview(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (error) {
      toast.error("Failed to send message");
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result);
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="p-4 bg-black border-t border-zinc-800/50 w-full">
      {/* IMAGE PREVIEW ANIMATION */}
      <AnimatePresence>
        {imagePreview && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="max-w-3xl mx-auto mb-4 flex items-center"
          >
            <div className="relative group">
              <img
                src={imagePreview}
                alt="Preview"
                className="w-24 h-24 object-cover rounded-xl border-2 border-cyan-500/50 shadow-lg shadow-cyan-500/10"
              />
              <button
                onClick={removeImage}
                className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-red-500 hover:bg-zinc-800 transition-colors"
                type="button"
              >
                <XIcon className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <form onSubmit={handleSendMessage} className="max-w-4xl mx-auto flex items-end gap-2">
        <div className="flex-1 flex items-center gap-2 bg-zinc-900 border border-zinc-800 rounded-2xl px-3 py-2 focus-within:border-cyan-500/50 transition-all">
          
          {/* IMAGE PICKER BUTTON */}
          <button
            type="button"
            className={`p-2 rounded-lg transition-colors ${
              imagePreview ? "text-cyan-400 bg-cyan-400/10" : "text-zinc-500 hover:text-cyan-400"
            }`}
            onClick={() => fileInputRef.current?.click()}
          >
            <ImageIcon className="w-5 h-5" />
          </button>

          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleImageChange}
            className="hidden"
          />

          {/* TEXT INPUT */}
          <input
            type="text"
            value={text}
            onChange={(e) => {
              setText(e.target.value);
              if (isSoundEnabled) playRandomKeyStrokeSound();
            }}
            className="flex-1 bg-transparent border-none text-zinc-100 placeholder:text-zinc-600 focus:ring-0 py-2 text-sm"
            placeholder={`Message ${selectedUser?.fullName || "..."}`}
          />

          {/* DECORATIVE EMOJI ICON (FRONTEND ONLY) */}
          <button type="button" className="p-2 text-zinc-500 hover:text-cyan-400 transition-colors">
            <SmileIcon className="w-5 h-5" />
          </button>
        </div>

        {/* SEND BUTTON - OLED STYLED */}
        <button
          type="submit"
          disabled={!text.trim() && !imagePreview}
          className={`
            p-3.5 rounded-2xl transition-all duration-300 flex items-center justify-center
            ${(text.trim() || imagePreview) 
              ? "bg-cyan-500 text-black hover:bg-cyan-400 shadow-lg shadow-cyan-500/20 active:scale-95" 
              : "bg-zinc-900 text-zinc-700 cursor-not-allowed border border-zinc-800"
            }
          `}
        >
          <SendIcon className={`w-5 h-5 ${text.trim() || imagePreview ? "fill-current" : ""}`} />
        </button>
      </form>
    </div>
  );
}

export default MessageInput;