import React, { useState, useRef } from 'react';
import { X, Upload, Camera, Plus, Trash2 } from 'lucide-react';

interface CourseFormProps {
  onClose: () => void;
  onSave: (course: any) => void;
  initialData?: any;
  isEdit?: boolean;
}

const COURSE_CATEGORIES = [
  'Guía de Turismo General',
  'Guía de Turismo Local',
  'Guía Naturalista',
  'Recertificación ICT',
  'Inteligencia Artificial Aplicada al Turismo',
  'Program Director (MICE)',
  'Ama de Llaves',
  'Conductor Turístico Certificado'
];

const PROFESSORS = [
  { name: 'Luis Diego Madrigal', email: 'luis.madrigal@icetur.com' },
  { name: 'Dallia Urbina', email: 'dallia.urbina@icetur.com' },
  { name: 'José Méndez', email: 'jose.mendez@icetur.com' },
  { name: 'Andrés Chávez', email: 'andres.chavez@icetur.com' }
];

export function CourseForm({ onClose, onSave, initialData, isEdit = false }: CourseFormProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState(initialData || {
    title: '',
    description: '',
    category: '',
    professor: '',
    professorEmail: '',
    thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?fit=crop&w=800&h=400',
    lessons: []
  });
  const [previewImage, setPreviewImage] = useState<string | null>(initialData?.thumbnail || null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageUrl = reader.result as string;
        setPreviewImage(imageUrl);
        setFormData({ ...formData, thumbnail: imageUrl });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleProfessorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedProfessor = PROFESSORS.find(p => p.name === e.target.value);
    if (selectedProfessor) {
      setFormData({
        ...formData,
        professor: selectedProfessor.name,
        professorEmail: selectedProfessor.email
      });
    }
  };

  const addLesson = () => {
    const newLesson = {
      id: Date.now(),
      title: '',
      description: '',
      type: 'video',
      link: '',
      duration: '',
      completed: 0
    };
    setFormData({
      ...formData,
      lessons: [...formData.lessons, newLesson]
    });
  };

  const updateLesson = (index: number, updates: any) => {
    const updatedLessons = [...formData.lessons];
    updatedLessons[index] = { ...updatedLessons[index], ...updates };
    setFormData({ ...formData, lessons: updatedLessons });
  };

  const removeLesson = (index: number) => {
    const updatedLessons = formData.lessons.filter((_, i) => i !== index);
    setFormData({ ...formData, lessons: updatedLessons });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...formData,
      id: initialData?.id || Date.now(),
      enrolledStudents: initialData?.enrolledStudents || 0,
      completedStudents: initialData?.completedStudents || 0,
      revenue: initialData?.revenue || '₡0',
      rating: initialData?.rating || 4.5
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-carbon-gray rounded-xl p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">
            {isEdit ? 'Editar Curso' : 'Nuevo Curso'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="w-full h-48 rounded-lg overflow-hidden bg-carbon-black">
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
                className="absolute bottom-4 right-4 bg-accent-orange hover:bg-accent-orange-light text-white p-2 rounded-full transition-colors"
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
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-400 mb-1">
                Título del Curso
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full bg-carbon-black text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-orange"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">
                Categoría
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full bg-carbon-black text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-orange"
                required
              >
                <option value="">Seleccionar categoría</option>
                {COURSE_CATEGORIES.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">
                Profesor
              </label>
              <select
                value={formData.professor}
                onChange={handleProfessorChange}
                className="w-full bg-carbon-black text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-orange"
                required
              >
                <option value="">Seleccionar profesor</option>
                {PROFESSORS.map((professor) => (
                  <option key={professor.name} value={professor.name}>
                    {professor.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-400 mb-1">
                Descripción del Curso
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full bg-carbon-black text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-orange h-32 resize-none"
                required
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Lecciones</h3>
              <button
                type="button"
                onClick={addLesson}
                className="flex items-center gap-2 text-accent-orange hover:text-accent-orange-light transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>Agregar Lección</span>
              </button>
            </div>
            <div className="space-y-4">
              {formData.lessons.map((lesson: any, index: number) => (
                <div key={lesson.id} className="bg-carbon-black p-4 rounded-lg">
                  <div className="flex justify-between items-start mb-4">
                    <h4 className="font-medium">Lección {index + 1}</h4>
                    <button
                      type="button"
                      onClick={() => removeLesson(index)}
                      className="text-red-500 hover:text-red-400 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <input
                        type="text"
                        value={lesson.title}
                        onChange={(e) => updateLesson(index, { title: e.target.value })}
                        placeholder="Título de la lección"
                        className="w-full bg-carbon-gray text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-orange"
                        required
                      />
                    </div>
                    <div>
                      <input
                        type="text"
                        value={lesson.duration}
                        onChange={(e) => updateLesson(index, { duration: e.target.value })}
                        placeholder="Duración (ej: 1h 30min)"
                        className="w-full bg-carbon-gray text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-orange"
                        required
                      />
                    </div>
                    <div className="col-span-2">
                      <textarea
                        value={lesson.description}
                        onChange={(e) => updateLesson(index, { description: e.target.value })}
                        placeholder="Descripción de la lección"
                        className="w-full bg-carbon-gray text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-orange h-20 resize-none"
                        required
                      />
                    </div>
                    <div className="col-span-2 grid grid-cols-3 gap-4">
                      <div>
                        <select
                          value={lesson.type}
                          onChange={(e) => updateLesson(index, { type: e.target.value })}
                          className="w-full bg-carbon-gray text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-orange"
                          required
                        >
                          <option value="video">Video Pre-grabado</option>
                          <option value="live">Sesión en Vivo</option>
                        </select>
                      </div>
                      <div className="col-span-2">
                        <input
                          type="text"
                          value={lesson.link}
                          onChange={(e) => updateLesson(index, { link: e.target.value })}
                          placeholder={lesson.type === 'video' ? 'URL del video' : 'Link de la sesión en vivo'}
                          className="w-full bg-carbon-gray text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-orange"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
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
              {isEdit ? 'Guardar Cambios' : 'Crear Curso'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}