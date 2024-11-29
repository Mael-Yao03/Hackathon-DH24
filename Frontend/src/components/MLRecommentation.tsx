import { useEffect, useState } from 'react';
import { Brain, TrendingUp, AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Recommendation {
    productId: string;
    productName: string;
    currentStock: number;
    recommendedOrder: number;
    confidence: number;
    reason: string;
    trend: 'up' | 'down' | 'stable';
    priority: 'high' | 'medium' | 'low';
}

const mockHistoricalData = [
    { date: '2024-01', sales: 120 },
    { date: '2024-02', sales: 150 },
    { date: '2024-03', sales: 180 },
];

export function MLRecommendations() {
    const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function generateRecommendations() {
            // Simuler le chargement du modèle ML
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Données simulées de recommandations
            const mockRecommendations: Recommendation[] = [
                {
                    productId: '1',
                    productName: 'Doliprane 1000mg',
                    currentStock: 50,
                    recommendedOrder: 200,
                    confidence: 0.92,
                    reason: 'Tendance saisonnière à la hausse + épidémie de grippe',
                    trend: 'up',
                    priority: 'high'
                },
                {
                    productId: '2',
                    productName: 'Efferalgan 500mg',
                    currentStock: 75,
                    recommendedOrder: 150,
                    confidence: 0.85,
                    reason: 'Consommation stable + stock minimum atteint',
                    trend: 'stable',
                    priority: 'medium'
                },
                {
                    productId: '3',
                    productName: 'Advil 200mg',
                    currentStock: 120,
                    recommendedOrder: 100,
                    confidence: 0.78,
                    reason: 'Baisse saisonnière prévue',
                    trend: 'down',
                    priority: 'low'
                }
            ];

            setRecommendations(mockRecommendations);
            setIsLoading(false);
        }

        generateRecommendations();
    }, []);

    const getTrendIcon = (trend: string) => {
        switch (trend) {
            case 'up':
                return <TrendingUp className="w-5 h-5 text-green-500" />;
            case 'down':
                return <TrendingUp className="w-5 h-5 text-red-500 transform rotate-180" />;
            default:
                return <TrendingUp className="w-5 h-5 text-yellow-500 transform rotate-90" />;
        }
    };

    const getPriorityBadge = (priority: string) => {
        const colors = {
            high: 'bg-red-100 text-red-800',
            medium: 'bg-yellow-100 text-yellow-800',
            low: 'bg-green-100 text-green-800'
        };

        return (
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colors[priority as keyof typeof colors]}`}>
                {priority.charAt(0).toUpperCase() + priority.slice(1)}
            </span>
        );
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center p-8">
                <div className="text-center">
                    <Brain className="w-8 h-8 text-blue-500 animate-pulse mx-auto mb-2" />
                    <p className="text-gray-600">Analyse des données en cours...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg border border-blue-100">
                <div className="flex items-center gap-3 mb-2">
                    <Brain className="w-6 h-6 text-blue-600" />
                    <h3 className="text-lg font-semibold text-gray-900">
                        Recommandations IA
                    </h3>
                </div>
                <p className="text-sm text-gray-600">
                    Basées sur l'analyse de {mockHistoricalData.length} mois de données historiques et des tendances actuelles
                </p>
            </div>

            <div className="grid grid-rows-3 gap-4">
                {recommendations.map((rec) => (
                    <div
                        key={rec.productId}
                        className="bg-white p-4 rounded-lg border hover:border-blue-500 transition-colors"
                    >
                        <div className="flex items-start justify-between mb-3">
                            <div>
                                <h4 className="font-medium text-gray-900">{rec.productName}</h4>
                                <div className="flex items-center gap-2 mt-1">
                                    {getTrendIcon(rec.trend)}
                                    <span className="text-sm text-gray-600">
                                        {rec.confidence * 100}% de confiance
                                    </span>
                                </div>
                            </div>
                            {getPriorityBadge(rec.priority)}
                        </div>

                        <div className="grid grid-cols-2 gap-4 mb-3">
                            <div className="bg-gray-50 p-3 rounded">
                                <p className="text-sm text-gray-500">Stock actuel</p>
                                <p className="text-lg font-semibold">{rec.currentStock} unités</p>
                            </div>
                            <div className="bg-gray-50 p-3 rounded">
                                <p className="text-sm text-gray-500">Commande recommandée</p>
                                <p className="text-lg font-semibold">{rec.recommendedOrder} unités</p>
                            </div>
                        </div>

                        <div className="bg-blue-50 p-3 rounded">
                            <p className="text-sm text-blue-800">
                                <AlertTriangle className="w-4 h-4 inline-block mr-1" />
                                {rec.reason}
                            </p>
                        </div>

                        <div className="mt-4 flex justify-end gap-2">
                            <button className="px-3 py-1 text-sm text-gray-600 hover:text-gray-800">
                                Ignorer
                            </button>
                            <Link to="/wholesaler">
                                <button className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700">
                                    Commander
                                </button>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}