
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
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Auto-open if active (for sidebar accordion persistence)
  useEffect(() => {
    if (isActive && !isTopbar) {
      setIsOpen(true);
    }
  }, [isActive, isTopbar]);

  // Close dropdown on outside click (only for topbar mode)
  useEffect(() => {
    if (!isTopbar) return;
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isTopbar]);

  const hasChildren = menu.children && menu.children.length > 0;

  const handleClick = (e: React.MouseEvent) => {
    // If it's a parent menu or offline, toggle the open state
    if (!menu.isOnline || hasChildren) {
      e.preventDefault();
      setIsOpen(!isOpen);
    } else {
      onSelect(menu.id);
    }
  };

  const baseClasses = isTopbar
    ? `flex items-center gap-2 px-3 lg:px-5 py-2 lg:py-2.5 rounded-xl text-xs lg:text-base font-semibold transition-all relative whitespace-nowrap ${
        isActive ? 'text-white bg-white/10 ring-1 ring-white/20' : 'text-slate-400 hover:text-white hover:bg-white/5'
      }`
    : `w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all relative ${
        isActive && !hasChildren ? 'bg-indigo-50 text-indigo-700 font-bold shadow-sm' : 'text-slate-500 hover:bg-slate-50'
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
                          <span className="text-amber-600/70 text-[9px] lg:text-[10px] font-mono break-all leading-tight">
                              ERR_MFE_OFFLINE: [menu.{item.mfeId}]
                          </span>
                      </div>
                  </div>
              </div>
              {item.children && renderOfflineTree(item.children, depth + 1)}
          </div>
      ));
  };

  // Render submenus (Accordion for Sidebar, Dropdown for Topbar)
  const renderSubmenuContent = (items: MenuItem[], depth: number = 0) => {
    return items.map(child => (
      <div key={child.id} className="w-full">
        {/* For children with their own children, we recurse */}
        <button 
          onClick={() => {
            if (child.isOnline && (!child.children || child.children.length === 0)) {
              onSelect(child.id);
              if (isTopbar) setIsOpen(false);
            }
          }}
          className={`w-full text-left px-3 py-2.5 text-sm rounded-lg flex items-center justify-between group transition-colors ${
            child.isOnline ? 'text-slate-700 hover:bg-indigo-50 hover:text-indigo-700' : 'opacity-60 cursor-default'
          }`}
          style={{ paddingLeft: isTopbar ? `${(depth + 1) * 12}px` : `${(depth + 1) * 20}px` }}
        >
          <div className="flex items-center gap-2.5">
            {getIcon(child.icon, "w-4 h-4 opacity-50 group-hover:opacity-100")}
            <span className={child.children && child.children.length > 0 ? "font-bold text-[10px] lg:text-xs uppercase tracking-wider text-slate-400" : "font-semibold"}>
              {child.title}
            </span>
          </div>
          {!child.isOnline ? (
            <span className="text-[8px] bg-amber-50 text-amber-600 px-1 py-0.5 rounded font-black tracking-tighter border border-amber-100">OFFLINE</span>
          ) : (
            child.children && child.children.length > 0 ? <ChevronDown className="w-3.5 h-3.5 opacity-30" /> : <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
          )}
        </button>
        {child.children && child.children.length > 0 && child.isOnline && (
          <div className={`ml-2 border-l border-slate-100/50`}>
            {renderSubmenuContent(child.children, depth + 1)}
          </div>
        )}
      </div>
    ));
  };

  return (
    <div className={`w-full relative ${isTopbar ? 'w-auto' : ''}`} ref={containerRef}>
      <button onClick={handleClick} className={baseClasses}>
        {getIcon(menu.icon, isTopbar ? "w-4 h-4 lg:w-5 lg:h-5 opacity-80" : "w-6 h-6 opacity-80")}
        <span className="truncate flex-1 text-left">{menu.title}</span>
        
        {menu.statusLabel && !isTopbar && (
          <span className="flex items-center gap-1 scale-75">
            <span className="text-[10px] px-1.5 py-0.5 rounded-md font-black uppercase bg-amber-100 text-amber-700">
              {menu.statusLabel}
            </span>
          </span>
        )}

        {(hasChildren || !menu.isOnline) && (
          <ChevronDown className={`w-3.5 h-3.5 opacity-40 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
        )}
      </button>

      {/* Accordion Style for Sidebar */}
      {!isTopbar && isOpen && (
        <div className="mt-1 space-y-0.5 animate-in slide-in-from-top-1 duration-200">
           {!menu.isOnline ? (
             <div className="mx-4 p-3 bg-slate-900 rounded-xl">
                <div className="flex items-center gap-2 mb-2">
                  <Terminal className="w-3 h-3 text-amber-500" />
                  <span className="text-[9px] font-mono text-amber-500 uppercase">MFE_OFFLINE</span>
                </div>
                {menu.children && renderOfflineTree(menu.children, 0)}
             </div>
           ) : (
             <div className="space-y-0.5">
               {menu.children && renderSubmenuContent(menu.children, 0)}
             </div>
           )}
        </div>
      )}

      {/* Dropdown Style for Topbar */}
      {isTopbar && isOpen && (
        <div className={`fixed lg:absolute top-16 lg:top-full left-4 right-4 lg:left-0 lg:right-auto mt-2 lg:mt-3 w-auto lg:w-80 bg-white shadow-[0_30px_60px_-12px_rgba(0,0,0,0.25)] rounded-2xl lg:rounded-[1.5rem] border border-slate-200 z-[100] p-4 lg:p-6 text-left animate-in fade-in zoom-in slide-in-from-top-2 duration-300 max-h-[70vh] lg:max-h-[85vh] overflow-y-auto`}>
          {!menu.isOnline ? (
            <div className="space-y-4">
               <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
                  <div className="p-2 bg-amber-50 rounded-xl">
                    <Terminal className="w-4 h-4 lg:w-5 lg:h-5 text-amber-600" />
                  </div>
                  <div>
                    <h4 className="text-amber-700 font-black text-[10px] lg:text-xs uppercase tracking-tight">MFE Error</h4>
                    <p className="text-[8px] lg:text-[10px] text-slate-400 font-mono mt-0.5">ID: {menu.mfeId}</p>
                  </div>
               </div>
               <div className="p-3 lg:p-4 bg-slate-900 rounded-xl overflow-hidden">
                  <div className="flex items-start gap-2 mb-2">
                    <AlertCircle className="w-3.5 h-3.5 text-amber-500" />
                    <span className="text-amber-500 text-[10px] font-mono">Manifest fetch failed.</span>
                  </div>
                  {menu.children && renderOfflineTree(menu.children, 1)}
               </div>
            </div>
          ) : (
            <div className="space-y-1">
                <div className="px-3 py-2 mb-2 bg-slate-50 rounded-xl flex items-center justify-between">
                   <span className="text-[9px] lg:text-[11px] font-black text-slate-400 uppercase tracking-widest">{menu.title} Navigation</span>
                   <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                </div>
                {menu.children && renderSubmenuContent(menu.children, 0)}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default NavigationItem;
