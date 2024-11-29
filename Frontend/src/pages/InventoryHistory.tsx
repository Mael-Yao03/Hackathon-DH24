import React, { useState } from 'react';
import { Search, Filter, Download } from 'lucide-react';
// import { InventoryStats } from '../components/InventoryState';
import { InventoryFilters } from '../components/InventoryFilter';
import { InventoryTable } from '../components/InventoryTable';

export function InventoryHistory() {
    const [searchQuery, setSearchQuery] = useState('');
    const [showFilters, setShowFilters] = useState(false);

    return (
        <div className="space-y-6 px-4 sm:px-6 lg:px-8 py-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <h1 className="text-2xl font-bold text-gray-900 text-center md:text-left">
                    Historique des Mouvements
                </h1>
                <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                    {/* Barre de recherche */}
                    <div className="relative w-full sm:w-72">
                        <input
                            type="text"
                            placeholder="Rechercher un produit..."
                            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <Search className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
                    </div>

                    {/* Bouton pour les filtres */}
                    <button
                        onClick={() => setShowFilters(!showFilters)}
                        className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50 w-full sm:w-auto"
                    >
                        <Filter className="w-5 h-5" />
                        Filtres
                    </button>

                    {/* Bouton pour l'export */}
                    <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 w-full sm:w-auto">
                        <Download className="w-5 h-5" />
                        Exporter
                    </button>
                </div>
            </div>

            {/* Contenu principal */}
            <div className="space-y-6">
                {/* Filtres conditionnels */}
                {showFilters && (
                    <div className="bg-white rounded-lg shadow-sm p-4">
                        <InventoryFilters />
                    </div>
                )}

                {/* Table d'historique */}
                <div className="bg-white rounded-lg shadow-sm">
                    <div className="p-6">
                        <InventoryTable />
                    </div>
                </div>
            </div>
        </div>
    );
}
