import React from 'react';
import { Package, TrendingUp, Clock, Users } from 'lucide-react';

export function InventoryStats() {
    const stats = [
        {
            label: 'Total Mouvements',
            value: '1,234',
            change: '+12.5%',
            icon: Package,
            color: 'blue',
        },
        {
            label: 'Valeur du Stock',
            value: '45,678€',
            change: '+8.2%',
            icon: TrendingUp,
            color: 'green',
        },
        {
            label: 'Temps Moyen',
            value: '2.5 min',
            change: '-5.1%',
            icon: Clock,
            color: 'yellow',
        },
        {
            label: 'Opérateurs Actifs',
            value: '8',
            change: '0%',
            icon: Users,
            color: 'purple',
        },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {stats.map((stat) => (
                <div key={stat.label} className="bg-white p-6 rounded-lg shadow-sm">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-500">{stat.label}</p>
                            <p className="text-2xl font-semibold mt-1">{stat.value}</p>
                            <p className={`text-sm ${stat.change.startsWith('+')
                                    ? 'text-green-600'
                                    : stat.change.startsWith('-')
                                        ? 'text-red-600'
                                        : 'text-gray-600'
                                }`}>
                                {stat.change} vs. mois dernier
                            </p>
                        </div>
                        <stat.icon className={`w-8 h-8 text-${stat.color}-500`} />
                    </div>
                </div>
            ))}
        </div>
    );
}