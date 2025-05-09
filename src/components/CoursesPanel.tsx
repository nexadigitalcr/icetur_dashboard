import React, { useState } from 'react';
import { StatCard } from './StatCard';
import { BookOpen, Users, Star, DollarSign } from 'lucide-react';
import { CourseProfile } from './CourseProfile';
import { CourseList } from './CourseList';
import { CourseForm } from './CourseForm';

const initialMockCourses = [
  {
    id: 1,
    title: 'Guía de Turismo General',
    description: 'Curso completo para la formación de guías turísticos profesionales.',
    category: 'Guía General',
    professor: 'Luis Diego Madrigal',
    professorEmail: 'luis.madrigal@icetur.com',
    enrolledStudents: 45,
    completedStudents: 128,
    revenue: '₡2,850,000',
    rating: 4.8,
    thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?fit=crop&w=800&h=400',
    completionRate: 75,
    lessons: [
      {
        id: 1,
        title: 'Introducción al Turismo en Costa Rica',
        description: 'Fundamentos básicos y panorama general del turismo.',
        type: 'video',
        duration: '1h 30min',
        completed: 100,
        link: 'https://video.url'
      },
      {
        id: 2,
        title: 'Técnicas de Guiado Grupal',
        description: 'Metodologías efectivas para el manejo de grupos turísticos.',
        type: 'live',
        duration: '2h',
        completed: 85,
        link: 'https://meet.google.com'
      }
    ],
    nextSession: {
      date: '15 de Marzo, 2024',
      time: '09:00 AM',
      link: 'https://meet.google.com'
    }
  },
  {
    id: 2,
    title: 'Regulación y Normativas del Turismo',
    description: 'Aspectos legales y regulatorios del turismo en Costa Rica.',
    category: 'Regulaciones',
    professor: 'Dallia Urbina',
    professorEmail: 'dallia.urbina@icetur.com',
    enrolledStudents: 32,
    completedStudents: 96,
    revenue: '₡1,950,000',
    rating: 4.9,
    thumbnail: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?fit=crop&w=800&h=400',
    completionRate: 60,
    lessons: [
      {
        id: 1,
        title: 'Marco Legal del Turismo',
        description: 'Leyes y regulaciones fundamentales.',
        type: 'video',
        duration: '2h',
        completed: 100,
        link: 'https://video.url'
      },
      {
        id: 2,
        title: 'Certificaciones y Licencias',
        description: 'Proceso de obtención y renovación de permisos.',
        type: 'live',
        duration: '1h 45min',
        completed: 75,
        link: 'https://meet.google.com'
      }
    ]
  },
  {
    id: 3,
    title: 'Inteligencia Artificial Aplicada al Turismo',
    description: 'Implementación de IA en servicios turísticos modernos.',
    category: 'Tecnología',
    professor: 'José Méndez',
    professorEmail: 'jose.mendez@icetur.com',
    enrolledStudents: 28,
    completedStudents: 64,
    revenue: '₡2,250,000',
    rating: 4.7,
    thumbnail: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?fit=crop&w=800&h=400',
    completionRate: 45,
    lessons: [
      {
        id: 1,
        title: 'Fundamentos de IA en Turismo',
        description: 'Conceptos básicos y aplicaciones prácticas.',
        type: 'video',
        duration: '1h 15min',
        completed: 100,
        link: 'https://video.url'
      },
      {
        id: 2,
        title: 'Implementación de Chatbots',
        description: 'Desarrollo y gestión de asistentes virtuales.',
        type: 'live',
        duration: '2h 30min',
        completed: 65,
        link: 'https://meet.google.com'
      }
    ]
  },
  {
    id: 4,
    title: 'Biodiversidad y Sostenibilidad',
    description: 'Estudio de la biodiversidad y prácticas sostenibles en turismo.',
    category: 'Naturaleza',
    professor: 'Andrés Chávez',
    professorEmail: 'andres.chavez@icetur.com',
    enrolledStudents: 38,
    completedStudents: 112,
    revenue: '₡2,150,000',
    rating: 4.9,
    thumbnail: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?fit=crop&w=800&h=400',
    completionRate: 85,
    lessons: [
      {
        id: 1,
        title: 'Ecosistemas de Costa Rica',
        description: 'Estudio detallado de los principales ecosistemas.',
        type: 'video',
        duration: '2h',
        completed: 100,
        link: 'https://video.url'
      },
      {
        id: 2,
        title: 'Prácticas de Turismo Sostenible',
        description: 'Implementación de turismo responsable y sostenible.',
        type: 'live',
        duration: '1h 30min',
        completed: 90,
        link: 'https://meet.google.com'
      }
    ]
  }
];

export function CoursesPanel() {
  const [courses, setCourses] = useState(initialMockCourses);
  const [selectedCourse, setSelectedCourse] = useState<number | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);

  const handleAddCourse = (newCourse: any) => {
    setCourses([...courses, newCourse]);
    setShowAddForm(false);
  };

  const handleUpdateCourse = (updatedCourse: any) => {
    setCourses(courses.map(course => 
      course.id === updatedCourse.id ? updatedCourse : course
    ));
  };

  const activeCourse = courses.find(c => c.id === selectedCourse);

  // Calculate total metrics
  const totalStudents = courses.reduce((sum, course) => sum + course.enrolledStudents, 0);
  const totalRevenue = courses.reduce((sum, course) => {
    const revenue = parseInt(course.revenue.replace(/[^0-9]/g, ''));
    return sum + revenue;
  }, 0);
  const averageRating = courses.reduce((sum, course) => sum + course.rating, 0) / courses.length;

  return (
    <div>
      <header className="mb-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">
              {selectedCourse ? activeCourse?.title : 'Gestión de Cursos'}
            </h1>
            <p className="text-gray-400 mt-1">
              {selectedCourse ? activeCourse?.category : 'Administra los cursos de ICETUR Virtual'}
            </p>
          </div>
          {!selectedCourse && (
            <button
              onClick={() => setShowAddForm(true)}
              className="bg-accent-orange hover:bg-accent-orange-light text-white px-4 py-2 rounded-lg transition-colors"
            >
              + Nuevo Curso
            </button>
          )}
        </div>
      </header>

      {!selectedCourse && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard
            title="Total de Cursos"
            value={courses.length.toString()}
            icon={BookOpen}
            trend={{ value: 2, isPositive: true }}
          />
          <StatCard
            title="Estudiantes Inscritos"
            value={totalStudents.toString()}
            icon={Users}
            trend={{ value: 8, isPositive: true }}
          />
          <StatCard
            title="Calificación Promedio"
            value={averageRating.toFixed(1)}
            icon={Star}
            trend={{ value: 5, isPositive: true }}
          />
          <StatCard
            title="Ingresos Totales"
            value={`₡${totalRevenue.toLocaleString()}`}
            icon={DollarSign}
            trend={{ value: 12, isPositive: true }}
          />
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {selectedCourse === null ? (
          <CourseList 
            courses={courses}
            onSelectCourse={setSelectedCourse}
          />
        ) : (
          <CourseProfile 
            course={activeCourse!}
            onBack={() => setSelectedCourse(null)}
            onUpdate={handleUpdateCourse}
          />
        )}
      </div>

      {showAddForm && (
        <CourseForm
          onClose={() => setShowAddForm(false)}
          onSave={handleAddCourse}
        />
      )}
    </div>
  );
}