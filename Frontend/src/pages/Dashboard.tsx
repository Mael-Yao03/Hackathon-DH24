import React from 'react';
import { AlertCircle, Package, TrendingUp, Users } from 'lucide-react';
import { ExpiryChart } from '../components/ExpiryChart';
import { InventoryAlerts } from '../components/InventoryAlerts';
import { RegionalHeatmap } from '../components/RegionalHeatmap';
import { StockLevels } from '../components/StockLevels';

export function Dashboard() {
  const stats = [
    { icon: Package, label: 'Produits Totaux', value: '2,345' },
    { icon: AlertCircle, label: 'Périmant Bientôt', value: '28' },
    // { icon: TrendingUp, label: 'Ventes Mensuelles', value: '45,678€' },
    { icon: Users, label: 'Utilisateurs Actifs', value: '142' },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Vue d'ensemble</h1>
      
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
          <h2 className="text-lg font-semibold mb-4">Chronologie des Péremptions</h2>
          <ExpiryChart />
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Alertes d'Inventaire</h2>
          <InventoryAlerts />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Distribution Régionale</h2>
          <RegionalHeatmap />
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Niveaux de Stock</h2>
          <StockLevels />
        </div>
      </div>
    </div>
  );
}