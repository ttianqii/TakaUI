import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Schedule, type ScheduleEvent } from '../components';
import { ArrowLeft } from 'lucide-react';

export default function SchedulePage() {
  const today = new Date();
  
  const [events, setEvents] = useState<ScheduleEvent[]>([
    {
      id: '1',
      title: 'Team Meeting',
      day: 'Monday',
      startTime: '09:00',
      endTime: '10:00',
      start: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 9, 0),
      end: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 10, 0),
      color: 'bg-blue-500',
    },
    {
      id: '2',
      title: 'Lunch Break',
      day: 'Monday',
      startTime: '12:00',
      endTime: '13:00',
      start: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 12, 0),
      end: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 13, 0),
      color: 'bg-green-500',
    },
    {
      id: '3',
      title: 'Client Call',
      day: 'Monday',
      startTime: '14:30',
      endTime: '15:30',
      start: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 14, 30),
      end: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 15, 30),
      color: 'bg-purple-500',
    },
  ]);

  const handleEventUpdate = (updatedEvent: ScheduleEvent) => {
    setEvents(events.map(event => 
      event.id === updatedEvent.id ? updatedEvent : event
    ));
  };

  const handleEventDelete = (eventId: string) => {
    setEvents(events.filter(event => event.id !== eventId));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link 
            to="/" 
            className="inline-flex items-center text-slate-600 hover:text-slate-900 mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Schedule Component</h1>
          <p className="text-slate-600">Week and day view scheduling with drag-and-drop</p>
        </div>

        {/* Example */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 mb-8">
          <h3 className="text-xl font-semibold text-slate-900 mb-4">Weekly Schedule</h3>
          <Schedule 
            events={events}
            onEventUpdate={handleEventUpdate}
            onEventDelete={handleEventDelete}
          />
        </div>

        {/* Usage Code */}
        <div className="bg-slate-900 rounded-xl p-6 text-slate-100">
          <h3 className="text-lg font-semibold mb-4">Usage</h3>
          <pre className="text-sm overflow-x-auto">
{`import { Schedule, type ScheduleEvent } from 'takaui';

function Example() {
  const [events, setEvents] = useState<ScheduleEvent[]>([
    {
      id: '1',
      title: 'Team Meeting',
      start: new Date(2025, 10, 25, 9, 0),
      end: new Date(2025, 10, 25, 10, 0),
      color: 'bg-blue-500',
    },
  ]);

  const handleEventUpdate = (event: ScheduleEvent) => {
    setEvents(events.map(e => e.id === event.id ? event : e));
  };

  const handleEventDelete = (eventId: string) => {
    setEvents(events.filter(e => e.id !== eventId));
  };

  return (
    <Schedule 
      events={events}
      onEventUpdate={handleEventUpdate}
      onEventDelete={handleEventDelete}
      view="week"
    />
  );
}`}
          </pre>
        </div>
      </div>
    </div>
  );
}
