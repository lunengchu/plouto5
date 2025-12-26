
import React, { useState } from 'react';
import { 
  Bell, 
  ChevronDown, 
  LogOut, 
  User as UserIcon, 
  Check,
  Menu,
  Globe,
  Briefcase
} from 'lucide-react';
import { User, Workspace, MenuItem, LayoutType, Language } from '../types';
import NavigationItem from './NavigationItem';

interface HeaderProps {
  user: User;
  activeWorkspace: Workspace;
  onWorkspaceSwitch: (ws: Workspace) => void;
  onToggleSidebar: () => void;
  onProfileClick: () => void;
  onLogout: () => void;
  notifications: number;
  layout: LayoutType;
  menus: MenuItem[];
  activeMenuId: string;
  onMenuSelect: (id: string) => void;
  language: Language;
  onLanguageChange: (lang: Language) => void;
}

const Header: React.FC<HeaderProps> = ({ 
  user, 
  activeWorkspace, 
  onWorkspaceSwitch, 
  onToggleSidebar,
  onProfileClick,
  onLogout,
  notifications,
  layout,
  menus,
  activeMenuId,
  onMenuSelect,
  language,
  onLanguageChange
}) => {
  const [showWSMenu, setShowWSMenu] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showLangMenu, setShowLangMenu] = useState(false);

  const isDark = layout === 'topbar';

  // Helper to check if any child is active (recursive)
  const isAnyChildActive = (menu: MenuItem, currentId: string): boolean => {
    if (menu.id === currentId) return true;
    if (menu.children) {
      return menu.children.some(child => isAnyChildActive(child, currentId));
    }
    return false;
  };

  return (
    <header className={`h-16 lg:h-20 flex items-center justify-between sticky top-0 z-30 px-4 lg:px-8 border-b transition-all duration-300 ${
      isDark ? 'bg-[#111111] border-white/5 shadow-xl shadow-black/30' : 'bg-white border-slate-200'
    }`}>
      <div className="flex items-center gap-4 lg:gap-10">
        {/* Mobile Toggle & Logo */}
        <div className="flex items-center gap-3 lg:pr-8 lg:border-r border-white/10 shrink-0">
          <button onClick={onToggleSidebar} className={`p-2 rounded-xl transition-colors ${isDark ? 'text-white hover:bg-white/10' : 'text-slate-600 hover:bg-slate-100'}`}>
            <Menu className="w-5 h-5 lg:w-6 lg:h-6" />
          </button>
          <div className="w-8 h-8 lg:w-10 lg:h-10 bg-indigo-600 rounded-lg lg:rounded-xl flex items-center justify-center text-white font-bold lg:text-xl shadow-lg shadow-indigo-600/30">P5</div>
        </div>

        {/* Topbar Main Navigation (Desktop only) */}
        {layout === 'topbar' && (
          <nav className="hidden lg:flex items-center gap-1 xl:gap-3">
            {menus.map(menu => (
              <NavigationItem 
                key={menu.id} 
                menu={menu} 
                isActive={isAnyChildActive(menu, activeMenuId)} 
                onSelect={onMenuSelect} 
                isTopbar 
              />
            ))}
          </nav>
        )}
      </div>

      <div className="flex items-center gap-2 lg:gap-6 shrink-0">
        <div className="flex items-center gap-1 lg:gap-2">
            <div className="relative hidden md:block">
              <button 
                onClick={() => setShowLangMenu(!showLangMenu)}
                className={`flex items-center gap-2 px-3 py-2 rounded-xl transition-all text-[10px] font-black uppercase tracking-[0.1em] ${isDark ? 'text-slate-400 hover:text-white hover:bg-white/5' : 'text-slate-500 hover:bg-slate-50'}`}
              >
                <Globe className="w-4 h-4" />
                <span className="hidden xl:inline">{language}</span>
                <ChevronDown className="w-3 h-3 opacity-40" />
              </button>
              {showLangMenu && (
                <div className="absolute top-full right-0 mt-3 w-40 bg-white rounded-2xl shadow-2xl border border-slate-100 py-2 z-50 overflow-hidden animate-in fade-in slide-in-from-top-1">
                  <button onClick={() => {onLanguageChange('zh'); setShowLangMenu(false);}} className="w-full px-5 py-3 text-left text-xs text-slate-700 hover:bg-slate-50 flex items-center justify-between font-bold">
                    中文 {language === 'zh' && <Check className="w-4 h-4 text-indigo-600" />}
                  </button>
                  <button onClick={() => {onLanguageChange('en'); setShowLangMenu(false);}} className="w-full px-5 py-3 text-left text-xs text-slate-700 hover:bg-slate-50 flex items-center justify-between font-bold">
                    English {language === 'en' && <Check className="w-4 h-4 text-indigo-600" />}
                  </button>
                </div>
              )}
            </div>

            <div className="relative">
              <button 
                onClick={() => setShowWSMenu(!showWSMenu)}
                className={`flex items-center gap-2 lg:gap-4 px-3 lg:px-5 py-2 lg:py-2.5 rounded-xl lg:rounded-2xl transition-all border ${
                  isDark 
                  ? 'bg-white/5 border-white/10 text-white hover:bg-white/10' 
                  : 'bg-slate-50 border-slate-200 text-slate-800 hover:bg-slate-100'
                }`}
              >
                <Briefcase className="w-4 h-4 lg:w-5 lg:h-5 text-indigo-400" />
                <div className="hidden sm:flex flex-col items-start leading-none text-left min-w-[80px] lg:min-w-[110px]">
                  <span className={`text-[8px] lg:text-[9px] font-black uppercase tracking-widest opacity-40 mb-1 ${isDark ? 'text-white' : 'text-slate-500'}`}>Workspace</span>
                  <span className="text-xs lg:text-sm font-black truncate max-w-[100px]">{activeWorkspace.name}</span>
                </div>
                <ChevronDown className="w-3 h-3 lg:w-4 lg:h-4 opacity-40" />
              </button>
              {showWSMenu && (
                <div className="absolute top-full right-0 mt-4 w-[280px] sm:w-80 bg-white rounded-[1.25rem] lg:rounded-[1.5rem] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)] border border-slate-100 py-3 z-50 animate-in fade-in slide-in-from-top-2">
                  <div className="px-6 py-4 border-b border-slate-50 mb-2">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.25em]">Switch Context</span>
                  </div>
                  <div className="max-h-[60vh] overflow-y-auto">
                    {user.workspaces.map((ws) => (
                      <button
                        key={ws.id}
                        onClick={() => { onWorkspaceSwitch(ws); setShowWSMenu(false); }}
                        className={`w-full px-4 lg:px-6 py-3 lg:py-4 text-left hover:bg-slate-50 flex items-center justify-between group transition-colors ${activeWorkspace.id === ws.id ? 'bg-indigo-50/50' : ''}`}
                      >
                        <div className="flex items-center gap-3 lg:gap-4">
                            <div className={`w-9 h-9 lg:w-11 lg:h-11 rounded-xl lg:rounded-2xl flex items-center justify-center text-[12px] lg:text-[13px] font-black shadow-sm ${activeWorkspace.id === ws.id ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-400'}`}>
                              {ws.role.charAt(0)}
                            </div>
                            <div className="flex flex-col">
                              <span className="text-xs lg:text-sm font-black text-slate-800">{ws.name}</span>
                              <span className="text-[10px] lg:text-[11px] text-slate-500 font-medium truncate max-w-[150px]">{ws.companyName}</span>
                            </div>
                        </div>
                        {activeWorkspace.id === ws.id && <Check className="w-4 h-4 lg:w-5 lg:h-5 text-indigo-600" />}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
        </div>

        <button className={`p-2 lg:p-3 rounded-xl relative transition-all ${isDark ? 'text-slate-400 hover:text-white hover:bg-white/5' : 'text-slate-500 hover:bg-slate-50'}`}>
          <Bell className="w-5 h-5 lg:w-5.5 lg:h-5.5" />
          {notifications > 0 && <span className="absolute top-2.5 lg:top-3.5 right-2.5 lg:right-3.5 w-2.5 h-2.5 bg-rose-500 rounded-full border-2 border-white lg:border-[#111111]"></span>}
        </button>

        <div className="relative">
          <button onClick={() => setShowUserMenu(!showUserMenu)} className="flex items-center gap-2 lg:gap-4 p-1 lg:p-2 hover:bg-white/5 rounded-xl transition-all border border-transparent">
            <img src={user.avatar} className="w-8 h-8 lg:w-10 lg:h-10 rounded-xl border border-white/10 object-cover shadow-sm" />
            <div className={`text-xs lg:text-sm font-black hidden lg:block text-left leading-none ${isDark ? 'text-white' : 'text-slate-800'}`}>
               {user.username}
               <span className="block text-[9px] opacity-40 mt-1.5 font-bold uppercase tracking-widest">Admin</span>
            </div>
            <ChevronDown className={`w-3 h-3 lg:w-4 lg:h-4 opacity-40 transition-transform duration-200 ${showUserMenu ? 'rotate-180' : ''}`} />
          </button>
          {showUserMenu && (
            <div className="absolute top-full right-0 mt-4 w-56 lg:w-64 bg-white rounded-[1.25rem] lg:rounded-[1.5rem] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)] border border-slate-100 py-2 lg:py-3 z-50 overflow-hidden animate-in fade-in slide-in-from-top-2">
              <button onClick={() => {onProfileClick(); setShowUserMenu(false);}} className="w-full px-5 py-3 lg:px-6 lg:py-4 text-left text-xs lg:text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-3 lg:gap-4 font-bold">
                <UserIcon className="w-4 h-4 lg:w-5 lg:h-5 text-slate-400" /> Account Settings
              </button>
              <button onClick={onLogout} className="w-full px-5 py-3 lg:px-6 lg:py-4 text-left text-xs lg:text-sm text-rose-600 hover:bg-rose-50 font-black flex items-center gap-3 lg:gap-4 border-t border-slate-50 transition-colors">
                <LogOut className="w-4 h-4 lg:w-5 lg:h-5" /> Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
