
import React, { useState, useRef, useEffect } from 'react';
import { MenuItem } from '../types';
import { ChevronDown, ChevronRight, AlertCircle } from 'lucide-react';
import { getIcon } from '../constants';

interface NavigationItemProps {
  menu: MenuItem;
  isActive: boolean;
  onSelect: (id: string) => void;
  isTopbar?: boolean;
  level?: number;
}

const NavigationItem: React.FC<NavigationItemProps> = ({ menu, isActive, onSelect, isTopbar, level = 0 }) => {
  const [showErrorDropdown, setShowErrorDropdown] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setShowErrorDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleClick = (e: React.MouseEvent) => {
    if (!menu.isOnline || (menu.children && menu.children.length > 0)) {
      e.preventDefault();
      setShowErrorDropdown(!showErrorDropdown);
    } else {
      onSelect(menu.id);
    }
  };

  // Increased font size to text-base (16px) and adjusted padding for a more premium look
  const baseClasses = isTopbar
    ? `flex items-center gap-2.5 px-5 py-2.5 rounded-xl text-base font-semibold transition-all relative ${
        isActive ? 'text-white bg-white/10 ring-1 ring-white/20' : 'text-slate-400 hover:text-white hover:bg-white/5'
      }`
    : `w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all relative ${
        isActive ? 'bg-indigo-50 text-indigo-700 font-bold' : 'text-slate-500 hover:bg-slate-50'
      }`;

  // Recursive renderer for offline sub-menus with improved visual clarity
  const renderOfflineTree = (items: MenuItem[], depth: number = 0) => {
      return items.map(item => (
          <div key={item.id} className="mt-2">
              <div className="flex items-start gap-2 group" style={{ paddingLeft: `${depth * 16}px` }}>
                  <span className="text-[#f59e0b] mt-1 font-bold text-xs select-none">＊</span>
                  <div className="flex items-center gap-2">
                      <div className="opacity-70">{getIcon(item.icon, "w-3.5 h-3.5 text-[#f59e0b]")}</div>
                      <span className="text-[#f59e0b] text-[11px] font-mono break-all leading-tight">
                          translation-not-found[menu.{item.mfeId}]
                      </span>
                  </div>
              </div>
              {item.children && renderOfflineTree(item.children, depth + 1)}
          </div>
      ));
  };

  // Submenus stay slightly smaller (text-sm) to maintain visual hierarchy
  const renderOnlineSubmenu = (items: MenuItem[], depth: number = 0) => {
    return items.map(child => (
      <div key={child.id}>
        <button 
          onClick={() => {
            if (child.isOnline && (!child.children || child.children.length === 0)) {
              onSelect(child.id);
              setShowErrorDropdown(false);
            }
          }}
          className={`w-full text-left px-3 py-2.5 text-sm rounded-xl flex items-center justify-between group transition-colors ${
            child.isOnline ? 'text-slate-700 hover:bg-indigo-50 hover:text-indigo-700' : 'opacity-50 cursor-default'
          }`}
          style={{ paddingLeft: `${(depth + 1) * 12}px` }}
        >
          <div className="flex items-center gap-2.5">
            {getIcon(child.icon, "w-4 h-4 opacity-60")}
            <span className={child.children && child.children.length > 0 ? "font-black uppercase tracking-tighter" : "font-semibold"}>
              {child.title}
            </span>
          </div>
          {!child.isOnline ? (
            <span className="text-[10px] bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded font-bold">OFFLINE</span>
          ) : (
            child.children && child.children.length > 0 ? <ChevronDown className="w-3.5 h-3.5 opacity-30" /> : <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
          )}
        </button>
        {child.children && child.children.length > 0 && child.isOnline && (
          <div className="border-l border-slate-100 ml-4 mb-2">
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
          <span className="flex items-center gap-1 ml-1">
            {menu.statusLabel === '离线' ? (
              <span className="bg-[#facc15] text-[#854d0e] text-[10px] px-2 py-0.5 rounded-md font-black uppercase shadow-sm">离线</span>
            ) : (
              <span className="text-[#facc15] text-[10px] font-bold border border-[#facc15]/30 px-1.5 rounded-md">{menu.statusLabel}</span>
            )}
          </span>
        )}

        {(menu.children || !menu.isOnline) && (
          <ChevronDown className={`w-4 h-4 opacity-40 transition-transform duration-200 ${showErrorDropdown ? 'rotate-180' : ''}`} />
        )}
      </button>

      {/* Enhanced Multi-level Dropdown */}
      {showErrorDropdown && (
        <div className={`absolute top-full left-0 mt-3 w-80 bg-white shadow-[0_30px_60px_-12px_rgba(0,0,0,0.25)] rounded-[1.5rem] border border-slate-200 z-[100] p-6 text-left animate-in fade-in zoom-in slide-in-from-top-2 duration-300 max-h-[85vh] overflow-y-auto`}>
          {!menu.isOnline ? (
            <div className="space-y-5">
               <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
                  <div className="p-2 bg-amber-50 rounded-xl">
                    <AlertCircle className="w-5 h-5 text-amber-600" />
                  </div>
                  <h4 className="text-amber-600 font-black text-sm uppercase tracking-tight">
                    Failed to load {menu.title}
                  </h4>
               </div>
               
               <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <span className="text-[#f59e0b] mt-1 font-bold text-sm">＊</span>
                    <div className="flex items-center gap-2">
                      <div className="opacity-70">{getIcon(menu.icon, "w-4 h-4 text-[#f59e0b]")}</div>
                      <span className="text-[#f59e0b] text-[11px] font-mono leading-tight">
                        translation-not-found[menu.{menu.mfeId}]
                      </span>
                    </div>
                  </div>
                  {menu.children && renderOfflineTree(menu.children, 1)}
               </div>
               
               <div className="pt-4 border-t border-slate-50">
                  <p className="text-[11px] text-slate-400 font-medium italic">
                    The requested micro-frontend is currently offline.
                  </p>
               </div>
            </div>
          ) : (
            <div className="space-y-2">
                <div className="px-3 py-2 mb-3 bg-slate-50 rounded-xl">
                   <span className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">{menu.title} Navigation</span>
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
