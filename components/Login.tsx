
import React, { useState } from 'react';
import { ShieldCheck, ArrowRight, Loader2 } from 'lucide-react';

interface LoginProps {
  onLogin: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      onLogin();
      setLoading(false);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-100 via-slate-50 to-emerald-50">
      <div className="w-full max-w-[1100px] grid grid-cols-1 lg:grid-cols-2 bg-white rounded-[3rem] shadow-2xl overflow-hidden border border-slate-100">
        <div className="p-12 lg:p-16 flex flex-col justify-center">
          <div className="flex items-center gap-3 mb-12">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-bold shadow-lg shadow-indigo-100">P5</div>
            <span className="text-2xl font-bold tracking-tight text-slate-800">Plouto5</span>
          </div>

          <div className="mb-10">
            <h1 className="text-4xl font-bold text-slate-900 mb-4 tracking-tight">Supply chain intelligence start here.</h1>
            <p className="text-slate-500 leading-relaxed font-medium">Log in to manage orders, track freight, and optimize your global logistics network.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 ml-1">Corporate Email</label>
                <input 
                  type="email" 
                  defaultValue="alex.rivera@global-logistics.com"
                  className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:bg-white outline-none transition-all font-medium"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 ml-1">Password</label>
                <input 
                  type="password" 
                  defaultValue="password123"
                  className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:bg-white outline-none transition-all font-medium"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input type="checkbox" className="w-5 h-5 rounded-lg border-slate-300 text-indigo-600 focus:ring-indigo-500 transition-all" defaultChecked />
                <span className="text-sm text-slate-600 font-medium group-hover:text-slate-900 transition-colors">Remember me</span>
              </label>
              <a href="#" className="text-sm font-bold text-indigo-600 hover:text-indigo-700">Forgot password?</a>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full py-5 bg-indigo-600 text-white font-bold rounded-2xl shadow-xl shadow-indigo-100 hover:bg-indigo-700 flex items-center justify-center gap-3 transition-all transform active:scale-[0.98]"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : (
                <>Sign in to Gateway <ArrowRight className="w-5 h-5" /></>
              )}
            </button>
          </form>

          <div className="mt-12 pt-8 border-t border-slate-50 text-center">
            <p className="text-sm text-slate-400 font-medium flex items-center justify-center gap-2">
              <ShieldCheck className="w-4 h-4" /> ISO 27001 Certified Enterprise Gateway
            </p>
          </div>
        </div>

        <div className="hidden lg:block bg-slate-900 relative">
          <img 
            src="https://picsum.photos/seed/cargo/1200/1600" 
            className="absolute inset-0 w-full h-full object-cover opacity-50 mix-blend-overlay"
            alt="Logistics background"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent p-20 flex flex-col justify-end">
            <div className="space-y-8 max-w-sm">
                <div className="bg-white/10 backdrop-blur-md p-6 rounded-3xl border border-white/10">
                    <p className="text-white text-lg font-medium leading-relaxed italic mb-4">
                        "Plouto5 has transformed how we handle multi-origin consolidation. The workspace switcher is a game changer for our regional offices."
                    </p>
                    <div className="flex items-center gap-4">
                        <img src="https://picsum.photos/seed/sarah/50" className="w-10 h-10 rounded-full" alt="Testimonial" />
                        <div>
                            <p className="text-white font-bold text-sm">Sarah Jenkins</p>
                            <p className="text-white/60 text-xs">Director of Supply Chain, Oceanic Ltd</p>
                        </div>
                    </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
