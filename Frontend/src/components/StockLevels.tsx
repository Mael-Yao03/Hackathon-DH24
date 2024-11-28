import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Week 1', stock: 400 },
  { name: 'Week 2', stock: 300 },
  { name: 'Week 3', stock: 500 },
  { name: 'Week 4', stock: 280 },
  { name: 'Week 5', stock: 390 },
  { name: 'Week 6', stock: 430 },
];

export function StockLevels() {
  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="stock" stroke="#3B82F6" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}