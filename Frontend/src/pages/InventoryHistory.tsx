import React, { useState } from 'react';
import { Search, Filter, Download } from 'lucide-react';
// import { InventoryStats } from '../components/InventoryState';
import { InventoryFilters } from '../components/InventoryFilter';
import { InventoryTable } from '../components/InventoryTable';

export function InventoryHistory() {
    const [searchQuery, setSearchQuery] = useState('');
    const [showFilters, setShowFilters] = useState(false);

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-900">Historique des Mouvements</h1>
                <div className="flex gap-4">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Rechercher un produit..."
                            className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <Search className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
                    </div>
                    <button
                        onClick={() => setShowFilters(!showFilters)}
                        className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50"
                    >
                        <Filter className="w-5 h-5" />
                        Filtres
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                        <Download className="w-5 h-5" />
                        Exporter
                    </button>
                </div>
            </div>

            <div className="">
                {/* <InventoryStats /> */}
                {showFilters && <InventoryFilters />}
                <div className="bg-white rounded-lg shadow-sm mt-6">
                    <div className="p-6">
                        <InventoryTable />
                    </div>
                </div>
            </div>
        </div>
    );
}