import React, { useEffect } from 'react';
import { Calendar, AlertCircle, Search } from 'lucide-react';
import { MapContainer, TileLayer, Circle, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const expiringProducts = [
  { id: 1, name: 'Amoxicilline 500mg', expiryDate: '2024-05-15', stock: 150, status: 'critical' },
  { id: 2, name: 'Ibuprofène 200mg', expiryDate: '2024-06-20', stock: 300, status: 'warning' },
  { id: 3, name: 'Oméprazole 20mg', expiryDate: '2024-07-10', stock: 200, status: 'good' },
];

const hotspots = [
  {
    id: 1,
    position: [48.8566, 2.3522], // Paris
    name: 'Amoxicilline 500mg',
    radius: 20000,
    demand: 'Élevée',
    reason: 'Épidémie de grippe saisonnière',
  },
  {
    id: 2,
    position: [45.7578, 4.8320], // Lyon
    name: 'Ibuprofène 200mg',
    radius: 15000,
    demand: 'Moyenne',
    reason: 'Augmentation des cas de COVID-19',
  },
];

export function ExpirationManagement() {
  useEffect(() => {
    // Fix for Leaflet icon issues in production
    delete (L.Icon.Default.prototype as any)._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
      iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    });
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Gestion des Péremptions</h1>
        <div className="flex gap-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Rechercher des produits..."
              className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            <Calendar className="w-5 h-5" />
            Voir Calendrier
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow">
          <div className="p-6">
            <h2 className="text-lg font-semibold mb-4">Produits à Surveiller</h2>
            <table className="w-full">
              <thead>
                <tr className="text-left border-b">
                  <th className="pb-4">Nom du Produit</th>
                  <th className="pb-4">Date de Péremption</th>
                  <th className="pb-4">Stock</th>
                  <th className="pb-4">Statut</th>
                  <th className="pb-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {expiringProducts.map((product) => (
                  <tr key={product.id} className="border-b">
                    <td className="py-4">{product.name}</td>
                    <td className="py-4">{product.expiryDate}</td>
                    <td className="py-4">{product.stock} unités</td>
                    <td className="py-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${product.status === 'critical'
                            ? 'bg-red-100 text-red-800'
                            : product.status === 'warning'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-green-100 text-green-800'
                          }`}
                      >
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {product.status === 'critical' ? 'Critique' : product.status === 'warning' ? 'Attention' : 'Normal'}
                      </span>
                    </td>
                    <td className="py-4">
                      <button className="text-blue-600 hover:text-blue-800">
                        Voir Détails
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow">
          <div className="p-6">
            <h2 className="text-lg font-semibold mb-4">Carte des Zones à Forte Demande</h2>
            <div className="h-[500px] rounded-lg overflow-hidden">
              <MapContainer
                center={[46.2276, 2.2137]}
                zoom={6}
                style={{ height: '100%', width: '100%' }}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                {hotspots.map((hotspot) => (
                  <Circle
                    key={hotspot.id}
                    center={hotspot.position as [number, number]}
                    radius={hotspot.radius}
                    pathOptions={{
                      color: 'red',
                      fillColor: '#f03',
                      fillOpacity: 0.3,
                    }}
                  >
                    <Popup>
                      <div className="p-2">
                        <h3 className="font-semibold">{hotspot.name}</h3>
                        <p>Demande: {hotspot.demand}</p>
                        <p>Raison: {hotspot.reason}</p>
                      </div>
                    </Popup>
                  </Circle>
                ))}
              </MapContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}