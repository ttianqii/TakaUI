import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar } from '../components';
import { ArrowLeft, Copy, Check, Code } from 'lucide-react';

export default function CalendarPage() {
  const [selectedDate1, setSelectedDate1] = useState<Date | undefined>(new Date());
  const [selectedDate2, setSelectedDate2] = useState<Date | undefined>(new Date());
  const [selectedDate3, setSelectedDate3] = useState<Date | undefined>(new Date());
  const [selectedDate4, setSelectedDate4] = useState<Date | undefined>(new Date());
  const [copiedInstall, setCopiedInstall] = useState(false);
  const [copiedImport, setCopiedImport] = useState(false);
  const [showCode1, setShowCode1] = useState(false);
  const [showCode2, setShowCode2] = useState(false);
  const [showCode3, setShowCode3] = useState(false);
  const [showCode4, setShowCode4] = useState(false);

  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const nextWeek = new Date(today);
  nextWeek.setDate(nextWeek.getDate() + 7);

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
          <h1 className="text-5xl font-bold text-slate-900 mb-3">Calendar</h1>
          <p className="text-xl text-slate-600">Full-featured calendar with event management and holiday support</p>
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
                <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto">import &#123; Calendar &#125; from '@ttianqii/takaui';</pre>
                <button
                  onClick={() => copyToClipboard("import { Calendar } from '@ttianqii/takaui';", setCopiedImport)}
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
            {/* Example 1: Basic Calendar */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-slate-900">Basic Calendar</h3>
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
              <Calendar 
                selected={selectedDate1}
                onSelect={setSelectedDate1}
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
                    <div>&lt;<span className="text-green-400">Calendar</span></div>
                    <div>  <span className="text-blue-400">selected</span>={'{'}date{'}'}</div>
                    <div>  <span className="text-blue-400">onSelect</span>={'{'}setDate{'}'}</div>
                    <div>/&gt;</div>
                  </div>
                </div>
              )}
            </div>

            {/* Example 2: Calendar with Events */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-slate-900">With Events</h3>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setShowCode2(!showCode2)}
                    className="flex items-center gap-2 text-sm px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors"
                  >
                    <Code className="w-4 h-4" />
                    {showCode2 ? 'Hide' : 'View'} Code
                  </button>
                  <span className="text-xs px-3 py-1 bg-green-100 text-green-700 rounded-full font-medium">Interactive</span>
                </div>
              </div>
              <Calendar 
                selected={selectedDate2}
                onSelect={setSelectedDate2}
                events={[
                  { date: today, title: 'Team Meeting' },
                  { date: tomorrow, title: 'Project Review' },
                  { date: nextWeek, title: 'Launch Day' }
                ]}
              />
              <div className="mt-4 space-y-2">
                <p className="text-sm font-medium text-slate-700">Upcoming Events:</p>
                <div className="space-y-1 text-xs text-slate-600">
                  <div className="flex items-center gap-2 p-2 bg-blue-50 rounded">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    Team Meeting - Today
                  </div>
                  <div className="flex items-center gap-2 p-2 bg-green-50 rounded">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    Project Review - Tomorrow
                  </div>
                </div>
              </div>
              {showCode2 && (
                <div className="mt-4 rounded-lg overflow-hidden border border-slate-200">
                  <div className="bg-slate-900 text-slate-100 p-4 text-sm overflow-x-auto leading-relaxed font-mono">
                    <div><span className="text-purple-400">const</span> [<span className="text-blue-300">date</span>, <span className="text-blue-300">setDate</span>] = <span className="text-yellow-400">useState</span>&lt;<span className="text-blue-400">Date</span> | <span className="text-blue-400">undefined</span>&gt;(<span className="text-purple-400">new</span> <span className="text-yellow-400">Date</span>());</div>
                    <div><span className="text-purple-400">const</span> <span className="text-blue-300">events</span> = [</div>
                    <div>  {'{'} <span className="text-blue-400">date</span>: <span className="text-purple-400">new</span> <span className="text-yellow-400">Date</span>(<span className="text-orange-400">2024</span>, <span className="text-orange-400">0</span>, <span className="text-orange-400">15</span>), <span className="text-blue-400">title</span>: <span className="text-green-400">'Team Meeting'</span> {'}'},</div>
                    <div>  {'{'} <span className="text-blue-400">date</span>: <span className="text-purple-400">new</span> <span className="text-yellow-400">Date</span>(<span className="text-orange-400">2024</span>, <span className="text-orange-400">0</span>, <span className="text-orange-400">20</span>), <span className="text-blue-400">title</span>: <span className="text-green-400">'Project Review'</span> {'}'},</div>
                    <div>];</div>
                    <div className="h-4"></div>
                    <div>&lt;<span className="text-green-400">Calendar</span></div>
                    <div>  <span className="text-blue-400">selected</span>={'{'}date{'}'}</div>
                    <div>  <span className="text-blue-400">onSelect</span>={'{'}setDate{'}'}</div>
                    <div>  <span className="text-blue-400">events</span>={'{'}events{'}'}</div>
                    <div>/&gt;</div>
                  </div>
                </div>
              )}
            </div>

            {/* Example 3: With Holidays */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-slate-900">With Holidays</h3>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setShowCode4(!showCode4)}
                    className="flex items-center gap-2 text-sm px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors"
                  >
                    <Code className="w-4 h-4" />
                    {showCode4 ? 'Hide' : 'View'} Code
                  </button>
                  <span className="text-xs px-3 py-1 bg-red-100 text-red-700 rounded-full font-medium">Holidays</span>
                </div>
              </div>
              <Calendar 
                selected={selectedDate4}
                onSelect={setSelectedDate4}
                holidays={[
                  { date: today, name: 'Today' }
                ]}
              />
              {showCode4 && (
                <div className="mt-4 rounded-lg overflow-hidden border border-slate-200">
                  <div className="bg-slate-900 text-slate-100 p-4 text-sm overflow-x-auto leading-relaxed font-mono">
                    <div>&lt;<span className="text-green-400">Calendar</span></div>
                    <div>  <span className="text-blue-400">selected</span>={'{'}date{'}'}</div>
                    <div>  <span className="text-blue-400">onSelect</span>={'{'}setDate{'}'}</div>
                    <div>  <span className="text-blue-400">holidays</span>={'{'}[</div>
                    <div>    {'{'} <span className="text-blue-400">date</span>: <span className="text-purple-400">new</span> <span className="text-yellow-400">Date</span>(), <span className="text-blue-400">name</span>: <span className="text-green-400">'Holiday'</span> {'}'}</div>
                    <div>  ]{'}'}</div>
                    <div>/&gt;</div>
                  </div>
                </div>
              )}
            </div>

            {/* Example 4: Custom Styling */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-slate-900">Custom Styling</h3>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setShowCode3(!showCode3)}
                    className="flex items-center gap-2 text-sm px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors"
                  >
                    <Code className="w-4 h-4" />
                    {showCode3 ? 'Hide' : 'View'} Code
                  </button>
                  <span className="text-xs px-3 py-1 bg-purple-100 text-purple-700 rounded-full font-medium">Styled</span>
                </div>
              </div>
              <Calendar 
                selected={selectedDate3}
                onSelect={setSelectedDate3}
                className="border-2 border-purple-200 rounded-xl"
              />
              {showCode3 && (
                <div className="mt-4 rounded-lg overflow-hidden border border-slate-200">
                  <div className="bg-slate-900 text-slate-100 p-4 text-sm overflow-x-auto leading-relaxed font-mono">
                    <div>&lt;<span className="text-green-400">Calendar</span></div>
                    <div>  <span className="text-blue-400">selected</span>={'{'}date{'}'}</div>
                    <div>  <span className="text-blue-400">onSelect</span>={'{'}setDate{'}'}</div>
                    <div>  <span className="text-blue-400">className</span>=<span className="text-green-400">"border-2 border-purple-500 shadow-lg"</span></div>
                    <div>/&gt;</div>
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
                  <td className="py-3 px-4 font-mono text-purple-600">selected</td>
                  <td className="py-3 px-4 text-slate-600">Date | undefined</td>
                  <td className="py-3 px-4 text-slate-500">-</td>
                  <td className="py-3 px-4 text-slate-600">The currently selected date</td>
                </tr>
                <tr className="border-b border-slate-100">
                  <td className="py-3 px-4 font-mono text-purple-600">onSelect</td>
                  <td className="py-3 px-4 text-slate-600">(date: Date) =&gt; void</td>
                  <td className="py-3 px-4 text-slate-500">-</td>
                  <td className="py-3 px-4 text-slate-600">Callback when a date is selected</td>
                </tr>
                <tr className="border-b border-slate-100">
                  <td className="py-3 px-4 font-mono text-purple-600">events</td>
                  <td className="py-3 px-4 text-slate-600">CalendarEvent[]</td>
                  <td className="py-3 px-4 text-slate-500">[]</td>
                  <td className="py-3 px-4 text-slate-600">Array of events to display on calendar</td>
                </tr>
                <tr className="border-b border-slate-100">
                  <td className="py-3 px-4 font-mono text-purple-600">holidays</td>
                  <td className="py-3 px-4 text-slate-600">Holiday[]</td>
                  <td className="py-3 px-4 text-slate-500">[]</td>
                  <td className="py-3 px-4 text-slate-600">Array of holidays to highlight</td>
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
<span className="text-purple-400">import</span> <span className="text-slate-300">&#123;</span> <span className="text-blue-400">Calendar</span> <span className="text-slate-300">&#125;</span> <span className="text-purple-400">from</span> <span className="text-green-400">'@ttianqii/takaui'</span><span className="text-slate-300">;</span>
<span className="text-purple-400">import</span> <span className="text-slate-300">&#123;</span> <span className="text-blue-400">useState</span> <span className="text-slate-300">&#125;</span> <span className="text-purple-400">from</span> <span className="text-green-400">'react'</span><span className="text-slate-300">;</span>

<span className="text-purple-400">function</span> <span className="text-yellow-400">Example</span><span className="text-slate-300">() &#123;</span>
  <span className="text-purple-400">const</span> <span className="text-slate-300">[</span><span className="text-blue-300">date</span><span className="text-slate-300">,</span> <span className="text-blue-300">setDate</span><span className="text-slate-300">] =</span> <span className="text-yellow-400">useState</span><span className="text-slate-300">&lt;</span><span className="text-blue-400">Date</span> <span className="text-purple-400">|</span> <span className="text-blue-400">undefined</span><span className="text-slate-300">&gt;(</span><span className="text-purple-400">new</span> <span className="text-yellow-400">Date</span><span className="text-slate-300">());</span>

  <span className="text-purple-400">return</span> <span className="text-slate-300">(</span>
    <span className="text-slate-300">&lt;</span><span className="text-green-400">Calendar</span>
      <span className="text-blue-400">selected</span>=<span className="text-slate-300">&#123;</span><span className="text-blue-300">date</span><span className="text-slate-300">&#125;</span>
      <span className="text-blue-400">onSelect</span>=<span className="text-slate-300">&#123;</span><span className="text-blue-300">setDate</span><span className="text-slate-300">&#125;</span>
      <span className="text-blue-400">events</span>=<span className="text-slate-300">&#123;[</span>
        <span className="text-slate-300">&#123;</span> <span className="text-blue-400">date:</span> <span className="text-purple-400">new</span> <span className="text-yellow-400">Date</span><span className="text-slate-300">(),</span> <span className="text-blue-400">title:</span> <span className="text-green-400">'Meeting'</span> <span className="text-slate-300">&#125;</span>
      <span className="text-slate-300">]&#125;</span>
      <span className="text-blue-400">holidays</span>=<span className="text-slate-300">&#123;[</span>
        <span className="text-slate-300">&#123;</span> <span className="text-blue-400">date:</span> <span className="text-purple-400">new</span> <span className="text-yellow-400">Date</span><span className="text-slate-300">(),</span> <span className="text-blue-400">name:</span> <span className="text-green-400">'Holiday'</span> <span className="text-slate-300">&#125;</span>
      <span className="text-slate-300">]&#125;</span>
    <span className="text-slate-300">/&gt;</span>
  <span className="text-slate-300">);</span>
<span className="text-slate-300">&#125;</span>
          </pre>
        </div>
      </div>
    </div>
  );
}
