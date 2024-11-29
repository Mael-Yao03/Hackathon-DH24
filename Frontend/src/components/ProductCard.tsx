import React from 'react';
import { Package, AlertCircle } from 'lucide-react';

const mockProducts = [
  {
    id: 1,
    name: 'Doliprane 1000mg',
    barcode: '3400936744066',
    quantity: 150,
    lastScan: '10:30',
    type: 'entrée',
  },
  {
    id: 2,
    name: 'Efferalgan 500mg',
    barcode: '3400936744073',
    quantity: 75,
    lastScan: '11:15',
    type: 'sortie',
  },
  {
    id: 3,
    name: 'Advil 200mg',
    barcode: '3400936744080',
    quantity: 200,
    lastScan: '11:45',
    type: 'entrée',
  },
];

export function ProductCard() {
  return (
    <>
      {mockProducts.map((product) => (
        <div
          key={product.id}
          className="bg-gray-50 rounded-lg p-4 border border-gray-200 hover:border-blue-500 transition-colors"
        >
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-medium text-gray-900">{product.name}</h3>
              <p className="text-sm text-gray-500">Code: {product.barcode}</p>
            </div>
            <Package className="w-5 h-5 text-gray-400" />
          </div>
          <div className="mt-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500">Quantité:</span>
              <span className="font-medium">{product.quantity}</span>
            </div>
            <div className="flex items-center justify-between text-sm mt-1">
              <span className="text-gray-500">Dernier scan:</span>
              <span className="font-medium">{product.lastScan}</span>
            </div>
            <div className="mt-3">
              <span
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  product.type === 'entrée'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                }`}
              >
                {product.type === 'entrée' ? '+ Entrée' : '- Sortie'}
              </span>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}