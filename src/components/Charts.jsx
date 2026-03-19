import { useMemo } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid,
  PieChart, Pie, Cell, Legend, ResponsiveContainer,
} from 'recharts';

const STATUS_COLORS = { Alive: '#4ade80', Dead: '#f87171', unknown: '#3d5a78' };
const BAR_COLOR     = '#22d3ee';

const TOOLTIP = {
  contentStyle: {
    background: '#0d1525',
    border: '1px solid #1b2f4a',
    borderRadius: 6,
    fontFamily: 'Rajdhani, sans-serif',
    letterSpacing: '0.05em',
  },
  labelStyle: { color: '#94a3b8', fontSize: 12 },
  itemStyle:  { color: '#cbd5e1', fontSize: 13 },
};

const AXIS_TICK = { fill: '#3d5a78', fontSize: 11, fontFamily: 'Rajdhani, sans-serif' };

export default function Charts({ characters }) {
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
        name:     fullName.length > 22 ? fullName.slice(0, 20) + '…' : fullName,
        fullName,
        count,
      }));
  }, [characters]);

  const statusData = useMemo(() => {
    const counts = { Alive: 0, Dead: 0, unknown: 0 };
    characters.forEach((c) => { counts[c.status] = (counts[c.status] || 0) + 1; });
    return Object.entries(counts).filter(([, v]) => v > 0).map(([name, value]) => ({ name, value }));
  }, [characters]);

  const sectionTitle = 'text-[10px] tracking-[0.3em] text-portal/50 uppercase mb-4 font-display';

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

      {/* Origin Bar Chart */}
      <div className="bg-surface border border-rim rounded p-4">
        <p className={sectionTitle}>◈ Top 10 Origin Worlds</p>
        <ResponsiveContainer width="100%" height={285}>
          <BarChart data={originData} layout="vertical" margin={{ left: 0, right: 20, top: 2, bottom: 2 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1b2f4a" horizontal={false} />
            <XAxis type="number" tick={AXIS_TICK} />
            <YAxis type="category" dataKey="name" tick={AXIS_TICK} width={140} />
            <Tooltip
              {...TOOLTIP}
              formatter={(v) => [v, 'Characters']}
              labelFormatter={(l) => originData.find((d) => d.name === l)?.fullName || l}
            />
            <Bar dataKey="count" fill={BAR_COLOR} radius={[0, 3, 3, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Status Pie Chart */}
      <div className="bg-surface border border-rim rounded p-4">
        <p className={sectionTitle}>◈ Status Distribution</p>
        <ResponsiveContainer width="100%" height={285}>
          <PieChart>
            <Pie
              data={statusData}
              cx="50%"
              cy="50%"
              outerRadius={95}
              dataKey="value"
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              labelLine={{ stroke: '#1b2f4a' }}
            >
              {statusData.map((entry) => (
                <Cell key={entry.name} fill={STATUS_COLORS[entry.name] ?? '#3d5a78'} />
              ))}
            </Pie>
            <Tooltip {...TOOLTIP} formatter={(v, n) => [v, n]} />
            <Legend
              formatter={(value) => (
                <span style={{ color: '#94a3b8', fontSize: 12, fontFamily: 'Rajdhani, sans-serif', letterSpacing: '0.08em' }}>
                  {value.toUpperCase()}
                </span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
}
