import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { month: 'Mar', count: 12 },
  { month: 'Apr', count: 19 },
  { month: 'May', count: 15 },
  { month: 'Jun', count: 8 },
  { month: 'Jul', count: 25 },
  { month: 'Aug', count: 17 },
];

export function ExpiryChart() {
  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="count" fill="#3B82F6" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}