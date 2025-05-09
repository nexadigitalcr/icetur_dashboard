import React, { useState } from 'react';
import { 
  Building2, 
  Mail, 
  Phone, 
  MapPin,
  CreditCard,
  Image,
  Globe,
  DollarSign
} from 'lucide-react';

export function CompanySettings() {
  const [companyInfo, setCompanyInfo] = useState({
    name: 'ICETUR Virtual',
    email: 'info@icetur.com',
    phone: '+506 2222-1111',
    address: 'San José, Costa Rica',
    website: 'www.icetur.com',
    logo: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?fit=crop&w=150&h=150'
  });

  const [paymentSettings, setPaymentSettings] = useState({
    creditCard: true,
    bankTransfer: true,
    paypal: false,
    showTaxes: true
  });

  return (
    <div className="col-span-3">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-carbon-gray rounded-xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <Building2 className="w-6 h-6 text-accent-orange" />
            <h2 className="text-xl font-semibold">Información de la Empresa</h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">
                Nombre de la Empresa
              </label>
              <input
                type="text"
                value={companyInfo.name}
                onChange={(e) => setCompanyInfo({ ...companyInfo, name: e.target.value })}
                className="w-full bg-carbon-black text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-orange"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">
                Correo Electrónico
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="email"
                  value={companyInfo.email}
                  onChange={(e) => setCompanyInfo({ ...companyInfo, email: e.target.value })}
                  className="w-full bg-carbon-black text-white pl-10 pr-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-orange"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">
                Teléfono
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="tel"
                  value={companyInfo.phone}
                  onChange={(e) => setCompanyInfo({ ...companyInfo, phone: e.target.value })}
                  className="w-full bg-carbon-black text-white pl-10 pr-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-orange"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">
                Dirección
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  value={companyInfo.address}
                  onChange={(e) => setCompanyInfo({ ...companyInfo, address: e.target.value })}
                  className="w-full bg-carbon-black text-white pl-10 pr-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-orange"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">
                Sitio Web
              </label>
              <div className="relative">
                <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="url"
                  value={companyInfo.website}
                  onChange={(e) => setCompanyInfo({ ...companyInfo, website: e.target.value })}
                  className="w-full bg-carbon-black text-white pl-10 pr-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-orange"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">
                Logo de la Empresa
              </label>
              <div className="flex items-center gap-4">
                <img
                  src={companyInfo.logo}
                  alt="Logo"
                  className="w-16 h-16 rounded-lg object-cover"
                />
                <button className="flex items-center gap-2 bg-carbon-black text-white px-4 py-2 rounded-lg hover:bg-opacity-80 transition-colors">
                  <Image className="w-4 h-4" />
                  Cambiar Logo
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-carbon-gray rounded-xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <CreditCard className="w-6 h-6 text-accent-orange" />
              <h2 className="text-xl font-semibold">Configuración de Pagos</h2>
            </div>

            <div className="space-y-4">
              <div className="p-4 bg-carbon-black rounded-lg">
                <h3 className="font-medium mb-4">Métodos de Pago Aceptados</h3>
                <div className="space-y-2">
                  <label className="flex items-center gap-2">
                    <input 
                      type="checkbox" 
                      checked={paymentSettings.creditCard}
                      onChange={(e) => setPaymentSettings(prev => ({
                        ...prev,
                        creditCard: e.target.checked
                      }))}
                      className="rounded text-accent-orange focus:ring-accent-orange" 
                    />
                    <span>Tarjeta de Crédito/Débito</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input 
                      type="checkbox" 
                      checked={paymentSettings.bankTransfer}
                      onChange={(e) => setPaymentSettings(prev => ({
                        ...prev,
                        bankTransfer: e.target.checked
                      }))}
                      className="rounded text-accent-orange focus:ring-accent-orange" 
                    />
                    <span>Transferencia Bancaria</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input 
                      type="checkbox" 
                      checked={paymentSettings.paypal}
                      onChange={(e) => setPaymentSettings(prev => ({
                        ...prev,
                        paypal: e.target.checked
                      }))}
                      className="rounded text-accent-orange focus:ring-accent-orange" 
                    />
                    <span>PayPal</span>
                  </label>
                </div>
              </div>

              <div className="p-4 bg-carbon-black rounded-lg">
                <h3 className="font-medium mb-4">Configuración de Moneda</h3>
                <div className="flex items-center gap-2 mb-4">
                  <DollarSign className="w-5 h-5 text-accent-orange" />
                  <select className="flex-1 bg-carbon-gray text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-orange">
                    <option value="CRC">Colones (CRC)</option>
                    <option value="USD">Dólares (USD)</option>
                  </select>
                </div>
                <label className="flex items-center gap-2">
                  <input 
                    type="checkbox" 
                    checked={paymentSettings.showTaxes}
                    onChange={(e) => setPaymentSettings(prev => ({
                      ...prev,
                      showTaxes: e.target.checked
                    }))}
                    className="rounded text-accent-orange focus:ring-accent-orange" 
                  />
                  <span>Mostrar impuestos por separado</span>
                </label>
              </div>
            </div>
          </div>

          <div className="bg-carbon-gray rounded-xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <Globe className="w-6 h-6 text-accent-orange" />
              <h2 className="text-xl font-semibold">Personalización</h2>
            </div>

            <div className="space-y-4">
              <div className="p-4 bg-carbon-black rounded-lg">
                <h3 className="font-medium mb-4">Tema del Sistema</h3>
                <div className="grid grid-cols-3 gap-2">
                  <button className="p-4 rounded-lg bg-carbon-gray border-2 border-accent-orange">
                    <div className="w-full h-20 rounded bg-carbon-black mb-2" />
                    <span className="text-sm">Oscuro</span>
                  </button>
                  <button className="p-4 rounded-lg bg-carbon-gray">
                    <div className="w-full h-20 rounded bg-white mb-2" />
                    <span className="text-sm">Claro</span>
                  </button>
                  <button className="p-4 rounded-lg bg-carbon-gray">
                    <div className="w-full h-20 rounded bg-gradient-to-b from-white to-carbon-black mb-2" />
                    <span className="text-sm">Auto</span>
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