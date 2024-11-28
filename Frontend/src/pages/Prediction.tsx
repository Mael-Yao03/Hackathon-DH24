import React, { useState, useEffect } from 'react';
import {
    AlertTriangle,
    CheckCircle,
    Thermometer,
    Users
} from 'lucide-react';

// Types pour modéliser les données contextuelles
interface DonneesContextuelles {
    populationVieillissante: number;
    tendancesMaladies: {
        [key: string]: 'hausse' | 'baisse' | 'stable';
    };
    conditionsSaisonnieres: {
        saison: 'printemps' | 'été' | 'automne' | 'hiver';
        risqueEpidemique: 'faible' | 'moyen' | 'élevé';
        temperatureMoyenne: number;
        humidite: number;
    }
}

interface Medicament {
    id: number;
    nom: string;
    categorie: string;
    stockActuel: number;
    seuilMinimum: number;
    ventesRecentes: number[];
    conditionsCibles: string[];
}

interface Recommandation {
    medicament: Medicament;
    raisonRecommandation: string;
    priorite: 'basse' | 'moyenne' | 'haute';
    quantiteRecommandee: number;
}

const generateDonneesContextuelles = (): DonneesContextuelles => ({
    populationVieillissante: 25, // 25% de population âgée
    tendancesMaladies: {
        hypertension: 'hausse',
        diabete: 'stable',
        respiratoires: 'hausse',
        cardiaques: 'stable'
    },
    conditionsSaisonnieres: {
        saison: 'hiver',
        risqueEpidemique: 'moyen',
        temperatureMoyenne: 5,
        humidite: 80
    }
});

const generateMedicaments = (): Medicament[] => [
    {
        id: 1,
        nom: 'Médicament Tension',
        categorie: 'Cardiovasculaire',
        stockActuel: 50,
        seuilMinimum: 30,
        ventesRecentes: [45, 52, 60, 58, 65],
        conditionsCibles: ['hypertension']
    },
    {
        id: 2,
        nom: 'Sirop Anti-Toux',
        categorie: 'Respiratoire',
        stockActuel: 25,
        seuilMinimum: 20,
        ventesRecentes: [30, 35, 40, 38, 45],
        conditionsCibles: ['toux', 'rhume']
    },
    {
        id: 3,
        nom: 'Antidépresseur',
        categorie: 'Santé Mentale',
        stockActuel: 40,
        seuilMinimum: 25,
        ventesRecentes: [35, 42, 38, 44, 41],
        conditionsCibles: ['dépression']
    },
    {
        id: 4,
        nom: 'Spray Nasal',
        categorie: 'Allergies',
        stockActuel: 15,
        seuilMinimum: 20,
        ventesRecentes: [25, 22, 30, 28, 35],
        conditionsCibles: ['allergies']
    }
];

const genererRecommandations = (
    medicaments: Medicament[],
    contexte: DonneesContextuelles
): Recommandation[] => {
    return medicaments.map(med => {
        // Calcul de la moyenne des ventes récentes
        const moyenneVentes = med.ventesRecentes.reduce((a, b) => a + b, 0) / med.ventesRecentes.length;

        // Logique de recommandation contextuelle
        let raisonRecommandation = 'Stock standard';
        let priorite: 'basse' | 'moyenne' | 'haute' = 'basse';
        let quantiteRecommandee = Math.ceil(moyenneVentes * 1.2);

        // Vérification des tendances démographiques
        const tendancesRelevantes = med.conditionsCibles.filter(
            condition => contexte.tendancesMaladies[condition] === 'hausse'
        );

        if (tendancesRelevantes.length > 0) {
            priorite = 'moyenne';
            raisonRecommandation = `Hausse des cas de ${ tendancesRelevantes.join(', ') }`;
            quantiteRecommandee = Math.ceil(moyenneVentes * 1.5);
        }

        // Vérification des conditions saisonnières
        if (contexte.conditionsSaisonnieres.saison === 'hiver' &&
            med.categorie === 'Respiratoire') {
            priorite = 'haute';
            raisonRecommandation += ' - Saison hivernale';
            quantiteRecommandee = Math.ceil(moyenneVentes * 2);
        }

        // Vérification du risque épidémique
        if (contexte.conditionsSaisonnieres.risqueEpidemique === 'élevé' &&
            ['Respiratoire', 'Cardiovasculaire'].includes(med.categorie)) {
            priorite = 'haute';
            raisonRecommandation += ' - Risque épidémique élevé';
            quantiteRecommandee = Math.ceil(moyenneVentes * 2.5);
        }

        // Vérification du stock
        if (med.stockActuel < med.seuilMinimum) {
            priorite = 'haute';
            raisonRecommandation += ' - Stock critique';
            quantiteRecommandee = med.seuilMinimum * 2;
        }

        return {
            medicament: med,
            raisonRecommandation,
            priorite,
            quantiteRecommandee
        };
    });
};

