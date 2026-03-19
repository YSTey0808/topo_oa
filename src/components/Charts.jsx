import { useMemo } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const STATUS_COLORS = {
  Alive: '#97ce4c',
  Dead: '#e74c3c',
  unknown: '#6b7280',
};

const TOOLTIP_STYLE = {
  contentStyle: { background: '#1f2937', border: '1px solid #374151', borderRadius: 8 },
  labelStyle: { color: '#e5e7eb' },
  itemStyle: { color: '#d1d5db' },
};

export default function Charts({ characters }) {
  const originData = useMemo(() => {
    const counts = {};
    characters.forEach((c) => {
      const name = c.origin.name;
      counts[name] = (counts[name] || 0) + 1;
    });
    return Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([fullName, count]) => ({
        name: fullName.length > 22 ? fullName.slice(0, 20) + '…' : fullName,
        fullName,
        count,
      }));
  }, [characters]);

  const statusData = useMemo(() => {
    const counts = { Alive: 0, Dead: 0, unknown: 0 };
    characters.forEach((c) => {
      counts[c.status] = (counts[c.status] || 0) + 1;
    });
    return Object.entries(counts)
      .filter(([, v]) => v > 0)
      .map(([name, value]) => ({ name, value }));
  }, [characters]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Origin Bar Chart */}
      <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
        <h2 className="text-base font-semibold text-gray-200 mb-4">Top 10 Origin Locations</h2>
        <ResponsiveContainer width="100%" height={290}>
          <BarChart data={originData} layout="vertical" margin={{ left: 0, right: 24, top: 4, bottom: 4 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" horizontal={false} />
            <XAxis type="number" tick={{ fill: '#9ca3af', fontSize: 11 }} />
            <YAxis
              type="category"
              dataKey="name"
              tick={{ fill: '#9ca3af', fontSize: 11 }}
              width={145}
            />
            <Tooltip
              {...TOOLTIP_STYLE}
              formatter={(value) => [value, 'Characters']}
              labelFormatter={(label) =>
                originData.find((d) => d.name === label)?.fullName || label
              }
            />
            <Bar dataKey="count" fill="#44b3c2" radius={[0, 4, 4, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Status Pie Chart */}
      <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
        <h2 className="text-base font-semibold text-gray-200 mb-4">Status Distribution</h2>
        <ResponsiveContainer width="100%" height={290}>
          <PieChart>
            <Pie
              data={statusData}
              cx="50%"
              cy="50%"
              outerRadius={100}
              dataKey="value"
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              labelLine={{ stroke: '#6b7280' }}
            >
              {statusData.map((entry) => (
                <Cell key={entry.name} fill={STATUS_COLORS[entry.name] ?? '#6b7280'} />
              ))}
            </Pie>
            <Tooltip
              {...TOOLTIP_STYLE}
              formatter={(value, name) => [value, name]}
            />
            <Legend
              formatter={(value) => (
                <span style={{ color: '#d1d5db', fontSize: 13 }}>{value}</span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
