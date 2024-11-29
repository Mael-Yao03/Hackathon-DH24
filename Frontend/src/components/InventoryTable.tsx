import React from 'react';
import { ArrowDown, ArrowUp, Calendar, Package } from 'lucide-react';

const mockData = [
    {
        id: 1,
        date: '2024-03-15',
        time: '10:30',
        product: 'Doliprane 1000mg',
        type: 'entrée',
        quantity: 150
    },
    {
        id: 2,
        date: '2024-03-15',
        time: '11:15',
        product: 'Efferalgan 500mg',
        type: 'sortie',
        quantity: 75
    },
    // ... plus d'entrées
];

export function InventoryTable() {
    return (
        <div className="overflow-x-auto">
            <table className="w-full">
                <thead>
                    <tr className="text-left border-b">
                        <th className="pb-4 pl-4">Date</th>
                        <th className="pb-4">Produit</th>
                        <th className="pb-4">Type</th>
                        <th className="pb-4">Quantité</th>
                    </tr>
                </thead>
                <tbody>
                    {mockData.map((item) => (
                        <tr key={item.id} className="border-b hover:bg-gray-50">
                            <td className="py-4 pl-4">
                                <div className="flex items-center gap-2">
                                    <Calendar className="w-4 h-4 text-gray-400" />
                                    <div>
                                        <p className="font-medium">{item.date}</p>
                                        <p className="text-sm text-gray-500">{item.time}</p>
                                    </div>
                                </div>
                            </td>
                            <td className="py-4">
                                <div className="flex items-center gap-2">
                                    <Package className="w-4 h-4 text-gray-400" />
                                    <span>{item.product}</span>
                                </div>
                            </td>
                            <td className="py-4">
                                <span
                                    className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${item.type === 'entrée'
                                        ? 'bg-green-100 text-green-800'
                                        : 'bg-red-100 text-red-800'
                                        }`}
                                >
                                    {item.type === 'entrée' ? (
                                        <ArrowDown className="w-3 h-3" />
                                    ) : (
                                        <ArrowUp className="w-3 h-3" />
                                    )}
                                    {item.type}
                                </span>
                            </td>
                            <td className="py-4">
                                <span className="font-medium">
                                    {item.type === 'entrée' ? '+' : '-'}{item.quantity}
                                </span>
                            </td>
                            <td className="py-4">{item.operator}</td>
                            <td className="py-4">{item.supplier}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}