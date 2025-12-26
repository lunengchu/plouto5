
import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { MOCK_USER, MENU_REGISTRY } from './constants';
import { User, Workspace, WorkspaceRole, LayoutType, Language } from './types';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Profile from './components/Profile';
import MFEContainer from './components/MFEContainer';
import NotFound from './components/NotFound';
import DemoOrder from './components/DemoOrder';

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

  const renderContent = () => {
    if (showProfile) {
      return (
        <Profile 
          user={currentUser} 
          onUpdateDefaultWorkspace={(id) => setCurrentUser(prev => ({...prev, defaultWorkspaceId: id}))} 
          onUpdateLayout={(l) => setCurrentUser(prev => ({...prev, preferredLayout: l}))}
        />
      );
    }

    // Custom Routing for Demo Components
    if (activeMenuId === 'demo-404') {
      return <NotFound onBack={() => setActiveMenuId('m8')} onHome={() => setActiveMenuId('m0')} />;
    }

    if (activeMenuId === 'demo-order') {
      return <DemoOrder />;
    }

    return (
      <MFEContainer menu={activeMenu}>
        {activeMenuId === 'm0' || activeMenuId === 'm1' ? <Dashboard /> : (
            <div className="bg-white rounded-[2.5rem] p-16 shadow-sm border border-slate-100 min-h-[500px] flex flex-col items-center justify-center text-center max-w-4xl mx-auto">
              <div className="w-20 h-20 bg-indigo-50 text-indigo-600 rounded-3xl flex items-center justify-center mb-8">
                  <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
              </div>
              <h2 className="text-2xl font-black text-slate-800 mb-3">{activeMenu.title}</h2>
              <p className="text-base text-slate-500 max-w-sm mb-10 font-medium leading-relaxed">This business logic is encapsulated in the <span className="text-slate-900 font-bold">{activeMenu.mfeId}</span> micro-service container.</p>
              <button className="px-10 py-4 bg-indigo-600 text-white font-black rounded-2xl hover:bg-indigo-700 shadow-xl shadow-indigo-100 transition-all active:scale-95 flex items-center gap-3">
                Launch Remote Instance <ArrowRight className="w-5 h-5" />
              </button>
            </div>
        )}
      </MFEContainer>
    );
  };

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

        <main className="flex-1 overflow-y-auto p-8 scroll-smooth">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default App;
