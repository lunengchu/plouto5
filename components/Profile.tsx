
import React, { useState } from 'react';
import { 
  User as UserIcon, 
  Shield, 
  Layers, 
  Activity, 
  Bell, 
  Mail, 
  Key,
  Database,
  Star,
  Clock,
  Layout,
  Monitor
} from 'lucide-react';
import { User, ActivityLog, Notification, LayoutType } from '../types';

// Removed non-existent MOCK_ACTIVITY and MOCK_NOTIFICATIONS imports from ../constants

interface ProfileProps {
  user: User;
  onUpdateDefaultWorkspace: (id: string) => void;
  onUpdateLayout: (layout: LayoutType) => void;
}

const Profile: React.FC<ProfileProps> = ({ user, onUpdateDefaultWorkspace, onUpdateLayout }) => {
  const [activeTab, setActiveTab] = useState<'info' | 'workspaces' | 'activity' | 'security' | 'settings'>('info');

  const tabs = [
    { id: 'info', label: 'Overview', icon: UserIcon },
    { id: 'workspaces', label: 'Workspaces', icon: Layers },
    { id: 'settings', label: 'Preferences', icon: Monitor },
    { id: 'activity', label: 'Activity Log', icon: Activity },
    { id: 'security', label: 'Security', icon: Shield },
  ];

  return (
    <div className="max-w-5xl mx-auto animate-in slide-in-from-bottom-4 duration-500 pb-20">
      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="h-40 bg-slate-900 relative">
          <div className="absolute -bottom-10 left-10 flex items-end gap-5">
            <img src={user.avatar} className="w-24 h-24 rounded-2xl border-4 border-white shadow-lg object-cover" />
            <div className="pb-3 text-white">
              <h2 className="text-xl font-bold">{user.username}</h2>
              <p className="text-xs text-slate-400 font-medium">{user.email}</p>
            </div>
          </div>
        </div>
        
        <div className="pt-16 px-10 border-b border-slate-100">
          <div className="flex gap-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-5 py-3 rounded-t-xl text-xs font-bold transition-all border-b-2
                  ${activeTab === tab.id 
                    ? 'border-indigo-600 text-indigo-600 bg-indigo-50/30' 
                    : 'border-transparent text-slate-500 hover:text-slate-800'}
                `}
              >
                <tab.icon className="w-3.5 h-3.5" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="p-10 min-h-[400px]">
          {activeTab === 'settings' && (
            <div className="space-y-8 animate-in fade-in">
              <div>
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest mb-6">Navigation Layout</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <button 
                    onClick={() => onUpdateLayout('sidebar')}
                    className={`p-6 rounded-2xl border-2 transition-all text-left flex items-start gap-4 ${
                      user.preferredLayout === 'sidebar' ? 'border-indigo-600 bg-indigo-50/20' : 'border-slate-100 hover:border-slate-200'
                    }`}
                  >
                    <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400">
                      <Layout className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="font-bold text-slate-900">Left Sidebar</p>
                      <p className="text-xs text-slate-500 mt-1">Traditional enterprise navigation with expandable side menu.</p>
                    </div>
                  </button>
                  <button 
                    onClick={() => onUpdateLayout('topbar')}
                    className={`p-6 rounded-2xl border-2 transition-all text-left flex items-start gap-4 ${
                      user.preferredLayout === 'topbar' ? 'border-indigo-600 bg-indigo-50/20' : 'border-slate-100 hover:border-slate-200'
                    }`}
                  >
                    <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 rotate-90">
                      <Layout className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="font-bold text-slate-900">Top Navigation</p>
                      <p className="text-xs text-slate-500 mt-1">Modern horizontal menu at the top of the screen.</p>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'info' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-in fade-in">
                <div className="space-y-6">
                   <h3 className="font-bold text-slate-900 text-sm uppercase tracking-widest">Profile Stats</h3>
                   <div className="grid grid-cols-2 gap-4">
                      <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                         <span className="text-[10px] text-slate-500 font-bold block mb-1">DATA USAGE</span>
                         <span className="text-lg font-bold">12.8 GB</span>
                      </div>
                      <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                         <span className="text-[10px] text-slate-500 font-bold block mb-1">API CALLS</span>
                         <span className="text-lg font-bold">4.2k</span>
                      </div>
                   </div>
                </div>
                <div className="bg-indigo-600 rounded-3xl p-6 text-white">
                   <h3 className="font-bold text-sm uppercase tracking-widest mb-4 opacity-80">Quick Tip</h3>
                   <p className="text-sm leading-relaxed">
                     Switch between "Top Navigation" and "Sidebar" depending on your screen size. Top navigation is excellent for ultrawide monitors.
                   </p>
                </div>
            </div>
          )}

          {activeTab === 'workspaces' && (
             <div className="space-y-4 animate-in fade-in">
                {user.workspaces.map((ws) => (
                  <div key={ws.id} className={`p-5 rounded-2xl border flex items-center justify-between ${ws.id === user.defaultWorkspaceId ? 'border-indigo-600 bg-indigo-50/30' : 'border-slate-100'}`}>
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-bold">{ws.role.charAt(0)}</div>
                      <div>
                        <p className="font-bold text-slate-900 text-sm">{ws.name}</p>
                        <p className="text-[10px] text-slate-500 font-medium">{ws.companyName}</p>
                      </div>
                    </div>
                    {ws.id !== user.defaultWorkspaceId && (
                      <button onClick={() => onUpdateDefaultWorkspace(ws.id)} className="text-xs font-bold text-indigo-600 hover:underline">Set as Default</button>
                    )}
                  </div>
                ))}
             </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
