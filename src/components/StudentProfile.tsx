import React, { useState } from 'react';
import { ArrowLeft, Mail, Phone, BookOpen, Calendar, CreditCard, Edit, GraduationCap } from 'lucide-react';
import { StatCard } from './StatCard';
import { StudentForm } from './StudentForm';

interface Student {
  id: number;
  name: string;
  program: string;
  email: string;
  phone: string;
  progress: number;
  payments: string;
  pendingPayment: string;
  image: string;
  location?: string;
  age?: string;
  professor: string;
}

interface StudentProfileProps {
  student: Student;
  onBack: () => void;
  onUpdate: (updatedStudent: Student) => void;
}

const completedCourses = {
  'Juan Pérez': ['Inglés para Turismo', 'Primeros Auxilios Básico'],
  'María González': ['Servicio al Cliente', 'Historia de Costa Rica'],
  'Carlos Ramírez': ['Biodiversidad de Costa Rica', 'Técnicas de Guiado'],
  'Fernanda López': ['Gestión Turística', 'Marketing Digital'],
  'Andrés Vega': ['Deportes Extremos', 'Seguridad en Aventura'],
  'Luisa Fernández': ['Administración Hotelera', 'Gestión de Personal'],
  'Jorge Castillo': ['Mecánica Básica', 'Legislación Turística'],
  'Camila Rojas': ['Nutrición Básica', 'Seguridad Alimentaria'],
  'Sofía Navarro': ['RCP Avanzado', 'Emergencias Médicas'],
  'Raúl Méndez': ['Gestión de Eventos', 'Protocolo Internacional'],
};

export function StudentProfile({ student, onBack, onUpdate }: StudentProfileProps) {
  const [showEditForm, setShowEditForm] = useState(false);

  const handleUpdate = (updatedData: Student) => {
    onUpdate({ ...student, ...updatedData });
    setShowEditForm(false);
  };

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
        <button
          onClick={() => setShowEditForm(true)}
          className="flex items-center gap-2 bg-accent-orange hover:bg-accent-orange-light text-white px-4 py-2 rounded-lg transition-colors"
        >
          <Edit className="w-4 h-4" />
          <span>Editar Estudiante</span>
        </button>
      </div>

      <div className="bg-carbon-gray rounded-xl p-6">
        <div className="flex items-center gap-6 mb-8">
          <img
            src={student.image}
            alt={student.name}
            className="w-24 h-24 rounded-full object-cover"
          />
          <div>
            <h2 className="text-2xl font-bold text-white">{student.name}</h2>
            <p className="text-gray-400">{student.program}</p>
            <button className="text-accent-orange hover:text-accent-orange-light transition-colors mt-2">
              <span className="flex items-center gap-2">
                <GraduationCap className="w-4 h-4" />
                Profesor: {student.professor}
              </span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold mb-4">Información de Contacto</h3>
            <div className="flex items-center gap-3 text-gray-400">
              <Mail className="w-5 h-5" />
              <span>{student.email}</span>
            </div>
            <div className="flex items-center gap-3 text-gray-400">
              <Phone className="w-5 h-5" />
              <span>{student.phone}</span>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold mb-4">Progreso Académico</h3>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Progreso General</span>
                <span className="text-white">{student.progress}%</span>
              </div>
              <div className="w-full h-2 bg-carbon-black rounded-full overflow-hidden">
                <div
                  className="h-full bg-accent-orange"
                  style={{ width: `${student.progress}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard
          title="Promedio de Asistencia"
          value={`${Math.round(85 + Math.random() * 10)}%`}
          icon={Calendar}
          trend={{ value: 5, isPositive: true }}
        />
        <StatCard
          title="Cursos Completados"
          value={completedCourses[student.name as keyof typeof completedCourses]?.length || 0}
          icon={BookOpen}
          trend={{ value: 2, isPositive: true }}
        />
        <StatCard
          title="Pagos Realizados"
          value={student.payments}
          icon={CreditCard}
          trend={{ value: 8, isPositive: true }}
        />
        <StatCard
          title="Pagos Pendientes"
          value={student.pendingPayment}
          icon={CreditCard}
          trend={{ value: Number(student.pendingPayment.replace(/[^0-9]/g, '')) > 0 ? 2 : 0, isPositive: false }}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-carbon-gray rounded-xl p-6">
          <h3 className="text-lg font-semibold mb-4">Cursos Activos</h3>
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-3 bg-carbon-black rounded-lg">
              <BookOpen className="w-5 h-5 text-accent-orange" />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">{student.program}</h4>
                  <button className="text-accent-orange hover:text-accent-orange-light transition-colors">
                    {student.professor}
                  </button>
                </div>
                <div className="mt-2">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-400">Progreso</span>
                    <span className="text-white">{student.progress}%</span>
                  </div>
                  <div className="w-full h-2 bg-carbon-gray rounded-full overflow-hidden">
                    <div
                      className="h-full bg-accent-orange"
                      style={{ width: `${student.progress}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-carbon-gray rounded-xl p-6">
          <h3 className="text-lg font-semibold mb-4">Cursos Completados</h3>
          <div className="space-y-4">
            {completedCourses[student.name as keyof typeof completedCourses]?.map((course, index) => (
              <div key={index} className="flex items-center gap-4 p-3 bg-carbon-black rounded-lg">
                <BookOpen className="w-5 h-5 text-green-500" />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">{course}</h4>
                    <button className="text-accent-orange hover:text-accent-orange-light transition-colors">
                      {student.professor}
                    </button>
                  </div>
                  <p className="text-sm text-gray-400">Completado</p>
                </div>
                <div className="text-green-500">100%</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {showEditForm && (
        <StudentForm
          onClose={() => setShowEditForm(false)}
          onSave={handleUpdate}
          initialData={student}
          isEdit
        />
      )}
    </div>
  );
}