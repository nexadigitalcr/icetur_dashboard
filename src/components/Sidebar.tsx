import React from 'react';
import { 
  LayoutDashboard, 
  Users, 
  GraduationCap, 
  BookOpen, 
  DollarSign, 
  BarChart2, 
  MessageSquare, 
  Settings,
  HelpCircle
} from 'lucide-react';
import { RealTimeNotifications } from './RealTimeNotifications';

interface SidebarProps {
  onViewChange: (view: string) => void;
  currentView: string;
}

const menuItems = [
  { icon: LayoutDashboard, label: 'Vista General', view: 'overview' },
  { icon: Users, label: 'Estudiantes', view: 'students' },
  { icon: GraduationCap, label: 'Profesores', view: 'professors' },
  { icon: BookOpen, label: 'Cursos', view: 'courses' },
  { icon: DollarSign, label: 'Finanzas', view: 'finance' },
  { icon: BarChart2, label: 'Análisis', view: 'analytics' },
  { icon: MessageSquare, label: 'Centro de Comunicaciones', view: 'notifications' },
  { icon: Settings, label: 'Configuración', view: 'settings' },
  { icon: HelpCircle, label: 'Centro de Ayuda', view: 'help' }
];

export function Sidebar({ onViewChange, currentView }: SidebarProps) {
  return (
    <div className="h-screen w-64 bg-carbon-gray fixed left-0 top-0 p-4">
      <div className="flex items-center justify-between mb-8 px-2">
        <div className="flex items-center gap-2">
          <GraduationCap className="w-8 h-8 text-accent-orange" />
          <h1 className="text-white text-xl font-bold">Icetur Virtual</h1>
        </div>
        <RealTimeNotifications />
      </div>
      
      <nav className="space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.label}
            onClick={() => onViewChange(item.view)}
            className={`w-full flex items-center gap-3 px-2 py-2 rounded-lg transition-colors ${
              currentView === item.view
                ? 'bg-accent-orange text-white' 
                : 'text-gray-400 hover:bg-carbon-black hover:text-white'
            }`}
          >
            <item.icon className="w-5 h-5" />
            <span>{item.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}