import React from 'react';
import { Search } from 'lucide-react';

interface Student {
  id: number;
  name: string;
  program: string;
  progress: number;
  image: string;
}

interface StudentListProps {
  students: Student[];
  onSelectStudent: (id: number) => void;
}

export function StudentList({ students, onSelectStudent }: StudentListProps) {
  return (
    <div className="col-span-3 bg-carbon-gray rounded-xl p-4">
      <div className="flex items-center gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Buscar estudiantes..."
            className="w-full bg-carbon-black text-white pl-10 pr-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-orange"
          />
        </div>
        <select className="bg-carbon-black text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-orange">
          <option value="">Todos los Programas</option>
          <option value="general">Guía de Turismo General</option>
          <option value="local">Guía de Turismo Local</option>
          <option value="naturalista">Guía Naturalista</option>
        </select>
      </div>

      <div className="space-y-4">
        {students.map((student) => (
          <button
            key={student.id}
            onClick={() => onSelectStudent(student.id)}
            className="w-full bg-carbon-black p-4 rounded-lg hover:bg-opacity-80 transition-colors"
          >
            <div className="flex items-center gap-4">
              <img
                src={student.image}
                alt={student.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div className="flex-1 text-left">
                <h3 className="font-semibold text-white">{student.name}</h3>
                <p className="text-gray-400 text-sm">{student.program}</p>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-400">Progreso</div>
                <div className="flex items-center gap-2">
                  <div className="w-24 h-2 bg-carbon-gray rounded-full overflow-hidden">
                    <div
                      className="h-full bg-accent-orange"
                      style={{ width: `${student.progress}%` }}
                    />
                  </div>
                  <span className="text-sm text-white">{student.progress}%</span>
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}