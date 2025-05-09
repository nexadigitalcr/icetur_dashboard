import { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { PanelDeControl } from './components/PanelDeControl';
import { StudentsPanel } from './components/StudentsPanel';
import { ProfessorsPanel } from './components/ProfessorsPanel';
import { CoursesPanel } from './components/CoursesPanel';
import { FinancePanel } from './components/FinancePanel';
import { AnalyticsPanel } from './components/AnalyticsPanel';
import { CommunicationCenter } from './components/CommunicationCenter';
import { SettingsPanel } from './components/SettingsPanel';
import { HelpCenter } from './components/HelpCenter';

function App() {
  const [currentView, setCurrentView] = useState('overview');

  return (
    <div className="min-h-screen bg-carbon-black text-white">
      <Sidebar onViewChange={setCurrentView} currentView={currentView} />
      
      <main className="ml-64 p-8">
        <div className="max-w-7xl mx-auto">
          {currentView === 'overview' ? (
            <PanelDeControl />
          ) : currentView === 'students' ? (
            <StudentsPanel />
          ) : currentView === 'professors' ? (
            <ProfessorsPanel />
          ) : currentView === 'courses' ? (
            <CoursesPanel />
          ) : currentView === 'finance' ? (
            <FinancePanel />
          ) : currentView === 'analytics' ? (
            <AnalyticsPanel />
          ) : currentView === 'notifications' ? (
            <CommunicationCenter />
          ) : currentView === 'settings' ? (
            <SettingsPanel />
          ) : currentView === 'help' ? (
            <HelpCenter />
          ) : null}
        </div>
      </main>
    </div>
  );
}

export default App;