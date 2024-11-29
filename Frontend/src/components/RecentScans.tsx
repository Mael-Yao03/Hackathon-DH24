import React from 'react';
import { ArrowDown, ArrowUp } from 'lucide-react';

const recentScans = [
  {
    id: 1,
    productName: 'Doliprane 1000mg',
    time: '10:30',
    type: 'entrée',
    quantity: 50,
  },
  {
    id: 2,
    productName: 'Efferalgan 500mg',
    time: '10:15',
    type: 'sortie',
    quantity: 25,
  },
  {
    id: 3,
    productName: 'Advil 200mg',
    time: '10:00',
    type: 'entrée',
    quantity: 100,
  },
];

export function RecentScans() {
  return (
    <div className="space-y-4">
      {recentScans.map((scan) => (
        <div
          key={scan.id}
          className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
        >
          <div className="flex items-center space-x-3">
            {scan.type === 'entrée' ? (
              <ArrowDown className="w-5 h-5 text-green-500" />
            ) : (
              <ArrowUp className="w-5 h-5 text-red-500" />
            )}
            <div>
              <p className="font-medium text-gray-900">{scan.productName}</p>
              <p className="text-sm text-gray-500">{scan.time}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="font-medium">
              {scan.type === 'entrée' ? '+' : '-'}{scan.quantity}
            </p>
            <p className="text-sm text-gray-500">{scan.type}</p>
          </div>
        </div>
      ))}
    </div>
  );
}