import React from 'react';
import { Search, Star, Users, BookOpen } from 'lucide-react';

interface Course {
  id: number;
  title: string;
  category: string;
  professor: string;
  enrolledStudents: number;
  rating: number;
  thumbnail: string;
  completionRate: number;
}

interface CourseListProps {
  courses: Course[];
  onSelectCourse: (id: number) => void;
}

export function CourseList({ courses, onSelectCourse }: CourseListProps) {
  return (
    <div className="col-span-3 bg-carbon-gray rounded-xl p-4">
      <div className="flex items-center gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Buscar cursos..."
            className="w-full bg-carbon-black text-white pl-10 pr-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-orange"
          />
        </div>
        <select className="bg-carbon-black text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-orange">
          <option value="">Todas las Categorías</option>
          <option value="general">Guía General</option>
          <option value="regulations">Regulaciones</option>
          <option value="ai">Inteligencia Artificial</option>
          <option value="biodiversity">Biodiversidad</option>
        </select>
      </div>

      <div className="space-y-4">
        {courses.map((course) => (
          <button
            key={course.id}
            onClick={() => onSelectCourse(course.id)}
            className="w-full bg-carbon-black p-4 rounded-lg hover:bg-opacity-80 transition-colors"
          >
            <div className="flex items-center gap-4">
              <div className="relative w-24 h-16 rounded-lg overflow-hidden">
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              </div>
              <div className="flex-1 text-left">
                <h3 className="font-semibold text-white">{course.title}</h3>
                <p className="text-gray-400 text-sm">{course.professor}</p>
                <div className="flex items-center gap-4 mt-1">
                  <span className="flex items-center gap-1 text-sm text-gray-400">
                    <Users className="w-4 h-4" />
                    {course.enrolledStudents} estudiantes
                  </span>
                  <span className="flex items-center gap-1 text-sm text-gray-400">
                    <BookOpen className="w-4 h-4" />
                    {course.completionRate}% completado
                  </span>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-1 text-accent-orange">
                  <Star className="w-4 h-4 fill-current" />
                  <span>{course.rating}</span>
                </div>
                <div className="text-sm text-gray-400">
                  {course.category}
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}