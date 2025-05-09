import React from 'react';
import { ArrowLeft, Users, TrendingUp, Receipt } from 'lucide-react';
import { StatCard } from './StatCard';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

interface CourseFinanceProfileProps {
  course: {
    id: number;
    title: string;
    professor: string;
    enrolledStudents: number;
    pricePerStudent: number;
    totalRevenue: string;
    pendingPayments: string;
    profitMargin: number;
    revenueHistory: Array<{ month: string; revenue: number }>;
    enrollmentHistory: Array<{ month: string; students: number }>;
  };
  onBack: () => void;
}

export function CourseFinanceProfile({ course, onBack }: CourseFinanceProfileProps) {
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
          <h2 className="text-2xl font-bold text-white">{course.title}</h2>
          <p className="text-gray-400">Profesor: {course.professor}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <StatCard
            title="Estudiantes Activos"
            value={course.enrolledStudents.toString()}
            icon={Users}
            trend={{ value: 8, isPositive: true }}
          />
          <StatCard
            title="Precio por Estudiante"
            value={`₡${course.pricePerStudent.toLocaleString()}`}
            icon={Receipt}
            trend={{ value: 0, isPositive: true }}
          />
          <StatCard
            title="Ingresos Totales"
            value={course.totalRevenue}
            icon={TrendingUp}
            trend={{ value: 12, isPositive: true }}
          />
          <StatCard
            title="Margen de Beneficio"
            value={`${course.profitMargin}%`}
            icon={TrendingUp}
            trend={{ value: 5, isPositive: true }}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-carbon-black p-4 rounded-xl">
            <h3 className="text-lg font-semibold mb-4">Historial de Ingresos</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={course.revenueHistory}>
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
                    formatter={(value: number) => [`₡${value.toLocaleString()}`, 'Ingresos']}
                  />
                  <Line
                    type="monotone"
                    dataKey="revenue"
                    stroke="#FF5722"
                    strokeWidth={2}
                    dot={{ fill: '#FF5722' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-carbon-black p-4 rounded-xl">
            <h3 className="text-lg font-semibold mb-4">Tendencia de Estudiantes</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={course.enrollmentHistory}>
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
                    formatter={(value: number) => [`${value} estudiantes`, 'Matriculados']}
                  />
                  <Line
                    type="monotone"
                    dataKey="students"
                    stroke="#FF5722"
                    strokeWidth={2}
                    dot={{ fill: '#FF5722' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}