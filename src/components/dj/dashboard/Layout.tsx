import React from 'react';
import { DashboardHeader } from './DashboardHeader';
import { MainPanel } from './MainPanel';
import { SidePanel } from './SidePanel';

interface LayoutProps {
  children?: React.ReactNode;
  showSettings: boolean;
  onToggleSettings: () => void;
}

export const Layout: React.FC<LayoutProps> = ({
  children,
  showSettings,
  onToggleSettings
}) => (
  <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900">
    <div className="max-w-7xl mx-auto px-4 py-8">
      <DashboardHeader 
        showSettings={showSettings}
        onToggleSettings={onToggleSettings}
      />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Main Analysis Panel - Takes up 3 columns */}
        <div className="lg:col-span-3">
          <MainPanel />
        </div>

        {/* Side Panel - Takes up 1 column */}
        <div className="lg:col-span-1">
          <SidePanel />
        </div>
      </div>
    </div>
  </div>
);