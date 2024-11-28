import React from 'react';
import { Calendar, AlertCircle, Search } from 'lucide-react';

const produitsExpirants = [
  { id: 1, name: 'Amoxicilline 500mg', expiryDate: '2024-05-15', stock: 150, status: 'critique' },
  { id: 2, name: 'Ibuprofène 200mg', expiryDate: '2024-06-20', stock: 300, status: 'avertir' },
  { id: 3, name: 'Oméprazole 20mg', expiryDate: '2024-07-10', stock: 200, status: 'bon' },
];

export function ExpirationManagement() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Gestion des Expirations</h1>
        <div className="flex gap-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Rechercher des produits..."
              className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
          </div>
          {/* <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            <Calendar className="w-5 h-5" />
            Voir le Calendrier
          </button> */}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-6">
          <table className="w-full">
            <thead>
              <tr className="text-left border-b">
                <th className="pb-4">Nom du Produit</th>
                <th className="pb-4">Date d'Expiration</th>
                <th className="pb-4">Stock</th>
                <th className="pb-4">Statut</th>
                <th className="pb-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {produitsExpirants.map((produit) => (
                <tr key={produit.id} className="border-b">
                  <td className="py-4">{produit.name}</td>
                  <td className="py-4">{produit.expiryDate}</td>
                  <td className="py-4">{produit.stock} unités</td>
                  <td className="py-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${produit.status === 'critique'
                        ? 'bg-red-100 text-red-800'
                        : produit.status === 'avertir'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-green-100 text-green-800'
                        }`}
                    >
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {produit.status.charAt(0).toUpperCase() + produit.status.slice(1)}
                    </span>
                  </td>
                  <td className="py-4">
                    <button className="text-blue-600 hover:text-blue-800">
                      Voir les Détails
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}