import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface SessionsChartProps {
  data: Array<{
    day: string;
    sessions: number;
  }>;
}

export default function SessionsChart({ data }: SessionsChartProps) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
        <XAxis
          dataKey="day"
          stroke="#64748b"
          fontSize={12}
        />
        <YAxis
          stroke="#64748b"
          fontSize={12}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: 'white',
            border: '1px solid #e2e8f0',
            borderRadius: '8px',
            padding: '8px 12px'
          }}
          cursor={{ fill: 'rgba(139, 92, 246, 0.1)' }}
        />
        <Bar
          dataKey="sessions"
          fill="#f97316"
          radius={[8, 8, 0, 0]}
          name="Sessions"
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
