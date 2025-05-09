import React, { useState } from 'react';
import { 
  Users, 
  UserPlus, 
  Search, 
  Filter,
  MoreVertical,
  Shield,
  Clock
} from 'lucide-react';
import { UserForm } from './UserForm';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive';
  lastLogin: Date;
  image: string;
}

const mockUsers: User[] = [
  {
    id: 1,
    name: 'Admin Principal',
    email: 'admin@icetur.com',
    role: 'Administrador',
    status: 'active',
    lastLogin: new Date(2024, 2, 15, 14, 30),
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?fit=crop&w=150&h=150'
  },
  {
    id: 2,
    name: 'Luis Diego Madrigal',
    email: 'luis.madrigal@icetur.com',
    role: 'Profesor',
    status: 'active',
    lastLogin: new Date(2024, 2, 15, 13, 45),
    image: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?fit=crop&w=150&h=150'
  },
  {
    id: 3,
    name: 'Juan Pérez',
    email: 'juan.perez@email.com',
    role: 'Estudiante',
    status: 'active',
    lastLogin: new Date(2024, 2, 15, 12, 15),
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?fit=crop&w=150&h=150'
  }
];

export function UserManagement() {
  const [showUserForm, setShowUserForm] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [users] = useState(mockUsers);

  const handleAddUser = (userData: any) => {
    // Here you would typically add the user to your database
    setShowUserForm(false);
  };

  const handleUpdateUser = (userData: any) => {
    // Here you would typically update the user in your database
    setShowUserForm(false);
  };

  return (
    <div className="col-span-3">
      <div className="bg-carbon-gray rounded-xl p-6">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-4">
            <h2 className="text-xl font-semibold">Gestión de Usuarios</h2>
            <div className="flex items-center gap-2 text-gray-400">
              <Users className="w-5 h-5" />
              <span>{users.length} usuarios</span>
            </div>
          </div>
          <button
            onClick={() => setShowUserForm(true)}
            className="flex items-center gap-2 bg-accent-orange hover:bg-accent-orange-light text-white px-4 py-2 rounded-lg transition-colors"
          >
            <UserPlus className="w-4 h-4" />
            Nuevo Usuario
          </button>
        </div>

        <div className="flex items-center gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Buscar usuarios..."
              className="w-full bg-carbon-black text-white pl-10 pr-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-orange"
            />
          </div>
          <button className="text-gray-400 hover:text-white transition-colors">
            <Filter className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4">
          {users.map((user) => (
            <div
              key={user.id}
              className="bg-carbon-black p-4 rounded-lg hover:bg-opacity-80 transition-colors"
            >
              <div className="flex items-center gap-4">
                <img
                  src={user.image}
                  alt={user.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold">{user.name}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      user.status === 'active' ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'
                    }`}>
                      {user.status === 'active' ? 'Activo' : 'Inactivo'}
                    </span>
                  </div>
                  <p className="text-gray-400">{user.email}</p>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-2 text-gray-400 mb-1">
                    <Shield className="w-4 h-4" />
                    <span>{user.role}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-400 text-sm">
                    <Clock className="w-4 h-4" />
                    <span>Último acceso: {user.lastLogin.toLocaleDateString()}</span>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedUser(user)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <MoreVertical className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showUserForm && (
        <UserForm
          onClose={() => setShowUserForm(false)}
          onSave={handleAddUser}
          user={selectedUser}
        />
      )}
    </div>
  );
}