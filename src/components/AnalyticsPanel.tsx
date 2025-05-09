import React, { useState } from 'react';
import { StatCard } from './StatCard';
import { 
  Users, 
  GraduationCap, 
  BookOpen, 
  Wallet,
  TrendingUp,
  Calendar,
  Star,
  BarChart2
} from 'lucide-react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';

const enrollmentData = [
  { month: 'Ene', estudiantes: 180 },
  { month: 'Feb', estudiantes: 200 },
  { month: 'Mar', estudiantes: 250 },
  { month: 'Abr', estudiantes: 280 },
  { month: 'May', estudiantes: 310 },
  { month: 'Jun', estudiantes: 350 }
];

const professorWorkloadData = [
  { month: 'Ene', cursos: 12 },
  { month: 'Feb', cursos: 15 },
  { month: 'Mar', cursos: 18 },
  { month: 'Abr', cursos: 20 },
  { month: 'May', cursos: 22 },
  { month: 'Jun', cursos: 25 }
];

const courseRevenueData = [
  { curso: 'Guía General', ingresos: 6750000 },
  { curso: 'IA en Turismo', ingresos: 5040000 },
  { curso: 'Guía Naturalista', ingresos: 4500000 },
  { curso: 'Regulaciones', ingresos: 3800000 }
];

const studentDistributionData = [
  { name: 'Guía General', value: 45 },
  { name: 'IA en Turismo', value: 28 },
  { name: 'Guía Naturalista', value: 35 },
  { name: 'Regulaciones', value: 32 }
];

const COLORS = ['#FF5722', '#FF7043', '#FF8A65', '#FFAB91'];

export function AnalyticsPanel() {
  const [timeRange, setTimeRange] = useState('monthly');

  return (
    <div>
      <header className="mb-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Análisis y Estadísticas</h1>
            <p className="text-gray-400 mt-1">
              Métricas detalladas del rendimiento de ICETUR Virtual
            </p>
          </div>
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="bg-carbon-gray text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-orange"
          >
            <option value="monthly">Mensual</option>
            <option value="quarterly">Trimestral</option>
            <option value="yearly">Anual</option>
          </select>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard
          title="Estudiantes Activos"
          value="2,543"
          icon={Users}
          trend={{ value: 12, isPositive: true }}
        />
        <StatCard
          title="Tasa de Graduación"
          value="92%"
          icon={GraduationCap}
          trend={{ value: 5, isPositive: true }}
        />
        <StatCard
          title="Satisfacción Promedio"
          value="4.8"
          icon={Star}
          trend={{ value: 3, isPositive: true }}
        />
        <StatCard
          title="Ingresos Totales"
          value="₡29.5M"
          icon={Wallet}
          trend={{ value: 15, isPositive: true }}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-8">
        <div className="bg-carbon-gray p-6 rounded-xl">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold">Tendencia de Matrículas</h3>
            <TrendingUp className="w-5 h-5 text-accent-orange" />
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={enrollmentData}>
                <defs>
                  <linearGradient id="colorEstudiantes" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#FF5722" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#FF5722" stopOpacity={0}/>
                  </linearGradient>
                </defs>
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
                />
                <Area
                  type="monotone"
                  dataKey="estudiantes"
                  stroke="#FF5722"
                  fillOpacity={1}
                  fill="url(#colorEstudiantes)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-carbon-gray p-6 rounded-xl">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold">Distribución de Estudiantes</h3>
            <Users className="w-5 h-5 text-accent-orange" />
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={studentDistributionData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                >
                  {studentDistributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1E1E1E',
                    border: 'none',
                    borderRadius: '8px',
                    color: '#fff'
                  }}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-8">
        <div className="bg-carbon-gray p-6 rounded-xl">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold">Carga de Trabajo de Profesores</h3>
            <Calendar className="w-5 h-5 text-accent-orange" />
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={professorWorkloadData}>
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
                />
                <Line
                  type="monotone"
                  dataKey="cursos"
                  stroke="#FF5722"
                  strokeWidth={2}
                  dot={{ fill: '#FF5722' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-carbon-gray p-6 rounded-xl">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold">Ingresos por Curso</h3>
            <BarChart2 className="w-5 h-5 text-accent-orange" />
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={courseRevenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                <XAxis dataKey="curso" stroke="#666" />
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
                <Bar dataKey="ingresos" fill="#FF5722" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="bg-carbon-gray p-6 rounded-xl">
          <h3 className="text-lg font-semibold mb-4">Cursos Más Populares</h3>
          <div className="space-y-4">
            {studentDistributionData.map((course, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-carbon-black rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[index] }} />
                  <span>{course.name}</span>
                </div>
                <span className="text-accent-orange">{course.value} estudiantes</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-carbon-gray p-6 rounded-xl">
          <h3 className="text-lg font-semibold mb-4">Métricas de Profesores</h3>
          <div className="space-y-4">
            <div className="p-3 bg-carbon-black rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-400">Satisfacción Promedio</span>
                <span className="text-accent-orange">4.8/5.0</span>
              </div>
              <div className="w-full h-2 bg-carbon-gray rounded-full overflow-hidden">
                <div className="h-full bg-accent-orange" style={{ width: '96%' }} />
              </div>
            </div>
            <div className="p-3 bg-carbon-black rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-400">Tasa de Retención</span>
                <span className="text-accent-orange">92%</span>
              </div>
              <div className="w-full h-2 bg-carbon-gray rounded-full overflow-hidden">
                <div className="h-full bg-accent-orange" style={{ width: '92%' }} />
              </div>
            </div>
            <div className="p-3 bg-carbon-black rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-400">Cumplimiento de Programa</span>
                <span className="text-accent-orange">95%</span>
              </div>
              <div className="w-full h-2 bg-carbon-gray rounded-full overflow-hidden">
                <div className="h-full bg-accent-orange" style={{ width: '95%' }} />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-carbon-gray p-6 rounded-xl">
          <h3 className="text-lg font-semibold mb-4">Métricas Financieras</h3>
          <div className="space-y-4">
            <div className="p-3 bg-carbon-black rounded-lg">
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Ingresos Totales</span>
                <span className="text-accent-orange">₡29.5M</span>
              </div>
            </div>
            <div className="p-3 bg-carbon-black rounded-lg">
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Pagos Pendientes</span>
                <span className="text-accent-orange">₡4.8M</span>
              </div>
            </div>
            <div className="p-3 bg-carbon-black rounded-lg">
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Margen de Beneficio</span>
                <span className="text-accent-orange">72%</span>
              </div>
            </div>
            <div className="p-3 bg-carbon-black rounded-lg">
              <div className="flex justify-between items-center">
                <span className="text-gray-400">ROI Promedio</span>
                <span className="text-accent-orange">185%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}