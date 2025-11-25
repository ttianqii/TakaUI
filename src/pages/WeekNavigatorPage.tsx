import { useState } from 'react';
import { Link } from 'react-router-dom';
import { WeekNavigator } from '../components';
import { ArrowLeft } from 'lucide-react';

export default function WeekNavigatorPage() {
  const [selectedDate1, setSelectedDate1] = useState<Date>(new Date());
  const [selectedDate2, setSelectedDate2] = useState<Date>(new Date());
  const [selectedDate3, setSelectedDate3] = useState<Date>(new Date());

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
          <h1 className="text-4xl font-bold text-slate-900 mb-2">WeekNavigator Component</h1>
          <p className="text-slate-600">Navigate through weeks with quick date selection</p>
        </div>

        {/* Examples Grid */}
        <div className="grid grid-cols-1 gap-8">
          {/* Example 1: Basic WeekNavigator */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
            <h3 className="text-xl font-semibold text-slate-900 mb-4">Basic Week Navigator</h3>
            <WeekNavigator 
              initialDate={selectedDate1}
              onWeekChange={(weekStart) => setSelectedDate1(weekStart)}
            />
            <p className="mt-4 text-sm text-slate-600">
              Selected: {selectedDate1.toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          </div>

          {/* Example 2: With Custom Styling */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
            <h3 className="text-xl font-semibold text-slate-900 mb-4">Custom Styling</h3>
            <WeekNavigator 
              initialDate={selectedDate2}
              onWeekChange={(weekStart) => setSelectedDate2(weekStart)}
              className="border-2 border-purple-200"
            />
            <p className="mt-4 text-sm text-slate-600">
              Week of {selectedDate2.toLocaleDateString('en-US', { 
                month: 'long', 
                day: 'numeric',
                year: 'numeric'
              })}
            </p>
          </div>

          {/* Example 3: Different Starting Week */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
            <h3 className="text-xl font-semibold text-slate-900 mb-4">Navigate Any Week</h3>
            <WeekNavigator 
              initialDate={selectedDate3}
              onWeekChange={(weekStart) => setSelectedDate3(weekStart)}
            />
            <p className="mt-4 text-sm text-slate-600">
              Day {selectedDate3.getDate()} of {selectedDate3.toLocaleDateString('en-US', { month: 'long' })}
            </p>
          </div>
        </div>

        {/* Usage Code */}
        <div className="mt-8 bg-slate-900 rounded-xl p-6 text-slate-100">
          <h3 className="text-lg font-semibold mb-4">Usage</h3>
          <pre className="text-sm overflow-x-auto">
{`import { WeekNavigator } from 'takaui';

function Example() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  return (
    <WeekNavigator 
      selectedDate={selectedDate}
      onDateSelect={setSelectedDate}
    />
  );
}`}
          </pre>
        </div>
      </div>
    </div>
  );
}
