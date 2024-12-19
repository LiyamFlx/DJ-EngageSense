import React from 'react';
import { Menu, Settings, User } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
      <nav className="bg-black/30 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Menu className="h-6 w-6 text-white/80 hover:text-white cursor-pointer" />
              <span className="ml-3 text-xl font-bold text-white">EngageSense</span>
            </div>
            <div className="flex items-center space-x-4">
              <Settings className="h-5 w-5 text-white/80 hover:text-white cursor-pointer" />
              <User className="h-5 w-5 text-white/80 hover:text-white cursor-pointer" />
            </div>
          </div>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
};

export default Layout;