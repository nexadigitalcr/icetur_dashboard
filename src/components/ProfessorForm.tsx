import React, { useState, useRef } from 'react';
import { X, Upload, Camera } from 'lucide-react';

interface ProfessorFormProps {
  onClose: () => void;
  onSave: (professor: any) => void;
  initialData?: any;
  isEdit?: boolean;
}

const SPECIALTIES = [
  'Instructor General ICETUR',
  'Regulaciones y Asuntos Legales',
  'Inteligencia Artificial en Turismo',
  'Biodiversidad y Sostenibilidad'
];

const COURSES = [
  'Guía de Turismo General',
  'Guía de Turismo Local',
  'Guía Naturalista',
  'Recertificación ICT',
  'Inteligencia Artificial Aplicada al Turismo',
  'Program Director (MICE)',
  'Ama de Llaves',
  'Conductor Turístico Certificado'
];

export function ProfessorForm({ onClose, onSave, initialData, isEdit = false }: ProfessorFormProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState(initialData || {
    name: '',
    email: '',
    phone: '',
    specialty: '',
    courses: [],
    image: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?fit=crop&w=150&h=150'
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
      assignedStudents: initialData?.assignedStudents || 0,
      completedCourses: initialData?.completedCourses || 0,
      activeGroups: initialData?.activeGroups || 0,
      payments: initialData?.payments || {
        completed: '₡0',
        pending: '₡0'
      },
      graduationRate: initialData?.graduationRate || 0,
      averageRating: initialData?.averageRating || 4.5
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-carbon-gray rounded-xl p-6 w-full max-w-2xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">
            {isEdit ? 'Editar Profesor' : 'Nuevo Profesor'}
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
                Especialidad
              </label>
              <select
                value={formData.specialty}
                onChange={(e) => setFormData({ ...formData, specialty: e.target.value })}
                className="w-full bg-carbon-black text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-orange"
                required
              >
                <option value="">Seleccionar especialidad</option>
                {SPECIALTIES.map((specialty) => (
                  <option key={specialty} value={specialty}>
                    {specialty}
                  </option>
                ))}
              </select>
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
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-400 mb-1">
                Cursos Asignados
              </label>
              <select
                multiple
                value={formData.courses}
                onChange={(e) => {
                  const selectedCourses = Array.from(e.target.selectedOptions, option => option.value);
                  setFormData({ ...formData, courses: selectedCourses });
                }}
                className="w-full bg-carbon-black text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-orange h-32"
                required
              >
                {COURSES.map((course) => (
                  <option key={course} value={course}>
                    {course}
                  </option>
                ))}
              </select>
              <p className="text-sm text-gray-400 mt-1">
                Mantén presionado Ctrl (Cmd en Mac) para seleccionar múltiples cursos
              </p>
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
              {isEdit ? 'Guardar Cambios' : 'Crear Profesor'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}