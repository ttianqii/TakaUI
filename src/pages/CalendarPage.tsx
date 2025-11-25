import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar } from '../components';
import { ArrowLeft } from 'lucide-react';

export default function CalendarPage() {
  const [selectedDate1, setSelectedDate1] = useState<Date | undefined>(new Date());
  const [selectedDate2, setSelectedDate2] = useState<Date | undefined>(new Date());
  const [selectedDate3, setSelectedDate3] = useState<Date | undefined>(new Date());
  const [selectedDate4, setSelectedDate4] = useState<Date | undefined>(new Date());

  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const nextWeek = new Date(today);
  nextWeek.setDate(nextWeek.getDate() + 7);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link 
            to="/" 
            className="inline-flex items-center text-slate-600 hover:text-slate-900 mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Calendar Component</h1>
          <p className="text-slate-600">Full-featured calendar with event management and holiday support</p>
        </div>

        {/* Examples Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Example 1: Basic Calendar */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
            <h3 className="text-xl font-semibold text-slate-900 mb-4">Basic Calendar</h3>
            <Calendar 
              selected={selectedDate1}
              onSelect={setSelectedDate1}
            />
          </div>

          {/* Example 2: Calendar with Events */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
            <h3 className="text-xl font-semibold text-slate-900 mb-4">Calendar with Events</h3>
            <Calendar 
              selected={selectedDate2}
              onSelect={setSelectedDate2}
              events={[
                { date: today, title: 'Team Meeting' },
                { date: tomorrow, title: 'Project Review' },
                { date: nextWeek, title: 'Launch Day' }
              ]}
            />
          </div>

          {/* Example 3: Custom Styling */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
            <h3 className="text-xl font-semibold text-slate-900 mb-4">Custom Styling</h3>
            <Calendar 
              selected={selectedDate3}
              onSelect={setSelectedDate3}
              className="border-2 border-purple-200"
            />
          </div>

          {/* Example 4: With Holidays */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
            <h3 className="text-xl font-semibold text-slate-900 mb-4">With Holidays</h3>
            <Calendar 
              selected={selectedDate4}
              onSelect={setSelectedDate4}
              holidays={[
                { date: today, name: 'Today' }
              ]}
            />
          </div>
        </div>

        {/* Usage Code */}
        <div className="mt-8 bg-slate-900 rounded-xl p-6 text-slate-100">
          <h3 className="text-lg font-semibold mb-4">Usage</h3>
          <pre className="text-sm overflow-x-auto">
{`import { Calendar } from 'takaui';

function Example() {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <Calendar 
      selected={date}
      onSelect={setDate}
      events={[
        { date: new Date(), title: 'Meeting', color: 'bg-blue-500' }
      ]}
      holidays={[
        { date: new Date(), name: 'Holiday', color: 'bg-red-500' }
      ]}
    />
  );
}`}
          </pre>
        </div>
      </div>
    </div>
  );
}
