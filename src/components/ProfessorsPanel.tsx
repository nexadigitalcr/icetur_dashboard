import React, { useState } from 'react';
import { StatCard } from './StatCard';
import { Users, BookOpen, Wallet, Award } from 'lucide-react';
import { ProfessorProfile } from './ProfessorProfile';
import { ProfessorList } from './ProfessorList';
import { ProfessorForm } from './ProfessorForm';

const initialMockProfessors = [
  {
    id: 1,
    name: 'Luis Diego Madrigal',
    specialty: 'Instructor General ICETUR',
    email: 'luis.madrigal@icetur.com',
    phone: '+506 8888-1111',
    image: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?fit=crop&w=150&h=150',
    assignedStudents: 45,
    completedCourses: 128,
    activeGroups: 4,
    payments: {
      completed: '₡2,850,000',
      pending: '₡450,000'
    },
    courses: [
      'Guía de Turismo General',
      'Guía de Turismo Local',
      'Ama de Llaves',
      'Conductor Turístico Certificado'
    ],
    graduationRate: 92,
    averageRating: 4.8
  },
  {
    id: 2,
    name: 'Dallia Urbina',
    specialty: 'Regulaciones y Asuntos Legales',
    email: 'dallia.urbina@icetur.com',
    phone: '+506 8888-2222',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?fit=crop&w=150&h=150',
    assignedStudents: 28,
    completedCourses: 86,
    activeGroups: 2,
    payments: {
      completed: '₡1,950,000',
      pending: '₡350,000'
    },
    courses: [
      'Recertificación ICT',
      'Program Director (MICE)'
    ],
    graduationRate: 95,
    averageRating: 4.9
  },
  {
    id: 3,
    name: 'José Méndez',
    specialty: 'Inteligencia Artificial en Turismo',
    email: 'jose.mendez@icetur.com',
    phone: '+506 8888-3333',
    image: 'https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?fit=crop&w=150&h=150',
    assignedStudents: 32,
    completedCourses: 24,
    activeGroups: 3,
    payments: {
      completed: '₡2,250,000',
      pending: '₡250,000'
    },
    courses: [
      'Inteligencia Artificial Aplicada al Turismo'
    ],
    graduationRate: 88,
    averageRating: 4.7
  },
  {
    id: 4,
    name: 'Andrés Chávez',
    specialty: 'Biodiversidad y Sostenibilidad',
    email: 'andres.chavez@icetur.com',
    phone: '+506 8888-4444',
    image: 'https://images.unsplash.com/photo-1542178243-bc20204b769f?fit=crop&w=150&h=150',
    assignedStudents: 35,
    completedCourses: 92,
    activeGroups: 3,
    payments: {
      completed: '₡2,150,000',
      pending: '₡300,000'
    },
    courses: [
      'Guía Naturalista'
    ],
    graduationRate: 94,
    averageRating: 4.9
  }
];

export function ProfessorsPanel() {
  const [professors, setProfessors] = useState(initialMockProfessors);
  const [selectedProfessor, setSelectedProfessor] = useState<number | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);

  const handleAddProfessor = (newProfessor: any) => {
    setProfessors([...professors, newProfessor]);
    setShowAddForm(false);
  };

  const handleUpdateProfessor = (updatedProfessor: any) => {
    setProfessors(professors.map(professor => 
      professor.id === updatedProfessor.id ? updatedProfessor : professor
    ));
  };

  const activeProfessor = professors.find(p => p.id === selectedProfessor);

  // Calculate total metrics
  const totalStudents = professors.reduce((sum, prof) => sum + prof.assignedStudents, 0);
  const averageCoursesPerProfessor = professors.reduce((sum, prof) => sum + prof.courses.length, 0) / professors.length;
  const totalPendingPayments = professors.reduce((sum, prof) => 
    sum + parseInt(prof.payments.pending.replace(/[^0-9]/g, '')), 0
  );

  return (
    <div>
      <header className="mb-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">
              {selectedProfessor ? activeProfessor?.name : 'Gestión de Profesores'}
            </h1>
            <p className="text-gray-400 mt-1">
              {selectedProfessor ? activeProfessor?.specialty : 'Administra los profesores de ICETUR Virtual'}
            </p>
          </div>
          {!selectedProfessor && (
            <button
              onClick={() => setShowAddForm(true)}
              className="bg-accent-orange hover:bg-accent-orange-light text-white px-4 py-2 rounded-lg transition-colors"
            >
              + Nuevo Profesor
            </button>
          )}
        </div>
      </header>

      {!selectedProfessor && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard
            title="Total de Profesores"
            value={professors.length.toString()}
            icon={Users}
            trend={{ value: 2, isPositive: true }}
          />
          <StatCard
            title="Estudiantes Asignados"
            value={totalStudents.toString()}
            icon={Award}
            trend={{ value: 5, isPositive: true }}
          />
          <StatCard
            title="Promedio de Cursos"
            value={averageCoursesPerProfessor.toFixed(1)}
            icon={BookOpen}
            trend={{ value: 3, isPositive: true }}
          />
          <StatCard
            title="Pagos Pendientes"
            value={`₡${totalPendingPayments.toLocaleString()}`}
            icon={Wallet}
            trend={{ value: 2, isPositive: false }}
          />
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {selectedProfessor === null ? (
          <ProfessorList 
            professors={professors}
            onSelectProfessor={setSelectedProfessor}
          />
        ) : (
          <ProfessorProfile 
            professor={activeProfessor!}
            onBack={() => setSelectedProfessor(null)}
            onUpdate={handleUpdateProfessor}
          />
        )}
      </div>

      {showAddForm && (
        <ProfessorForm
          onClose={() => setShowAddForm(false)}
          onSave={handleAddProfessor}
        />
      )}
    </div>
  );
}