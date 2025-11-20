import { useState } from 'react'
import { DatePicker } from '../components'
import { addDays, subDays } from 'date-fns'
import { Heart } from 'lucide-react'

export function DatePickerExample() {
  const [date1, setDate1] = useState<Date>()
  const [date2, setDate2] = useState<Date>()
  const [date3, setDate3] = useState<Date>()
  const [date4, setDate4] = useState<Date>()
  const [date5, setDate5] = useState<Date>()
  const [date6, setDate6] = useState<Date>()

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">DatePicker Component</h1>
          <p className="text-gray-600 mt-1">
            Minimal, rounded date picker with extensive customization options
          </p>
        </div>

        {/* Basic Examples */}
        <div className="bg-white rounded-lg shadow p-6 space-y-6">
          <h2 className="text-xl font-semibold mb-4">Basic Variants</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Default (Outline)</label>
              <DatePicker
                date={date1}
                onDateChange={setDate1}
                placeholder="Select a date"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Filled Variant</label>
              <DatePicker
                date={date2}
                onDateChange={setDate2}
                variant="default"
                placeholder="Select a date"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Ghost Variant</label>
              <DatePicker
                date={date3}
                onDateChange={setDate3}
                variant="ghost"
                placeholder="Select a date"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Without Icon</label>
              <DatePicker
                date={date4}
                onDateChange={setDate4}
                showIcon={false}
                placeholder="Select a date"
              />
            </div>
          </div>
        </div>

        {/* Size Variants */}
        <div className="bg-white rounded-lg shadow p-6 space-y-6">
          <h2 className="text-xl font-semibold mb-4">Size Variants</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Small</label>
              <DatePicker
                date={date1}
                onDateChange={setDate1}
                size="sm"
                placeholder="Small size"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Default</label>
              <DatePicker
                date={date1}
                onDateChange={setDate1}
                size="default"
                placeholder="Default size"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Large</label>
              <DatePicker
                date={date1}
                onDateChange={setDate1}
                size="lg"
                placeholder="Large size"
              />
            </div>
          </div>
        </div>

        {/* Advanced Customization */}
        <div className="bg-white rounded-lg shadow p-6 space-y-6">
          <h2 className="text-xl font-semibold mb-4">Advanced Customization</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Custom Icon</label>
              <DatePicker
                date={date5}
                onDateChange={setDate5}
                icon={<Heart className="mr-2 h-4 w-4 text-red-500" />}
                placeholder="Custom icon"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Full Width</label>
              <DatePicker
                date={date6}
                onDateChange={setDate6}
                fullWidth
                placeholder="Full width picker"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Date Range (Min/Max)</label>
              <DatePicker
                date={date1}
                onDateChange={setDate1}
                minDate={subDays(new Date(), 7)}
                maxDate={addDays(new Date(), 7)}
                placeholder="Next 7 days only"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Disabled Weekends</label>
              <DatePicker
                date={date2}
                onDateChange={setDate2}
                isDateDisabled={(date) => {
                  const day = date.getDay()
                  return day === 0 || day === 6 // Sunday or Saturday
                }}
                placeholder="Weekdays only"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Custom Format (ISO)</label>
              <DatePicker
                date={date3}
                onDateChange={setDate3}
                dateFormat="yyyy-MM-dd"
                placeholder="ISO format"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Multiple Months</label>
              <DatePicker
                date={date4}
                onDateChange={setDate4}
                numberOfMonths={2}
                placeholder="View 2 months"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Custom Date Format</label>
              <DatePicker
                date={date5}
                onDateChange={setDate5}
                dateFormat="dd/MM/yyyy"
                placeholder="DD/MM/YYYY format"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Disabled State</label>
              <DatePicker
                date={date6}
                onDateChange={setDate6}
                disabled
                placeholder="Disabled picker"
              />
            </div>
          </div>
        </div>

        {/* Code Examples */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Usage Examples</h2>

          <div className="space-y-6">
            {/* Basic Usage */}
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-2">Basic Usage</h3>
              <div className="bg-gray-900 text-gray-100 p-4 rounded-md overflow-x-auto">
                <pre className="text-sm">
                  <code>{`import { DatePicker } from '@your-org/ui-library'
import { useState } from 'react'

function MyComponent() {
  const [date, setDate] = useState<Date>()

  return (
    <DatePicker
      date={date}
      onDateChange={setDate}
      placeholder="Pick a date"
    />
  )
}`}</code>
                </pre>
              </div>
            </div>

            {/* Advanced Usage */}
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-2">Advanced Customization</h3>
              <div className="bg-gray-900 text-gray-100 p-4 rounded-md overflow-x-auto">
                <pre className="text-sm">
                  <code>{`import { DatePicker } from '@your-org/ui-library'
import { addDays, subDays } from 'date-fns'

<DatePicker
  date={date}
  onDateChange={setDate}
  variant="outline"
  size="default"
  fullWidth
  showIcon={true}
  placeholder="Select date"
  dateFormat="PPP"

  // Date constraints
  minDate={subDays(new Date(), 30)}
  maxDate={addDays(new Date(), 30)}

  // Custom disabled logic
  isDateDisabled={(date) => {
    const day = date.getDay()
    return day === 0 || day === 6 // Disable weekends
  }}

  // Display options
  captionLayout="dropdown"
  numberOfMonths={2}
  showOutsideDays={true}
/>`}</code>
                </pre>
              </div>
            </div>

            {/* Props Table */}
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-2">Available Props</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Prop</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Default</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Description</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <tr>
                      <td className="px-4 py-2 text-sm font-mono">date</td>
                      <td className="px-4 py-2 text-sm font-mono">Date</td>
                      <td className="px-4 py-2 text-sm">-</td>
                      <td className="px-4 py-2 text-sm">Selected date</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 text-sm font-mono">onDateChange</td>
                      <td className="px-4 py-2 text-sm font-mono">(date?) =&gt; void</td>
                      <td className="px-4 py-2 text-sm">-</td>
                      <td className="px-4 py-2 text-sm">Callback when date changes</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 text-sm font-mono">variant</td>
                      <td className="px-4 py-2 text-sm font-mono">"default" | "outline" | "ghost"</td>
                      <td className="px-4 py-2 text-sm">"outline"</td>
                      <td className="px-4 py-2 text-sm">Button style variant</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 text-sm font-mono">size</td>
                      <td className="px-4 py-2 text-sm font-mono">"sm" | "default" | "lg"</td>
                      <td className="px-4 py-2 text-sm">"default"</td>
                      <td className="px-4 py-2 text-sm">Button size</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 text-sm font-mono">placeholder</td>
                      <td className="px-4 py-2 text-sm font-mono">string</td>
                      <td className="px-4 py-2 text-sm">"Pick a date"</td>
                      <td className="px-4 py-2 text-sm">Placeholder text</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 text-sm font-mono">dateFormat</td>
                      <td className="px-4 py-2 text-sm font-mono">string</td>
                      <td className="px-4 py-2 text-sm">"PPP"</td>
                      <td className="px-4 py-2 text-sm">Date format (date-fns)</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 text-sm font-mono">fullWidth</td>
                      <td className="px-4 py-2 text-sm font-mono">boolean</td>
                      <td className="px-4 py-2 text-sm">false</td>
                      <td className="px-4 py-2 text-sm">Full width button</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 text-sm font-mono">showIcon</td>
                      <td className="px-4 py-2 text-sm font-mono">boolean</td>
                      <td className="px-4 py-2 text-sm">true</td>
                      <td className="px-4 py-2 text-sm">Show calendar icon</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 text-sm font-mono">minDate</td>
                      <td className="px-4 py-2 text-sm font-mono">Date</td>
                      <td className="px-4 py-2 text-sm">-</td>
                      <td className="px-4 py-2 text-sm">Minimum selectable date</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 text-sm font-mono">maxDate</td>
                      <td className="px-4 py-2 text-sm font-mono">Date</td>
                      <td className="px-4 py-2 text-sm">-</td>
                      <td className="px-4 py-2 text-sm">Maximum selectable date</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 text-sm font-mono">numberOfMonths</td>
                      <td className="px-4 py-2 text-sm font-mono">number</td>
                      <td className="px-4 py-2 text-sm">1</td>
                      <td className="px-4 py-2 text-sm">Number of months to display</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DatePickerExample