const RecommandationsPharmacie: React.FC = () => {
    const [contexte, setContexte] = useState<DonneesContextuelles | null>(null);
    const [medicaments, setMedicaments] = useState<Medicament[]>([]);
    const [recommandations, setRecommandations] = useState<Recommandation[]>([]);
    const [filtreParPriorite, setFiltreParPriorite] = useState<'tous' | 'haute' | 'moyenne' | 'basse'>('tous');

    useEffect(() => {
        // Simulation du chargement des données
        const donneesContextuelles = generateDonneesContextuelles();
        const listeMedicaments = generateMedicaments();

        setContexte(donneesContextuelles);
        setMedicaments(listeMedicaments);

        // Génération des recommandations
        const nouvellesRecommandations = genererRecommandations(listeMedicaments, donneesContextuelles);
        setRecommandations(nouvellesRecommandations);
    }, []);

    // Fonctions de rendu des icônes
    const renderIconePriorite = (priorite: 'basse' | 'moyenne' | 'haute') => {
        switch (priorite) {
            case 'haute':
                return <AlertTriangle className="text-red-600" />;
            case 'moyenne':
                return <CheckCircle className="text-yellow-500" />;
            default:
                return <CheckCircle className="text-green-500" />;
        }
    };

    // Filtrage des recommandations
    const recommandationsFiltrees = recommandations.filter(rec =>
        filtreParPriorite === 'tous' || rec.priorite === filtreParPriorite
    );

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="container mx-auto">
                <h1 className="text-3xl font-bold mb-6 text-center">
                    Recommandations de Réapprovisionnement Pharmaceutique
                </h1>

                {/* Contexte Démographique et Saisonnier */}
                {contexte && (
                    <div className="bg-white rounded-lg shadow-md p-4 mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* <div className="flex items-center space-x-4">
                            <Users className="text-blue-500" />
                            <div>
                                <h3 className="font-semibold">Démographie</h3>
                                <p>Population âgée : {contexte.populationVieillissante}%</p>
                            </div>
                        </div> */}
                        <div className="flex items-center space-x-4">
                            <Thermometer className="text-red-500" />
                            <div>
                                <h3 className="font-semibold">Conditions Saisonnières</h3>
                                <p>Saison : {contexte.conditionsSaisonnieres.saison}</p>
                                <p>Risque Épidémique : {contexte.conditionsSaisonnieres.risqueEpidemique}</p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Filtres */}
                <div className="mb-4 flex justify-center space-x-4">
                    <button
                        onClick={() => setFiltreParPriorite('tous')}
                        className={`px-4 py-2 rounded ${filtreParPriorite === 'tous'
                                ? 'bg-blue-500 text-white'
                                : 'bg-white text-blue-500 border'
                            }`}
                    >
                        Tous
                    </button>
                    <button
                        onClick={() => setFiltreParPriorite('haute')}
                        className={`px-4 py-2 rounded ${filtreParPriorite === 'haute'
                                ? 'bg-red-500 text-white'
                                : 'bg-white text-red-500 border'
                            }`}
                    >
                        Haute Priorité
                    </button>
                    <button
                        onClick={() => setFiltreParPriorite('moyenne')}
                        className={`px-4 py-2 rounded ${filtreParPriorite === 'moyenne'
                                ? 'bg-yellow-500 text-white'
                                : 'bg-white text-yellow-500 border'
                            }`}
                    >
                        Moyenne Priorité
                    </button>
                </div>

                {/* Liste des Recommandations */}
                <div className="grid gap-4">
                    {recommandationsFiltrees.map(rec => (
                        <div
                            key={rec.medicament.id}
                            className={`
                bg-white rounded-lg shadow-md p-4 
                ${rec.priorite === 'haute' ? 'border-2 border-red-500' :
                                    rec.priorite === 'moyenne' ? 'border-2 border-yellow-500' : ''}
              `}
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-4">
                                    {renderIconePriorite(rec.priorite)}
                                    <div>
                                        <h2 className="text-xl font-semibold">
                                            {rec.medicament.nom}
                                        </h2>
                                        <p className="text-gray-600">
                                            Catégorie : {rec.medicament.categorie}
                                        </p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-lg font-bold">
                                        + {rec.quantiteRecommandee} unités
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        {rec.raisonRecommandation}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default RecommandationsPharmacie;