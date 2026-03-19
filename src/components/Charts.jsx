import { useState, useMemo } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid,
  PieChart, Pie, Cell, Legend, ResponsiveContainer,
} from 'recharts';

const STATUS_COLORS = { Alive: '#10b981', Dead: '#ef4444', unknown: '#94a3b8' };
const BAR_COLOR     = '#4f46e5';

const TOOLTIP_STYLE = {
  contentStyle: {
    background: '#ffffff',
    border: '1px solid #e2e8f0',
    borderRadius: 8,
    boxShadow: '0 4px 12px rgb(0 0 0 / 0.08)',
    fontFamily: 'Inter, sans-serif',
    fontSize: 13,
  },
  labelStyle: { color: '#475569', fontWeight: 600 },
  itemStyle:  { color: '#64748b' },
};

const AXIS_TICK = { fill: '#94a3b8', fontSize: 11, fontFamily: 'Inter, sans-serif' };

const CHART_OPTIONS = [
  { value: 'origins', label: 'Origin Distribution' },
  { value: 'status',  label: 'Status Breakdown'    },
];

export default function Charts({ characters }) {
  const [view, setView] = useState('origins');

  const originData = useMemo(() => {
    const counts = {};
    characters.forEach((c) => {
      const n = c.origin.name;
      counts[n] = (counts[n] || 0) + 1;
    });
    return Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([fullName, count]) => ({
        name:     fullName.length > 24 ? fullName.slice(0, 22) + '…' : fullName,
        fullName,
        count,
      }));
  }, [characters]);

  const statusData = useMemo(() => {
    const counts = { Alive: 0, Dead: 0, unknown: 0 };
    characters.forEach((c) => { counts[c.status] = (counts[c.status] || 0) + 1; });
    return Object.entries(counts).filter(([, v]) => v > 0).map(([name, value]) => ({ name, value }));
  }, [characters]);

  return (
    <div className="bg-white rounded-xl shadow-card border border-slate-100 p-5">
      {/* Header + dropdown */}
      <div className="flex items-start justify-between mb-5">
        <div>
          <h2 className="text-sm font-semibold text-slate-700">Analytics</h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Based on {characters.length.toLocaleString()} character{characters.length !== 1 ? 's' : ''}
          </p>
        </div>

        <select
          value={view}
          onChange={(e) => setView(e.target.value)}
          className="text-sm border border-slate-200 rounded-lg px-3 py-1.5 bg-white text-slate-600
                     focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400
                     cursor-pointer transition-colors"
        >
          {CHART_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
      </div>

      {/* Charts */}
      {view === 'origins' ? (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={originData} layout="vertical" margin={{ left: 0, right: 24, top: 2, bottom: 2 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" horizontal={false} />
            <XAxis type="number" tick={AXIS_TICK} axisLine={false} tickLine={false} />
            <YAxis type="category" dataKey="name" tick={AXIS_TICK} width={150} axisLine={false} tickLine={false} />
            <Tooltip
              {...TOOLTIP_STYLE}
              formatter={(v) => [v, 'Characters']}
              labelFormatter={(l) => originData.find((d) => d.name === l)?.fullName || l}
            />
            <Bar dataKey="count" fill={BAR_COLOR} radius={[0, 4, 4, 0]} />
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={statusData}
              cx="50%"
              cy="45%"
              innerRadius={65}
              outerRadius={105}
              paddingAngle={3}
              dataKey="value"
            >
              {statusData.map((entry) => (
                <Cell key={entry.name} fill={STATUS_COLORS[entry.name] ?? '#94a3b8'} />
              ))}
            </Pie>
            <Tooltip {...TOOLTIP_STYLE} formatter={(v, n) => [v, n]} />
            <Legend
              iconType="circle"
              iconSize={8}
              formatter={(value) => (
                <span style={{ color: '#64748b', fontSize: 12, fontFamily: 'Inter, sans-serif' }}>
                  {value}
                </span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
