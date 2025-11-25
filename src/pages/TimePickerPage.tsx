import { useState } from 'react';
import { Link } from 'react-router-dom';
import { TimePicker } from '../components';
import { ArrowLeft } from 'lucide-react';

export default function TimePickerPage() {
  const [time1, setTime1] = useState<string>('09:00');
  const [time2, setTime2] = useState<string>('14:30');
  const [time3, setTime3] = useState<string>('18:45');

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
          <h1 className="text-4xl font-bold text-slate-900 mb-2">TimePicker Component</h1>
          <p className="text-slate-600">Precise time selection with 12/24 hour formats</p>
        </div>

        {/* Examples Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Example 1: Basic TimePicker */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
            <h3 className="text-xl font-semibold text-slate-900 mb-4">Basic TimePicker (24h)</h3>
            <TimePicker 
              time={new Date(`2000-01-01T${time1}:00`)}
              onTimeChange={(date) => date && setTime1(date.toTimeString().slice(0, 5))}
            />
            <p className="mt-4 text-sm text-slate-600">
              Selected: {time1}
            </p>
          </div>

          {/* Example 2: 12-hour Format */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
            <h3 className="text-xl font-semibold text-slate-900 mb-4">12-hour Format</h3>
            <TimePicker 
              time={new Date(`2000-01-01T${time2}:00`)}
              onTimeChange={(date) => date && setTime2(date.toTimeString().slice(0, 5))}
              format="12h"
            />
            <p className="mt-4 text-sm text-slate-600">
              Selected: {time2}
            </p>
          </div>

          {/* Example 3: Custom Styling */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
            <h3 className="text-xl font-semibold text-slate-900 mb-4">Custom Styling</h3>
            <TimePicker 
              time={new Date(`2000-01-01T${time3}:00`)}
              onTimeChange={(date) => date && setTime3(date.toTimeString().slice(0, 5))}
            />
            <p className="mt-4 text-sm text-slate-600">
              Selected: {time3}
            </p>
          </div>
        </div>

        {/* Usage Code */}
        <div className="mt-8 bg-slate-900 rounded-xl p-6 text-slate-100">
          <h3 className="text-lg font-semibold mb-4">Usage</h3>
          <pre className="text-sm overflow-x-auto">
{`import { TimePicker } from 'takaui';

function Example() {
  const [time, setTime] = useState<string>('09:00');

  return (
    <TimePicker 
      value={time}
      onChange={setTime}
      format="24" // or "12"
    />
  );
}`}
          </pre>
        </div>
      </div>
    </div>
  );
}
