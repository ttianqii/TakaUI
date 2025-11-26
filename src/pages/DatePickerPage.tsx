import { useState } from 'react';
import { Link } from 'react-router-dom';
import { DatePicker } from '../components';
import { ArrowLeft, Copy, Check, Code } from 'lucide-react';

export default function DatePickerPage() {
  const [selectedDate1, setSelectedDate1] = useState<Date | undefined>(new Date());
  const [selectedDate2, setSelectedDate2] = useState<Date | undefined>();
  const [selectedDate3, setSelectedDate3] = useState<Date | undefined>(new Date());
  const [dateRange1, setDateRange1] = useState<{ from?: Date; to?: Date } | undefined>();
  const [dateRange2, setDateRange2] = useState<{ from?: Date; to?: Date } | undefined>();
  const [copiedInstall, setCopiedInstall] = useState(false);
  const [copiedImport, setCopiedImport] = useState(false);
  const [showCode1, setShowCode1] = useState(false);
  const [showCode2, setShowCode2] = useState(false);
  const [showCode3, setShowCode3] = useState(false);
  const [showCode4, setShowCode4] = useState(false);
  const [showCode5, setShowCode5] = useState(false);

  const copyToClipboard = (text: string, setter: (val: boolean) => void) => {
    navigator.clipboard.writeText(text);
    setter(true);
    setTimeout(() => setter(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <Link 
            to="/" 
            className="inline-flex items-center text-slate-600 hover:text-slate-900 mb-6 transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>
          <h1 className="text-5xl font-bold text-slate-900 mb-3">DatePicker</h1>
          <p className="text-xl text-slate-600">Intuitive date selection with customizable formats and validation</p>
        </div>

        {/* Installation */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200 mb-8">
          <h2 className="text-2xl font-semibold text-slate-900 mb-6">Installation</h2>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-slate-600 mb-2">Install the package</p>
              <div className="relative">
                <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto">npm install @ttianqii/takaui</pre>
                <button
                  onClick={() => copyToClipboard('npm install @ttianqii/takaui', setCopiedInstall)}
                  className="absolute top-3 right-3 p-2 hover:bg-slate-800 rounded transition-colors"
                >
                  {copiedInstall ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4 text-slate-400" />}
                </button>
              </div>
            </div>
            <div>
              <p className="text-sm text-slate-600 mb-2">Import the component</p>
              <div className="relative">
                <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto">import &#123; DatePicker &#125; from '@ttianqii/takaui';</pre>
                <button
                  onClick={() => copyToClipboard("import { DatePicker } from '@ttianqii/takaui';", setCopiedImport)}
                  className="absolute top-3 right-3 p-2 hover:bg-slate-800 rounded transition-colors"
                >
                  {copiedImport ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4 text-slate-400" />}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Examples Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-semibold text-slate-900 mb-8">Examples</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Example 1: Basic DatePicker */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-slate-900">Basic DatePicker</h3>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setShowCode1(!showCode1)}
                    className="flex items-center gap-2 text-sm px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors"
                  >
                    <Code className="w-4 h-4" />
                    {showCode1 ? 'Hide' : 'View'} Code
                  </button>
                  <span className="text-xs px-3 py-1 bg-blue-100 text-blue-700 rounded-full font-medium">Default</span>
                </div>
              </div>
              <DatePicker 
                date={selectedDate1}
                onDateChange={setSelectedDate1}
              />
              {selectedDate1 && (
                <p className="mt-4 text-sm text-slate-600 p-3 bg-slate-50 rounded-lg">
                  Selected: <span className="font-medium">{selectedDate1.toLocaleDateString()}</span>
                </p>
              )}
              {showCode1 && (
                <div className="mt-4 rounded-lg overflow-hidden border border-slate-200">
                  <div className="bg-slate-900 text-slate-100 p-4 text-sm overflow-x-auto leading-relaxed font-mono">
                    <div><span className="text-purple-400">const</span> [<span className="text-blue-300">date</span>, <span className="text-blue-300">setDate</span>] = <span className="text-yellow-400">useState</span>&lt;<span className="text-blue-400">Date</span> | <span className="text-blue-400">undefined</span>&gt;(<span className="text-purple-400">new</span> <span className="text-yellow-400">Date</span>());</div>
                    <div className="h-4"></div>
                    <div>&lt;<span className="text-green-400">DatePicker</span></div>
                    <div>  <span className="text-blue-400">date</span>={'{'}date{'}'}</div>
                    <div>  <span className="text-blue-400">onDateChange</span>={'{'}setDate{'}'}</div>
                    <div>/&gt;</div>
                  </div>
                </div>
              )}
            </div>

            {/* Example 2: With Placeholder */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-slate-900">With Placeholder</h3>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setShowCode2(!showCode2)}
                    className="flex items-center gap-2 text-sm px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors"
                  >
                    <Code className="w-4 h-4" />
                    {showCode2 ? 'Hide' : 'View'} Code
                  </button>
                  <span className="text-xs px-3 py-1 bg-purple-100 text-purple-700 rounded-full font-medium">Custom</span>
                </div>
              </div>
              <DatePicker 
                date={selectedDate2}
                onDateChange={setSelectedDate2}
                placeholder="Pick a date..."
              />
              {selectedDate2 ? (
                <p className="mt-4 text-sm text-slate-600 p-3 bg-green-50 rounded-lg">
                  Selected: <span className="font-medium">{selectedDate2.toLocaleDateString()}</span>
                </p>
              ) : (
                <p className="mt-4 text-sm text-slate-400 p-3 bg-slate-50 rounded-lg">
                  No date selected
                </p>
              )}
              {showCode2 && (
                <div className="mt-4 rounded-lg overflow-hidden border border-slate-200">
                  <div className="bg-slate-900 text-slate-100 p-4 text-sm overflow-x-auto leading-relaxed font-mono">
                    <div><span className="text-purple-400">const</span> [<span className="text-blue-300">date</span>, <span className="text-blue-300">setDate</span>] = <span className="text-yellow-400">useState</span>&lt;<span className="text-blue-400">Date</span> | <span className="text-blue-400">undefined</span>&gt;();</div>
                    <div className="h-4"></div>
                    <div>&lt;<span className="text-green-400">DatePicker</span></div>
                    <div>  <span className="text-blue-400">date</span>={'{'}date{'}'}</div>
                    <div>  <span className="text-blue-400">onDateChange</span>={'{'}setDate{'}'}</div>
                    <div>  <span className="text-blue-400">placeholder</span>=<span className="text-green-400">"Pick a date..."</span></div>
                    <div>/&gt;</div>
                  </div>
                </div>
              )}
            </div>

            {/* Example 3: Custom Format */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-slate-900">Custom Format</h3>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setShowCode3(!showCode3)}
                    className="flex items-center gap-2 text-sm px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors"
                  >
                    <Code className="w-4 h-4" />
                    {showCode3 ? 'Hide' : 'View'} Code
                  </button>
                  <span className="text-xs px-3 py-1 bg-orange-100 text-orange-700 rounded-full font-medium">Formatted</span>
                </div>
              </div>
              <DatePicker 
                date={selectedDate3}
                onDateChange={setSelectedDate3}
                dateFormat="PPP"
              />
              {selectedDate3 && (
                <p className="mt-4 text-sm text-slate-600 p-3 bg-slate-50 rounded-lg">
                  Selected: <span className="font-medium">{selectedDate3.toDateString()}</span>
                </p>
              )}
              {showCode3 && (
                <div className="mt-4 rounded-lg overflow-hidden border border-slate-200">
                  <div className="bg-slate-900 text-slate-100 p-4 text-sm overflow-x-auto leading-relaxed font-mono">
                    <div><span className="text-purple-400">const</span> [<span className="text-blue-300">date</span>, <span className="text-blue-300">setDate</span>] = <span className="text-yellow-400">useState</span>&lt;<span className="text-blue-400">Date</span> | <span className="text-blue-400">undefined</span>&gt;(<span className="text-purple-400">new</span> <span className="text-yellow-400">Date</span>());</div>
                    <div className="h-4"></div>
                    <div>&lt;<span className="text-green-400">DatePicker</span></div>
                    <div>  <span className="text-blue-400">date</span>={'{'}date{'}'}</div>
                    <div>  <span className="text-blue-400">onDateChange</span>={'{'}setDate{'}'}</div>
                    <div>  <span className="text-blue-400">dateFormat</span>=<span className="text-green-400">"PPP"</span></div>
                    <div>/&gt;</div>
                  </div>
                </div>
              )}
            </div>

            {/* Example 4: Date Range Picker (1 Month) */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-slate-900">Date Range (1 Month)</h3>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setShowCode4(!showCode4)}
                    className="flex items-center gap-2 text-sm px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors"
                  >
                    <Code className="w-4 h-4" />
                    {showCode4 ? 'Hide' : 'View'} Code
                  </button>
                  <span className="text-xs px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full font-medium">Range</span>
                </div>
              </div>
              <DatePicker 
                mode="range"
                dateRange={dateRange1}
                onDateRangeChange={setDateRange1}
                numberOfMonths={1}
                placeholder="Select date range..."
              />
              {dateRange1?.from && (
                <p className="mt-4 text-sm text-slate-600 p-3 bg-slate-50 rounded-lg">
                  {dateRange1.to ? (
                    <>
                      From: <span className="font-medium">{dateRange1.from.toLocaleDateString()}</span>
                      {' '} To: <span className="font-medium">{dateRange1.to.toLocaleDateString()}</span>
                    </>
                  ) : (
                    <>Start: <span className="font-medium">{dateRange1.from.toLocaleDateString()}</span></>
                  )}
                </p>
              )}
              {showCode4 && (
                <div className="mt-4 rounded-lg overflow-hidden border border-slate-200">
                  <div className="bg-slate-900 text-slate-100 p-4 text-sm overflow-x-auto font-mono" style={{ lineHeight: '1.6' }}>
                    <div><span className="text-purple-400">const</span> [<span className="text-blue-300">dateRange</span>, <span className="text-blue-300">setDateRange</span>] = <span className="text-yellow-400">useState</span>&lt;{'{'} <span className="text-blue-400">from</span>?: <span className="text-blue-400">Date</span>; <span className="text-blue-400">to</span>?: <span className="text-blue-400">Date</span> {'}'} | <span className="text-blue-400">undefined</span>&gt;();</div>
                    <div className="my-3"></div>
                    <div><span className="text-gray-500">&lt;</span><span className="text-green-400">DatePicker</span></div>
                    <div className="pl-4"><span className="text-blue-400">mode</span>=<span className="text-orange-300">"range"</span></div>
                    <div className="pl-4"><span className="text-blue-400">dateRange</span>=<span className="text-orange-300">{'{'}dateRange{'}'}</span></div>
                    <div className="pl-4"><span className="text-blue-400">onDateRangeChange</span>=<span className="text-orange-300">{'{'}setDateRange{'}'}</span></div>
                    <div className="pl-4"><span className="text-blue-400">numberOfMonths</span>=<span className="text-orange-300">{'{'}1{'}'}</span></div>
                    <div className="pl-4"><span className="text-blue-400">placeholder</span>=<span className="text-green-400">"Select date range..."</span></div>
                    <div><span className="text-gray-500">/&gt;</span></div>
                  </div>
                </div>
              )}
            </div>

            {/* Example 5: Date Range Picker (2 Months) */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-slate-900">Date Range (2 Months)</h3>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setShowCode5(!showCode5)}
                    className="flex items-center gap-2 text-sm px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors"
                  >
                    <Code className="w-4 h-4" />
                    {showCode5 ? 'Hide' : 'View'} Code
                  </button>
                  <span className="text-xs px-3 py-1 bg-green-100 text-green-700 rounded-full font-medium">Advanced</span>
                </div>
              </div>
              <DatePicker 
                mode="range"
                dateRange={dateRange2}
                onDateRangeChange={setDateRange2}
                numberOfMonths={2}
                placeholder="Select date range..."
              />
              {dateRange2?.from && (
                <p className="mt-4 text-sm text-slate-600 p-3 bg-slate-50 rounded-lg">
                  {dateRange2.to ? (
                    <>
                      From: <span className="font-medium">{dateRange2.from.toLocaleDateString()}</span>
                      {' '} To: <span className="font-medium">{dateRange2.to.toLocaleDateString()}</span>
                    </>
                  ) : (
                    <>Start: <span className="font-medium">{dateRange2.from.toLocaleDateString()}</span></>
                  )}
                </p>
              )}
              {showCode5 && (
                <div className="mt-4 rounded-lg overflow-hidden border border-slate-200">
                  <div className="bg-slate-900 text-slate-100 p-4 text-sm overflow-x-auto font-mono" style={{ lineHeight: '1.6' }}>
                    <div><span className="text-purple-400">const</span> [<span className="text-blue-300">dateRange</span>, <span className="text-blue-300">setDateRange</span>] = <span className="text-yellow-400">useState</span>&lt;{'{'} <span className="text-blue-400">from</span>?: <span className="text-blue-400">Date</span>; <span className="text-blue-400">to</span>?: <span className="text-blue-400">Date</span> {'}'} | <span className="text-blue-400">undefined</span>&gt;();</div>
                    <div className="my-3"></div>
                    <div><span className="text-gray-500">&lt;</span><span className="text-green-400">DatePicker</span></div>
                    <div className="pl-4"><span className="text-blue-400">mode</span>=<span className="text-orange-300">"range"</span></div>
                    <div className="pl-4"><span className="text-blue-400">dateRange</span>=<span className="text-orange-300">{'{'}dateRange{'}'}</span></div>
                    <div className="pl-4"><span className="text-blue-400">onDateRangeChange</span>=<span className="text-orange-300">{'{'}setDateRange{'}'}</span></div>
                    <div className="pl-4"><span className="text-blue-400">numberOfMonths</span>=<span className="text-orange-300">{'{'}2{'}'}</span></div>
                    <div className="pl-4"><span className="text-blue-400">placeholder</span>=<span className="text-green-400">"Select date range..."</span></div>
                    <div><span className="text-gray-500">/&gt;</span></div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Props Table */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200 mb-8">
          <h2 className="text-2xl font-semibold text-slate-900 mb-6">API Reference</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-slate-900">Prop</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-slate-900">Type</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-slate-900">Default</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-slate-900">Description</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                <tr className="border-b border-slate-100">
                  <td className="py-3 px-4 font-mono text-purple-600">date</td>
                  <td className="py-3 px-4 text-slate-600">Date | undefined</td>
                  <td className="py-3 px-4 text-slate-500">-</td>
                  <td className="py-3 px-4 text-slate-600">The currently selected date (single mode)</td>
                </tr>
                <tr className="border-b border-slate-100">
                  <td className="py-3 px-4 font-mono text-purple-600">onDateChange</td>
                  <td className="py-3 px-4 text-slate-600">(date?: Date) =&gt; void</td>
                  <td className="py-3 px-4 text-slate-500">-</td>
                  <td className="py-3 px-4 text-slate-600">Callback when date changes (single mode)</td>
                </tr>
                <tr className="border-b border-slate-100">
                  <td className="py-3 px-4 font-mono text-purple-600">mode</td>
                  <td className="py-3 px-4 text-slate-600">'single' | 'range'</td>
                  <td className="py-3 px-4 text-slate-500">'single'</td>
                  <td className="py-3 px-4 text-slate-600">Picker mode: single date or date range</td>
                </tr>
                <tr className="border-b border-slate-100">
                  <td className="py-3 px-4 font-mono text-purple-600">dateRange</td>
                  <td className="py-3 px-4 text-slate-600">{'{'} from?: Date; to?: Date {'}'}</td>
                  <td className="py-3 px-4 text-slate-500">-</td>
                  <td className="py-3 px-4 text-slate-600">Selected date range (range mode)</td>
                </tr>
                <tr className="border-b border-slate-100">
                  <td className="py-3 px-4 font-mono text-purple-600">onDateRangeChange</td>
                  <td className="py-3 px-4 text-slate-600">(range?: {'{'} from?: Date; to?: Date {'}'}) =&gt; void</td>
                  <td className="py-3 px-4 text-slate-500">-</td>
                  <td className="py-3 px-4 text-slate-600">Callback when date range changes (range mode)</td>
                </tr>
                <tr className="border-b border-slate-100">
                  <td className="py-3 px-4 font-mono text-purple-600">numberOfMonths</td>
                  <td className="py-3 px-4 text-slate-600">1 | 2</td>
                  <td className="py-3 px-4 text-slate-500">1</td>
                  <td className="py-3 px-4 text-slate-600">Number of calendar months to display</td>
                </tr>
                <tr className="border-b border-slate-100">
                  <td className="py-3 px-4 font-mono text-purple-600">placeholder</td>
                  <td className="py-3 px-4 text-slate-600">string</td>
                  <td className="py-3 px-4 text-slate-500">"Pick a date"</td>
                  <td className="py-3 px-4 text-slate-600">Placeholder text when no date selected</td>
                </tr>
                <tr className="border-b border-slate-100">
                  <td className="py-3 px-4 font-mono text-purple-600">dateFormat</td>
                  <td className="py-3 px-4 text-slate-600">string</td>
                  <td className="py-3 px-4 text-slate-500">"PPP"</td>
                  <td className="py-3 px-4 text-slate-600">Date format string (date-fns format)</td>
                </tr>
                <tr className="border-b border-slate-100">
                  <td className="py-3 px-4 font-mono text-purple-600">disabled</td>
                  <td className="py-3 px-4 text-slate-600">boolean</td>
                  <td className="py-3 px-4 text-slate-500">false</td>
                  <td className="py-3 px-4 text-slate-600">Disables the date picker</td>
                </tr>
                <tr className="border-b border-slate-100">
                  <td className="py-3 px-4 font-mono text-purple-600">className</td>
                  <td className="py-3 px-4 text-slate-600">string</td>
                  <td className="py-3 px-4 text-slate-500">-</td>
                  <td className="py-3 px-4 text-slate-600">Additional CSS classes</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Usage Code */}
        <div className="bg-slate-900 rounded-2xl p-8 text-slate-100 shadow-lg">
          <h3 className="text-xl font-semibold mb-6 text-white">Basic Usage</h3>
          <pre className="text-sm overflow-x-auto leading-relaxed">
<span className="text-purple-400">import</span> <span className="text-slate-300">&#123;</span> <span className="text-blue-400">DatePicker</span> <span className="text-slate-300">&#125;</span> <span className="text-purple-400">from</span> <span className="text-green-400">'@ttianqii/takaui'</span><span className="text-slate-300">;</span>
<span className="text-purple-400">import</span> <span className="text-slate-300">&#123;</span> <span className="text-blue-400">useState</span> <span className="text-slate-300">&#125;</span> <span className="text-purple-400">from</span> <span className="text-green-400">'react'</span><span className="text-slate-300">;</span>

<span className="text-purple-400">function</span> <span className="text-yellow-400">Example</span><span className="text-slate-300">() &#123;</span>
  <span className="text-purple-400">const</span> <span className="text-slate-300">[</span><span className="text-blue-300">date</span><span className="text-slate-300">,</span> <span className="text-blue-300">setDate</span><span className="text-slate-300">] =</span> <span className="text-yellow-400">useState</span><span className="text-slate-300">&lt;</span><span className="text-blue-400">Date</span> <span className="text-purple-400">|</span> <span className="text-blue-400">undefined</span><span className="text-slate-300">&gt;();</span>

  <span className="text-purple-400">return</span> <span className="text-slate-300">(</span>
    <span className="text-slate-300">&lt;</span><span className="text-green-400">DatePicker</span>
      <span className="text-blue-400">date</span>=<span className="text-slate-300">&#123;</span><span className="text-blue-300">date</span><span className="text-slate-300">&#125;</span>
      <span className="text-blue-400">onDateChange</span>=<span className="text-slate-300">&#123;</span><span className="text-blue-300">setDate</span><span className="text-slate-300">&#125;</span>
      <span className="text-blue-400">placeholder</span>=<span className="text-green-400">"Select a date"</span>
    <span className="text-slate-300">/&gt;</span>
  <span className="text-slate-300">);</span>
<span className="text-slate-300">&#125;</span>
          </pre>
        </div>
      </div>
    </div>
  );
}
