
import React, { useState } from 'react';
import { MOCK_USER, MENU_REGISTRY } from './constants';
import { User, Workspace, WorkspaceRole, LayoutType, Language } from './types';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Profile from './components/Profile';
import MFEContainer from './components/MFEContainer';

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [language, setLanguage] = useState<Language>('zh');
  const [currentUser, setCurrentUser] = useState<User>(MOCK_USER);
  const [activeWorkspace, setActiveWorkspace] = useState<Workspace>(
    MOCK_USER.workspaces.find(ws => ws.id === MOCK_USER.defaultWorkspaceId) || MOCK_USER.workspaces[0]
  );
  const [activeMenuId, setActiveMenuId] = useState('m0');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  // Filter root menus based on current workspace role
  const filteredMenus = MENU_REGISTRY.filter(menu => menu.roles.includes(activeWorkspace.role));

  // Recursive search for active menu
  const findMenuById = (menus: any[], id: string): any => {
    for (const menu of menus) {
      if (menu.id === id) return menu;
      if (menu.children) {
        const found = findMenuById(menu.children, id);
        if (found) return found;
      }
    }
    return null;
  };

  const activeMenu = findMenuById(MENU_REGISTRY, activeMenuId) || MENU_REGISTRY[0];

  const handleWorkspaceSwitch = (ws: Workspace) => {
    setActiveWorkspace(ws);
    setActiveMenuId('m0');
    setShowProfile(false);
  };

  if (!isLoggedIn) {
    return <Login onLogin={() => setIsLoggedIn(true)} />;
  }

  const layout = currentUser.preferredLayout;

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50">
      {layout === 'sidebar' && (
        <Sidebar 
          currentRole={activeWorkspace.role}
          activeMenuId={activeMenuId}
          onMenuSelect={(id) => {
              setActiveMenuId(id);
              setShowProfile(false);
          }}
          collapsed={sidebarCollapsed}
        />
      )}

      <div className="flex-1 flex flex-col relative overflow-hidden">
        <Header 
          user={currentUser}
          activeWorkspace={activeWorkspace}
          onWorkspaceSwitch={handleWorkspaceSwitch}
          onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)}
          onProfileClick={() => setShowProfile(true)}
          onLogout={() => setIsLoggedIn(false)}
          notifications={2}
          layout={layout}
          menus={filteredMenus}
          activeMenuId={activeMenuId}
          onMenuSelect={(id) => {
            setActiveMenuId(id);
            setShowProfile(false);
          }}
          language={language}
          onLanguageChange={setLanguage}
        />

        <main className="flex-1 overflow-y-auto p-6 scroll-smooth">
          {showProfile ? (
            <Profile 
              user={currentUser} 
              onUpdateDefaultWorkspace={(id) => setCurrentUser(prev => ({...prev, defaultWorkspaceId: id}))} 
              onUpdateLayout={(l) => setCurrentUser(prev => ({...prev, preferredLayout: l}))}
            />
          ) : (
            <MFEContainer menu={activeMenu}>
              {activeMenuId === 'm0' || activeMenuId === 'm1' ? <Dashboard /> : (
                  <div className="bg-white rounded-[2rem] p-12 shadow-sm border border-slate-100 min-h-[500px] flex flex-col items-center justify-center text-center">
                    <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mb-6">
                        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                        </svg>
                    </div>
                    <h2 className="text-xl font-bold text-slate-800 mb-2">{activeMenu.title}</h2>
                    <p className="text-sm text-slate-500 max-w-sm mb-8">This module is part of the Plouto5 micro-service ecosystem ({activeMenu.mfeId}).</p>
                    <button className="px-6 py-2 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-all">Launch Application</button>
                  </div>
              )}
            </MFEContainer>
          )}
        </main>
      </div>
    </div>
  );
};

export default App;
