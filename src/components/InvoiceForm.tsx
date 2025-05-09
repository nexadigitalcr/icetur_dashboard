import React, { useState } from 'react';
import { X } from 'lucide-react';

interface InvoiceFormProps {
  onClose: () => void;
  onSave: (invoice: any) => void;
  professors: any[];
  courses: any[];
}

export function InvoiceForm({ onClose, onSave, professors, courses }: InvoiceFormProps) {
  const [formData, setFormData] = useState({
    type: 'professor', // 'professor' or 'student'
    recipient: '',
    course: '',
    amount: '',
    description: '',
    dueDate: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...formData,
      id: Date.now(),
      status: 'pending',
      createdAt: new Date().toISOString()
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-carbon-gray rounded-xl p-6 w-full max-w-2xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Nueva Factura</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">
              Tipo de Factura
            </label>
            <select
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              className="w-full bg-carbon-black text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-orange"
              required
            >
              <option value="professor">Pago a Profesor</option>
              <option value="student">Cobro a Estudiante</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">
              {formData.type === 'professor' ? 'Profesor' : 'Estudiante'}
            </label>
            <select
              value={formData.recipient}
              onChange={(e) => setFormData({ ...formData, recipient: e.target.value })}
              className="w-full bg-carbon-black text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-orange"
              required
            >
              <option value="">Seleccionar destinatario</option>
              {formData.type === 'professor' ? (
                professors.map(prof => (
                  <option key={prof.id} value={prof.name}>{prof.name}</option>
                ))
              ) : (
                <option value="student">Lista de estudiantes aquí</option>
              )}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">
              Curso
            </label>
            <select
              value={formData.course}
              onChange={(e) => setFormData({ ...formData, course: e.target.value })}
              className="w-full bg-carbon-black text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-orange"
              required
            >
              <option value="">Seleccionar curso</option>
              {courses.map(course => (
                <option key={course.id} value={course.title}>{course.title}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">
              Monto
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                ₡
              </span>
              <input
                type="number"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                className="w-full bg-carbon-black text-white pl-8 pr-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-orange"
                placeholder="0"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">
              Descripción
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full bg-carbon-black text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-orange h-32 resize-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">
              Fecha de Vencimiento
            </label>
            <input
              type="date"
              value={formData.dueDate}
              onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
              className="w-full bg-carbon-black text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-orange"
              required
            />
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
              Generar Factura
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}