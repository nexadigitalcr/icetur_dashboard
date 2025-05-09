import React from 'react';
import { Search, Star } from 'lucide-react';

interface Professor {
  id: number;
  name: string;
  specialty: string;
  assignedStudents: number;
  image: string;
  averageRating: number;
}

interface ProfessorListProps {
  professors: Professor[];
  onSelectProfessor: (id: number) => void;
}

export function ProfessorList({ professors, onSelectProfessor }: ProfessorListProps) {
  return (
    <div className="col-span-3 bg-carbon-gray rounded-xl p-4">
      <div className="flex items-center gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Buscar profesores..."
            className="w-full bg-carbon-black text-white pl-10 pr-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-orange"
          />
        </div>
        <select className="bg-carbon-black text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-orange">
          <option value="">Todas las Especialidades</option>
          <option value="general">Instructor General</option>
          <option value="legal">Regulaciones y Legal</option>
          <option value="ai">Inteligencia Artificial</option>
          <option value="biodiversity">Biodiversidad</option>
        </select>
      </div>

      <div className="space-y-4">
        {professors.map((professor) => (
          <button
            key={professor.id}
            onClick={() => onSelectProfessor(professor.id)}
            className="w-full bg-carbon-black p-4 rounded-lg hover:bg-opacity-80 transition-colors"
          >
            <div className="flex items-center gap-4">
              <img
                src={professor.image}
                alt={professor.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div className="flex-1 text-left">
                <h3 className="font-semibold text-white">{professor.name}</h3>
                <p className="text-gray-400 text-sm">{professor.specialty}</p>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-1 text-accent-orange">
                  <Star className="w-4 h-4 fill-current" />
                  <span>{professor.averageRating}</span>
                </div>
                <div className="text-sm text-gray-400">
                  {professor.assignedStudents} estudiantes
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}