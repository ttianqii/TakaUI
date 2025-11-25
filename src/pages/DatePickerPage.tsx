import { useState } from 'react';
import { Link } from 'react-router-dom';
import { DatePicker } from '../components';
import { ArrowLeft } from 'lucide-react';

export default function DatePickerPage() {
  const [selectedDate1, setSelectedDate1] = useState<Date | undefined>(new Date());
  const [selectedDate2, setSelectedDate2] = useState<Date | undefined>();
  const [selectedDate3, setSelectedDate3] = useState<Date | undefined>(new Date());

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
          <h1 className="text-4xl font-bold text-slate-900 mb-2">DatePicker Component</h1>
          <p className="text-slate-600">Intuitive date selection with customizable formats</p>
        </div>

        {/* Examples Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Example 1: Basic DatePicker */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
            <h3 className="text-xl font-semibold text-slate-900 mb-4">Basic DatePicker</h3>
            <DatePicker 
              date={selectedDate1}
              onDateChange={setSelectedDate1}
            />
            {selectedDate1 && (
              <p className="mt-4 text-sm text-slate-600">
                Selected: {selectedDate1.toLocaleDateString()}
              </p>
            )}
          </div>

          {/* Example 2: With Placeholder */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
            <h3 className="text-xl font-semibold text-slate-900 mb-4">With Placeholder</h3>
            <DatePicker 
              date={selectedDate2}
              onDateChange={setSelectedDate2}
              placeholder="Pick a date..."
            />
            {selectedDate2 && (
              <p className="mt-4 text-sm text-slate-600">
                Selected: {selectedDate2.toLocaleDateString()}
              </p>
            )}
          </div>

          {/* Example 3: Custom Format */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
            <h3 className="text-xl font-semibold text-slate-900 mb-4">Custom Format</h3>
            <DatePicker 
              date={selectedDate3}
              onDateChange={setSelectedDate3}
              className="w-full"
            />
            {selectedDate3 && (
              <p className="mt-4 text-sm text-slate-600">
                Selected: {selectedDate3.toDateString()}
              </p>
            )}
          </div>
        </div>

        {/* Usage Code */}
        <div className="mt-8 bg-slate-900 rounded-xl p-6 text-slate-100">
          <h3 className="text-lg font-semibold mb-4">Usage</h3>
          <pre className="text-sm overflow-x-auto">
{`import { DatePicker } from 'takaui';

function Example() {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <DatePicker 
      selected={date}
      onSelect={setDate}
      placeholder="Select a date"
    />
  );
}`}
          </pre>
        </div>
      </div>
    </div>
  );
}
