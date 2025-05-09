import React, { useState } from 'react';
import { X, Send, Paperclip, MessageSquare, Mail, Bell } from 'lucide-react';

interface NewMessageModalProps {
  onClose: () => void;
  onSend: (message: any) => void;
  contacts: any[];
}

export function NewMessageModal({ onClose, onSend, contacts }: NewMessageModalProps) {
  const [messageType, setMessageType] = useState<'whatsapp' | 'email' | 'notification'>('whatsapp');
  const [recipients, setRecipients] = useState<string[]>([]);
  const [subject, setSubject] = useState('');
  const [content, setContent] = useState('');

  const handleSend = () => {
    onSend({
      type: messageType,
      recipients,
      subject,
      content,
      timestamp: new Date(),
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-carbon-gray rounded-xl p-6 w-full max-w-2xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Nuevo Mensaje</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="space-y-4">
          <div className="flex gap-2">
            <button
              onClick={() => setMessageType('whatsapp')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                messageType === 'whatsapp'
                  ? 'bg-accent-orange text-white'
                  : 'bg-carbon-black text-gray-400 hover:text-white'
              }`}
            >
              <MessageSquare className="w-4 h-4" />
              WhatsApp
            </button>
            <button
              onClick={() => setMessageType('email')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                messageType === 'email'
                  ? 'bg-accent-orange text-white'
                  : 'bg-carbon-black text-gray-400 hover:text-white'
              }`}
            >
              <Mail className="w-4 h-4" />
              Email
            </button>
            <button
              onClick={() => setMessageType('notification')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                messageType === 'notification'
                  ? 'bg-accent-orange text-white'
                  : 'bg-carbon-black text-gray-400 hover:text-white'
              }`}
            >
              <Bell className="w-4 h-4" />
              Notificación
            </button>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">
              Destinatarios
            </label>
            <select
              multiple
              value={recipients}
              onChange={(e) => {
                const selected = Array.from(e.target.selectedOptions, option => option.value);
                setRecipients(selected);
              }}
              className="w-full bg-carbon-black text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-orange h-32"
            >
              {contacts.map((contact) => (
                <option key={contact.id} value={contact.name}>
                  {contact.name} ({contact.role})
                </option>
              ))}
            </select>
            <p className="text-sm text-gray-400 mt-1">
              Mantén presionado Ctrl (Cmd en Mac) para seleccionar múltiples destinatarios
            </p>
          </div>

          {messageType === 'email' && (
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">
                Asunto
              </label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full bg-carbon-black text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-orange"
                placeholder="Ingresa el asunto del correo"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">
              Mensaje
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full bg-carbon-black text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-orange h-32 resize-none"
              placeholder={
                messageType === 'notification'
                  ? 'Escribe la notificación...'
                  : 'Escribe tu mensaje...'
              }
            />
          </div>

          {messageType !== 'notification' && (
            <div className="flex items-center gap-2">
              <button className="text-gray-400 hover:text-white transition-colors">
                <Paperclip className="w-5 h-5" />
              </button>
              <span className="text-sm text-gray-400">
                Adjuntar archivos
              </span>
            </div>
          )}

          <div className="flex justify-end gap-4 mt-6">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
            >
              Cancelar
            </button>
            <button
              onClick={handleSend}
              className="bg-accent-orange hover:bg-accent-orange-light text-white px-6 py-2 rounded-lg transition-colors flex items-center gap-2"
            >
              <Send className="w-4 h-4" />
              Enviar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}