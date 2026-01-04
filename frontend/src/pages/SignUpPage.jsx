import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import BorderAnimatedContainer from "../components/BorderAnimatedContainer";
import { MessageCircleIcon, LockIcon, MailIcon, UserIcon, LoaderIcon, EyeIcon, EyeOffIcon } from "lucide-react";
import { Link } from "react-router";

function SignUpPage() {
  const [formData, setFormData] = useState({ fullName: "", email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false); // State for eye toggle
  const { signup, isSigningUp } = useAuthStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    signup(formData);
  };

  return (
    <div className="w-full flex items-center justify-center p-4 bg-black min-h-screen">
      <div className="relative w-full max-w-6xl md:h-[750px] h-auto">
        <BorderAnimatedContainer>
          <div className="w-full h-full flex flex-col md:flex-row bg-black rounded-2xl overflow-hidden">
            
            {/* FORM COLUMN - LEFT SIDE */}
            <div className="md:w-1/2 p-8 lg:p-16 flex items-center justify-center md:border-r border-zinc-800">
              <div className="w-full max-w-md">
                <div className="text-center mb-10">
                  <div className="bg-cyan-500/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 border border-cyan-500/20">
                    <MessageCircleIcon className="w-8 h-8 text-cyan-400" />
                  </div>
                  <h2 className="text-3xl font-bold text-white mb-2">Create Account</h2>
                  <p className="text-zinc-500">Join our community today</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* FULL NAME */}
                  <div>
                    <label className="text-xs font-semibold text-zinc-400 uppercase mb-2 block tracking-wider">Full Name</label>
                    <div className="relative">
                      <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-600" />
                      <input
                        type="text"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        className="w-full bg-zinc-900 border border-zinc-800 text-white rounded-xl py-3 pl-11 pr-4 focus:ring-1 focus:ring-cyan-500 outline-none transition-all"
                        placeholder="John Doe"
                        required
                      />
                    </div>
                  </div>

                  {/* EMAIL INPUT */}
                  <div>
                    <label className="text-xs font-semibold text-zinc-400 uppercase mb-2 block tracking-wider">Email</label>
                    <div className="relative">
                      <MailIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-600" />
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-zinc-900 border border-zinc-800 text-white rounded-xl py-3 pl-11 pr-4 focus:ring-1 focus:ring-cyan-500 outline-none transition-all"
                        placeholder="johndoe@gmail.com"
                        required
                      />
                    </div>
                  </div>

                  {/* PASSWORD INPUT WITH EYE ICON */}
                  <div>
                    <label className="text-xs font-semibold text-zinc-400 uppercase mb-2 block tracking-wider">Password</label>
                    <div className="relative">
                      <LockIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-600" />
                      <input
                        type={showPassword ? "text" : "password"}
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        className="w-full bg-zinc-900 border border-zinc-800 text-white rounded-xl py-3 pl-11 pr-12 focus:ring-1 focus:ring-cyan-500 outline-none transition-all"
                        placeholder="••••••••"
                        required
                      />
                      {/* Toggle Button */}
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-600 hover:text-cyan-400 transition-colors"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOffIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>

                  <button 
                    className="w-full bg-white hover:bg-cyan-400 text-black font-bold py-3.5 rounded-xl transition-all duration-300 shadow-lg shadow-cyan-500/5 mt-2" 
                    type="submit" 
                    disabled={isSigningUp}
                  >
                    {isSigningUp ? (
                      <LoaderIcon className="w-6 h-6 animate-spin mx-auto text-black" />
                    ) : (
                      "Create Account"
                    )}
                  </button>
                </form>

                <div className="mt-8 text-center">
                  <Link to="/login" className="text-sm text-zinc-500 hover:text-white transition-colors">
                    Already have an account? <span className="text-cyan-500 font-medium ml-1">Login</span>
                  </Link>
                </div>
              </div>
            </div>

            {/* ILLUSTRATION COLUMN - RIGHT SIDE */}
            <div className="hidden md:flex md:w-1/2 items-center justify-center bg-black p-12">
              <div className="relative w-full h-full flex items-center justify-center">
                <div className="absolute w-64 h-64 bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />
                <div className="text-center z-10">
                  <img
                    src="/signup1.png" 
                    alt="SignUp Illustration"
                    className="w-full h-full max-h-[480px] object-contain drop-shadow-[0_0_30px_rgba(6,182,212,0.1)]"
                  />
                  <div className="mt-8">
                    <h3 className="text-2xl font-bold text-white mb-2">Start Your Journey Today</h3>
                    <div className="flex justify-center gap-3">
                      <span className="px-4 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 text-xs font-medium text-cyan-400">Free</span>
                      <span className="px-4 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 text-xs font-medium text-cyan-400">Secure</span>
                      <span className="px-4 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 text-xs font-medium text-cyan-400">Private</span>
                    </div>
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

export default SignUpPage;