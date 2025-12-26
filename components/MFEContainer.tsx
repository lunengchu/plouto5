
import React from 'react';
import { AlertCircle, RefreshCw, Layers } from 'lucide-react';
import { MenuItem } from '../types';

interface MFEContainerProps {
  menu: MenuItem;
  children: React.ReactNode;
}

const MFEContainer: React.FC<MFEContainerProps> = ({ menu, children }) => {
  if (!menu.isOnline) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-12 text-center animate-in fade-in zoom-in duration-300">
        <div className="w-24 h-24 bg-amber-50 rounded-full flex items-center justify-center mb-8 relative">
          <AlertCircle className="w-12 h-12 text-amber-500" />
          <div className="absolute inset-0 rounded-full border-4 border-amber-200 border-t-amber-500 animate-spin opacity-20"></div>
        </div>
        <h2 className="text-3xl font-bold text-slate-900 mb-4 tracking-tight">Service Temporarily Unavailable</h2>
        <p className="text-slate-500 max-w-md mx-auto leading-relaxed mb-10 font-medium">
          The <span className="text-slate-900 font-bold">{menu.title}</span> micro-frontend ({menu.mfeId}) is currently undergoing scheduled maintenance or is disconnected from the gateway.
        </p>
        <div className="flex items-center gap-4">
          <button 
            onClick={() => window.location.reload()}
            className="px-8 py-3.5 bg-indigo-600 text-white font-bold rounded-2xl shadow-xl shadow-indigo-100 hover:bg-indigo-700 flex items-center gap-2 transition-all active:scale-95"
          >
            <RefreshCw className="w-5 h-5" /> Retry Connection
          </button>
          <button className="px-8 py-3.5 bg-white border border-slate-200 text-slate-700 font-bold rounded-2xl hover:bg-slate-50 transition-all">
            System Status
          </button>
        </div>
        <div className="mt-16 flex items-center gap-2 text-slate-400 text-xs uppercase tracking-widest font-bold">
            <Layers className="w-4 h-4" /> Micro-frontend Isolation Layer Active
        </div>
      </div>
    );
  }

  return <div className="animate-in fade-in duration-500 h-full">{children}</div>;
};

export default MFEContainer;
