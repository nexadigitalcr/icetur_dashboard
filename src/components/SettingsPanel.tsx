import React, { useState } from 'react';
import { StatCard } from './StatCard';
import { 
  Users, 
  Shield, 
  Building2, 
  Settings as SettingsIcon,
  Bell,
  Globe,
  Database,
  Lock
} from 'lucide-react';
import { UserManagement } from './settings/UserManagement';
import { SecuritySettings } from './settings/SecuritySettings';
import { CompanySettings } from './settings/CompanySettings';
import { SystemPreferences } from './settings/SystemPreferences';

export function SettingsPanel() {
  const [currentSection, setCurrentSection] = useState<'users' | 'security' | 'company' | 'system'>('users');

  return (
    <div>
      <header className="mb-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Configuración</h1>
            <p className="text-gray-400 mt-1">
              Administra la configuración de ICETUR Virtual
            </p>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <button
          onClick={() => setCurrentSection('users')}
          className="text-left"
        >
          <StatCard
            title="Usuarios Activos"
            value="156"
            icon={Users}
            className={currentSection === 'users' ? 'ring-2 ring-accent-orange' : ''}
          />
        </button>
        <button
          onClick={() => setCurrentSection('security')}
          className="text-left"
        >
          <StatCard
            title="Nivel de Seguridad"
            value="Alto"
            icon={Shield}
            className={currentSection === 'security' ? 'ring-2 ring-accent-orange' : ''}
          />
        </button>
        <button
          onClick={() => setCurrentSection('company')}
          className="text-left"
        >
          <StatCard
            title="Información Empresarial"
            value="ICETUR"
            icon={Building2}
            className={currentSection === 'company' ? 'ring-2 ring-accent-orange' : ''}
          />
        </button>
        <button
          onClick={() => setCurrentSection('system')}
          className="text-left"
        >
          <StatCard
            title="Preferencias del Sistema"
            value="4 Servicios"
            icon={SettingsIcon}
            className={currentSection === 'system' ? 'ring-2 ring-accent-orange' : ''}
          />
        </button>
      </div>

      <div className="bg-carbon-gray rounded-xl p-4 mb-8">
        <div className="flex gap-4">
          <button
            onClick={() => setCurrentSection('users')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              currentSection === 'users'
                ? 'bg-accent-orange text-white'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Users className="w-5 h-5" />
            Usuarios
          </button>
          <button
            onClick={() => setCurrentSection('security')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              currentSection === 'security'
                ? 'bg-accent-orange text-white'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Lock className="w-5 h-5" />
            Seguridad
          </button>
          <button
            onClick={() => setCurrentSection('company')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              currentSection === 'company'
                ? 'bg-accent-orange text-white'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Building2 className="w-5 h-5" />
            Empresa
          </button>
          <button
            onClick={() => setCurrentSection('system')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              currentSection === 'system'
                ? 'bg-accent-orange text-white'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <SettingsIcon className="w-5 h-5" />
            Sistema
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {currentSection === 'users' && <UserManagement />}
        {currentSection === 'security' && <SecuritySettings />}
        {currentSection === 'company' && <CompanySettings />}
        {currentSection === 'system' && <SystemPreferences />}
      </div>
    </div>
  );
}