import {
  Network,
  Store,
  BarChart3,
  Settings,
  Scan,
  History
} from 'lucide-react';
import { PharmacyNetwork } from '../pages/PharmacyNetwork';
import { WholesalerIntegration } from '../pages/WholesalerIntegration';
import { Analytics } from '../pages/Analytics';
import { Settings as SettingsPage } from '../pages/Settings';
import { InventoryScanning } from '../pages/InventoryScanning';
import { InventoryHistory } from '../pages/InventoryHistory';


export const routes = [
  {
    path: '/scanning',
    element: <InventoryScanning />,
    icon: Scan,
    label: 'Scan des Médicaments'
  },
  {
    path: '/history',
    element: <InventoryHistory />,
    icon: History,
    label: 'Historique des Mouvements'
  },
  {
    path: '/network',
    element: <PharmacyNetwork />,
    icon: Network,
    label: 'Réseau de Pharmacies'
  },
  {
    path: '/wholesaler',
    element: <WholesalerIntegration />,
    icon: Store,
    label: 'Grossistes'
  },
  {
    path: '/analytics',
    element: <Analytics />,
    icon: BarChart3,
    label: 'Analyses'
  },
  {
    path: '/settings',
    element: <SettingsPage />,
    icon: Settings,
    label: 'Paramètres'
  }
];