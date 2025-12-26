
import React from 'react';
import { MENU_REGISTRY } from '../constants';
import { WorkspaceRole } from '../types';
import { Settings } from 'lucide-react';
import NavigationItem from './NavigationItem';

interface SidebarProps {
  currentRole: WorkspaceRole;
  activeMenuId: string;
  onMenuSelect: (id: string) => void;
  collapsed: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ currentRole, activeMenuId, onMenuSelect, collapsed }) => {
  const filteredMenus = MENU_REGISTRY.filter(menu => menu.roles.includes(currentRole));

  return (
    <aside className={`bg-white border-r border-slate-200 transition-all duration-300 flex flex-col ${collapsed ? 'w-20' : 'w-64'}`}>
      <div className="p-6 flex items-center gap-3">
        <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold shadow-lg shadow-indigo-200">
          P5
        </div>
        {!collapsed && <span className="font-bold text-xl tracking-tight text-slate-800">Plouto5</span>}
      </div>

      <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
        {filteredMenus.map((menu) => (
          <NavigationItem 
            key={menu.id} 
            menu={menu} 
            isActive={activeMenuId === menu.id} 
            onSelect={onMenuSelect} 
          />
        ))}
      </nav>

      {!collapsed && (
        <div className="p-4 border-t border-slate-100">
          <div className="bg-slate-50 rounded-2xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Gateway System</span>
            </div>
            <p className="text-[10px] text-slate-400 leading-relaxed italic">
              Connected to global trading hub.
            </p>
          </div>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;
