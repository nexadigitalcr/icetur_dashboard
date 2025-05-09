import React, { useState } from 'react';
import { 
  Shield, 
  Lock, 
  Key, 
  Smartphone,
  AlertTriangle,
  Eye,
  History,
  UserCheck
} from 'lucide-react';

export function SecuritySettings() {
  const [twoFactorSettings, setTwoFactorSettings] = useState({
    sms: false,
    authenticator: true
  });

  const [passwordPolicies, setPasswordPolicies] = useState({
    minLength: true,
    complexityRequired: true
  });

  return (
    <div className="col-span-3">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-carbon-gray rounded-xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <Shield className="w-6 h-6 text-accent-orange" />
            <h2 className="text-xl font-semibold">Autenticación de Dos Factores</h2>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-carbon-black rounded-lg">
              <div className="flex items-center gap-3">
                <Smartphone className="w-5 h-5 text-accent-orange" />
                <div>
                  <h3 className="font-medium">2FA por SMS</h3>
                  <p className="text-sm text-gray-400">Verificación por mensaje de texto</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  className="sr-only peer"
                  checked={twoFactorSettings.sms}
                  onChange={(e) => setTwoFactorSettings(prev => ({
                    ...prev,
                    sms: e.target.checked
                  }))}
                />
                <div className="w-11 h-6 bg-carbon-gray peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-accent-orange/25 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent-orange"></div>
              </label>
            </div>

            <div className="flex items-center justify-between p-4 bg-carbon-black rounded-lg">
              <div className="flex items-center gap-3">
                <Key className="w-5 h-5 text-accent-orange" />
                <div>
                  <h3 className="font-medium">Autenticador de Google</h3>
                  <p className="text-sm text-gray-400">Verificación por aplicación</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  className="sr-only peer"
                  checked={twoFactorSettings.authenticator}
                  onChange={(e) => setTwoFactorSettings(prev => ({
                    ...prev,
                    authenticator: e.target.checked
                  }))}
                />
                <div className="w-11 h-6 bg-carbon-gray peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-accent-orange/25 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent-orange"></div>
              </label>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="text-lg font-medium mb-4">Política de Contraseñas</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-carbon-black rounded-lg">
                <div className="flex items-center gap-3">
                  <Lock className="w-5 h-5 text-accent-orange" />
                  <span>Mínimo 8 caracteres</span>
                </div>
                <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
                  <UserCheck className="w-4 h-4 text-white" />
                </div>
              </div>
              <div className="flex items-center justify-between p-4 bg-carbon-black rounded-lg">
                <div className="flex items-center gap-3">
                  <Lock className="w-5 h-5 text-accent-orange" />
                  <span>Incluir números y símbolos</span>
                </div>
                <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
                  <UserCheck className="w-4 h-4 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-carbon-gray rounded-xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <Eye className="w-6 h-6 text-accent-orange" />
              <h2 className="text-xl font-semibold">Monitoreo de Actividad</h2>
            </div>

            <div className="space-y-4">
              <div className="p-4 bg-carbon-black rounded-lg">
                <div className="flex items-center gap-3 mb-2">
                  <AlertTriangle className="w-5 h-5 text-yellow-500" />
                  <h3 className="font-medium">Intentos de Inicio de Sesión</h3>
                </div>
                <p className="text-sm text-gray-400">3 intentos fallidos en la última hora</p>
              </div>

              <div className="p-4 bg-carbon-black rounded-lg">
                <div className="flex items-center gap-3 mb-2">
                  <History className="w-5 h-5 text-accent-orange" />
                  <h3 className="font-medium">Últimas Actividades</h3>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-gray-400">Cambio de contraseña - Hace 2 días</p>
                  <p className="text-sm text-gray-400">Activación de 2FA - Hace 5 días</p>
                  <p className="text-sm text-gray-400">Nuevo dispositivo - Hace 1 semana</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-carbon-gray rounded-xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <UserCheck className="w-6 h-6 text-accent-orange" />
              <h2 className="text-xl font-semibold">Sesiones Activas</h2>
            </div>

            <div className="space-y-4">
              <div className="p-4 bg-carbon-black rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">MacBook Pro - Chrome</h3>
                    <p className="text-sm text-gray-400">San José, Costa Rica</p>
                  </div>
                  <button className="text-accent-orange hover:text-accent-orange-light transition-colors">
                    Cerrar Sesión
                  </button>
                </div>
              </div>

              <div className="p-4 bg-carbon-black rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">iPhone 13 - Safari</h3>
                    <p className="text-sm text-gray-400">San José, Costa Rica</p>
                  </div>
                  <button className="text-accent-orange hover:text-accent-orange-light transition-colors">
                    Cerrar Sesión
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}