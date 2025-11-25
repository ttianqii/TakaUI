import { useState } from 'react';
import { Link } from 'react-router-dom';
import { TimePicker } from '../components';
import { ArrowLeft, Copy, Check, Code } from 'lucide-react';

export default function TimePickerPage() {
  const [time1, setTime1] = useState<string>('09:00');
  const [time2, setTime2] = useState<string>('14:30');
  const [time3, setTime3] = useState<string>('18:45');
  const [copiedInstall, setCopiedInstall] = useState(false);
  const [copiedImport, setCopiedImport] = useState(false);
  const [showCode1, setShowCode1] = useState(false);
  const [showCode2, setShowCode2] = useState(false);
  const [showCode3, setShowCode3] = useState(false);

  const handleCopy = (text: string, type: 'install' | 'import') => {
    navigator.clipboard.writeText(text);
    if (type === 'install') {
      setCopiedInstall(true);
      setTimeout(() => setCopiedInstall(false), 2000);
    } else {
      setCopiedImport(true);
      setTimeout(() => setCopiedImport(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <Link 
            to="/" 
            className="inline-flex items-center text-slate-600 hover:text-slate-900 mb-6 transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-2xl p-8 shadow-lg">
            <h1 className="text-5xl font-bold mb-3">TimePicker Component</h1>
            <p className="text-xl text-purple-100">Precise time selection with 12/24 hour formats and multiple display options</p>
          </div>
        </div>

        {/* Installation */}
        <div className="mb-12 bg-white rounded-2xl p-8 shadow-sm border border-slate-200">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Installation</h2>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-slate-600 mb-2">Install the package:</p>
              <div className="flex items-center gap-2">
                <code className="flex-1 bg-slate-900 text-slate-100 px-4 py-3 rounded-lg text-sm">
                  npm install takaui
                </code>
                <button
                  onClick={() => handleCopy('npm install takaui', 'install')}
                  className="p-3 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
                  title="Copy to clipboard"
                >
                  {copiedInstall ? <Check className="w-5 h-5 text-green-600" /> : <Copy className="w-5 h-5 text-slate-600" />}
                </button>
              </div>
            </div>
            <div>
              <p className="text-sm text-slate-600 mb-2">Import the component:</p>
              <div className="flex items-center gap-2">
                <code className="flex-1 bg-slate-900 text-slate-100 px-4 py-3 rounded-lg text-sm">
                  import &#123; TimePicker &#125; from 'takaui';
                </code>
                <button
                  onClick={() => handleCopy("import { TimePicker } from 'takaui';", 'import')}
                  className="p-3 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
                  title="Copy to clipboard"
                >
                  {copiedImport ? <Check className="w-5 h-5 text-green-600" /> : <Copy className="w-5 h-5 text-slate-600" />}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Examples */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">Examples</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Example 1: Basic 24h */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-slate-900">24-Hour Format</h3>
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
              <TimePicker 
                time={new Date(`2000-01-01T${time1}:00`)}
                onTimeChange={(date) => date && setTime1(date.toTimeString().slice(0, 5))}
              />
              <p className="mt-4 text-sm text-slate-600 p-3 bg-slate-50 rounded-lg">
                Selected: <span className="font-medium">{time1}</span>
              </p>
              {showCode1 && (
                <div className="mt-4 rounded-lg overflow-hidden border border-slate-200">
                  <div className="bg-slate-900 text-slate-100 p-4 text-sm overflow-x-auto leading-relaxed font-mono">
                    <div><span className="text-purple-400">const</span> [<span className="text-blue-300">time</span>, <span className="text-blue-300">setTime</span>] = <span className="text-yellow-400">useState</span>&lt;<span className="text-blue-400">string</span>&gt;(<span className="text-green-400">'09:00'</span>);</div>
                    <div className="h-4"></div>
                    <div>&lt;<span className="text-green-400">TimePicker</span></div>
                    <div>  <span className="text-blue-400">time</span>={'{' }<span className="text-purple-400">new</span> <span className="text-yellow-400">Date</span>(<span className="text-green-400">`2000-01-01T$</span>{'{'}<span className="text-blue-300">time</span>{'}'}:00<span className="text-green-400">`</span>){'}'}</div>
                    <div>  <span className="text-blue-400">onTimeChange</span>={'{'}(<span className="text-blue-300">date</span>) =&gt; <span className="text-blue-300">date</span> &amp;&amp; <span className="text-yellow-400">setTime</span>(<span className="text-blue-300">date</span>.<span className="text-yellow-400">toTimeString</span>().<span className="text-yellow-400">slice</span>(<span className="text-orange-400">0</span>, <span className="text-orange-400">5</span>)){'}'}</div>
                    <div>/&gt;</div>
                  </div>
                </div>
              )}
            </div>

            {/* Example 2: 12h Format */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-slate-900">12-Hour Format</h3>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setShowCode2(!showCode2)}
                    className="flex items-center gap-2 text-sm px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors"
                  >
                    <Code className="w-4 h-4" />
                    {showCode2 ? 'Hide' : 'View'} Code
                  </button>
                  <span className="text-xs px-3 py-1 bg-purple-100 text-purple-700 rounded-full font-medium">AM/PM</span>
                </div>
              </div>
              <TimePicker 
                time={new Date(`2000-01-01T${time2}:00`)}
                onTimeChange={(date) => date && setTime2(date.toTimeString().slice(0, 5))}
                format="12h"
              />
              <p className="mt-4 text-sm text-slate-600 p-3 bg-slate-50 rounded-lg">
                Selected: <span className="font-medium">{time2}</span>
              </p>
              {showCode2 && (
                <div className="mt-4 rounded-lg overflow-hidden border border-slate-200">
                  <div className="bg-slate-900 text-slate-100 p-4 text-sm overflow-x-auto leading-relaxed font-mono">
                    <div><span className="text-purple-400">const</span> [<span className="text-blue-300">time</span>, <span className="text-blue-300">setTime</span>] = <span className="text-yellow-400">useState</span>&lt;<span className="text-blue-400">string</span>&gt;(<span className="text-green-400">'14:30'</span>);</div>
                    <div className="h-4"></div>
                    <div>&lt;<span className="text-green-400">TimePicker</span></div>
                    <div>  <span className="text-blue-400">time</span>={'{' }<span className="text-purple-400">new</span> <span className="text-yellow-400">Date</span>(<span className="text-green-400">`2000-01-01T$</span>{'{'}<span className="text-blue-300">time</span>{'}'}:00<span className="text-green-400">`</span>){'}'}</div>
                    <div>  <span className="text-blue-400">onTimeChange</span>={'{'}(<span className="text-blue-300">date</span>) =&gt; <span className="text-blue-300">date</span> &amp;&amp; <span className="text-yellow-400">setTime</span>(<span className="text-blue-300">date</span>.<span className="text-yellow-400">toTimeString</span>().<span className="text-yellow-400">slice</span>(<span className="text-orange-400">0</span>, <span className="text-orange-400">5</span>)){'}'}</div>
                    <div>  <span className="text-blue-400">format</span>=<span className="text-green-400">"12h"</span></div>
                    <div>/&gt;</div>
                  </div>
                </div>
              )}
            </div>

            {/* Example 3: Custom Time */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-slate-900">Evening Time</h3>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setShowCode3(!showCode3)}
                    className="flex items-center gap-2 text-sm px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors"
                  >
                    <Code className="w-4 h-4" />
                    {showCode3 ? 'Hide' : 'View'} Code
                  </button>
                  <span className="text-xs px-3 py-1 bg-green-100 text-green-700 rounded-full font-medium">Custom</span>
                </div>
              </div>
              <TimePicker 
                time={new Date(`2000-01-01T${time3}:00`)}
                onTimeChange={(date) => date && setTime3(date.toTimeString().slice(0, 5))}
              />
              <p className="mt-4 text-sm text-slate-600 p-3 bg-slate-50 rounded-lg">
                Selected: <span className="font-medium">{time3}</span>
              </p>
              {showCode3 && (
                <div className="mt-4 rounded-lg overflow-hidden border border-slate-200">
                  <div className="bg-slate-900 text-slate-100 p-4 text-sm overflow-x-auto leading-relaxed font-mono">
                    <div><span className="text-purple-400">const</span> [<span className="text-blue-300">time</span>, <span className="text-blue-300">setTime</span>] = <span className="text-yellow-400">useState</span>&lt;<span className="text-blue-400">string</span>&gt;(<span className="text-green-400">'18:45'</span>);</div>
                    <div className="h-4"></div>
                    <div>&lt;<span className="text-green-400">TimePicker</span></div>
                    <div>  <span className="text-blue-400">time</span>={'{' }<span className="text-purple-400">new</span> <span className="text-yellow-400">Date</span>(<span className="text-green-400">`2000-01-01T$</span>{'{'}<span className="text-blue-300">time</span>{'}'}:00<span className="text-green-400">`</span>){'}'}</div>
                    <div>  <span className="text-blue-400">onTimeChange</span>={'{'}(<span className="text-blue-300">date</span>) =&gt; <span className="text-blue-300">date</span> &amp;&amp; <span className="text-yellow-400">setTime</span>(<span className="text-blue-300">date</span>.<span className="text-yellow-400">toTimeString</span>().<span className="text-yellow-400">slice</span>(<span className="text-orange-400">0</span>, <span className="text-orange-400">5</span>)){'}'}</div>
                    <div>/&gt;</div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* API Reference */}
        <div className="mb-12 bg-white rounded-2xl p-8 shadow-sm border border-slate-200">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">API Reference</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="py-3 px-4 text-sm font-semibold text-slate-900">Prop</th>
                  <th className="py-3 px-4 text-sm font-semibold text-slate-900">Type</th>
                  <th className="py-3 px-4 text-sm font-semibold text-slate-900">Default</th>
                  <th className="py-3 px-4 text-sm font-semibold text-slate-900">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr className="hover:bg-slate-50">
                  <td className="py-3 px-4 text-sm font-mono text-purple-600">time</td>
                  <td className="py-3 px-4 text-sm font-mono text-slate-600">Date</td>
                  <td className="py-3 px-4 text-sm text-slate-600">-</td>
                  <td className="py-3 px-4 text-sm text-slate-700">The selected time as a Date object</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="py-3 px-4 text-sm font-mono text-purple-600">onTimeChange</td>
                  <td className="py-3 px-4 text-sm font-mono text-slate-600">(date: Date | undefined) =&gt; void</td>
                  <td className="py-3 px-4 text-sm text-slate-600">-</td>
                  <td className="py-3 px-4 text-sm text-slate-700">Callback when time changes</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="py-3 px-4 text-sm font-mono text-purple-600">format</td>
                  <td className="py-3 px-4 text-sm font-mono text-slate-600">"12h" | "24h"</td>
                  <td className="py-3 px-4 text-sm text-slate-600">"24h"</td>
                  <td className="py-3 px-4 text-sm text-slate-700">Time display format (12 or 24 hour)</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="py-3 px-4 text-sm font-mono text-purple-600">disabled</td>
                  <td className="py-3 px-4 text-sm font-mono text-slate-600">boolean</td>
                  <td className="py-3 px-4 text-sm text-slate-600">false</td>
                  <td className="py-3 px-4 text-sm text-slate-700">Disables the time picker</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="py-3 px-4 text-sm font-mono text-purple-600">className</td>
                  <td className="py-3 px-4 text-sm font-mono text-slate-600">string</td>
                  <td className="py-3 px-4 text-sm text-slate-600">-</td>
                  <td className="py-3 px-4 text-sm text-slate-700">Additional CSS classes</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Basic Usage */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Basic Usage</h2>
          <div className="rounded-lg overflow-hidden border border-slate-200">
            <pre className="bg-slate-900 text-slate-100 p-6 text-sm overflow-x-auto leading-relaxed">
<span className="text-purple-400">import</span> <span className="text-slate-300">&#123;</span> <span className="text-blue-300">TimePicker</span> <span className="text-slate-300">&#125;</span> <span className="text-purple-400">from</span> <span className="text-green-400">'takaui'</span><span className="text-slate-300">;</span>
<span className="text-purple-400">import</span> <span className="text-slate-300">&#123;</span> <span className="text-blue-300">useState</span> <span className="text-slate-300">&#125;</span> <span className="text-purple-400">from</span> <span className="text-green-400">'react'</span><span className="text-slate-300">;</span>

<span className="text-purple-400">function</span> <span className="text-yellow-400">Example</span><span className="text-slate-300">() &#123;</span>
  <span className="text-purple-400">const</span> <span className="text-slate-300">[</span><span className="text-blue-300">time</span><span className="text-slate-300">,</span> <span className="text-blue-300">setTime</span><span className="text-slate-300">] =</span> <span className="text-yellow-400">useState</span><span className="text-slate-300">&lt;</span><span className="text-blue-400">string</span><span className="text-slate-300">&gt;(</span><span className="text-green-400">'09:00'</span><span className="text-slate-300">);</span>

  <span className="text-purple-400">return</span> <span className="text-slate-300">(</span>
    <span className="text-slate-300">&lt;</span><span className="text-green-400">TimePicker</span>
      <span className="text-blue-400">time</span>=<span className="text-slate-300">&#123;</span><span className="text-purple-400">new</span> <span className="text-yellow-400">Date</span><span className="text-slate-300">(</span><span className="text-green-400">`2000-01-01T$&#123;</span><span className="text-blue-300">time</span><span className="text-green-400">&#125;:00`</span><span className="text-slate-300">)&#125;</span>
      <span className="text-blue-400">onTimeChange</span>=<span className="text-slate-300">&#123;(</span><span className="text-blue-300">date</span><span className="text-slate-300">) =&gt;</span> <span className="text-blue-300">date</span> <span className="text-purple-400">&amp;&amp;</span> <span className="text-yellow-400">setTime</span><span className="text-slate-300">(</span><span className="text-blue-300">date</span>.<span className="text-yellow-400">toTimeString</span><span className="text-slate-300">().</span><span className="text-yellow-400">slice</span><span className="text-slate-300">(</span><span className="text-orange-400">0</span><span className="text-slate-300">,</span> <span className="text-orange-400">5</span><span className="text-slate-300">))&#125;</span>
      <span className="text-blue-400">format</span>=<span className="text-green-400">"24h"</span>
    <span className="text-slate-300">/&gt;</span>
  <span className="text-slate-300">);</span>
<span className="text-slate-300">&#125;</span>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
