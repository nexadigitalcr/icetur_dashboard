import React, { useState } from 'react';
import { StatCard } from './StatCard';
import { Users, GraduationCap, Clock, Wallet } from 'lucide-react';
import { StudentProfile } from './StudentProfile';
import { StudentList } from './StudentList';
import { StudentForm } from './StudentForm';

const ICETUR_PROGRAMS = [
  'Guía de Turismo General',
  'Guía de Turismo Local',
  'Guía Naturalista',
  'Recertificación ICT',
  'Guía de Turismo Aventura',
  'Ama de Llaves',
  'Conductor Turístico Certificado',
  'Manipulación de Alimentos',
  'Curso de Primeros Auxilios & RCP',
  'Program Director (MICE)',
  'Inteligencia Artificial Aplicada al Turismo',
];

const initialMockStudents = [
  {
    id: 1,
    name: 'Juan Pérez',
    program: 'Guía de Turismo General',
    email: 'juan.perez@email.com',
    phone: '+506 8888-8888',
    progress: 75,
    payments: '₡450,000',
    pendingPayment: '₡150,000',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?fit=crop&w=150&h=150',
    professor: 'Luis Diego Madrigal',
  },
  {
    id: 2,
    name: 'María González',
    program: 'Inteligencia Artificial Aplicada al Turismo',
    email: 'maria.gonzalez@email.com',
    phone: '+506 8888-8889',
    progress: 60,
    payments: '₡300,000',
    pendingPayment: '₡300,000',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?fit=crop&w=150&h=150',
    professor: 'José Méndez',
  },
  {
    id: 3,
    name: 'Carlos Ramírez',
    program: 'Guía Naturalista',
    email: 'carlos.ramirez@email.com',
    phone: '+506 8888-8890',
    progress: 85,
    payments: '₡600,000',
    pendingPayment: '₡200,000',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?fit=crop&w=150&h=150',
    professor: 'Andrés Chávez',
  },
  {
    id: 4,
    name: 'Fernanda López',
    program: 'Recertificación ICT',
    email: 'fernanda.lopez@email.com',
    phone: '+506 8888-8891',
    progress: 45,
    payments: '₡250,000',
    pendingPayment: '₡250,000',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?fit=crop&w=150&h=150',
    professor: 'Dallia Urbina',
  },
  {
    id: 5,
    name: 'Andrés Vega',
    program: 'Guía de Turismo Aventura',
    email: 'andres.vega@email.com',
    phone: '+506 8888-8892',
    progress: 90,
    payments: '₡700,000',
    pendingPayment: '₡100,000',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?fit=crop&w=150&h=150',
    professor: 'Luis Diego Madrigal',
  },
  {
    id: 6,
    name: 'Luisa Fernández',
    program: 'Inteligencia Artificial Aplicada al Turismo',
    email: 'luisa.fernandez@email.com',
    phone: '+506 8888-8893',
    progress: 70,
    payments: '₡400,000',
    pendingPayment: '₡200,000',
    image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?fit=crop&w=150&h=150',
    professor: 'José Méndez',
  },
  {
    id: 7,
    name: 'Jorge Castillo',
    program: 'Conductor Turístico Certificado',
    email: 'jorge.castillo@email.com',
    phone: '+506 8888-8894',
    progress: 55,
    payments: '₡350,000',
    pendingPayment: '₡350,000',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?fit=crop&w=150&h=150',
    professor: 'Luis Diego Madrigal',
  },
  {
    id: 8,
    name: 'Camila Rojas',
    program: 'Manipulación de Alimentos',
    email: 'camila.rojas@email.com',
    phone: '+506 8888-8895',
    progress: 95,
    payments: '₡550,000',
    pendingPayment: '₡50,000',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?fit=crop&w=150&h=150',
    professor: 'Luis Diego Madrigal',
  },
  {
    id: 9,
    name: 'Sofía Navarro',
    program: 'Curso de Primeros Auxilios & RCP',
    email: 'sofia.navarro@email.com',
    phone: '+506 8888-8896',
    progress: 80,
    payments: '₡480,000',
    pendingPayment: '₡120,000',
    image: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?fit=crop&w=150&h=150',
    professor: 'Luis Diego Madrigal',
  },
  {
    id: 10,
    name: 'Raúl Méndez',
    program: 'Program Director (MICE)',
    email: 'raul.mendez@email.com',
    phone: '+506 8888-8897',
    progress: 100,
    payments: '₡800,000',
    pendingPayment: '₡0',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?fit=crop&w=150&h=150',
    professor: 'Dallia Urbina',
  },
];

export function StudentsPanel() {
  const [students, setStudents] = useState(initialMockStudents);
  const [selectedStudent, setSelectedStudent] = useState<number | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);

  const handleAddStudent = (newStudent: any) => {
    setStudents([...students, newStudent]);
    setShowAddForm(false);
  };

  const handleUpdateStudent = (updatedStudent: any) => {
    setStudents(students.map(student => 
      student.id === updatedStudent.id ? updatedStudent : student
    ));
  };

  const activeStudent = students.find(s => s.id === selectedStudent);

  return (
    <div>
      <header className="mb-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">
              {selectedStudent ? activeStudent?.name : 'Gestión de Estudiantes'}
            </h1>
            <p className="text-gray-400 mt-1">
              {selectedStudent ? activeStudent?.program : 'Administra los estudiantes de ICETUR Virtual'}
            </p>
          </div>
          {!selectedStudent && (
            <button
              onClick={() => setShowAddForm(true)}
              className="bg-accent-orange hover:bg-accent-orange-light text-white px-4 py-2 rounded-lg transition-colors"
            >
              + Nuevo Estudiante
            </button>
          )}
        </div>
      </header>

      {!selectedStudent && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard
            title="Estudiantes Activos"
            value={students.length.toString()}
            icon={Users}
            trend={{ value: 8, isPositive: true }}
          />
          <StatCard
            title="Promedio de Asistencia"
            value="85%"
            icon={Clock}
            trend={{ value: 3, isPositive: true }}
          />
          <StatCard
            title="Tasa de Graduación"
            value="92%"
            icon={GraduationCap}
            trend={{ value: 5, isPositive: true }}
          />
          <StatCard
            title="Pagos Pendientes"
            value="₡4,850,000"
            icon={Wallet}
            trend={{ value: 2, isPositive: false }}
          />
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {selectedStudent === null ? (
          <StudentList 
            students={students}
            onSelectStudent={setSelectedStudent}
          />
        ) : (
          <StudentProfile 
            student={activeStudent!}
            onBack={() => setSelectedStudent(null)}
            onUpdate={handleUpdateStudent}
          />
        )}
      </div>

      {showAddForm && (
        <StudentForm
          onClose={() => setShowAddForm(false)}
          onSave={handleAddStudent}
        />
      )}
    </div>
  );
}