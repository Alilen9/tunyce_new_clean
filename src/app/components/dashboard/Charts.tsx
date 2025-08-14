'use client';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Jan', value: 400 },
  { name: 'Feb', value: 800 },
  { name: 'Mar', value: 300 },
  { name: 'Apr', value: 700 },
];

export default function Chart({ title }: { title: string }) {
  return (
    <div className="bg-white rounded-2xl shadow-md p-4">
      <h3 className="font-semibold text-lg mb-2">{title}</h3>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={data}>
          <Line type="monotone" dataKey="value" stroke="#C81E1E" strokeWidth={2} />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
