import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { BarcodeScanner } from '../components/BarcodeScanner';
import { ProductCard } from '../components/ProductCard';
import { RecentScans } from '../components/RecentScans';
import { ScanStats } from '../components/ScanStats';

export function InventoryScanning() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleBarcodeScan = (barcode: string) => {
    console.log('Code-barres scanné:', barcode);
    // Ici, vous intégreriez la logique pour rechercher le produit dans la base de données
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Scan des Médicaments</h1>
        <div className="relative">
          <input
            type="text"
            placeholder="Rechercher un médicament..."
            className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Search className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <ScanStats />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-6">
            <h2 className="text-lg font-semibold mb-4">Scanner un Médicament</h2>
            <BarcodeScanner onScan={handleBarcodeScan} />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-6">
            <h2 className="text-lg font-semibold mb-4">Scans Récents</h2>
            <RecentScans />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-6">
          <h2 className="text-lg font-semibold mb-4">Produits Scannés Aujourd'hui</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <ProductCard />
          </div>
        </div>
      </div>
    </div>
  );
}