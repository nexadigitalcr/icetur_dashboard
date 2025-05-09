import React, { useState } from 'react';
import { 
  Search, 
  MessageSquare, 
  Mail, 
  Bell, 
  Filter,
  Send,
  Paperclip,
  Phone,
  Video,
  MoreVertical,
  ChevronRight,
  Clock,
  CheckCheck,
  Check,
  BarChart2,
  Trash2,
  Archive
} from 'lucide-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { NewMessageModal } from './NewMessageModal';

interface Message {
  id: number;
  type: 'whatsapp' | 'email' | 'notification';
  sender: string;
  content: string;
  timestamp: Date;
  status: 'sent' | 'delivered' | 'read';
  category: 'finance' | 'course' | 'professor';
  image?: string;
  archived?: boolean;
}

interface Contact {
  id: number;
  name: string;
  role: string;
  image: string;
  lastSeen: Date;
  online: boolean;
}

const mockMessages: Message[] = [
  {
    id: 1,
    type: 'whatsapp',
    sender: 'Juan Pérez',
    content: 'Profesor, ¿podría confirmar el horario de la clase de mañana?',
    timestamp: new Date(2024, 2, 15, 14, 30),
    status: 'read',
    category: 'course'
  },
  {
    id: 2,
    type: 'email',
    sender: 'Sistema ICETUR',
    content: 'Nuevo pago registrado: Curso de Guía Naturalista',
    timestamp: new Date(2024, 2, 15, 13, 45),
    status: 'delivered',
    category: 'finance'
  },
  {
    id: 3,
    type: 'notification',
    sender: 'Luis Diego Madrigal',
    content: 'Solicitud de actualización de horario para el curso de Guía General',
    timestamp: new Date(2024, 2, 15, 12, 15),
    status: 'sent',
    category: 'professor'
  }
];

const mockContacts: Contact[] = [
  {
    id: 1,
    name: 'Juan Pérez',
    role: 'Estudiante',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?fit=crop&w=150&h=150',
    lastSeen: new Date(2024, 2, 15, 14, 30),
    online: true
  },
  {
    id: 2,
    name: 'María González',
    role: 'Estudiante',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?fit=crop&w=150&h=150',
    lastSeen: new Date(2024, 2, 15, 13, 45),
    online: false
  },
  {
    id: 3,
    name: 'Luis Diego Madrigal',
    role: 'Profesor',
    image: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?fit=crop&w=150&h=150',
    lastSeen: new Date(2024, 2, 15, 14, 15),
    online: true
  }
];

const messageTypeIcons = {
  whatsapp: MessageSquare,
  email: Mail,
  notification: Bell
};

const categoryColors = {
  finance: 'bg-green-500',
  course: 'bg-blue-500',
  professor: 'bg-purple-500'
};

