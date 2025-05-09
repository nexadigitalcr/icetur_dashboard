import React, { useState, useRef } from 'react';
import { X, Upload, Camera } from 'lucide-react';

interface StudentFormProps {
  onClose: () => void;
  onSave: (student: any) => void;
  initialData?: any;
  isEdit?: boolean;
}

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

const PROFESSORS = [
  'Luis Diego Madrigal',
  'Dallia Urbina',
  'José Méndez',
  'Andrés Chávez',
];

export function StudentForm({ onClose, onSave, initialData, isEdit = false }: StudentFormProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    email: initialData?.email || '',
    phone: initialData?.phone || '',
    program: initialData?.program || '',
    location: initialData?.location || '',
    age: initialData?.age || '',
    professor: initialData?.professor || '',
    image: initialData?.image || 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?fit=crop&w=150&h=150',
  });
  const [previewImage, setPreviewImage] = useState<string | null>(initialData?.image || null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageUrl = reader.result as string;
        setPreviewImage(imageUrl);
        setFormData({ ...formData, image: imageUrl });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...formData,
      id: initialData?.id || Date.now(),
      progress: initialData?.progress || 0,
      payments: initialData?.payments || '₡0',
      pendingPayment: initialData?.pendingPayment || '₡0',
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-carbon-gray rounded-xl p-6 w-full max-w-2xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">
            {isEdit ? 'Editar Estudiante' : 'Nuevo Estudiante'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="w-32 h-32 rounded-full overflow-hidden bg-carbon-black">
                {previewImage ? (
                  <img
                    src={previewImage}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Camera className="w-8 h-8 text-gray-400" />
                  </div>
                )}
              </div>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="absolute bottom-0 right-0 bg-accent-orange hover:bg-accent-orange-light text-white p-2 rounded-full transition-colors"
              >
                <Upload className="w-4 h-4" />
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">
                Nombre Completo
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-carbon-black text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-orange"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">
                Edad
              </label>
              <input
                type="number"
                value={formData.age}
                onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                className="w-full bg-carbon-black text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-orange"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">
                Correo Electrónico
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-carbon-black text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-orange"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">
                Teléfono
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full bg-carbon-black text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-orange"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">
                Ubicación
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full bg-carbon-black text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-orange"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">
                Programa
              </label>
              <select
                value={formData.program}
                onChange={(e) => {
                  const program = e.target.value;
                  let professor = formData.professor;
                  
                  // Auto-assign professor based on program
                  if (program === 'Inteligencia Artificial Aplicada al Turismo') {
                    professor = 'José Méndez';
                  } else if (program === 'Guía Naturalista') {
                    professor = 'Andrés Chávez';
                  } else if (['Recertificación ICT', 'Program Director (MICE)'].includes(program)) {
                    professor = 'Dallia Urbina';
                  } else {
                    professor = 'Luis Diego Madrigal';
                  }
                  
                  setFormData({ ...formData, program, professor });
                }}
                className="w-full bg-carbon-black text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-orange"
                required
              >
                <option value="">Seleccionar programa</option>
                {ICETUR_PROGRAMS.map((program) => (
                  <option key={program} value={program}>
                    {program}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">
                Profesor Asignado
              </label>
              <select
                value={formData.professor}
                onChange={(e) => setFormData({ ...formData, professor: e.target.value })}
                className="w-full bg-carbon-black text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-orange"
                required
              >
                <option value="">Seleccionar profesor</option>
                {PROFESSORS.map((professor) => (
                  <option key={professor} value={professor}>
                    {professor}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex justify-end gap-4 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-accent-orange hover:bg-accent-orange-light text-white px-6 py-2 rounded-lg transition-colors"
            >
              {isEdit ? 'Guardar Cambios' : 'Crear Estudiante'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}