import React from 'react';
import { AlertCircle, Package, TrendingUp, Users } from 'lucide-react';
import { ExpiryChart } from './ExpiryChart';
import { InventoryAlerts } from './InventoryAlerts';
import { RegionalHeatmap } from './RegionalHeatmap';
import { StockLevels } from './StockLevels';

export function Dashboard() {
  const stats = [
    { icon: Package, label: 'Total Products', value: '2,345' },
    { icon: AlertCircle, label: 'Expiring Soon', value: '28' },
    { icon: TrendingUp, label: 'Monthly Sales', value: '$45,678' },
    { icon: Users, label: 'Active Users', value: '142' },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">{stat.label}</p>
                <p className="text-2xl font-semibold mt-1">{stat.value}</p>
              </div>
              <stat.icon className="w-8 h-8 text-blue-500" />
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Expiration Timeline</h2>
          <ExpiryChart />
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Inventory Alerts</h2>
          <InventoryAlerts />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Regional Distribution</h2>
          <RegionalHeatmap />
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Stock Levels</h2>
          <StockLevels />
        </div>
      </div>
    </div>
  );
}