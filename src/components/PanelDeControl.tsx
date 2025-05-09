import React, { useState } from 'react';
import { StatCard } from './StatCard';
import { 
  Users, 
  GraduationCap, 
  BookOpen, 
  Wallet,
  Plus,
  CheckCircle,
  Clock,
  Lightbulb,
  TrendingUp,
  Search,
  Filter,
  ArrowRight,
  Calendar,
  Star,
  BarChart2
} from 'lucide-react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';

interface Task {
  id: number;
  title: string;
  status: 'pending' | 'in_progress' | 'completed';
  dueDate: Date;
  priority: 'high' | 'medium' | 'low';
}

interface CourseIdea {
  id: number;
  title: string;
  description: string;
  status: 'draft' | 'in_review' | 'approved' | 'in_development';
  proposedBy: string;
  createdAt: Date;
}

const participationData = [
  { month: 'Ene', estudiantes: 180 },
  { month: 'Feb', estudiantes: 200 },
  { month: 'Mar', estudiantes: 250 },
  { month: 'Abr', estudiantes: 280 },
  { month: 'May', estudiantes: 310 },
  { month: 'Jun', estudiantes: 350 }
];

const professorData = [
  { month: 'Ene', cursos: 12 },
  { month: 'Feb', cursos: 15 },
  { month: 'Mar', cursos: 18 },
  { month: 'Abr', cursos: 20 },
  { month: 'May', cursos: 22 },
  { month: 'Jun', cursos: 25 }
];

const revenueData = [
  { curso: 'Guía General', ingresos: 6750000 },
  { curso: 'IA en Turismo', ingresos: 5040000 },
  { curso: 'Guía Naturalista', ingresos: 4500000 },
  { curso: 'Regulaciones', ingresos: 3800000 }
];

const initialTasks: Task[] = [
  {
    id: 1,
    title: 'Revisar materiales del curso de Guía General',
    status: 'pending',
    dueDate: new Date(2024, 2, 20),
    priority: 'high'
  },
  {
    id: 2,
    title: 'Actualizar calendario de clases',
    status: 'in_progress',
    dueDate: new Date(2024, 2, 18),
    priority: 'medium'
  },
  {
    id: 3,
    title: 'Preparar evaluación mensual',
    status: 'completed',
    dueDate: new Date(2024, 2, 15),
    priority: 'high'
  }
];

const initialIdeas: CourseIdea[] = [
  {
    id: 1,
    title: 'Curso de Fotografía Turística',
    description: 'Técnicas de fotografía especializadas para guías turísticos',
    status: 'in_review',
    proposedBy: 'Luis Diego Madrigal',
    createdAt: new Date(2024, 2, 10)
  },
  {
    id: 2,
    title: 'Gestión de Crisis en Turismo',
    description: 'Manejo de situaciones de emergencia y protocolos de seguridad',
    status: 'approved',
    proposedBy: 'Dallia Urbina',
    createdAt: new Date(2024, 2, 8)
  }
];

const COLORS = ['#FF5722', '#FF7043', '#FF8A65', '#FFAB91'];

