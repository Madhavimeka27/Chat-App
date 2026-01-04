import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import BorderAnimatedContainer from "../components/BorderAnimatedContainer";
import { MessageCircleIcon, MailIcon, LoaderIcon, LockIcon, EyeIcon, EyeOffIcon } from "lucide-react";
import { Link } from "react-router";

function LoginPage() {
  const [formData, setFormData] = useState({ email: "", password: "", remember: false });
  const [showPassword, setShowPassword] = useState(false); // State for eye toggle
  const { login, isLoggingIn } = useAuthStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(formData);
  };

  return (
    <div className="w-full flex items-center justify-center p-4 bg-black min-h-screen">
      <div className="relative w-full max-w-6xl md:h-[700px] h-auto">
        <BorderAnimatedContainer>
          <div className="w-full h-full flex flex-col md:flex-row bg-black rounded-2xl overflow-hidden">
            
            {/* LEFT SIDE: LOGIN FORM */}
            <div className="md:w-1/2 p-8 lg:p-16 flex items-center justify-center md:border-r border-zinc-800">
              <div className="w-full max-w-md">
                <div className="text-center mb-10">
                  <div className="bg-cyan-500/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 border border-cyan-500/20">
                    <MessageCircleIcon className="w-8 h-8 text-cyan-400" />
                  </div>
                  <h2 className="text-3xl font-bold text-white mb-2">Welcome Back</h2>
                  <p className="text-zinc-500">Login to your account</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="text-xs font-semibold text-zinc-400 uppercase mb-2 block tracking-wider">Email</label>
                    <div className="relative">
                      <MailIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-600" />
                      <input
                        type="email"
                        value={formData.email}
                        className="w-full bg-zinc-900 border border-zinc-800 text-white rounded-xl py-3 pl-11 pr-4 focus:ring-1 focus:ring-cyan-500 outline-none transition-all"
                        placeholder="johndoe@gmail.com"
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-zinc-400 uppercase mb-2 block tracking-wider">Password</label>
                    <div className="relative">
                      <LockIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-600" />
                      <input
                        type={showPassword ? "text" : "password"}
                        value={formData.password}
                        className="w-full bg-zinc-900 border border-zinc-800 text-white rounded-xl py-3 pl-11 pr-12 focus:ring-1 focus:ring-cyan-500 outline-none transition-all"
                        placeholder="••••••••"
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        required
                      />
                      {/* PASSWORD TOGGLE BUTTON */}
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-600 hover:text-cyan-400 transition-colors"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOffIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>

                  {/* REMEMBER ME & FORGOT PASSWORD */}
                  <div className="flex items-center justify-between">
                    <label className="flex items-center gap-2 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={formData.remember}
                        onChange={(e) => setFormData({ ...formData, remember: e.target.checked })}
                        className="w-4 h-4 rounded border-zinc-700 bg-zinc-900 text-cyan-500 focus:ring-cyan-500/20"
                      />
                      <span className="text-sm text-zinc-400 group-hover:text-zinc-200 transition-colors">Remember me</span>
                    </label>
                    <Link to="/forgot-password" size="sm" className="text-sm text-cyan-500/80 hover:text-cyan-400">
                      Forgot Password?
                    </Link>
                  </div>

                  <button 
                    className="w-full bg-white hover:bg-cyan-400 text-black font-bold py-3.5 rounded-xl transition-all duration-300 shadow-lg shadow-cyan-500/5" 
                    type="submit" 
                    disabled={isLoggingIn}
                  >
                    {isLoggingIn ? <LoaderIcon className="w-6 h-6 animate-spin mx-auto text-black" /> : "Sign In"}
                  </button>
                </form>

                <div className="mt-8 text-center">
                  <Link to="/signup" className="text-sm text-zinc-500 hover:text-white transition-colors">
                    Don't have an account? <span className="text-cyan-500 font-medium ml-1">Sign up</span>
                  </Link>
                </div>
              </div>
            </div>

            {/* RIGHT SIDE: IMAGE + BADGES */}
            <div className="hidden md:flex md:w-1/2 flex-col items-center justify-center bg-black p-12">
              <div className="relative w-full flex flex-col items-center justify-center">
                {/* Subtle glow effect behind characters */}
                <div className="absolute w-64 h-64 bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />
                
                <img
                  src="/login1.png" 
                  alt="3D Characters Illustration"
                  className="w-full h-auto max-h-[400px] object-contain relative z-10"
                />

                {/* INTEGRATED BADGES SECTION */}
                <div className="mt-10 text-center z-10">
                  <h3 className="text-xl font-semibold text-white mb-4">Connect anytime, anywhere</h3>
                  <div className="flex justify-center gap-3">
                    <span className="px-4 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 text-xs font-medium text-cyan-400 uppercase tracking-wider">Free</span>
                    <span className="px-4 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 text-xs font-medium text-cyan-400 uppercase tracking-wider">Secure</span>
                    <span className="px-4 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 text-xs font-medium text-cyan-400 uppercase tracking-wider">Private</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </BorderAnimatedContainer>
      </div>
    </div>
  );
}

export default LoginPage;