export function CommunicationCenter() {
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [messageFilter, setMessageFilter] = useState<'all' | 'whatsapp' | 'email' | 'notification'>('all');
  const [newMessage, setNewMessage] = useState('');
  const [showNewMessageModal, setShowNewMessageModal] = useState(false);
  const [messages, setMessages] = useState(mockMessages);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // Here you would typically send the message via your messaging service
      setNewMessage('');
    }
  };

  const handleNewMessage = (messageData: any) => {
    const newMsg = {
      id: Date.now(),
      sender: 'Admin',
      timestamp: new Date(),
      status: 'sent' as const,
      category: 'course' as const,
      ...messageData,
    };
    setMessages([newMsg, ...messages]);
  };

  const handleDeleteMessage = (id: number) => {
    setMessages(messages.filter(msg => msg.id !== id));
  };

  const handleArchiveMessage = (id: number) => {
    // Here you would typically mark the message as archived in your backend
    setMessages(messages.map(msg => 
      msg.id === id ? { ...msg, archived: true } : msg
    ));
  };

  const filteredMessages = messages.filter(msg => 
    messageFilter === 'all' || msg.type === messageFilter
  );

  return (
    <div>
      <header className="mb-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Centro de Comunicaciones</h1>
            <p className="text-gray-400 mt-1">
              Gestiona todas las comunicaciones de ICETUR Virtual
            </p>
          </div>
          <button 
            onClick={() => setShowNewMessageModal(true)}
            className="bg-accent-orange hover:bg-accent-orange-light text-white px-4 py-2 rounded-lg transition-colors"
          >
            + Nuevo Mensaje
          </button>
        </div>
      </header>

      {/* Message Type Filters */}
      <div className="bg-carbon-gray rounded-xl p-4 mb-4">
        <div className="flex gap-4">
          <button
            onClick={() => setMessageFilter('all')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              messageFilter === 'all'
                ? 'bg-accent-orange text-white'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <BarChart2 className="w-5 h-5" />
            Todos
          </button>
          <button
            onClick={() => setMessageFilter('whatsapp')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              messageFilter === 'whatsapp'
                ? 'bg-accent-orange text-white'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <MessageSquare className="w-5 h-5" />
            WhatsApp
          </button>
          <button
            onClick={() => setMessageFilter('email')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              messageFilter === 'email'
                ? 'bg-accent-orange text-white'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Mail className="w-5 h-5" />
            Email
          </button>
          <button
            onClick={() => setMessageFilter('notification')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              messageFilter === 'notification'
                ? 'bg-accent-orange text-white'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Bell className="w-5 h-5" />
            Notificaciones
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Left Sidebar - Contact List */}
        <div className="lg:col-span-3 bg-carbon-gray rounded-xl overflow-hidden">
          <div className="p-4">
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Buscar contactos..."
                className="w-full bg-carbon-black text-white pl-10 pr-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-orange"
              />
            </div>
            <div className="space-y-2">
              {mockContacts.map((contact) => (
                <button
                  key={contact.id}
                  onClick={() => setSelectedContact(contact)}
                  className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors ${
                    selectedContact?.id === contact.id
                      ? 'bg-accent-orange'
                      : 'hover:bg-carbon-black'
                  }`}
                >
                  <div className="relative">
                    <img
                      src={contact.image}
                      alt={contact.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    {contact.online && (
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-carbon-gray" />
                    )}
                  </div>
                  <div className="flex-1 text-left">
                    <h3 className="font-medium text-white">{contact.name}</h3>
                    <p className="text-sm text-gray-400">{contact.role}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content - Message List or Chat */}
        <div className="lg:col-span-6 bg-carbon-gray rounded-xl overflow-hidden">
          {selectedContact ? (
            // Chat View
            <div className="h-[calc(100vh-12rem)] flex flex-col">
              {/* Chat Header */}
              <div className="p-4 border-b border-carbon-black flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={selectedContact.image}
                    alt={selectedContact.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-medium">{selectedContact.name}</h3>
                    <p className="text-sm text-gray-400">
                      {selectedContact.online ? 'En línea' : 'Último acceso: ' + 
                        format(selectedContact.lastSeen, "d 'de' MMMM, HH:mm", { locale: es })}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <button className="text-gray-400 hover:text-white transition-colors">
                    <Phone className="w-5 h-5" />
                  </button>
                  <button className="text-gray-400 hover:text-white transition-colors">
                    <Video className="w-5 h-5" />
                  </button>
                  <button className="text-gray-400 hover:text-white transition-colors">
                    <MoreVertical className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Chat Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {/* Example messages */}
                <div className="flex justify-start">
                  <div className="bg-carbon-black rounded-lg p-3 max-w-[80%]">
                    <p className="text-white">Hola, ¿cómo puedo ayudarte?</p>
                    <span className="text-xs text-gray-400 mt-1">14:30</span>
                  </div>
                </div>
                <div className="flex justify-end">
                  <div className="bg-accent-orange rounded-lg p-3 max-w-[80%]">
                    <p className="text-white">Necesito información sobre el próximo curso.</p>
                    <div className="flex items-center justify-end gap-1 mt-1">
                      <span className="text-xs text-white/80">14:32</span>
                      <CheckCheck className="w-4 h-4 text-white/80" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Chat Input */}
              <div className="p-4 border-t border-carbon-black">
                <div className="flex items-center gap-2">
                  <button className="text-gray-400 hover:text-white transition-colors">
                    <Paperclip className="w-5 h-5" />
                  </button>
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Escribe un mensaje..."
                    className="flex-1 bg-carbon-black text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-orange"
                  />
                  <button
                    onClick={handleSendMessage}
                    className="text-accent-orange hover:text-accent-orange-light transition-colors"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ) : (
            // Message List View with enhanced actions
            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Buscar mensajes..."
                    className="w-full bg-carbon-black text-white pl-10 pr-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-orange"
                  />
                </div>
                <button className="ml-4 text-gray-400 hover:text-white transition-colors">
                  <Filter className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-2">
                {filteredMessages.map((message) => {
                  const MessageIcon = messageTypeIcons[message.type];
                  return (
                    <div
                      key={message.id}
                      className="bg-carbon-black p-4 rounded-lg hover:bg-opacity-80 transition-colors"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <MessageIcon className="w-5 h-5 text-accent-orange" />
                          <span className="font-medium">{message.sender}</span>
                          <div className={`w-2 h-2 rounded-full ${categoryColors[message.category]}`} />
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleArchiveMessage(message.id)}
                            className="text-gray-400 hover:text-white transition-colors"
                          >
                            <Archive className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteMessage(message.id)}
                            className="text-gray-400 hover:text-red-500 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      <p className="text-gray-400 mb-2">{message.content}</p>
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <span>{format(message.timestamp, "d 'de' MMMM, HH:mm", { locale: es })}</span>
                        <div className="flex items-center gap-1">
                          {message.status === 'read' && <CheckCheck className="w-4 h-4" />}
                          {message.status === 'delivered' && <Check className="w-4 h-4" />}
                          {message.status === 'sent' && <Clock className="w-4 h-4" />}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Right Sidebar - Analytics */}
        <div className="lg:col-span-3 bg-carbon-gray rounded-xl overflow-hidden">
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-4">Análisis de Comunicación</h3>
            
            <div className="space-y-4">
              <div className="bg-carbon-black p-4 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-400">Tiempo de Respuesta</span>
                  <span className="text-accent-orange">15 min</span>
                </div>
                <div className="w-full h-2 bg-carbon-gray rounded-full overflow-hidden">
                  <div className="h-full bg-accent-orange" style={{ width: '85%' }} />
                </div>
              </div>

              <div className="bg-carbon-black p-4 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-400">Mensajes Respondidos</span>
                  <span className="text-accent-orange">92%</span>
                </div>
                <div className="w-full h-2 bg-carbon-gray rounded-full overflow-hidden">
                  <div className="h-full bg-accent-orange" style={{ width: '92%' }} />
                </div>
              </div>

              <div className="bg-carbon-black p-4 rounded-lg">
                <h4 className="text-sm font-medium mb-3">Distribución de Mensajes</h4>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">WhatsApp</span>
                    <span className="text-accent-orange">45%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Email</span>
                    <span className="text-accent-orange">35%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Notificaciones</span>
                    <span className="text-accent-orange">20%</span>
                  </div>
                </div>
              </div>

              <div className="bg-carbon-black p-4 rounded-lg">
                <h4 className="text-sm font-medium mb-3">Horas Pico</h4>
                <div className="grid grid-cols-6 gap-1 h-20">
                  {Array.from({ length: 24 }, (_, i) => (
                    <div
                      key={i}
                      className="bg-accent-orange bg-opacity-25 rounded-sm"
                      style={{
                        height: `${Math.random() * 100}%`,
                      }}
                    />
                  ))}
                </div>
                <div className="flex justify-between mt-2 text-xs text-gray-400">
                  <span>00:00</span>
                  <span>12:00</span>
                  <span>23:59</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showNewMessageModal && (
        <NewMessageModal
          onClose={() => setShowNewMessageModal(false)}
          onSend={handleNewMessage}
          contacts={mockContacts}
        />
      )}
    </div>
  );
}