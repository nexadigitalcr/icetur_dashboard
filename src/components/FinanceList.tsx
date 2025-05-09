import React from 'react';
import { Search, TrendingUp, TrendingDown, DollarSign } from 'lucide-react';

interface FinanceListProps {
  data: any[];
  type: 'courses' | 'professors';
  onSelect: (id: number) => void;
}

export function FinanceList({ data, type, onSelect }: FinanceListProps) {
  return (
    <div className="col-span-3 bg-carbon-gray rounded-xl p-4">
      <div className="flex items-center gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder={`Buscar ${type === 'courses' ? 'cursos' : 'profesores'}...`}
            className="w-full bg-carbon-black text-white pl-10 pr-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-orange"
          />
        </div>
        <select className="bg-carbon-black text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-orange">
          <option value="all">Todos los Registros</option>
          <option value="pending">Pagos Pendientes</option>
          <option value="completed">Pagos Completados</option>
        </select>
      </div>

      <div className="space-y-4">
        {data.map((item) => (
          <button
            key={item.id}
            onClick={() => onSelect(item.id)}
            className="w-full bg-carbon-black p-4 rounded-lg hover:bg-opacity-80 transition-colors"
          >
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <h3 className="font-semibold text-white">
                  {type === 'courses' ? item.title : item.name}
                </h3>
                <p className="text-gray-400 text-sm">
                  {type === 'courses' ? item.professor : item.role}
                </p>
              </div>
              <div className="text-right">
                <div className="text-lg font-semibold text-white">
                  {type === 'courses' ? item.totalRevenue : item.totalEarnings}
                </div>
                <div className="flex items-center gap-2 justify-end mt-1">
                  {item.monthlyTrend > 0 ? (
                    <TrendingUp className="w-4 h-4 text-green-500" />
                  ) : (
                    <TrendingDown className="w-4 h-4 text-red-500" />
                  )}
                  <span className={`text-sm ${
                    item.monthlyTrend > 0 ? 'text-green-500' : 'text-red-500'
                  }`}>
                    {Math.abs(item.monthlyTrend)}% vs mes anterior
                  </span>
                </div>
              </div>
              <div className="flex flex-col items-end ml-4">
                <div className="text-sm text-gray-400">Pendiente</div>
                <div className="flex items-center gap-1 text-accent-orange">
                  <DollarSign className="w-4 h-4" />
                  <span>{item.pendingPayments}</span>
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}