export function PanelDeControl() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [courseIdeas, setCourseIdeas] = useState<CourseIdea[]>(initialIdeas);
  const [newTask, setNewTask] = useState('');
  const [showNewIdeaForm, setShowNewIdeaForm] = useState(false);
  const [newIdea, setNewIdea] = useState({
    title: '',
    description: ''
  });
  const [timeRange, setTimeRange] = useState<'monthly' | 'quarterly' | 'yearly'>('monthly');
  const [searchQuery, setSearchQuery] = useState('');

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTask.trim()) {
      const task: Task = {
        id: Date.now(),
        title: newTask,
        status: 'pending',
        dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 1 week from now
        priority: 'medium'
      };
      setTasks([...tasks, task]);
      setNewTask('');
    }
  };

  const handleUpdateTaskStatus = (taskId: number, status: Task['status']) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, status } : task
    ));
  };

  const handleAddIdea = (e: React.FormEvent) => {
    e.preventDefault();
    if (newIdea.title && newIdea.description) {
      const idea: CourseIdea = {
        id: Date.now(),
        ...newIdea,
        status: 'draft',
        proposedBy: 'Admin',
        createdAt: new Date()
      };
      setCourseIdeas([...courseIdeas, idea]);
      setNewIdea({ title: '', description: '' });
      setShowNewIdeaForm(false);
    }
  };

  const handleUpdateIdeaStatus = (ideaId: number, status: CourseIdea['status']) => {
    setCourseIdeas(courseIdeas.map(idea => 
      idea.id === ideaId ? { ...idea, status } : idea
    ));
  };

  return (
    <div>
      <header className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-3xl font-bold">Panel de Control</h1>
            <p className="text-gray-400 mt-1">
              Bienvenido al panel de control de ICETUR Virtual
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar en el panel..."
                className="w-64 bg-carbon-gray text-white pl-10 pr-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-orange"
              />
            </div>
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value as 'monthly' | 'quarterly' | 'yearly')}
              className="bg-carbon-gray text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-orange"
            >
              <option value="monthly">Mensual</option>
              <option value="quarterly">Trimestral</option>
              <option value="yearly">Anual</option>
            </select>
          </div>
        </div>

        {/* Quick Access Buttons */}
        <div className="grid grid-cols-4 gap-4 mt-6">
          <button
            onClick={() => window.location.href = '#/students'}
            className="flex items-center gap-2 bg-carbon-gray hover:bg-opacity-80 text-white px-4 py-3 rounded-lg transition-colors"
          >
            <Users className="w-5 h-5 text-accent-orange" />
            <span>Gestionar Estudiantes</span>
            <ArrowRight className="w-4 h-4 ml-auto" />
          </button>
          <button
            onClick={() => window.location.href = '#/professors'}
            className="flex items-center gap-2 bg-carbon-gray hover:bg-opacity-80 text-white px-4 py-3 rounded-lg transition-colors"
          >
            <GraduationCap className="w-5 h-5 text-accent-orange" />
            <span>Gestionar Profesores</span>
            <ArrowRight className="w-4 h-4 ml-auto" />
          </button>
          <button
            onClick={() => window.location.href = '#/finance'}
            className="flex items-center gap-2 bg-carbon-gray hover:bg-opacity-80 text-white px-4 py-3 rounded-lg transition-colors"
          >
            <Wallet className="w-5 h-5 text-accent-orange" />
            <span>Reportes Financieros</span>
            <ArrowRight className="w-4 h-4 ml-auto" />
          </button>
          <button
            onClick={() => window.location.href = '#/notifications'}
            className="flex items-center gap-2 bg-carbon-gray hover:bg-opacity-80 text-white px-4 py-3 rounded-lg transition-colors"
          >
            <Calendar className="w-5 h-5 text-accent-orange" />
            <span>Centro de Comunicaciones</span>
            <ArrowRight className="w-4 h-4 ml-auto" />
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <button
          onClick={() => window.location.href = '#/students'}
          className="text-left"
        >
          <StatCard
            title="Total de Estudiantes"
            value="2,543"
            icon={Users}
            trend={{ value: 12, isPositive: true }}
          />
        </button>
        <button
          onClick={() => window.location.href = '#/students'}
          className="text-left"
        >
          <StatCard
            title="Tasa de Graduación"
            value="92%"
            icon={GraduationCap}
            trend={{ value: 5, isPositive: true }}
          />
        </button>
        <button
          onClick={() => window.location.href = '#/courses'}
          className="text-left"
        >
          <StatCard
            title="Cursos Activos"
            value="186"
            icon={BookOpen}
            trend={{ value: 8, isPositive: true }}
          />
        </button>
        <button
          onClick={() => window.location.href = '#/finance'}
          className="text-left"
        >
          <StatCard
            title="Ingresos Mensuales"
            value="₡29.5M"
            icon={Wallet}
            trend={{ value: 15, isPositive: true }}
          />
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-8">
        <div className="bg-carbon-gray p-6 rounded-xl">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold">Participación Estudiantil</h3>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-accent-orange" />
              <Filter className="w-5 h-5 text-gray-400 cursor-pointer hover:text-white transition-colors" />
            </div>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={participationData}>
                <defs>
                  <linearGradient id="colorEstudiantes" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#FF5722" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#FF5722" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                <XAxis dataKey="month" stroke="#666" />
                <YAxis stroke="#666" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1E1E1E',
                    border: 'none',
                    borderRadius: '8px',
                    color: '#fff'
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="estudiantes"
                  stroke="#FF5722"
                  fillOpacity={1}
                  fill="url(#colorEstudiantes)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-carbon-gray p-6 rounded-xl">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold">Actividad de Profesores</h3>
            <div className="flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-accent-orange" />
              <Filter className="w-5 h-5 text-gray-400 cursor-pointer hover:text-white transition-colors" />
            </div>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={professorData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                <XAxis dataKey="month" stroke="#666" />
                <YAxis stroke="#666" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1E1E1E',
                    border: 'none',
                    borderRadius: '8px',
                    color: '#fff'
                  }}
                />
                <Bar dataKey="cursos" fill="#FF5722" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-8">
        <div className="bg-carbon-gray p-6 rounded-xl">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold">Tareas Pendientes</h3>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-400">
                {tasks.filter(t => t.status === 'completed').length} de {tasks.length} completadas
              </span>
              <form onSubmit={handleAddTask} className="flex items-center gap-2">
                <input
                  type="text"
                  value={newTask}
                  onChange={(e) => setNewTask(e.target.value)}
                  placeholder="Nueva tarea..."
                  className="bg-carbon-black text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-orange"
                />
                <button
                  type="submit"
                  className="bg-accent-orange hover:bg-accent-orange-light text-white p-2 rounded-lg transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>

          <div className="space-y-4">
            {tasks.map((task) => (
              <div
                key={task.id}
                className="flex items-center justify-between p-4 bg-carbon-black rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handleUpdateTaskStatus(task.id, 
                      task.status === 'completed' ? 'pending' : 'completed'
                    )}
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                      task.status === 'completed'
                        ? 'border-green-500 bg-green-500'
                        : 'border-gray-400'
                    }`}
                  >
                    {task.status === 'completed' && (
                      <CheckCircle className="w-4 h-4 text-white" />
                    )}
                  </button>
                  <div>
                    <p className={task.status === 'completed' ? 'line-through text-gray-400' : ''}>
                      {task.title}
                    </p>
                    <span className="text-sm text-gray-400">
                      Vence: {task.dueDate.toLocaleDateString()}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {task.status === 'in_progress' && (
                    <Clock className="w-5 h-5 text-accent-orange" />
                  )}
                  <div className={`px-2 py-1 rounded-full text-xs ${
                    task.priority === 'high'
                      ? 'bg-red-500/20 text-red-500'
                      : task.priority === 'medium'
                      ? 'bg-yellow-500/20 text-yellow-500'
                      : 'bg-green-500/20 text-green-500'
                  }`}>
                    {task.priority === 'high' ? 'Alta' : task.priority === 'medium' ? 'Media' : 'Baja'}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-carbon-gray p-6 rounded-xl">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold">Ideas de Cursos</h3>
            <button
              onClick={() => setShowNewIdeaForm(true)}
              className="flex items-center gap-2 bg-accent-orange hover:bg-accent-orange-light text-white px-4 py-2 rounded-lg transition-colors"
            >
              <Lightbulb className="w-4 h-4" />
              Nueva Idea
            </button>
          </div>

          {showNewIdeaForm ? (
            <form onSubmit={handleAddIdea} className="space-y-4 mb-6">
              <div>
                <input
                  type="text"
                  value={newIdea.title}
                  onChange={(e) => setNewIdea({ ...newIdea, title: e.target.value })}
                  placeholder="Título del curso..."
                  className="w-full bg-carbon-black text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-orange"
                />
              </div>
              <div>
                <textarea
                  value={newIdea.description}
                  onChange={(e) => setNewIdea({ ...newIdea, description: e.target.value })}
                  placeholder="Descripción del curso..."
                  className="w-full bg-carbon-black text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-orange h-32 resize-none"
                />
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowNewIdeaForm(false)}
                  className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="bg-accent-orange hover:bg-accent-orange-light text-white px-4 py-2 rounded-lg transition-colors"
                >
                  Guardar Idea
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-4">
              {courseIdeas.map((idea) => (
                <div
                  key={idea.id}
                  className="p-4 bg-carbon-black rounded-lg"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-medium">{idea.title}</h4>
                      <p className="text-sm text-gray-400">{idea.description}</p>
                    </div>
                    <select
                      value={idea.status}
                      onChange={(e) => handleUpdateIdeaStatus(idea.id, e.target.value as CourseIdea['status'])}
                      className="bg-carbon-gray text-white px-2 py-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-orange text-sm"
                    >
                      <option value="draft">Borrador</option>
                      <option value="in_review">En Revisión</option>
                      <option value="approved">Aprobado</option>
                      <option value="in_development">En Desarrollo</option>
                    </select>
                  </div>
                  <div className="flex justify-between items-center text-sm text-gray-400">
                    <span>Propuesto por: {idea.proposedBy}</span>
                    <span>{idea.createdAt.toLocaleDateString()}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="bg-carbon-gray p-6 rounded-xl">
          <h3 className="text-lg font-semibold mb-4">Cursos Más Populares</h3>
          <div className="space-y-4">
            {revenueData.map((course, index) => (
              <button
                key={index}
                onClick={() => window.location.href = '#/courses'}
                className="w-full flex items-center justify-between p-3 bg-carbon-black rounded-lg hover:bg-opacity-80 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[index] }} />
                  <span>{course.curso}</span>
                </div>
                <span className="text-accent-orange">
                  ₡{course.ingresos.toLocaleString()}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="bg-carbon-gray p-6 rounded-xl">
          <h3 className="text-lg font-semibold mb-4">Métricas de Profesores</h3>
          <div className="space-y-4">
            <div className="p-3 bg-carbon-black rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-400">Satisfacción Promedio</span>
                <span className="text-accent-orange">4.8/5.0</span>
              </div>
              <div className="w-full h-2 bg-carbon-gray rounded-full overflow-hidden">
                <div className="h-full bg-accent-orange" style={{ width: '96%' }} />
              </div>
            </div>
            <div className="p-3 bg-carbon-black rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-400">Tasa de Retención</span>
                <span className="text-accent-orange">92%</span>
              </div>
              <div className="w-full h-2 bg-carbon-gray rounded-full overflow-hidden">
                <div className="h-full bg-accent-orange" style={{ width: '92%' }} />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-carbon-gray p-6 rounded-xl">
          <h3 className="text-lg font-semibold mb-4">Métricas Financieras</h3>
          <div className="space-y-4">
            <button
              onClick={() => window.location.href = '#/finance'}
              className="w-full p-3 bg-carbon-black rounded-lg hover:bg-opacity-80 transition-colors"
            >
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Ingresos Totales</span>
                <span className="text-accent-orange">₡29.5M</span>
              </div>
            </button>
            <button
              onClick={() => window.location.href = '#/finance'}
              className="w-full p-3 bg-carbon-black rounded-lg hover:bg-opacity-80 transition-colors"
            >
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Pagos Pendientes</span>
                <span className="text-accent-orange">₡4.8M</span>
              </div>
            </button>
            <button
              onClick={() => window.location.href = '#/finance'}
              className="w-full p-3 bg-carbon-black rounded-lg hover:bg-opacity-80 transition-colors"
            >
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Margen de Beneficio</span>
                <span className="text-accent-orange">72%</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}