import { createBrowserRouter } from 'react-router';
import { ConTEXStorefront } from './pages/ConTEXStorefront';
import { CategoryPage } from './pages/CategoryPage';
import { SeedDatabase } from './pages/SeedDatabase';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: ConTEXStorefront,
  },
  {
    path: '/seed',
    Component: SeedDatabase,
  },
  {
    path: '/collections/:gender',
    Component: CategoryPage,
  },
  {
    path: '/collections/:gender/:category',
    Component: CategoryPage,
  },
]);