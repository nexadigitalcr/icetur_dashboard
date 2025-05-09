import React from 'react';
import { ArrowLeft, BookOpen, Users, Receipt, Wallet } from 'lucide-react';
import { StatCard } from './StatCard';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar
} from 'recharts';

interface ProfessorFinanceProfileProps {
  professor: {
    id: number;
    name: string;
    role: string;
    totalEarnings: string;
    pendingPayments: string;
    coursesCount: number;
    studentsCount: number;
    lastPayment: string;
    paymentHistory: Array<{ month: string; amount: number }>;
    courseBreakdown: Array<{ course: string; earnings: string }>;
  };
  onBack: () => void;
}

export function ProfessorFinanceProfile({ professor, onBack }: ProfessorFinanceProfileProps) {
  // Transform courseBreakdown data for the chart
  const courseData = professor.courseBreakdown.map(item => ({
    name: item.course,
    earnings: parseInt(item.earnings.replace(/[^0-9]/g, '')),
  }));

  return (
    <div className="col-span-3 space-y-4">
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Volver a la lista</span>
        </button>
      </div>

      <div className="bg-carbon-gray rounded-xl p-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-white">{professor.name}</h2>
          <p className="text-gray-400">{professor.role}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <StatCard
            title="Cursos Activos"
            value={professor.coursesCount.toString()}
            icon={BookOpen}
            trend={{ value: 2, isPositive: true }}
          />
          <StatCard
            title="Total Estudiantes"
            value={professor.studentsCount.toString()}
            icon={Users}
            trend={{ value: 8, isPositive: true }}
          />
          <StatCard
            title="Ingresos Totales"
            value={professor.totalEarnings}
            icon={Wallet}
            trend={{ value: 12, isPositive: true }}
          />
          <StatCard
            title="Pagos Pendientes"
            value={professor.pendingPayments}
            icon={Receipt}
            trend={{ value: 5, isPositive: false }}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-carbon-black p-4 rounded-xl">
            <h3 className="text-lg font-semibold mb-4">Historial de Pagos</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={professor.paymentHistory}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                  <XAxis dataKey="month" stroke="#666" />
                  <YAxis stroke="#666" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1E1E1E',
                      border: 'none',
                      borderRadius: '8px',
                      color: '#fff'
                    }}
                    formatter={(value: number) => [`₡${value.toLocaleString()}`, 'Pago']}
                  />
                  <Line
                    type="monotone"
                    dataKey="amount"
                    stroke="#FF5722"
                    strokeWidth={2}
                    dot={{ fill: '#FF5722' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-carbon-black p-4 rounded-xl">
            <h3 className="text-lg font-semibold mb-4">Ingresos por Curso</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={courseData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                  <XAxis dataKey="name" stroke="#666" />
                  <YAxis stroke="#666" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1E1E1E',
                      border: 'none',
                      borderRadius: '8px',
                      color: '#fff'
                    }}
                    formatter={(value: number) => [`₡${value.toLocaleString()}`, 'Ingresos']}
                  />
                  <Bar dataKey="earnings" fill="#FF5722" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}