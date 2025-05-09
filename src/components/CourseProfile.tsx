import React, { useState } from 'react';
import { ArrowLeft, Mail, Video, Users, CreditCard, Edit, Star, BookOpen, Link, Calendar, Play } from 'lucide-react';
import { StatCard } from './StatCard';
import { CourseForm } from './CourseForm';

interface Lesson {
  id: number;
  title: string;
  description: string;
  type: 'video' | 'live';
  link?: string;
  duration: string;
  completed: number;
}

interface Course {
  id: number;
  title: string;
  description: string;
  category: string;
  professor: string;
  professorEmail: string;
  thumbnail: string;
  enrolledStudents: number;
  completedStudents: number;
  revenue: string;
  rating: number;
  lessons: Lesson[];
  nextSession?: {
    date: string;
    time: string;
    link: string;
  };
}

interface CourseProfileProps {
  course: Course;
  onBack: () => void;
  onUpdate: (updatedCourse: Course) => void;
}

export function CourseProfile({ course, onBack, onUpdate }: CourseProfileProps) {
  const [showEditForm, setShowEditForm] = useState(false);

  const handleUpdate = (updatedData: Course) => {
    onUpdate({ ...course, ...updatedData });
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
          <span>Editar Curso</span>
        </button>
      </div>

      <div className="bg-carbon-gray rounded-xl overflow-hidden">
        <div className="relative h-48">
          <img
            src={course.thumbnail}
            alt={course.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
          <div className="absolute bottom-0 left-0 p-6">
            <h2 className="text-2xl font-bold text-white">{course.title}</h2>
            <p className="text-gray-300 mt-1">{course.category}</p>
            <div className="flex items-center gap-4 mt-2">
              <div className="flex items-center gap-1 text-accent-orange">
                <Star className="w-4 h-4 fill-current" />
                <span>{course.rating}</span>
              </div>
              <span className="text-gray-300">|</span>
              <div className="flex items-center gap-1 text-gray-300">
                <Users className="w-4 h-4" />
                <span>{course.enrolledStudents} estudiantes</span>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold mb-4">Información del Profesor</h3>
              <div className="flex items-center gap-3 text-gray-400">
                <BookOpen className="w-5 h-5" />
                <span>{course.professor}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-400">
                <Mail className="w-5 h-5" />
                <span>{course.professorEmail}</span>
              </div>
            </div>

            {course.nextSession && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold mb-4">Próxima Sesión en Vivo</h3>
                <div className="bg-carbon-black p-4 rounded-lg">
                  <div className="flex items-center gap-3 text-gray-400 mb-2">
                    <Calendar className="w-5 h-5" />
                    <span>{course.nextSession.date} - {course.nextSession.time}</span>
                  </div>
                  <a
                    href={course.nextSession.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-accent-orange hover:text-accent-orange-light transition-colors"
                  >
                    <Link className="w-4 h-4" />
                    <span>Unirse a la sesión</span>
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard
          title="Estudiantes Activos"
          value={course.enrolledStudents.toString()}
          icon={Users}
          trend={{ value: 5, isPositive: true }}
        />
        <StatCard
          title="Estudiantes Graduados"
          value={course.completedStudents.toString()}
          icon={BookOpen}
          trend={{ value: 8, isPositive: true }}
        />
        <StatCard
          title="Ingresos Generados"
          value={course.revenue}
          icon={CreditCard}
          trend={{ value: 12, isPositive: true }}
        />
        <StatCard
          title="Lecciones Totales"
          value={course.lessons.length.toString()}
          icon={Video}
          trend={{ value: 3, isPositive: true }}
        />
      </div>

      <div className="bg-carbon-gray rounded-xl p-6">
        <h3 className="text-lg font-semibold mb-4">Contenido del Curso</h3>
        <div className="space-y-4">
          {course.lessons.map((lesson) => (
            <div key={lesson.id} className="bg-carbon-black p-4 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium">{lesson.title}</h4>
                {lesson.type === 'video' ? (
                  <Play className="w-4 h-4 text-accent-orange" />
                ) : (
                  <Link className="w-4 h-4 text-accent-orange" />
                )}
              </div>
              <p className="text-sm text-gray-400 mb-3">{lesson.description}</p>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">{lesson.duration}</span>
                <div className="flex items-center gap-2">
                  <div className="w-24 h-2 bg-carbon-gray rounded-full overflow-hidden">
                    <div
                      className="h-full bg-accent-orange"
                      style={{ width: `${lesson.completed}%` }}
                    />
                  </div>
                  <span className="text-white">{lesson.completed}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showEditForm && (
        <CourseForm
          onClose={() => setShowEditForm(false)}
          onSave={handleUpdate}
          initialData={course}
          isEdit
        />
      )}
    </div>
  );
}