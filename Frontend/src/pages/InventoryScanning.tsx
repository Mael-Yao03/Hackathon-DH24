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
    // Intégration de la logique pour rechercher le produit dans la base de données
  };

  return (
    <div className="space-y-6 px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <h1 className="text-2xl font-bold text-gray-900 text-center md:text-left">
          Scan des Médicaments
        </h1>
        <div className="relative w-full md:w-auto">
          <input
            type="text"
            placeholder="Rechercher un médicament..."
            className="w-full md:w-72 pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Search className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
        </div>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <ScanStats />
      </div>

      {/* Section principale : Scanner et scans récents */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Scanner un Médicament */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-6">
            <h2 className="text-lg font-semibold mb-4">Scanner un Médicament</h2>
            <BarcodeScanner onScan={handleBarcodeScan} />
          </div>
        </div>

        {/* Scans récents */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-6">
            <h2 className="text-lg font-semibold mb-4">Scans Récents</h2>
            <RecentScans />
          </div>
        </div>
      </div>

      {/* Produits scannés aujourd'hui */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-6">
          <h2 className="text-lg font-semibold mb-4">Produits Scannés Aujourd'hui</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <ProductCard />
            <ProductCard />
            <ProductCard />
            {/* Ajouter d'autres produits si nécessaire */}
          </div>
        </div>
      </div>
    </div>
  );
}
