import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { About } from './pages/about/about';
import { Aria } from './pages/aria/aria';
import { Listbox } from './pages/listbox/listbox';

export const routes: Routes = [
  {
    path: '',
    component: Home,
    data: {
      title: 'Accueil',
    },
  },
  {
    path: 'aria',
    component: Aria,
    data: {
      title: `Qu'est ce qu'est ARIA ?`,
    },
  },
  {
    path: 'listbox',
    component: Listbox,
    data: {
      title: `Exemples de listes déroulantes`,
    },
  },
  {
    path: 'a-propos',
    component: About,
    data: {
      title: 'A propos',
    },
  },
];
