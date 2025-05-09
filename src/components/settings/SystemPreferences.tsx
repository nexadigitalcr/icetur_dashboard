import React from 'react';
import { 
  Bell, 
  Globe, 
  Database,
  Video,
  MessageSquare,
  Calendar,
  Clock,
  HardDrive
} from 'lucide-react';

export function SystemPreferences() {
  return (
    <div className="col-span-3">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-carbon-gray rounded-xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <Bell className="w-6 h-6 text-accent-orange" />
            <h2 className="text-xl font-semibold">Configuración de Notificaciones</h2>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-carbon-black rounded-lg">
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-accent-orange" />
                <div>
                  <h3 className="font-medium">Recordatorios de Clases</h3>
                  <p className="text-sm text-gray-400">Notificaciones de próximas sesiones</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-carbon-gray peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-accent-orange/25 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent-orange"></div>
              </label>
            </div>

            <div className="flex items-center justify-between p-4 bg-carbon-black rounded-lg">
              <div className="flex items-center gap-3">
                <MessageSquare className="w-5 h-5 text-accent-orange" />
                <div>
                  <h3 className="font-medium">Mensajes Nuevos</h3>
                  <p className="text-sm text-gray-400">Notificaciones de mensajes entrantes</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-carbon-gray peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-accent-orange/25 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent-orange"></div>
              </label>
            </div>

            <div className="flex items-center justify-between p-4 bg-carbon-black rounded-lg">
              <div className="flex items-center gap-3">
                <Database className="w-5 h-5 text-accent-orange" />
                <div>
                  <h3 className="font-medium">Actualizaciones del Sistema</h3>
                  <p className="text-sm text-gray-400">Notificaciones de mantenimiento</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-carbon-gray peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-accent-orange/25 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent-orange"></div>
              </label>
            </div>
          </div>
        </div>

        <div className="bg-carbon-gray rounded-xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <Globe className="w-6 h-6 text-accent-orange" />
            <h2 className="text-xl font-semibold">Configuración Regional</h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">
                Idioma del Sistema
              </label>
              <select className="w-full bg-carbon-black text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-orange">
                <option value="es">Español</option>
                <option value="en">English</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">
                Zona Horaria
              </label>
              <div className="relative">
                <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <select className="w-full bg-carbon-black text-white pl-10 pr-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-orange">
                  <option value="america_costa_rica">América/Costa Rica (UTC-6)</option>
                  <option value="america_panama">América/Panamá (UTC-5)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">
                Formato de Fecha
              </label>
              <select className="w-full bg-carbon-black text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-orange">
                <option value="dd/mm/yyyy">DD/MM/YYYY</option>
                <option value="mm/dd/yyyy">MM/DD/YYYY</option>
                <option value="yyyy-mm-dd">YYYY-MM-DD</option>
              </select>
            </div>
          </div>
        </div>

        <div className="bg-carbon-gray rounded-xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <Video className="w-6 h-6 text-accent-orange" />
            <h2 className="text-xl font-semibold">Integraciones</h2>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-carbon-black rounded-lg">
              <div className="flex items-center gap-3">
                <img src="https://www.gstatic.com/meet/google_meet_horizontal_wordmark_2020q4_1x_icon_124_40_2373e79660dabbf194273d27aa7ee1f5.png" alt="Google Meet" className="w-8 h-8" />
                <div>
                  <h3 className="font-medium">Google Meet</h3>
                  <p className="text-sm text-gray-400">Integración para clases virtuales</p>
                </div>
              </div>
              <button className="text-accent-orange hover:text-accent-orange-light transition-colors">
                Configurar
              </button>
            </div>

            <div className="flex items-center justify-between p-4 bg-carbon-black rounded-lg">
              <div className="flex items-center gap-3">
                <img src="https://static.whatsapp.net/rsrc.php/v3/y7/r/DSxOAUB0raA.png" alt="WhatsApp" className="w-8 h-8" />
                <div>
                  <h3 className="font-medium">WhatsApp Business</h3>
                  <p className="text-sm text-gray-400">Integración para mensajería</p>
                </div>
              </div>
              <button className="text-accent-orange hover:text-accent-orange-light transition-colors">
                Configurar
              </button>
            </div>
          </div>
        </div>

        <div className="bg-carbon-gray rounded-xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <HardDrive className="w-6 h-6 text-accent-orange" />
            <h2 className="text-xl font-semibold">Almacenamiento y Rendimiento</h2>
          </div>

          <div className="space-y-4">
            <div className="p-4 bg-carbon-black rounded-lg">
              <h3 className="font-medium mb-2">Uso de Almacenamiento</h3>
              <div className="w-full h-2 bg-carbon-gray rounded-full overflow-hidden mb-2">
                <div className="h-full bg-accent-orange" style={{ width: '65%' }} />
              </div>
              <div className="flex justify-between text-sm text-gray-400">
                <span>65% usado</span>
                <span>6.5 GB de 10 GB</span>
              </div>
            </div>

            <div className="p-4 bg-carbon-black rounded-lg">
              <h3 className="font-medium mb-4">Caché del Sistema</h3>
              <button className="w-full bg-carbon-gray text-white px-4 py-2 rounded-lg hover:bg-opacity-80 transition-colors">
                Limpiar Caché (2.3 GB)
              </button>
            </div>

            <div className="p-4 bg-carbon-black rounded-lg">
              <h3 className="font-medium mb-2">Rendimiento</h3>
              <div className="space-y-2">
                <label className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">Calidad de Video</span>
                  <select className="bg-carbon-gray text-white px-2 py-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-orange">
                    <option value="high">Alta</option>
                    <option value="medium">Media</option>
                    <option value="low">Baja</option>
                  </select>
                </label>
                <label className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">Animaciones</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-carbon-gray peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-accent-orange/25 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent-orange"></div>
                  </label>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}