import React, { useState } from 'react';
import { Search, HelpCircle, Book, MessageCircle, Video, ArrowLeft } from 'lucide-react';
import { Documentation } from './Documentation';

interface HelpArticle {
  id: number;
  title: string;
  category: string;
  content: string;
}

const helpArticles: HelpArticle[] = [
  {
    id: 1,
    title: 'Cómo matricular estudiantes',
    category: 'Estudiantes',
    content: 'Guía paso a paso para el proceso de matrícula...'
  },
  {
    id: 2,
    title: 'Gestión de pagos',
    category: 'Finanzas',
    content: 'Proceso de facturación y cobro...'
  },
  // Add more help articles
];

export function HelpCenter() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedArticle, setSelectedArticle] = useState<HelpArticle | null>(null);
  const [showDocumentation, setShowDocumentation] = useState(false);

  const filteredArticles = helpArticles.filter(article =>
    article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    article.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (showDocumentation) {
    return (
      <div>
        <button
          onClick={() => setShowDocumentation(false)}
          className="mb-4 text-accent-orange hover:text-accent-orange-light transition-colors"
        >
          ← Volver al Centro de Ayuda
        </button>
        <Documentation />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Centro de Ayuda</h1>
          <p className="text-gray-400 mt-1">
            Encuentra respuestas a tus preguntas sobre ICETUR Virtual
          </p>
        </div>
        <button
          onClick={() => setShowDocumentation(true)}
          className="flex items-center gap-2 bg-accent-orange hover:bg-accent-orange-light text-white px-4 py-2 rounded-lg transition-colors"
        >
          <Book className="w-4 h-4" />
          Ver Documentación
        </button>
      </div>

      <div className="relative mb-8">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Buscar ayuda..."
          className="w-full bg-carbon-gray text-white pl-10 pr-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-orange"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <button className="bg-carbon-gray p-6 rounded-xl hover:bg-opacity-80 transition-colors text-left">
          <div className="flex items-center gap-3 mb-4">
            <HelpCircle className="w-6 h-6 text-accent-orange" />
            <h3 className="font-semibold">Preguntas Frecuentes</h3>
          </div>
          <p className="text-sm text-gray-400">
            Encuentra respuestas a las preguntas más comunes
          </p>
        </button>

        <button className="bg-carbon-gray p-6 rounded-xl hover:bg-opacity-80 transition-colors text-left">
          <div className="flex items-center gap-3 mb-4">
            <Video className="w-6 h-6 text-accent-orange" />
            <h3 className="font-semibold">Tutoriales en Video</h3>
          </div>
          <p className="text-sm text-gray-400">
            Aprende con nuestros videos explicativos
          </p>
        </button>

        <button className="bg-carbon-gray p-6 rounded-xl hover:bg-opacity-80 transition-colors text-left">
          <div className="flex items-center gap-3 mb-4">
            <MessageCircle className="w-6 h-6 text-accent-orange" />
            <h3 className="font-semibold">Soporte Técnico</h3>
          </div>
          <p className="text-sm text-gray-400">
            Contacta con nuestro equipo de soporte
          </p>
        </button>
      </div>

      <div className="bg-carbon-gray rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-4">Artículos de Ayuda</h2>
        <div className="space-y-4">
          {filteredArticles.map(article => (
            <button
              key={article.id}
              onClick={() => setSelectedArticle(article)}
              className="w-full p-4 bg-carbon-black rounded-lg hover:bg-opacity-80 transition-colors text-left"
            >
              <h3 className="font-medium">{article.title}</h3>
              <span className="text-sm text-accent-orange">{article.category}</span>
            </button>
          ))}
        </div>
      </div>

      {selectedArticle && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-carbon-gray rounded-xl p-6 w-full max-w-2xl m-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">{selectedArticle.title}</h2>
              <button
                onClick={() => setSelectedArticle(null)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <ArrowLeft className="w-6 h-6" />
              </button>
            </div>
            <div className="prose prose-invert">
              <p>{selectedArticle.content}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}