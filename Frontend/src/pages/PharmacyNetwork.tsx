import React, { useState } from 'react';
import { MapPin, Phone, Mail, ExternalLink, TrendingUp, TrendingDown, Search } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const pharmaciesProches = [
  {
    id: 1,
    name: 'Pharmacie du Centre',
    distance: '0,5 miles',
    address: '123 Main St, Ville',
    phone: '(555) 123-4567',
    email: 'downtown@pharmacy.com',
    status: 'ouvert',
    medicationTrends: [
      { name: 'Antidouleurs', consommation: 1200, variation: 5 },
      { name: 'Antibiotiques', consommation: 800, variation: -3 },
      { name: 'Antihistaminiques', consommation: 600, variation: 2 }
    ]
  },
  {
    id: 2,
    name: 'Médicaments Westside',
    distance: '1,2 miles',
    address: '456 West Ave, Ville',
    phone: '(555) 234-5678',
    email: 'westside@pharmacy.com',
    status: 'ouvert',
    medicationTrends: [
      { name: 'Antidouleurs', consommation: 950, variation: -1 },
      { name: 'Antibiotiques', consommation: 700, variation: 4 },
      { name: 'Antihistaminiques', consommation: 500, variation: 6 }
    ]
  },
  {
    id: 3,
    name: 'Santé Eastside',
    distance: '2,0 miles',
    address: '789 East Blvd, Ville',
    phone: '(555) 345-6789',
    email: 'eastside@pharmacy.com',
    status: 'fermé',
    medicationTrends: [
      { name: 'Antidouleurs', consommation: 1100, variation: 3 },
      { name: 'Antibiotiques', consommation: 750, variation: -2 },
      { name: 'Antihistaminiques', consommation: 550, variation: 1 }
    ]
  },

];

export function PharmacyNetwork() {
  const [selectedPharmacy, setSelectedPharmacy] = useState(null);

  const renderTrendIcon = (variation) => {
    if (variation > 0) {
      return <TrendingUp className="w-4 h-4 text-green-600" />;
    } else if (variation < 0) {
      return <TrendingDown className="w-4 h-4 text-red-600" />;
    }
    return null;
  };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-4 rounded shadow-lg">
          <p className="font-bold">{data.name}</p>
          <p>Consommation: {data.consommation}</p>
          <div className="flex items-center">
            <span>Variation: {data.variation}%</span>
            {renderTrendIcon(data.variation)}
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Réseau de Pharmacies</h1>
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

      <div className="grid grid-cols-1 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Statistiques Rapides</h2>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <p className="text-2xl font-bold text-blue-600">{pharmaciesProches.length}</p>
              <p className="text-sm text-gray-600">Pharmacies Proches</p>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <p className="text-2xl font-bold text-green-600">98%</p>
              <p className="text-sm text-gray-600">Disponibilité du Réseau</p>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <p className="text-2xl font-bold text-purple-600">24/7</p>
              <p className="text-sm text-gray-600">Support Disponible</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-6">
            <h2 className="text-lg font-semibold mb-4">Pharmacies Proches</h2>
            <div className="space-y-4">
              {pharmaciesProches.map((pharmacie) => (
                <div
                  key={pharmacie.id}
                  className={`border rounded-lg p-4 hover:bg-gray-50 transition-colors cursor-pointer ${selectedPharmacy?.id === pharmacie.id ? 'bg-blue-50' : ''
                    }`}
                  onClick={() => setSelectedPharmacy(pharmacie)}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-lg">{pharmacie.name}</h3>
                      <div className="mt-2 space-y-1">
                        <p className="flex items-center text-gray-600">
                          <MapPin className="w-4 h-4 mr-2" />
                          {pharmacie.address} ({pharmacie.distance})
                        </p>
                        <p className="flex items-center text-gray-600">
                          <Phone className="w-4 h-4 mr-2" />
                          {pharmacie.phone}
                        </p>
                        <p className="flex items-center text-gray-600">
                          <Mail className="w-4 h-4 mr-2" />
                          {pharmacie.email}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${pharmacie.status === 'ouvert'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                          }`}
                      >
                        {pharmacie.status.toUpperCase()}
                      </span>
                      <button className="text-blue-600 hover:text-blue-800">
                        <ExternalLink className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-6">
            <h2 className="text-lg font-semibold mb-4">
              {selectedPharmacy
                ? `Tendances des Médicaments - ${selectedPharmacy.name}`
                : 'Sélectionnez une Pharmacie'}
            </h2>
            {selectedPharmacy ? (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={selectedPharmacy.medicationTrends}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis label={{ value: 'Consommation', angle: -90, position: 'insideLeft' }} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Bar
                    dataKey="consommation"
                    fill="#8884d8"
                    name="Consommation"
                  />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-64 flex items-center justify-center text-gray-500">
                Cliquez sur une pharmacie pour voir ses tendances
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}