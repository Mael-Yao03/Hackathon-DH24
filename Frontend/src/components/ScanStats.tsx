import React from 'react';
import { Package, ArrowDown, ArrowUp, BarChart } from 'lucide-react';

export function ScanStats() {
  const stats = [
    {
      label: 'Total Scans',
      value: '234',
      icon: Package,
      color: 'blue',
    },
    {
      label: 'Entrées',
      value: '156',
      icon: ArrowDown,
      color: 'green',
    },
    {
      label: 'Sorties',
      value: '78',
      icon: ArrowUp,
      color: 'red',
    },
  ];

  return (
    <>
      {stats.map((stat) => (
        <div key={stat.label} className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">{stat.label}</p>
              <p className="text-2xl font-semibold mt-1">{stat.value}</p>
            </div>
            <stat.icon
              className={`w-8 h-8 text-${stat.color}-500`}
            />
          </div>
        </div>
      ))}
    </>
  );
}