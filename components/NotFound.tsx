
import React from 'react';
import { Compass, MoveLeft, Home } from 'lucide-react';

interface NotFoundProps {
  onBack: () => void;
  onHome: () => void;
}

const NotFound: React.FC<NotFoundProps> = ({ onBack, onHome }) => {
  return (
    <div className="h-full flex flex-col items-center justify-center p-12 text-center animate-in fade-in zoom-in duration-500">
      <div className="relative mb-12">
        <div className="text-[12rem] font-black text-slate-100 leading-none select-none">404</div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-24 h-24 bg-white rounded-3xl shadow-2xl flex items-center justify-center rotate-12 animate-bounce">
            <Compass className="w-12 h-12 text-indigo-600" />
          </div>
        </div>
      </div>
      
      <h2 className="text-4xl font-black text-slate-900 mb-4 tracking-tight">You seem lost in the supply chain.</h2>
      <p className="text-slate-500 max-w-md mx-auto leading-relaxed mb-12 text-lg">
        The resource you are looking for has been moved, re-routed, or simply doesn't exist in our current manifests.
      </p>

      <div className="flex items-center gap-4">
        <button 
          onClick={onBack}
          className="px-8 py-4 bg-white border border-slate-200 text-slate-700 font-black rounded-2xl hover:bg-slate-50 transition-all flex items-center gap-3 shadow-sm"
        >
          <MoveLeft className="w-5 h-5" /> Go Back
        </button>
        <button 
          onClick={onHome}
          className="px-8 py-4 bg-indigo-600 text-white font-black rounded-2xl shadow-xl shadow-indigo-100 hover:bg-indigo-700 transition-all flex items-center gap-3"
        >
          <Home className="w-5 h-5" /> Back to Home
        </button>
      </div>

      <div className="mt-20 flex items-center gap-8 opacity-20 grayscale">
        <div className="flex flex-col items-center gap-2">
            <div className="w-10 h-1 border-t-2 border-slate-400"></div>
            <span className="text-[10px] font-black uppercase tracking-widest">Node Alpha</span>
        </div>
        <div className="flex flex-col items-center gap-2">
            <div className="w-10 h-1 border-t-2 border-slate-400"></div>
            <span className="text-[10px] font-black uppercase tracking-widest">Gateway Hub</span>
        </div>
        <div className="flex flex-col items-center gap-2">
            <div className="w-10 h-1 border-t-2 border-slate-400"></div>
            <span className="text-[10px] font-black uppercase tracking-widest">Relay Station</span>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
