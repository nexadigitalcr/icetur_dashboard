import React, { useState } from 'react';
import { ArrowLeft, Mail, Phone, BookOpen, Users, CreditCard, Edit, Star, Award } from 'lucide-react';
import { StatCard } from './StatCard';
import { ProfessorForm } from './ProfessorForm';

interface Professor {
  id: number;
  name: string;
  specialty: string;
  email: string;
  phone: string;
  image: string;
  assignedStudents: number;
  completedCourses: number;
  activeGroups: number;
  payments: {
    completed: string;
    pending: string;
  };
  courses: string[];
  graduationRate: number;
  averageRating: number;
}

interface ProfessorProfileProps {
  professor: Professor;
  onBack: () => void;
  onUpdate: (updatedProfessor: Professor) => void;
}

export function ProfessorProfile({ professor, onBack, onUpdate }: ProfessorProfileProps) {
  const [showEditForm, setShowEditForm] = useState(false);

  const handleUpdate = (updatedData: Professor) => {
    onUpdate({ ...professor, ...updatedData });
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
          <span>Editar Profesor</span>
        </button>
      </div>

      <div className="bg-carbon-gray rounded-xl p-6">
        <div className="flex items-center gap-6 mb-8">
          <img
            src={professor.image}
            alt={professor.name}
            className="w-24 h-24 rounded-full object-cover"
          />
          <div>
            <h2 className="text-2xl font-bold text-white">{professor.name}</h2>
            <p className="text-gray-400">{professor.specialty}</p>
            <div className="flex items-center gap-2 mt-2 text-accent-orange">
              <Star className="w-4 h-4 fill-current" />
              <span>{professor.averageRating} calificación promedio</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold mb-4">Información de Contacto</h3>
            <div className="flex items-center gap-3 text-gray-400">
              <Mail className="w-5 h-5" />
              <span>{professor.email}</span>
            </div>
            <div className="flex items-center gap-3 text-gray-400">
              <Phone className="w-5 h-5" />
              <span>{professor.phone}</span>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold mb-4">Estadísticas de Graduación</h3>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Tasa de Graduación</span>
                <span className="text-white">{professor.graduationRate}%</span>
              </div>
              <div className="w-full h-2 bg-carbon-black rounded-full overflow-hidden">
                <div
                  className="h-full bg-accent-orange"
                  style={{ width: `${professor.graduationRate}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard
          title="Estudiantes Activos"
          value={professor.assignedStudents.toString()}
          icon={Users}
          trend={{ value: 5, isPositive: true }}
        />
        <StatCard
          title="Cursos Completados"
          value={professor.completedCourses.toString()}
          icon={Award}
          trend={{ value: 8, isPositive: true }}
        />
        <StatCard
          title="Pagos Recibidos"
          value={professor.payments.completed}
          icon={CreditCard}
          trend={{ value: 12, isPositive: true }}
        />
        <StatCard
          title="Pagos Pendientes"
          value={professor.payments.pending}
          icon={CreditCard}
          trend={{ value: Number(professor.payments.pending.replace(/[^0-9]/g, '')) > 0 ? 2 : 0, isPositive: false }}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-carbon-gray rounded-xl p-6">
          <h3 className="text-lg font-semibold mb-4">Cursos Activos</h3>
          <div className="space-y-4">
            {professor.courses.map((course, index) => (
              <div key={index} className="flex items-center gap-4 p-3 bg-carbon-black rounded-lg">
                <BookOpen className="w-5 h-5 text-accent-orange" />
                <div className="flex-1">
                  <h4 className="font-medium">{course}</h4>
                  <p className="text-sm text-gray-400">
                    {Math.floor(15 + Math.random() * 20)} estudiantes activos
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-carbon-gray rounded-xl p-6">
          <h3 className="text-lg font-semibold mb-4">Grupos Activos</h3>
          <div className="space-y-4">
            {Array.from({ length: professor.activeGroups }).map((_, index) => (
              <div key={index} className="flex items-center gap-4 p-3 bg-carbon-black rounded-lg">
                <Users className="w-5 h-5 text-accent-orange" />
                <div className="flex-1">
                  <h4 className="font-medium">Grupo {String.fromCharCode(65 + index)}</h4>
                  <p className="text-sm text-gray-400">
                    {Math.floor(8 + Math.random() * 7)} estudiantes
                  </p>
                </div>
                <div className="text-sm text-accent-orange">
                  {Math.floor(60 + Math.random() * 40)}% completado
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {showEditForm && (
        <ProfessorForm
          onClose={() => setShowEditForm(false)}
          onSave={handleUpdate}
          initialData={professor}
          isEdit
        />
      )}
    </div>
  );
}