import React from 'react';
import {
  LayoutDashboard,
  Calendar,
  Network,
  Store,
  BarChart3,
  Settings,
  BarChartBig
} from 'lucide-react';
import { Dashboard } from '../pages/Dashboard';
import { ExpirationManagement } from '../pages/ExpirationManagement';
import { PharmacyNetwork } from '../pages/PharmacyNetwork';
import { WholesalerIntegration } from '../pages/WholesalerIntegration';
import { Analytics } from '../pages/Analytics';
import { Settings as SettingsPage } from '../pages/Settings';
import RecommandationsPharmacie from '../pages/Prediction';


export const routes = [
  {
    path: '/dashboard',
    element: <Dashboard />,
    icon: LayoutDashboard,
    label: 'Tableau de bord'
  },
  {
    path: '/expiration',
    element: <ExpirationManagement />,
    icon: Calendar,
    label: 'Gestion des Péremptions'
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
    label: 'Intégration Grossistes'
  },
  {
    path: '/analytics',
    element: <Analytics />,
    icon: BarChart3,
    label: 'Analyses'
  },
  {
    path: '/prediction',
    element: <RecommandationsPharmacie />,
    icon: BarChartBig,
    label: 'Prediction'
  },
  {
    path: '/settings',
    element: <SettingsPage />,
    icon: Settings,
    label: 'Paramètres'
  }
];