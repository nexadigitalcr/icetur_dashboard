import React from 'react';
import ReactMarkdown from 'react-markdown';

const documentation = `
# ICETUR Virtual - Manual de Usuario

## Panel de Control

El panel de control proporciona una vista general del sistema con las siguientes secciones:

### Estadísticas Principales
- Total de Estudiantes
- Tasa de Graduación
- Cursos Activos
- Ingresos Mensuales

### Gráficos y Análisis
- Participación Estudiantil
- Actividad de Profesores
- Métricas Financieras

### Gestión de Tareas
- Crear y asignar tareas
- Establecer prioridades
- Seguimiento de completitud

### Ideas de Cursos
- Proponer nuevos cursos
- Seguimiento del estado de propuestas
- Aprobación y desarrollo

## Módulos Principales

### Estudiantes
- Registro y matrícula
- Seguimiento de progreso
- Gestión de pagos
- Historial académico

### Profesores
- Asignación de cursos
- Control de asistencia
- Evaluaciones
- Pagos y comisiones

### Cursos
- Creación y actualización
- Material didáctico
- Horarios y sesiones
- Evaluaciones

### Finanzas
- Ingresos y egresos
- Pagos pendientes
- Reportes financieros
- Facturación

## Soporte

Para asistencia técnica:
- Email: soporte@icetur.com
- Teléfono: +506 2222-1111
- Horario: Lunes a Viernes, 8:00 AM - 5:00 PM
`;

export function Documentation() {
  return (
    <div className="max-w-4xl mx-auto p-8">
      <div className="prose prose-invert">
        <ReactMarkdown>{documentation}</ReactMarkdown>
      </div>
    </div>
  );
}