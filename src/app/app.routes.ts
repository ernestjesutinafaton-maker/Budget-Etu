import { Routes } from '@angular/router';
import { DepenseList } from './pages/depense-list/depense-list';
import { DepenseAjout } from './pages/depense-ajout/depense-ajout';
import { DepenseDetail } from './pages/depense-detail/depense-detail';
import { PageIntrouvable } from './pages/page-introuvable/page-introuvable';

export const routes: Routes = [
  { path: '', redirectTo: 'depenses', pathMatch: 'full' },
  { path: 'depenses', component: DepenseList, title: 'Mes dépenses' },
  // 'nouvelle' avant ':id', sinon le router croirait que "nouvelle" est un id
  { path: 'depenses/nouvelle', component: DepenseAjout, title: 'Nouvelle dépense' },
  { path: 'depenses/:id/modifier', component: DepenseAjout, title: 'Modifier une dépense' },
  { path: 'depenses/:id', component: DepenseDetail, title: 'Détail' },
  {
    path: 'stats',
    title: 'Statistiques',
    loadComponent: () => import('./pages/stats/stats').then((m) => m.Stats),
  },
  { path: '**', component: PageIntrouvable, title: 'Page introuvable' },
];
