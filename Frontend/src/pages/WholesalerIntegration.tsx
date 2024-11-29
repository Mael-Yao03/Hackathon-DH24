import React, { useState } from 'react';

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
  const [evaluations, setEvaluations] = useState({});

  const handleEvaluationSubmit = (grossisteId, newRating) => {
    setEvaluations((prev) => ({
      ...prev,
      [grossisteId]: newRating,
    }));
  };

  return (
    <div className="space-y-6 p-4 sm:p-6 lg:p-8">
      <h1 className="text-2xl font-bold text-gray-900">Intégration des Grossistes</h1>

      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-4 sm:p-6">
          <h2 className="text-lg font-semibold mb-4">Grossistes Connus</h2>
          <div className="space-y-6">
            {grossistes.map((grossiste) => (
              <div key={grossiste.id} className="border rounded-lg p-4 space-y-4">
                <div className="flex flex-col md:flex-row justify-between md:items-center">
                  <div className="mb-4 md:mb-0">
                    <h3 className="font-semibold text-lg">{grossiste.name}</h3>
                    <div className="mt-2 grid grid-cols-1 sm:grid-cols-3 gap-4">
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
                  <a
                    href="tel:+1234567890"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-center"
                  >
                    Appeler
                  </a>
                </div>

                <div className="flex flex-col gap-2 mt-4">
                  <h4 className="font-semibold">Laissez votre évaluation :</h4>
                  <div className="flex flex-col sm:flex-row items-center gap-2">
                    <input
                      type="number"
                      placeholder="Évaluation (1-5)"
                      className="border rounded-lg p-2 w-full sm:flex-1"
                      onChange={(e) =>
                        handleEvaluationSubmit(grossiste.id, e.target.value)
                      }
                    />
                    <button
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 w-full sm:w-auto"
                      onClick={() =>
                        alert(`Évaluation soumise pour ${grossiste.name} !`)
                      }
                    >
                      Soumettre
                    </button>
                  </div>
              </div>

                <table className="w-full text-left text-sm mt-4 border-collapse">
                  <thead>
                    <tr className="border-b">
                      <th className="pb-2">Produit</th>
                      <th className="pb-2">Prix</th>
                      <th className="pb-2">Stock</th>
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
                            Ajouter au panier
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
