import React, { useState } from 'react';
import { StatCard } from './StatCard';
import { Wallet, TrendingUp, AlertCircle, Receipt, Building2, GraduationCap } from 'lucide-react';
import { FinanceList } from './FinanceList';
import { CourseFinanceProfile } from './CourseFinanceProfile';
import { ProfessorFinanceProfile } from './ProfessorFinanceProfile';
import { InvoiceForm } from './InvoiceForm';

const initialMockFinances = {
  courses: [
    {
      id: 1,
      title: 'Guía de Turismo General',
      professor: 'Luis Diego Madrigal',
      enrolledStudents: 45,
      pricePerStudent: 150000,
      totalRevenue: '₡6,750,000',
      pendingPayments: '₡1,350,000',
      profitMargin: 75,
      monthlyTrend: 12,
      lastUpdate: '2024-03-10',
      revenueHistory: [
        { month: 'Ene', revenue: 4500000 },
        { month: 'Feb', revenue: 5200000 },
        { month: 'Mar', revenue: 6750000 }
      ],
      enrollmentHistory: [
        { month: 'Ene', students: 30 },
        { month: 'Feb', students: 35 },
        { month: 'Mar', students: 45 }
      ]
    },
    {
      id: 2,
      title: 'Inteligencia Artificial Aplicada al Turismo',
      professor: 'José Méndez',
      enrolledStudents: 28,
      pricePerStudent: 180000,
      totalRevenue: '₡5,040,000',
      pendingPayments: '₡900,000',
      profitMargin: 70,
      monthlyTrend: 15,
      lastUpdate: '2024-03-10',
      revenueHistory: [
        { month: 'Ene', revenue: 3600000 },
        { month: 'Feb', revenue: 4320000 },
        { month: 'Mar', revenue: 5040000 }
      ],
      enrollmentHistory: [
        { month: 'Ene', students: 20 },
        { month: 'Feb', students: 24 },
        { month: 'Mar', students: 28 }
      ]
    }
  ],
  professors: [
    {
      id: 1,
      name: 'Luis Diego Madrigal',
      role: 'Instructor General ICETUR',
      totalEarnings: '₡4,850,000',
      pendingPayments: '₡950,000',
      coursesCount: 4,
      studentsCount: 145,
      lastPayment: '2024-02-28',
      paymentHistory: [
        { month: 'Ene', amount: 1500000 },
        { month: 'Feb', amount: 1650000 },
        { month: 'Mar', amount: 1700000 }
      ],
      courseBreakdown: [
        { course: 'Guía de Turismo General', earnings: '₡2,500,000' },
        { course: 'Guía de Turismo Local', earnings: '₡1,350,000' },
        { course: 'Conductor Turístico', earnings: '₡1,000,000' }
      ]
    },
    {
      id: 2,
      name: 'José Méndez',
      role: 'Especialista en IA y Turismo',
      totalEarnings: '₡3,750,000',
      pendingPayments: '₡850,000',
      coursesCount: 2,
      studentsCount: 85,
      lastPayment: '2024-02-28',
      paymentHistory: [
        { month: 'Ene', amount: 1200000 },
        { month: 'Feb', amount: 1250000 },
        { month: 'Mar', amount: 1300000 }
      ],
      courseBreakdown: [
        { course: 'IA Aplicada al Turismo', earnings: '₡2,250,000' },
        { course: 'Tecnología Turística', earnings: '₡1,500,000' }
      ]
    }
  ]
};

export function FinancePanel() {
  const [finances] = useState(initialMockFinances);
  const [selectedView, setSelectedView] = useState<'courses' | 'professors'>('courses');
  const [selectedItem, setSelectedItem] = useState<number | null>(null);
  const [showInvoiceForm, setShowInvoiceForm] = useState(false);

  // Calculate total metrics
  const totalRevenue = finances.courses.reduce((sum, course) => {
    const revenue = parseInt(course.totalRevenue.replace(/[^0-9]/g, ''));
    return sum + revenue;
  }, 0);

  const totalPendingPayments = finances.courses.reduce((sum, course) => {
    const pending = parseInt(course.pendingPayments.replace(/[^0-9]/g, ''));
    return sum + pending;
  }, 0);

  const totalProfessorPayments = finances.professors.reduce((sum, prof) => {
    const earnings = parseInt(prof.totalEarnings.replace(/[^0-9]/g, ''));
    return sum + earnings;
  }, 0);

  const averageProfitMargin = finances.courses.reduce((sum, course) => 
    sum + course.profitMargin, 0) / finances.courses.length;

  const handleCreateInvoice = (invoiceData: any) => {
    console.log('Creating invoice:', invoiceData);
    setShowInvoiceForm(false);
  };

  return (
    <div>
      <header className="mb-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Gestión Financiera</h1>
            <p className="text-gray-400 mt-1">
              Administra las finanzas de ICETUR Virtual
            </p>
          </div>
          <button
            onClick={() => setShowInvoiceForm(true)}
            className="bg-accent-orange hover:bg-accent-orange-light text-white px-4 py-2 rounded-lg transition-colors"
          >
            + Nueva Factura
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard
          title="Ingresos Totales"
          value={`₡${totalRevenue.toLocaleString()}`}
          icon={Wallet}
          trend={{ value: 15, isPositive: true }}
        />
        <StatCard
          title="Pagos Pendientes"
          value={`₡${totalPendingPayments.toLocaleString()}`}
          icon={AlertCircle}
          trend={{ value: 5, isPositive: false }}
        />
        <StatCard
          title="Pagos a Profesores"
          value={`₡${totalProfessorPayments.toLocaleString()}`}
          icon={Receipt}
          trend={{ value: 8, isPositive: true }}
        />
        <StatCard
          title="Margen de Beneficio"
          value={`${averageProfitMargin.toFixed(1)}%`}
          icon={TrendingUp}
          trend={{ value: 3, isPositive: true }}
        />
      </div>

      <div className="bg-carbon-gray rounded-xl p-4 mb-8">
        <div className="flex gap-4">
          <button
            onClick={() => {
              setSelectedView('courses');
              setSelectedItem(null);
            }}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              selectedView === 'courses'
                ? 'bg-accent-orange text-white'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Building2 className="w-5 h-5" />
            Finanzas por Curso
          </button>
          <button
            onClick={() => {
              setSelectedView('professors');
              setSelectedItem(null);
            }}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              selectedView === 'professors'
                ? 'bg-accent-orange text-white'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <GraduationCap className="w-5 h-5" />
            Finanzas por Profesor
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {selectedItem === null ? (
          <FinanceList
            data={selectedView === 'courses' ? finances.courses : finances.professors}
            type={selectedView}
            onSelect={setSelectedItem}
          />
        ) : selectedView === 'courses' ? (
          <CourseFinanceProfile
            course={finances.courses.find(c => c.id === selectedItem)!}
            onBack={() => setSelectedItem(null)}
          />
        ) : (
          <ProfessorFinanceProfile
            professor={finances.professors.find(p => p.id === selectedItem)!}
            onBack={() => setSelectedItem(null)}
          />
        )}
      </div>

      {showInvoiceForm && (
        <InvoiceForm
          onClose={() => setShowInvoiceForm(false)}
          onSave={handleCreateInvoice}
          professors={finances.professors}
          courses={finances.courses}
        />
      )}
    </div>
  );
}