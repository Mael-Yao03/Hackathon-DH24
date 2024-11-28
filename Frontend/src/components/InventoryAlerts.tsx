import React from 'react';
import { AlertCircle, AlertTriangle, Info } from 'lucide-react';

const alerts = [
  {
    id: 1,
    type: 'expiry',
    message: 'Amoxicilline 500mg expire dans 2 mois',
    severity: 'high',
  },
  {
    id: 2,
    type: 'stock',
    message: 'Stock faible : Ibuprofène 200mg',
    severity: 'medium',
  },
  {
    id: 3,
    type: 'price',
    message: 'Alerte prix : Aspirine 325mg',
    severity: 'low',
  },
];

export function InventoryAlerts() {
  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'high':
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      case 'medium':
        return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      default:
        return <Info className="w-5 h-5 text-blue-500" />;
    }
  };

  return (
    <div className="space-y-4">
      {alerts.map((alert) => (
        <div
          key={alert.id}
          className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
        >
          {getSeverityIcon(alert.severity)}
          <span className="text-sm text-gray-700">{alert.message}</span>
        </div>
      ))}
    </div>
  );
}