
import React, { useState, useRef, useEffect } from 'react';
import { MenuItem } from '../types';
import { ChevronDown, ChevronRight, AlertCircle, Terminal } from 'lucide-react';
import { getIcon } from '../constants';

interface NavigationItemProps {
  menu: MenuItem;
  isActive: boolean;
  onSelect: (id: string) => void;
  isTopbar?: boolean;
  level?: number;
}

const NavigationItem: React.FC<NavigationItemProps> = ({ menu, isActive, onSelect, isTopbar, level = 0 }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleClick = (e: React.MouseEvent) => {
    // Open dropdown only if there are children or the menu is offline
    if (!menu.isOnline || (menu.children && menu.children.length > 0)) {
      e.preventDefault();
      setShowDropdown(!showDropdown);
    } else {
      onSelect(menu.id);
    }
  };

  const baseClasses = isTopbar
    ? `flex items-center gap-2.5 px-5 py-2.5 rounded-xl text-base font-semibold transition-all relative ${
        isActive ? 'text-white bg-white/10 ring-1 ring-white/20' : 'text-slate-400 hover:text-white hover:bg-white/5'
      }`
    : `w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all relative ${
        isActive ? 'bg-indigo-50 text-indigo-700 font-bold' : 'text-slate-500 hover:bg-slate-50'
      }`;

  // Recursive render for offline tree
  const renderOfflineTree = (items: MenuItem[], depth: number = 0) => {
      return items.map(item => (
          <div key={item.id} className="mt-2">
              <div className="flex items-start gap-2 group" style={{ paddingLeft: `${depth * 16}px` }}>
                  <span className="text-amber-500 mt-1 font-bold text-xs select-none">›</span>
                  <div className="flex flex-col">
                      <div className="flex items-center gap-2">
                          <div className="opacity-50">{getIcon(item.icon, "w-3 h-3 text-amber-600")}</div>
                          <span className="text-amber-600/70 text-[10px] font-mono break-all leading-tight">
                              ERR_MFE_OFFLINE: [menu.{item.mfeId}]
                          </span>
                      </div>
                      <span className="text-[9px] text-slate-400 font-mono pl-5">Status: UNAVAILABLE</span>
                  </div>
              </div>
              {item.children && renderOfflineTree(item.children, depth + 1)}
          </div>
      ));
  };

  // Render online submenus
  const renderOnlineSubmenu = (items: MenuItem[], depth: number = 0) => {
    return items.map(child => (
      <div key={child.id}>
        <button 
          onClick={() => {
            if (child.isOnline && (!child.children || child.children.length === 0)) {
              onSelect(child.id);
              setShowDropdown(false);
            }
          }}
          className={`w-full text-left px-3 py-2 text-sm rounded-lg flex items-center justify-between group transition-colors ${
            child.isOnline ? 'text-slate-700 hover:bg-indigo-50 hover:text-indigo-700' : 'opacity-60 cursor-default'
          }`}
          style={{ paddingLeft: `${(depth + 1) * 12}px` }}
        >
          <div className="flex items-center gap-2.5">
            {getIcon(child.icon, "w-4 h-4 opacity-50 group-hover:opacity-100")}
            <span className={child.children && child.children.length > 0 ? "font-bold text-xs uppercase tracking-wider text-slate-400" : "font-semibold"}>
              {child.title}
            </span>
          </div>
          {!child.isOnline ? (
            <span className="text-[9px] bg-amber-50 text-amber-600 px-1.5 py-0.5 rounded font-black tracking-tighter shadow-sm border border-amber-100">OFFLINE</span>
          ) : (
            child.children && child.children.length > 0 ? <ChevronDown className="w-3.5 h-3.5 opacity-30" /> : <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
          )}
        </button>
        {child.children && child.children.length > 0 && child.isOnline && (
          <div className="border-l border-slate-100 ml-4 my-1">
            {renderOnlineSubmenu(child.children, depth + 1)}
          </div>
        )}
      </div>
    ));
  };

  return (
    <div className="relative" ref={containerRef}>
      <button onClick={handleClick} className={baseClasses}>
        {getIcon(menu.icon, isTopbar ? "w-5 h-5 opacity-80" : "w-6 h-6 opacity-80")}
        <span>{menu.title}</span>
        
        {menu.statusLabel && (
          <span className="flex items-center gap-1 ml-1 scale-90">
            <span className={`text-[9px] px-1.5 py-0.5 rounded-md font-black uppercase shadow-sm ${
              menu.statusLabel === 'OFFLINE' || menu.statusLabel === 'UNAVAILABLE' || menu.statusLabel === '离线' || menu.statusLabel === '不可用'
              ? 'bg-amber-100 text-amber-700' 
              : 'bg-indigo-100 text-indigo-700'
            }`}>
              {menu.statusLabel}
            </span>
          </span>
        )}

        {(menu.children || !menu.isOnline) && (
          <ChevronDown className={`w-4 h-4 opacity-40 transition-transform duration-300 ${showDropdown ? 'rotate-180' : ''}`} />
        )}
      </button>

      {showDropdown && (
        <div className={`absolute top-full left-0 mt-3 w-80 bg-white shadow-[0_30px_60px_-12px_rgba(0,0,0,0.25)] rounded-[1.5rem] border border-slate-200 z-[100] p-6 text-left animate-in fade-in zoom-in slide-in-from-top-2 duration-300 max-h-[85vh] overflow-y-auto`}>
          {!menu.isOnline ? (
            <div className="space-y-5">
               <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
                  <div className="p-2 bg-amber-50 rounded-xl">
                    <Terminal className="w-5 h-5 text-amber-600" />
                  </div>
                  <div>
                    <h4 className="text-amber-700 font-black text-xs uppercase tracking-tight">Micro-Frontend Error</h4>
                    <p className="text-[10px] text-slate-400 font-mono mt-0.5">ID: {menu.mfeId}</p>
                  </div>
               </div>
               
               <div className="p-4 bg-slate-900 rounded-xl overflow-hidden">
                  <div className="flex items-start gap-2 mb-3">
                    <AlertCircle className="w-3.5 h-3.5 text-amber-500 mt-0.5" />
                    <span className="text-amber-500 text-[11px] font-mono leading-tight">
                       Failed to fetch container manifest.
                    </span>
                  </div>
                  <div className="space-y-1">
                      <div className="flex items-start gap-2">
                        <span className="text-white/40 mt-1 font-bold text-xs select-none">＊</span>
                        <span className="text-white/60 text-[10px] font-mono leading-tight">
                            translation-not-found[menu.{menu.mfeId}]
                        </span>
                      </div>
                      {menu.children && renderOfflineTree(menu.children, 1)}
                  </div>
               </div>
               
               <div className="pt-2">
                  <p className="text-[10px] text-slate-400 font-medium italic">
                    This module is currently offline. Please contact your system administrator to check the service status.
                  </p>
               </div>
            </div>
          ) : (
            <div className="space-y-2">
                <div className="px-3 py-2 mb-3 bg-slate-50 rounded-xl flex items-center justify-between">
                   <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest">{menu.title} Navigation</span>
                   <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></span>
                </div>
                {menu.children && renderOnlineSubmenu(menu.children, 0)}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default NavigationItem;
