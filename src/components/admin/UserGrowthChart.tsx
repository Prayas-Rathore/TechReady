import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface UserGrowthChartProps {
  data: Array<{
    date: string;
    users: number;
    activeUsers: number;
  }>;
}

export default function UserGrowthChart({ data }: UserGrowthChartProps) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <defs>
          <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
          </linearGradient>
          <linearGradient id="colorActive" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
            <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
        <XAxis
          dataKey="date"
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
        />
        <Area
          type="monotone"
          dataKey="users"
          stroke="#3b82f6"
          fillOpacity={1}
          fill="url(#colorUsers)"
          name="Total Users"
        />
        <Area
          type="monotone"
          dataKey="activeUsers"
          stroke="#10b981"
          fillOpacity={1}
          fill="url(#colorActive)"
          name="Active Users"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
