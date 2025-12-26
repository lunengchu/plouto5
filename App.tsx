
import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { MOCK_USER, MENU_REGISTRY } from './constants';
import { User, Workspace, WorkspaceRole, Language } from './types';
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Close mobile menu when switching routes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [activeMenuId, activeWorkspace, showProfile]);

  const filteredMenus = MENU_REGISTRY.filter(menu => menu.roles.includes(activeWorkspace.role));

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

    if (activeMenuId === 'demo-404') {
      return <NotFound onBack={() => setActiveMenuId('m8')} onHome={() => setActiveMenuId('m0')} />;
    }

    if (activeMenuId === 'demo-order') {
      return <DemoOrder />;
    }

    return (
      <MFEContainer menu={activeMenu}>
        {activeMenuId === 'm0' || activeMenuId === 'm1' ? <Dashboard /> : (
            <div className="bg-white rounded-[1.5rem] lg:rounded-[2.5rem] p-8 lg:p-16 shadow-sm border border-slate-100 min-h-[400px] lg:min-h-[500px] flex flex-col items-center justify-center text-center max-w-4xl mx-auto">
              <div className="w-16 h-16 lg:w-20 lg:h-20 bg-indigo-50 text-indigo-600 rounded-2xl lg:rounded-3xl flex items-center justify-center mb-6 lg:mb-8">
                  <svg className="w-8 h-8 lg:w-10 lg:h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
              </div>
              <h2 className="text-xl lg:text-2xl font-black text-slate-800 mb-2 lg:mb-3">{activeMenu.title}</h2>
              <p className="text-sm lg:text-base text-slate-500 max-w-sm mb-8 lg:mb-10 font-medium leading-relaxed">This business logic is encapsulated in the <span className="text-slate-900 font-bold">{activeMenu.mfeId}</span> micro-service container.</p>
              <button className="px-8 lg:px-10 py-3 lg:py-4 bg-indigo-600 text-white font-black rounded-xl lg:rounded-2xl hover:bg-indigo-700 shadow-xl shadow-indigo-100 transition-all active:scale-95 flex items-center gap-3">
                Launch Remote Instance <ArrowRight className="w-4 h-4 lg:w-5 lg:h-5" />
              </button>
            </div>
        )}
      </MFEContainer>
    );
  };

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50">
      {/* Sidebar - Always visible as a drawer on mobile, layout-dependent on desktop */}
      <div 
        className={`fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`} 
        onClick={() => setIsMobileMenuOpen(false)}
      />

      <div className={`fixed inset-y-0 left-0 z-50 transform lg:relative lg:translate-x-0 transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'} ${layout === 'sidebar' ? 'w-72 lg:block' : 'w-72 lg:hidden'}`}>
        <Sidebar 
          currentRole={activeWorkspace.role}
          activeMenuId={activeMenuId}
          onMenuSelect={(id) => {
              setActiveMenuId(id);
              setShowProfile(false);
          }}
          collapsed={sidebarCollapsed}
          onClose={() => setIsMobileMenuOpen(false)}
        />
      </div>

      <div className="flex-1 flex flex-col relative overflow-hidden w-full">
        <Header 
          user={currentUser}
          activeWorkspace={activeWorkspace}
          onWorkspaceSwitch={handleWorkspaceSwitch}
          onToggleSidebar={() => {
            if (window.innerWidth < 1024) {
              setIsMobileMenuOpen(true);
            } else {
              setSidebarCollapsed(!sidebarCollapsed);
            }
          }}
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

        <main className="flex-1 overflow-y-auto p-4 lg:p-8 scroll-smooth">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default App;
