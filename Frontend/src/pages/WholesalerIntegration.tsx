import React from 'react';
import { TrendingUp, Package, Truck, DollarSign } from 'lucide-react';

const grossistes = [
  {
    id: 1,
    name: 'Grossiste PharmaCorp',
    deliveryTime: '1-2 jours',
    minOrder: '500 $',
    rating: 4.8,
    products: [
      { id: 1, name: 'Amoxicilline 500mg', price: '0,50 $/unité', stock: 5000 },
      { id: 2, name: 'Ibuprofène 200mg', price: '0,25 $/unité', stock: 8000 },
    ],
  },
  {
    id: 2,
    name: 'MediSupply Co.',
    deliveryTime: '2-3 jours',
    minOrder: '300 $',
    rating: 4.5,
    products: [
      { id: 1, name: 'Amoxicilline 500mg', price: '0,55 $/unité', stock: 4000 },
      { id: 2, name: 'Ibuprofène 200mg', price: '0,22 $/unité', stock: 10000 },
    ],
  },
];

export function WholesalerIntegration() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Intégration des Grossistes</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total des Commandes</p>
              <p className="text-2xl font-semibold mt-1">1 234</p>
            </div>
            <Package className="w-8 h-8 text-blue-500" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Livraisons en Attente</p>
              <p className="text-2xl font-semibold mt-1">12</p>
            </div>
            <Truck className="w-8 h-8 text-yellow-500" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Dépenses Mensuelles</p>
              <p className="text-2xl font-semibold mt-1">45 678 $</p>
            </div>
            <DollarSign className="w-8 h-8 text-green-500" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Tendances des Prix</p>
              <p className="text-2xl font-semibold mt-1">+2,4%</p>
            </div>
            <TrendingUp className="w-8 h-8 text-purple-500" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-6">
          <h2 className="text-lg font-semibold mb-4">Grossistes Connus</h2>
          <div className="space-y-6">
            {grossistes.map((grossiste) => (
              <div key={grossiste.id} className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-semibold text-lg">{grossiste.name}</h3>
                    <div className="mt-2 grid grid-cols-3 gap-4">
                      <div>
                        <p className="text-sm text-gray-500">Délai de Livraison</p>
                        <p className="font-medium">{grossiste.deliveryTime}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Commande Minimum</p>
                        <p className="font-medium">{grossiste.minOrder}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Évaluation</p>
                        <p className="font-medium">{grossiste.rating}/5.0</p>
                      </div>
                    </div>
                  </div>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                    Passer Commande
                  </button>
                </div>
                <table className="w-full">
                  <thead>
                    <tr className="text-left border-b">
                      <th className="pb-2">Produit</th>
                      <th className="pb-2">Prix</th>
                      <th className="pb-2">Stock</th>
                      <th className="pb-2"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {grossiste.products.map((produit) => (
                      <tr key={produit.id} className="border-b">
                        <td className="py-2">{produit.name}</td>
                        <td className="py-2">{produit.price}</td>
                        <td className="py-2">{produit.stock}</td>
                        <td className="py-2 text-right">
                          <button className="text-blue-600 hover:text-blue-800">
                            Ajouter au Panier
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}