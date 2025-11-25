import { Link } from 'react-router-dom';
import { Calendar as CalendarIcon, Clock, Table, CalendarDays, Grid3x3, Navigation } from 'lucide-react';

interface ComponentCard {
  name: string;
  description: string;
  icon: React.ReactNode;
  path: string;
  color: string;
}

export default function HomePage() {
  const components: ComponentCard[] = [
    {
      name: 'Calendar',
      description: 'Full-featured calendar with event management and holiday support',
      icon: <CalendarIcon className="w-8 h-8" />,
      path: '/calendar',
      color: 'bg-blue-500'
    },
    {
      name: 'DatePicker',
      description: 'Intuitive date selection with customizable formats',
      icon: <CalendarDays className="w-8 h-8" />,
      path: '/datepicker',
      color: 'bg-green-500'
    },
    {
      name: 'TimePicker',
      description: 'Precise time selection with 12/24 hour formats',
      icon: <Clock className="w-8 h-8" />,
      path: '/timepicker',
      color: 'bg-purple-500'
    },
    {
      name: 'Table System',
      description: 'Powerful data tables with sorting, filtering, and pagination',
      icon: <Table className="w-8 h-8" />,
      path: '/table',
      color: 'bg-orange-500'
    },
    {
      name: 'Schedule',
      description: 'Week and day view scheduling with drag-and-drop',
      icon: <Grid3x3 className="w-8 h-8" />,
      path: '/schedule',
      color: 'bg-pink-500'
    },
    {
      name: 'WeekNavigator',
      description: 'Navigate through weeks with quick date selection',
      icon: <Navigation className="w-8 h-8" />,
      path: '/weeknavigator',
      color: 'bg-indigo-500'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-slate-900 mb-4">
            TakaUI Component Library
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            A modern, accessible React component library built with TypeScript and Tailwind CSS
          </p>
        </div>

        {/* Component Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {components.map((component) => (
            <Link
              key={component.name}
              to={component.path}
              className="group relative overflow-hidden rounded-2xl bg-white p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-200 hover:border-slate-300"
            >
              {/* Icon Container */}
              <div className={`inline-flex items-center justify-center w-16 h-16 rounded-xl ${component.color} text-white mb-4 group-hover:scale-110 transition-transform duration-300`}>
                {component.icon}
              </div>

              {/* Component Name */}
              <h3 className="text-2xl font-semibold text-slate-900 mb-2 group-hover:text-slate-700 transition-colors">
                {component.name}
              </h3>

              {/* Description */}
              <p className="text-slate-600 text-sm leading-relaxed">
                {component.description}
              </p>

              {/* Hover Arrow */}
              <div className="absolute bottom-8 right-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <svg className="w-6 h-6 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </div>
            </Link>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-16 text-center text-slate-500 text-sm">
          <p>Built with React, TypeScript, and Tailwind CSS</p>
        </div>
      </div>
    </div>
  );
}
